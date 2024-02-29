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
import { SunpetService } from './sunpet.service';

@Controller('/')
export class SunpetController {
  constructor(private readonly sunpetService: SunpetService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.sunpetService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.sunpetService.getPrice(id);
  }
}
