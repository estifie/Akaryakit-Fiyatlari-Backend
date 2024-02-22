import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { config } from 'dotenv';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { FuelModule } from './fuel/fuel.module';
import { AlpetModule } from './stations/alpet/alpet.module';
import { AytemizModule } from './stations/aytemiz/aytemiz.module';
import { BpModule } from './stations/bp/bp.module';
import { KadoilModule } from './stations/kadoil/kadoil.module';
import { OpetModule } from './stations/opet/opet.module';
import { PoModule } from './stations/po/po.module';
import { SunpetModule } from './stations/sunpet/sunpet.module';
import { TeModule } from './stations/te/te.module';
import { TpModule } from './stations/tp/tp.module';
config();

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
    FuelModule,
    AuthModule,
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
    AdminModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('admin/*');
    // Also for auth post but for POST
    consumer
      .apply(AuthMiddleware)
      .forRoutes({ path: 'auth/', method: RequestMethod.POST });
  }
}
