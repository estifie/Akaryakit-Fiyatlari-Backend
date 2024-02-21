import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { CITY_IDS, CITY_IDS_TE } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { Station } from 'src/common/interfaces/station.interface';

const STATION: Station = {
  displayName: 'Total Energies',
  id: 6,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: true,
  stationUrl: 'http://195.216.232.22/product_price.asp?cityID={CITY_ID}',
  cityNameKey: null,
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 3,
  lpgKey: 8,
};

@Injectable()
export class TeService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const fuelArray: Fuel[] = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.goto(
      STATION.stationUrl.replace('{CITY_ID}', String(CITY_IDS_TE[id])),
    );
    const content = await page.content();
    await browser.close();

    const $ = cheerio.load(content);

    const fuelTableRows = $(
      'body table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tnody tr td table tbody tr',
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
