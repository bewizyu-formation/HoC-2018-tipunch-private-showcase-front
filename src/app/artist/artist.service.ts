import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {EnvironmentService} from '../services/environment.service';

export const RESOURCES_ARTIST_LIST = '/artist/list';
export const RESOURCES_USER_INFOS = '/users/info';

@Injectable({
  providedIn: 'root'
})
export class ArtistService {

  public artistsLists: any[];
  public user_infos: any[];

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

  getUserInfos() {
    return new Promise ((resolve, reject ) => {
      this.http.get(`${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_USER_INFOS}`)
      .subscribe(
        (response: any[]) => {
          this.user_infos = response;
          resolve(this.user_infos);
        },
        (error) => reject(error)
      );
    });
  }
}
