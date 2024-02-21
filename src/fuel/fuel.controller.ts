import { Controller, Get, Param } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Controller('fuel')
export class FuelController {
  constructor(private readonly prismaService: PrismaService) {}

  @Get('/:stationId')
  async getFuelsByStationId(@Param('stationId') stationId: string) {
    return this.prismaService.fuel.findMany({
      where: {
        stationId: parseInt(stationId),
      },
    });
  }

  @Get('/:stationId/:fuelType')
  async getFuelsByStationIdAndFuelType(
    @Param('stationId') stationId: string,
    @Param('fuelType') fuelType: string,
  ) {
    return this.prismaService.fuel.findMany({
      where: {
        stationId: parseInt(stationId),
        fuelType: fuelType,
      },
    });
  }

  @Get('/:fuelType')
  async getFuelsByFuelType(@Param('fuelType') fuelType: string) {
    return this.prismaService.fuel.findMany({
      where: {
        fuelType: fuelType,
      },
    });
  }

  @Get('/')
  async getFuels() {
    return this.prismaService.fuel.findMany();
  }
}
