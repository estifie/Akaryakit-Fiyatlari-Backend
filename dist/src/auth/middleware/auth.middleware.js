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
exports.AuthMiddleware = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../../prisma/prisma.service");
let AuthMiddleware = class AuthMiddleware {
    constructor(jwtService) {
        this.jwtService = jwtService;
    }
    async use(req, res, next) {
        const token = req.headers['authorization'];
        if (!token) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
        try {
            const decoded = await this.jwtService.verify(token.toString().replace('Bearer ', ''), {
                secret: process.env.JWT_SECRET,
            });
            const user = decoded;
            if (!user) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const foundUser = await prisma_service_1.prisma.user.findUnique({
                where: {
                    username: user.username,
                },
            });
            if (!foundUser || !foundUser.active) {
                return res.status(401).json({ message: 'Unauthorized' });
            }
            const { password, ...result } = foundUser;
            req['user'] = result;
            next();
        }
        catch (error) {
            return res.status(401).json({ message: 'Unauthorized' });
        }
    }
};
exports.AuthMiddleware = AuthMiddleware;
exports.AuthMiddleware = AuthMiddleware = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService])
], AuthMiddleware);
//# sourceMappingURL=auth.middleware.js.map