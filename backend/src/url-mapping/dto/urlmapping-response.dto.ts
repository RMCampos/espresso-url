import { Expose } from 'class-transformer';

export class UrlMappingResponseDto {
  @Expose()
  id: number;

  @Expose()
  originalUrl: string;

  @Expose()
  shortCode: string;

  @Expose()
  createdAt: Date;

  constructor(partial: Partial<UrlMappingResponseDto>) {
    Object.assign(this, partial);
  }
}
