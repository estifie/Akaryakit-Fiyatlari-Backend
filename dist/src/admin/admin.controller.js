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
exports.AdminController = void 0;
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../auth/guards/role.guard");
const admin_service_1 = require("./admin.service");
const station_add_fuel_dto_1 = require("./dto/station-add-fuel.dto");
const station_create_dto_1 = require("./dto/station-create.dto");
const station_set_status_dto_1 = require("./dto/station-set-status.dto");
let AdminController = class AdminController {
    constructor(adminService) {
        this.adminService = adminService;
    }
    async createStation(stationCreateDto) {
        return this.adminService.createStation(stationCreateDto);
    }
    async addFuelToStation(stationId, stationAddFuelDto) {
        return this.adminService.addFuelToStation(stationId, stationAddFuelDto);
    }
    async removeStation(stationId) {
        return this.adminService.removeStation(stationId);
    }
    async getStations() {
        return this.adminService.getStations();
    }
    async getStation(stationId) {
        return this.adminService.getStation(stationId);
    }
    async setStationStatus(stationId, stationSetStatusDto) {
        return this.adminService.setStationStatus(stationId, stationSetStatusDto);
    }
};
exports.AdminController = AdminController;
__decorate([
    (0, common_1.Post)('/stations'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [station_create_dto_1.StationCreateDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "createStation", null);
__decorate([
    (0, common_1.Post)('/stations/:stationId/fuel'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('stationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, station_add_fuel_dto_1.StationAddFuelDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "addFuelToStation", null);
__decorate([
    (0, common_1.Delete)('/stations/:stationId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Query)('stationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "removeStation", null);
__decorate([
    (0, common_1.Get)('/stations'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStations", null);
__decorate([
    (0, common_1.Get)('/stations/:stationId'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('stationId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "getStation", null);
__decorate([
    (0, common_1.Post)('/stations/:stationID/status'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('stationId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, station_set_status_dto_1.StationSetStatusDto]),
    __metadata("design:returntype", Promise)
], AdminController.prototype, "setStationStatus", null);
exports.AdminController = AdminController = __decorate([
    (0, common_1.Controller)('admin'),
    __metadata("design:paramtypes", [admin_service_1.AdminService])
], AdminController);
//# sourceMappingURL=admin.controller.js.map