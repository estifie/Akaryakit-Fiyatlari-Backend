"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SunpetModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const sunpet_controller_1 = require("./sunpet.controller");
const sunpet_scheduler_1 = require("./sunpet.scheduler");
const sunpet_service_1 = require("./sunpet.service");
exports.STATION = {
    displayName: 'Sunpet',
    id: 5,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: false,
    stationUrl: 'https://www.sunpettr.com.tr/yakit-fiyatlari-{CITY_NAME}',
    cityNameKey: null,
    districtNameKey: 0,
    gasolineKey: 2,
    dieselKey: 3,
    lpgKey: null,
};
let SunpetModule = class SunpetModule {
};
exports.SunpetModule = SunpetModule;
exports.SunpetModule = SunpetModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [sunpet_controller_1.SunpetController],
        providers: [sunpet_service_1.SunpetService, sunpet_scheduler_1.SunpetSchedulerService, prisma_service_1.PrismaService],
        exports: [sunpet_service_1.SunpetService],
    })
], SunpetModule);
//# sourceMappingURL=sunpet.module.js.map