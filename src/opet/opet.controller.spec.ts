import { Test, TestingModule } from '@nestjs/testing';
import { OpetController } from './opet.controller';

describe('OpetController', () => {
  let controller: OpetController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OpetController],
    }).compile();

    controller = module.get<OpetController>(OpetController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
