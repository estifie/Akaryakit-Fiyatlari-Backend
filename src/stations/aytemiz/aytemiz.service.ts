import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as cheerio from 'cheerio';
import * as puppeteer from 'puppeteer';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { STATION } from './aytemiz.module';

@Injectable()
export class AytemizService {
  constructor(private readonly httpService: HttpService) {}

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
