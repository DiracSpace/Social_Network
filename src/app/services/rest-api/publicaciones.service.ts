import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BaseApiService } from '../base-api.service';
import { environment } from 'src/environments/environment';
import { PublicacionesDeleteRequest, PublicacionesRequest, PublicacionesResponse } from 'src/app/models/publicaciones.view';

@Injectable({
  providedIn: 'root'
})
export class PublicacionesService extends BaseApiService {

  endpoint: string = 'api/Publicaciones';

  constructor(
    private http: HttpClient,
  ) {
    super();
  }

  /**
   * Method to return list of posts
   * 
   * @returns 50 most recent posts
   */
  getMostRecentPosts() {
    return this.http.get<PublicacionesResponse[]>(`${this.url}/all/${environment.IdUsuario}`).toPromise();
  }

  /**
   * Method to return list of posts
   * 
   * @param userId 
   * @returns All posts from user
   */
  getAllPosts(userId: number) {
    return this.http.get<PublicacionesResponse[]>(`${this.url}/all/${environment.IdUsuario}/${userId}`).toPromise();
  }

  /**
   * Method to return post
   * 
   * @param postId 
   * @returns Post from user
   */
  getSpecificPost(postId: number) {
    return this.http.get<PublicacionesResponse>(`${this.url}/all/${environment.IdUsuario}/${postId}`).toPromise();
  }

  /**
   * Method to update post
   * 
   * @param postId 
   * @param post post
   * @returns updated post
   */
  updatePost(postId: number, post: PublicacionesRequest) {
    return this.http.put<PublicacionesResponse>(`${this.url}/${postId}`, post).toPromise();
  }

  /**
   * Method to remove post
   * 
   * @param postId 
   */
  removePost(postId: number, droppost: PublicacionesDeleteRequest) {
    return this.http.delete(`${this.url}/${postId}`, { body: droppost }).toPromise();
  }

  /**
   * Method to create post
   * 
   * @param post new post
   * @returns created post
   */
  createPost(post: PublicacionesRequest) {
    return this.http.post<PublicacionesResponse>(`${this.url}`, post).toPromise();
  }
}
