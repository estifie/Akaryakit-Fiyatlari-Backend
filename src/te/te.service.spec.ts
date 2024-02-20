import { Test, TestingModule } from '@nestjs/testing';
import { TeService } from './te.service';

describe('TeService', () => {
  let service: TeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TeService],
    }).compile();

    service = module.get<TeService>(TeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
