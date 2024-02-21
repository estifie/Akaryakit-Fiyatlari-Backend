import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PoController } from './po.controller';
import { PoSchedulerService } from './po.scheduler';
import { PoService } from './po.service';

@Module({
  imports: [HttpModule],
  controllers: [PoController],
  providers: [PoService, PoSchedulerService],
  exports: [PoService],
})
export class PoModule {
  constructor(private readonly poService: PoService) {}
}
