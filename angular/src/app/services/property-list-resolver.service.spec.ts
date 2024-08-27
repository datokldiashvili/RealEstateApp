import { TestBed } from '@angular/core/testing';

import { PropertyListResolverService } from './property-list-resolver.service';

describe('PropertyListResolverService', () => {
  let service: PropertyListResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PropertyListResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
