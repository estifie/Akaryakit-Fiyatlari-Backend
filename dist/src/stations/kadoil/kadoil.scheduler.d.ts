import { ConfigService } from '@nestjs/config';
import { PrismaService } from '../../../prisma/prisma.service';
import { KadoilService } from './kadoil.service';
export declare class KadoilSchedulerService {
    private readonly kadoilService;
    private readonly configService;
    private readonly prismaService;
    constructor(kadoilService: KadoilService, configService: ConfigService, prismaService: PrismaService);
    private readonly logger;
    handleCron(): Promise<void>;
}
