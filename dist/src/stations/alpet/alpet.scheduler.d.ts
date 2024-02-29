import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { AlpetService } from './alpet.service';
export declare class AlpetSchedulerService {
    private readonly alpetService;
    private readonly configService;
    private readonly prismaService;
    constructor(alpetService: AlpetService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    handleCron(): Promise<void>;
}
