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
import { AlpetService } from './alpet.service';

@Controller('/')
export class AlpetController {
  constructor(private readonly alpetService: AlpetService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  async migrate(): Promise<void> {
    return await this.alpetService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return await this.alpetService.getPrice(id);
  }
}
