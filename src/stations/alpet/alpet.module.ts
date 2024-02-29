import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Station } from '../../common/interfaces/station.interface';
import { AlpetController } from './alpet.controller';
import { AlpetSchedulerService } from './alpet.scheduler';
import { AlpetService } from './alpet.service';

export const STATION: Station = {
  displayName: 'Alpet',
  id: 7,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: false,
  stationUrl:
    'https://www.alpet.com.tr/tr-TR/akaryakit-fiyatlari?&city={CITY_NAME}',
  cityNameKey: null,
  districtNameKey: 1,
  gasolineKey: 4,
  dieselKey: 3,
  lpgKey: null,
};

@Module({
  imports: [HttpModule],
  controllers: [AlpetController],
  providers: [AlpetService, AlpetSchedulerService, PrismaService],
  exports: [AlpetService],
})
export class AlpetModule {}
