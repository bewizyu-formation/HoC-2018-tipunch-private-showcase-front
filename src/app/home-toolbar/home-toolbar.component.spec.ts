import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { PATH_SUBSCRIBE } from '../app.routes.constantes';
import { PATH_CONNEXION } from '../app.routes.constantes';
import { HomeToolbarComponent } from './home-toolbar.component';

describe('HomeToolbarComponent', () => {
  let component: HomeToolbarComponent;
  let fixture: ComponentFixture<HomeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeToolbarComponent, PATH_CONNEXION, PATH_SUBSCRIBE ],
      imports: [ Router ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
