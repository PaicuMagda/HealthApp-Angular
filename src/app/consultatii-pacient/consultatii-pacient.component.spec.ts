import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultatiiPacientComponent } from './consultatii-pacient.component';

describe('ConsultatiiPacientComponent', () => {
  let component: ConsultatiiPacientComponent;
  let fixture: ComponentFixture<ConsultatiiPacientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsultatiiPacientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsultatiiPacientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
