import { Module } from '@nestjs/common';
import { BpModule } from './bp/bp.module';

@Module({
  imports: [BpModule],
})
export class AppModule {}
