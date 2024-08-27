import { TestBed } from '@angular/core/testing';

import { CountryResolverService } from './country-resolver.service';

describe('CountryResolverService', () => {
  let service: CountryResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CountryResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
