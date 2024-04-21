import { Injectable } from '@nestjs/common';
import {
  AuthenticationDetails,
  CognitoUser,
  CognitoUserPool,
} from 'amazon-cognito-identity-js';
import { AuthLoginUserDto } from '../dto/auth-login.dto';
import { AuthRegisterUserDto } from '../dto/auth-registration.dto';

@Injectable()
export class AwsCognitoService {
  constructor() {
    // this.userPool = new CognitoUserPool({
    //   UserPoolId: process.env.AWS_COGNITO_USER_POOL_ID,
    //   ClientId: process.env.AWS_COGNITO_CLIENT_ID,
    // });
  }

  async authenticateUser(
    authLoginUserDto: AuthLoginUserDto,
    userPool: CognitoUserPool,
  ) {
    const { email, password } = authLoginUserDto;
    const userData = {
      Username: email,
      Pool: userPool,
    };

    const authenticationDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    const userCognito = new CognitoUser(userData);

    return new Promise((resolve, reject) => {
      userCognito.authenticateUser(authenticationDetails, {
        onSuccess: (result) => {
          resolve({
            accessToken: result.getAccessToken().getJwtToken(),
            refreshToken: result.getRefreshToken().getToken(),
          });
        },
        onFailure: (err) => {
          reject(err);
        },
      });
    });
  }

  async registerUser(
    authRegisterUserDto: AuthRegisterUserDto,
    userPool: CognitoUserPool,
  ) {
    const { email, password } = authRegisterUserDto;
    return new Promise((resolve, reject) => {
      userPool.signUp(email, password, null, null, (err, result) => {
        if (!result) {
          reject(err);
        } else {
          resolve(result.user);
        }
      });
    });
  }
}
