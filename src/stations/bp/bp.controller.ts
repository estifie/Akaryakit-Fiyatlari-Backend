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
import { BpService } from './bp.service';

@Controller('/')
export class BpController {
  constructor(private readonly bpService: BpService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.bpService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.bpService.getPrice(id);
  }
}
