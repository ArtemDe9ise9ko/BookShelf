import { Injectable } from '@angular/core';
import { IBookResponse } from '../Interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookFilterService {
    
    filterBooksByDateRange(books: IBookResponse[], selectedDateRange: Date[]): IBookResponse[] {
        if (selectedDateRange.length === 2) {
          const startDate = new Date(selectedDateRange[0]);
          const endDate = new Date(selectedDateRange[1]);
      
          return books.filter(book =>
            this.isBookWithinDateRange(book, [startDate, endDate])
          );
        } else {
          return books;
        }
      }
      
      isBookWithinDateRange(book: IBookResponse, dateRange: Date[]): boolean {
        const publishDate = new Date(book.publishDate);
        const startDate = dateRange[0];
        const endDate = dateRange[1];
        
        return publishDate >= startDate && publishDate <= endDate;
      }
      
      filterBooks(books: IBookResponse[], searchText: string): IBookResponse[] {
        if (searchText && searchText.trim() !== '') {
          return books.filter(book =>
            book.title.toLowerCase().includes(searchText.toLowerCase())
          );
        } else {
          return books;
        }
      }
      
      setThisMonthDateRange(): Date[] {
        const today = new Date();
        const monthStart = new Date(today.getFullYear(), today.getMonth(), 1);
        const monthEnd = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      
        return [monthStart, monthEnd];
      }
      
      setThisYearDateRange(): Date[] {
        const today = new Date();
        const yearStart = new Date(today.getFullYear(), 0, 1);
        const yearEnd = new Date(today.getFullYear(), 11, 31);
      
        return [yearStart, yearEnd];
      }
}