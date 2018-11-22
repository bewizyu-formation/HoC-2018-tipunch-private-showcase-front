import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {EnvironmentService} from '../services/environment.service';
import {catchError} from "rxjs/internal/operators";

export const RESOURCES_LOGIN = '/login';
export const RESOURCES_SUBSCRIPTION = '/users/add?';

@Injectable({
  providedIn: 'root'
})
export class UserRepository {

  constructor(private http: HttpClient, /*private params: HttpParams, */private env: EnvironmentService) {
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
   * https://www.tektutorialshub.com/how-to-pass-url-parameters-query-strings-angular/
   * [users/add?]username=minou&password=azerty&email=minou@de.fr&cityName=lyon&cityCode=69004&deptCode=69
   * @param username
   * @param email
   * @param password
   * @param cityName
   * @param cityCode
   * @param deptCode
   * @param paramsUrl
   * @returns {Observable<HttpResponse<Object>>}
   *
  subscription(username: string, password: string, email: string, cityName: string, cityCode: string, deptCode: string): Observable<any> {
    this.params
        .set( 'username', username)
        .set('password', password)
        .set('email', email)
        .set('cityName', cityName)
        .set('cityCode', cityCode)
        .set('deptCode', deptCode)
        .toString();
    console.log(this.params);
    return this.http.put(`${this.env.getPrivateShowcaseApiConfig().uri}${RESOURCES_SUBSCRIPTION}${this.params}`)
        .subscribe(
        datas => { console.log('ok', datas); },
        error => {console.log('/!\\ something get wrong, check your request /!\\', error); });

  }*/
}
