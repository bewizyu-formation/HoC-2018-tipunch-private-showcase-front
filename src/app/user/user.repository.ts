import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpUrlEncodingCodec} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentService} from '../services/environment.service';
import {catchError} from 'rxjs/internal/operators';
import {ArtistService} from '../artist/artist.service';

export const RESOURCES_LOGIN = '/login';
export const RESOURCES_SUBSCRIPTION = '/users/add';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

    constructor(private http: HttpClient,
                private env: EnvironmentService,
                private artistAsUser: ArtistService) {
    }

    /**
     * login the current user and get the JWT token
     * @param username User login name
     * @param password User Password
     */
    login(username: string, password: string): Observable<any> {
        return this.http.post(`${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_LOGIN}`, {
                username,
                password,
            },
            {observe: 'response'}
        );
    }

    /**
     *  https://www.tektutorialshub.com/how-to-pass-url-parameters-query-strings-angular/
     * [users/add?]username=minou&password=azerty&email=minou@de.fr&cityName=lyon&cityCode=69004&deptCode=69
     */
    /**
     *
     * @param username user
     * @param password user
     * @param email user
     * @param cityName user
     * @param cityCode user
     * @param deptCode user
     * @param artistName artiste
     * @param artistShortDesc artiste
     * sinon retourne none string
     */
    subscription(username: string,
                 password: string,
                 email: string,
                 cityName: string,
                 cityCode: string,
                 deptCode: string,
                 artistName: string,
                 artistShortDesc: string): Observable<any> {
        let params: HttpParams;

        if (artistName && artistShortDesc) {

            params = new HttpParams({
                encoder: new HttpUrlEncodingCodec(),
            })
               .set('username', username)
                .set('password', password)
                .set('email', email)
                .set('cityName', cityName)
                .set('cityCode', cityCode)
                .set('deptCode', deptCode)
                .set('artistName', artistName)
                .set('shortDesc', artistShortDesc);
            console.log('Is Artist  ' + params);
            console.log('ARRRRRT ' + artistName);

        } else {
             params = new HttpParams({
                encoder: new HttpUrlEncodingCodec(),
            })
                .set('username', username)
                .set('password', password)
                .set('email', email)
                .set('cityName', cityName)
                .set('cityCode', cityCode)
                .set('deptCode', deptCode);
            console.log('Is User  ' + params);
            console.log('ARRRRRT ' + username);
        }


        return this.http.put(
            `${this.env.getPrivateShowcaseApiConfig()
                .uri}${RESOURCES_SUBSCRIPTION}?${params.toString()}`, null
        );
    }
}

