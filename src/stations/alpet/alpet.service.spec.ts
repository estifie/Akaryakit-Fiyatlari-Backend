import { Test, TestingModule } from '@nestjs/testing';
import { AlpetService } from './alpet.service';

describe('AlpetService', () => {
  let service: AlpetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlpetService],
    }).compile();

    service = module.get<AlpetService>(AlpetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
