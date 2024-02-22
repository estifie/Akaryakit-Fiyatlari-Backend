import { Test, TestingModule } from '@nestjs/testing';
import { BpService } from './bp.service';

describe('BpService', () => {
  let service: BpService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BpService],
    }).compile();

    service = module.get<BpService>(BpService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
