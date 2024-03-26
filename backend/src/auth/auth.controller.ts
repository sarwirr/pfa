import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AwsCognitoService } from './aws-cognito.service';
import { AuthLoginUserDto } from './auth-login.dto';


@Controller('api/v1/auth')
export class AuthController {
  constructor(private awsCognitoService: AwsCognitoService) {}


  @Post('/login')
  @UsePipes(ValidationPipe)
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.awsCognitoService.authenticateUser(authLoginUserDto);
  }
}
