﻿using BookShelf.Infra.Dto;
using MediatR;

namespace BookShelf.App.MediatR.BookHandler.Queries
{
    public class GetAllBooksQuery : IRequest<List<BookDto>> { }
}
