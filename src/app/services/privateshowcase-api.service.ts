import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';


const API_BASE_URL = 'localhost:8080/';

@Injectable({
  providedIn: 'root'
})
export class PrivateshowcaseApiService {

  constructor( private http: HttpClient) { }

  getUser(login: string) {
    return this.http.get(`${API_BASE_URL}`);
  }
}
