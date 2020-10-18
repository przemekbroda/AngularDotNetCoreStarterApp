using AngularDotNetCoreStarterApp.Model;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace AngularDotNetCoreStarterApp.Repository
{
    public class BaseRepository<T> : IBaseRepository<T> where T : BaseEntity
    {
        protected BaseRepository(DbContext context)
        {
            _context = context;
        }

        private DbContext _context { get; set; }

        public async Task AddAsync(T entity)
        {
            await _context.AddAsync(entity);
        }

        public async Task<T> GetByIdAsync(long id)
        {
            return await _context.Set<T>().FirstOrDefaultAsync(e => e.Id == id);
        }

        public async Task<List<T>> GetAllAsList()
        {
            return await _context.Set<T>().ToListAsync();
        }

        public void Remove(T entity)
        {
            _context.Remove(entity);
        }

        public async Task<bool> SaveChanges()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        
    }
}
