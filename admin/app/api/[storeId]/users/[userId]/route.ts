import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";
import { clerkClient } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";

export async function DELETE(
    req: Request,
    { params }: { params: { userId: string, storeId: string } }
  ) {
    try {
      const { userId } = auth();
  
      if (!userId) {
        return new NextResponse("Unauthenticated", { status: 403 });
      }
  
      if (!params.userId) {
        return new NextResponse("User id is required", { status: 400 });
      }

      await clerkClient.users.deleteUser(params.userId);
  
      const deletedUser = await prismadb.user.delete({
        where: {
          id: params.userId
        },
      });

      console.log("user deleted", deletedUser)
    
      return NextResponse.json(deletedUser);
    } catch (error) {
      console.log('[PRODUCT_DELETE]', error);
      return new NextResponse("Internal error", { status: 500 });
    }
  };