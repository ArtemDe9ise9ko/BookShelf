using BookShelf.Infra.Dto;
using MediatR;

namespace BookShelf.App.MediatR.BookHandler.Queries
{
    public class AddBookQuery : IRequest
    {
        public BookDtoRequest BookDto { get; set; } = null!;
    }
}
