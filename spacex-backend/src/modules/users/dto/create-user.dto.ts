import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User Name' })
  @IsNotEmpty()
  firstName: string;

  @ApiProperty({ description: 'User Last Name' })
  @IsNotEmpty()
  lastName: string;

  @ApiProperty({ description: 'User Email' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'User Password', minLength: 6 })
  @MinLength(6)
  password: string;
}
