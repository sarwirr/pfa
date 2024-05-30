import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthLoginUserDto } from '../dto/auth-login.dto';
import { AuthRegisterUserDto } from '../dto/auth-registration.dto';
import { BaseauthService } from './baseauth.service';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation } from '@nestjs/swagger';

export class BaseauthController<T> {
  constructor(private baseauthService: BaseauthService<T>) {}

  @ApiOperation({
    summary: 'LoginIn Endpoint',
  })
  @Post('/login')
  async login(@Body() authLoginUserDto: AuthLoginUserDto) {
    const result = await this.baseauthService.signin(authLoginUserDto);
    return { message: 'SignIn result', result: result };
  }

  @Post('/signup')
  @ApiOperation({
    summary: 'Signup Endpoint',
  })
  async signup(@Body() authRegisterUserDto: AuthRegisterUserDto) {
    const result = await this.baseauthService.singup(authRegisterUserDto);
    return { message: 'SignUp result', result: result };
  }
}
