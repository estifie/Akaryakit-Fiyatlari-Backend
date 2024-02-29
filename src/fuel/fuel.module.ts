import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FuelController } from './fuel.controller';
import { FuelService } from './fuel.service';

@Module({
  providers: [FuelService, PrismaService],
  controllers: [FuelController],
})
export class FuelModule {}
