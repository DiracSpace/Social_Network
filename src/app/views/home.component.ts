import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiService } from '../services/rest-api/api.service';

const template = /*html*/`

`

@Component({
  selector: 'app-home',
  template,
  styles: [
  ]
})
export class HomeComponent implements OnInit {

  isLoadingPosts: boolean = false;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.init();
  }

  private async init() {
    this.isLoadingPosts = true;
    try {
      const posts = await this.api.publicaciones.getAllPosts(environment.IdUsuario);
      console.log("posts:", posts);
    } finally {
      this.isLoadingPosts = false;
    }
  }

}
