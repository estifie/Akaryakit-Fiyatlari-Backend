import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { SunpetController } from './sunpet.controller';
import { SunpetService } from './sunpet.service';

@Module({
  imports: [HttpModule],
  controllers: [SunpetController],
  providers: [SunpetService],
})
export class SunpetModule {}
