import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { KadoilController } from './kadoil.controller';
import { KadoilService } from './kadoil.service';

@Module({
  imports: [HttpModule],
  controllers: [KadoilController],
  providers: [KadoilService],
})
export class KadoilModule {}
