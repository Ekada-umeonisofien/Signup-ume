import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('password') password: string,
  ) {
    const user = await this.userService.findByEmail(email);
    if (user) {
      throw new BadRequestException('Email already in use');
    }

    return this.userService.signup(name, email, password);
  }
}
