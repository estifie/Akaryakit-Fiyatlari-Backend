import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SunpetController } from './sunpet.controller';
import { SunpetSchedulerService } from './sunpet.scheduler';
import { SunpetService } from './sunpet.service';

@Module({
  imports: [HttpModule],
  controllers: [SunpetController],
  providers: [SunpetService, SunpetSchedulerService],
  exports: [SunpetService],
})
export class SunpetModule {}
