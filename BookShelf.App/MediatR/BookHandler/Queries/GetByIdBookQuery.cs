using BookShelf.Infra.Dto;
using MediatR;

namespace BookShelf.App.MediatR.BookHandler.Queries
{
    public class GetByIdBookQuery : IRequest<BookDtoResponse>
    {
        public string Id { get; set; } = null!;
    }
}
