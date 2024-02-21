import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { Station } from 'src/common/interfaces/station.interface';

const STATION: Station = {
  displayName: 'Petrol Ofisi',
  id: 8,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl:
    'https://www.petrolofisi.com.tr/akaryakit-fiyatlari/{CITY_NAME}-akaryakit-fiyatlari',
  cityNameKey: null,
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 3,
  lpgKey: 4,
};

@Injectable()
export class PoService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const fuelArray: Fuel[] = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(STATION.stationUrl.replace('{CITY_NAME}', CITY_IDS[id]));
    const content = await page.content();
    await browser.close();

    const $ = cheerio.load(content);

    const fuelTableRows = $(
      'body section.prices-list.fuel-module div.container div.position-relative div.fuel-items div.d-none table.table-prices tbody tr',
    );

    fuelTableRows.each((index, element) => {
      const cells = $(element).find('td');

      const districtName = $(cells[STATION.districtNameKey]).text().trim();
      const gasolinePrice = STATION.hasGasoline
        ? $(cells[STATION.gasolineKey]).text().trim()
        : null;
      const dieselPrice = STATION.hasDiesel
        ? $(cells[STATION.dieselKey]).text().trim()
        : null;
      const lpgPrice = STATION.hasLpg ? $(cells[4]).text().trim() : null;

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

    return fuelArray;
  }

  async getPricesBatch(ids: number[], interval: number): Promise<Fuel[][]> {
    const batchFuelArray: Fuel[][] = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await Promise.all(
      ids.map(async (id) => {
        interval !== 0
          ? await new Promise((resolve) => setTimeout(resolve, interval))
          : null;

        await page.goto(
          STATION.stationUrl.replace('{CITY_NAME}', CITY_IDS[id]),
        );
        const content = await page.content();
        const $ = cheerio.load(content);

        const fuelTableRows = $(
          'body section.prices-list.fuel-module div.container div.position-relative div.fuel-items div.d-none table.table-prices tbody tr',
        );

        const fuelArray: Fuel[] = [];
        fuelTableRows.each((index, element) => {
          const cells = $(element).find('td');

          const districtName = $(cells[STATION.districtNameKey]).text().trim();
          const gasolinePrice = STATION.hasGasoline
            ? $(cells[STATION.gasolineKey]).text().trim()
            : null;
          const dieselPrice = STATION.hasDiesel
            ? $(cells[STATION.dieselKey]).text().trim()
            : null;
          const lpgPrice = STATION.hasLpg ? $(cells[4]).text().trim() : null;

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

        batchFuelArray.push(fuelArray);
      }),
    );

    await browser.close();

    return batchFuelArray;
  }
}
