import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();

    const { email, password} = body;

    const user = await prismadb.user.findFirst({
        where: {
          email,
          password
        }
    });

    if(!user){
        console.log("no user found");
        return NextResponse.json("message : no user found");
    }
      
    return NextResponse.json(user);
    
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
