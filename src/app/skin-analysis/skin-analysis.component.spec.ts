import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SkinAnalysisComponent } from './skin-analysis.component';

describe('SkinAnalysisComponent', () => {
  let component: SkinAnalysisComponent;
  let fixture: ComponentFixture<SkinAnalysisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SkinAnalysisComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SkinAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
