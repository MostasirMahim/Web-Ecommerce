"use client"
import Link from "next/link"
import { Heart, ShoppingCart, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useCartStore, useWishlistStore } from "@/lib/store"

export default function WishlistPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, removeItem } = useWishlistStore()
  const { addItem } = useCartStore()

  const handleAddToCart = (item) => {
    addItem({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: 1,
      discountPercentage: item.discountPercentage,
    })

    toast({
      title: "Added to cart",
      description: `${item.name} has been added to your cart.`,
    })
  }

  const handleRemoveFromWishlist = (id, name) => {
    removeItem(id)

    toast({
      title: "Removed from wishlist",
      description: `${name} has been removed from your wishlist.`,
    })
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">My Wishlist</h1>
        <p className="text-muted-foreground">Items you've saved for later</p>
      </div>

      {items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <Heart className="h-16 w-16 text-muted-foreground" />
          <h2 className="mt-4 text-xl font-medium">Your wishlist is empty</h2>
          <p className="mt-2 text-muted-foreground">
            Browse our products and add items to your wishlist to save them for later.
          </p>
          <Button className="mt-6" asChild>
            <Link href="/products">Browse Products</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <Link href={`/products/${item.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                  {item.discountPercentage > 0 && (
                    <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
                      {item.discountPercentage}% OFF
                    </div>
                  )}
                </div>
              </Link>
              <CardContent className="p-4">
                <h3 className="font-medium">
                  <Link href={`/products/${item.id}`} className="hover:underline">
                    {item.name}
                  </Link>
                </h3>
                <p className="text-sm text-gray-500">{item.category}</p>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    {item.discountPercentage > 0 ? (
                      <>
                        <span className="font-bold">
                          ${(item.price * (1 - item.discountPercentage / 100)).toFixed(2)}
                        </span>
                        <span className="text-sm text-gray-500 line-through">${item.price.toFixed(2)}</span>
                      </>
                    ) : (
                      <span className="font-bold">${item.price.toFixed(2)}</span>
                    )}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex items-center justify-between p-4 pt-0">
                <Button size="sm" variant="outline" onClick={() => handleAddToCart(item)}>
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to cart
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-red-500 hover:text-red-600"
                  onClick={() => handleRemoveFromWishlist(item.id, item.name)}
                >
                  <Trash2 className="h-4 w-4" />
                  <span className="sr-only">Remove</span>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
