import { Module } from '@nestjs/common';
import { UrlMappingService } from './url-mapping.service';
import { UrlMappingController } from './url-mapping.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [UrlMappingController],
  providers: [UrlMappingService],
})
export class UrlMappingModule {}
