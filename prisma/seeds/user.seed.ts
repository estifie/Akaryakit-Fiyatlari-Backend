import * as bcrypt from 'bcrypt';
import { config } from 'dotenv';
import { prisma } from '../prisma.service';
config();

async function main() {
  const defaultUsername = process.env.DEFAULT_USERNAME;
  const defaultPassword = process.env.DEFAULT_PASSWORD;

  const saltOrRounds = 10;
  const hashedPassword = await bcrypt.hash(defaultPassword, saltOrRounds);

  const adminUser = await prisma.user.findFirst({
    where: {
      username: defaultUsername,
    },
  });

  if (adminUser) {
    return;
  }

  await prisma.user.create({
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
    await prisma.$disconnect();
  });
