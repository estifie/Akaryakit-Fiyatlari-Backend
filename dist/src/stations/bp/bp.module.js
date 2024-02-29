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
exports.BpModule = exports.STATION = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const bp_controller_1 = require("./bp.controller");
const bp_scheduler_1 = require("./bp.scheduler");
const bp_service_1 = require("./bp.service");
exports.STATION = {
    displayName: 'BP',
    id: 0,
    hasDiesel: true,
    hasGasoline: true,
    hasLpg: true,
    stationUrl: 'https://www.bp.com/bp-tr-pump-prices/api/PumpPrices?strCity=',
    cityNameKey: 'City',
    districtNameKey: 'District',
    gasolineKey: 'Benzin',
    dieselKey: 'Motorin',
    lpgKey: 'LpgPrice',
};
let BpModule = class BpModule {
    constructor(bpService) {
        this.bpService = bpService;
    }
};
exports.BpModule = BpModule;
exports.BpModule = BpModule = __decorate([
    (0, common_1.Module)({
        imports: [axios_1.HttpModule],
        controllers: [bp_controller_1.BpController],
        providers: [bp_service_1.BpService, bp_scheduler_1.BpSchedulerService, prisma_service_1.PrismaService],
        exports: [bp_service_1.BpService],
    }),
    __metadata("design:paramtypes", [bp_service_1.BpService])
], BpModule);
//# sourceMappingURL=bp.module.js.map