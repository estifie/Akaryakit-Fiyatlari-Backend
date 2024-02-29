"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KadoilModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const kadoil_controller_1 = require("./kadoil.controller");
const kadoil_scheduler_1 = require("./kadoil.scheduler");
const kadoil_service_1 = require("./kadoil.service");
exports.STATION = {
    displayName: 'Kadoil',
    id: 3,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: true,
    stationUrl: 'https://admin.kadoil.com/api/price-lists/prices',
    cityNameKey: null,
    districtNameKey: 0,
    gasolineKey: 1,
    dieselKey: 2,
    lpgKey: 8,
};
let KadoilModule = class KadoilModule {
};
exports.KadoilModule = KadoilModule;
exports.KadoilModule = KadoilModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [kadoil_controller_1.KadoilController],
        providers: [kadoil_service_1.KadoilService, kadoil_scheduler_1.KadoilSchedulerService, prisma_service_1.PrismaService],
        exports: [kadoil_service_1.KadoilService],
    })
], KadoilModule);
//# sourceMappingURL=kadoil.module.js.map