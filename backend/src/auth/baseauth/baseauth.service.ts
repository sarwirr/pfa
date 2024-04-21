import { Injectable } from '@nestjs/common';
import { AwsCognitoService } from '../aws-cognito/aws-cognito.service';
import { Model } from 'mongoose';
import { AuthLoginUserDto } from '../dto/auth-login.dto';
import { AuthRegisterUserDto } from '../dto/auth-registration.dto';
import { CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable()
export class BaseauthService<T> {
  private userPool: CognitoUserPool;

  constructor(
    private readonly awscognitoService: AwsCognitoService,
    private baseModel: Model<T>,
    private userPoolId: string,
    private clientId: string,
  ) {
    this.userPool = new CognitoUserPool({
      UserPoolId: userPoolId,
      ClientId: clientId,
    });
  }

  async signin(authLoginDto: AuthLoginUserDto) {
    try {
      const tokens = await this.awscognitoService.authenticateUser(
        authLoginDto,
        this.userPool,
      );
      return {
        response: tokens,
      };
    } catch (error) {
      return {
        errorMessage: error.message,
      };
    }
  }

  async singup(authRegisterUserDto: AuthRegisterUserDto) {
    try {
      const cognitoResponse = await this.awscognitoService.registerUser(
        authRegisterUserDto,
        this.userPool,
      );
      if (cognitoResponse) {
        delete authRegisterUserDto.email;
        delete authRegisterUserDto.password;
        const clientId: string = cognitoResponse['pool']['clientId'];
        const newUser = {
          ...authRegisterUserDto,
          clientId,
        };
        const user = await this.baseModel.create(newUser);
        const saved_user = await user.save();
        return {
          savedUser: saved_user,
        };
      } else {
        return {
          errorMessage: 'we had an aws registration error',
        };
      }
    } catch (error) {
      return {
        errorMessage: error.message,
      };
    }
  }
}
