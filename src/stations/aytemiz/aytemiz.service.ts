import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { PrismaService } from '../../../prisma/prisma.service';
import { CITY_IDS } from '../../common/constants/constants';
import { getDistrict } from '../../common/constants/districts';
import { Fuel } from '../../common/interfaces/fuel.interface';
import { STATION } from './aytemiz.module';

@Injectable()
export class AytemizService {
  constructor(
    private readonly httpService: HttpService,
    private readonly prismaService: PrismaService,
  ) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const fuelArray: Fuel[] = [];
    const browser = await puppeteer.launch({
      headless: true,
    });
    const page = await browser.newPage();

    const cityName = CITY_IDS[id]
      .toLocaleLowerCase('tr-TR')
      .replace(/ç/g, 'c')
      .replace(/ğ/g, 'g')
      .replace(/ı/g, 'i')
      .replace(/ö/g, 'o')
      .replace(/ş/g, 's')
      .replace(/ü/g, 'u')
      .trim();

    const formattedCityName =
      cityName.charAt(0).toUpperCase() + cityName.slice(1).toLowerCase();

    await page.goto(STATION.stationUrl + formattedCityName);
    const content = await page.content();
    await browser.close();

    const $ = cheerio.load(content);

    const fuelTableRows = $(
      'form#form1 section.page-content div.price-table-responsive table#fuel-price-table tbody tr',
    );

    fuelTableRows.each((index, element) => {
      const cells = $(element).find('td');

      const districtName = $(cells[STATION.districtNameKey])
        .find('div')
        .text()
        .trim();

      const normalisedDistrictName = getDistrict(id, districtName);

      if (!normalisedDistrictName) return;

      const gasolinePrice = STATION.hasGasoline
        ? $(cells[STATION.gasolineKey]).text().replace(',', '.').trim()
        : null;
      const dieselPrice = STATION.hasDiesel
        ? $(cells[STATION.dieselKey]).text().replace(',', '.').trim()
        : null;
      const lpgPrice = STATION.hasLpg
        ? $(cells[STATION.lpgKey]).text().replace(',', '.').trim()
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

  async migrate(): Promise<void> {
    const station = await this.prismaService.station.findUnique({
      where: {
        displayName: STATION.displayName,
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
