using System;
using System.Security.Claims;
using System.Text;
using AuctioChain.BL.Accounts;
using AuctioChain.BL.Auctions;
using AuctioChain.BL.Balance;
using AuctioChain.BL.Bets;
using AuctioChain.BL.Files;
using AuctioChain.BL.Lots;
using AuctioChain.BL.Profile;
using AuctioChain.BL.Publishers;
using AuctioChain.BL.Services;
using AuctioChain.BL.Services.Dto;
using AuctioChain.DAL.EF;
using AuctioChain.DAL.Models.Account;
using AuctioChain.DAL.Models.Profile.Dto;
using AuctioChain.Extensions;
using AuctioChain.Libs.Serilog;
using MassTransit;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using RabbitMQ.Client;
using Serilog;

var builder = WebApplication.CreateBuilder(args);

builder.Host.UseSerilog(SerilogConfiguration.Connect);
builder.Services.AddControllers();

builder.Services.AddScoped<IAuctionManager, AuctionManager>();
builder.Services.AddScoped<IAccountManager, AccountManager>();
builder.Services.AddScoped<ILotManager, LotManager>();
builder.Services.AddScoped<IBetManager, BetManager>();
builder.Services.AddScoped<ITokenService, TokenService>();
builder.Services.AddScoped<IImageManager, ImageManager>();
builder.Services.AddScoped<IProfileManager, ProfileManager>();
builder.Services.AddScoped<IBalanceManager, BalanceManager>();

builder.Services.AddDbContext<DataContext>();
builder.Services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddElasticsearch();

builder.Services.AddMassTransit(x =>
{
    x.AddConsumer<AuctionEndConsumer>();
    x.AddConsumer<BlockchainBalanceConsumer>();

    x.UsingRabbitMq((context, cfg) =>
    {
        cfg.Host("amqp://localhost", c =>
        {
            c.Username("guest");
            c.Password("guest");
        });

        cfg.ReceiveEndpoint("AuctionEndQueue", e =>
        {
            e.ConfigureConsumer<AuctionEndConsumer>(context);
        });

        cfg.ReceiveEndpoint("BlockchainBalanceQueue", e =>
        {
            e.ConfigureConsumer<BlockchainBalanceConsumer>(context);
        });
    });
});

builder.Services.AddCors(c => c.AddPolicy("cors", opt =>
{
    opt.WithExposedHeaders(builder.Configuration.GetSection("Cors:AllowHeaders").Get<string[]>()!);
    opt.AllowAnyHeader();
    opt.WithHeaders();
    opt.AllowCredentials();
    opt.AllowAnyMethod();
    opt.WithOrigins(builder.Configuration.GetSection("Cors:Urls").Get<string[]>()!);
}));

builder.Services.AddAuthentication(opt =>
    {
        opt.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
        opt.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
    })
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = builder.Configuration["Jwt:Issuer"]!,
            ValidAudience = builder.Configuration["Jwt:Audience"]!,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Secret"]!))
        };
    });

builder.Services.AddAuthorization(
    options =>
    {
        options.DefaultPolicy =
            new AuthorizationPolicyBuilder(JwtBearerDefaults.AuthenticationScheme)
                .RequireAuthenticatedUser()
                .Build();
    });

builder.Services.AddIdentity<ApplicationUser, IdentityRole<Guid>>()
    .AddRoles<IdentityRole<Guid>>()
    .AddEntityFrameworkStores<DataContext>()
    .AddUserManager<UserManager<ApplicationUser>>()
    .AddSignInManager<SignInManager<ApplicationUser>>();

builder.Services.AddSwaggerGen(option =>
{
    option.SwaggerDoc("v1", new OpenApiInfo {Title = "AuctionChain", Version = "v1"});
    option.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
    {
        In = ParameterLocation.Header,
        Description = "Please enter a valid token",
        Name = "Authorization",
        Type = SecuritySchemeType.Http,
        BearerFormat = "JWT",
        Scheme = "Bearer"
    });
    option.AddSecurityRequirement(new OpenApiSecurityRequirement
    {
        {
            new OpenApiSecurityScheme
            {
                Reference = new OpenApiReference
                {
                    Type = ReferenceType.SecurityScheme,
                    Id = "Bearer"
                }
            },
            Array.Empty<string>()
        }
    });
});

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseStaticFiles();
app.UseHttpsRedirection();

app.UseCors("cors");

app.UseAuthentication();
app.UseAuthorization();
app.MapControllers();

app.Run();