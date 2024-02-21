import { Controller, Get, Param } from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { BpService } from './bp.service';

@Controller('bp')
export class BpController {
  constructor(private readonly bpService: BpService) {}

  @Get(':id')
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.bpService.getPrice(id);
  }
}
