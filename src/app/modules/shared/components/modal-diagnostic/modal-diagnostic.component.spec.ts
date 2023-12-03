import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDiagnosticComponent } from './modal-diagnostic.component';

describe('ModalDiagnosticComponent', () => {
  let component: ModalDiagnosticComponent;
  let fixture: ComponentFixture<ModalDiagnosticComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalDiagnosticComponent]
    });
    fixture = TestBed.createComponent(ModalDiagnosticComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
