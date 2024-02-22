import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { PrismaService } from 'prisma/prisma.service';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { STATION } from './kadoil.module';
import { KadoilService } from './kadoil.service';

config();

@Injectable()
export class KadoilSchedulerService {
  constructor(
    private readonly kadoilService: KadoilService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  private readonly logger = new Logger(KadoilSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    this.logger.debug('Updating Kadoil prices');

    // Get the station
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

    const fuels: Fuel[] = await this.kadoilService.getAllPrices(keysAsNumbers);

    if (!fuels || fuels.length === 0) {
      return;
    }

    for (const item of fuels) {
      // We have cityName and we need to get The cityId from CITY_IDS
      const cityId = parseInt(
        Object.keys(CITY_IDS).find(
          (key) => CITY_IDS[parseInt(key)] === item.cityName,
        ),
      );

      const fuelInDb = await this.prismaService.fuel.findFirst({
        where: {
          stationId: station.id,
          cityId: cityId,
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
            cityId: cityId,
            districtName: item.districtName,
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
