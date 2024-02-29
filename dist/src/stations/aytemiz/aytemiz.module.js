"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AytemizModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const aytemiz_controller_1 = require("./aytemiz.controller");
const aytemiz_scheduler_1 = require("./aytemiz.scheduler");
const aytemiz_service_1 = require("./aytemiz.service");
exports.STATION = {
    displayName: 'Aytemiz',
    id: 1,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: false,
    stationUrl: 'https://www.aytemiz.com.tr/akaryakit-fiyatlari/benzin-fiyatlari?city=',
    cityNameKey: 'City',
    districtNameKey: 0,
    gasolineKey: 1,
    dieselKey: 2,
    lpgKey: null,
};
let AytemizModule = class AytemizModule {
};
exports.AytemizModule = AytemizModule;
exports.AytemizModule = AytemizModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [aytemiz_controller_1.AytemizController],
        providers: [aytemiz_service_1.AytemizService, aytemiz_scheduler_1.AytemizSchedulerService, prisma_service_1.PrismaService],
        exports: [aytemiz_service_1.AytemizService],
    })
], AytemizModule);
//# sourceMappingURL=aytemiz.module.js.map