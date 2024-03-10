import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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

  async getFuelsByCityId(cityId: number, page: number, limit: number) {
    if (cityId === -1) cityId = 34;

    const normalizedPage = Math.max(page, 1);
    const normalizedLimit = Math.min(limit, 30);

    const fuels = await this.prismaService.fuel.findMany({
      where: {
        cityId: cityId,
      },
      take: normalizedLimit,
      skip: (normalizedPage - 1) * normalizedLimit,
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

  async getFuelsByCityAndDistrict(
    cityId: number,
    district: string,
    page: number,
    limit: number,
  ) {
    const normalizedPage = Math.max(page, 1);
    const normalizedLimit = Math.min(limit, 30);

    const fuels = await this.prismaService.fuel.findMany({
      where: {
        cityId: cityId,
        districtName: district,
      },
      take: normalizedLimit,
      skip: (normalizedPage - 1) * normalizedLimit,
    });

    fuels.filter(
      (fuel) =>
        fuel.lpgPrice === 0 &&
        fuel.dieselPrice === 0 &&
        fuel.gasolinePrice === 0,
    );

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
