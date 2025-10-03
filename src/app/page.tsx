"use client";
import Link from "next/link";
import { ArrowRight, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { HomeCategories, Iproducts, products } from "@/lib/data";
import ProductItem from "@/components/ProductCard";

import CategoryGrid from "@/components/CategoryGrid";
import ProductCarousel from "@/components/ProductCarousel";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { getHomeProducts } from "@/actions/main.action";

export default function Home() {
  // Filter products for different sections
  const { toast } = useToast();
  const featuredProducts = products.filter((product) => product.featured);
  const discountedProducts = products.filter(
    (product) => product.discountPercentage > 0
  );
  const latestProducts = [...products]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 4);

  const { data: newProducts, isLoading } = useQuery<Record<string, any> | null>(
    {
      queryKey: ["newProducts"],
      queryFn: async () => {
        try {
          const res = await getHomeProducts();
          if (!res.success) {
            toast({
              title: "Error fetching products",
              description: res.error || "Something went wrong.",
              variant: "destructive",
            });
            return null;
          }
          return res.data;
        } catch (error) {
          console.error("Error fetching user stats:", error);
          return null;
        }
      },
    }
  );
  console.log("New Products:", newProducts);
  return (
    <main className="flex-1">
      {/* Hero Carousel */}
      <section className="relative">
        <Carousel className="w-full" opts={{ loop: true }}>
          <CarouselContent>
            {[
              {
                title: "Summer Collection 2024",
                subtitle:
                  "Discover our latest arrivals with up to 40% off. Limited time offer.",
                image: "/placeholder.svg?height=600&width=1200",
                color: "from-pink-500 to-purple-500",
                buttonText: "Shop Now",
                buttonLink: "/products",
              },
              {
                title: "New Electronics",
                subtitle:
                  "The latest gadgets and tech accessories for your lifestyle.",
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
                    <div
                      className={`absolute inset-0 bg-gradient-to-r ${slide.color} opacity-80`}
                    ></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-start p-8 md:p-16">
                    <div className="max-w-md text-white">
                      <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                        {slide.title}
                      </h1>
                      <p className="mt-4 max-w-[600px] text-lg text-white/90 md:text-xl">
                        {slide.subtitle}
                      </p>
                      <div className="mt-8">
                        <Button
                          asChild
                          size="lg"
                          className="bg-white text-gray-900 hover:bg-white/90"
                        >
                          <Link href={slide.buttonLink}>
                            {slide.buttonText}
                          </Link>
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

      {/* Latest Products */}
      <section className="py-10">
        <div className="container w-full  px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-4 items-center">
            <div>
              <h2  className="text-2xl font-bold tracking-tight sm:text-3xl">
                Featured Products
              </h2>
              <p className="text-gray-500">Just landed in our store</p>
            </div>
            <Button variant="ghost" asChild className="gap-1">
              <Link href="/products?sort=newest">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-5 flex justify-center sm:justify-start items-center gap-1 flex-wrap">
            {newProducts?.map((product:any) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/*  Products Carousel */}
      <section className="hidden sm:block py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Latest Arrivals
              </h2>
              <p className="text-gray-500">Just landed in our store</p>
            </div>
            <Button variant="ghost" asChild className="gap-1">
              <Link href="/products?sort=newest">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-6  w-full ">
            <ProductCarousel products={Iproducts} />
          </div>
        </div>
      </section>

      {/* Second Products */}
      <section className="py-10">
        <div className="container w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-4 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Top Selling
              </h2>
              <p className="text-gray-500">Just landed in our store</p>
            </div>
            <Button variant="ghost" asChild className="gap-1">
              <Link href="/products?sort=newest">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-5 flex justify-start items-center gap-1 flex-wrap">
            {Iproducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/*  Category Grid  */}
      <section className="w-full h-auto p-1 px-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-1">
        {HomeCategories.map((category, index) => (
          <CategoryGrid
            key={index}
            title={category.title}
            items={category.items}
            linkText={category.linkText}
          />
        ))}
      </section>

      {/* Third Products */}
      <section className="py-10">
        <div className="container w-full px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between gap-4 items-center">
            <div>
              <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
                Latest Arrivals
              </h2>
              <p className="text-gray-500">Just landed in our store</p>
            </div>
            <Button variant="ghost" asChild className="gap-1">
              <Link href="/products?sort=newest">
                View All <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
          <div className="mt-5 flex justify-start items-center gap-1 flex-wrap">
            {Iproducts.map((product) => (
              <ProductItem key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-slate-900 py-12 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Subscribe to our newsletter
            </h2>
            <p className="mt-2 text-gray-300">
              Get the latest updates and exclusive offers
            </p>
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
  );
}

function ProductCard({ product }: any) {
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
                i < Math.floor(product.rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
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
              <span className="font-bold">
                $
                {(
                  product.price *
                  (1 - product.discountPercentage / 100)
                ).toFixed(2)}
              </span>
              <span className="text-sm text-gray-500 line-through">
                ${product.price.toFixed(2)}
              </span>
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
  );
}
