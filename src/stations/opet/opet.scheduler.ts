import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { OpetService } from './opet.service';
config();

@Injectable()
export class OpetSchedulerService {
  constructor(
    private readonly opetService: OpetService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(OpetSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    console.log(await this.opetService.getPrice(1));

    this.logger.debug('Called when the current second is 45');
  }
}
