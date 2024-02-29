import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StationsController } from './stations.controller';
import { StationsService } from './stations.service';

@Module({
  providers: [StationsService, PrismaService],
  controllers: [StationsController],
})
export class StationsModule {}
