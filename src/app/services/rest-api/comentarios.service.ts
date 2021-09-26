import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ComentarioRequest, ComentariosResponse } from 'src/app/models/comentarios.view';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class ComentariosService extends BaseApiService {

  endpoint: string = "api/Comentarios";

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  /**
   * Method to get comments 
   * from specific post
   * 
   * @param postId 
   * @returns list of comments
   */
  getPostComments(postId: number) {
    return this.http.get<ComentariosResponse[]>(`${this.url}/Publicacion/${environment.IdUsuario}/${postId}`).toPromise();
  }

  /**
   * Method to get comment
   * details
   * 
   * @param commentId 
   * @returns comment
   */
  getCommentDetails(commentId: number) {
    return this.http.get<ComentariosResponse>(`${this.url}/${environment.IdUsuario}/${commentId}`).toPromise();
  }

  /**
   * Method to update 
   * a comment
   * 
   * @param commentId 
   * @param comment 
   * @returns updated comment
   */
  updateComment(commentId: number, comment: ComentarioRequest) {
    return this.http.put<ComentariosResponse>(`${this.url}/${commentId}`, comment).toPromise();
  }

  /**
   * Method to remove
   * a comment
   * 
   * @param commentId 
   */
  removeComment(commentId: number) {
    return this.http.delete(`${this.url}/${commentId}`).toPromise();
  }

  /**
   * Method to create
   * a comment
   * 
   * @param comment 
   * @returns comment
   */
  createComment(comment: ComentarioRequest) {
    return this.http.post<ComentariosResponse>(`${this.url}`, comment).toPromise();
  }
}
