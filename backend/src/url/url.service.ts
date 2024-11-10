import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Url } from './schemas/url.schema';
import { randomBytes } from 'crypto';

@Injectable()
export class UrlService {
  constructor(@InjectModel(Url.name) private readonly urlModel: Model<Url>) {}

  async createShortUrl(longUrl: string): Promise<{ longUrl: string; shortCode: string; shortUrl: string }> {
    let shortCode: string;
    let shortUrl: string;
    const baseUrl = process.env.BASE_URL || 'http://localhost:5000';

    do {
      const buffer = randomBytes(4);
      shortCode = parseInt(buffer.toString('hex'), 16).toString(36).slice(0, 6);

      shortUrl = `${baseUrl}/${shortCode}`;
    } while (await this.urlModel.exists({ shortCode }));

    const newUrl = new this.urlModel({ longUrl, shortCode, shortUrl });
    await newUrl.save();

    return { longUrl, shortCode, shortUrl };
  }

  async getLongUrl(shortCode: string): Promise<Url> {
    const url = await this.urlModel.findOne({ shortCode });
    if (!url) {
      throw new NotFoundException('URL not found');
    }
    console.log('Found long URL:', url.longUrl);
    return url;
  }

  async deleteUrl(shortCode: string): Promise<{ message: string }> {
    const result = await this.urlModel.deleteOne({ shortCode }).exec();

    if (result.deletedCount === 0) {
      throw new NotFoundException('URL not found');
    }

    return { message: 'URL deleted successfully' };
  }

  async getAllUrls(): Promise<Url[]> {
    return this.urlModel.find().exec();
  }
}
