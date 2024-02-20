import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CITY_IDS } from 'src/constants';
import { Fuel } from 'src/interfaces/fuel.interface';
import { Station } from 'src/interfaces/station.interface';

const STATION: Station = {
  displayName: 'Opet',
  id: 2,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: false,
  stationUrl:
    'https://api.opet.com.tr/api/fuelprices/prices?ProvinceCode={ID}&IncludeAllProducts=true',
  cityNameKey: null,
  districtNameKey: 'districtName',
  gasolineKey: 'A100',
  dieselKey: 'A128',
  lpgKey: null,
};

@Injectable()
export class OpetService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const url = STATION.stationUrl.replace('{ID}', String(id));
    const response = await this.httpService.axiosRef.get(url);

    // The response is an array so create array of Fuel objects
    const fuelArray: Fuel[] = response.data.map((item: any) => {
      const prices = item.prices;
      const fuel: Fuel = {
        cityName: CITY_IDS[id],
        districtName: item[STATION.districtNameKey],
        stationName: STATION.displayName,
        gasolinePrice: STATION.hasGasoline
          ? prices.find(
              (price: any) => price.productCode === STATION.gasolineKey,
            ).amount
          : null,
        dieselPrice: STATION.hasDiesel
          ? prices.find((price: any) => price.productCode === STATION.dieselKey)
              .amount
          : null,
        lpgPrice: STATION.hasLpg
          ? prices.find((price: any) => price.productCode === STATION.lpgKey)
              .amount
          : null,
      };

      return fuel;
    });

    return fuelArray;
  }
}
