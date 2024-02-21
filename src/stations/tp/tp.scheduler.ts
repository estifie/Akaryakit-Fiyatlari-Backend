import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Cron } from '@nestjs/schedule';
import { config } from 'dotenv';
import { TpService } from './tp.service';
config();

@Injectable()
export class TpSchedulerService {
  constructor(
    private readonly tpService: TpService,
    private readonly configService: ConfigService,
  ) {}

  private readonly logger = new Logger(TpSchedulerService.name);

  @Cron(process.env.CRON_UPDATE_INTERVAL)
  async handleCron() {
    console.log(await this.tpService.getPrice(1));

    this.logger.debug('Called when the current second is 45');
  }
}
