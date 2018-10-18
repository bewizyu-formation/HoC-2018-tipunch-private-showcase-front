import {TestBed} from '@angular/core/testing';

import {EnvironmentService} from './environment.service';
import {environment} from '../../environments/environment';
import {APP_CONFIG} from '../app.config';


describe('EnvironmentService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      {provide: APP_CONFIG, useValue: environment},
    ]
  }));

  it('should be created', () => {
    const service: EnvironmentService = TestBed.get(EnvironmentService);
    expect(service).toBeTruthy();
  });

  it('should be dev environment', () => {
    const service: EnvironmentService = TestBed.get(EnvironmentService);
    expect(service.isDev()).toBeTruthy();
  });

  it('should not be prod environment', () => {
    const service: EnvironmentService = TestBed.get(EnvironmentService);
    expect(service.isProd()).toBeFalsy();
  });

  it('should server configuration valid', () => {
    const service: EnvironmentService = TestBed.get(EnvironmentService);
    expect(service.getPrivateShowcaseApiConfig()).toBeDefined();
    expect(service.getPrivateShowcaseApiConfig().uri).toBe(environment.server.uri);
  });
});
