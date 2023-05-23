using BookShelf.Domain.Models;
using BookShelf.Infra.Dto;

namespace BookShelf.App.Interfaces
{
    public interface IBookShelfService
    {
        Task<List<BookDtoResponse>> GetAll();
        Task<BookDtoResponse> GetById(string id);
        Task Add(BookDtoRequest model);
        Task Update(BookDtoResponse model);
        Task Delete(string id);
    }
}
