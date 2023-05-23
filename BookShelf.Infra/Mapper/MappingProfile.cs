using BookShelf.Domain.Models;
using BookShelf.Infra.Dto;
using AutoMapper;

namespace BookShelf.Infra.Mapper
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<BookDtoRequest, Book>()
                .ForMember(dest => dest.PageCount, opt => opt.MapFrom(src => Convert.ToInt32(src.PageCount)))
                .ForMember(dest => dest.PublishDate, opt => opt.MapFrom(src => DateTime.Parse(src.PublishDate).Date));

            CreateMap<BookDtoResponse, Book>()
                .ForMember(dest => dest.Id, opt => opt.MapFrom(src => Convert.ToInt32(src.BookId)))
                .ForMember(dest => dest.PageCount, opt => opt.MapFrom(src => Convert.ToInt32(src.PageCount)))
                .ForMember(dest => dest.PublishDate, opt => opt.MapFrom(src => DateTime.Parse(src.PublishDate).Date));

            CreateMap<Book, BookDtoResponse>()
                .ForMember(dest => dest.BookId, opt => opt.MapFrom(src => src.Id.ToString()))
                .ForMember(dest => dest.PageCount, opt => opt.MapFrom(src => src.PageCount.ToString()))
                .ForMember(dest => dest.PublishDate, opt => opt.MapFrom(src => src.PublishDate.ToString("yyyy-MM-dd")));
        }
    }
}
