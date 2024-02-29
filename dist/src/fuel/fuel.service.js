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
exports.FuelService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let FuelService = class FuelService {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async getFuelsByStationId(stationId) {
        const fuels = await this.prismaService.fuel.findMany({
            where: {
                stationId: stationId,
            },
        });
        if (!fuels) {
            return {
                status: 'error',
                message: 'No fuel found for this station',
                data: null,
            };
        }
        return {
            status: 'success',
            data: fuels,
            message: null,
        };
    }
    async getFuelsByStationIdAndCityId(stationId, cityId) {
        const fuels = await this.prismaService.fuel.findMany({
            where: {
                stationId: stationId,
                cityId: cityId,
            },
        });
        if (!fuels) {
            return {
                status: 'error',
                message: 'No fuel found for this city',
                data: null,
            };
        }
        return {
            status: 'success',
            data: fuels,
            message: null,
        };
    }
    async getFuelsByCityId(cityId) {
        if (cityId === -1)
            cityId = 34;
        const fuels = await this.prismaService.fuel.findMany({
            where: {
                cityId: cityId,
            },
        });
        if (!fuels) {
            return {
                status: 'error',
                message: 'No fuel found for this city',
                data: null,
            };
        }
        return {
            status: 'success',
            data: fuels,
            message: null,
        };
    }
    async getFuelsByCityAndDistrict(cityId, district) {
        const fuels = await this.prismaService.fuel.findMany({
            where: {
                cityId: cityId,
                districtName: district,
            },
        });
        fuels.filter((fuel) => fuel.lpgPrice === 0 &&
            fuel.dieselPrice === 0 &&
            fuel.gasolinePrice === 0);
        if (!fuels) {
            return {
                status: 'error',
                message: 'No fuel found for this city',
                data: null,
            };
        }
        return {
            status: 'success',
            data: fuels,
            message: null,
        };
    }
    async getAllFuels() {
        const fuels = this.prismaService.fuel.findMany();
        if (!fuels) {
            return {
                status: 'error',
                message: 'No fuel found',
                data: null,
            };
        }
        return {
            status: 'success',
            data: fuels,
            message: null,
        };
    }
};
exports.FuelService = FuelService;
exports.FuelService = FuelService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FuelService);
//# sourceMappingURL=fuel.service.js.map