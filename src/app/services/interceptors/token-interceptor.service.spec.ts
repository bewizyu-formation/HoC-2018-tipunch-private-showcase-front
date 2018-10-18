import {TestBed} from '@angular/core/testing';

import {TokenInterceptorService} from './token-interceptor.service';
import {HttpClientTestingModule} from '@angular/common/http/testing';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpInterceptor} from '@angular/common/http';
import {APP_CONFIG} from '../../app.config';
import {environment} from '../../../environments/environment';

describe('TokenInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
      HttpClientTestingModule
    ],
    providers: [
      {provide: APP_CONFIG, useValue: environment},
      {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true},
    ]
  }));

  it('should be created', () => {
    const interceptors: HttpInterceptor[] = TestBed.get(HTTP_INTERCEPTORS);
    expect(interceptors).toBeTruthy();

    const headerInterceptor = interceptors.find(item => item instanceof TokenInterceptorService);
    expect(headerInterceptor).toBeTruthy();
  });
});
