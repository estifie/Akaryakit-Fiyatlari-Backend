import { PrismaService } from '../../prisma/prisma.service';
export declare class FuelService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    getFuelsByStationId(stationId: number): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: {
            id: number;
            cityId: number;
            districtName: string;
            gasolinePrice: number;
            dieselPrice: number;
            lpgPrice: number;
            stationId: number;
        }[];
        message: any;
    }>;
    getFuelsByStationIdAndCityId(stationId: number, cityId: number): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: {
            id: number;
            cityId: number;
            districtName: string;
            gasolinePrice: number;
            dieselPrice: number;
            lpgPrice: number;
            stationId: number;
        }[];
        message: any;
    }>;
    getFuelsByCityId(cityId: number): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: {
            id: number;
            cityId: number;
            districtName: string;
            gasolinePrice: number;
            dieselPrice: number;
            lpgPrice: number;
            stationId: number;
        }[];
        message: any;
    }>;
    getFuelsByCityAndDistrict(cityId: number, district: any): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: {
            id: number;
            cityId: number;
            districtName: string;
            gasolinePrice: number;
            dieselPrice: number;
            lpgPrice: number;
            stationId: number;
        }[];
        message: any;
    }>;
    getAllFuels(): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: import(".prisma/client").Prisma.PrismaPromise<{
            id: number;
            cityId: number;
            districtName: string;
            gasolinePrice: number;
            dieselPrice: number;
            lpgPrice: number;
            stationId: number;
        }[]>;
        message: any;
    }>;
}
