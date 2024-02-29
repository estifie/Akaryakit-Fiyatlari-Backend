"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt = require("bcrypt");
const dotenv_1 = require("dotenv");
const prisma_service_1 = require("../prisma.service");
(0, dotenv_1.config)();
async function main() {
    const defaultUsername = process.env.DEFAULT_USERNAME;
    const defaultPassword = process.env.DEFAULT_PASSWORD;
    const saltOrRounds = 10;
    const hashedPassword = await bcrypt.hash(defaultPassword, saltOrRounds);
    const adminUser = await prisma_service_1.prisma.user.findFirst({
        where: {
            username: defaultUsername,
        },
    });
    if (adminUser) {
        return;
    }
    await prisma_service_1.prisma.user.create({
        data: {
            username: defaultUsername,
            password: hashedPassword,
            role: 'admin',
        },
    });
}
main()
    .catch((e) => {
    throw e;
})
    .finally(async () => {
    await prisma_service_1.prisma.$disconnect();
});
//# sourceMappingURL=user.seed.js.map