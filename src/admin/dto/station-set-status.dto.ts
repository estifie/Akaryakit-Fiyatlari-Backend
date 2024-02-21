import { IsBoolean, IsNotEmpty } from 'class-validator';

export class StationSetStatusDto {
  @IsNotEmpty()
  @IsBoolean()
  readonly status: boolean;
}
