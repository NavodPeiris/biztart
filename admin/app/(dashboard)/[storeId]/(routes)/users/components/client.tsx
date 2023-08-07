"use client";

import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { ApiList } from "@/components/ui/api-list";
import { useState } from "react";

import { userColumn, columns } from "./columns";

interface ProductsClientProps {
  data: userColumn[];
};

export const ProductsClient: React.FC<ProductsClientProps> = ({
  data
}) => {
  const params = useParams();
  const router = useRouter();

  return (
    
    <>
      <div className="flex items-center justify-between">
        <Heading title={`Users (${data.length})`} description="Manage Users for your store" />
        <Button onClick={() => router.push(`/${params.storeId}/users/new`)}>
          <Plus className="mr-2 h-4 w-4" /> Add New
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} />
      <Separator />
    </>
  );
};
