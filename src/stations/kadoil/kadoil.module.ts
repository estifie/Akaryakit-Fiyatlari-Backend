import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { KadoilController } from './kadoil.controller';
import { KadoilSchedulerService } from './kadoil.scheduler';
import { KadoilService } from './kadoil.service';

@Module({
  imports: [HttpModule],
  controllers: [KadoilController],
  providers: [KadoilService, KadoilSchedulerService, PrismaService],
  exports: [KadoilService],
})
export class KadoilModule {}
