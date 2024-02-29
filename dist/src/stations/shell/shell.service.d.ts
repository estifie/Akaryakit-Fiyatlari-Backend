import { HttpService } from '@nestjs/axios';
import { Fuel } from '../../common/interfaces/fuel.interface';
export declare class ShellService {
    private readonly httpService;
    constructor(httpService: HttpService);
    getPrice(id: number): Promise<Fuel[]>;
}
