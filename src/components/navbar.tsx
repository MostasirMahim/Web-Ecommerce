"use client"

import { useState } from "react"
import Link from "next/link"
import { Heart, Menu, Search, ShoppingCart, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import SearchDialog from "@/components/search-dialog"
import { categories } from "@/lib/data"
import { useCartStore, useSearchStore, useUserStore, useWishlistStore } from "@/lib/store"
import AccountSheet from "./account-sheet"

export default function Navbar() {
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const { setIsOpen: setSearchDialogOpen } = useSearchStore()
  const { totalItems } = useCartStore()
  const { items: wishlistItems } = useWishlistStore()
  const { isLoggedIn } = useUserStore()

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[300px] sm:w-[400px]">
              <nav className="flex flex-col gap-6">
                <Link
                  href="/"
                  className="flex items-center gap-2 text-xl font-bold"
                  onClick={() => document.body.classList.remove("overflow-hidden")}
                >
                  <ShoppingCart className="h-6 w-6" />
                  <span>ShopNow</span>
                </Link>
                <div className="grid gap-2 py-6">
                  <Link
                    href="/"
                    className="flex py-2 text-lg font-medium transition-colors hover:text-foreground/80"
                    onClick={() => document.body.classList.remove("overflow-hidden")}
                  >
                    Home
                  </Link>
                  <div className="grid gap-2 py-2">
                    <div className="font-medium">Categories</div>
                    {categories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/categories/${category.slug}`}
                        className="text-foreground/70 transition-colors hover:text-foreground"
                        onClick={() => document.body.classList.remove("overflow-hidden")}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                  <Link
                    href="/products"
                    className="flex py-2 text-lg font-medium transition-colors hover:text-foreground/80"
                    onClick={() => document.body.classList.remove("overflow-hidden")}
                  >
                    All Products
                  </Link>
                  <Link
                    href="/orders"
                    className="flex py-2 text-lg font-medium transition-colors hover:text-foreground/80"
                    onClick={() => document.body.classList.remove("overflow-hidden")}
                  >
                    My Orders
                  </Link>
                  <Link
                    href="/wishlist"
                    className="flex py-2 text-lg font-medium transition-colors hover:text-foreground/80"
                    onClick={() => document.body.classList.remove("overflow-hidden")}
                  >
                    Wishlist
                  </Link>
                  <Link
                    href="/about"
                    className="flex py-2 text-lg font-medium transition-colors hover:text-foreground/80"
                    onClick={() => document.body.classList.remove("overflow-hidden")}
                  >
                    About
                  </Link>
                  <Link
                    href="/contact"
                    className="flex py-2 text-lg font-medium transition-colors hover:text-foreground/80"
                    onClick={() => document.body.classList.remove("overflow-hidden")}
                  >
                    Contact
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-xl font-bold">
            <ShoppingCart className="h-6 w-6" />
            <span className="hidden sm:inline-block">ShopNow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex md:gap-6 lg:gap-10">
            <Link href="/" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Home
            </Link>
            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground/80">
                Categories
              </button>
              <div className="absolute left-0 top-full z-50 hidden w-48 rounded-md border bg-background p-2 shadow-md group-hover:block">
                {categories.map((category) => (
                  <Link
                    key={category.id}
                    href={`/categories/${category.slug}`}
                    className="block rounded-sm px-3 py-2 text-sm transition-colors hover:bg-muted"
                  >
                    {category.name}
                  </Link>
                ))}
              </div>
            </div>
            <Link href="/products" className="text-sm font-medium transition-colors hover:text-foreground/80">
              All Products
            </Link>
            <Link href="/orders" className="text-sm font-medium transition-colors hover:text-foreground/80">
              My Orders
            </Link>
            <Link href="/about" className="text-sm font-medium transition-colors hover:text-foreground/80">
              About
            </Link>
            <Link href="/contact" className="text-sm font-medium transition-colors hover:text-foreground/80">
              Contact
            </Link>
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <SearchDialog
              trigger={
                <Button variant="ghost" size="icon" onClick={() => setSearchDialogOpen(true)}>
                  <Search className="h-5 w-5" />
                  <span className="sr-only">Search</span>
                </Button>
              }
            />
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="relative">
                <Heart className="h-5 w-5" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {wishlistItems.length}
                  </span>
                )}
                <span className="sr-only">Wishlist</span>
              </Button>
            </Link>
            <Link href="/cart">
              <Button variant="ghost" size="icon" className="relative">
                <ShoppingCart className="h-5 w-5" />
                {totalItems > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                    {totalItems}
                  </span>
                )}
                <span className="sr-only">Cart</span>
              </Button>
            </Link>
            <AccountSheet
              trigger={
                <Button variant="ghost" size="icon">
                  <User className="h-5 w-5" />
                  <span className="sr-only">Account</span>
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  )
}
