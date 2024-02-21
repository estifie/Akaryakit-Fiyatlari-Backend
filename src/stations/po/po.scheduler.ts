import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { PoService } from './po.service';
config();

@Injectable()
export class PoSchedulerService {
  constructor(
    private readonly poService: PoService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(PoSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    console.log(await this.poService.getPrice(1));

    this.logger.debug('Called when the current second is 45');
  }
}
