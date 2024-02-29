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
var OpetSchedulerService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.OpetSchedulerService = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const schedule_1 = require("@nestjs/schedule");
const dotenv_1 = require("dotenv");
const prisma_service_1 = require("../../../prisma/prisma.service");
const constants_1 = require("../../common/constants/constants");
const opet_module_1 = require("./opet.module");
const opet_service_1 = require("./opet.service");
(0, dotenv_1.config)();
let OpetSchedulerService = OpetSchedulerService_1 = class OpetSchedulerService {
    constructor(opetService, configService, prismaService) {
        this.opetService = opetService;
        this.configService = configService;
        this.prismaService = prismaService;
        this.logger = new common_1.Logger(OpetSchedulerService_1.name);
    }
    async handleCron() {
        this.logger.debug('Updating Opet prices');
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
            await new Promise((resolve) => setTimeout(resolve, 3000));
            const fuels = await this.opetService.getPrice(key);
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
exports.OpetSchedulerService = OpetSchedulerService;
__decorate([
    (0, schedule_1.Cron)(process.env.OPET_CRON_UPDATE_INTERVAL),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OpetSchedulerService.prototype, "handleCron", null);
exports.OpetSchedulerService = OpetSchedulerService = OpetSchedulerService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [opet_service_1.OpetService,
        config_1.ConfigService,
        prisma_service_1.PrismaService])
], OpetSchedulerService);
//# sourceMappingURL=opet.scheduler.js.map