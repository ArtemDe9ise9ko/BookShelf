﻿namespace BookShelf.Infra.Dto
{
    public class BookDto
    {
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        public string PageCount { get; set; } = null!;
        public string PublishDate { get; set; } = null!;
    }
}
