import { Test, TestingModule } from '@nestjs/testing';
import { SunpetService } from './sunpet.service';

describe('SunpetService', () => {
  let service: SunpetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SunpetService],
    }).compile();

    service = module.get<SunpetService>(SunpetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
