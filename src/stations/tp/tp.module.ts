import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Station } from '../../common/interfaces/station.interface';
import { TpController } from './tp.controller';
import { TpSchedulerService } from './tp.scheduler';
import { TpService } from './tp.service';

export const STATION: Station = {
  displayName: 'TP',
  id: 4,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl: 'https://www.tppd.com.tr/{CITY_NAME}-akaryakit-fiyatlari',
  cityNameKey: null,
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 4,
  lpgKey: 8,
};

@Module({
  imports: [HttpModule],
  controllers: [TpController],
  providers: [TpService, TpSchedulerService, PrismaService],
  exports: [TpService],
})
export class TpModule {}
