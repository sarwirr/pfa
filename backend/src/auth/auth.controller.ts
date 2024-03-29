import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthRegisterUserDto } from './dto/auth-registration.dto';
import { AuthService } from './auth.service';
import { AuthLoginUserDto } from './dto/auth-login.dto';


@Controller('api/v1/auth')
export class AuthController {
  constructor(
    private authService: AuthService
    ) {}


  @Post('/login')
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    return await this.authService.signin(authLoginUserDto)
  }

  @Post('/signup')
  async signup(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    return await this.authService.singup(authRegisterUserDto);
  }
}
