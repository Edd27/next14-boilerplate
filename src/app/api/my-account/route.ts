import { User } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import {
  AUTH_RESPONSE_MESSAGE,
  ERROR_RESPONSE_MESSAGES,
  errorResponse,
  SUCCESS_RESPONSE_MESSAGES,
  successResponse,
  USER_SELECT,
} from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/options";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const currentUser = session.user as User;

    const user = await prisma.user.findUnique({
      where: {
        id: currentUser.id,
      },
      select: USER_SELECT,
    });

    if (!user) {
      return Response.json(errorResponse(ERROR_RESPONSE_MESSAGES.notFound), {
        status: 404,
      });
    }

    return Response.json(successResponse(user));
  } catch (e: any) {
    return Response.json(errorResponse(e.message), { status: 500 });
  }
}

export async function PATCH(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const currentUser = session.user as User;

    const user = await prisma.user.findUnique({
      where: { id: currentUser.id },
    });

    if (!user) {
      return Response.json(errorResponse(ERROR_RESPONSE_MESSAGES.notFound), {
        status: 404,
      });
    }

    const body = await request.json();

    const userUpdated = await prisma.user.update({
      where: {
        id: user.id,
      },
      data: { ...body },
    });

    return Response.json(
      successResponse(userUpdated, SUCCESS_RESPONSE_MESSAGES.updated),
    );
  } catch (e: any) {
    return Response.json(errorResponse(e.message), { status: 500 });
  }
}
