"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TpModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const tp_controller_1 = require("./tp.controller");
const tp_scheduler_1 = require("./tp.scheduler");
const tp_service_1 = require("./tp.service");
exports.STATION = {
    displayName: 'TP',
    id: 4,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: true,
    stationUrl: 'https://www.tppd.com.tr/{CITY_NAME}-akaryakit-fiyatlari',
    cityNameKey: null,
    districtNameKey: 0,
    gasolineKey: 1,
    dieselKey: 4,
    lpgKey: 8,
};
let TpModule = class TpModule {
};
exports.TpModule = TpModule;
exports.TpModule = TpModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [tp_controller_1.TpController],
        providers: [tp_service_1.TpService, tp_scheduler_1.TpSchedulerService, prisma_service_1.PrismaService],
        exports: [tp_service_1.TpService],
    })
], TpModule);
//# sourceMappingURL=tp.module.js.map