using System;
using MediatR;
using System.Linq;
using AuctioChain.BL.Behaviours;
using AuctioChain.BL.Mediator;
using AuctioChain.Libs.Mediatr;
using AuctioChain.Libs.Serilog;
using Microsoft.AspNetCore.Builder;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Serilog;

var builder = WebApplication.CreateBuilder(args);
var assemblies = AppDomain.CurrentDomain.GetAssemblies();

builder.Host.UseSerilog(SerilogConfiguration.Connect);

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddMediatR(MediatrConfiguration.Connect, assemblies);
builder.Services.AddScoped(typeof(IPipelineBehavior<,>), typeof(ValidationBehaviour<,>));

var types = assemblies
    .SelectMany(a => a
        .GetTypes()
        .Where(t => t is {IsAbstract: false, IsGenericTypeDefinition: false}));

foreach (var type in types)
{
    var validatorInterface = type.GetInterfaces()
        .FirstOrDefault(t => t.IsGenericType && t.GetGenericTypeDefinition() == typeof(IValidator<>));
    
    if (validatorInterface is not null)
        builder.Services.AddSingleton(validatorInterface, type);
}

var app = builder.Build();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();
app.Run();