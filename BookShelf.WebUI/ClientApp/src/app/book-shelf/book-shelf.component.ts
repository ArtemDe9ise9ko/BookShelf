import { Component, OnInit, Input, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { IBookResponse, IBookRequest } from '../tools/Interfaces/IBook';
import { BookModalComponent } from './book-modal/book-modal.component';
import { BookService } from '../tools/services/BookHttpService';
import { Chart, registerables } from 'chart.js';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

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
  isModalOpen: boolean = false;
  @ViewChild(BookModalComponent) bookModal!: BookModalComponent;
  selectedDateRange: Date[] = [];
  showChart: boolean = false;
  chart: Chart | undefined;

  constructor(private bookService: BookService, private elementRef: ElementRef) {
    this.loadBooks();
  }
  addResetBookModel(bookModel: IBookResponse) {
    this.readyToResetBookModels.push(bookModel);
  }

  filterBooks() {
    if (this.searchText && this.searchText.trim() !== '') {
      this.filteredBooks = this.books.filter(book =>
        book.title.toLowerCase().includes(this.searchText.toLowerCase()));
    } else {
      this.filteredBooks = this.books;
    }
  }
  filterBooksByDateRange() {
    console.log(this.selectedDateRange.length);
    if (this.selectedDateRange.length === 2) {
    const startDate = new Date(this.selectedDateRange[0]);
    const endDate = new Date(this.selectedDateRange[1]);

    this.filteredBooks = this.books.filter(book =>
      this.isBookWithinDateRange(book, [startDate, endDate])
    );
    } else {
      this.filteredBooks = this.books;
    }
  }
  isBookWithinDateRange(book: IBookResponse, dateRange: Date[]): boolean {
    const publishDate = new Date(book.publishDate);
    const startDate = dateRange[0];
    const endDate = dateRange[1];
    
    return publishDate >= startDate && publishDate <= endDate;
  }
  setThisMonthDateRange() {
    const today = new Date();
    const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
    const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);

    this.selectedDateRange = [monthStart, monthEnd];
    this.filterBooksByDateRange();
  }
  exportToExcel() {
    const visibleRecords = this.searchText === '' && this.selectedDateRange.length !== 2 ? this.books : this.filteredBooks;
    const data = visibleRecords.map(book => ({
      Title: book.title,
      Description: book.description,
      'Page Count': book.pageCount,
      'Publish Date': book.publishDate
    }));
  
    const worksheet = XLSX.utils.json_to_sheet(data);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Books');
  
    XLSX.writeFile(workbook, 'books.xlsx');
  }
  
  exportToPDF() {
    const visibleRecords = this.searchText === '' && this.selectedDateRange.length !== 2 ? this.books : this.filteredBooks;
    const data = visibleRecords.map(book => [
      book.title,
      book.description,
      book.pageCount.toString(),
      book.publishDate
    ]);
  
    const doc = new jsPDF();
    (doc as any).autoTable({
      head: [['Title', 'Description', 'Page Count', 'Publish Date']],
      body: data
    });
  
    doc.save('books.pdf');
  }
  setThisYearDateRange() {
    const today = new Date();
    const yearStart = new Date(today.getFullYear(), 0, 1);
    const yearEnd = new Date(today.getFullYear(), 11, 31);

    this.selectedDateRange = [yearStart, yearEnd];
    this.filterBooksByDateRange();
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
  generateChart() {
    const canvas = this.elementRef.nativeElement.querySelector('#bookChart');
    const years: number[] = [];
    const bookCounts: number[] = [];
  
    this.books.forEach(book => {
      const year = new Date(book.publishDate).getFullYear();
      const index = years.indexOf(year);
  
      if (index !== -1) {
        bookCounts[index]++;
      } else {
        years.push(year);
        bookCounts.push(1);
      }
    });
  
    if (this.chart) {
      this.chart.destroy();
    }
    years.sort((a, b) => b - a);

    this.chart = new Chart(canvas, {
      type: 'bar',
      data: {
        labels: years.map(year => year.toString()),
        datasets: [
          {
            label: 'Number of Books',
            data: bookCounts,
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
            borderColor: 'rgba(54, 162, 235, 1)',
            borderWidth: 1
          }
        ]
      },
      options: {
        scales: {
          x: {
            title: {
              display: true,
              text: 'Year'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Number of Books'
            },
            beginAtZero: true,
            ticks: {
              precision: 0,
              stepSize: 1
            }
          }
        }
      }
    });
  }
  toggleChart() {
    this.showChart = !this.showChart;
  
    if (this.chart) {
      if (this.showChart) {
        this.chart.resize();
      } else {
        this.chart.resize(0, 0);
      }
    }
  }
  loadBooks() {
    this.bookService.loadBooks().subscribe(
      result => {
        this.books = result;
        Chart.register(...registerables);
        this.generateChart();
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
        this.generateChart();
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
          this.generateChart();
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
        this.generateChart();
      },
      error => {
        console.error(error);
      }
    );
  }
}
