import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Station } from 'src/common/interfaces/station.interface';
import { KadoilController } from './kadoil.controller';
import { KadoilSchedulerService } from './kadoil.scheduler';
import { KadoilService } from './kadoil.service';

export const STATION: Station = {
  displayName: 'Kadoil',
  id: 3,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl: 'https://admin.kadoil.com/price-lists/map',
  cityNameKey: null,
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 2,
  lpgKey: 8,
};

@Module({
  imports: [HttpModule],
  controllers: [KadoilController],
  providers: [KadoilService, KadoilSchedulerService, PrismaService],
  exports: [KadoilService],
})
export class KadoilModule {}
