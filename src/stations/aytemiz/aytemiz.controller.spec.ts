import { Test, TestingModule } from '@nestjs/testing';
import { AytemizController } from './aytemiz.controller';

describe('AytemizController', () => {
  let controller: AytemizController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AytemizController],
    }).compile();

    controller = module.get<AytemizController>(AytemizController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
