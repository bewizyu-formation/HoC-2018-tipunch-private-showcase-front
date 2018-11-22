import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpUrlEncodingCodec} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentService} from '../services/environment.service';
import {catchError} from 'rxjs/internal/operators';

export const RESOURCES_LOGIN = '/login';
export const RESOURCES_SUBSCRIPTION = '/users/add';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  constructor(private http: HttpClient,  private env: EnvironmentService) {
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
   * @param username
   * @param password
   * @param email
   * @param cityName
   * @param cityCode
   * @param deptCode
   * @param artistName
   * @param artistShortDesc
   * @returns {Observable<Object>}
   */
  subscription(
      username: string,
      password: string,
      email: string,
      cityName: string,
      cityCode: string,
      deptCode: string,
      artistName : string,
      artistShortDesc: string): Observable<any> {

    const params: HttpParams = new HttpParams({
      encoder : new HttpUrlEncodingCodec(),
    })
      .set('username', username)
      .set('password', password)
      .set('email', email)
      .set('cityName', cityName)
      .set('cityCode', cityCode)
      .set('deptCode', deptCode);
    if (artistName && artistShortDesc) {
      params
      .set('artistName', artistName)
      .set('shortDesc', artistShortDesc);
    }

    console.log('Params', params);

    console.log('STRING', params.toString());

    return this.http.put(
        `${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_SUBSCRIPTION}`,
        null,
        {params}
    );
  }
}
