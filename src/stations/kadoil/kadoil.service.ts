import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { STATION } from './kadoil.module';

@Injectable()
export class KadoilService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const fuelArray: Fuel[] = [];

    const cityName =
      id === 934 || id === 34
        ? 'istanbul'
        : CITY_IDS[id]
            .toLocaleLowerCase('tr-TR')
            .replace(/ç/g, 'c')
            .replace(/ğ/g, 'g')
            .replace(/ı/g, 'i')
            .replace(/ö/g, 'o')
            .replace(/ş/g, 's')
            .replace(/ü/g, 'u')
            .trim();

    const response = await this.httpService.axiosRef.get(STATION.stationUrl, {
      params: {
        date: new Date().toISOString().split('T')[0],
        province: cityName,
      },
    });

    if (!response.data) {
      return [];
    }

    const $ = cheerio.load(response.data);

    const fuelTableRows = $('div table tr');

    fuelTableRows.each((index, element) => {
      const cells = $(element).find('td');

      const districtName = $(cells[STATION.districtNameKey]).text().trim();
      const gasolinePrice = STATION.hasGasoline
        ? $(cells[STATION.gasolineKey]).text().trim().replace(',', '.')
        : null;
      const dieselPrice = STATION.hasDiesel
        ? $(cells[STATION.dieselKey]).text().trim().replace(',', '.')
        : null;
      const lpgPrice = STATION.hasLpg
        ? $(cells[STATION.lpgKey]).text().trim().replace(',', '.')
        : null;

      const fuel: Fuel = {
        cityName: CITY_IDS[id],
        districtName: districtName,
        stationName: STATION.displayName,
        gasolinePrice: gasolinePrice ? parseFloat(gasolinePrice) : null,
        dieselPrice: dieselPrice ? parseFloat(dieselPrice) : null,
        lpgPrice: lpgPrice ? parseFloat(lpgPrice) : null,
      };

      fuelArray.push(fuel);
    });

    console.log(fuelArray);

    return fuelArray;
  }
}
