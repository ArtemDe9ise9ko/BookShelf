using BookShelf.Infra.Dto;
using MediatR;

namespace BookShelf.App.MediatR.BookHandler.Queries
{
    public class UpdateBookQuery : IRequest
    {
        public BookDtoResponse BookDtoResponse { get; set; } = null!;
    }
}
