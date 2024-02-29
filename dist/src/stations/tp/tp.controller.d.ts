import { Fuel } from '../../common/interfaces/fuel.interface';
import { TpService } from './tp.service';
export declare class TpController {
    private readonly tpService;
    constructor(tpService: TpService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
