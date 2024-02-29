"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const schedule_1 = require("@nestjs/schedule");
const serve_static_1 = require("@nestjs/serve-static");
const dotenv_1 = require("dotenv");
const path_1 = require("path");
const admin_module_1 = require("./admin/admin.module");
const auth_module_1 = require("./auth/auth.module");
const auth_middleware_1 = require("./auth/middleware/auth.middleware");
const city_module_1 = require("./city/city.module");
const fuel_module_1 = require("./fuel/fuel.module");
const alpet_module_1 = require("./stations/alpet/alpet.module");
const aytemiz_module_1 = require("./stations/aytemiz/aytemiz.module");
const bp_module_1 = require("./stations/bp/bp.module");
const kadoil_module_1 = require("./stations/kadoil/kadoil.module");
const opet_module_1 = require("./stations/opet/opet.module");
const po_module_1 = require("./stations/po/po.module");
const stations_module_1 = require("./stations/stations.module");
const sunpet_module_1 = require("./stations/sunpet/sunpet.module");
const te_module_1 = require("./stations/te/te.module");
const tp_module_1 = require("./stations/tp/tp.module");
(0, dotenv_1.config)();
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes(`admin/*`);
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({
            path: `auth/`,
            method: common_1.RequestMethod.POST,
        });
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({
            path: `fuel/`,
            method: common_1.RequestMethod.GET,
        });
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes({
            path: `stations/`,
            method: common_1.RequestMethod.GET,
        });
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            bp_module_1.BpModule,
            aytemiz_module_1.AytemizModule,
            opet_module_1.OpetModule,
            po_module_1.PoModule,
            tp_module_1.TpModule,
            te_module_1.TeModule,
            kadoil_module_1.KadoilModule,
            sunpet_module_1.SunpetModule,
            alpet_module_1.AlpetModule,
            fuel_module_1.FuelModule,
            auth_module_1.AuthModule,
            admin_module_1.AdminModule,
            city_module_1.CityModule,
            stations_module_1.StationsModule,
            schedule_1.ScheduleModule.forRoot(),
            core_1.RouterModule.register([
                {
                    path: 'stations',
                    children: [
                        {
                            path: 'bp',
                            module: bp_module_1.BpModule,
                        },
                        {
                            path: 'aytemiz',
                            module: aytemiz_module_1.AytemizModule,
                        },
                        {
                            path: 'opet',
                            module: opet_module_1.OpetModule,
                        },
                        {
                            path: 'po',
                            module: po_module_1.PoModule,
                        },
                        {
                            path: 'tp',
                            module: tp_module_1.TpModule,
                        },
                        {
                            path: 'te',
                            module: te_module_1.TeModule,
                        },
                        {
                            path: 'kadoil',
                            module: kadoil_module_1.KadoilModule,
                        },
                        {
                            path: 'sunpet',
                            module: sunpet_module_1.SunpetModule,
                        },
                        {
                            path: 'alpet',
                            module: alpet_module_1.AlpetModule,
                        },
                    ],
                },
            ]),
            config_1.ConfigModule.forRoot({
                envFilePath: ['.env', '.env.development'],
                isGlobal: true,
            }),
            jwt_1.JwtModule.register({
                secret: process.env.JWT_SECRET,
                signOptions: { expiresIn: process.env.JWT_EXPIRATION_TIME },
            }),
            serve_static_1.ServeStaticModule.forRoot({
                rootPath: (0, path_1.join)(__dirname, '..', '..', 'public'),
                exclude: ['/api/*'],
                serveRoot: '/public',
            }),
        ],
        controllers: [],
        providers: [],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map