import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVitalSignsComponent } from './modal-vital-signs.component';

describe('ModalVitalSignsComponent', () => {
  let component: ModalVitalSignsComponent;
  let fixture: ComponentFixture<ModalVitalSignsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalVitalSignsComponent]
    });
    fixture = TestBed.createComponent(ModalVitalSignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
