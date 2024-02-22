import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { Station } from 'src/common/interfaces/station.interface';
import { PoController } from './po.controller';
import { PoSchedulerService } from './po.scheduler';
import { PoService } from './po.service';
import { PrismaService } from 'prisma/prisma.service';

export const STATION: Station = {
  displayName: 'Petrol Ofisi',
  id: 8,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl:
    'https://www.petrolofisi.com.tr/akaryakit-fiyatlari/{CITY_NAME}-akaryakit-fiyatlari',
  cityNameKey: null,
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 3,
  lpgKey: 4,
};

@Module({
  imports: [HttpModule],
  controllers: [PoController],
  providers: [PoService, PoSchedulerService, PrismaService],
  exports: [PoService],
})
export class PoModule {
  constructor(private readonly poService: PoService) {}
}
