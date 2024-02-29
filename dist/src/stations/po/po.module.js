"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PoModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const po_controller_1 = require("./po.controller");
const po_scheduler_1 = require("./po.scheduler");
const po_service_1 = require("./po.service");
exports.STATION = {
    displayName: 'Petrol Ofisi',
    id: 8,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: true,
    stationUrl: 'https://www.petrolofisi.com.tr/akaryakit-fiyatlari/{CITY_NAME}-akaryakit-fiyatlari',
    cityNameKey: null,
    districtNameKey: 0,
    gasolineKey: 1,
    dieselKey: 3,
    lpgKey: 4,
};
let PoModule = class PoModule {
    constructor(poService) {
        this.poService = poService;
    }
};
exports.PoModule = PoModule;
exports.PoModule = PoModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [po_controller_1.PoController],
        providers: [po_service_1.PoService, po_scheduler_1.PoSchedulerService, prisma_service_1.PrismaService],
        exports: [po_service_1.PoService],
    }),
    __metadata("design:paramtypes", [po_service_1.PoService])
], PoModule);
//# sourceMappingURL=po.module.js.map