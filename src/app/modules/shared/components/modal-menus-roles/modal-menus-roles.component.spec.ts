import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalMenusRolesComponent } from './modal-menus-roles.component';

describe('ModalMenusRolesComponent', () => {
  let component: ModalMenusRolesComponent;
  let fixture: ComponentFixture<ModalMenusRolesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ModalMenusRolesComponent]
    });
    fixture = TestBed.createComponent(ModalMenusRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
