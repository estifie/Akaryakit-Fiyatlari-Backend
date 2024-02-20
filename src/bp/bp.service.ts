import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { API_URL, CITY_IDS } from './constants';

@Injectable()
export class BpService {
  constructor(private readonly httpService: HttpService) {}

  async getPrice(id: number): Promise<void> {
    const url = API_URL + CITY_IDS[id];
    const response = await this.httpService.axiosRef.get(url);
    console.log(response.data);
  }
}
