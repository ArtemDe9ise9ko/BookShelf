import { Component, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { IBookResponse, IBookRequest } from '../../tools/Interfaces/IBook';
import { BookService } from '../../tools/services/BookHttpService';
import { BookShelfComponent } from '../book-shelf.component';
import { checkYearValidity, titleCaseValidator } from '../../tools/Validator/Validator';

@Component({
  selector: 'app-book-modal',
  templateUrl: './book-modal.component.html',
  styleUrls: ['./book-modal.component.css']
})
export class BookModalComponent {
  @Input() bookModel: IBookResponse | undefined;
  @Input() isUpdateMode!: boolean;
  public bookForm!: FormGroup;
  showValidationErrors = false;
  isLoading = false;

  constructor(
    private formBuilder: FormBuilder,
    private bookService: BookService,
    private bookShelfComponent: BookShelfComponent
  ) {}

  ngOnInit() {
    this.setForm();
  }

  public setForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', [Validators.required, titleCaseValidator]],
      description: ['', Validators.required],
      pageCount: ['', [Validators.required, Validators.max(100000), Validators.min(2)]],
      publishDate: ['', [Validators.required, Validators.maxLength(10)]]
      // , checkYearValidity
    });

    if (this.isUpdateMode && this.bookModel) {
      this.bookForm.patchValue({
        title: this.bookModel.title,
        description: this.bookModel.description,
        pageCount: this.bookModel.pageCount,
        publishDate: this.bookModel.publishDate
      });
    }
  }

  onSubmit() {
    this.showValidationErrors = true;
    if (this.bookForm.invalid || this.isLoading) {
      return;
    }
    this.isLoading = true;

    if (this.isUpdateMode && this.bookModel) {
      this.updateBook();
    } else {
      this.addBook();
    }
  }

  addBook() {
    this.bookService.addBook(this.bookForm.value).subscribe(
      () => {
        this.bookShelfComponent.loadBooks();
        this.isLoading = false;
        this.showValidationErrors = false;
      },
      error => {
        console.error(error);
        this.isLoading = false;
        this.showValidationErrors = false;
      }
    );
  }

  updateBook() {
    const bookId = this.bookModel?.bookId;
    if (bookId) {
      const updatedBook: IBookRequest = {
        bookId,
        ...this.bookForm.value
      };

      this.bookService.updateBook(updatedBook).subscribe(
        () => {
          this.bookShelfComponent.loadBooks();
          this.isLoading = false;
          this.showValidationErrors = false;
        },
        error => {
          console.error(error);
          this.isLoading = false;
          this.showValidationErrors = false;
        }
      );
    }
  }
  resetForm() {
    this.bookForm.reset();
    this.bookForm.markAsPristine();
    this.bookForm.markAsUntouched();
  }
}