import { UserButton, auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import StoreSwitcher from "@/components/store-switcher";
import { MainNav } from "@/components/main-nav";
import { ThemeToggle } from "@/components/theme-toggle";
import prismadb from "@/lib/prismadb";
import { ContentNav } from "@/components/content-nav";
import { ProductNav} from "@/components/product-nav";

const Navbar = async () => {
  const { userId } = auth();

  if (!userId) {
    redirect('/sign-in');
  }

  var stores

  const userInDB = await prismadb.user.findFirst({
    where: {
      id: userId
    }
  })

  const level = userInDB?.level

  if(level == "admin"){
    stores = await prismadb.store.findMany({
      where: {
        userId: userId,
      }
    });
  }
  else {
    const adminUserId = userInDB?.createdby
    stores = await prismadb.store.findMany({
      where: {
        userId: adminUserId,
      }
    });
  }


  return ( 
    <div className="border-b">
      <div className="flex h-16 items-center px-4">
        <StoreSwitcher items={stores} />
        {level == "admin" && (
          <MainNav className="mx-6"/>
        )}
        {level == "content" && (
          <ContentNav className="mx-6"/>
        )}
        {level == "product" && (
          <ProductNav className="mx-6"/>
        )}
        <div className="ml-auto flex items-center space-x-4">
          <ThemeToggle />
          <UserButton afterSignOutUrl="/" />
        </div>
      </div>
    </div>
  );
};
 
export default Navbar;
