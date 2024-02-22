import { Test, TestingModule } from '@nestjs/testing';
import { KadoilController } from './kadoil.controller';

describe('KadoilController', () => {
  let controller: KadoilController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [KadoilController],
    }).compile();

    controller = module.get<KadoilController>(KadoilController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
