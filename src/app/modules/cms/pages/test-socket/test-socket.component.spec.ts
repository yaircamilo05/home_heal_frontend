import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TestSocketComponent } from './test-socket.component';

describe('TestSocketComponent', () => {
  let component: TestSocketComponent;
  let fixture: ComponentFixture<TestSocketComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestSocketComponent]
    });
    fixture = TestBed.createComponent(TestSocketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
