import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { TeService } from './te.service';
export declare class TeSchedulerService {
    private readonly teService;
    private readonly configService;
    private readonly prismaService;
    constructor(teService: TeService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    handleCron(): Promise<void>;
}
