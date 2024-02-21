import { IsBoolean, IsNotEmpty } from 'class-validator';

export class FuelSetStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly active: boolean;
}
