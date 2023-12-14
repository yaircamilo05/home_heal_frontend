import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequierementsComponent } from './requierements.component';

describe('RequierementsComponent', () => {
  let component: RequierementsComponent;
  let fixture: ComponentFixture<RequierementsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RequierementsComponent]
    });
    fixture = TestBed.createComponent(RequierementsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
