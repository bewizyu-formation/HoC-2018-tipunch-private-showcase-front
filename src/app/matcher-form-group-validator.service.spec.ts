import { TestBed } from '@angular/core/testing';

import { MatcherFormGroupValidatorService } from './matcher-form-group-validator.service';

describe('MatcherFormGroupValidatorService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MatcherFormGroupValidatorService = TestBed.get(MatcherFormGroupValidatorService);
    expect(service).toBeTruthy();
  });
});
