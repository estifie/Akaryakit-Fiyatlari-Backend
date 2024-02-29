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
exports.OpetService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../../prisma/prisma.service");
const constants_1 = require("../../common/constants/constants");
const districts_1 = require("../../common/constants/districts");
const opet_module_1 = require("./opet.module");
let OpetService = class OpetService {
    constructor(httpService, prismaService) {
        this.httpService = httpService;
        this.prismaService = prismaService;
    }
    async getPrice(id) {
        const url = opet_module_1.STATION.stationUrl.replace('{ID}', String(id));
        let responses = [await this.httpService.axiosRef.get(url)];
        if (id === 34) {
            responses = [
                await this.httpService.axiosRef.get(opet_module_1.STATION.stationUrl.replace('{ID}', '34')),
                await this.httpService.axiosRef.get(opet_module_1.STATION.stationUrl.replace('{ID}', '934')),
            ];
        }
        const fuelArray = [];
        responses.forEach((response) => {
            const fuels = response.data.map((item) => {
                const prices = item.prices;
                const districtName = item[opet_module_1.STATION.districtNameKey];
                const normalisedDistrictName = (0, districts_1.getDistrict)(id, districtName);
                if (!normalisedDistrictName)
                    return;
                const fuel = {
                    cityName: constants_1.CITY_IDS[id],
                    districtName: normalisedDistrictName,
                    stationName: opet_module_1.STATION.displayName,
                    gasolinePrice: opet_module_1.STATION.hasGasoline
                        ? parseFloat(prices.find((price) => price.productCode === opet_module_1.STATION.gasolineKey).amount)
                        : null,
                    dieselPrice: opet_module_1.STATION.hasDiesel
                        ? parseFloat(prices.find((price) => price.productCode === opet_module_1.STATION.dieselKey).amount)
                        : null,
                    lpgPrice: opet_module_1.STATION.hasLpg
                        ? parseFloat(prices.find((price) => price.productCode === opet_module_1.STATION.lpgKey).amount)
                        : null,
                };
                return fuel;
            });
            fuelArray.push(...fuels);
        });
        return fuelArray;
    }
    async migrate() {
        const station = await this.prismaService.station.findUnique({
            where: {
                displayName: opet_module_1.STATION.displayName,
            },
        });
        if (!station) {
            return;
        }
        const keysArray = Object.keys(constants_1.CITY_IDS);
        const keysAsNumbers = keysArray.map(Number);
        for (const key of keysAsNumbers) {
            const fuels = await this.getPrice(key);
            if (!fuels || fuels.length === 0) {
                continue;
            }
            for (const item of fuels) {
                if (!item)
                    continue;
                const fuelInDb = await this.prismaService.fuel.findFirst({
                    where: {
                        stationId: station.id,
                        cityId: key,
                        districtName: item.districtName,
                    },
                });
                if (fuelInDb) {
                    await this.prismaService.fuel.update({
                        where: {
                            id: fuelInDb.id,
                        },
                        data: {
                            gasolinePrice: item.gasolinePrice ? item.gasolinePrice : 0,
                            dieselPrice: item.dieselPrice ? item.dieselPrice : 0,
                            lpgPrice: item.lpgPrice ? item.lpgPrice : 0,
                        },
                    });
                }
                else {
                    await this.prismaService.fuel.create({
                        data: {
                            cityId: key,
                            districtName: item.districtName ? item.districtName : '',
                            gasolinePrice: item.gasolinePrice ? item.gasolinePrice : 0,
                            dieselPrice: item.dieselPrice ? item.dieselPrice : 0,
                            lpgPrice: item.lpgPrice ? item.lpgPrice : 0,
                            station: {
                                connect: {
                                    id: station.id,
                                },
                            },
                        },
                    });
                }
            }
        }
    }
};
exports.OpetService = OpetService;
exports.OpetService = OpetService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService])
], OpetService);
//# sourceMappingURL=opet.service.js.map