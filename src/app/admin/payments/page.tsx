"use client"
import { format } from "date-fns"
import { Filter } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import AdminHeader from "@/components/admin/admin-header"

// Sample payment data
const payments = [
  {
    id: "PAY-2024-1001",
    orderId: "ORD-2024-1001",
    customer: "John Doe",
    date: new Date(2024, 3, 15),
    amount: 149.97,
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "PAY-2024-1002",
    orderId: "ORD-2024-1002",
    customer: "Sarah Johnson",
    date: new Date(2024, 3, 14),
    amount: 79.99,
    method: "PayPal",
    status: "Completed",
  },
  {
    id: "PAY-2024-1003",
    orderId: "ORD-2024-1003",
    customer: "Michael Brown",
    date: new Date(2024, 3, 14),
    amount: 124.98,
    method: "Credit Card",
    status: "Pending",
  },
  {
    id: "PAY-2024-1004",
    orderId: "ORD-2024-1004",
    customer: "Emily Wilson",
    date: new Date(2024, 3, 13),
    amount: 39.99,
    method: "PayPal",
    status: "Completed",
  },
  {
    id: "PAY-2024-1005",
    orderId: "ORD-2024-1005",
    customer: "David Miller",
    date: new Date(2024, 3, 12),
    amount: 89.99,
    method: "Credit Card",
    status: "Failed",
  },
  {
    id: "PAY-2024-1006",
    orderId: "ORD-2024-1006",
    customer: "Jessica Taylor",
    date: new Date(2024, 3, 11),
    amount: 199.98,
    method: "Credit Card",
    status: "Completed",
  },
  {
    id: "PAY-2024-1007",
    orderId: "ORD-2024-1007",
    customer: "Robert Anderson",
    date: new Date(2024, 3, 10),
    amount: 99.99,
    method: "Credit Card",
    status: "Completed",
  },
]

const PaymentsPage = () => {
  return (
    <>
      <AdminHeader title="Payments" />
      <Card>
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>Here you can manage and view all payments.</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter Section */}
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <Input type="text" placeholder="Search payments..." />
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Select>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Payment Method" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="creditCard">Credit Card</SelectItem>
                  <SelectItem value="paypal">PayPal</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            <Button>
              <Filter className="mr-2 h-4 w-4" />
              Filter
            </Button>
          </div>

          {/* Payments Table */}
          <div className="mt-6 overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                  <TableHead>Method</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {payments.map((payment) => (
                  <TableRow key={payment.id}>
                    <TableCell>{payment.id}</TableCell>
                    <TableCell>{payment.orderId}</TableCell>
                    <TableCell>{payment.customer}</TableCell>
                    <TableCell>{format(payment.date, "MMM d, yyyy")}</TableCell>
                    <TableCell className="text-right">${payment.amount.toFixed(2)}</TableCell>
                    <TableCell>{payment.method}</TableCell>
                    <TableCell>{payment.status}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}

export default PaymentsPage
