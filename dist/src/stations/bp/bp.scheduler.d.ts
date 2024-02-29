import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { BpService } from './bp.service';
export declare class BpSchedulerService {
    private readonly bpService;
    private readonly configService;
    private readonly prismaService;
    constructor(bpService: BpService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    handleCron(): Promise<void>;
}
