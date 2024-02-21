import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { AytemizService } from './aytemiz.service';

@Controller('aytemiz')
export class AytemizController {
  constructor(private readonly aytemizService: AytemizService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.aytemizService.getPrice(id);
  }
}
