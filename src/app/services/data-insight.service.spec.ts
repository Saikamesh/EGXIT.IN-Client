import { TestBed } from '@angular/core/testing';

import { DataInsightService } from './data-insight.service';

describe('DataInsightService', () => {
  let service: DataInsightService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataInsightService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
