import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConfirmSuscribeComponent } from './dialog-confirm-suscribe.component';

describe('DialogConfirmSuscribeComponent', () => {
  let component: DialogConfirmSuscribeComponent;
  let fixture: ComponentFixture<DialogConfirmSuscribeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogConfirmSuscribeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogConfirmSuscribeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
