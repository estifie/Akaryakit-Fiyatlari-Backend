import { Fuel } from '../../common/interfaces/fuel.interface';
import { KadoilService } from './kadoil.service';
export declare class KadoilController {
    private readonly kadoilService;
    constructor(kadoilService: KadoilService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
