"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const te_controller_1 = require("./te.controller");
const te_scheduler_1 = require("./te.scheduler");
const te_service_1 = require("./te.service");
exports.STATION = {
    displayName: 'Total Energies',
    id: 6,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: false,
    stationUrl: 'https://apimobiletest.oyakpetrol.com.tr/exapi/fuel_prices/{CITY_ID}',
    cityNameKey: null,
    districtNameKey: 'county_name',
    gasolineKey: 'kursunsuz_95_excellium_95',
    dieselKey: 'motorin',
    lpgKey: null,
};
let TeModule = class TeModule {
};
exports.TeModule = TeModule;
exports.TeModule = TeModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [te_controller_1.TeController],
        providers: [te_service_1.TeService, te_scheduler_1.TeSchedulerService, prisma_service_1.PrismaService],
        exports: [te_service_1.TeService],
    })
], TeModule);
//# sourceMappingURL=te.module.js.map