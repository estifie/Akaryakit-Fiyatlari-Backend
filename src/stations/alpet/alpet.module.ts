import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AlpetController } from './alpet.controller';
import { AlpetSchedulerService } from './alpet.scheduler';
import { AlpetService } from './alpet.service';

@Module({
  imports: [HttpModule],
  controllers: [AlpetController],
  providers: [AlpetService, AlpetSchedulerService, PrismaService],
  exports: [AlpetService],
})
export class AlpetModule {}
