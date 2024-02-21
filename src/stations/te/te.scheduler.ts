import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { PrismaService } from 'prisma/prisma.service';
import { CITY_IDS } from 'src/common/constants/constants';
import { STATION } from './te.module';
import { TeService } from './te.service';

config();

@Injectable()
export class TeSchedulerService {
  constructor(
    private readonly teService: TeService,
    private readonly configService: ConfigService,
    private readonly prismaService: PrismaService,
  ) {}

  private readonly logger = new Logger(TeSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    this.logger.debug('Updating Te prices');

    // Get the station
    const station = this.prismaService.station.findUnique({
      where: {
        displayName: STATION.displayName,
      },
    });

    if (!station) {
      return;
    }

    const keysArray = Object.keys(CITY_IDS);
    const keysAsNumbers: number[] = keysArray.map(Number);

    for (const key of keysAsNumbers) {
      const fuels = await this.teService.getPrice(key);

      for (const item of fuels) {
        const fuelInDb = await this.prismaService.fuel.findFirst({
          where: {
            cityId: key,
            districtName: item.districtName,
          },
        });
        if (fuelInDb) {
          this.prismaService.fuel.update({
            where: {
              id: fuelInDb.id,
            },
            data: {
              gasolinePrice: item.gasolinePrice ? item.gasolinePrice : 0,
              dieselPrice: item.dieselPrice ? item.dieselPrice : 0,
              lpgPrice: item.lpgPrice ? item.lpgPrice : 0,
            },
          });
        }
      }
    }
  }
}
