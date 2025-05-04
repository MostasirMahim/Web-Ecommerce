"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { ImagePlus, Loader2, Save, X } from "lucide-react"
import { useForm } from "react-hook-form"
import * as z from "zod"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/hooks/use-toast"
import { categories } from "@/lib/data"

const productSchema = z.object({
  name: z.string().min(3, { message: "Product name must be at least 3 characters" }),
  description: z.string().min(10, { message: "Description must be at least 10 characters" }),
  price: z.coerce.number().positive({ message: "Price must be a positive number" }),
  discountPercentage: z.coerce.number().min(0).max(100).optional(),
  category: z.string().min(1, { message: "Please select a category" }),
  featured: z.boolean().default(false),
  colors: z.array(z.string()).optional(),
  sizes: z.array(z.string()).optional(),
  stock: z.coerce.number().int().positive({ message: "Stock must be a positive number" }),
})

type ProductFormValues = z.infer<typeof productSchema>

export default function AddProductPage() {
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [images, setImages] = useState<string[]>([])
  const [colorInput, setColorInput] = useState("")
  const [sizeInput, setSizeInput] = useState("")

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      description: "",
      price: 0,
      discountPercentage: 0,
      category: "",
      featured: false,
      colors: [],
      sizes: [],
      stock: 1,
    },
  })

  function onSubmit(data: ProductFormValues) {
    if (images.length === 0) {
      toast({
        title: "Error",
        description: "Please add at least one product image",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      console.log("Product data:", { ...data, images })
      toast({
        title: "Product Added",
        description: "The product has been added successfully",
      })
      setIsSubmitting(false)
      form.reset()
      setImages([])
    }, 1500)
  }

  const addImage = () => {
    // In a real app, this would be an image upload
    // For now, we'll just add a placeholder
    setImages([...images, `/placeholder.svg?height=400&width=400&text=Product+Image+${images.length + 1}`])
  }

  const removeImage = (index: number) => {
    const newImages = [...images]
    newImages.splice(index, 1)
    setImages(newImages)
  }

  const addColor = () => {
    if (!colorInput.trim()) return
    const currentColors = form.getValues("colors") || []
    if (!currentColors.includes(colorInput)) {
      form.setValue("colors", [...currentColors, colorInput])
    }
    setColorInput("")
  }

  const removeColor = (color: string) => {
    const currentColors = form.getValues("colors") || []
    form.setValue(
      "colors",
      currentColors.filter((c) => c !== color),
    )
  }

  const addSize = () => {
    if (!sizeInput.trim()) return
    const currentSizes = form.getValues("sizes") || []
    if (!currentSizes.includes(sizeInput)) {
      form.setValue("sizes", [...currentSizes, sizeInput])
    }
    setSizeInput("")
  }

  const removeSize = (size: string) => {
    const currentSizes = form.getValues("sizes") || []
    form.setValue(
      "sizes",
      currentSizes.filter((s) => s !== size),
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Product</h1>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details about the product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter product name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea placeholder="Enter product description" className="min-h-32" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Price ($)</FormLabel>
                        <FormControl>
                          <Input type="number" step="0.01" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="discountPercentage"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Discount (%)</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" max="100" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Category</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select a category" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {categories.map((category) => (
                              <SelectItem key={category.id} value={category.name}>
                                {category.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stock Quantity</FormLabel>
                        <FormControl>
                          <Input type="number" min="0" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="featured"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                      <FormControl>
                        <Checkbox checked={field.value} onCheckedChange={field.onChange} />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Featured Product</FormLabel>
                        <FormDescription>This product will appear on the homepage.</FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Add images of the product. The first image will be used as the main image.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 grid grid-cols-2 gap-4 sm:grid-cols-3">
                    {images.map((image, index) => (
                      <div key={index} className="group relative aspect-square overflow-hidden rounded-md border">
                        <img
                          src={image || "/placeholder.svg"}
                          alt={`Product image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => removeImage(index)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      className="flex aspect-square h-auto w-full flex-col items-center justify-center rounded-md border border-dashed"
                      onClick={addImage}
                    >
                      <ImagePlus className="mb-2 h-8 w-8 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">Add Image</span>
                    </Button>
                  </div>
                  {images.length === 0 && (
                    <p className="text-sm text-muted-foreground">Please add at least one product image.</p>
                  )}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Variants</CardTitle>
                  <CardDescription>Add available colors and sizes for this product.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="color-input">Colors</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.watch("colors")?.map((color) => (
                        <div key={color} className="flex items-center rounded-full bg-secondary px-3 py-1 text-sm">
                          <span className="mr-1">{color}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => removeColor(color)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Input
                        id="color-input"
                        value={colorInput}
                        onChange={(e) => setColorInput(e.target.value)}
                        placeholder="Add a color (e.g. Red, Blue)"
                        className="flex-1"
                      />
                      <Button type="button" onClick={addColor}>
                        Add
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div>
                    <Label htmlFor="size-input">Sizes</Label>
                    <div className="mt-2 flex flex-wrap gap-2">
                      {form.watch("sizes")?.map((size) => (
                        <div key={size} className="flex items-center rounded-full bg-secondary px-3 py-1 text-sm">
                          <span className="mr-1">{size}</span>
                          <Button
                            type="button"
                            variant="ghost"
                            size="icon"
                            className="h-4 w-4"
                            onClick={() => removeSize(size)}
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                      ))}
                    </div>
                    <div className="mt-2 flex gap-2">
                      <Input
                        id="size-input"
                        value={sizeInput}
                        onChange={(e) => setSizeInput(e.target.value)}
                        placeholder="Add a size (e.g. S, M, L, XL)"
                        className="flex-1"
                      />
                      <Button type="button" onClick={addSize}>
                        Add
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className="flex justify-end gap-4">
            <Button type="button" variant="outline">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Save Product
                </>
              )}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
