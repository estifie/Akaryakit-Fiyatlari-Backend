"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async login(userLoginDto) {
        const user = await prisma_service_1.prisma.user.findUnique({
            where: {
                username: userLoginDto.username,
            },
        });
        if (!user) {
            throw new common_1.HttpException('User not found', common_1.HttpStatus.NOT_FOUND);
        }
        const isPasswordValid = await bcrypt.compare(userLoginDto.password, user.password);
        if (!isPasswordValid) {
            throw new common_1.HttpException('Invalid credentials', common_1.HttpStatus.UNAUTHORIZED);
        }
        const { password, ...result } = user;
        const token = this.generateToken(result);
        return {
            ...result,
            token,
        };
    }
    async createUser(userCreateDto) {
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(userCreateDto.password, saltOrRounds);
        const userExists = await prisma_service_1.prisma.user.findUnique({
            where: {
                username: userCreateDto.username,
            },
        });
        if (userExists) {
            throw new common_1.HttpException('User already exists', 409);
        }
        const user = await prisma_service_1.prisma.user.create({
            data: {
                username: userCreateDto.username,
                password: hashedPassword,
            },
        });
        const { password, ...result } = user;
        const token = this.generateToken(result);
        return {
            ...result,
            token,
        };
    }
    generateToken(user) {
        const payload = { username: user.username };
        return this.jwtService.sign(payload, {
            secret: process.env.JWT_SECRET,
            expiresIn: process.env.JWT_EXPIRATION_TIME,
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map