import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TpController } from './tp.controller';
import { TpSchedulerService } from './tp.scheduler';
import { TpService } from './tp.service';

@Module({
  imports: [HttpModule],
  controllers: [TpController],
  providers: [TpService, TpSchedulerService, PrismaService],
  exports: [TpService],
})
export class TpModule {}
