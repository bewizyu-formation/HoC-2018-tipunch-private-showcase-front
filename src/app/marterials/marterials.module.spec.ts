import { MarterialsModule } from './marterials.module';

describe('MarterialsModule', () => {
  let marterialsModule: MarterialsModule;

  beforeEach(() => {
    marterialsModule = new MarterialsModule();
  });

  it('should create an instance', () => {
    expect(marterialsModule).toBeTruthy();
  });
});
