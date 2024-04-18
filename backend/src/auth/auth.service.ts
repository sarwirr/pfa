import { Injectable } from '@nestjs/common';
import { AwsCognitoService } from './aws-cognito/aws-cognito.service';
import { AuthRegisterUserDto } from './dto/auth-registration.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Pharmacy } from 'src/pharmacy/entities/pharmacy.entity';
import { AuthLoginUserDto } from './dto/auth-login.dto';

@Injectable()
export class AuthService {
    constructor(
        private readonly awscognitoService : AwsCognitoService,
        @InjectModel('Pharmacy')
        private pharmacyModel : Model<Pharmacy>
    ){}

    async signin(authLoginDto : AuthLoginUserDto){
        try{
            const tokens = await this.awscognitoService.authenticateUser(authLoginDto);
            return {
                "response": tokens
            }
        }catch(error){
            return {
                "errorMessage": error.message
            }
        }
    }

    async singup(authRegisterUserDto : AuthRegisterUserDto){
        try{
            const cognitoResponse = await this.awscognitoService.registerUser(authRegisterUserDto);
            if(cognitoResponse){
                delete authRegisterUserDto.email;
                delete authRegisterUserDto.password;
                const user = await this.pharmacyModel.create(authRegisterUserDto);
                const saved_user = await user.save();
                return {
                    "savedUser": saved_user
                }
            }else{
                return {
                    "errorMessage": "we had an aws registration error"
                }
            }
        }catch(error){
            return {
                "errorMessage": error.message
            }
        } 
    }
}
