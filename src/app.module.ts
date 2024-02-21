import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { config } from 'dotenv';
import { AdminModule } from './admin/admin.module';
import { AlpetModule } from './alpet/alpet.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { AytemizModule } from './aytemiz/aytemiz.module';
import { BpModule } from './bp/bp.module';
import { FuelModule } from './fuel/fuel.module';
import { KadoilModule } from './kadoil/kadoil.module';
import { OpetModule } from './opet/opet.module';
import { PoModule } from './po/po.module';
import { SunpetModule } from './sunpet/sunpet.module';
import { TeModule } from './te/te.module';
import { TpModule } from './tp/tp.module';
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
