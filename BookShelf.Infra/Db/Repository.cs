using BookShelf.Infra.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace BookShelf.Infra.Db
{
    public class Repository<TEntity> : IRepository<TEntity> where TEntity : class
    {
        protected readonly BookShelfContext _context;

        public Repository(BookShelfContext context)
        {
            _context = context;
        }
        public async Task<IEnumerable<TEntity>> GetAll()
        {
            return await _context.Set<TEntity>().ToListAsync();
        }
        public async Task<TEntity> GetById(string id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(Convert.ToInt32(id));
            if(entity == null) 
            {
                throw new NotFoundException($"not found entity by id: {id}");
            }
            return entity!;
        }
        public async Task<int> CreateAsync(TEntity entity)
        {
            await _context.Set<TEntity>().AddAsync(entity);
            try
            {
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (ex.InnerException!.Message.Contains("The INSERT statement conflicted with the FOREIGN KEY constraint"))
                {
                    throw new NotFoundException(ex.Message);
                }
                throw;
            }
        }

        public async Task<int> Delete(string id)
        {
            var entity = await _context.Set<TEntity>().FindAsync(Convert.ToInt32(id));
            if (entity == null)
            {
                throw new NotFoundException($"Entity with id '{id}' not found.");
            }

            _context.Set<TEntity>().Remove(entity);
            return await _context.SaveChangesAsync();
        }

        public async Task<int> UpdateAsync(TEntity? entity)
        {
            if (entity == null)
            {
               throw new NotFoundException($"'{entity}' is null.");
            }

            _context.Set<TEntity>().Update(entity);

            try
            {
                return await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                if (ex.InnerException!.Message.Contains("The UPDATE statement conflicted with the FOREIGN KEY constraint"))
                {
                    throw new NotFoundException(ex.Message);
                }
                throw;
            }
        }
    }
}
