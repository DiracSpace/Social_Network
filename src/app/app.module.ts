import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { NgbActiveModal, NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { TextFieldComponent } from './components/text-field.component';
import { PostComponent } from './components/post.component';
import { HomeComponent } from './views/home.component';
import { CreatePostModalComponent } from './components/modals/create-post-modal.component';

const modals = [
  CreatePostModalComponent
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    TextFieldComponent,
    PostComponent,
    CreatePostModalComponent
  ],
  entryComponents: [
    ...modals
  ],
  imports: [
    NgxSkeletonLoaderModule,
    CommonModule,
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
  ],
  providers: [
    NgbActiveModal
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
