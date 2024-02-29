import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdditionalThoughtsComponent } from './additional-thoughts.component';

describe('AdditionalThoughtsComponent', () => {
  let component: AdditionalThoughtsComponent;
  let fixture: ComponentFixture<AdditionalThoughtsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdditionalThoughtsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdditionalThoughtsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
