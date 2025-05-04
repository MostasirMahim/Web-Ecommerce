"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

// Sample data
const sampleOrders = [
  {
    id: "ORD-7652",
    customer: "John Smith",
    date: "2023-05-01",
    total: 249.99,
    status: "completed",
  },
  {
    id: "ORD-7651",
    customer: "Sarah Johnson",
    date: "2023-05-01",
    total: 129.95,
    status: "processing",
  },
  {
    id: "ORD-7650",
    customer: "Michael Brown",
    date: "2023-04-30",
    total: 89.99,
    status: "completed",
  },
  {
    id: "ORD-7649",
    customer: "Emily Davis",
    date: "2023-04-30",
    total: 174.5,
    status: "pending",
  },
  {
    id: "ORD-7648",
    customer: "Robert Wilson",
    date: "2023-04-29",
    total: 349.99,
    status: "cancelled",
  },
]

export default function RecentOrdersTable() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setOrders(sampleOrders)
      setLoading(false)
    }, 500)
  }, [])

  // Function to format date
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "short", day: "numeric" }
    return new Date(dateString).toLocaleDateString(undefined, options as any)
  }

  // Function to get status badge variant
  const getStatusVariant = (status) => {
    switch (status) {
      case "completed":
        return "success"
      case "processing":
        return "warning"
      case "pending":
        return "secondary"
      case "cancelled":
        return "destructive"
      default:
        return "outline"
    }
  }

  if (loading) {
    return (
      <div className="flex h-[300px] w-full items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order ID</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead className="hidden md:table-cell">Date</TableHead>
            <TableHead className="text-right">Total</TableHead>
            <TableHead className="text-center">Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {orders.map((order) => (
            <TableRow key={order.id}>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.customer}</TableCell>
              <TableCell className="hidden md:table-cell">{formatDate(order.date)}</TableCell>
              <TableCell className="text-right">${order.total.toFixed(2)}</TableCell>
              <TableCell className="text-center">
                <Badge variant={getStatusVariant(order.status) as any} className="capitalize">
                  {order.status}
                </Badge>
              </TableCell>
              <TableCell className="text-right">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                  <span className="sr-only">View order {order.id}</span>
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
