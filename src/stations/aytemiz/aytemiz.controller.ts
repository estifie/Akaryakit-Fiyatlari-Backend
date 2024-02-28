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
import { AytemizService } from './aytemiz.service';

@Controller('/')
export class AytemizController {
  constructor(private readonly aytemizService: AytemizService) {}

  @Get('migrate')
  @UseGuards(RoleGuard)
  migrate(): Promise<void> {
    return this.aytemizService.migrate();
  }

  @Get(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  getPrice(@Param('id') id: number): Promise<Fuel[]> {
    return this.aytemizService.getPrice(id);
  }
}
