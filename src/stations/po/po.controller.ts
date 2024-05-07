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
import { PoService } from './po.service';

@Controller('/')
export class PoController {
  constructor(private readonly poService: PoService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  async migrate(): Promise<void> {
    return await this.poService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return await this.poService.getPrice(id);
  }
}
