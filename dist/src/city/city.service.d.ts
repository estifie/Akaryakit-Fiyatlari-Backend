export declare class CityService {
    getDisctrictsOfCity(cityId: number): {
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: any[];
        message: any;
    };
    getAllDistricts(): Promise<{
        status: string;
        message: string;
        data: any;
    } | {
        status: string;
        data: {};
        message: any;
    }>;
}
