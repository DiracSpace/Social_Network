import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export abstract class BaseApiService {

  abstract endpoint: string;

  constructor() { }

  get url(): string {
    return `${environment.apiUrl}/${this.endpoint}`;
  }
}
