import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { BpService } from './bp.service';
config();

@Injectable()
export class BpSchedulerService {
  constructor(
    private readonly bpService: BpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(BpSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    console.log(await this.bpService.getPrice(1));

    this.logger.debug('Called when the current second is 45');
  }
}
