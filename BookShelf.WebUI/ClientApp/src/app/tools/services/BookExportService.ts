import { Injectable } from '@angular/core';
import { BookShelfComponent } from '../../book-shelf/book-shelf.component';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

@Injectable({
  providedIn: 'root'
})
export class ExportService {

  exportToExcel(bookShelf: BookShelfComponent) {
    const visibleRecords = bookShelf.searchText === '' && bookShelf.selectedDateRange.length !== 2 ? bookShelf.books : bookShelf.filteredBooks;
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

  exportToPDF(bookShelf: BookShelfComponent) {
    const visibleRecords = bookShelf.searchText === '' && bookShelf.selectedDateRange.length !== 2 ? bookShelf.books : bookShelf.filteredBooks;
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
}
