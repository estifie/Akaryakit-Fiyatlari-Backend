import { HttpException, Injectable } from '@nestjs/common';
import { Fuel, Station } from '@prisma/client';
import { PrismaService } from '../../prisma/prisma.service';
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
      throw new HttpException('Error creating station', 500);
    }

    return station;
  }

  async setStationStatus(
    stationId: number,
    stationSetStatusDto: StationSetStatusDto,
  ): Promise<Station> {
    if (!stationId) {
      throw new HttpException('Station not found', 404);
    }

    const station = this.prismaService.station.update({
      where: {
        id: stationId,
      },
      data: {
        active: stationSetStatusDto.status,
      },
    });

    if (!station) {
      throw new HttpException('Error updating station status', 500);
    }

    return station;
  }

  async removeStation(stationId: number): Promise<any> {
    if (!stationId) {
      throw new HttpException('Station not found', 404);
    }

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
      throw new HttpException('Error removing station', 500);
    }

    return {
      message: 'Station removed',
    };
  }

  async getStations(): Promise<Station[]> {
    return this.prismaService.station.findMany();
  }

  async getStation(stationId: number): Promise<Station> {
    if (!stationId) {
      throw new HttpException('Station not found', 404);
    }

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
        cityId: stationAddFuelDto.cityId,
        districtName: stationAddFuelDto.districtName,
        gasolinePrice: stationAddFuelDto.gasolinePrice,
        dieselPrice: stationAddFuelDto.dieselPrice,
        lpgPrice: stationAddFuelDto.lpgPrice,
        station: {
          connect: {
            id: stationId,
          },
        },
      },
    });

    if (!fuel) {
      throw new HttpException('Error adding fuel to station', 500);
    }

    return fuel;
  }
}
