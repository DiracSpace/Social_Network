import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ComentarioRequest, ComentariosResponse } from '../models/comentarios.view';
import { PublicacionesRequest, PublicacionesResponse } from '../models/publicaciones.view';
import { ApiService } from '../services/rest-api/api.service';

const template = /*html*/`
<div class="container d-flex flex-column p-2">
  <div class="container d-flex flex-column post-name-container mb-3">
    <div class="d-flex justify-content-between">
      <span><strong>{{ name }}</strong></span>
      <div ngbDropdown class="d-inline-block">
        <i *ngIf="canApplyActions" class="material-icons options" 
          id="dropdownBasic1" ngbDropdownToggle data-toggle="dropdown">more_horiz</i>
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
      <i class="material-icons comments-icon" (click)="acc.toggle('toggle-1'); onClickGetComments()">comment</i>
    </div>
  </div>
  <ngb-accordion class="mt-4" #acc="ngbAccordion">
    <ngb-panel class="comment-accordian" id="toggle-1">
      <ng-template ngbPanelContent class="panel-content">
        <div *ngIf="hasComments">
          <div *ngFor="let comment of comments">
            <div class="comment-container p-3 mb-3">
              <p>{{ comment.nombre }} - {{ comment.fechaCreacion | date }}</p>
              <span>{{ comment.contenido }}</span>
              <br>
            </div>
          </div>
        </div>
        <app-text-field
          [(value)]="comment.contenido"
          (enter)="onEnterSend()"
          placeholder="Escribe un comentario">
        </app-text-field>
      </ng-template>
    </ngb-panel>
  </ngb-accordion>
</div>
`;

const styles = [/*css*/`
.dropdown-toggle::after {
  display: none;
}

.comments-icon {
  cursor: pointer;
  color: #b0b3b8;
}

.comment-container {
  background-color: #3a3b3c;
  position: relative;
  border-radius: 20px;

  p {
    margin: 0;
  }

  span {
    margin-bottom: 5%;
  }

  .comment-reaction-container {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateX(50%);

    i {
      cursor: pointer;
      color: #b0b3b8;
    }
  }
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

  comments: ComentariosResponse[] = [];
  comment: ComentarioRequest = new ComentarioRequest();

  liked: boolean = false;
  hasComments: boolean = false;

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
  get postUserId() { return this.value.idUsuario; }
  get isLiked() { return this.value.likePropio; }
  get canApplyActions() { return (this.postUserId === environment.IdUsuario); }

  async onClickGetComments() {
    try {
      this.comments = await this.api.comentarios.getPostComments(this.postId);
      if (this.comments.length != 0) {
        this.hasComments = true;
      }
    } catch (err) {
      console.error(err)
    } finally {
      console.log("done getting comments");
    }
  }

  async onEnterSend() {
    try {
      const comment = await this.api.comentarios.createComment({
        idComentario: 0,
        idPublicacion: this.postId,
        idUsuario: environment.IdUsuario,
        contenido: this.comment.contenido,
        llave_Secreta: environment.key
      });

      this.comments.push(...[comment]);
    } catch (err) {
      console.error(err)
    } finally {
      this.comment.contenido = "";
      console.log("done sending comment");
    }
  }

  async onClickLikePost() {
    try {
      await this.api.likes.createLike({
        idPublicacion: this.postId,
        idUsuario: environment.IdUsuario,
        llave_Secreta: environment.key
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.liked = true;
      this.value.cantidadLikes += 1;
      console.log("done liking post");
    }
  }

  async onClickUnlikePost() {
    try {
      await this.api.likes.removeLike({
        idPublicacion: this.postId,
        idUsuario: environment.IdUsuario,
        llave_Secreta: environment.key
      });
    } catch (err) {
      console.error(err);
    } finally {
      this.liked = false;
      this.value.cantidadLikes -= 1;
      console.log("done unliking post");
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
      console.log("done deleting comment");
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
      console.log("done editing post");
    }
  }
}
