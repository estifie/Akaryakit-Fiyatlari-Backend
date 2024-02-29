import { Fuel } from '../../common/interfaces/fuel.interface';
import { TeService } from './te.service';
export declare class TeController {
    private readonly teService;
    constructor(teService: TeService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
