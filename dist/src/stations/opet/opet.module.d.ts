import { Station } from '../../common/interfaces/station.interface';
import { OpetService } from './opet.service';
export declare const STATION: Station;
export declare class OpetModule {
    private readonly opetService;
    constructor(opetService: OpetService);
}
