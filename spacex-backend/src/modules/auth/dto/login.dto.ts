import { IsEmail, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ description: 'User Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User Password' })
  @IsNotEmpty()
  password: string;
}
