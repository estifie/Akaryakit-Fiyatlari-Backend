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
import { TpService } from './tp.service';

@Controller('/')
export class TpController {
  constructor(private readonly tpService: TpService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  async migrate(): Promise<void> {
    return await this.tpService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return await this.tpService.getPrice(id);
  }
}
