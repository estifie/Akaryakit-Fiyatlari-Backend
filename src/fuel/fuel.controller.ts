import {
  Controller,
  DefaultValuePipe,
  Get,
  Param,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleGuard } from '../auth/guards/role.guard';
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
  async getFuelsByCityId(
    @Param('cityId') cityId: number,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(30)) limit: number,
  ) {
    return await this.fuelService.getFuelsByCityId(cityId, page, limit);
  }

  @Get('/cities/:cityId/:district')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getFuelsByCityAndDistrict(
    @Param('cityId') cityId: number,
    @Param('district') district: string,
    @Query('page', new DefaultValuePipe(1)) page: number,
    @Query('limit', new DefaultValuePipe(30)) limit: number,
  ) {
    return await this.fuelService.getFuelsByCityAndDistrict(
      cityId,
      district,
      page,
      limit,
    );
  }

  @Get('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async getFuels() {
    return await this.fuelService.getAllFuels();
  }
}
