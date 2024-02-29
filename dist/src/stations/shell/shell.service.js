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
exports.ShellService = void 0;
const axios_1 = require("@nestjs/axios");
const common_1 = require("@nestjs/common");
const cheerio = require("cheerio");
let ShellService = class ShellService {
    constructor(httpService) {
        this.httpService = httpService;
    }
    async getPrice(id) {
        const response = await this.httpService.axiosRef.post('https://www.turkiyeshell.com/pompatest/');
        const $ = cheerio.load(response.data);
        const formData = {};
        $('input[type="hidden"]').each((index, element) => {
            const fieldName = $(element).attr('name');
            const fieldValue = $(element).val();
            if (fieldName === undefined) {
                return;
            }
            if (fieldValue === undefined) {
                formData[fieldName] = '';
            }
            else {
                formData[fieldName] = fieldValue;
            }
        });
        formData['cb_all_cb_province_VI'] = '028';
        formData['cb_all$cb_province'] = 'GIRESUN';
        formData['cb_all$cb_province$DDD$L'] = '028';
        formData['_CALLBACKID'] = 'cb_all';
        formData['_CALLBACKPARAM'] =
            'c0:{"Action":"OnProvinceSelect","Params":{"county_code":null,"province_code":"028"}}';
        formData['cb_all$grdPrices$CallbackState'] =
            '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';
        const cookie = response.headers['set-cookie'];
        const postResponse = await this.httpService.axiosRef.post('https://www.turkiyeshell.com/pompatest/', formData, {
            headers: {
                Cookie: cookie,
            },
        });
        const empty = [];
        return empty;
    }
};
exports.ShellService = ShellService;
exports.ShellService = ShellService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [axios_1.HttpService])
], ShellService);
//# sourceMappingURL=shell.service.js.map