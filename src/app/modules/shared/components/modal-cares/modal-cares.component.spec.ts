import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalCaresComponent } from './modal-cares.component';

describe('ModalCaresComponent', () => {
  let component: ModalCaresComponent;
  let fixture: ComponentFixture<ModalCaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalCaresComponent]
    });
    fixture = TestBed.createComponent(ModalCaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
