import { Controller, Get, Param } from '@nestjs/common';
import { BpService } from './bp.service';

@Controller('bp')
export class BpController {
  constructor(private readonly bpService: BpService) {}

  @Get(':id')
  getPrice(@Param('id') id: number) {
    return this.bpService.getPrice(id);
  }
}
