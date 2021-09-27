import { Injectable } from '@angular/core';
import { ModalService } from '../modal/modal.service';
import { ComentariosService } from './comentarios.service';
import { LikesService } from './likes.service';
import { PublicacionesService } from './publicaciones.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public comentarios: ComentariosService,
    public likes: LikesService,
    public modals: ModalService,
    public publicaciones: PublicacionesService,
  ) { }
}
