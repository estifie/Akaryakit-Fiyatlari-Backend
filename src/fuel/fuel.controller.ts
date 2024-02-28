import {
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { FuelService } from './fuel.service';

@Controller('fuel')
export class FuelController {
  constructor(private readonly fuelService: FuelService) {}

  @Get('/stations/:stationId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByStationId(@Param('stationId') stationId: number) {
    return await this.fuelService.getFuelsByStationId(stationId);
  }

  @Get('/stations/:stationId/:cityId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByStationIdAndCityId(
    @Param('stationId') stationId: number,
    @Param('cityId') cityId: number,
  ) {
    return await this.fuelService.getFuelsByStationIdAndCityId(
      stationId,
      cityId,
    );
  }

  @Get('/cities/:cityId')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByCityId(@Param('cityId') cityId: number) {
    return await this.fuelService.getFuelsByCityId(cityId);
  }

  @Get('/cities/:cityId/:district')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByCityAndDistrict(
    @Param('cityId') cityId: number,
    @Param('district') district: string,
  ) {
    return await this.fuelService.getFuelsByCityAndDistrict(cityId, district);
  }

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async getFuels() {
    return await this.fuelService.getAllFuels();
  }
}
