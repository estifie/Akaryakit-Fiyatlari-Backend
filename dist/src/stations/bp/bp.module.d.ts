import { Station } from '../../common/interfaces/station.interface';
import { BpService } from './bp.service';
export declare const STATION: Station;
export declare class BpModule {
    private readonly bpService;
    constructor(bpService: BpService);
}
