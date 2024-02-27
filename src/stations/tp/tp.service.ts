import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { CITY_IDS } from 'src/common/constants/constants';
import { getDistrict } from 'src/common/constants/districts';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { STATION } from './tp.module';

@Injectable()
export class TpService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const fuelArray: Fuel[] = [];

    const cityName =
      id === 34 || id === 934
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

    const response = await this.httpService.axiosRef.get(
      STATION.stationUrl.replace('{CITY_NAME}', cityName),
    );

    if (!response.data) {
      return [];
    }

    const $ = cheerio.load(response.data);

    const fuelTableRows = $(
      'body div#page div.wrapper div.contentwrp div.container section#results div.responsivetable table.cf tbody tr',
    );

    fuelTableRows.each((index, element) => {
      const cells = $(element).find('td');

      const districtName = $(cells[STATION.districtNameKey]).text().trim();

      const normalisedDistrictName = getDistrict(id, districtName);

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
        districtName: normalisedDistrictName,
        stationName: STATION.displayName,
        gasolinePrice: gasolinePrice ? parseFloat(gasolinePrice) : null,
        dieselPrice: dieselPrice ? parseFloat(dieselPrice) : null,
        lpgPrice: lpgPrice ? parseFloat(lpgPrice) : null,
      };

      fuelArray.push(fuel);
    });

    return fuelArray;
  }
}
