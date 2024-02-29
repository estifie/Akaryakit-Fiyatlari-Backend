import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { SunpetService } from './sunpet.service';
export declare class SunpetSchedulerService {
    private readonly sunpetService;
    private readonly configService;
    private readonly prismaService;
    constructor(sunpetService: SunpetService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    handleCron(): Promise<void>;
}
