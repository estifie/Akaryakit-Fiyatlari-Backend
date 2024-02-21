import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import * as https from 'https';
import { CITY_IDS, CITY_IDS_TE } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { STATION } from './te.module';

@Injectable()
export class TeService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<Fuel[]> {
    const url = STATION.stationUrl.replace(
      '{CITY_ID}',
      String(CITY_IDS_TE[id]),
    );
    const response = await this.httpService.axiosRef.get(url, {
      httpsAgent: new https.Agent({
        rejectUnauthorized: false,
      }),
    });

    // The response is an array so create array of Fuel objects
    const fuelArray: Fuel[] = response.data.map((item: any) => {
      const fuel: Fuel = {
        cityName: CITY_IDS[CITY_IDS_TE[id]],
        districtName: item[STATION.districtNameKey],
        stationName: STATION.displayName,
        gasolinePrice: STATION.hasGasoline ? item[STATION.gasolineKey] : null,
        dieselPrice: STATION.hasDiesel ? item[STATION.dieselKey] : null,
        lpgPrice: STATION.hasLpg ? item[STATION.lpgKey] : null,
      };

      return fuel;
    });

    return fuelArray;
    // const browser = await puppeteer.launch();
    // const page = await browser.newPage();

    // await page.goto(
    //   STATION.stationUrl.replace('{CITY_ID}', String(CITY_IDS_TE[id])),
    // );
    // const content = await page.content();
    // await browser.close();

    // const $ = cheerio.load(content);

    // const fuelTableRows = $(
    //   'body table tbody tr td table tbody tr td table tbody tr td table tbody tr td table tnody tr td table tbody tr',
    // );

    // fuelTableRows.each((index, element) => {
    //   const cells = $(element).find('td');

    //   const districtName = $(cells[STATION.districtNameKey]).text().trim();
    //   const gasolinePrice = STATION.hasGasoline
    //     ? $(cells[STATION.gasolineKey]).text().trim().replace(',', '.')
    //     : null;
    //   const dieselPrice = STATION.hasDiesel
    //     ? $(cells[STATION.dieselKey]).text().trim().replace(',', '.')
    //     : null;
    //   const lpgPrice = STATION.hasLpg
    //     ? $(cells[STATION.lpgKey]).text().trim().replace(',', '.')
    //     : null;

    //   const fuel: Fuel = {
    //     cityName: CITY_IDS[id],
    //     districtName: districtName,
    //     stationName: STATION.displayName,
    //     gasolinePrice: gasolinePrice ? parseFloat(gasolinePrice) : null,
    //     dieselPrice: dieselPrice ? parseFloat(dieselPrice) : null,
    //     lpgPrice: lpgPrice ? parseFloat(lpgPrice) : null,
    //   };

    //   fuelArray.push(fuel);
    // });

    // return fuelArray;
  }
}
