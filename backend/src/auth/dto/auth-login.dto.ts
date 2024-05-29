import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, Matches } from 'class-validator';

export class AuthLoginUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /* Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character */
  @ApiProperty({
    description:
      'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number, and one special character',
  })
  @IsNotEmpty()
  @Matches(
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$&+,:;=?@#|'<>.^*()%!-])[A-Za-z\d@$&+,:;=?@#|'<>.^*()%!-]{8,}$/,
    { message: 'invalid password' },
  )
  password: string;
}
