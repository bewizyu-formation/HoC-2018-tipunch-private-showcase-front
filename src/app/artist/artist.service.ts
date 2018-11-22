import { Observable } from 'rxjs/index';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {EnvironmentService} from '../services/environment.service';
import { reject } from 'q';

export const RESOURCES_ARTIST_LIST = '/artist/list';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  public artistsLists: any[];

  constructor(private http: HttpClient, private env: EnvironmentService) { }

  getArtistList() {
    return new Promise ((resolve, reject ) => {
      this.http.get(`${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_ARTIST_LIST}`)
      .subscribe(
        (response: any[]) => {
          this.artistsLists = response;
          resolve(this.artistsLists);
        },
        (error) => reject(error)
      );
    });
  }
}
