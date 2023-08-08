import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';

export async function POST(
  req: Request,
) {
  try {
    const body = await req.json();

    const { userId } = auth()

    const { email, password, level} = body;

    if(!userId){
      console.log("no user")
    }
    else{
      const createdby = userId

      const user = await prismadb.user.create({
          data: {
            id: userId,
            email: email,
            password: password,
            level: level,
            createdby: createdby
          }
      });
          
      console.log("user created : ", user);
        
      return NextResponse.json(user);
    } 
    
  } catch (error) {
    console.log('[STORES_POST]', error);
    return new NextResponse("Internal error", { status: 500 });
  }
};
