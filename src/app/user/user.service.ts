import {Injectable} from '@angular/core';
import {UserRepository} from './user.repository';
import {HttpResponse} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  /**
   * Authentification JWT Token
   */
  public token: string;

  constructor(private userRepository: UserRepository) {
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


    /**
     *
     * @param username
     * @param email
     * @param password
     * @param cityName
     * @param cityCode
     * @param deptCode
     */
/*
  subscription(username: string, password: string, email: string, cityName: string, cityCode: string, deptCode: string) {
      return new Promise((resolve) => {
        this.userRepository
            .subscription(
                paramsUrl
            )
            .subscribe((response: HttpResponse<string>) => {
              this.token = response.headers.get('Authorization');
                console.log('Response Token : ', this.token);
              resolve(this.token);
            });
    });
  }*/

}
