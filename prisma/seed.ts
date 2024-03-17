import { hash } from "bcrypt";
import prisma from "../lib/prisma";

async function main() {
  try {
    await prisma.user.deleteMany();

    await prisma.user.create({
      data: {
        name: "John",
        surname: "Doe",
        email: "jdoe@me.com",
        password: await hash("jdoe", Number(process.env.SALT_ROUNDS)),
        isActivated: true,
      },
    });

    prisma.$disconnect();

    console.log("Seeded successfully");
  } catch (e: any) {
    prisma.$disconnect();
    console.error(e);
    process.exit(1);
  }
}

main();
