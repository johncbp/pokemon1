import { TestBed } from '@angular/core/testing';

import { HaServiService } from './ha-servi.service';

describe('HaServiService', () => {
  let service: HaServiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaServiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
