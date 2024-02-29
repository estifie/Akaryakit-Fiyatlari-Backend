import { Fuel } from '../../common/interfaces/fuel.interface';
import { AytemizService } from './aytemiz.service';
export declare class AytemizController {
    private readonly aytemizService;
    constructor(aytemizService: AytemizService);
    migrate(): Promise<void>;
    getPrice(id: number): Promise<Fuel[]>;
}
