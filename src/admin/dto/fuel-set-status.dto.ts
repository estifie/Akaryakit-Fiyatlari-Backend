import { IsBoolean, IsNotEmpty } from 'class-validator';

export class FuelSetStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly dieselActive: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly gasolineActive: boolean;

  @IsNotEmpty()
  @IsBoolean()
  readonly lpgActive: boolean;
}
