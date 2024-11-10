import { Controller, Get, Post, Body, Param, Redirect, Delete, NotFoundException } from '@nestjs/common';
import { UrlService } from './url.service';

@Controller()
export class UrlController {
  constructor(private readonly urlService: UrlService) {}

  @Post('shorten')
  async createShortUrl(@Body('longUrl') longUrl: string) {
    return this.urlService.createShortUrl(longUrl);
  }

  // Place this route before the dynamic route to avoid conflicts
  @Get('urls')
  async getAllUrls() {
    return this.urlService.getAllUrls();
  }

  @Get(':shortCode')
  @Redirect()
  async redirect(@Param('shortCode') shortCode: string) {
    const url = await this.urlService.getLongUrl(shortCode);

    if (!url) {
      throw new NotFoundException('URL not found');
    }

    console.log(`Redirecting to: ${url.longUrl}`);
    return { url: url.longUrl };
  }

  @Delete(':shortCode')
  async deleteUrl(@Param('shortCode') shortCode: string) {
    return this.urlService.deleteUrl(shortCode);
  }
}
