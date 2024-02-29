import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Station } from '../../common/interfaces/station.interface';
import { TeController } from './te.controller';
import { TeSchedulerService } from './te.scheduler';
import { TeService } from './te.service';

export const STATION: Station = {
  displayName: 'Total Energies',
  id: 6,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: false,
  stationUrl:
    'https://apimobiletest.oyakpetrol.com.tr/exapi/fuel_prices/{CITY_ID}',
  cityNameKey: null,
  districtNameKey: 'county_name',
  gasolineKey: 'kursunsuz_95_excellium_95',
  dieselKey: 'motorin',
  lpgKey: null,
};

@Module({
  imports: [HttpModule],
  controllers: [TeController],
  providers: [TeService, TeSchedulerService, PrismaService],
  exports: [TeService],
})
export class TeModule {}
