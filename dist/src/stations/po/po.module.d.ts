import { Station } from '../../common/interfaces/station.interface';
import { PoService } from './po.service';
export declare const STATION: Station;
export declare class PoModule {
    private readonly poService;
    constructor(poService: PoService);
}
