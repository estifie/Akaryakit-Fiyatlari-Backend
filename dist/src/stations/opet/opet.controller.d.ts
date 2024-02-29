import { Fuel } from '../../common/interfaces/fuel.interface';
import { OpetService } from './opet.service';
export declare class OpetController {
    private readonly opetService;
    constructor(opetService: OpetService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
