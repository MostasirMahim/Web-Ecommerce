import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Button } from "@/components/ui/button"

export default function AboutPage() {
  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <h1 className="text-3xl font-bold sm:text-4xl">About ShopNow</h1>

        <div className="mt-8 space-y-8">
          <section>
            <h2 className="text-2xl font-semibold">Our Story</h2>
            <div className="mt-4 space-y-4">
              <p>
                Founded in 2023, ShopNow was born from a simple idea: shopping should be easy, enjoyable, and accessible
                to everyone. What started as a small online store has grown into a comprehensive e-commerce platform
                offering thousands of products across multiple categories.
              </p>
              <p>
                Our mission is to provide high-quality products at competitive prices while delivering an exceptional
                shopping experience. We believe in the power of technology to connect people with the products they
                love, and we're committed to continuous innovation to make that connection seamless.
              </p>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Our Values</h2>
            <div className="mt-4 grid gap-6 sm:grid-cols-2">
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Customer First</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Every decision we make starts with the question: "How does this benefit our customers?" Your
                  satisfaction is our top priority.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Quality & Reliability</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We carefully select our products and partners to ensure we offer only the best quality merchandise.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Innovation</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We continuously improve our platform and services to make your shopping experience better every day.
                </p>
              </div>
              <div className="rounded-lg border p-4">
                <h3 className="font-medium">Sustainability</h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  We're committed to reducing our environmental impact through eco-friendly packaging and sustainable
                  practices.
                </p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Our Team</h2>
            <p className="mt-4">
              Behind ShopNow is a diverse team of passionate individuals dedicated to creating the best shopping
              experience possible. From our customer service representatives to our tech developers, everyone plays a
              crucial role in making ShopNow what it is today.
            </p>
            <div className="mt-6 grid gap-6 sm:grid-cols-3">
              <div className="text-center">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-muted">
                  <img src="/placeholder.svg" alt="Team member" className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-2 font-medium">Jane Smith</h3>
                <p className="text-sm text-muted-foreground">Founder & CEO</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-muted">
                  <img src="/placeholder.svg" alt="Team member" className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-2 font-medium">John Davis</h3>
                <p className="text-sm text-muted-foreground">CTO</p>
              </div>
              <div className="text-center">
                <div className="mx-auto h-24 w-24 overflow-hidden rounded-full bg-muted">
                  <img src="/placeholder.svg" alt="Team member" className="h-full w-full object-cover" />
                </div>
                <h3 className="mt-2 font-medium">Sarah Johnson</h3>
                <p className="text-sm text-muted-foreground">Head of Customer Experience</p>
              </div>
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-semibold">Join Our Community</h2>
            <p className="mt-4">
              We're more than just an online store – we're a community of shoppers who value quality, convenience, and
              great deals. Join us on social media to stay updated on the latest products, promotions, and company news.
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Button variant="outline">Instagram</Button>
              <Button variant="outline">Facebook</Button>
              <Button variant="outline">Twitter</Button>
              <Button variant="outline">Pinterest</Button>
            </div>
          </section>
        </div>

        <div className="mt-12 rounded-lg bg-muted p-6 text-center">
          <h2 className="text-xl font-semibold">Ready to start shopping?</h2>
          <p className="mt-2 text-muted-foreground">
            Explore our wide selection of products and find exactly what you're looking for.
          </p>
          <Button className="mt-4" asChild>
            <Link href="/products">
              Browse Products <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </main>
  )
}
