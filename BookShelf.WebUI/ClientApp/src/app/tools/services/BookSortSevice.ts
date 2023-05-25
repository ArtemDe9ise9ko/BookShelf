import { Injectable } from '@angular/core';
import { IBookResponse } from '../Interfaces/IBook';

@Injectable({
  providedIn: 'root'
})
export class BookSortService {
    
  sortBooksByField(books: IBookResponse[], field: string, sortDirection: 'asc' | 'desc'): IBookResponse[] {
    return books.sort((a, b) => {
      const valueA = a[field].toLowerCase();
      const valueB = b[field].toLowerCase();
        
      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }
}