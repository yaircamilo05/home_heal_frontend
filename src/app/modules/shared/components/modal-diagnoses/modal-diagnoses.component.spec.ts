import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiagnosesComponent } from './modal-diagnoses.component';

describe('ModalDiagnosesComponent', () => {
  let component: ModalDiagnosesComponent;
  let fixture: ComponentFixture<ModalDiagnosesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDiagnosesComponent]
    });
    fixture = TestBed.createComponent(ModalDiagnosesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
