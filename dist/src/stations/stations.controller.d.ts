import { StationsService } from './stations.service';
export declare class StationsController {
    private readonly stationsService;
    constructor(stationsService: StationsService);
    getStations(): Promise<{
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
