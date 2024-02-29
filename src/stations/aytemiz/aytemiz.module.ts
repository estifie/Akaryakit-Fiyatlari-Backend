import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Station } from '../../common/interfaces/station.interface';
import { AytemizController } from './aytemiz.controller';
import { AytemizSchedulerService } from './aytemiz.scheduler';
import { AytemizService } from './aytemiz.service';

export const STATION: Station = {
  displayName: 'Aytemiz',
  id: 1,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: false,
  stationUrl:
    'https://www.aytemiz.com.tr/akaryakit-fiyatlari/benzin-fiyatlari?city=',
  cityNameKey: 'City',
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 2,
  lpgKey: null,
};

@Module({
  imports: [HttpModule],
  controllers: [AytemizController],
  providers: [AytemizService, AytemizSchedulerService, PrismaService],
  exports: [AytemizService],
})
export class AytemizModule {}
