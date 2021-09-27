import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { environment } from 'src/environments/environment';
import { PublicacionesRequest, PublicacionesResponse } from '../models/publicaciones.view';
import { ApiService } from '../services/rest-api/api.service';

const template = /*html*/`
<div class="container">
  <div class="d-flex flex-column">
    <div class="container p-2 mt-5 mb-5 posts-container">
      <app-text-field
        [readonly]="true"
        (click)="openCreatePostModal()"
        (removed)="onClickRemove($event)"
        placeholder="¿Qué estás pensando?">
      </app-text-field>
    </div>

    <div *ngFor="let post of posts" 
      class="container p-2 mt-2 mb-5 posts-container">
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
    private active: NgbActiveModal
  ) { }

  ngOnInit(): void {
    this.init();
  }

  openCreatePostModal() {
    this.api.modals.openPostModal().then(
      (post: PublicacionesRequest) => {
        if (post === undefined) {
          this.active.close();
        } else {
          this.createPost(post)
        }
      }
    ).catch(
      (error: any) => console.error(error)
    )
  }

  onClickRemove(postId: any) {
    this.posts = this.posts.filter(post => post.idPublicacion != postId);
  }

  private async createPost(post: PublicacionesRequest) {
    try {
      const createdPost = await this.api.publicaciones.createPost(post);
      this.posts.push(createdPost);
    } catch (err) {
      console.error(err)
    } finally {
      console.log("done creating post");
    }
  }

  private async init() {
    this.isLoadingPosts = true;
    try {
      this.posts = await this.api.publicaciones.getMostRecentPosts();
    } catch (err) {
      console.error(err);
    } finally {
      this.isLoadingPosts = false;
    }
  }
}
