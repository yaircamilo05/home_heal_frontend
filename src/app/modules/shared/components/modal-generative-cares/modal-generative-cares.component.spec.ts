import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalGenerativeCaresComponent } from './modal-generative-cares.component';

describe('ModalGenerativeCaresComponent', () => {
  let component: ModalGenerativeCaresComponent;
  let fixture: ComponentFixture<ModalGenerativeCaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalGenerativeCaresComponent]
    });
    fixture = TestBed.createComponent(ModalGenerativeCaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
