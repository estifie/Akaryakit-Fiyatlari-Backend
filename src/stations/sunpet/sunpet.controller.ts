import { Controller, Get, UsePipes, ValidationPipe } from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { SunpetService } from './sunpet.service';

@Controller('sunpet')
export class SunpetController {
  constructor(private readonly sunpetService: SunpetService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getPrice(id: number): Promise<Fuel[]> {
    return this.sunpetService.getPrice(id);
  }
}
