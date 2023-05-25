using BookShelf.Infra.Attributes;
using System.ComponentModel.DataAnnotations;

namespace BookShelf.Infra.Dto
{
    public class BookDtoResponse
    {
        [Required]
        public string BookId { get; set; } = null!;
        [Required]
        [FirstLetterUppercase]
        public string Title { get; set; } = null!;
        [Required]
        public string Description { get; set; } = null!;
        [Required]
        [Range(2, int.MaxValue, ErrorMessage = "Page Count must be between 2 and the maximum allowed value.")]
        public string PageCount { get; set; } = null!;
        [Required]
        [MaxLength(10)]
        public string PublishDate { get; set; } = null!;
    }
}
