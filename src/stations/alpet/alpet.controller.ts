import { Controller } from '@nestjs/common';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { AlpetService } from './alpet.service';

@Controller('alpet')
export class AlpetController {
  constructor(private readonly alpetService: AlpetService) {}

  getPrice(id: number): Promise<Fuel[]> {
    return this.alpetService.getPrice(id);
  }
}
