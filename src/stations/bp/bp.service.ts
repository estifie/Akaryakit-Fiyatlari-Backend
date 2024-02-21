import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { Station } from 'src/common/interfaces/station.interface';

const STATION: Station = {
  displayName: 'BP',
  id: 0,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl: 'https://www.bp.com/bp-tr-pump-prices/api/PumpPrices?strCity=',
  cityNameKey: 'City',
  districtNameKey: 'District',
  gasolineKey: 'Benzin',
  dieselKey: 'Motorin',
  lpgKey: 'LpgPrice',
};

@Injectable()
export class BpService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const url = STATION.stationUrl + CITY_IDS[id];
    const response = await this.httpService.axiosRef.get(url);

    const fuelArray: Fuel[] = response.data.map((item: any) => {
      const fuel: Fuel = {
        cityName: item[STATION.cityNameKey],
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

  async getPricesBatch(ids: number[], interval: number): Promise<Fuel[][]> {
    const batchFuelArray: Fuel[][] = [];

    await Promise.all(
      ids.map(async (id) => {
        interval !== 0
          ? await new Promise((resolve) => setTimeout(resolve, interval))
          : null;

        batchFuelArray.push(await this.getPrice(id));
      }),
    );

    return batchFuelArray;
  }
}
