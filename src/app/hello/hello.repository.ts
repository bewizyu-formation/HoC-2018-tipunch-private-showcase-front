import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {EnvironmentService} from '../services/environment.service';
import {Observable} from 'rxjs';

export const RESOURCES_HELLO = '/hello';
export const RESOURCES_USER = '/user';
export const RESOURCES_ADMIN = '/admin';
export const RESOURCES_UPLOAD = '/upload';

@Injectable({
  providedIn: 'root'
})
export class HelloRepository {

  constructor(private http: HttpClient, private env: EnvironmentService) { }

  testApiWithUserRole(): Observable<any> {
    return this.http.get(`${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_HELLO}${RESOURCES_USER}`);
  }

  testApiWithAdminRole(): Observable<any> {
    return this.http.get(`${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_HELLO}${RESOURCES_ADMIN}`);
  }

  uploadFile(file: File) {

    const fd: FormData = new FormData();
    fd.append('name', file.name);
    fd.append('file', file);

    return this.http.post(
      `${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_HELLO}${RESOURCES_UPLOAD}`,
      fd,
      {
        reportProgress: true,
        responseType: 'text'
      }
    );
  }
}
