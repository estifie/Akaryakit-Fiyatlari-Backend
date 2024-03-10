import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PrismaService } from '../../../prisma/prisma.service';
import { PoController } from './po.controller';
import { PoSchedulerService } from './po.scheduler';
import { PoService } from './po.service';

@Module({
  imports: [HttpModule],
  controllers: [PoController],
  providers: [PoService, PoSchedulerService, PrismaService],
  exports: [PoService],
})
export class PoModule {
  constructor(private readonly poService: PoService) {}
}
