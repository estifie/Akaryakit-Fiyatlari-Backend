import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BpController } from './bp.controller';
import { BpSchedulerService } from './bp.scheduler';
import { BpService } from './bp.service';

@Module({
  imports: [HttpModule],
  controllers: [BpController],
  providers: [BpService, BpSchedulerService],
  exports: [BpService],
})
export class BpModule {
  constructor(private readonly bpService: BpService) {}
}
