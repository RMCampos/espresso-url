import {
  Controller,
  Get,
  InternalServerErrorException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('health')
export class HealthController {
  constructor(private prisma: PrismaService) {}

  @Get()
  async check() {
    const buildVersion = process.env.BUILD_VERSION;
    let databaseStatus = 'DOWN';
    try {
      await this.prisma.$queryRawUnsafe('SELECT 1');
      databaseStatus = 'UP';
    } catch (e) {
      console.error('Database health check failed:', e);
      throw new InternalServerErrorException({
        status: 'DOWN',
        database: databaseStatus,
      });
    }

    return {
      status: 'UP',
      database: databaseStatus,
      buildVersion,
    };
  }
}
