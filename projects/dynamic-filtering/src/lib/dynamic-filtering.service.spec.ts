import { TestBed } from '@angular/core/testing';

import { DynamicFilteringService } from './dynamic-filtering.service';

describe('DynamicFilteringService', () => {
  let service: DynamicFilteringService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DynamicFilteringService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
