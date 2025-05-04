"use client"

import { useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AdminHeader from "@/components/admin/admin-header"
import CategoriesTable from "@/components/admin/categories-table"

export default function AdminCategories() {
  const [search, setSearch] = useState("")

  return (
    <div className="flex-1 space-y-4">
      <AdminHeader title="Categories" description="Manage product categories" />

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="flex-1">
          <Input
            placeholder="Search categories..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="max-w-sm"
          />
        </div>
        <Button asChild>
          <Link href="/admin/categories/new">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Category
          </Link>
        </Button>
      </div>

      <CategoriesTable search={search} />
    </div>
  )
}
