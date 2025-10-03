"use client"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import ProductsTable from "@/components/admin/products-table"
import { useQuery } from "@tanstack/react-query"
import { useToast } from "@/hooks/use-toast"
import { getStoreProducts } from "@/actions/admin.action"
export default function ProductsPage() {
  const {toast} = useToast()
    const { data: Products, isLoading } = useQuery<Array<Record<string, any>> | []>({
      queryKey: ["StoreProducts"],
      queryFn: async () => {
        try {
          const res = await getStoreProducts();
          if (!res.success) throw new Error(res.error || "Something went wrong");
          return res.data || [];
        } catch (error) {
          console.error("Error fetching user stats:", error);
          toast({
            title: "Error",
            description: `${error}`,
            variant: "destructive",
          })
          return [];
        }
      },
    });

    console.log(Products);
  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Products</h1>
        <Button asChild>
          <Link href="/admin/products/add">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Product
          </Link>
        </Button>
      </div>
      <ProductsTable />
    </div>
  )
}
