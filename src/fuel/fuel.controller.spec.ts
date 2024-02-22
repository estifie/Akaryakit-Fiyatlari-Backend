import { Test, TestingModule } from '@nestjs/testing';
import { FuelController } from './fuel.controller';

describe('FuelController', () => {
  let controller: FuelController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [FuelController],
    }).compile();

    controller = module.get<FuelController>(FuelController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
