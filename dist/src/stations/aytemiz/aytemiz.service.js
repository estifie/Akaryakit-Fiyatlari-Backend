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
exports.AytemizService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const cheerio = require("cheerio");
const puppeteer = require("puppeteer");
const prisma_service_1 = require("../../../prisma/prisma.service");
const constants_1 = require("../../common/constants/constants");
const districts_1 = require("../../common/constants/districts");
const aytemiz_module_1 = require("./aytemiz.module");
let AytemizService = class AytemizService {
    constructor(httpService, prismaService) {
        this.httpService = httpService;
        this.prismaService = prismaService;
    }
    async getPrice(id) {
        const fuelArray = [];
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();
        const cityName = constants_1.CITY_IDS[id]
            .toLocaleLowerCase('tr-TR')
            .replace(/ç/g, 'c')
            .replace(/ğ/g, 'g')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ş/g, 's')
            .replace(/ü/g, 'u')
            .trim();
        const formattedCityName = cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();
        await page.goto(aytemiz_module_1.STATION.stationUrl + formattedCityName);
        const content = await page.content();
        await browser.close();
        const $ = cheerio.load(content);
        const fuelTableRows = $('form#form1 section.page-content div.price-table-responsive table#fuel-price-table tbody tr');
        fuelTableRows.each((index, element) => {
            const cells = $(element).find('td');
            const districtName = $(cells[aytemiz_module_1.STATION.districtNameKey])
                .find('div')
                .text()
                .trim();
            const normalisedDistrictName = (0, districts_1.getDistrict)(id, districtName);
            if (!normalisedDistrictName)
                return;
            const gasolinePrice = aytemiz_module_1.STATION.hasGasoline
                ? $(cells[aytemiz_module_1.STATION.gasolineKey]).text().replace(',', '.').trim()
                : null;
            const dieselPrice = aytemiz_module_1.STATION.hasDiesel
                ? $(cells[aytemiz_module_1.STATION.dieselKey]).text().replace(',', '.').trim()
                : null;
            const lpgPrice = aytemiz_module_1.STATION.hasLpg
                ? $(cells[aytemiz_module_1.STATION.lpgKey]).text().replace(',', '.').trim()
                : null;
            const fuel = {
                cityName: constants_1.CITY_IDS[id],
                districtName: normalisedDistrictName,
                stationName: aytemiz_module_1.STATION.displayName,
                gasolinePrice: gasolinePrice ? parseFloat(gasolinePrice) : null,
                dieselPrice: dieselPrice ? parseFloat(dieselPrice) : null,
                lpgPrice: lpgPrice ? parseFloat(lpgPrice) : null,
            };
            fuelArray.push(fuel);
        });
        return fuelArray;
    }
    async migrate() {
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
exports.AytemizService = AytemizService;
exports.AytemizService = AytemizService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService,
        prisma_service_1.PrismaService])
], AytemizService);
//# sourceMappingURL=aytemiz.service.js.map