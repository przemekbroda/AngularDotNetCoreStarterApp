using AngularDotNetCoreStarterApp.Model;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Repository
{
    public class UserRepository : BaseRepository<User>, IUserRepository
    {
        private readonly DataContext _context;

        public UserRepository(DataContext context) : base(context)
        {
            _context = context;
        }

        public async Task<User> GetUserByUsername(string username)
        {
            return await _context
                .Users
                .Where(u => u.Username.ToLower() == username.ToLower())
                .FirstOrDefaultAsync();
        }




    }
}
