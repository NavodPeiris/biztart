import prismadb from "@/lib/prismadb";

import { Register } from "./components/user-form";

const SizePage = async ({
  params
}: {
  params: { sizeId: string }
}) => {

  return ( 
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Register/>
      </div>
    </div>
  );
}

export default SizePage;
