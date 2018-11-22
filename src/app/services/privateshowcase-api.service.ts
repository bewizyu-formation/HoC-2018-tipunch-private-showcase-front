import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_BASE_URL = 'http://localhost:8080';

@Injectable({
  providedIn: 'root'
})
export class PrivateshowcaseApiService {

  constructor( private http: HttpClient ) { }

  getUser() {
    this.http.get(`${API_BASE_URL}`).subscribe(data => console.log(data));
  }
}


    // this.http.post(`${API_BASE_URL}`);
  postUser() {
  }