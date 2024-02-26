import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { AlpetService } from './alpet.service';

@Controller('alpet')
export class AlpetController {
  constructor(private readonly alpetService: AlpetService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.alpetService.getPrice(id);
  }
}
