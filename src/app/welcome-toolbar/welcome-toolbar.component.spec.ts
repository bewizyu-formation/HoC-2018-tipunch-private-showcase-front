import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WelcomeToolbarComponent } from './welcome-toolbar.component';

describe('WelcomeToolbarComponent', () => {
  let component: WelcomeToolbarComponent;
  let fixture: ComponentFixture<WelcomeToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WelcomeToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WelcomeToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
