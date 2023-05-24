import { Component, Inject, Input, ViewChild } from '@angular/core';
import { IBookResponse, IBookRequest } from '../tools/Interfaces/IBook';
import { BookModalComponent } from './book-modal/book-modal.component';
import { BookService } from '../tools/services/BookHttpService';

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
  @ViewChild(BookModalComponent) bookModal!: BookModalComponent;
  selectedDateRange: Date[] = [];

  constructor(private bookService: BookService,) {
    this.loadBooks();
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
  openEditModal(book: IBookResponse) {
    this.bookModal.bookModel = book;
    this.bookModal.isUpdateMode = true;
  }
  isBookWithinDateRange(book: IBookResponse, dateRange: Date[]): boolean {
    const publishDate = new Date(book.publishDate);
    const startDate = dateRange[0];
    const endDate = dateRange[1];
  
    return publishDate >= startDate && publishDate <= endDate;
  }
  setThisMonth() {
    const startDate = new Date();
    startDate.setDate(1);
    const endDate = new Date();
    this.selectedDateRange = [startDate, endDate];
  }
  setThisYear() {
    const startDate = new Date();
    startDate.setMonth(0, 1);
    const endDate = new Date();
    this.selectedDateRange = [startDate, endDate];
  }

  loadBooks() {
    this.bookService.loadBooks().subscribe(
      result => {
        this.books = result;
      },
      error => {
        console.error(error);
      }
    );
  }
  removeBook(id: string) {
    this.bookService.removeBook(id).subscribe(
      () => {
        this.loadBooks();
      },
      error => {
        console.error(error);
      }
    );
  }
  getBookById(id: string) {
    this.bookService.getBookById(id).subscribe(
      result => {
        console.log(result);
      },
      error => {
        console.error(error);
      }
    );
  }
}
