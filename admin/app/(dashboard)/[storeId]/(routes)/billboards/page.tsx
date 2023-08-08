import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { BillboardColumn } from "./components/columns"
import { BillboardClient } from "./components/client";
import { auth } from "@clerk/nextjs";

const BillboardsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {

  const {userId} = auth();

  var level = "admin"

  if(!userId){
    console.log("no user")
  }
  else{
    const userInDB = await prismadb.user.findFirst({
      where: {
        id: userId
      }
    })

    if(userInDB?.level){
      level = userInDB.level
    }
  }

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
    id: item.id,
    label: item.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <BillboardClient data={formattedBillboards} level={level}/>
      </div>
    </div>
  );
};

export default BillboardsPage;
