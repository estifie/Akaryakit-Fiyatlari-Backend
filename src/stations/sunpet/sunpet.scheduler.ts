import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { SunpetService } from './sunpet.service';
config();

@Injectable()
export class SunpetSchedulerService {
  constructor(
    private readonly sunpetService: SunpetService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(SunpetSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    console.log(await this.sunpetService.getPrice(1));

    this.logger.debug('Called when the current second is 45');
  }
}
