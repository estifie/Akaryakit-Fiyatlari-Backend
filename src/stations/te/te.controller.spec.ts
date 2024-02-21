import { Test, TestingModule } from '@nestjs/testing';
import { TeController } from './te.controller';

describe('TeController', () => {
  let controller: TeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TeController],
    }).compile();

    controller = module.get<TeController>(TeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
