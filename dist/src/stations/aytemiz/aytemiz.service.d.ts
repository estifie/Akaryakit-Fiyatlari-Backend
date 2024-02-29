import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../../prisma/prisma.service';
import { Fuel } from '../../common/interfaces/fuel.interface';
export declare class AytemizService {
    private readonly httpService;
    private readonly prismaService;
    constructor(httpService: HttpService, prismaService: PrismaService);
    getPrice(id: number): Promise<Fuel[]>;
    migrate(): Promise<void>;
}
