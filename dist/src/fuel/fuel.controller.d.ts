import { FuelService } from './fuel.service';
export declare class FuelController {
    private readonly fuelService;
    constructor(fuelService: FuelService);
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
    getFuelsByCityAndDistrict(cityId: number, district: string): Promise<{
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
    getFuels(): Promise<{
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
