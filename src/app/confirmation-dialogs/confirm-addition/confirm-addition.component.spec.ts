import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmAdditionComponent } from './confirm-addition.component';

describe('ConfirmAdditionComponent', () => {
  let component: ConfirmAdditionComponent;
  let fixture: ComponentFixture<ConfirmAdditionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConfirmAdditionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConfirmAdditionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
