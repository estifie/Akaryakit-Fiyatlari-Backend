import { Controller, Get, Param } from '@nestjs/common';
import { Fuel } from 'src/interfaces/fuel.interface';
import { PoService } from './po.service';

@Controller('po')
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Get(':id')
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.poService.getPrice(id);
  }
}
