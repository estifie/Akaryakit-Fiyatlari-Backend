import { Test, TestingModule } from '@nestjs/testing';
import { OpetService } from './opet.service';

describe('OpetService', () => {
  let service: OpetService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OpetService],
    }).compile();

    service = module.get<OpetService>(OpetService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
