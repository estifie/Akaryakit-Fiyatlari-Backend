import {
  Body,
  Controller,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserResponseDto } from './dto/user-response.dto';
import { RoleGuard } from './guards/role.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UsePipes(new ValidationPipe({ transform: true }))
  async login(@Body() userLoginDto: UserLoginDto): Promise<UserResponseDto> {
    return this.authService.login(userLoginDto);
  }

  @Post('/')
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(RoleGuard)
  async createUser(
    @Body() userCreateDto: UserCreateDto,
  ): Promise<UserResponseDto> {
    return this.authService.createUser(userCreateDto);
  }
}
