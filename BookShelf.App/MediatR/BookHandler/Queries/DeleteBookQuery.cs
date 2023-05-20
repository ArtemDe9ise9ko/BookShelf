using MediatR;

namespace BookShelf.App.MediatR.BookHandler.Queries
{
    public class DeleteBookQuery : IRequest
    {
        public string Id { get; set; } = null!;
    }
}
