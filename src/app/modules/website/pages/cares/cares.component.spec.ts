import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CaresComponent } from './cares.component';

describe('CaresComponent', () => {
  let component: CaresComponent;
  let fixture: ComponentFixture<CaresComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CaresComponent]
    });
    fixture = TestBed.createComponent(CaresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
