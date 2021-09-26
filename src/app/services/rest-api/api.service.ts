import { Injectable } from '@angular/core';
import { ComentariosService } from './comentarios.service';
import { LikesService } from './likes.service';
import { PublicacionesService } from './publicaciones.service';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public comentarios: ComentariosService,
    public publicaciones: PublicacionesService,
    public likes: LikesService,
  ) { }
}
