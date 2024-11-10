import { Injectable, OnModuleInit } from '@nestjs/common';
import { InjectConnection } from '@nestjs/mongoose';
import { Connection } from 'mongoose';

@Injectable()
export class AppService implements OnModuleInit {
  constructor(@InjectConnection() private readonly connection: Connection) {}

  onModuleInit() {
    // Listen for MongoDB connection events to log success or failure
    this.connection.on('connected', () => {
      console.log('MongoDB connected successfully!');
    });

    this.connection.on('error', (err) => {
      console.error('MongoDB connection failed:', err);
    });

    this.connection.on('disconnected', () => {
      console.log('MongoDB connection lost.');
    });
  }

  getHello(): string {
    return 'Welcome to the URL Shortener API!';
  }
}
