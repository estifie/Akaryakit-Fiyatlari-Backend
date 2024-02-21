import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { Station } from 'src/common/interfaces/station.interface';

const STATION: Station = {
  displayName: 'Kadoil',
  id: 3,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl: 'https://admin.kadoil.com/price-lists/map',
  cityNameKey: null,
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 2,
  lpgKey: 8,
};

@Injectable()
export class KadoilService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const fuelArray: Fuel[] = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(STATION.stationUrl);

    const dropdownSelector =
      'body div.container-fluid div.row div.col-12 form.form-inline div.form-group select.form-control';

    const cityName = id === 934 || id === 34 ? 'istanbul' : CITY_IDS[id];

    const optionValue = cityName
      .toLocaleLowerCase('tr-TR')
      .replace('ç', 'c')
      .replace('ğ', 'g')
      .replace('ı', 'i')
      .replace('ö', 'o')
      .replace('ş', 's')
      .replace('ü', 'u')
      .trim();

    await page.waitForSelector(dropdownSelector);

    await page.select(dropdownSelector, optionValue);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    const content = await page.content();

    await browser.close();

    const $ = cheerio.load(content);

    const fuelTableRows = $(
      'body div.container-fluid div.row div.col-12 div table.table tbody tr',
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
