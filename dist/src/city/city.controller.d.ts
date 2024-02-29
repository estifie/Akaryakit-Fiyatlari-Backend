import { CityService } from './city.service';
export declare class CityController {
    private readonly cityService;
    constructor(cityService: CityService);
    getAllDistricts(): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: {};
        message: any;
    }>;
    getDisctrictsOfCity(cityId: number): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: any[];
        message: any;
    }>;
}
