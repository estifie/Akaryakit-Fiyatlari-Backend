"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const dotenv_1 = require("dotenv");
const app_module_1 = require("./app.module");
(0, dotenv_1.config)();
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, {
        abortOnError: false,
        logger: ['error', 'warn', 'log', 'debug'],
    });
    app.enableCors();
    const version = process.env.VERSION || 'v1';
    app.setGlobalPrefix(`api/${version}`);
    await app.listen(process.env.PORT || 3000);
}
bootstrap();
//# sourceMappingURL=main.js.map