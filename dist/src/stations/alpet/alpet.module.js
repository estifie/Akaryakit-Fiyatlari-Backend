"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AlpetModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const alpet_controller_1 = require("./alpet.controller");
const alpet_scheduler_1 = require("./alpet.scheduler");
const alpet_service_1 = require("./alpet.service");
exports.STATION = {
    displayName: 'Alpet',
    id: 7,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: false,
    stationUrl: 'https://www.alpet.com.tr/tr-TR/akaryakit-fiyatlari?&city={CITY_NAME}',
    cityNameKey: null,
    districtNameKey: 1,
    gasolineKey: 4,
    dieselKey: 3,
    lpgKey: null,
};
let AlpetModule = class AlpetModule {
};
exports.AlpetModule = AlpetModule;
exports.AlpetModule = AlpetModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [alpet_controller_1.AlpetController],
        providers: [alpet_service_1.AlpetService, alpet_scheduler_1.AlpetSchedulerService, prisma_service_1.PrismaService],
        exports: [alpet_service_1.AlpetService],
    })
], AlpetModule);
//# sourceMappingURL=alpet.module.js.map