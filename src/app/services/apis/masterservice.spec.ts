import { TestBed } from '@angular/core/testing';

import { Masterservice } from './masterservice';

describe('Masterservice', () => {
  let service: Masterservice;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Masterservice);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
