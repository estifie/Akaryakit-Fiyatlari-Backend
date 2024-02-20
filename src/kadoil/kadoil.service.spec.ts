import { Test, TestingModule } from '@nestjs/testing';
import { KadoilService } from './kadoil.service';

describe('KadoilService', () => {
  let service: KadoilService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [KadoilService],
    }).compile();

    service = module.get<KadoilService>(KadoilService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
