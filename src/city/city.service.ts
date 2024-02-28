import { Injectable } from '@nestjs/common';
import { DISTRICTS } from 'src/common/constants/districts';

@Injectable()
export class CityService {
  getDisctrictsOfCity(cityId: number) {
    if (cityId === -1) cityId = 34;

    const districts = DISTRICTS[cityId];

    const uniqueDistricts = [
      ...new Set(
        Object.values(districts)
          .flatMap((district) => Object.values(district))
          .map((item) => item.toLocaleUpperCase('tr-TR')),
      ),
    ];

    if (!uniqueDistricts) {
      return {
        status: 'error',
        message: 'No district found for this city',
        data: null,
      };
    }

    return {
      status: 'success',
      data: uniqueDistricts,
      message: null,
    };
  }

  async getAllDistricts() {
    const districts = {};

    for (const cityId in DISTRICTS) {
      districts[cityId] = this.getDisctrictsOfCity(Number(cityId)).data;
    }

    if (!districts) {
      return {
        status: 'error',
        message: 'No district found for this city',
        data: null,
      };
    }

    return {
      status: 'success',
      data: districts,
      message: null,
    };
  }
}
