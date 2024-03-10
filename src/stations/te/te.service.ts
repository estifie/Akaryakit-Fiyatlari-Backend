import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { PrismaService } from '../../../prisma/prisma.service';
import { CITY_IDS, CITY_IDS_TE } from '../../common/constants/constants';
import { getDistrict } from '../../common/constants/districts';
import { Fuel } from '../../common/interfaces/fuel.interface';
import { StationService } from '../../common/interfaces/station-strategy.interface';
import { parseTextOrNumber } from '../../common/utils/utils';

const stationName = 'Total Energies';

@Injectable()
export class TeService implements StationService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const station = await this.prismaService.station.findUnique({
      where: {
        displayName: stationName,
      },
    });

    if (!CITY_IDS_TE[id]) {
      return [];
    }

    const cityId = CITY_IDS_TE[id];

    const url = station.url.replace('{CITY_ID}', String(cityId));
    const response = await this.httpService.axiosRef.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    const districtNameKey = parseTextOrNumber(station.districtNameKey);
    const gasolineKey = parseTextOrNumber(station.gasolineKey);
    const dieselKey = parseTextOrNumber(station.dieselKey);
    const lpgKey = parseTextOrNumber(station.lpgKey);

    const fuelArray: Fuel[] = response.data.map((item: any) => {
      const districtName = item[districtNameKey];

      const normalisedDistrictName = getDistrict(id, districtName);

      if (!normalisedDistrictName) return;

      const fuel: Fuel = {
        cityName: CITY_IDS[id],
        districtName: normalisedDistrictName,
        stationName: station.displayName,
        gasolinePrice: station.hasGasoline ? item[gasolineKey] : null,
        dieselPrice: station.hasDiesel ? item[dieselKey] : null,
        lpgPrice: station.hasLpg ? item[lpgKey] : null,
      };

      return fuel;
    });

    return fuelArray;
  }

  async migrate(): Promise<void> {
    const station = await this.prismaService.station.findUnique({
      where: {
        displayName: stationName,
      },
    });

    if (!station) {
      return;
    }

    const keysArray = Object.keys(CITY_IDS);
    const keysAsNumbers: number[] = keysArray.map(Number);

    for (const key of keysAsNumbers) {
      const fuels = await this.getPrice(key);

      if (!fuels || fuels.length === 0) {
        continue;
      }

      for (const item of fuels) {
        if (!item) continue;

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
        } else {
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
}
