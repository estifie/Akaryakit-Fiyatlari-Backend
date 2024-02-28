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
import { AlpetService } from './alpet.service';

@Controller('/')
export class AlpetController {
  constructor(private readonly alpetService: AlpetService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.alpetService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.alpetService.getPrice(id);
  }
}
