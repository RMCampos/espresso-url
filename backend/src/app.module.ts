import {
  Module,
  NestModule,
  MiddlewareConsumer,
} from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { HealthModule } from './health/health.module';
import { UrlMappingModule } from './url-mapping/url-mapping.module';
import { VersionHeaderMiddleware } from './version-header.middleware';

@Module({
  imports: [PrismaModule, HealthModule, UrlMappingModule],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(VersionHeaderMiddleware).forRoutes('*');
  }
}
