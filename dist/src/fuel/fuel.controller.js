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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FuelController = void 0;
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../auth/guards/role.guard");
const fuel_service_1 = require("./fuel.service");
let FuelController = class FuelController {
    constructor(fuelService) {
        this.fuelService = fuelService;
    }
    async getFuelsByStationId(stationId) {
        return await this.fuelService.getFuelsByStationId(stationId);
    }
    async getFuelsByStationIdAndCityId(stationId, cityId) {
        return await this.fuelService.getFuelsByStationIdAndCityId(stationId, cityId);
    }
    async getFuelsByCityId(cityId) {
        return await this.fuelService.getFuelsByCityId(cityId);
    }
    async getFuelsByCityAndDistrict(cityId, district) {
        return await this.fuelService.getFuelsByCityAndDistrict(cityId, district);
    }
    async getFuels() {
        return await this.fuelService.getAllFuels();
    }
};
exports.FuelController = FuelController;
__decorate([
    (0, common_1.Get)('/stations/:stationId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('stationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FuelController.prototype, "getFuelsByStationId", null);
__decorate([
    (0, common_1.Get)('/stations/:stationId/:cityId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('stationId')),
    __param(1, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], FuelController.prototype, "getFuelsByStationIdAndCityId", null);
__decorate([
    (0, common_1.Get)('/cities/:cityId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('cityId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], FuelController.prototype, "getFuelsByCityId", null);
__decorate([
    (0, common_1.Get)('/cities/:cityId/:district'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    __param(0, (0, common_1.Param)('cityId')),
    __param(1, (0, common_1.Param)('district')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", Promise)
], FuelController.prototype, "getFuelsByCityAndDistrict", null);
__decorate([
    (0, common_1.Get)('/'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], FuelController.prototype, "getFuels", null);
exports.FuelController = FuelController = __decorate([
    (0, common_1.Controller)('fuel'),
    __metadata("design:paramtypes", [fuel_service_1.FuelService])
], FuelController);
//# sourceMappingURL=fuel.controller.js.map