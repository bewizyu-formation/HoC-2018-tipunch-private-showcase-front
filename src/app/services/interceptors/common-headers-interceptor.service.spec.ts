import { TestBed } from '@angular/core/testing';

import { CommonHeadersInterceptorService } from './common-headers-interceptor.service';
import {HTTP_INTERCEPTORS, HttpInterceptor} from '@angular/common/http';
import {HttpClientTestingModule} from '@angular/common/http/testing';

describe('CommonHeadersInterceptorService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule
    ],
    providers: [
      {provide : HTTP_INTERCEPTORS, useClass : CommonHeadersInterceptorService, multi: true},
    ]
  }));

  it('should be created', () => {
    const interceptors: HttpInterceptor[] = TestBed.get(HTTP_INTERCEPTORS);
    expect(interceptors).toBeTruthy();

    const headerInterceptor = interceptors.find(item => item instanceof CommonHeadersInterceptorService);
    expect(headerInterceptor).toBeTruthy();
  });
});
