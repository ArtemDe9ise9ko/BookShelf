import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { IBookResponse } from '../tools/Interfaces/IBook';
import { BookModalComponent } from './book-modal/book-modal.component';
import { BookService } from '../tools/services/BookHttpService';
import { ExportService } from '../tools/services/BookExportService';
import { BookChartService } from '../tools/services/BookChartService';
import { BookSortService } from '../tools/services/BookSortSevice';
import { BookFilterService } from '../tools/services/BookFilterService';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-book-shelf',
  templateUrl: './book-shelf.component.html',
  styleUrls: ['./book-shelf.component.css']
})
export class BookShelfComponent {
  books: IBookResponse[] = [];
  filteredBooks: IBookResponse[] = [];
  readyToResetBookModels: IBookResponse[] = [];
  @Input() book?: IBookResponse;
  searchText: string = '';
  selectedBookId: string | undefined;
  sortDirection: 'asc' | 'desc' = 'asc';
  @ViewChild(BookModalComponent) bookModal!: BookModalComponent;
  selectedDateRange: Date[] = [];
  showChart: boolean = false;
  chart: Chart | undefined;
  
  constructor(private bookService: BookService, private elementRef: ElementRef, private exportService: ExportService,
    private chartService: BookChartService, private sortService: BookSortService, private filterService: BookFilterService) {
    this.loadBooks();
  }
  addResetBookModel(bookModel: IBookResponse) {
    this.readyToResetBookModels.push(bookModel);
  }

  setThisYearDateRange() {
    this.selectedDateRange = this.filterService.setThisYearDateRange();
    this.filterBooksByDateRange();
  }
  
  setThisMonthDateRange() {
    this.selectedDateRange = this.filterService.setThisMonthDateRange();
    this.filterBooksByDateRange();
  }
  filterBooksByDateRange() {
    this.filteredBooks = this.filterService.filterBooksByDateRange(this.books, this.selectedDateRange);
  }
  filterBooks() {
    this.filteredBooks = this.filterService.filterBooks(this.books, this.searchText);
  }
  exportToExcel() {
    this.exportService.exportToExcel(this);
  }
  exportToPDF() {
    this.exportService.exportToPDF(this);
  }
  selectBook(bookId: string) {
    this.selectedBookId = bookId;
  }
  sortBooksByField(field: string) {
    this.books = this.sortService.sortBooksByField(this.books, field, this.sortDirection);
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }
  openEditModal(book: IBookResponse) {
    setTimeout(() => {}, 1);
    this.bookModal.bookModel = book;
    this.bookModal.isUpdateMode = true;
  }
  openAddModal(){
    setTimeout(() => {}, 1);
    this.bookModal.bookModel = undefined;
    this.bookModal.isUpdateMode = false;
  }
  toggleChart() {
    this.chartService.toggleChart();
  }
  loadBooks() {
    this.bookService.loadBooks().subscribe(
      result => {
        this.books = result;
        this.chartService.generateChart(this.books, this.elementRef);
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
        this.chartService.generateChart(this.books, this.elementRef);
      },
      error => {
        console.error(error);
      }
    );
  }
  public isBookReadyToReset(bookId: string): boolean {
    return this.readyToResetBookModels.some(model => model.bookId === bookId);
  }
  resetBook(bookId: string) {
    const bookr = this.readyToResetBookModels.find(model => model.bookId === bookId);
    const index = this.readyToResetBookModels.findIndex(model => model.bookId === bookId);
    if (index !== -1) {
      this.readyToResetBookModels.splice(index, 1)[0];
      this.bookService.updateBook(bookr!).subscribe(
        () => {
          this.loadBooks();
          this.chartService.generateChart(this.books, this.elementRef);
        },
        error => {
          console.error(error);
        }
      );
    }
  }
  getBookById(id: string) {
    this.bookService.getBookById(id).subscribe(
      result => {
        console.log(result);
        this.chartService.generateChart(this.books, this.elementRef);
      },
      error => {
        console.error(error);
      }
    );
  }
}
