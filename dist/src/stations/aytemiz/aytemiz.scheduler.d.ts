import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { AytemizService } from './aytemiz.service';
export declare class AytemizSchedulerService {
    private readonly aytemizService;
    private readonly configService;
    private readonly prismaService;
    constructor(aytemizService: AytemizService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    interval: string;
    handleCron(): Promise<void>;
}
