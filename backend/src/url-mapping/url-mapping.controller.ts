import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Res,
} from '@nestjs/common';
import { UrlMappingService } from './url-mapping.service';
import type { FastifyReply } from 'fastify';
import { UrlMappingResponseDto } from './dto/urlmapping-response.dto';

@Controller()
export class UrlMappingController {
  constructor(
    private readonly urlMappingService: UrlMappingService,
  ) {}

  @Post('api/urls')
  async createShortUrl(
    @Body('originalUrl') originalUrl: string,
  ): Promise<UrlMappingResponseDto> {
    const shortCode: UrlMappingResponseDto =
      await this.urlMappingService.shortenUrl(originalUrl);
    return shortCode;
  }

  @Get(':shortCode')
  async redirectUrl(
    @Param('shortCode') shortCode: string,
    @Res() res: FastifyReply,
  ) {
    const urlMapping =
      await this.urlMappingService.getOriginalUrl(
        shortCode,
      );
    return res.redirect(urlMapping.originalUrl, 302);
  }
}
