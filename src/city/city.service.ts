import { Injectable } from '@nestjs/common';
import { DISTRICTS } from 'src/common/constants/districts';

@Injectable()
export class CityService {
  async getDisctrictsOfCity(cityId: number) {
    const districts = DISTRICTS[cityId];

    for (let i = 0; i < districts.length; i++) {
      districts[i] = districts[i].toLocaleUpperCase('tr-TR');
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
