import { Controller, Get } from '@nestjs/common';
import { Fuel } from 'src/interfaces/fuel.interface';
import { TeService } from './te.service';

@Controller('te')
export class TeController {
  constructor(private readonly teService: TeService) {}

  @Get(':id')
  getPrice(id: number): Promise<Fuel[]> {
    return this.teService.getPrice(id);
  }
}
