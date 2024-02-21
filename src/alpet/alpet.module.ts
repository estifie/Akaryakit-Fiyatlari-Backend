import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AlpetController } from './alpet.controller';
import { AlpetService } from './alpet.service';

@Module({
  imports: [HttpModule],
  providers: [AlpetService],
  controllers: [AlpetController],
})
export class AlpetModule {}
