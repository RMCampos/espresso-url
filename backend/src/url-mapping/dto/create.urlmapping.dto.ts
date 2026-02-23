import { IsNotEmpty, IsString } from 'class-validator';

export class CreateUrlMappingDto {
  @IsNotEmpty()
  @IsString()
  originalUrl: string;

  @IsNotEmpty()
  @IsString()
  shortCode: string;
}
