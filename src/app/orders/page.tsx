"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, ChevronUp, Download, Eye } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Sample order data
const orders = [
  {
    id: "ORD-2024-1001",
    date: "2024-04-15",
    status: "Delivered",
    total: 149.97,
    items: 3,
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping",
    trackingNumber: "TRK123456789",
    itemsList: [
      { id: "1", name: "Premium Cotton T-Shirt", quantity: 2, price: 29.99 },
      { id: "4", name: "Smart Fitness Watch", quantity: 1, price: 89.99 },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  },
  {
    id: "ORD-2024-1002",
    date: "2024-04-10",
    status: "Shipped",
    total: 79.99,
    items: 1,
    paymentMethod: "PayPal",
    shippingMethod: "Express Shipping",
    trackingNumber: "TRK987654321",
    itemsList: [{ id: "2", name: "Wireless Bluetooth Headphones", quantity: 1, price: 79.99 }],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  },
  {
    id: "ORD-2024-1003",
    date: "2024-04-05",
    status: "Processing",
    total: 124.98,
    items: 2,
    paymentMethod: "Credit Card",
    shippingMethod: "Standard Shipping",
    itemsList: [
      { id: "3", name: "Leather Crossbody Bag", quantity: 1, price: 79.99 },
      { id: "5", name: "Slim Fit Jeans", quantity: 1, price: 44.99 },
    ],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  },
  {
    id: "ORD-2024-1004",
    date: "2024-03-28",
    status: "Delivered",
    total: 39.99,
    items: 1,
    paymentMethod: "PayPal",
    shippingMethod: "Standard Shipping",
    trackingNumber: "TRK456789123",
    itemsList: [{ id: "7", name: "Wireless Charging Pad", quantity: 1, price: 39.99 }],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  },
  {
    id: "ORD-2024-1005",
    date: "2024-03-20",
    status: "Cancelled",
    total: 89.99,
    items: 1,
    paymentMethod: "Credit Card",
    itemsList: [{ id: "8", name: "Running Shoes", quantity: 1, price: 89.99 }],
    shippingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
    billingAddress: {
      name: "John Doe",
      street: "123 Main St",
      city: "New York",
      state: "NY",
      zip: "10001",
      country: "USA",
    },
  },
]

export default function OrdersPage() {
  const [expandedOrder, setExpandedOrder] = useState(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  // Filter orders based on search query and status filter
  const filteredOrders = orders.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || order.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  const toggleOrderDetails = (orderId:any) => {
    if (expandedOrder === orderId) {
      setExpandedOrder(null)
    } else {
      setExpandedOrder(orderId)
    }
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">My Orders</h1>
        <p className="text-muted-foreground">View and manage your order history</p>
      </div>

      <Tabs defaultValue="orders" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:w-auto">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          <TabsTrigger value="billing">Billing & Shipping</TabsTrigger>
        </TabsList>

        <TabsContent value="orders" className="mt-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <CardTitle>Order History</CardTitle>
                  <CardDescription>View and track your recent orders</CardDescription>
                </div>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <Input
                    placeholder="Search orders..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full sm:w-[200px]"
                  />
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-full sm:w-[150px]">
                      <SelectValue placeholder="Filter by status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Orders</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[100px]">Order ID</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredOrders.length > 0 ? (
                      filteredOrders.map((order) => (
                        <>
                          <TableRow key={order.id}>
                            <TableCell className="font-medium">{order.id}</TableCell>
                            <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                            <TableCell>
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                                  order.status === "Delivered"
                                    ? "bg-green-100 text-green-800"
                                    : order.status === "Shipped"
                                      ? "bg-blue-100 text-blue-800"
                                      : order.status === "Processing"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : order.status === "Cancelled"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-gray-100 text-gray-800"
                                }`}
                              >
                                {order.status}
                              </span>
                            </TableCell>
                            <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
                            <TableCell className="text-right">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleOrderDetails(order.id)}
                                aria-label={expandedOrder === order.id ? "Hide details" : "Show details"}
                              >
                                {expandedOrder === order.id ? (
                                  <ChevronUp className="h-4 w-4" />
                                ) : (
                                  <ChevronDown className="h-4 w-4" />
                                )}
                              </Button>
                            </TableCell>
                          </TableRow>
                          {expandedOrder === order.id && (
                            <TableRow>
                              <TableCell colSpan={5} className="p-0">
                                <div className="bg-muted/50 p-4">
                                  <div className="grid gap-4 md:grid-cols-2">
                                    <div>
                                      <h4 className="mb-2 font-medium">Order Details</h4>
                                      <dl className="grid grid-cols-2 gap-1 text-sm">
                                        <dt className="text-muted-foreground">Items:</dt>
                                        <dd>{order.itemsList.length}</dd>
                                        <dt className="text-muted-foreground">Payment Method:</dt>
                                        <dd>{order.paymentMethod}</dd>
                                        <dt className="text-muted-foreground">Shipping Method:</dt>
                                        <dd>{order.shippingMethod}</dd>
                                        {order.trackingNumber && (
                                          <>
                                            <dt className="text-muted-foreground">Tracking Number:</dt>
                                            <dd>{order.trackingNumber}</dd>
                                          </>
                                        )}
                                      </dl>
                                    </div>
                                    <div>
                                      <h4 className="mb-2 font-medium">Items</h4>
                                      <ul className="space-y-1 text-sm">
                                        {order.itemsList?.map((item:any) => (
                                          <li key={item.id} className="flex justify-between">
                                            <span>
                                              {item.quantity} x {item.name}
                                            </span>
                                            <span>${(item.price * item.quantity).toFixed(2)}</span>
                                          </li>
                                        ))}
                                      </ul>
                                    </div>
                                  </div>
                                  <div className="mt-4 flex flex-wrap gap-2">
                                    <Button size="sm" variant="outline" asChild>
                                      <Link href={`/orders/${order.id}`}>
                                        <Eye className="mr-2 h-4 w-4" />
                                        View Details
                                      </Link>
                                    </Button>
                                    {order.status === "Delivered" && (
                                      <Button size="sm" variant="outline">
                                        <Download className="mr-2 h-4 w-4" />
                                        Invoice
                                      </Button>
                                    )}
                                  </div>
                                </div>
                              </TableCell>
                            </TableRow>
                          )}
                        </>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={5} className="h-24 text-center">
                          No orders found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="mt-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Billing Information</CardTitle>
                <CardDescription>Manage your billing details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium">Default Billing Address</h4>
                    <address className="not-italic text-muted-foreground">
                      John Doe
                      <br />
                      123 Main St
                      <br />
                      New York, NY 10001
                      <br />
                      USA
                    </address>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Payment Methods</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 rounded bg-muted"></div>
                          <div>
                            <p className="font-medium">•••• •••• •••• 4242</p>
                            <p className="text-sm text-muted-foreground">Expires 12/25</p>
                          </div>
                        </div>
                        <span className="rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          Default
                        </span>
                      </div>
                      <div className="flex items-center justify-between rounded-md border p-3">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-16 rounded bg-muted"></div>
                          <div>
                            <p className="font-medium">PayPal</p>
                            <p className="text-sm text-muted-foreground">johndoe@example.com</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Edit Billing Information</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Shipping Information</CardTitle>
                <CardDescription>Manage your shipping details</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="mb-2 font-medium">Default Shipping Address</h4>
                    <address className="not-italic text-muted-foreground">
                      John Doe
                      <br />
                      123 Main St
                      <br />
                      New York, NY 10001
                      <br />
                      USA
                    </address>
                  </div>
                  <div>
                    <h4 className="mb-2 font-medium">Additional Addresses</h4>
                    <div className="space-y-2">
                      <div className="rounded-md border p-3">
                        <div className="flex items-center justify-between">
                          <p className="font-medium">Work</p>
                          <span className="rounded-full bg-muted px-2 py-1 text-xs font-medium">Alternative</span>
                        </div>
                        <address className="mt-1 not-italic text-muted-foreground">
                          John Doe
                          <br />
                          456 Office Blvd
                          <br />
                          New York, NY 10002
                          <br />
                          USA
                        </address>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline">Edit Shipping Information</Button>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  )
}
