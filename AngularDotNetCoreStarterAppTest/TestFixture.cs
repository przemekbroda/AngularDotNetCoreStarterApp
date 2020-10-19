using AngularDotNetCoreStarterApp.Service.Implementation;
using AngularDotNetCoreStarterApp.Service.Interface;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;

namespace AngularDotNetCoreStarterAppTest
{
    public class TestFixture
    {
        public ServiceProvider ServiceProvider { get; private set; }

        public TestFixture() 
        {
            var serviceCollection = new ServiceCollection();

            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppContext.BaseDirectory)
                .AddJsonFile("appsettings.json")
                .Build();

            serviceCollection.AddSingleton<IConfiguration>(configuration);
            serviceCollection.AddScoped<IUserService, UserService>();

            serviceCollection.BuildServiceProvider();
        }
    }
}
