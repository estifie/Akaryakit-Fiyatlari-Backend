import { PrismaService } from '../../prisma/prisma.service';
export declare class StationsService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getAllStations(): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: {
            id: number;
            displayName: string;
            active: boolean;
        }[];
        message: any;
    }>;
}
