import { IsNotEmpty, IsString } from 'class-validator';

export class StationCreateDto {
  @IsNotEmpty()
  @IsString()
  readonly displayName: string;
}
