import {TestBed} from '@angular/core/testing';

import {UserRepository} from './user.repository';
import {HttpClient, HttpClientModule, HttpErrorResponse, HttpHeaders, HttpResponse} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {EnvironmentService} from '../services/environment.service';
import {APP_CONFIG} from '../app.config';
import {Observable, of, throwError} from 'rxjs';

describe('UserRepository', () => {
  beforeEach(() => {

    const httpClientSpy = jasmine.createSpyObj('HttpClient', ['get', 'post']);

    TestBed.configureTestingModule({
      imports: [
        HttpClientModule
      ],
      providers: [
        {provide: APP_CONFIG, useValue: environment},
        EnvironmentService,
        {provide: HttpClient, useValue: httpClientSpy}
      ]
    });
  });

  it('should be created', () => {
    const service: UserRepository = TestBed.get(UserRepository);
    expect(service).toBeTruthy();
  });

  it('should login valid', () => {

    // Create the mock
    const httpClientSpy = TestBed.get(HttpClient);
    const fakeToken = 'Bearer fakeToken';
    const httpResponse = new HttpResponse({
      headers: new HttpHeaders().append('Authorization', fakeToken),
    });
    httpClientSpy.post.and.returnValue(of(httpResponse));

    // Test the login service
    const service: UserRepository = TestBed.get(UserRepository);
    service
      .login('Nartawak', 'xxxxx')
      .subscribe((response: HttpResponse<any>) => {
        expect(response.headers.get('Authorization')).toBe(fakeToken);
      });

  });

  it('should login throw 401 error', () => {

    // Create the mock
    const httpClientSpy = TestBed.get(HttpClient);
    const errorResponse = new HttpErrorResponse({
      error: 'test 401 error',
      status: 401, statusText: 'Not authorize'
    });

    httpClientSpy.post.and.returnValue(throwError(errorResponse));

    // Test the login service
    const service: UserRepository = TestBed.get(UserRepository);
    service
      .login('Nartawak', 'xxxxx')
      .subscribe(
        () => {
          fail('expected an error, valid login');
        },
        (error: HttpErrorResponse)  => {
          expect(error).toBeDefined();
          expect(error.status).toBe(401);
          expect(error.statusText).toBe('Not authorize');
        });
  });
});
