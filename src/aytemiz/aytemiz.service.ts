import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { Station } from 'src/common/interfaces/station.interface';

const STATION: Station = {
  displayName: 'Aytemiz',
  id: 1,
  hasDiesel: true,
  hasGasoline: true,
  hasLpg: false,
  stationUrl:
    'https://www.aytemiz.com.tr/akaryakit-fiyatlari/benzin-fiyatlari?city=',
  cityNameKey: 'City',
  districtNameKey: 0,
  gasolineKey: 1,
  dieselKey: 2,
  lpgKey: null,
};

@Injectable()
export class AytemizService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const fuelArray: Fuel[] = [];
    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    const formattedCityName =
      CITY_IDS[id].charAt(0).toUpperCase() +
      CITY_IDS[id].slice(1).toLowerCase();

    await page.goto(STATION.stationUrl + formattedCityName);
    const content = await page.content();
    await browser.close();

    const $ = cheerio.load(content);

    // Benzin & Motorin
    const fuelTableRows = $(
      'form#form1 section.page-content div.price-table-responsive table#fuel-price-table tbody tr',
    );

    fuelTableRows.each((index, element) => {
      const cells = $(element).find('td');

      const districtName = $(cells[STATION.districtNameKey])
        .find('div')
        .text()
        .trim();
      const gasolinePrice = STATION.hasGasoline
        ? $(cells[STATION.gasolineKey]).text().trim()
        : null;
      const dieselPrice = STATION.hasDiesel
        ? $(cells[STATION.dieselKey]).text().trim()
        : null;
      const lpgPrice = STATION.hasLpg
        ? $(cells[STATION.lpgKey]).text().trim()
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
