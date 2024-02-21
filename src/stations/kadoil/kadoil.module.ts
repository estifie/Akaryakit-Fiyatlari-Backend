import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KadoilController } from './kadoil.controller';
import { KadoilSchedulerService } from './kadoil.scheduler';
import { KadoilService } from './kadoil.service';

@Module({
  imports: [HttpModule],
  controllers: [KadoilController],
  providers: [KadoilService, KadoilSchedulerService],
  exports: [KadoilService],
})
export class KadoilModule {}
