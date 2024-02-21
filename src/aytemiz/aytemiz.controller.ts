import { Controller, Get, Param } from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { AytemizService } from './aytemiz.service';

@Controller('aytemiz')
export class AytemizController {
  constructor(private readonly aytemizService: AytemizService) {}

  @Get(':id')
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.aytemizService.getPrice(id);
  }
}
