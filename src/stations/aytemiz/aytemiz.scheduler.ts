import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { AytemizService } from './aytemiz.service';
config();

@Injectable()
export class AytemizSchedulerService {
  constructor(
    private readonly aytemizService: AytemizService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(AytemizSchedulerService.name);

  interval = this.configService.get<string>('CRON_UPDATE_INTERVAL');

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    console.log(await this.aytemizService.getPrice(1));

    this.logger.debug('Called when the current second is 45');
  }
}
