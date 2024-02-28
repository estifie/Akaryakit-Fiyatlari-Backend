import { Controller, Get } from '@nestjs/common';
import { StationsService } from './stations.service';

@Controller('station')
export class StationsController {
  constructor(private readonly stationsService: StationsService) {}

  @Get('stations')
  async getStations() {
    return await this.stationsService.getAllStations();
  }
}
