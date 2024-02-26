import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { CITY_IDS, CITY_IDS_TE } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { STATION } from './te.module';

@Injectable()
export class TeService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    if (!CITY_IDS_TE[id]) {
      return [];
    }

    const cityId = id === 34 || id === 934 ? CITY_IDS_TE[34] : CITY_IDS_TE[id];

    const url = STATION.stationUrl.replace('{CITY_ID}', String(cityId));
    const response = await this.httpService.axiosRef.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    const fuelArray: Fuel[] = response.data.map((item: any) => {
      const fuel: Fuel = {
        cityName: CITY_IDS[CITY_IDS_TE[id]],
        districtName: item[STATION.districtNameKey],
        stationName: STATION.displayName,
        gasolinePrice: STATION.hasGasoline ? item[STATION.gasolineKey] : null,
        dieselPrice: STATION.hasDiesel ? item[STATION.dieselKey] : null,
        lpgPrice: STATION.hasLpg ? item[STATION.lpgKey] : null,
      };

      return fuel;
    });

    return fuelArray;
  }
}
