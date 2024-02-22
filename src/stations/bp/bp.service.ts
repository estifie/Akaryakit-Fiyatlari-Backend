import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { STATION } from './bp.module';

@Injectable()
export class BpService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const url = STATION.stationUrl + CITY_IDS[id];
    const response = await this.httpService.axiosRef.get(url);

    if (!response.data) {
      return [];
    }

    // If response is not map
    if (!Array.isArray(response.data)) {
      return [];
    }

    const fuelArray: Fuel[] = response.data.map((item: any) => {
      const fuel: Fuel = {
        cityName: item[STATION.cityNameKey],
        districtName: item[STATION.districtNameKey],
        stationName: STATION.displayName,
        gasolinePrice: STATION.hasGasoline
          ? parseFloat(item[STATION.gasolineKey])
          : null,
        dieselPrice: STATION.hasDiesel
          ? parseFloat(item[STATION.dieselKey])
          : null,
        lpgPrice: STATION.hasLpg ? parseFloat(item[STATION.lpgKey]) : null,
      };

      return fuel;
    });

    return fuelArray;
  }
}
