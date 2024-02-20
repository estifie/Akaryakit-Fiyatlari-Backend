import { Controller, Get, Param } from '@nestjs/common';
import { Fuel } from 'src/interfaces/fuel.interface';
import { OpetService } from './opet.service';

@Controller('opet')
export class OpetController {
  constructor(private readonly opetService: OpetService) {}

  @Get(':id')
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.opetService.getPrice(id);
  }
}
