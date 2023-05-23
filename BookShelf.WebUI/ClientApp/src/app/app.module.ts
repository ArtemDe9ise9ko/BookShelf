import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BookShelfComponent } from './book-shelf/book-shelf.component';
import { AddBookModalComponent } from './book-shelf/book-modals/add-book-modal/add-book-modal.component';
import { UpdateBookModalComponent } from './book-shelf/book-modals/update-book-modal/update-book-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BookShelfComponent,
    AddBookModalComponent,
    UpdateBookModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '',   redirectTo: 'book-shelf', pathMatch: 'full' },
      { path: '**', redirectTo: 'book-shelf', pathMatch: 'full' },
      { path: 'book-shelf', component: BookShelfComponent },
    ])
  ],
  exports: [
    AddBookModalComponent,
    BookShelfComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
