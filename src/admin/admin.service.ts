import { Injectable } from '@nestjs/common';
import { Fuel, Station } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { FuelSetStatusDto } from './dto/fuel-set-status.dto';
import { StationAddFuelDto } from './dto/station-add-fuel.dto';
import { StationCreateDto } from './dto/station-create.dto';
import { StationSetStatusDto } from './dto/station-set-status.dto';

@Injectable()
export class AdminService {
  constructor(private readonly prismaService: PrismaService) {}
  async createStation(stationCreateDto: StationCreateDto): Promise<Station> {
    const station = this.prismaService.station.create({
      data: {
        displayName: stationCreateDto.displayName,
        active: true,
        fuels: {},
      },
    });

    if (!station) {
      throw new Error('Error creating station');
    }

    return station;
  }

  async setStationStatus(
    stationId: number,
    stationSetStatusDto: StationSetStatusDto,
  ): Promise<Station> {
    const station = this.prismaService.station.update({
      where: {
        id: stationId,
      },
      data: {
        active: stationSetStatusDto.status,
      },
    });

    if (!station) {
      throw new Error('Error updating station');
    }

    return station;
  }

  async removeStation(stationId: number): Promise<any> {
    const station = await this.prismaService.station.delete({
      where: {
        id: stationId,
      },
    });

    await this.prismaService.fuel.deleteMany({
      where: {
        stationId: stationId,
      },
    });

    if (!station) {
      throw new Error('Error removing station');
    }

    return {
      message: 'Station removed',
    };
  }

  async getStations(): Promise<Station[]> {
    return this.prismaService.station.findMany();
  }

  async getStation(stationId: number): Promise<Station> {
    return this.prismaService.station.findUnique({
      where: {
        id: stationId,
      },
    });
  }

  async addFuelToStation(
    stationId: number,
    stationAddFuelDto: StationAddFuelDto,
  ): Promise<Fuel> {
    const fuel = this.prismaService.fuel.create({
      data: {
        displayName: stationAddFuelDto.displayName,
        fuelType: stationAddFuelDto.fuelType,
        station: {
          connect: {
            id: stationId,
          },
        },
      },
    });

    if (!fuel) {
      throw new Error('Error adding fuel to station');
    }

    return fuel;
  }

  async setFuelStatus(stationId: number, fuealSetStatusDto: FuelSetStatusDto) {
    const fuel = this.prismaService.fuel.update({
      where: {
        id: stationId,
      },
      data: {
        active: fuealSetStatusDto.active,
      },
    });

    if (!fuel) {
      throw new Error('Error updating fuel status');
    }

    return fuel;
  }
}
