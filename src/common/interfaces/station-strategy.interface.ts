import { Fuel } from './fuel.interface';

export interface StationService {
  getPrice(id: number): Promise<Fuel[]>;
  migrate(): Promise<void>;
}
