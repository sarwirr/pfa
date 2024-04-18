import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class AuthRegisterUserDto {
  @IsNotEmpty()
  @IsString()
  name:string

  @IsNotEmpty()
  @IsString()
  address:string

  @IsNotEmpty()
  @IsString()
  city:string

  @IsNotEmpty()
  @IsString()
  phone_number:string

  @IsNotEmpty()  
  @IsEmail()
  email: string;

  @IsNotEmpty()  
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
    { message: 'invalid password' },
  )
  password: string;

}