import { MaterialsModule } from './materials.module';

describe('MarterialsModule', () => {
  const materialsModule: MaterialsModule;

  beforeEach(() => {
    marterialsModule = new MaterialsModule();
  });

  it('should create an instance', () => {
    expect(materialsModule).toBeTruthy();
  });
});
