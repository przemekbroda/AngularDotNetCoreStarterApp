using System;
using Xunit;

namespace AngularDotNetCoreStarterAppTest
{
    public class UnitTest1 : IClassFixture<TestFixture>, IDisposable
    {
        private IServiceProvider _serviceProvider;

        public UnitTest1(TestFixture testFixture)
        {
            _serviceProvider = testFixture.ServiceProvider;
        }

        [Fact]
        public void Test1()
        {

        }

        public void Dispose()
        {

        }
    }
}
