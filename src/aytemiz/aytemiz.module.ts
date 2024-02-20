import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AytemizController } from './aytemiz.controller';
import { AytemizService } from './aytemiz.service';

@Module({
  imports: [HttpModule],
  providers: [AytemizService],
  controllers: [AytemizController],
})
export class AytemizModule {}
