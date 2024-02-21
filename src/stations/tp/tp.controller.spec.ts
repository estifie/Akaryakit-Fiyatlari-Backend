import { Test, TestingModule } from '@nestjs/testing';
import { TpController } from './tp.controller';

describe('TpController', () => {
  let controller: TpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TpController],
    }).compile();

    controller = module.get<TpController>(TpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
