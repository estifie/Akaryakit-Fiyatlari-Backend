import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { OpetService } from './opet.service';
export declare class OpetSchedulerService {
    private readonly opetService;
    private readonly configService;
    private readonly prismaService;
    constructor(opetService: OpetService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    handleCron(): Promise<void>;
}
