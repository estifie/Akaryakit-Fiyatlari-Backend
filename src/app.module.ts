import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { RouterModule } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ScheduleModule } from '@nestjs/schedule';
import { ServeStaticModule } from '@nestjs/serve-static';
import { config } from 'dotenv';
import { join } from 'path';
import { AdminModule } from './admin/admin.module';
import { AuthModule } from './auth/auth.module';
import { AuthMiddleware } from './auth/middleware/auth.middleware';
import { CityModule } from './city/city.module';
import { FuelModule } from './fuel/fuel.module';
import { AlpetModule } from './stations/alpet/alpet.module';
import { AytemizModule } from './stations/aytemiz/aytemiz.module';
import { BpModule } from './stations/bp/bp.module';
import { KadoilModule } from './stations/kadoil/kadoil.module';
import { OpetModule } from './stations/opet/opet.module';
import { PoModule } from './stations/po/po.module';
import { StationsModule } from './stations/stations.module';
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
    AdminModule,
    CityModule,
    StationsModule,
    ScheduleModule.forRoot(),
    // For adding stations layer
    RouterModule.register([
      {
        path: 'stations',
        children: [
          {
            path: 'bp',
            module: BpModule,
          },
          {
            path: 'aytemiz',
            module: AytemizModule,
          },
          {
            path: 'opet',
            module: OpetModule,
          },
          {
            path: 'po',
            module: PoModule,
          },
          {
            path: 'tp',
            module: TpModule,
          },
          {
            path: 'te',
            module: TeModule,
          },
          {
            path: 'kadoil',
            module: KadoilModule,
          },
          {
            path: 'sunpet',
            module: SunpetModule,
          },
          {
            path: 'alpet',
            module: AlpetModule,
          },
        ],
      },
    ]),
    // For adding config layer
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development'],
      isGlobal: true,
    }),
    // For adding jwt layer
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
    }),
    // For serving static files
    ServeStaticModule.forRoot({
      // Added 1 more '..' to go back from 'dist' folder
      rootPath: join(__dirname, '..', '..', 'public'),
      exclude: ['/api/*'],
      serveRoot: '/public',
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes(`admin/*`);
    consumer.apply(AuthMiddleware).forRoutes({
      path: `auth/`,
      method: RequestMethod.POST,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: `fuel/`,
      method: RequestMethod.GET,
    });
    consumer.apply(AuthMiddleware).forRoutes({
      path: `stations/`,
      method: RequestMethod.GET,
    });
  }
}
