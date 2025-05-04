"use client"

import { useState, useEffect } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Sample data
const sampleProducts = [
  {
    id: 1,
    name: "Premium Wireless Headphones",
    category: "Electronics",
    price: 199.99,
    stock: 45,
    sales: 128,
  },
  {
    id: 2,
    name: "Organic Cotton T-Shirt",
    category: "Clothing",
    price: 29.99,
    stock: 120,
    sales: 95,
  },
  {
    id: 3,
    name: "Smart Watch Series 5",
    category: "Electronics",
    price: 299.99,
    stock: 18,
    sales: 87,
  },
  {
    id: 4,
    name: "Leather Wallet",
    category: "Accessories",
    price: 49.99,
    stock: 65,
    sales: 76,
  },
  {
    id: 5,
    name: "Stainless Steel Water Bottle",
    category: "Home",
    price: 24.99,
    stock: 92,
    sales: 68,
  },
]

export default function TopProductsTable() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts(sampleProducts)
      setLoading(false)
    }, 500)
  }, [])

  // Function to determine stock status
  const getStockStatus = (stock) => {
    if (stock <= 20) return { label: "Low", variant: "destructive" }
    if (stock <= 50) return { label: "Medium", variant: "warning" }
    return { label: "High", variant: "success" }
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
            <TableHead>Product</TableHead>
            <TableHead className="hidden md:table-cell">Category</TableHead>
            <TableHead className="text-right">Price</TableHead>
            <TableHead className="text-right">Sales</TableHead>
            <TableHead className="text-right">Stock</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => {
            const stockStatus = getStockStatus(product.stock)

            return (
              <TableRow key={product.id}>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell className="hidden md:table-cell">{product.category}</TableCell>
                <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                <TableCell className="text-right">{product.sales}</TableCell>
                <TableCell className="text-right">
                  <Badge variant={stockStatus.variant as any}>{stockStatus.label}</Badge>
                </TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </div>
  )
}
