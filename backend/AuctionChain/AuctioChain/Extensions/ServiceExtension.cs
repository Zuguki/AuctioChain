using System;
using Microsoft.Extensions.DependencyInjection;
// using Nest;

namespace AuctioChain.Extensions;

public static class ServiceExtension
{
    public static void AddElasticsearch(this IServiceCollection services)
    {
        // var settings = new ConnectionSettings(new Uri("http://localhost:9200"))
        //     .DefaultIndex("auctions");
        // var client = new ElasticClient(settings);
        //
        // services.AddSingleton<IElasticClient>(client);
    }
}