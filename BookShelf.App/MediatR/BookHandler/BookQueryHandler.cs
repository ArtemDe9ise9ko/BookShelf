using BookShelf.App.Interfaces;
using BookShelf.App.MediatR.BookHandler.Queries;
using BookShelf.Infra.Dto;
using MediatR;

namespace BookShelf.App.MediatR.BookHandler
{
    public class BookQueryHandler :
        IRequestHandler<GetAllBooksQuery, List<BookDto>>,
        IRequestHandler<GetByIdBookQuery, BookDto>,
        IRequestHandler<AddBookQuery>,
        IRequestHandler<UpdateBookQuery>,
        IRequestHandler<DeleteBookQuery>
    {
        private readonly IBookShelfService _bookShelfService;

        public BookQueryHandler(IBookShelfService bookShelfService)
        {
            _bookShelfService = bookShelfService;
        }

        public async Task<List<BookDto>> Handle(GetAllBooksQuery request, CancellationToken cancellationToken)
        {
            return await _bookShelfService.GetAll();
        }
        public async Task<BookDto> Handle(GetByIdBookQuery request, CancellationToken cancellationToken)
        {
            return await _bookShelfService.GetById(request.Id);
        }
        public async Task Handle(AddBookQuery request, CancellationToken cancellationToken)
        {
            await _bookShelfService.Add(request.BookDto);
        }
        public async Task Handle(UpdateBookQuery request, CancellationToken cancellationToken)
        {
            await _bookShelfService.Update(request.Id, request.BookDto);
        }
        public async Task Handle(DeleteBookQuery request, CancellationToken cancellationToken)
        {
            await _bookShelfService.Delete(request.Id);
        }
    }
}
