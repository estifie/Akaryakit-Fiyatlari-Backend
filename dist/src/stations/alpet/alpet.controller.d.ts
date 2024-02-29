import { Fuel } from '../../common/interfaces/fuel.interface';
import { AlpetService } from './alpet.service';
export declare class AlpetController {
    private readonly alpetService;
    constructor(alpetService: AlpetService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
