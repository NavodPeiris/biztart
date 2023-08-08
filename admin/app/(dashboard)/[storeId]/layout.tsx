import { redirect } from 'next/navigation';
import { auth } from '@clerk/nextjs';

import Navbar from '@/components/navbar'
import prismadb from '@/lib/prismadb';

export default async function DashboardLayout({
  children,
  params
}: {
  children: React.ReactNode
  params: { storeId: string }
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
        id: params.storeId,
        userId: userId,
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

  if (!store) {
    redirect('/');
  };

  return (
    <>
      <Navbar />
      {children}
    </>
  );
};
