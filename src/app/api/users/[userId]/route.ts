import { User } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import {
  AUTH_RESPONSE_MESSAGE,
  ERROR_RESPONSE_MESSAGES,
  errorResponse,
  SUCCESS_RESPONSE_MESSAGES,
  successResponse,
} from "@/lib/utils";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/options";

export async function GET(
  _request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const currentUser = session.user as User;

    if (currentUser.role !== "ADMIN") {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
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

export async function PATCH(
  request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const currentUser = session.user as User;

    if (currentUser.role !== "ADMIN") {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.userId },
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

export async function DELETE(
  _request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session?.user) {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const currentUser = session.user as User;

    if (currentUser.role !== "ADMIN") {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const user = await prisma.user.findUnique({
      where: { id: params.userId },
    });

    if (!user) {
      return Response.json(errorResponse(ERROR_RESPONSE_MESSAGES.notFound), {
        status: 404,
      });
    }

    await prisma.user.delete({
      where: {
        id: user.id,
      },
    });

    return Response.json(
      successResponse(null, SUCCESS_RESPONSE_MESSAGES.deleted),
    );
  } catch (e: any) {
    return Response.json(errorResponse(e.message), { status: 500 });
  }
}
