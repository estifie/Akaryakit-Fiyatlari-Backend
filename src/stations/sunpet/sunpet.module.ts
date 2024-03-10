import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { SunpetController } from './sunpet.controller';
import { SunpetSchedulerService } from './sunpet.scheduler';
import { SunpetService } from './sunpet.service';

@Module({
  imports: [HttpModule],
  controllers: [SunpetController],
  providers: [SunpetService, SunpetSchedulerService, PrismaService],
  exports: [SunpetService],
})
export class SunpetModule {}
