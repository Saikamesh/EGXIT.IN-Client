import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallWorkExperienceComponent } from './overall-work-experience.component';

describe('OverallWorkExperienceComponent', () => {
  let component: OverallWorkExperienceComponent;
  let fixture: ComponentFixture<OverallWorkExperienceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OverallWorkExperienceComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OverallWorkExperienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
