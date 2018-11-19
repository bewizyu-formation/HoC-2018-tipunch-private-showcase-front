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

import {MaterialsModule} from './materials/materials.module';

import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './headerbar/header/header.component';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';

import { SideMenuComponent } from './headerbar/side-menu/side-menu.component';
import { PersonalMenuComponent } from './headerbar/personal-menu/personal-menu.component';
import { BackButtonComponent } from './headerbar/back-button/back-button.component';
import { HomeFormComponent } from './home-form/home-form.component';
import { DialogConfirmSuscribeComponent} from './subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import { SubscribeComponent } from './subscribe/subscribe.component';
import { LoginFormComponent } from './login-form/login-form.component';
import { HomeToolbarComponent } from './home-toolbar/home-toolbar.component';
import { HomebackToolbarComponent } from './homeback-toolbar/homeback-toolbar.component';


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
