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
import { OpetService } from './opet.service';

@Controller('/')
export class OpetController {
  constructor(private readonly opetService: OpetService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.opetService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.opetService.getPrice(id);
  }
}
