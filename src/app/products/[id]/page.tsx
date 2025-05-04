"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronRight, Heart, Minus, Plus, Share2, ShoppingCart, Star, Truck } from "lucide-react"
import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { products } from "@/lib/data"
import { useCartStore } from "@/lib/store"
import ProductReviews from "@/components/product-reviews"

export default function ProductPage({ params }) {
  const router = useRouter()
  const { toast } = useToast()
  const { addItem } = useCartStore()
  const product = products.find((p) => p.id === params.id) || products[0]
  const [quantity, setQuantity] = useState(1)
  const [selectedImage, setSelectedImage] = useState(0)
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || null)
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null)

  // Related products (same category)
  const relatedProducts = products.filter((p) => p.category === product.category && p.id !== product.id).slice(0, 4)

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      color: selectedColor,
      size: selectedSize,
      discountPercentage: product.discountPercentage,
    })

    toast({
      title: "Added to cart",
      description: `${quantity} × ${product.name} has been added to your cart.`,
    })
  }

  const handleBuyNow = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.images[0],
      quantity,
      color: selectedColor,
      size: selectedSize,
      discountPercentage: product.discountPercentage,
    })

    router.push("/checkout")
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      {/* Breadcrumbs */}
      <nav className="mb-6 flex items-center gap-1 overflow-x-auto text-sm text-muted-foreground">
        <Link href="/" className="hover:text-foreground">
          Home
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href="/products" className="hover:text-foreground">
          Products
        </Link>
        <ChevronRight className="h-4 w-4" />
        <Link href={`/categories/${product.category.toLowerCase()}`} className="hover:text-foreground">
          {product.category}
        </Link>
        <ChevronRight className="h-4 w-4" />
        <span className="truncate text-foreground">{product.name}</span>
      </nav>

      {/* Product Details */}
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="overflow-hidden rounded-lg border">
            <img
              src={product.images[selectedImage] || "/placeholder.svg"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.map((image, index) => (
              <button
                key={index}
                className={`overflow-hidden rounded-md border ${selectedImage === index ? "ring-2 ring-primary" : ""}`}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} - Image ${index + 1}`}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold">{product.name}</h1>
            <div className="mt-2 flex items-center gap-2">
              <div className="flex items-center">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-5 w-5 ${
                      i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">
                {product.rating} ({product.reviewCount} reviews)
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {product.discountPercentage > 0 ? (
              <>
                <span className="text-3xl font-bold">
                  ${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}
                </span>
                <span className="text-xl text-muted-foreground line-through">${product.price.toFixed(2)}</span>
                <span className="rounded-full bg-red-100 px-2 py-1 text-sm font-medium text-red-800">
                  {product.discountPercentage}% OFF
                </span>
              </>
            ) : (
              <span className="text-3xl font-bold">${product.price.toFixed(2)}</span>
            )}
          </div>

          <div className="space-y-2">
            <h3 className="font-medium">Description</h3>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {product.colors && (
            <div className="space-y-2">
              <h3 className="font-medium">Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`h-8 w-8 rounded-full border p-0.5 ${
                      selectedColor === color ? "ring-2 ring-primary ring-offset-2" : ""
                    }`}
                    style={{ backgroundColor: color }}
                    aria-label={`Select ${color} color`}
                    onClick={() => setSelectedColor(color)}
                  >
                    <span className="sr-only">{color}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {product.sizes && (
            <div className="space-y-2">
              <h3 className="font-medium">Sizes</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    className={`rounded-md border px-3 py-1 text-sm hover:bg-muted ${
                      selectedSize === size ? "bg-primary text-primary-foreground" : ""
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-medium">Quantity</h3>
            <div className="flex items-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="h-4 w-4" />
                <span className="sr-only">Decrease quantity</span>
              </Button>
              <span className="w-8 text-center">{quantity}</span>
              <Button variant="outline" size="icon" onClick={() => setQuantity(quantity + 1)}>
                <Plus className="h-4 w-4" />
                <span className="sr-only">Increase quantity</span>
              </Button>
            </div>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <Button className="flex-1 gap-2" onClick={handleAddToCart}>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </Button>
            <Button variant="secondary" className="flex-1" onClick={handleBuyNow}>
              Buy Now
            </Button>
            <Button variant="outline" size="icon">
              <Heart className="h-5 w-5" />
              <span className="sr-only">Add to wishlist</span>
            </Button>
            <Button variant="outline" size="icon">
              <Share2 className="h-5 w-5" />
              <span className="sr-only">Share</span>
            </Button>
          </div>

          <div className="rounded-lg bg-muted p-4">
            <div className="flex items-center gap-2">
              <Truck className="h-5 w-5 text-muted-foreground" />
              <span className="text-sm">Free shipping on orders over $50</span>
            </div>
          </div>
        </div>
      </div>

      {/* Product Tabs */}
      <div className="mt-12">
        <Tabs defaultValue="details">
          <TabsList className="w-full justify-start overflow-x-auto">
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
            <TabsTrigger value="reviews">Reviews ({product.reviewCount})</TabsTrigger>
          </TabsList>
          <TabsContent value="details" className="mt-4 space-y-4">
            <h3 className="text-lg font-medium">Product Details</h3>
            <p className="text-muted-foreground">{product.description}</p>
            <p className="text-muted-foreground">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat.
            </p>
            <ul className="ml-6 list-disc text-muted-foreground">
              <li>High-quality materials</li>
              <li>Durable construction</li>
              <li>Comfortable fit</li>
              <li>Versatile design</li>
            </ul>
          </TabsContent>
          <TabsContent value="specifications" className="mt-4">
            <div className="rounded-lg border">
              <div className="grid grid-cols-1 divide-y sm:grid-cols-2 sm:divide-y-0 sm:divide-x">
                <div className="p-4">
                  <h3 className="font-medium">Product Specifications</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">Brand</dt>
                      <dd>{product.brand || "ShopNow"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Model</dt>
                      <dd>{product.model || "Standard"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Material</dt>
                      <dd>{product.material || "Mixed"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Weight</dt>
                      <dd>{product.weight || "0.5 kg"}</dd>
                    </div>
                  </dl>
                </div>
                <div className="p-4">
                  <h3 className="font-medium">Shipping Information</h3>
                  <dl className="mt-2 grid grid-cols-1 gap-x-6 gap-y-2 sm:grid-cols-2">
                    <div>
                      <dt className="text-sm text-muted-foreground">Dimensions</dt>
                      <dd>{product.dimensions || "30 x 20 x 10 cm"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Package Weight</dt>
                      <dd>{product.packageWeight || "0.8 kg"}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Shipping</dt>
                      <dd>Worldwide</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-muted-foreground">Returns</dt>
                      <dd>30 days</dd>
                    </div>
                  </dl>
                </div>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="reviews" className="mt-4">
            <ProductReviews
              productId={product.id}
              productName={product.name}
              rating={product.rating}
              reviewCount={product.reviewCount}
            />
          </TabsContent>
        </Tabs>
      </div>

      {/* Related Products */}
      <section className="mt-12">
        <h2 className="text-2xl font-bold">Related Products</h2>
        <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {relatedProducts.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <Link href={`/products/${product.id}`} className="block">
                <div className="aspect-square overflow-hidden">
                  <img
                    src={product.images[0] || "/placeholder.svg"}
                    alt={product.name}
                    className="h-full w-full object-cover transition-transform hover:scale-105"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <h3 className="font-medium">
                  <Link href={`/products/${product.id}`} className="hover:underline">
                    {product.name}
                  </Link>
                </h3>
                <div className="mt-2 flex items-center justify-between">
                  <span className="font-bold">${product.price.toFixed(2)}</span>
                  <div className="flex items-center">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="ml-1 text-sm">{product.rating}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </main>
  )
}
