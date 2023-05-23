import { Component, Inject  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { IBookRequest } from '../../../tools/Interfaces/IBook'
import { BookShelfComponent } from '../../book-shelf.component'
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { checkYearValidity, titleCaseValidator } from '../../../tools/Validator/Validator';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.css']
})
export class AddBookModalComponent {
  public newBookForm: FormGroup;
  showValidationErrors = false;

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string, private bookShelf: BookShelfComponent, private formBuilder: FormBuilder) { 
    this.newBookForm = this.createFormGroup();
  }

  createFormGroup(): FormGroup {
    return this.formBuilder.group({
      title: ['', Validators.required, titleCaseValidator],
      description: ['', Validators.required],
      pageCount: ['', [Validators.required, Validators.max(100000),Validators.min(2)]],
      publishDate: [Validators.required, Validators.maxLength(10), checkYearValidity]
    });
  }
  
  get newBook() {
    return this.newBookForm.value as IBookRequest;
  }

  addBook() {
    this.showValidationErrors = true;
    if (this.newBookForm.invalid) {
      return;
    }

    this.http.post(this.baseUrl + 'BookShelf/AddBook', this.newBook).subscribe(
      () => {
        this.bookShelf.loadBooks();
        this.newBookForm.reset();
        this.showValidationErrors = false;
      },
      error => {
        console.error(error);
      }
    );
  }
}
