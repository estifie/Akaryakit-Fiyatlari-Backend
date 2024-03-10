import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { AytemizController } from './aytemiz.controller';
import { AytemizSchedulerService } from './aytemiz.scheduler';
import { AytemizService } from './aytemiz.service';

@Module({
  imports: [HttpModule],
  controllers: [AytemizController],
  providers: [AytemizService, AytemizSchedulerService, PrismaService],
  exports: [AytemizService],
})
export class AytemizModule {}
