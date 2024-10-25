import { Prisma } from "@prisma/client";

export type User = Prisma.UserGetPayload<{
  select: {
    _count: true;
    avatar: true;
    id: true;
    name: true;
    role: true;
    username: true;
    email: true;
    createdAt: true;
    updatedAt: true;
    isActivated: true;
    phone: true;
    surname: true;
    passwordUpdated: true;
  };
}>;
