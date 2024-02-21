import { Module } from '@nestjs/common';
import { AytemizModule } from './aytemiz/aytemiz.module';
import { BpModule } from './bp/bp.module';
import { KadoilModule } from './kadoil/kadoil.module';
import { OpetModule } from './opet/opet.module';
import { PoModule } from './po/po.module';
import { SunpetModule } from './sunpet/sunpet.module';
import { TeModule } from './te/te.module';
import { TpModule } from './tp/tp.module';
import { AlpetModule } from './alpet/alpet.module';

@Module({
  imports: [
    BpModule,
    AytemizModule,
    OpetModule,
    PoModule,
    TpModule,
    TeModule,
    KadoilModule,
    SunpetModule,
    AlpetModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
