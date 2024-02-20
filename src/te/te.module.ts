import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TeController } from './te.controller';
import { TeService } from './te.service';

@Module({
  imports: [HttpModule],
  controllers: [TeController],
  providers: [TeService],
})
export class TeModule {}
