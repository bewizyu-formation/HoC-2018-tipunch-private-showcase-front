import { MaterialsModule } from './materials.module';

describe('MarterialsModule', () => {
  let materialsModule: MaterialsModule;

  beforeEach(() => {
    marterialsModule = new MaterialsModule();
  });

  it('should create an instance', () => {
    expect(materialsModule).toBeTruthy();
  });
});
