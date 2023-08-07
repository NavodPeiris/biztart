import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';
import { clerkClient } from '@clerk/nextjs';

import prismadb from '@/lib/prismadb';

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode
}) {
  
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  const userInDB = await prismadb.user.findFirst({
    where: {
      id: userId
    }
  })

  var store

  if(userInDB?.level == "admin"){
    store = await prismadb.store.findFirst({
      where: {
        userId: userId
      }
    });
  }
  else{
    const adminUserId = userInDB?.createdby
    store = await prismadb.store.findFirst({
      where: {
        userId: adminUserId
      }
    });
  }

  if (store) {
    redirect(`/${store.id}`);
  };

  return (
    <>
      {children}
    </>
  );
};
