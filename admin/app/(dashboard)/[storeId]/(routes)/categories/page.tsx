import { format } from "date-fns";

import prismadb from "@/lib/prismadb";

import { CategoryColumn } from "./components/columns"
import { CategoriesClient } from "./components/client";
import { auth } from "@clerk/nextjs";

const CategoriesPage = async ({
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

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    },
    include: {
      billboard: true,
    },
    orderBy: {
      createdAt: 'desc'
    }
  });

  const formattedCategories: CategoryColumn[] = categories.map((item) => ({
    id: item.id,
    name: item.name,
    billboardLabel: item.billboard.label,
    createdAt: format(item.createdAt, 'MMMM do, yyyy'),
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoriesClient data={formattedCategories} level={level}/>
      </div>
    </div>
  );
};

export default CategoriesPage;
