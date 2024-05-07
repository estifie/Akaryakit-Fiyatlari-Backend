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
  async migrate(): Promise<void> {
    return await this.teService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return await this.teService.getPrice(id);
  }
}
