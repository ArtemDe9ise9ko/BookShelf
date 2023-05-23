using AutoMapper;
using BookShelf.App.Interfaces;
using BookShelf.Domain.Models;
using BookShelf.Infra.Db;
using BookShelf.Infra.Dto;

namespace BookShelf.App.Services
{
    public class BookShelfService : IBookShelfService
    {
        private readonly IMapper _mapper;
        private readonly IRepository<Book> _bookRepository;
        public BookShelfService(IMapper mapper, IRepository<Book> bookRepository)
        {
            _mapper = mapper;
            _bookRepository = bookRepository;
        }

        public async Task Add(BookDtoRequest model)
        {
            await _bookRepository.CreateAsync(_mapper.Map<Book>(model));
        }
        public async Task Delete(string id)
        {
            await _bookRepository.Delete(id);
        }

        public async Task<List<BookDtoResponse>> GetAll()
        {
            var dates = await _bookRepository.GetAll();

            return dates.Select(_mapper.Map<BookDtoResponse>).ToList();
        }

        public async Task<BookDtoResponse> GetById(string id)
        {
            return _mapper.Map<BookDtoResponse>(await _bookRepository.GetById(id));
        }

        public async Task Update(BookDtoResponse model)
        {
            await _bookRepository.UpdateAsync(_mapper.Map<Book>(model));

        }
    }
}
