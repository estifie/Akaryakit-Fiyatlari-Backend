import { IsNotEmpty, IsString } from 'class-validator';

export class StationUpdateDto {
  @IsNotEmpty()
  @IsString()
  readonly field: string;

  @IsNotEmpty()
  readonly value: string | number | boolean;
}
