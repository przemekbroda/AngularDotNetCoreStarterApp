using AngularDotNetCoreStarterApp.Model;
using Microsoft.EntityFrameworkCore;

namespace AngularDotNetCoreStarterApp.Repository
{
    public class DataContext : DbContext
    {
        public DbSet<User> Users { get; set; }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {
        }
    }
}
