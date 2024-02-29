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
exports.OpetModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const opet_controller_1 = require("./opet.controller");
const opet_scheduler_1 = require("./opet.scheduler");
const opet_service_1 = require("./opet.service");
exports.STATION = {
    displayName: 'Opet',
    id: 2,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: false,
    stationUrl: 'https://api.opet.com.tr/api/fuelprices/prices?ProvinceCode={ID}&IncludeAllProducts=true',
    cityNameKey: null,
    districtNameKey: 'districtName',
    gasolineKey: 'A100',
    dieselKey: 'A128',
    lpgKey: null,
};
let OpetModule = class OpetModule {
    constructor(opetService) {
        this.opetService = opetService;
    }
};
exports.OpetModule = OpetModule;
exports.OpetModule = OpetModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [opet_controller_1.OpetController],
        providers: [opet_service_1.OpetService, opet_scheduler_1.OpetSchedulerService, prisma_service_1.PrismaService],
        exports: [opet_service_1.OpetService],
    }),
    __metadata("design:paramtypes", [opet_service_1.OpetService])
], OpetModule);
//# sourceMappingURL=opet.module.js.map