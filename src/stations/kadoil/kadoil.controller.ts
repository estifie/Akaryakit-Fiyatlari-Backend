import {
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleGuard } from '../../auth/guards/role.guard';
import { Fuel } from '../../common/interfaces/fuel.interface';
import { KadoilService } from './kadoil.service';

@Controller('/')
export class KadoilController {
  constructor(private readonly kadoilService: KadoilService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.kadoilService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.kadoilService.getPrice(id);
  }
}
