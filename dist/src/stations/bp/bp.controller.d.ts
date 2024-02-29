import { Fuel } from '../../common/interfaces/fuel.interface';
import { BpService } from './bp.service';
export declare class BpController {
    private readonly bpService;
    constructor(bpService: BpService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
