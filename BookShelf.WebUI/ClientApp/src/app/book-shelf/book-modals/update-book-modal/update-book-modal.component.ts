import { Component, Inject, OnInit, Input  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { checkYearValidity, titleCaseValidator } from '../../../tools/Validator/Validator';
//import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IBookResponse, IBookRequest } from '../../../tools/Interfaces/IBook';

@Component({
  selector: 'app-update-book-modal',
  templateUrl: './update-book-modal.component.html',
  styleUrls: ['./update-book-modal.component.css']
})
export class UpdateBookModalComponent {
  // @Input() bookModel!: IBookResponse;
  // selectedBook!: IBookResponse; // Add definite assignment assertion operator '!'
  // public editBookForm!: FormGroup; // Add definite assignment assertion operator '!'
  // showValidationErrors = false;
  // isLoading = false;

  // constructor(
  //   private http: HttpClient,
  //   @Inject('BASE_URL') private baseUrl: string,
  //   private formBuilder: FormBuilder,
  //   //public modal: NgbActiveModal
  // ) {}

  // ngOnInit() {
  //   this.setForm();
  // }

  // private setForm() {
  //   console.log(this.selectedBook);

  //   this.editBookForm = this.formBuilder.group({
  //     id: [this.selectedBook?.id],
  //     title: [this.selectedBook?.title, [Validators.required, titleCaseValidator]],
  //     description: [this.selectedBook?.description, Validators.required],
  //     pageCount: [this.selectedBook?.pageCount, [Validators.required, Validators.max(100000), Validators.min(2)]],
  //     publishDate: [this.selectedBook?.publishDate, [Validators.required, Validators.maxLength(10), checkYearValidity]]
  //   });
  // }

  // onSubmit() {
  //   this.showValidationErrors = true;
  //   if (this.editBookForm.invalid || this.isLoading) {
  //     return;
  //   }
  //   this.isLoading = true;

  //   this.http.post<IBookRequest>(this.baseUrl + 'BookShelf/UpdateBook', this.editBookForm.value).subscribe(
  //     () => {
  //       this.editBookForm.reset();
  //       this.isLoading = false;
  //       this.showValidationErrors = false;
  //       //this.modal.dismiss('success');
  //     },
  //     error => {
  //       console.error(error);
  //       this.isLoading = false;
  //       this.showValidationErrors = false;
  //     }
  //   );
  // }

  // get editFormData() {
  //   return this.editBookForm.controls;
  // }
}