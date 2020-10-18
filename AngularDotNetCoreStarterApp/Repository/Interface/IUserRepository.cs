using AngularDotNetCoreStarterApp.Model;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Repository
{
    public interface IUserRepository : IBaseRepository<User>
    {
        public Task<User> GetUserByUsername(string username);
    }
}
