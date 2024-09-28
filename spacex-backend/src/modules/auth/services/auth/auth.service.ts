import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/modules/users/dto/create-user.dto';
import { UsersService } from 'src/modules/users/services/users/users.service';
import { LoginDto } from '../../dto/login.dto';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(userDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    const user = await this.usersService.create({
      ...userDto,
      password: hashedPassword,
    });
    return user;
  }

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user && (await bcrypt.compare(loginDto.password, user.password))) {
      // Kullanıcı doğrulandı, JWT token oluşturulabilir
      return user;
    } else {
      throw new Error('Invalid credentials');
    }
  }
}
