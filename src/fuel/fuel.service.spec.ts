import { Test, TestingModule } from '@nestjs/testing';
import { FuelService } from './fuel.service';

describe('FuelService', () => {
  let service: FuelService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [FuelService],
    }).compile();

    service = module.get<FuelService>(FuelService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
