import {
  Controller,
  Get,
  Param,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { TeService } from './te.service';

@Controller('te')
export class TeController {
  constructor(private readonly teService: TeService) {}

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.teService.getPrice(id);
  }

  @Get(':ids')
  @UsePipes(new ValidationPipe({ transform: true }))
  getPrices(
    @Param('ids') ids: number[],
    @Query('interval') interval: number,
  ): Promise<Fuel[][]> {
    return this.teService.getPricesBatch(ids, interval);
  }
}
