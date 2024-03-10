import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import { PrismaService } from '../../../prisma/prisma.service';
import { CITY_IDS } from '../../common/constants/constants';
import { getDistrict } from '../../common/constants/districts';
import { Fuel } from '../../common/interfaces/fuel.interface';
import { StationService } from '../../common/interfaces/station-strategy.interface';
import { parseTextOrNumber } from '../../common/utils/utils';

const stationName = 'TP';

@Injectable()
export class TpService implements StationService {
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

    const fuelArray: Fuel[] = [];

    const cityName = CITY_IDS[id]
      .toLocaleLowerCase('tr-TR')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .trim();

    const response = await this.httpService.axiosRef.get(
      station.url.replace('{CITY_NAME}', cityName),
    );

    if (!response.data) {
      return [];
    }

    const $ = cheerio.load(response.data);

    const fuelTableRows = $(station.parseText);

    const districtNameKey = parseTextOrNumber(station.districtNameKey);
    const gasolineKey = parseTextOrNumber(station.gasolineKey);
    const dieselKey = parseTextOrNumber(station.dieselKey);
    const lpgKey = parseTextOrNumber(station.lpgKey);

    fuelTableRows.each((index, element) => {
      const cells = $(element).find('td');

      const districtName = $(cells[districtNameKey]).text().trim();

      const normalisedDistrictName = getDistrict(id, districtName);

      if (!normalisedDistrictName) return;

      const gasolinePrice = station.hasGasoline
        ? $(cells[gasolineKey]).text().trim().replace(',', '.')
        : null;
      const dieselPrice = station.hasDiesel
        ? $(cells[dieselKey]).text().trim().replace(',', '.')
        : null;
      const lpgPrice = station.hasLpg
        ? $(cells[lpgKey]).text().trim().replace(',', '.')
        : null;

      const fuel: Fuel = {
        cityName: CITY_IDS[id],
        districtName: normalisedDistrictName,
        stationName: station.displayName,
        gasolinePrice: gasolinePrice ? parseFloat(gasolinePrice) : null,
        dieselPrice: dieselPrice ? parseFloat(dieselPrice) : null,
        lpgPrice: lpgPrice ? parseFloat(lpgPrice) : null,
      };

      fuelArray.push(fuel);
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
