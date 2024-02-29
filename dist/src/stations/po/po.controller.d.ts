import { Fuel } from '../../common/interfaces/fuel.interface';
import { PoService } from './po.service';
export declare class PoController {
    private readonly poService;
    constructor(poService: PoService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
