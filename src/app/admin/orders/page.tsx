"use client"

import { useState } from "react"
import { Download } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import AdminHeader from "@/components/admin/admin-header"
import OrdersTable from "@/components/admin/orders-table"

export default function AdminOrders() {
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <AdminHeader title="Orders" description="Manage customer orders" />

      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
        <Tabs defaultValue="all" className="w-full" onValueChange={setFilter}>
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
            <TabsTrigger value="all">All Orders</TabsTrigger>
            <TabsTrigger value="processing">Processing</TabsTrigger>
            <TabsTrigger value="shipped">Shipped</TabsTrigger>
            <TabsTrigger value="delivered">Delivered</TabsTrigger>
            <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-4">
            <OrdersTable filter={filter} search={search} />
          </TabsContent>
          <TabsContent value="processing" className="mt-4">
            <OrdersTable filter={filter} search={search} />
          </TabsContent>
          <TabsContent value="shipped" className="mt-4">
            <OrdersTable filter={filter} search={search} />
          </TabsContent>
          <TabsContent value="delivered" className="mt-4">
            <OrdersTable filter={filter} search={search} />
          </TabsContent>
          <TabsContent value="cancelled" className="mt-4">
            <OrdersTable filter={filter} search={search} />
          </TabsContent>
        </Tabs>
      </div>

      <div className="flex w-full flex-col gap-2 md:w-auto md:flex-row">
        <Input
          placeholder="Search orders..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="md:w-[200px]"
        />
        <Select defaultValue="30d">
          <SelectTrigger className="md:w-[180px]">
            <SelectValue placeholder="Time period" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="24h">Last 24 hours</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export
        </Button>
      </div>
    </div>
  )
}
