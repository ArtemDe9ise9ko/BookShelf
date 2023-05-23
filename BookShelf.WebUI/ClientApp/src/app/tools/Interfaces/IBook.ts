export interface IBookResponse {
    title: string;
    description: string;
    pageCount: string;
    publishDate: string;
    bookId: string;
    [key: string]: any;
  }
export interface IBookRequest {
    title: string;
    description: string;
    pageCount: string;
    publishDate: string;
  }