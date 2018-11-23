import {Injectable} from '@angular/core';
import {UserRepository} from './user.repository';
import {HttpResponse, HttpClient} from '@angular/common/http';
import {EnvironmentService} from '../services/environment.service';


const TOKEN_KEY = 'TOKEN_KEY';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Authentification JWT Token
   */
  private _token: string;

  public get token(): string {
    if (this._token) {
      return this._token;
    }
    return localStorage.getItem(TOKEN_KEY);
  }

  public set token(value: string) {
   this._token = value;
   localStorage.setItem(TOKEN_KEY, this._token);
}

  constructor(private userRepository: UserRepository,
              private http: HttpClient,
              private env: EnvironmentService) {
  }

  /**
   * Login the user
   * @param username User login name
   * @param password User Password
   */
  login(username: string, password: string): Promise<string> {
    return new Promise ((resolve) => {
      this.userRepository
        .login(username, password)
        .subscribe((response: HttpResponse<any>) => {
          this.token = response.headers.get('Authorization');
          console.log('Response Token : ', this.token);
          resolve(this.token);
        });
    });
  }

  clearToken() {
    localStorage.clear();
  }

    /**
     *
     * @param username
     * @param password
     * @param email
     * @param cityName
     * @param cityCode
     * @param deptCode
     * @param artistName
     * @param artistShortDesc
     * @returns {Promise<T>}
     */
    subscription(
        username: string,
        password: string,
        email: string,
        cityName: string,
        cityCode: string,
        deptCode: string,
        artistName: string,
        artistShortDesc: string
    ) {
        return new Promise((resolve, reject) => {
            this.userRepository
                .subscription(
                    username, password, email, cityName, cityCode, deptCode, artistName, artistShortDesc
                )
                .subscribe(
                    () => resolve(),
                    error => reject(error)
                );
        });
    }
}
