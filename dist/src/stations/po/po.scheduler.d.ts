import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { PoService } from './po.service';
export declare class PoSchedulerService {
    private readonly poService;
    private readonly configService;
    private readonly prismaService;
    constructor(poService: PoService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    handleCron(): Promise<void>;
}
