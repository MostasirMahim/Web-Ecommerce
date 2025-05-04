"use client"

import { useState, useEffect } from "react"
import { Minus, Plus, ShoppingCart, Trash2 } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"

// Dummy cart data
const dummyCartItems = [
  {
    id: "1",
    name: "Premium Cotton T-Shirt",
    price: 29.99,
    discountPercentage: 0,
    image: "/placeholder.svg?height=400&width=400",
    quantity: 2,
    color: "#000000",
    size: "M",
  },
  {
    id: "2",
    name: "Wireless Bluetooth Headphones",
    price: 199.99,
    discountPercentage: 15,
    image: "/placeholder.svg?height=400&width=400",
    quantity: 1,
    color: "#3B82F6",
    size: null,
  },
  {
    id: "4",
    name: "Smart Fitness Watch",
    price: 149.99,
    discountPercentage: 10,
    image: "/placeholder.svg?height=400&width=400",
    quantity: 1,
    color: "#000000",
    size: null,
  },
]

export default function CartPage() {
  const [cartItems, setCartItems] = useState([])
  const { toast } = useToast()

  // Initialize cart with dummy data
  useEffect(() => {
    setCartItems(dummyCartItems)
  }, [])

  // Calculate total price
  const calculateTotalPrice = () => {
    return cartItems.reduce((total, item) => {
      const itemPrice = item.discountPercentage > 0 ? item.price * (1 - item.discountPercentage / 100) : item.price
      return total + itemPrice * item.quantity
    }, 0)
  }

  // Update quantity
  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return

    setCartItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))

    toast({
      title: "Cart updated",
      description: "Item quantity has been updated.",
    })
  }

  // Remove item
  const removeItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id))

    toast({
      title: "Item removed",
      description: "Item has been removed from your cart.",
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="mb-8 text-3xl font-bold">Shopping Cart</h1>
      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center rounded-lg border border-dashed p-12 text-center">
              <ShoppingCart className="mb-4 h-12 w-12 text-muted-foreground" />
              <h2 className="mb-2 text-xl font-semibold">Your cart is empty</h2>
              <p className="mb-6 text-muted-foreground">Looks like you haven't added anything to your cart yet.</p>
              <Button asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <Card key={`${item.id}-${item.color}-${item.size}`}>
                  <CardContent className="p-4">
                    <div className="flex flex-col gap-4 sm:flex-row">
                      <div className="relative h-24 w-24 overflow-hidden rounded-md">
                        <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                      </div>
                      <div className="flex flex-1 flex-col">
                        <div className="flex flex-col justify-between sm:flex-row">
                          <div>
                            <h3 className="font-medium">{item.name}</h3>
                            <div className="mt-1 text-sm text-muted-foreground">
                              {item.color && (
                                <span className="flex items-center gap-1">
                                  Color:
                                  <span
                                    className="inline-block h-3 w-3 rounded-full"
                                    style={{ backgroundColor: item.color }}
                                  ></span>
                                </span>
                              )}
                              {item.size && <span className="ml-2">Size: {item.size}</span>}
                            </div>
                          </div>
                          <div className="mt-2 text-right sm:mt-0">
                            <div className="font-medium">
                              {item.discountPercentage > 0 ? (
                                <>
                                  ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                                  <span className="ml-2 text-sm text-muted-foreground line-through">
                                    ${item.price.toFixed(2)}
                                  </span>
                                </>
                              ) : (
                                `$${item.price.toFixed(2)}`
                              )}
                            </div>
                            <div className="mt-1 text-sm font-medium text-muted-foreground">
                              $
                              {(
                                (item.discountPercentage > 0
                                  ? item.price * (1 - item.discountPercentage / 100)
                                  : item.price) * item.quantity
                              ).toFixed(2)}
                            </div>
                          </div>
                        </div>
                        <div className="mt-4 flex flex-col items-start justify-between gap-2 sm:flex-row sm:items-center">
                          <div className="flex items-center">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-r-none"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                            >
                              <Minus className="h-3 w-3" />
                              <span className="sr-only">Decrease quantity</span>
                            </Button>
                            <div className="flex h-8 w-12 items-center justify-center border-y border-input bg-background text-center text-sm">
                              {item.quantity}
                            </div>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-l-none"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="h-3 w-3" />
                              <span className="sr-only">Increase quantity</span>
                            </Button>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 px-2 text-muted-foreground"
                            onClick={() => removeItem(item.id)}
                          >
                            <Trash2 className="mr-1 h-4 w-4" />
                            Remove
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-semibold">Order Summary</h2>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Subtotal ({cartItems.length} items)</span>
                  <span>${calculateTotalPrice().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Estimated Tax</span>
                  <span>${(calculateTotalPrice() * 0.08).toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Shipping</span>
                  <span>{calculateTotalPrice() > 100 ? "Free" : "$10.00"}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-lg font-semibold">
                  <span>Total</span>
                  <span>
                    $
                    {(
                      calculateTotalPrice() +
                      calculateTotalPrice() * 0.08 +
                      (calculateTotalPrice() > 100 ? 0 : 10)
                    ).toFixed(2)}
                  </span>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col gap-2 p-6 pt-0">
              <Button className="w-full" size="lg" asChild>
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
              <Button variant="outline" className="w-full" size="lg" asChild>
                <Link href="/products">Continue Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  )
}
