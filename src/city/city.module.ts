import { Module } from '@nestjs/common';
import { CityController } from './city.controller';
import { CityService } from './city.service';

@Module({
  providers: [CityService],
  controllers: [CityController],
})
export class CityModule {}
