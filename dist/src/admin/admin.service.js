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
exports.AdminService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let AdminService = class AdminService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async createStation(stationCreateDto) {
        const station = this.prismaService.station.create({
            data: {
                displayName: stationCreateDto.displayName,
                active: true,
                fuels: {},
            },
        });
        if (!station) {
            throw new common_1.HttpException('Error creating station', 500);
        }
        return station;
    }
    async setStationStatus(stationId, stationSetStatusDto) {
        if (!stationId) {
            throw new common_1.HttpException('Station not found', 404);
        }
        const station = this.prismaService.station.update({
            where: {
                id: stationId,
            },
            data: {
                active: stationSetStatusDto.status,
            },
        });
        if (!station) {
            throw new common_1.HttpException('Error updating station status', 500);
        }
        return station;
    }
    async removeStation(stationId) {
        if (!stationId) {
            throw new common_1.HttpException('Station not found', 404);
        }
        const station = await this.prismaService.station.delete({
            where: {
                id: stationId,
            },
        });
        await this.prismaService.fuel.deleteMany({
            where: {
                stationId: stationId,
            },
        });
        if (!station) {
            throw new common_1.HttpException('Error removing station', 500);
        }
        return {
            message: 'Station removed',
        };
    }
    async getStations() {
        return this.prismaService.station.findMany();
    }
    async getStation(stationId) {
        if (!stationId) {
            throw new common_1.HttpException('Station not found', 404);
        }
        return this.prismaService.station.findUnique({
            where: {
                id: stationId,
            },
        });
    }
    async addFuelToStation(stationId, stationAddFuelDto) {
        const fuel = this.prismaService.fuel.create({
            data: {
                cityId: stationAddFuelDto.cityId,
                districtName: stationAddFuelDto.districtName,
                gasolinePrice: stationAddFuelDto.gasolinePrice,
                dieselPrice: stationAddFuelDto.dieselPrice,
                lpgPrice: stationAddFuelDto.lpgPrice,
                station: {
                    connect: {
                        id: stationId,
                    },
                },
            },
        });
        if (!fuel) {
            throw new common_1.HttpException('Error adding fuel to station', 500);
        }
        return fuel;
    }
};
exports.AdminService = AdminService;
exports.AdminService = AdminService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AdminService);
//# sourceMappingURL=admin.service.js.map