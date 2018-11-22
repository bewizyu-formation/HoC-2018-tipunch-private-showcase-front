import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomebackToolbarComponent } from './homeback-toolbar.component';

describe('HomebackToolbarComponent', () => {
  let component: HomebackToolbarComponent;
  let fixture: ComponentFixture<HomebackToolbarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomebackToolbarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomebackToolbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
