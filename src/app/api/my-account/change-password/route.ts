import { User } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import {
  AUTH_RESPONSE_MESSAGE,
  ERROR_RESPONSE_MESSAGES,
  errorResponse,
  SUCCESS_RESPONSE_MESSAGES,
  successResponse,
} from "@/lib/utils";
import { compare, hash } from "bcrypt";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const currentUser = session.user as User;

    const body = await request.json();

    if (
      !body.newPassword ||
      !body.confirmNewPassword ||
      !body.currentPassword
    ) {
      return Response.json(
        errorResponse(ERROR_RESPONSE_MESSAGES.missingFields),
        {
          status: 400,
        },
      );
    }

    if (body.newPassword !== body.confirmNewPassword) {
      return Response.json(
        errorResponse(ERROR_RESPONSE_MESSAGES.passwordsDontMatch),
        {
          status: 400,
        },
      );
    }

    const userFound = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (!userFound) {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 404,
      });
    }

    const passwordMatch = await compare(
      body.currentPassword,
      userFound.password,
    );

    if (!passwordMatch) {
      return Response.json(
        errorResponse(AUTH_RESPONSE_MESSAGE.currentPasswordWrong),
        {
          status: 400,
        },
      );
    }

    if (body.currentPassword === body.newPassword) {
      return Response.json(
        errorResponse(ERROR_RESPONSE_MESSAGES.samePasswords),
        {
          status: 400,
        },
      );
    }

    const passwordEncrypted = await hash(
      body.newPassword,
      Number(process.env.SALT_ROUNDS),
    );

    const userUpdated = await prisma.user.update({
      where: {
        id: currentUser.id,
      },
      data: {
        password: passwordEncrypted,
        passwordUpdated: true,
      },
    });

    return Response.json(
      successResponse(userUpdated, SUCCESS_RESPONSE_MESSAGES.updated),
    );
  } catch (e: any) {
    return Response.json(errorResponse(e.message), { status: 500 });
  }
}
