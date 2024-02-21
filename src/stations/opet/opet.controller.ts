import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { OpetService } from './opet.service';

@Controller('opet')
export class OpetController {
  constructor(private readonly opetService: OpetService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.opetService.getPrice(id);
  }
}
