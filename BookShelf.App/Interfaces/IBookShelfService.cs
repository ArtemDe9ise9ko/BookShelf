using BookShelf.Domain.Models;
using BookShelf.Infra.Dto;

namespace BookShelf.App.Interfaces
{
    public interface IBookShelfService
    {
        Task<List<BookDto>> GetAll();
        Task<BookDto> GetById(string id);
        Task Add(BookDto model);
        Task Update(string id, BookDto model);
        Task Delete(string id);
    }
}
