import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Fuel, Station } from '@prisma/client';
import { RoleGuard } from '../auth/guards/role.guard';
import { AdminService } from './admin.service';
import { StationAddFuelDto } from './dto/station-add-fuel.dto';
import { StationCreateDto } from './dto/station-create.dto';
import { StationSetStatusDto } from './dto/station-set-status.dto';
import { StationUpdateDto } from './dto/station-update.dto';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('/stations')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async createStation(
    @Body() stationCreateDto: StationCreateDto,
  ): Promise<Station> {
    return this.adminService.createStation(stationCreateDto);
  }

  @Post('/stations/:stationId/fuel')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async addFuelToStation(
    @Param('stationId') stationId: number,
    @Body() stationAddFuelDto: StationAddFuelDto,
  ): Promise<Fuel> {
    return this.adminService.addFuelToStation(stationId, stationAddFuelDto);
  }

  @Delete('/stations/:stationId')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async removeStation(@Query('stationId') stationId: number): Promise<any> {
    return this.adminService.removeStation(stationId);
  }

  @Get('/stations')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async getStations(): Promise<Station[]> {
    return this.adminService.getStations();
  }

  @Get('/stations/:stationId')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async getStation(@Param('stationId') stationId: number): Promise<Station> {
    return this.adminService.getStation(stationId);
  }

  // Edit station PATCH
  @Patch('/stations/:stationId')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async updateStation(
    @Param('stationId') stationId: number,
    @Body() stationUpdateDto: StationUpdateDto,
  ): Promise<Station> {
    return this.adminService.updateStation(stationId, stationUpdateDto);
  }

  @Post('/stations/:stationID/status')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async setStationStatus(
    @Param('stationId') stationId: number,
    @Body() stationSetStatusDto: StationSetStatusDto,
  ): Promise<Station> {
    return this.adminService.setStationStatus(stationId, stationSetStatusDto);
  }
}
