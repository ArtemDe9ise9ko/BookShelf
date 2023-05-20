using BookShelf.Infra.Dto;
using MediatR;

namespace BookShelf.App.MediatR.BookHandler.Queries
{
    public class UpdateBookQuery : IRequest
    {
        public string Id { get; set; } = null!;
        public BookDto BookDto { get; set; } = null!;
    }
}
