import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { TpService } from './tp.service';
export declare class TpSchedulerService {
    private readonly tpService;
    private readonly configService;
    private readonly prismaService;
    constructor(tpService: TpService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    handleCron(): Promise<void>;
}
