import { TestBed } from '@angular/core/testing';

import { HelloRepository } from './hello.repository';
import {HttpClientModule} from '@angular/common/http';
import {APP_CONFIG} from '../app.config';
import {environment} from '../../environments/environment';

describe('HelloService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientModule,
    ],
    providers: [
      {provide: APP_CONFIG, useValue: environment},
    ]
  }));

  it('should be created', () => {
    const service: HelloRepository = TestBed.get(HelloRepository);
    expect(service).toBeTruthy();
  });
});
