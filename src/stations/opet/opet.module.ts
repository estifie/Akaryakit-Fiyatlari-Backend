import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { Station } from '../../common/interfaces/station.interface';
import { OpetController } from './opet.controller';
import { OpetSchedulerService } from './opet.scheduler';
import { OpetService } from './opet.service';

export const STATION: Station = {
  displayName: 'Opet',
  id: 2,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: false,
  stationUrl:
    'https://api.opet.com.tr/api/fuelprices/prices?ProvinceCode={ID}&IncludeAllProducts=true', // 34 for ISTANBUL (ANADOLU), 934 for ISTANBUL (AVRUPA)
  cityNameKey: null,
  districtNameKey: 'districtName',
  gasolineKey: 'A100',
  dieselKey: 'A128',
  lpgKey: null,
};

@Module({
  imports: [HttpModule],
  controllers: [OpetController],
  providers: [OpetService, OpetSchedulerService, PrismaService],
  exports: [OpetService],
})
export class OpetModule {
  constructor(private readonly opetService: OpetService) {}
}
