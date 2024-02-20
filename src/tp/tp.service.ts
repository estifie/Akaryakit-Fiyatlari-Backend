import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { CITY_IDS } from 'src/constants';
import { Fuel } from 'src/interfaces/fuel.interface';
import { Station } from 'src/interfaces/station.interface';

const STATION: Station = {
  displayName: 'Petrol Ofisi',
  id: 4,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl: 'https://www.tppd.com.tr/{CITY_NAME}-akaryakit-fiyatlari',
  cityNameKey: null,
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 4,
  lpgKey: 8,
};

@Injectable()
export class TpService {
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
      'body div#page div.wrapper div.contentwrp div.container section#results div.responsivetable table.cf tbody tr',
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
