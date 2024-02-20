import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { TpController } from './tp.controller';
import { TpService } from './tp.service';

@Module({
  imports: [HttpModule],
  controllers: [TpController],
  providers: [TpService],
})
export class TpModule {}
