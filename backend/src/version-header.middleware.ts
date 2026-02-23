import { Injectable, NestMiddleware } from '@nestjs/common';
import { FastifyRequest, FastifyReply } from 'fastify';

@Injectable()
export class VersionHeaderMiddleware implements NestMiddleware {
  use(
    req: FastifyRequest['raw'],
    res: FastifyReply['raw'],
    next: () => void,
  ) {
    const buildVersion = process.env.BUILD_VERSION;
    if (buildVersion) {
      res.setHeader('x-build-version', buildVersion);
    }
    next();
  }
}
