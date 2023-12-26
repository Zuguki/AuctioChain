using AuctioChain.BL.Profile;
using AuctioChain.DAL.EF;
using AuctioChain.MQ.Services;
using RabbitMQ.Client;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<DataContext>();
builder.Services.AddScoped<IProfileManager, ProfileManager>();

builder.Services.AddSingleton<IConnectionFactory>(_ => new ConnectionFactory
{
    Endpoint = new AmqpTcpEndpoint(builder.Configuration["RabbitMQ:Uri"]),
    DispatchConsumersAsync = true,
});
builder.Services.AddHostedService<BlockchainBalanceListener>();

var app = builder.Build();

app.Run();