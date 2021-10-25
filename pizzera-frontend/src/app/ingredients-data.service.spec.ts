import { TestBed } from '@angular/core/testing';

import { IngredientsDataService } from './ingredients-data.service';

describe('IngredientsDataService', () => {
  let service: IngredientsDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IngredientsDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
