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

import {MaterialsModule} from './materials/materials.module';

import { SubscribeComponent } from './subscribe/subscribe.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './headerbar/header/header.component';
import { ROUTES } from './app.routes';

import { HomeCardComponent } from './home-card/home-card.component';
import { HomeFormComponent } from './home-form/home-form.component';
import { DialogConfirmSuscribeComponent } from './subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SubscribeComponent,
    HomeCardComponent,
    HomeFormComponent,
    DialogConfirmSuscribeComponent
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
