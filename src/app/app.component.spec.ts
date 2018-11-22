import { HomeComponent } from './home/home.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material/';
import { HeaderComponent } from './header/header.component';
import {async, TestBed} from '@angular/core/testing';
import {CUSTOM_ELEMENTS_SCHEMA} from '@angular/core';
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
//import { MatButtonModule, MatToolbarModule } from '@angular/material/';

/**
 * MCUSTOMS MODULES
 */
import {MaterialsModule} from './materials/materials.module';
import { ROUTES } from './app.routes';
import {APP_BASE_HREF} from '@angular/common';
import { SubscribeComponent } from './subscribe/subscribe.component';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
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
        LoginFormComponent
      ],
      imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        MaterialsModule,

        RouterModule.forRoot(ROUTES),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'},
        {provide: APP_CONFIG, useValue: environment},
        {provide : HTTP_INTERCEPTORS, useClass : CommonHeadersInterceptorService, multi: true},
        {provide : HTTP_INTERCEPTORS, useClass : TokenInterceptorService, multi: true},
        {provide : HTTP_INTERCEPTORS, useClass : ErrorInterceptorService, multi: true},
      ],
    }).compileComponents();
  }));
  // it('should create the app', async(() => {
  //   const fixture = TestBed.createComponent(AppComponent);
  //   const app = fixture.debugElement.componentInstance;
  //   expect(app).toBeTruthy();
  // }));
});
