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
import { TeService } from './te.service';

@Controller('/')
export class TeController {
  constructor(private readonly teService: TeService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.teService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.teService.getPrice(id);
  }
}
