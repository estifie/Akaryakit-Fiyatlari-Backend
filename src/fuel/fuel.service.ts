import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class FuelService {
  constructor(private readonly prismaService: PrismaService) {}

  async getFuelsByStationId(stationId: number) {
    return this.prismaService.fuel.findMany({
      where: {
        stationId: stationId,
      },
    });
  }

  async getFuelsByStationIdAndCityId(stationId: number, cityId: number) {
    return this.prismaService.fuel.findMany({
      where: {
        stationId: stationId,
        cityId: cityId,
      },
    });
  }

  async getFuelsByCityId(cityId: number) {
    return this.prismaService.fuel.findMany({
      where: {
        cityId: cityId,
      },
    });
  }

  async getAllFuels() {
    return this.prismaService.fuel.findMany();
  }
}
