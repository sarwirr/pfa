import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PharmacyModule } from './pharmacy/pharmacy.module';
import { AuthModule } from './auth/auth.module';

import * as dotenv from 'dotenv';
import { ConfigModule } from '@nestjs/config';

dotenv.config()
@Module({
  imports: [ 
    MongooseModule.forRoot(
      `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URI}:${process.env.DB_PORT}/${process.env.DB_NAME}?authSource=admin` 
      ), PharmacyModule, AuthModule,
      ConfigModule.forRoot({
        envFilePath: '.env',
        isGlobal: true,
      })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
