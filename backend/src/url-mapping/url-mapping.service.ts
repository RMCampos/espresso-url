import { Injectable, NotFoundException } from '@nestjs/common';
import { UrlMappingResponseDto } from 'src/url-mapping/dto/urlmapping-response.dto';
import { PrismaService } from 'src/prisma/prisma.service';

const ALPHABET =
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const BASE = BigInt(ALPHABET.length);
const SHORT_URL_LENGTH = 6;

@Injectable()
export class UrlMappingService {
  constructor(private prisma: PrismaService) {}

  async shortenUrl(originalUrl: string): Promise<UrlMappingResponseDto> {
    let shortCode: string;
    do {
      shortCode = this.generateShortCode();
    } while (await this.checkUniqueShortCode(shortCode));

    const created = await this.prisma.urlmapping.create({
      data: {
        originalUrl: originalUrl,
        shortCode: shortCode,
      },
    });

    return new UrlMappingResponseDto(created);
  }

  async getOriginalUrl(shortCode: string): Promise<UrlMappingResponseDto> {
    const urlMapping = await this.prisma.urlmapping.findUnique({
      where: {
        shortCode: shortCode,
      },
    });

    if (!urlMapping) {
      throw new NotFoundException('Short URL not found');
    }

    return new UrlMappingResponseDto(urlMapping);
  }

  async checkUniqueShortCode(shortCode: string): Promise<boolean> {
    const mapping = await this.prisma.urlmapping.findUnique({
      where: {
        shortCode: shortCode,
      },
    });
    return !!mapping;
  }

  generateShortCode(): string {
    let shortCode = '';
    for (let i = 0; i < SHORT_URL_LENGTH; i++) {
      shortCode += ALPHABET[Math.floor(Math.random() * Number(BASE))];
    }
    return shortCode;
  }
}
