namespace BookShelf.Infra.Dto
{
    public class BookDtoResponse
    {
        public string BookId {  get; set; } = null!;
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string PageCount { get; set; } = null!;
        public string PublishDate { get; set; } = null!;
    }
}
