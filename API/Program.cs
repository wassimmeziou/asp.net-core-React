using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Persistence;

namespace API
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var host = CreateHostBuilder(args).Build();
            using var scope = host.Services.CreateScope();

            var service = scope.ServiceProvider;
            try
            {
               var context = service.GetRequiredService<DataContext>();
               await context.Database.MigrateAsync();
               await Seed.SeedData(context);
            }
            catch (System.Exception ex)
            {
                
                var logger = service.GetRequiredService<ILogger<Program>>();
                logger.LogError(ex,"Error occured while migration");
            }
            await host.RunAsync();
            
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder =>
                {
                    webBuilder.UseStartup<Startup>();
                });
    }
}
