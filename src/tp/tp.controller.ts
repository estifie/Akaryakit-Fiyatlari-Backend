import { Controller, Get, Param } from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { TpService } from './tp.service';

@Controller('tp')
export class TpController {
  constructor(private readonly tpService: TpService) {}

  @Get(':id')
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.tpService.getPrice(id);
  }
}
