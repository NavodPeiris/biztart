import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { SizeColumn } from "./components/columns"
import { SizesClient } from "./components/client";
import { auth } from "@clerk/nextjs";

const SizesPage = async ({
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

  const sizes = await prismadb.size.findMany({
    where: {
      storeId: params.storeId
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedSizes: SizeColumn[] = sizes.map((item) => ({
    id: item.id,
    name: item.name,
    value: item.value,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <SizesClient data={formattedSizes} level={level}/>
      </div>
    </div>
  );
};

export default SizesPage;
