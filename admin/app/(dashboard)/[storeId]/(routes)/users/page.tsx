import { format } from "date-fns";

import prismadb from "@/lib/prismadb";
import { formatter } from "@/lib/utils";

import { ProductsClient } from "./components/client";
import { userColumn } from "./components/columns";
import { auth } from "@clerk/nextjs";

const ProductsPage = async ({
  params
}: {
  params: { storeId: string }
}) => {
  const {userId} = auth()

  var users

  if(!userId){
    console.log("no user")
  }
  else{
    users = await prismadb.user.findMany({
      where: {
        createdby: userId
      },
    });
  }
  
  const formattedProducts: userColumn[] = users!.map((item) => ({
    id: item.id,
    email: item.email,
    password: item.password,
    level: item.level
  }));

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductsClient data={formattedProducts} />
      </div>
    </div>
  );
};

export default ProductsPage;
