"use client"

import { useState } from "react"
import Link from "next/link"
import { format } from "date-fns"
import { ArrowUpDown, Mail, MoreHorizontal, User } from "lucide-react"

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

// Sample customer data
const customers = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john.doe@example.com",
    status: "active",
    joinedDate: new Date(2023, 5, 15),
    orders: 12,
    totalSpent: 1249.97,
    lastOrder: new Date(2024, 3, 15),
  },
  {
    id: "CUST-002",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    status: "active",
    joinedDate: new Date(2023, 7, 22),
    orders: 8,
    totalSpent: 879.94,
    lastOrder: new Date(2024, 3, 14),
  },
  {
    id: "CUST-003",
    name: "Michael Brown",
    email: "michael.b@example.com",
    status: "active",
    joinedDate: new Date(2023, 9, 10),
    orders: 5,
    totalSpent: 524.95,
    lastOrder: new Date(2024, 3, 14),
  },
  {
    id: "CUST-004",
    name: "Emily Wilson",
    email: "emily.w@example.com",
    status: "inactive",
    joinedDate: new Date(2023, 2, 5),
    orders: 2,
    totalSpent: 139.98,
    lastOrder: new Date(2023, 11, 13),
  },
  {
    id: "CUST-005",
    name: "David Miller",
    email: "david.m@example.com",
    status: "active",
    joinedDate: new Date(2023, 11, 18),
    orders: 3,
    totalSpent: 289.97,
    lastOrder: new Date(2024, 3, 12),
  },
  {
    id: "CUST-006",
    name: "Jessica Taylor",
    email: "jessica.t@example.com",
    status: "new",
    joinedDate: new Date(2024, 2, 28),
    orders: 1,
    totalSpent: 199.98,
    lastOrder: new Date(2024, 2, 28),
  },
  {
    id: "CUST-007",
    name: "Robert Anderson",
    email: "robert.a@example.com",
    status: "active",
    joinedDate: new Date(2023, 4, 7),
    orders: 9,
    totalSpent: 759.91,
    lastOrder: new Date(2024, 3, 10),
  },
  {
    id: "CUST-008",
    name: "Jennifer White",
    email: "jennifer.w@example.com",
    status: "active",
    joinedDate: new Date(2023, 8, 14),
    orders: 7,
    totalSpent: 629.93,
    lastOrder: new Date(2024, 3, 9),
  },
  {
    id: "CUST-009",
    name: "Thomas Harris",
    email: "thomas.h@example.com",
    status: "inactive",
    joinedDate: new Date(2023, 1, 19),
    orders: 3,
    totalSpent: 149.97,
    lastOrder: new Date(2023, 10, 8),
  },
  {
    id: "CUST-010",
    name: "Lisa Martin",
    email: "lisa.m@example.com",
    status: "new",
    joinedDate: new Date(2024, 3, 1),
    orders: 1,
    totalSpent: 74.99,
    lastOrder: new Date(2024, 3, 7),
  },
]

export default function CustomersTable({ filter = "all", search = "" }) {
  const { toast } = useToast()
  const [selectedCustomers, setSelectedCustomers] = useState([])

  // Filter customers based on filter and search
  const filteredCustomers = customers.filter((customer) => {
    // Filter by status
    if (filter !== "all" && filter !== customer.status) {
      return false
    }

    // Filter by search
    if (search) {
      const searchLower = search.toLowerCase()
      return (
        customer.name.toLowerCase().includes(searchLower) ||
        customer.email.toLowerCase().includes(searchLower) ||
        customer.id.toLowerCase().includes(searchLower)
      )
    }

    return true
  })

  const toggleSelectAll = (checked) => {
    if (checked) {
      setSelectedCustomers(filteredCustomers.map((customer) => customer.id))
    } else {
      setSelectedCustomers([])
    }
  }

  const toggleSelectCustomer = (customerId, checked) => {
    if (checked) {
      setSelectedCustomers([...selectedCustomers, customerId])
    } else {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId))
    }
  }

  const handleSendEmail = (customerId) => {
    // In a real app, you would open an email composer or navigate to an email page
    toast({
      title: "Email composer opened",
      description: `Preparing to send email to customer ${customerId}.`,
    })
  }

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Checkbox
                checked={filteredCustomers.length > 0 && selectedCustomers.length === filteredCustomers.length}
                onCheckedChange={toggleSelectAll}
                aria-label="Select all"
              />
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="h-8 p-0 hover:bg-transparent">
                Customer
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead>
              <Button variant="ghost" className="h-8 p-0 hover:bg-transparent">
                Joined
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="h-8 p-0 hover:bg-transparent">
                Orders
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button variant="ghost" className="h-8 p-0 hover:bg-transparent">
                Total Spent
                <ArrowUpDown className="ml-2 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredCustomers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="h-24 text-center">
                No customers found.
              </TableCell>
            </TableRow>
          ) : (
            filteredCustomers.map((customer) => (
              <TableRow key={customer.id}>
                <TableCell>
                  <Checkbox
                    checked={selectedCustomers.includes(customer.id)}
                    onCheckedChange={(checked) => toggleSelectCustomer(customer.id, checked)}
                    aria-label={`Select customer ${customer.name}`}
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                      <User className="h-5 w-5 text-muted-foreground" />
                    </div>
                    <div>
                      <div className="font-medium">{customer.name}</div>
                      <div className="text-xs text-muted-foreground">{customer.email}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className={
                      customer.status === "active"
                        ? "border-green-200 bg-green-100 text-green-800"
                        : customer.status === "new"
                          ? "border-blue-200 bg-blue-100 text-blue-800"
                          : "border-gray-200 bg-gray-100 text-gray-800"
                    }
                  >
                    {customer.status.charAt(0).toUpperCase() + customer.status.slice(1)}
                  </Badge>
                </TableCell>
                <TableCell>{format(customer.joinedDate, "MMM d, yyyy")}</TableCell>
                <TableCell>{customer.orders}</TableCell>
                <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                <TableCell>{format(customer.lastOrder, "MMM d, yyyy")}</TableCell>
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
                        <Link href={`/admin/customers/${customer.id}`}>
                          <User className="mr-2 h-4 w-4" />
                          View profile
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleSendEmail(customer.id)}>
                        <Mail className="mr-2 h-4 w-4" />
                        Send email
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/customers/${customer.id}/orders`}>View orders</Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem asChild>
                        <Link href={`/admin/customers/${customer.id}/edit`}>Edit customer</Link>
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
