import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAppointmentComponent } from './modal-appointment.component';

describe('ModalAppointmentComponent', () => {
  let component: ModalAppointmentComponent;
  let fixture: ComponentFixture<ModalAppointmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalAppointmentComponent]
    });
    fixture = TestBed.createComponent(ModalAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
