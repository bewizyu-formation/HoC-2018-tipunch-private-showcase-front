import { MatcherFormGroupValidatorModule } from './matcher-form-group-validator.module';

describe('MatcherFormGroupValidatorModule', () => {
  let matcherFormGroupValidatorModule: MatcherFormGroupValidatorModule;

  beforeEach(() => {
    matcherFormGroupValidatorModule = new MatcherFormGroupValidatorModule();
  });

  it('should create an instance', () => {
    expect(matcherFormGroupValidatorModule).toBeTruthy();
  });
});
