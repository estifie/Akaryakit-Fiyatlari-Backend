import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { CITY_IDS } from 'src/common/constants/constants';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { AlpetService } from './alpet.service';

config();

@Injectable()
export class AlpetSchedulerService {
  constructor(
    private readonly alpetService: AlpetService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AlpetSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    const keysArray = Object.keys(CITY_IDS);

    const keysAsNumbers: number[] = keysArray.map(Number);

    const fuelArray: Fuel[][] = await this.alpetService.getPricesBatch(
      keysAsNumbers,
      parseInt(process.env.GET_PRICES_BATCH_INTERVAL),
    );
  }
}
