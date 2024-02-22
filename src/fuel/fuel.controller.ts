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

  @Get('/stations/:stationId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByStationId(@Param('stationId') stationId: number) {
    return this.fuelService.getFuelsByStationId(stationId);
  }

  @Get('/stations/:stationId/:cityId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByStationIdAndCityId(
    @Param('stationId') stationId: number,
    @Param('cityId') cityId: number,
  ) {
    return this.fuelService.getFuelsByStationIdAndCityId(stationId, cityId);
  }

  // Fix this, /:cityId and /:stationId same route
  @Get('/cities/:cityId')
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
