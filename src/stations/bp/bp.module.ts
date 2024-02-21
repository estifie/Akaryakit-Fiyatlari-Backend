import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Station } from 'src/common/interfaces/station.interface';
import { BpController } from './bp.controller';
import { BpSchedulerService } from './bp.scheduler';
import { BpService } from './bp.service';

export const STATION: Station = {
  displayName: 'BP',
  id: 0,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl: 'https://www.bp.com/bp-tr-pump-prices/api/PumpPrices?strCity=',
  cityNameKey: 'City',
  districtNameKey: 'District',
  gasolineKey: 'Benzin',
  dieselKey: 'Motorin',
  lpgKey: 'LpgPrice',
};

@Module({
  imports: [HttpModule],
  controllers: [BpController],
  providers: [BpService, BpSchedulerService, PrismaService],
  exports: [BpService],
})
export class BpModule {
  constructor(private readonly bpService: BpService) {}
}
