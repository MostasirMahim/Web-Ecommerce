import Link from "next/link"
import { ArrowRight, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { products } from "@/lib/data"

export default function Home() {
  // Filter products for different sections
  const featuredProducts = products.filter((product) => product.featured)
  const discountedProducts = products.filter((product) => product.discountPercentage > 0)
  const latestProducts = [...products]
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 4)

  return (
    <main className="flex-1">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {[
              {
                title: "Summer Collection 2024",
                subtitle: "Discover our latest arrivals with up to 40% off. Limited time offer.",
                image: "/placeholder.svg?height=600&width=1200",
                color: "from-pink-500 to-purple-500",
                buttonText: "Shop Now",
                buttonLink: "/products",
              },
              {
                title: "New Electronics",
                subtitle: "The latest gadgets and tech accessories for your lifestyle.",
                image: "/placeholder.svg?height=600&width=1200",
                color: "from-blue-500 to-cyan-500",
                buttonText: "Explore",
                buttonLink: "/categories/electronics",
              },
              {
                title: "Home & Kitchen Essentials",
                subtitle: "Transform your space with our curated collection.",
                image: "/placeholder.svg?height=600&width=1200",
                color: "from-amber-500 to-orange-500",
                buttonText: "Discover",
                buttonLink: "/categories/home-kitchen",
              },
            ].map((slide, index) => (
              <CarouselItem key={index}>
                <div className="relative h-[60vh] w-full overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center"
                    style={{ backgroundImage: `url(${slide.image})` }}
                  >
                    <div className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`}></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
                    <div className="max-w-md text-white">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-[600px] text-lg text-white/90 md:text-xl">{slide.subtitle}</p>
                      <div className="mt-8">
                        <Button asChild size="lg" className="bg-white text-gray-900 hover:bg-white/90">
                          <Link href={slide.buttonLink}>{slide.buttonText}</Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
            <CarouselPrevious className="relative h-8 w-8 translate-y-0 border-0 bg-white/20 text-white hover:bg-white/30" />
            <CarouselNext className="relative h-8 w-8 translate-y-0 border-0 bg-white/20 text-white hover:bg-white/30" />
          </div>
        </Carousel>
      </section>

      {/* Featured Products */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Featured Products</h2>
              <p className="text-gray-500">Handpicked by our team for exceptional quality and style</p>
            </div>
            <Button variant="ghost" asChild className="gap-1">
              <Link href="/products?featured=true">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Discounted Products Carousel */}
      <section className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Special Offers</h2>
              <p className="text-gray-500">Limited time discounts on these amazing products</p>
            </div>
            <Button variant="ghost" asChild className="gap-1">
              <Link href="/products?discount=true">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6">
            <Carousel className="w-full">
              <CarouselContent>
                {discountedProducts.map((product) => (
                  <CarouselItem key={product.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-2" />
              <CarouselNext className="right-2" />
            </Carousel>
          </div>
        </div>
      </section>

      {/* Latest Products */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Latest Arrivals</h2>
              <p className="text-gray-500">Just landed in our store</p>
            </div>
            <Button variant="ghost" asChild className="gap-1">
              <Link href="/products?sort=newest">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {latestProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">Subscribe to our newsletter</h2>
            <p className="mt-2 text-gray-300">Get the latest updates and exclusive offers</p>
            <form className="mt-6 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <Button type="submit">Subscribe</Button>
            </form>
          </div>
        </div>
      </section>
    </main>
  )
}

function ProductCard({ product }) {
  return (
    <Card className="overflow-hidden transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden">
        <Link href={`/products/${product.id}`}>
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="h-full w-full object-cover transition-transform hover:scale-105"
          />
          {product.discountPercentage > 0 && (
            <div className="absolute left-2 top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-bold text-white">
              {product.discountPercentage}% OFF
            </div>
          )}
        </Link>
      </div>
      <CardContent className="p-4">
        <div className="flex items-center gap-1">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          ))}
          <span className="text-xs text-gray-500">({product.reviewCount})</span>
        </div>
        <h3 className="mt-2 font-medium">
          <Link href={`/products/${product.id}`} className="hover:underline">
            {product.name}
          </Link>
        </h3>
        <p className="text-sm text-gray-500">{product.category}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center gap-2">
          {product.discountPercentage > 0 ? (
            <>
              <span className="font-bold">${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
              <span className="text-sm text-gray-500 line-through">${product.price.toFixed(2)}</span>
            </>
          ) : (
            <span className="font-bold">${product.price.toFixed(2)}</span>
          )}
        </div>
        <Button size="sm" variant="outline">
          Add to cart
        </Button>
      </CardFooter>
    </Card>
  )
}
