import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FuelService } from './fuel.service';

@Controller('fuel')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}

  @Get('/:stationId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByStationId(@Param('stationId') stationId: number) {
    return this.fuelService.getFuelsByStationId(stationId);
  }

  @Get('/:stationId/:cityId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByStationIdAndCityId(
    @Param('stationId') stationId: number,
    @Param('cityId') cityId: number,
  ) {
    return this.fuelService.getFuelsByStationIdAndCityId(stationId, cityId);
  }

  @Get('/:cityId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByCityId(@Param('cityId') cityId: number) {
    return this.fuelService.getFuelsByCityId(cityId);
  }

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuels() {
    return this.fuelService.getAllFuels();
  }
}
