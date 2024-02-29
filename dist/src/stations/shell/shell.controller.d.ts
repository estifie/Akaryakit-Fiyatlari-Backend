import { Fuel } from '../../common/interfaces/fuel.interface';
import { ShellService } from './shell.service';
export declare class ShellController {
    private readonly shellService;
    constructor(shellService: ShellService);
    getPrice(id: number): Promise<Fuel[]>;
}
