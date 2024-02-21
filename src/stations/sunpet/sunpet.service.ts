import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { STATION } from './sunpet.module';

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
              .replace(/ç/g, 'c')
              .replace(/ğ/g, 'g')
              .replace(/ı/g, 'i')
              .replace(/ö/g, 'o')
              .replace(/ş/g, 's')
              .replace(/ü/g, 'u')
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
}
