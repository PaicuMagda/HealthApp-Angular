import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SymptomAssistantComponent } from './symptom-assistant.component';

describe('SymptomAssistantComponent', () => {
  let component: SymptomAssistantComponent;
  let fixture: ComponentFixture<SymptomAssistantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SymptomAssistantComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SymptomAssistantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
