import { Test, TestingModule } from '@nestjs/testing';
import { BpController } from './bp.controller';

describe('BpController', () => {
  let controller: BpController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BpController],
    }).compile();

    controller = module.get<BpController>(BpController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
