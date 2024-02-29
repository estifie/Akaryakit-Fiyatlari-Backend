"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CityService = void 0;
const common_1 = require("@nestjs/common");
const districts_1 = require("../common/constants/districts");
let CityService = class CityService {
    getDisctrictsOfCity(cityId) {
        if (cityId === -1)
            cityId = 34;
        const districts = districts_1.DISTRICTS[cityId];
        const uniqueDistricts = [
            ...new Set(Object.values(districts)
                .flatMap((district) => Object.values(district))
                .map((item) => item.toLocaleUpperCase('tr-TR'))),
        ];
        if (!uniqueDistricts) {
            return {
                status: 'error',
                message: 'No district found for this city',
                data: null,
            };
        }
        return {
            status: 'success',
            data: uniqueDistricts,
            message: null,
        };
    }
    async getAllDistricts() {
        const districts = {};
        for (const cityId in districts_1.DISTRICTS) {
            districts[cityId] = this.getDisctrictsOfCity(Number(cityId)).data;
        }
        if (!districts) {
            return {
                status: 'error',
                message: 'No district found for this city',
                data: null,
            };
        }
        return {
            status: 'success',
            data: districts,
            message: null,
        };
    }
};
exports.CityService = CityService;
exports.CityService = CityService = __decorate([
    (0, common_1.Injectable)()
], CityService);
//# sourceMappingURL=city.service.js.map