import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { PublicacionesRequest, PublicacionesResponse } from '../models/publicaciones.view';
import { ApiService } from '../services/rest-api/api.service';

const template = /*html*/`
<div class="container d-flex flex-column p-2">
  <div class="container d-flex flex-column post-name-container mb-3">
    <div class="d-flex justify-content-between">
      <span><strong>{{ name }}</strong></span>
      <div ngbDropdown class="d-inline-block">
        <i class="material-icons options" id="dropdownBasic1" ngbDropdownToggle data-toggle="dropdown">more_horiz</i>
        <div class="dropdown-menu-dark" ngbDropdownMenu aria-labelledby="dropdownBasic1">
          <button ngbDropdownItem (click)="onClickDelete()">Borrar</button>
          <button ngbDropdownItem (click)="onClickEdit()">Editar</button>
        </div>
      </div>
    </div>
    <span>{{ date | date }}</span>
  </div>
  <div class="container post-content-container mb-3">
    <p>{{ content }}</p>
  </div>
  <div class="container mt-2 post-reactions-container">
    <div class="d-flex justify-content-between">
      <div class="d-flex icon-text-container">
        <i *ngIf="liked" class="material-icons" (click)="onClickUnlikePost()">favorite</i>
        <i *ngIf="!liked" class="material-icons" (click)="onClickLikePost()">favorite_border</i>
        <p>{{ likes }}</p>
      </div>
      <i class="material-icons">comment</i>
    </div>
  </div>
</div>
`;

const styles = [/*css*/`
.dropdown-toggle::after {
  display: none;
}

.post-name-container,
.post-content-container,
.post-reactions-container {
  
  .options {
    cursor: pointer;
    color: #b0b3b8;
  }

  span, p {
    color: #e4e6eb;
  }

  p {
    margin: 0;
  }
}

.icon-text-container {
  line-height: 24px;

  i.material-icons {
    display: inline-flex;
    cursor: pointer;
    vertical-align: top;
    color: #b0b3b8;
  }
}
`];

@Component({
  selector: 'app-post',
  template,
  styles
})
export class PostComponent implements OnInit {

  @Input() value: PublicacionesResponse;

  @Output() removed = new EventEmitter<number>();

  liked: boolean = false;

  constructor(
    private api: ApiService,
  ) { }

  ngOnInit(): void {
    this.liked = this.isLiked;
  }

  get name() { return this.value.nombre; }
  get date() { return this.value.fechaCreacion; }
  get content() { return this.value.contenido; }
  get likes() { return this.value.cantidadLikes; }
  get postId() { return this.value.idPublicacion; }
  get isLiked() { return this.value.likePropio; }

  async onClickLikePost() {
    try {
      await this.api.likes.createLike({
        idPublicacion: this.postId,
        idUsuario: environment.IdUsuario,
        llave_Secreta: environment.key
      });
    } finally {
      this.liked = true;
      this.value.cantidadLikes += 1;
    }
  }

  async onClickUnlikePost() {
    try {
      await this.api.likes.removeLike({
        idPublicacion: this.postId,
        idUsuario: environment.IdUsuario,
        llave_Secreta: environment.key
      });
    } finally {
      this.liked = false;
      this.value.cantidadLikes -= 1;
    }
  }

  async onClickDelete() {
    try {
      await this.api.publicaciones.removePost(this.postId, {
        idPublicacion: this.postId,
        idUsuario: environment.IdUsuario,
        llave_Secreta: environment.key
      });
      this.removed.emit(this.postId);
    } catch (err) {
      console.error(err)
    } finally {
      console.log("done");
    }
  }
  
  async onClickEdit() {
    this.api.modals.openPostModal({
      contenido: this.value.contenido
    }).then(
      (post: PublicacionesRequest) => {
        if (post != undefined) {
          this.value.contenido = post.contenido;
          this.editPost();
        } 
      }
    ).catch(
      (error: any) => console.error(error)
    )
  }

  private async editPost() {
    try {
      await this.api.publicaciones.updatePost(this.postId, {
        idUsuario: environment.IdUsuario,
        llave_Secreta: environment.key,
        idPublicacion: this.postId,
        contenido: this.value.contenido
      });
    } catch (err) {
      console.error(err)
    } finally {
      console.log("done");
    }
  }
}
