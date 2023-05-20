using BookShelf.Infra.Dto;
using MediatR;

namespace BookShelf.App.MediatR.BookHandler.Queries
{
    public class GetByIdBookQuery : IRequest<BookDto>
    {
        public string Id { get; set; } = null!;
    }
}
