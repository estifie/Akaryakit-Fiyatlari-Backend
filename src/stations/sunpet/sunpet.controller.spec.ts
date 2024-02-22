import { Test, TestingModule } from '@nestjs/testing';
import { SunpetController } from './sunpet.controller';

describe('SunpetController', () => {
  let controller: SunpetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SunpetController],
    }).compile();

    controller = module.get<SunpetController>(SunpetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
