import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FuelService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFuelsByStationId(stationId: number) {
    const fuels = await this.prismaService.fuel.findMany({
      where: {
        stationId: stationId,
      },
    });

    if (!fuels) {
      return {
        status: 'error',
        message: 'No fuel found for this station',
        data: null,
      };
    }

    return {
      status: 'success',
      data: fuels,
      message: null,
    };
  }

  async getFuelsByStationIdAndCityId(stationId: number, cityId: number) {
    const fuels = await this.prismaService.fuel.findMany({
      where: {
        stationId: stationId,
        cityId: cityId,
      },
    });

    if (!fuels) {
      return {
        status: 'error',
        message: 'No fuel found for this city',
        data: null,
      };
    }

    return {
      status: 'success',
      data: fuels,
      message: null,
    };
  }

  async getFuelsByCityId(cityId: number) {
    const fuels = await this.prismaService.fuel.findMany({
      where: {
        cityId: cityId,
      },
    });

    if (!fuels) {
      return {
        status: 'error',
        message: 'No fuel found for this city',
        data: null,
      };
    }

    return {
      status: 'success',
      data: fuels,
      message: null,
    };
  }

  async getAllFuels() {
    const fuels = this.prismaService.fuel.findMany();

    if (!fuels) {
      return {
        status: 'error',
        message: 'No fuel found',
        data: null,
      };
    }

    return {
      status: 'success',
      data: fuels,
      message: null,
    };
  }
}
