import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { UrlMappingModule } from './url-mapping/url-mapping.module';

@Module({
  imports: [PrismaModule, HealthModule, UrlMappingModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
