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
var AytemizSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AytemizSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const dotenv_1 = require("dotenv");
const prisma_service_1 = require("../../../prisma/prisma.service");
const constants_1 = require("../../common/constants/constants");
const aytemiz_module_1 = require("./aytemiz.module");
const aytemiz_service_1 = require("./aytemiz.service");
(0, dotenv_1.config)();
let AytemizSchedulerService = AytemizSchedulerService_1 = class AytemizSchedulerService {
    constructor(aytemizService, configService, prismaService) {
        this.aytemizService = aytemizService;
        this.configService = configService;
        this.prismaService = prismaService;
        this.logger = new common_1.Logger(AytemizSchedulerService_1.name);
        this.interval = this.configService.get('AYTEMIZ_CRON_UPDATE_INTERVAL');
    }
    async handleCron() {
        this.logger.debug('Updating Aytemiz prices');
        const station = await this.prismaService.station.findUnique({
            where: {
                displayName: aytemiz_module_1.STATION.displayName,
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
            const fuels = await this.aytemizService.getPrice(key);
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
                            districtName: item.districtName,
                            stationId: station.id,
                            gasolinePrice: item.gasolinePrice ? item.gasolinePrice : 0,
                            dieselPrice: item.dieselPrice ? item.dieselPrice : 0,
                            lpgPrice: item.lpgPrice ? item.lpgPrice : 0,
                        },
                    });
                }
            }
        }
    }
};
exports.AytemizSchedulerService = AytemizSchedulerService;
__decorate([
    (0, schedule_1.Cron)(process.env.AYTEMIZ_CRON_UPDATE_INTERVAL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], AytemizSchedulerService.prototype, "handleCron", null);
exports.AytemizSchedulerService = AytemizSchedulerService = AytemizSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [aytemiz_service_1.AytemizService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], AytemizSchedulerService);
//# sourceMappingURL=aytemiz.scheduler.js.map