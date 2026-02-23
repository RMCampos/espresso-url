import { Module } from '@nestjs/common';
import { UrlMappingService } from './url-mapping.service';
import { UrlMappingController } from './url-mapping.controller';

@Module({
  controllers: [UrlMappingController],
  providers: [UrlMappingService],
})
export class UrlMappingModule {}
