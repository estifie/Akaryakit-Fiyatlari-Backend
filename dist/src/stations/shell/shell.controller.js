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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ShellController = void 0;
const common_1 = require("@nestjs/common");
const role_guard_1 = require("../../auth/guards/role.guard");
const shell_service_1 = require("./shell.service");
let ShellController = class ShellController {
    constructor(shellService) {
        this.shellService = shellService;
    }
    getPrice(id) {
        return this.shellService.getPrice(id);
    }
};
exports.ShellController = ShellController;
__decorate([
    (0, common_1.Get)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe({ transform: true })),
    (0, common_1.UseGuards)(role_guard_1.RoleGuard),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], ShellController.prototype, "getPrice", null);
exports.ShellController = ShellController = __decorate([
    (0, common_1.Controller)('/'),
    __metadata("design:paramtypes", [shell_service_1.ShellService])
], ShellController);
//# sourceMappingURL=shell.controller.js.map