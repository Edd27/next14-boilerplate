import { hash } from "bcrypt";
import prisma from "../lib/prisma";

async function main() {
  try {
    if (process.env.NODE_ENV !== "production") {
      await prisma.user.deleteMany();

      // eslint-disable-next-line no-console
      console.log("🧹 Deleted all data seeded successfully");
    }

    await prisma.user.create({
      data: {
        name: "John",
        surname: "Doe",
        email: "jdoe@me.com",
        username: "jdoe",
        password: await hash("jdoe", Number(process.env.SALT_ROUNDS)),
        isActivated: true,
      },
    });

    prisma.$disconnect();

    // eslint-disable-next-line no-console
    console.log("✅ Seeded successfully");
  } catch (e: any) {
    prisma.$disconnect();
    // eslint-disable-next-line no-console
    console.error(e);
    process.exit(1);
  }
}

main();
