import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StationAddFuelDto {
  @IsNotEmpty()
  @IsNumber()
  readonly displayName: string;

  @IsNotEmpty()
  @IsString()
  readonly fuelType: string;
}
