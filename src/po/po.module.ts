import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PoController } from './po.controller';
import { PoService } from './po.service';

@Module({
  imports: [HttpModule],
  controllers: [PoController],
  providers: [PoService],
  exports: [PoService],
})
export class PoModule {
  constructor(private readonly poService: PoService) {}
}
