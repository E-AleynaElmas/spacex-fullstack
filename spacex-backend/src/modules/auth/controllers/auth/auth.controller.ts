import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from '../../services/auth/auth.service';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  register(@Body() userDto: CreateUserDto) {
    return this.authService.register(userDto);
  }

  //TODO:  Login ve me endpointleri ekle.
}
