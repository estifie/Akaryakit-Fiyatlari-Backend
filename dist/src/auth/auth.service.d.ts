import { JwtService } from '@nestjs/jwt';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserResponseDto } from './dto/user-response.dto';
export declare class AuthService {
    private jwtService;
    constructor(jwtService: JwtService);
    login(userLoginDto: UserLoginDto): Promise<UserResponseDto>;
    createUser(userCreateDto: UserCreateDto): Promise<UserResponseDto>;
    private generateToken;
}
