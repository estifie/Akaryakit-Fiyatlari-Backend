import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { KadoilService } from './kadoil.service';
config();

@Injectable()
export class KadoilSchedulerService {
  constructor(
    private readonly kadoilService: KadoilService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(KadoilSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    console.log(await this.kadoilService.getPrice(1));

    this.logger.debug('Called when the current second is 45');
  }
}
