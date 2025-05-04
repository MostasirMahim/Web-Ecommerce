"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Clock, Search, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { products } from "@/lib/data"
import { useSearchStore } from "@/lib/store"

export default function SearchDialog({ trigger }) {
  const router = useRouter()
  const { query, isOpen, recentSearches, setQuery, setIsOpen, addRecentSearch, clearRecentSearches } = useSearchStore()
  const [searchResults, setSearchResults] = useState([])

  // Search products when query changes
  useEffect(() => {
    if (query.trim()) {
      const results = products.filter(
        (product) =>
          product.name.toLowerCase().includes(query.toLowerCase()) ||
          product.description.toLowerCase().includes(query.toLowerCase()) ||
          product.category.toLowerCase().includes(query.toLowerCase()),
      )
      setSearchResults(results.slice(0, 5)) // Limit to 5 results for quick search
    } else {
      setSearchResults([])
    }
  }, [query])

  const handleSearch = (e) => {
    e.preventDefault()
    if (query.trim()) {
      addRecentSearch(query)
      setIsOpen(false)
      router.push(`/search?q=${encodeURIComponent(query)}`)
    }
  }

  const handleRecentSearchClick = (searchTerm) => {
    setQuery(searchTerm)
    addRecentSearch(searchTerm)
    setIsOpen(false)
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Search Products</DialogTitle>
          <DialogDescription>Find products by name, description, or category</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSearch} className="mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search for products..."
              className="pl-10 pr-10"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoFocus
            />
            {query && (
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2"
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
                <span className="sr-only">Clear search</span>
              </Button>
            )}
          </div>
        </form>

        <div className="mt-4">
          {searchResults.length > 0 && (
            <div className="mb-4">
              <h3 className="mb-2 text-sm font-medium">Search Results</h3>
              <ScrollArea className="h-[200px]">
                <div className="space-y-2">
                  {searchResults.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      onClick={() => {
                        addRecentSearch(query)
                        setIsOpen(false)
                      }}
                      className="flex items-center gap-3 rounded-md p-2 hover:bg-muted"
                    >
                      <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={product.images[0] || "/placeholder.svg"}
                          alt={product.name}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-sm font-medium">{product.name}</h4>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <div className="text-sm font-medium">
                        {product.discountPercentage > 0 ? (
                          <div className="flex flex-col items-end">
                            <span>${(product.price * (1 - product.discountPercentage / 100)).toFixed(2)}</span>
                            <span className="text-xs text-muted-foreground line-through">
                              ${product.price.toFixed(2)}
                            </span>
                          </div>
                        ) : (
                          <span>${product.price.toFixed(2)}</span>
                        )}
                      </div>
                    </Link>
                  ))}
                </div>
              </ScrollArea>
              <div className="mt-2 text-right">
                <Button
                  variant="link"
                  size="sm"
                  onClick={() => {
                    addRecentSearch(query)
                    setIsOpen(false)
                    router.push(`/search?q=${encodeURIComponent(query)}`)
                  }}
                >
                  View all results
                </Button>
              </div>
            </div>
          )}

          {recentSearches.length > 0 && (
            <div>
              <div className="mb-2 flex items-center justify-between">
                <h3 className="text-sm font-medium">Recent Searches</h3>
                <Button variant="ghost" size="sm" onClick={clearRecentSearches}>
                  Clear
                </Button>
              </div>
              <div className="space-y-1">
                {recentSearches.map((search, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    className="w-full justify-start"
                    onClick={() => handleRecentSearchClick(search)}
                  >
                    <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                    {search}
                  </Button>
                ))}
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
