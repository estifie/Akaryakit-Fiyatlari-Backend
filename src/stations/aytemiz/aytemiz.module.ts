import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AytemizController } from './aytemiz.controller';
import { AytemizSchedulerService } from './aytemiz.scheduler';
import { AytemizService } from './aytemiz.service';

@Module({
  imports: [HttpModule],
  controllers: [AytemizController],
  providers: [AytemizService, AytemizSchedulerService],
  exports: [AytemizService],
})
export class AytemizModule {}