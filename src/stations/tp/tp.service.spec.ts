import { Test, TestingModule } from '@nestjs/testing';
import { TpService } from './tp.service';

describe('TpService', () => {
  let service: TpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TpService],
    }).compile();

    service = module.get<TpService>(TpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
