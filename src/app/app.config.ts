import {InjectionToken} from '@angular/core';

/**
 * APP_CONFIG Token
 */
export const APP_CONFIG = new InjectionToken<AppConfig>('app.config');

/**
 * Application configuration interface
 */
export interface AppConfig {
  production: boolean;

  server: {
    uri: string
  };
}
