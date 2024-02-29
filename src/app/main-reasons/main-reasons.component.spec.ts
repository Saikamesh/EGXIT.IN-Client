import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainReasonsComponent } from './main-reasons.component';

describe('MainReasonsComponent', () => {
  let component: MainReasonsComponent;
  let fixture: ComponentFixture<MainReasonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainReasonsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MainReasonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
