import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LikePublicacionRequest, PublicacionesResponse } from 'src/app/models/publicaciones.view';
import { environment } from 'src/environments/environment';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class LikesService extends BaseApiService {

  endpoint: string = "api/Likes";

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  /**
   * Method to get
   * all posts that
   * a user liked
   * 
   * @returns user liked posts
   */
  getUserLikedPosts() {
    return this.http.get<PublicacionesResponse[]>(`${this.url}/${environment.IdUsuario}`).toPromise();
  }

  /**
   * Method to create
   * a new user like
   * to a post
   * 
   * @param like 
   */
  createLike(like: LikePublicacionRequest) {
    return this.http.post(`${this.url}`, like).toPromise();
  }

  /**
   * Method to remove
   * a like
   * 
   * @param like 
   */
  removeLike(like: LikePublicacionRequest) {
    return this.http.delete(`${this.url}`, { body: like }).toPromise();
  }
}
