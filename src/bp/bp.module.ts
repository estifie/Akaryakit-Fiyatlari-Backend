import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { BpController } from './bp.controller';
import { BpService } from './bp.service';

@Module({
  imports: [HttpModule],
  controllers: [BpController],
  providers: [BpService],
  exports: [BpService],
})
export class BpModule {
  constructor(private readonly bpService: BpService) {}
}
