import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { TeService } from './te.service';
config();

@Injectable()
export class TeSchedulerService {
  constructor(
    private readonly teService: TeService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(TeSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  handleCron() {
    console.log(this.teService.getPrice(1));

    this.logger.debug('Called when the current second is 45');
  }
}
