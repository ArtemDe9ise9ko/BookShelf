using BookShelf.Infra.Dto;
using MediatR;

namespace BookShelf.App.MediatR.BookHandler.Queries
{
    public class AddBookQuery : IRequest
    {
        public BookDto BookDto { get; set; } = null!;
    }
}
