import { AuthService } from './auth.service';
import { UserCreateDto } from './dto/user-create.dto';
import { UserLoginDto } from './dto/user-login.dto';
import { UserResponseDto } from './dto/user-response.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(userLoginDto: UserLoginDto): Promise<UserResponseDto>;
    createUser(userCreateDto: UserCreateDto): Promise<UserResponseDto>;
}
