import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { TeController } from './te.controller';
import { TeSchedulerService } from './te.scheduler';
import { TeService } from './te.service';

@Module({
  imports: [HttpModule],
  controllers: [TeController],
  providers: [TeService, TeSchedulerService, PrismaService],
  exports: [TeService],
})
export class TeModule {}
