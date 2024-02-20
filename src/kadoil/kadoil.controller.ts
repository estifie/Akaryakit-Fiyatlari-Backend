import { Controller, Get, Param } from '@nestjs/common';
import { Fuel } from 'src/interfaces/fuel.interface';
import { KadoilService } from './kadoil.service';

@Controller('kadoil')
export class KadoilController {
  constructor(private readonly kadoilService: KadoilService) {}

  @Get(':id')
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.kadoilService.getPrice(id);
  }
}
