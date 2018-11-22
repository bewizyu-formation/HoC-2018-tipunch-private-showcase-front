import {BrowserModule} from '@angular/platform-browser';
import {NgModule, CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
import {APP_BASE_HREF} from '@angular/common';
import {AppComponent} from './app.component';
import {environment} from '../environments/environment';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {APP_CONFIG} from './app.config';
import {TokenInterceptorService} from './services/interceptors/token-interceptor.service';
import {ErrorInterceptorService} from './services/interceptors/error-interceptor.service';
import {CommonHeadersInterceptorService} from './services/interceptors/common-headers-interceptor.service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { RouterModule } from '@angular/router';

/**
 * MCUSTOMS MODULES
 */
import {MaterialsModule} from './materials/materials.module';
import { ROUTES } from './app.routes';

import { WelcomeComponent } from './welcome/welcome.component';
import { Error404Component } from './error404/error404.component';
/** HEADER NAVIGATION**/
import { HeaderComponent } from './headerbar/header/header.component';
import { SideMenuComponent } from './headerbar/side-menu/side-menu.component';
import { PersonalMenuComponent } from './headerbar/personal-menu/personal-menu.component';
import { BackButtonComponent } from './headerbar/back-button/back-button.component';
import { HomeToolbarComponent } from './home-toolbar/home-toolbar.component';
import { HomebackToolbarComponent } from './homeback-toolbar/homeback-toolbar.component';

/** PAGES **/
import { HomeComponent } from './home/home.component';
import { HomeFormComponent } from './home-form/home-form.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { DialogConfirmSuscribeComponent} from './subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import { LoginFormComponent } from './login-form/login-form.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SubscribeComponent,
    SideMenuComponent,
    PersonalMenuComponent,
    BackButtonComponent,
    HomeFormComponent,
    DialogConfirmSuscribeComponent,
    LoginFormComponent,
    HomeToolbarComponent,
    HomebackToolbarComponent,
    WelcomeComponent,
    Error404Component,
  ],
  entryComponents: [
    DialogConfirmSuscribeComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,

    RouterModule.forRoot(ROUTES)
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
    {provide: APP_BASE_HREF, useValue: '/'},
    {provide: APP_CONFIG, useValue: environment},
    {provide : HTTP_INTERCEPTORS, useClass : CommonHeadersInterceptorService, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true},
    {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptorService, multi: true},
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
