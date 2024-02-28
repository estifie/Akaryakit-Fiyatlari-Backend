import {
  Controller,
  Get,
  Param,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoleGuard } from 'src/auth/guards/role.guard';
import { Fuel } from 'src/common/interfaces/fuel.interface';
import { PoService } from './po.service';

@Controller('/')
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.poService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.poService.getPrice(id);
  }
}
