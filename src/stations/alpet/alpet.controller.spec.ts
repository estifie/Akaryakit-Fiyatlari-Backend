import { Test, TestingModule } from '@nestjs/testing';
import { AlpetController } from './alpet.controller';

describe('AlpetController', () => {
  let controller: AlpetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AlpetController],
    }).compile();

    controller = module.get<AlpetController>(AlpetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
