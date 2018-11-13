import { HomeComponent } from './home/home.component';
import { MatButtonModule, MatToolbarModule } from '@angular/material/';
import { HeaderComponent } from './header/header.component';
import {async, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HttpClientModule} from '@angular/common/http';
import {APP_CONFIG} from './app.config';
import {environment} from '../environments/environment';
import { RouterModule } from '@angular/router';
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
      ],
      imports: [
        HttpClientModule,
        MatButtonModule,
        MatToolbarModule,
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
