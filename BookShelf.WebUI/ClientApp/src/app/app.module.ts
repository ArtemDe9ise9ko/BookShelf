import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BookShelfComponent } from './book-shelf/book-shelf.component';
import { BookModalComponent } from './book-shelf/book-modal/book-modal.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';

@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    BookShelfComponent,
    BookModalComponent,
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatDatepickerModule,
    MatInputModule,
    MatNativeDateModule,
    RouterModule.forRoot([
      { path: '',   redirectTo: 'book-shelf', pathMatch: 'full' },
      { path: '**', redirectTo: 'book-shelf', pathMatch: 'full' },
      { path: 'book-shelf', component: BookShelfComponent },
    ])
  ],
  exports: [
    BookShelfComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
