import {
  Controller,
  Get,
  Param,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CityService } from './city.service';

@Controller('city')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get('districts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getAllDistricts() {
    return await this.cityService.getAllDistricts();
  }

  @Get(':cityId/districts')
  @UsePipes(new ValidationPipe({ transform: true }))
  async getDisctrictsOfCity(@Param('cityId') cityId: number) {
    return this.cityService.getDisctrictsOfCity(cityId);
  }
}
