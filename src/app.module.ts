import { Module } from '@nestjs/common';
import { AytemizModule } from './aytemiz/aytemiz.module';
import { BpModule } from './bp/bp.module';
import { OpetModule } from './opet/opet.module';
import { PoModule } from './po/po.module';
import { TeModule } from './te/te.module';
import { TpModule } from './tp/tp.module';

@Module({
  imports: [BpModule, AytemizModule, OpetModule, PoModule, TpModule, TeModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
