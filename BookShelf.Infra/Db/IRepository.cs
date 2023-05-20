using Microsoft.EntityFrameworkCore.Query;
using System.Linq.Expressions;

namespace BookShelf.Infra.Db
{
    public interface IRepository<TEntity> where TEntity : class
    {
        Task<IEnumerable<TEntity>> GetAll();
        Task<TEntity> GetById(string id);
        Task<int> CreateAsync(TEntity entity);
        Task<int> UpdateAsync(TEntity? entity);
        Task<int> Delete(string id);
    }
}
