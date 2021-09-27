import { Injectable } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CreatePostModalComponent } from 'src/app/components/modals/create-post-modal.component';
import { PublicacionesRequest } from 'src/app/models/publicaciones.view';
import { notNull } from 'src/app/utils/validators';

@Injectable({
  providedIn: 'root'
})
export class ModalService {

  constructor(
    private modals: NgbModal
  ) { }

  async openPostModal(post?: PublicacionesRequest): Promise<PublicacionesRequest> {
    const modal = this.modals.open(
      CreatePostModalComponent,
      { backdrop: 'static', centered: true }
    );
    
    if (notNull(post)) {
      const component = modal.componentInstance as CreatePostModalComponent;
      component.post = post;
    }

    return modal.result.then((post: PublicacionesRequest) => post);
  }
}
