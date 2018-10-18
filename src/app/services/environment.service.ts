import {Inject, Injectable} from '@angular/core';
import {APP_CONFIG, AppConfig} from '../app.config';

@Injectable({
  providedIn: 'root'
})
export class EnvironmentService {

  constructor(@Inject(APP_CONFIG) private env: AppConfig) {
  }

  /**
   * Is development environment ?
   */
  isDev () {
    return this.env.production !== true;
  }

  /**
   * Is production environment
   */
  isProd () {
    return this.env.production;
  }

  /**
   * Get the private showcase API configuration
   */
  getPrivateShowcaseApiConfig () {
    return this.env.server;
  }

}
