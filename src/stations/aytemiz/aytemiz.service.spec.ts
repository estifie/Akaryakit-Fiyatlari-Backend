import { Test, TestingModule } from '@nestjs/testing';
import { AytemizService } from './aytemiz.service';

describe('AytemizService', () => {
  let service: AytemizService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AytemizService],
    }).compile();

    service = module.get<AytemizService>(AytemizService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
