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
import { TpService } from './tp.service';

@Controller('/')
export class TpController {
  constructor(private readonly tpService: TpService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.tpService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.tpService.getPrice(id);
  }
}
