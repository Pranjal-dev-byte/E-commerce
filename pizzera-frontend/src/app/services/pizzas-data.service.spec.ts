import { TestBed } from '@angular/core/testing';

import { PizzasDataService } from './pizzas-data.service';

describe('PizzasDataService', () => {
  let service: PizzasDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PizzasDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
