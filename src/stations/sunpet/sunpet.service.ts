import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { Station } from 'src/common/interfaces/station.interface';

const STATION: Station = {
  displayName: 'Sunpet',
  id: 5,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: false,
  stationUrl: 'https://www.sunpettr.com.tr/yakit-fiyatlari-{CITY_NAME}',
  cityNameKey: null,
  districtNameKey: 0,
  gasolineKey: 2,
  dieselKey: 3,
  lpgKey: null,
};

@Injectable()
export class SunpetService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const fuelArray: Fuel[] = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const cityName =
      id === 934
        ? 'istanbul-anadolu'
        : id === 34
          ? 'istanbul-avrupa'
          : CITY_IDS[id]
              .toLocaleLowerCase('tr-TR')
              .replace('ç', 'c')
              .replace('ğ', 'g')
              .replace('ı', 'i')
              .replace('ö', 'o')
              .replace('ş', 's')
              .replace('ü', 'u')
              .trim();

    await page.goto(STATION.stationUrl.replace('{CITY_NAME}', cityName));
    const content = await page.content();
    await browser.close();

    const $ = cheerio.load(content);

    const fuelTableRows = $(
      'body main div#fuel-prices-page section.fuel-prices-table-section div.container div.primary-table-wrapper table.primary-table tbody tr',
    );

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

        const cityName =
          id === 934
            ? 'istanbul-anadolu'
            : id === 34
              ? 'istanbul-avrupa'
              : CITY_IDS[id]
                  .toLocaleLowerCase('tr-TR')
                  .replace('ç', 'c')
                  .replace('ğ', 'g')
                  .replace('ı', 'i')
                  .replace('ö', 'o')
                  .replace('ş', 's')
                  .replace('ü', 'u')
                  .trim();

        await page.goto(STATION.stationUrl.replace('{CITY_NAME}', cityName));
        const content = await page.content();

        const $ = cheerio.load(content);

        const fuelTableRows = $(
          'body main div#fuel-prices-page section.fuel-prices-table-section div.container div.primary-table-wrapper table.primary-table tbody tr',
        );

        const fuelArray: Fuel[] = [];
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

        batchFuelArray.push(fuelArray);
      }),
    );

    await browser.close();

    return batchFuelArray;
  }
}