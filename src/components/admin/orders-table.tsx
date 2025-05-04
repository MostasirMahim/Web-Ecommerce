"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowUpDown, Eye, MoreHorizontal, Package, Printer } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast"

// Sample order data
const orders = [
  {
    id: "ORD-2024-1001",
    customer: "John Doe",
    email: "john.doe@example.com",
    date: new Date(2024, 3, 15),
    status: "Delivered",
    total: 149.97,
    items: 3,
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "ORD-2024-1002",
    customer: "Sarah Johnson",
    email: "sarah.j@example.com",
    date: new Date(2024, 3, 14),
    status: "Shipped",
    total: 79.99,
    items: 1,
    paymentMethod: "PayPal",
    shippingMethod: "Express Shipping",
  },
  {
    id: "ORD-2024-1003",
    customer: "Michael Brown",
    email: "michael.b@example.com",
    date: new Date(2024, 3, 14),
    status: "Processing",
    total: 124.98,
    items: 2,
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "ORD-2024-1004",
    customer: "Emily Wilson",
    email: "emily.w@example.com",
    date: new Date(2024, 3, 13),
    status: "Delivered",
    total: 39.99,
    items: 1,
    paymentMethod: "PayPal",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "ORD-2024-1005",
    customer: "David Miller",
    email: "david.m@example.com",
    date: new Date(2024, 3, 12),
    status: "Cancelled",
    total: 89.99,
    items: 1,
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "ORD-2024-1006",
    customer: "Jessica Taylor",
    email: "jessica.t@example.com",
    date: new Date(2024, 3, 11),
    status: "Delivered",
    total: 199.98,
    items: 2,
    paymentMethod: "Credit Card",
    shippingMethod: "Express Shipping",
  },
  {
    id: "ORD-2024-1007",
    customer: "Robert Anderson",
    email: "robert.a@example.com",
    date: new Date(2024, 3, 10),
    status: "Processing",
    total: 59.99,
    items: 1,
    paymentMethod: "PayPal",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "ORD-2024-1008",
    customer: "Jennifer White",
    email: "jennifer.w@example.com",
    date: new Date(2024, 3, 9),
    status: "Shipped",
    total: 129.97,
    items: 3,
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "ORD-2024-1009",
    customer: "Thomas Harris",
    email: "thomas.h@example.com",
    date: new Date(2024, 3, 8),
    status: "Delivered",
    total: 49.99,
    items: 1,
    paymentMethod: "PayPal",
    shippingMethod: "Standard Shipping",
  },
  {
    id: "ORD-2024-1010",
    customer: "Lisa Martin",
    email: "lisa.m@example.com",
    date: new Date(2024, 3, 7),
    status: "Cancelled",
    total: 74.99,
    items: 1,
    paymentMethod: "Credit Card",
    shippingMethod: "Express Shipping",
  },
]

export default function OrdersTable({ filter = "all", search = "" }) {
  const { toast } = useToast()
  const [selectedOrders, setSelectedOrders] = useState([])

  // Filter orders based on filter and search
  const filteredOrders = orders.filter((order) => {
    // Filter by status
    if (filter !== "all" && filter !== order.status.toLowerCase()) {
      return false
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      return (
        order.id.toLowerCase().includes(searchLower) ||
        order.customer.toLowerCase().includes(searchLower) ||
        order.email.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedOrders(filteredOrders.map((order) => order.id))
    } else {
      setSelectedOrders([])
    }
  }

  const toggleSelectOrder = (orderId, checked) => {
    if (checked) {
      setSelectedOrders([...selectedOrders, orderId])
    } else {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId))
    }
  }

  const handleUpdateStatus = (orderId, status) => {
    // In a real app, you would call an API to update the order status
    toast({
      title: "Order status updated",
      description: `Order ${orderId} has been marked as ${status}.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={filteredOrders.length > 0 && selectedOrders.length === filteredOrders.length}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="h-8 p-0 hover:bg-transparent">
                Order ID
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>
              <Button variant="ghost" className="h-8 p-0 hover:bg-transparent">
                Date
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>
              <Button variant="ghost" className="h-8 p-0 hover:bg-transparent">
                Total
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredOrders.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No orders found.
              </TableCell>
            </TableRow>
          ) : (
            filteredOrders.map((order) => (
              <TableRow key={order.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedOrders.includes(order.id)}
                    onCheckedChange={(checked) => toggleSelectOrder(order.id, checked)}
                    aria-label={`Select order ${order.id}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{order.id}</TableCell>
                <TableCell>
                  <div>
                    <div>{order.customer}</div>
                    <div className="text-xs text-muted-foreground">{order.email}</div>
                  </div>
                </TableCell>
                <TableCell>{format(order.date, "MMM d, yyyy")}</TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      order.status === "Delivered"
                        ? "border-green-200 bg-green-100 text-green-800"
                        : order.status === "Shipped"
                          ? "border-blue-200 bg-blue-100 text-blue-800"
                          : order.status === "Processing"
                            ? "border-yellow-200 bg-yellow-100 text-yellow-800"
                            : order.status === "Cancelled"
                              ? "border-red-200 bg-red-100 text-red-800"
                              : ""
                    }
                  >
                    {order.status}
                  </Badge>
                </TableCell>
                <TableCell>{order.items}</TableCell>
                <TableCell>${order.total.toFixed(2)}</TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Actions</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Actions</DropdownMenuLabel>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/orders/${order.id}`}>
                          <Eye className="mr-2 h-4 w-4" />
                          View details
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <Printer className="mr-2 h-4 w-4" />
                        Print invoice
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuLabel>Update Status</DropdownMenuLabel>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Processing")}>
                        Mark as Processing
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Shipped")}>
                        <Package className="mr-2 h-4 w-4" />
                        Mark as Shipped
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Delivered")}>
                        Mark as Delivered
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleUpdateStatus(order.id, "Cancelled")}>
                        Mark as Cancelled
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  )
}
