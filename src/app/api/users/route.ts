import { User } from "@/lib/definitions";
import prisma from "@/lib/prisma";
import {
  AUTH_RESPONSE_MESSAGE,
  errorResponse,
  SUCCESS_RESPONSE_MESSAGES,
  successResponse,
} from "@/lib/utils";
import { hash } from "bcrypt";
import generator from "generate-password";
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

    if (currentUser.role !== "ADMIN") {
      return Response.json(errorResponse(AUTH_RESPONSE_MESSAGE.unauthorized), {
        status: 401,
      });
    }

    const users = await prisma.user.findMany();

    return Response.json(successResponse(users));
  } catch (e: any) {
    return Response.json(errorResponse(e.message), { status: 500 });
  }
}

export async function POST(request: Request) {
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

    const body = await request.json();

    const password = generator.generate({
      length: 8,
      numbers: true,
    });

    const passwordEncrypted = await hash(
      password,
      Number(process.env.SALT_ROUNDS),
    );

    const user = await prisma.user.create({
      data: { ...body, password: passwordEncrypted },
    });

    return Response.json(
      successResponse(
        { ...user, temporalPassword: password },
        SUCCESS_RESPONSE_MESSAGES.created,
      ),
    );
  } catch (e: any) {
    return Response.json(errorResponse(e.message), { status: 500 });
  }
}
