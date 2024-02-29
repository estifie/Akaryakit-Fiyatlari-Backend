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
var BpSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.BpSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const dotenv_1 = require("dotenv");
const prisma_service_1 = require("../../../prisma/prisma.service");
const constants_1 = require("../../common/constants/constants");
const bp_module_1 = require("./bp.module");
const bp_service_1 = require("./bp.service");
(0, dotenv_1.config)();
let BpSchedulerService = BpSchedulerService_1 = class BpSchedulerService {
    constructor(bpService, configService, prismaService) {
        this.bpService = bpService;
        this.configService = configService;
        this.prismaService = prismaService;
        this.logger = new common_1.Logger(BpSchedulerService_1.name);
    }
    async handleCron() {
        this.logger.debug('Updating BP prices');
        const station = await this.prismaService.station.findUnique({
            where: {
                displayName: bp_module_1.STATION.displayName,
            },
        });
        if (!station) {
            return;
        }
        const keysArray = Object.keys(constants_1.CITY_IDS);
        const keysAsNumbers = keysArray.map(Number);
        for (const key of keysAsNumbers) {
            await new Promise((resolve) => setTimeout(resolve, 3000));
            this.logger.debug(`Checking ${key}`);
            const fuels = await this.bpService.getPrice(key);
            this.logger.debug(fuels);
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
exports.BpSchedulerService = BpSchedulerService;
__decorate([
    (0, schedule_1.Cron)(process.env.BP_CRON_UPDATE_INTERVAL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], BpSchedulerService.prototype, "handleCron", null);
exports.BpSchedulerService = BpSchedulerService = BpSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [bp_service_1.BpService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], BpSchedulerService);
//# sourceMappingURL=bp.scheduler.js.map