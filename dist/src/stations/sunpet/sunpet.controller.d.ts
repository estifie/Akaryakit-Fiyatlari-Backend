import { Fuel } from '../../common/interfaces/fuel.interface';
import { SunpetService } from './sunpet.service';
export declare class SunpetController {
    private readonly sunpetService;
    constructor(sunpetService: SunpetService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
