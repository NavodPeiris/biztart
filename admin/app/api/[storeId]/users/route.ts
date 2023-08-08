import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs';
import prismadb from '@/lib/prismadb';
import { redirect } from 'next/navigation';
import { clerkClient } from "@clerk/nextjs/server";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const body = await req.json();

    const { userId } = auth()

    if (!params.storeId) {
      return new NextResponse("Store id is required", { status: 400 });
    }

    const { email, password, level} = body;

    let emails = [email]

    const userParams = {
      emailAddress: emails,
      password: password
    }

    const newUser = await clerkClient.users.createUser(userParams)

    console.log('New user created:', newUser);

    const newUserId = newUser.id

    if(!userId){
      console.log("no user")
    }
    else{
      const createdby = userId

      const user = await prismadb.user.create({
          data: {
            id: newUserId,
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
