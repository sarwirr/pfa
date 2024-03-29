import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import { AuthService } from './auth.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Pharmacy, PharmacySchema } from 'src/pharmacy/entities/pharmacy.entity';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Pharmacy.name, schema: PharmacySchema }])
    ],
    controllers: [AuthController],
    providers: [AwsCognitoService,AuthService],
})

export class AuthModule {}
