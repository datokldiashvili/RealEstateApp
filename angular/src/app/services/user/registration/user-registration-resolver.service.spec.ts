import { TestBed } from '@angular/core/testing';

import { UserRegistrationResolverService } from './user-registration-resolver.service';

describe('UserRegistrationResolverService', () => {
  let service: UserRegistrationResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserRegistrationResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
