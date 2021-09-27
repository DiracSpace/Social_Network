import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PublicacionesRequest } from 'src/app/models/publicaciones.view';
import { ApiService } from 'src/app/services/rest-api/api.service';
import { isNullOrZero, notNullNorWhitespace } from 'src/app/utils/validators';
import { environment } from 'src/environments/environment';

const template = /*html*/`
<div class="modal-header apply-dark-color">
  <h4 class="modal-title apply-text-gray" id="modal-add-post">Post</h4>
</div>
<div class="modal-body apply-dark-color">
  <div class="container">
    <div class="form-group">
      <app-text-field
        [(value)]="content"
        [isTextArea]="true"
        placeholder="¿Qué está en tu mente?">
      </app-text-field>
    </div>
  </div>
</div>
<div class="modal-footer apply-dark-color">
  <button 
    type="button" 
    class="btn btn-outline-danger" 
    (click)="onCloseReason('Cancel')">
    Cancel
  </button>
  <button 
    type="submit" 
    class="btn btn-outline-primary" 
    [disabled]="!isSaveDisabled"
    (click)="onSaveClicked()">
    Save
  </button>
</div>
`;

const styles = [/*css*/`

`];

@Component({
  selector: 'app-create-post-modal',
  template,
  styles
})
export class CreatePostModalComponent implements OnInit {

  private _post: PublicacionesRequest = new PublicacionesRequest();
  get post() { return this._post; }
  @Input() set post(post: PublicacionesRequest) { this._post = post; }

  closeResult: string;
  ref: NgbModalRef;

  constructor(
    private modal: NgbModal,
    private api: ApiService,
    private active: NgbActiveModal
  ) { }

  ngOnInit(): void {
  }

  get content() { return this.post.contenido; }
  set content(value: string) { this.post.contenido = value; }

  get isSaveDisabled() {
    return (true
      && notNullNorWhitespace(this.content)
    );
  }

  onSaveClicked() {
    const isNew = isNullOrZero(this.post.idPublicacion);
    
    if (isNew) {
      this.registerPost();
    } else {
      this.editPost();
    }
  }

  private async registerPost() {
    try {
      this.post.llave_Secreta = environment.key;
      this.post.idUsuario = environment.IdUsuario;
      this.post.idPublicacion = 0;

      const createdPost = await this.api.publicaciones.createPost(this.post);

      this.active.close(createdPost);
    } catch (err) {
      console.error(err);
    } finally {

    }
  }

  private async editPost() {
    try {
      const editedPost = await this.api.publicaciones.updatePost(this.post.idPublicacion, this.post);
      this.active.close(editedPost);
    } catch (err) {
      console.error(err);
    } finally {

    }
  }

  onDismissReason(reason?: string) {
    if (reason != null) {
      this.active.dismiss();
    }
  }

  onCloseReason(result?: string) {
    if (result != null) {
      this.active.close();
    }
  }

  open() {
    this.ref = this.modal.open(CreatePostModalComponent, {
      ariaLabelledBy: 'modal-add-post'
    });

    this.ref.result.then(
      (result: any) => {
        this.closeResult = `Closed with: ${result}`;
      },
      (reason: any) => {
        this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
      }
    ).catch(
      (error: any) => {
        this.closeResult = `Caught: ${error}`;
      }
    )
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
