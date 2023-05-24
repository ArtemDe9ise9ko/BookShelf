import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IBookResponse, IBookRequest } from '../Interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {}

  loadBooks(): Observable<IBookResponse[]> {
    return this.http.get<IBookResponse[]>(this.baseUrl + 'BookShelf/GetBooks');
  }
  getBookById(id: string): Observable<IBookResponse> {
    return this.http.get<IBookResponse>(this.baseUrl + 'BookShelf/GetBookById', { params: { id: id } });
  }
  removeBook(id: string): Observable<any> {
    return this.http.delete<any>(this.baseUrl + 'BookShelf/DeleteBook', { params: { id: id } });
  }
  updateBook(book: IBookRequest): Observable<any> {
    return this.http.put<any>(this.baseUrl + 'BookShelf/UpdateBook', book);
  }
  addBook(book: IBookRequest): Observable<any> {
    return this.http.post<any>(this.baseUrl + 'BookShelf/AddBook', book);
  }
}