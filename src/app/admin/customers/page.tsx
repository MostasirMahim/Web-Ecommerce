"use client"

import { useState } from "react"
import { Download, UserPlus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminHeader from "@/components/admin/admin-header"
import CustomersTable from "@/components/admin/customers-table"

export default function AdminCustomers() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  return (
    <div className="flex-1 space-y-4">
      <AdminHeader title="Customers" description="Manage your customer accounts" />

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <div className="w-full">
          <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
            <TabsList>
              <TabsTrigger value="all">All Customers</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="new">New</TabsTrigger>
              <TabsTrigger value="inactive">Inactive</TabsTrigger>
            </TabsList>
            <div className="mt-4">
              <TabsContent value="all">
                <CustomersTable filter="all" search={search} />
              </TabsContent>
              <TabsContent value="active">
                <CustomersTable filter="active" search={search} />
              </TabsContent>
              <TabsContent value="new">
                <CustomersTable filter="new" search={search} />
              </TabsContent>
              <TabsContent value="inactive">
                <CustomersTable filter="inactive" search={search} />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
          <Input
            placeholder="Search customers..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="md:w-[200px]"
          />
          <Select defaultValue="joined">
            <SelectTrigger className="md:w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="joined">Date Joined</SelectItem>
                <SelectItem value="name">Name</SelectItem>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="spent">Total Spent</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button>
            <UserPlus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>
    </div>
  )
}
