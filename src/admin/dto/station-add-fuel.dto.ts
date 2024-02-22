import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class StationAddFuelDto {
  @IsNotEmpty()
  @IsNumber()
  readonly cityId: number;

  @IsNotEmpty()
  @IsString()
  readonly districtName: string;

  @IsNotEmpty()
  @IsNumber()
  readonly gasolinePrice: number;

  @IsNotEmpty()
  @IsNumber()
  readonly dieselPrice: number;

  @IsNotEmpty()
  @IsNumber()
  readonly lpgPrice: number;
}
