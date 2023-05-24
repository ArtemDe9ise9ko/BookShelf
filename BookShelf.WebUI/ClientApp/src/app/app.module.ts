import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { BookShelfComponent } from './book-shelf/book-shelf.component';
import { BookModalComponent } from './book-shelf/book-modal/book-modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from './DemoMaterialModule';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
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
    BrowserAnimationsModule,
    DemoMaterialModule,
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
  providers: [
    { provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: { appearance: 'fill' } },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }