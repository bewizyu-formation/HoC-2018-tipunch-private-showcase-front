import {MaterialsModule} from './materials/materials.module';
import { HomeComponent } from './home/home.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material/';
import { HeaderComponent } from './headerbar/header/header.component';
import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {APP_CONFIG} from './app.config';
import {environment} from '../environments/environment';
import { RouterModule } from '@angular/router';
import { ROUTES } from './app.routes';
import {APP_BASE_HREF} from '@angular/common';

import { SideMenuComponent } from './headerbar/side-menu/side-menu.component';
import { PersonalMenuComponent } from './headerbar/personal-menu/personal-menu.component';
import { BackButtonComponent } from './headerbar/back-button/back-button.component';
import { HomeFormComponent } from './home-form/home-form.component';
import { SubscribeComponent} from './subscribe/subscribe.component';
import { DialogConfirmSuscribeComponent} from './subscribe/dialog-confirm-suscribe/dialog-confirm-suscribe.component';
import { LoginFormComponent } from './login-form/login-form.component';

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
        HttpClientModule,
        MaterialsModule,
        RouterModule.forRoot(ROUTES),
      ],
      providers: [
        {provide: APP_CONFIG, useValue: environment},
        {provide: APP_BASE_HREF, useValue: '/'},
      ]
    }).compileComponents();
  }));
  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));
});
