import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PublicacionesResponse } from '../models/publicaciones.view';
import { ApiService } from '../services/rest-api/api.service';

const template = /*html*/`
<div class="container">
  <div class="d-flex flex-column">
    <div class="container p-2 mt-5 mb-5 posts-container">
      <app-text-field
        placeholder="¿Qué estás pensando?">
      </app-text-field>
    </div>

    <div *ngFor="let post of posts" 
      class="container p-2 mt-2 posts-container">
      <app-post
        [value]="post">
      </app-post>
    </div>
  </div>
</div>
`;

const styles = [/*css*/`
.posts-container {
  background-color: #242526;
  border-radius: 10px;
  width: 100%;
}
`];

@Component({
  selector: 'app-home',
  template,
  styles
})
export class HomeComponent implements OnInit {

  isLoadingPosts: boolean = false;
  posts: PublicacionesResponse[] = [];

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    this.isLoadingPosts = true;
    try {
      this.posts = await this.api.publicaciones.getAllPosts(environment.IdUsuario);
      console.log("this.posts:", this.posts);
    } finally {
      this.isLoadingPosts = false;
    }
  }
}
