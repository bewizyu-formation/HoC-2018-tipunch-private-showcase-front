import { MaterialsModule } from './materials.module';

describe('MarterialsModule', () => {
  let materialsModule: MaterialsModule;

  beforeEach(() => {
    marteialsModule = new MaterialsModule();
  });

  it('should create an instance', () => {
    expect(materialsModule).toBeTruthy();
  });
});
