import prisma from "@/lib/prisma";
import {
  ERROR_RESPONSE_MESSAGES,
  errorResponse,
  successResponse,
} from "@/lib/utils";

export async function GET(
  _request: Request,
  { params }: { params: { userId: string } },
) {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: params.userId,
      },
      select: {
        passwordUpdated: true,
      },
    });

    if (!user) {
      return Response.json(errorResponse(ERROR_RESPONSE_MESSAGES.notFound), {
        status: 404,
      });
    }

    const { passwordUpdated } = user;

    return Response.json(successResponse({ passwordUpdated }));
  } catch (e: any) {
    return Response.json(errorResponse(e.message), { status: 500 });
  }
}
