import { Component, Inject, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBookResponse, IBookRequest } from '../tools/Interfaces/IBook';
import { UpdateBookModalComponent } from './book-modals/update-book-modal/update-book-modal.component';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent {
  books: IBookResponse[] = [];
  filteredBooks: IBookResponse[] = [];
  searchText: string = '';
  @Input() book?: IBookResponse;
  selectedBookId: string | undefined;
  sortDirection: 'asc' | 'desc' = 'asc';
  isModalOpen: boolean = false;
  @Output() selectedBook!: IBookResponse;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
    this.loadBooks();
  }
  loadBooks() {
    this.http.get<IBookResponse[]>(this.baseUrl + 'BookShelf/GetBooks').subscribe(
      result => {
        this.books = result;
      },
      error => {
        console.error(error);
      }
    );
  }
  removeBook(id: string) {
    this.http.delete(this.baseUrl + 'BookShelf/DeleteBook', { params: { id: id }}).subscribe(
      () => {
        this.loadBooks(); 
      },
      error => {
        console.error(error);
      }
    );
  }
  getBookById(id: string) {
    this.http.get<IBookResponse>(this.baseUrl + 'BookShelf/GetBookById', { params: { id: id }}).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.error(error);
      }
    );
  }
  filterBooks() {
    if (this.searchText && this.searchText.trim() !== '') {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchText.toLowerCase())
      );
    } else {
      this.filteredBooks = this.books;
    }
  }
  selectBook(bookId: string) {
    this.selectedBookId = bookId;
  }
  sortBooksByField(field: string) {
    const sortDirection = this.sortDirection === 'asc' ? 1 : -1;

    this.books.sort((a, b) => {
      const valueA = a[field].toLowerCase();
      const valueB = b[field].toLowerCase();

      if (valueA < valueB) {
        return sortDirection * -1;
      }
      if (valueA > valueB) {
        return sortDirection;
      }
      return 0;
    });

    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
  editBook(bookModel: IBookResponse) {
    this.selectedBook = bookModel;
    //this.modalService.open(UpdateBookModalComponent);
  }
}
