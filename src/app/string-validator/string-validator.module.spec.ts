import { StringValidatorModule } from './string-validator.module';

describe('StringValidatorModule', () => {
  let stringValidatorModule: StringValidatorModule;

  beforeEach(() => {
    stringValidatorModule = new StringValidatorModule();
  });

  it('should create an instance', () => {
    expect(stringValidatorModule).toBeTruthy();
  });
});
