using BookShelf.Domain.Models;
using BookShelf.Infra.Dto;
using AutoMapper;

namespace BookShelf.Infra.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookDto, Book>()
                .ForMember(m => m.PageCount, opt => opt.MapFrom(r => Convert.ToInt32(r.PageCount)))
                .ForMember(m => m.PublishDate, opt => opt.MapFrom(r => DateTime.Parse(r.PublishDate).Date));

            CreateMap<Book, BookDto>()
                .ForMember(m => m.PageCount, opt => opt.MapFrom(r => r.PageCount))
                .ForMember(m => m.PublishDate, opt => opt.MapFrom(r => DateTime.Parse(r.PublishDate.ToString("yy MM dd")).Date));
        }
    }
}
