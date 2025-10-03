"use client";

import { useState } from "react";
import {
  Palette,
  ImageIcon,
  Type,
  LayoutGrid,
  Save,
  Grid,
  Tag,
  Plus,
  Upload,
} from "lucide-react";

import AdminHeader from "@/components/admin/admin-header";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { products } from "@/lib/data";
import { useToast } from "@/hooks/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { FieldArray, FormikProvider, useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  categoryCuz,
  footerCuz,
  generalCuz,
  getSettings,
  homepageCuz,
  productCuz,
} from "@/actions/settings.action";

export default function CustomizePage() {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState("general");
  const [isAddingCategory, setIsAddingCategory] = useState(false);
  const queryClient = useQueryClient();

  const { data: settingsData, isLoading } = useQuery<Record<
    string,
    any
  > | null>({
    queryKey: ["settingsData"],
    queryFn: async () => {
      try {
        const res = await getSettings();
        if (!res.success) {
          toast({
            title: "Error fetching settings",
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
  });

  const { mutate: generalCustomize, isPending: isGeneralPending } = useMutation(
    {
      mutationFn: async (data: any) => {
        try {
          const res = await generalCuz(data);
          if (!res.success) {
            toast({
              title: "Update failed",
              description: res.error || "Something went wrong.",
              variant: "destructive",
            });
            throw new Error(res.error || "Something went wrong");
          }
          return res.data;
        } catch (error) {
          console.log(error);
          throw new Error("Update failed");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settingsData"] });
        generalForm.resetForm();
        toast({
          title: "Updated successfully",
          description: "Refresh to see the changes!",
        });
      },
    }
  );
  const { mutate: homepageCustomize, isPending: isHomepagePending } =
    useMutation({
      mutationFn: async (data: any) => {
        try {
          const res = await homepageCuz(data);
          if (!res.success) {
            toast({
              title: "Update failed",
              description: res.error || "Something went wrong.",
              variant: "destructive",
            });
            throw new Error(res.error || "Something went wrong");
          }
          return res.data;
        } catch (error) {
          console.log(error);
          throw new Error("Update failed");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settingsData"] });
        homepageForm.resetForm();
        toast({
          title: "Updated successfully",
          description: "Refresh to see the changes!",
        });
      },
    });

  const { mutate: footerCustomize, isPending: isFooterPending } = useMutation({
    mutationFn: async (data: any) => {
      try {
        const res = await footerCuz(data);
        if (!res.success) {
          toast({
            title: "Update failed",
            description: res.error || "Something went wrong.",
            variant: "destructive",
          });
          throw new Error(res.error || "Something went wrong");
        }
        return res.data;
      } catch (error) {
        console.log(error);
        throw new Error("Update failed");
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["settingsData"] });
      footerForm.resetForm();
      toast({
        title: "Updated successfully",
        description: "Refresh to see the changes!",
      });
    },
  });

  const { mutate: productCustomize, isPending: isProductPending } = useMutation(
    {
      mutationFn: async (data: any) => {
        try {
          const res = await productCuz(data);
          if (!res.success) {
            toast({
              title: "Update failed",
              description: res.error || "Something went wrong.",
              variant: "destructive",
            });
            throw new Error(res.error || "Something went wrong");
          }
          return res.data;
        } catch (error) {
          console.log(error);
          throw new Error("Update failed");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settingsData"] });
        productForm.resetForm();
        toast({
          title: "Updated successfully",
          description: "Refresh to see the changes!",
        });
      },
    }
  );
  const { mutate: categoryCustomize, isPending: isCategoryPending } =
    useMutation({
      mutationFn: async (data: any) => {
        try {
          const res = await categoryCuz(data);
          if (!res.success) {
            toast({
              title: "Update failed",
              description: res.error || "Something went wrong.",
              variant: "destructive",
            });
            throw new Error(res.error || "Something went wrong");
          }
          return res.data;
        } catch (error) {
          console.log(error);
          throw new Error("Update failed");
        }
      },
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["settingsData"] });
        createCategory.resetForm();
        toast({
          title: "Updated successfully",
          description: "Refresh to see the changes!",
        });
      },
    });

  const categories = [
    {
      category: "Electronics",
      subcategory: ["Mobile", "Laptop", "Tablet", "Camera"],
    },
    {
      category: "Clothing",
      subcategory: ["Men", "Women", "Kids", "Accessories"],
    },
    {
      category: "Home",
      subcategory: ["Furniture", "Kitchen", "Bedroom", "Bathroom"],
    },
    {
      category: "Beauty",
      subcategory: ["Skin Care", "Hair Care", "Makeup", "Fragrance"],
    },
  ];

  const createCategory = useFormik({
    initialValues: {
      category: "",
      subcategory: [],
      state: "",
    },

    onSubmit: (values) => {
      console.log(values);
      categoryCustomize(values);
    },
  });

  // 1. General Settings
  const generalForm = useFormik({
    initialValues: {
      siteName: "",
      siteDescription: "",
      logo: "/logo.png",
      favicon: "/favicon.ico",
      primaryColor: "#0f172a",
      accentColor: "#3b82f6",
    },

    onSubmit: (values) => {
      generalCustomize(values);
    },
  });

  // 2. Homepage Settings
  const homepageForm = useFormik({
    initialValues: {
      heroTitle: "",
      heroSubtitle: "",
      heroImage: "/hero.jpg",
      showFeaturedProducts: true,
      featuredProductsTitle: "",
      featuredProductIds: ["1", "2", "3", "4"],
      showNewArrivals: true,
      newArrivalsTitle: "New Arrivals",
      showCategories: true,
      categoriesTitle: "",
      carouselSlides: [
        {
          title: "",
          subtitle: "",
          image: "",
          color: "",
          buttonText: "",
          buttonLink: "",
        },
      ],

      // Temporary fields for slide creation
      newSlideTitle: "",
      newSlideSubtitle: "",
      newSlideImage: "",
      newSlideColor: "",
      newSlideButtonText: "",
      newSlideButtonLink: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  // 3. Footer Settings
  const footerForm = useFormik({
    initialValues: {
      showNewsletter: true,
      newsletterTitle: "",
      newsletterText: "",
      copyrightText: "",
      showSocialLinks: true,
      facebook: "",
      twitter: "",
      instagram: "",
    },
    onSubmit: (values) => {
      footerCustomize(values);
    },
  });

  // 4. Product Settings
  const productForm = useFormik({
    initialValues: {
      showRelatedProducts: true,
      relatedProductsTitle: "",
      showReviews: true,
      enableRatings: true,
    },
    onSubmit: (values) => {
      productCustomize(values);
    },
  });

  if (
    isGeneralPending ||
    isHomepagePending ||
    isFooterPending ||
    isProductPending ||
    isCategoryPending
  ) {
    return (
      <div className="container mx-auto p-4 md:p-6">
        <AdminHeader
          title="Customize Website"
          description="Customize the appearance and content of your website"
        />
        <div className="mt-6">Loading...</div>
      </div>
    );
  }
  return (
    <div className="container mx-auto p-4 md:p-6">
      <AdminHeader
        title="Customize Website"
        description="Customize the appearance and content of your website"
        action={{
          label: "Save Changes",
        }}
      />

      <div className="mt-6">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="overflow-x-auto">
            <TabsList className="mb-4 w-full justify-start">
              <TabsTrigger value="general" className="flex items-center gap-2">
                <Palette className="h-4 w-4" />
                <span>General</span>
              </TabsTrigger>
              <TabsTrigger value="homepage" className="flex items-center gap-2">
                <LayoutGrid className="h-4 w-4" />
                <span>Homepage</span>
              </TabsTrigger>
              <TabsTrigger
                value="categories"
                className="flex items-center gap-2"
              >
                <Grid className="h-4 w-4" />
                <span>Categories</span>
              </TabsTrigger>
              <TabsTrigger value="footer" className="flex items-center gap-2">
                <Type className="h-4 w-4" />
                <span>Footer</span>
              </TabsTrigger>
              <TabsTrigger value="product" className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4" />
                <span>Product Pages</span>
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="general" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Customize the general appearance of your website
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={generalForm.values.siteName}
                      onChange={generalForm.handleChange}
                      placeholder={`${
                        settingsData?.general.siteName || "ShopNow"
                      }`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                      id="siteDescription"
                      value={generalForm.values.siteDescription}
                      onChange={generalForm.handleChange}
                      placeholder={`${
                        settingsData?.general.siteDescription ||
                        "Your online store"
                      }`}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="logo"
                        value={generalForm.values.logo}
                        onChange={generalForm.handleChange}
                      />
                      <Button variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="favicon">Favicon URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="favicon"
                        value={generalForm.values.favicon}
                        onChange={generalForm.handleChange}
                      />
                      <Button variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="primaryColor">Primary Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="primaryColor"
                        name="primaryColor"
                        value={generalForm.values.primaryColor}
                        onChange={generalForm.handleChange}
                      />
                      <input
                        type="color"
                        name="primaryColor"
                        value={generalForm.values.primaryColor}
                        onChange={generalForm.handleChange}
                        className="h-10 w-10 cursor-pointer rounded-md border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        name="accentColor"
                        value={generalForm.values.accentColor}
                        onChange={generalForm.handleChange}
                      />
                      <input
                        type="color"
                        name="accentColor"
                        value={generalForm.values.accentColor}
                        onChange={generalForm.handleChange}
                        className="h-10 w-10 cursor-pointer rounded-md border"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => generalForm.handleSubmit()}
                  className="ml-auto flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="homepage" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Homepage Settings</CardTitle>
                <CardDescription>
                  Customize the content and layout of your homepage
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Hero Section</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={homepageForm.values.heroTitle}
                        onChange={homepageForm.handleChange}
                        placeholder={`${
                          settingsData?.homepage.heroTitle ||
                          "Welcome to ShopNow"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                      <Input
                        id="heroSubtitle"
                        value={homepageForm.values.heroSubtitle}
                        onChange={homepageForm.handleChange}
                        placeholder={`${
                          settingsData?.homepage.heroSubtitle ||
                          "Your one-stop shop for everything"
                        }`}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroImage">Hero Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="heroImage"
                        value={homepageForm.values.heroImage}
                        onChange={homepageForm.handleChange}
                        placeholder="/hero.jpg"
                      />
                      <Button variant="outline" size="icon">
                        <ImageIcon className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Featured Products</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showFeaturedProducts"
                        checked={homepageForm.values.showFeaturedProducts}
                        onCheckedChange={(checked) => {
                          productForm.setFieldValue(
                            "showFeaturedProducts",
                            checked
                          );
                        }}
                      />
                      <Label htmlFor="showFeaturedProducts">Show Section</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featuredProductsTitle">
                      Featured Products Title
                    </Label>
                    <Input
                      id="featuredProductsTitle"
                      value={homepageForm.values.featuredProductsTitle}
                      onChange={homepageForm.handleChange}
                      placeholder="Featured Products"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Featured Products</Label>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {products.slice(0, 8).map((product) => (
                        <div
                          key={product.id}
                          className={`cursor-pointer rounded-md border p-2 transition-all ${
                            true
                              ? "border-primary bg-primary/10"
                              : "hover:border-muted-foreground"
                          }`}
                        >
                          <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="mt-2 text-sm font-medium">
                            {product.name}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">New Arrivals</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showNewArrivals"
                        checked={homepageForm.values.showNewArrivals}
                        onCheckedChange={(checked) => {
                          productForm.setFieldValue("showNewArrivals", checked);
                        }}
                      />
                      <Label htmlFor="showNewArrivals">Show Section</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newArrivalsTitle">Section Title</Label>
                    <Input
                      id="newArrivalsTitle"
                      value={homepageForm.values.newArrivalsTitle}
                      onChange={homepageForm.handleChange}
                      placeholder={`${
                        settingsData?.homepage.newArrivalsTitle ||
                        "New Arrivals"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <h3 className="text-lg font-medium">Carousel Slides</h3>
                  <p className="text-sm text-muted-foreground">
                    Customize the main carousel slides on your homepage
                  </p>

                  <div className="space-y-6">
                    {homepageForm.values.carouselSlides.map((slide, index) => (
                      <Card key={index} className="border-dashed">
                        <CardHeader className="pb-2 flex flex-row items-center justify-between">
                          <CardTitle className="text-base">
                            Slide {index + 1}
                          </CardTitle>
                          {homepageForm.values.carouselSlides.length > 1 && (
                            <Button
                              type="button"
                              variant="destructive"
                              size="sm"
                              onClick={() => {
                                const updatedSlides =
                                  homepageForm.values.carouselSlides.filter(
                                    (_, i) => i !== index
                                  );
                                homepageForm.setFieldValue(
                                  "carouselSlides",
                                  updatedSlides
                                );
                              }}
                            >
                              Remove Slide
                            </Button>
                          )}
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label htmlFor={`carouselSlides[${index}].title`}>
                                Title
                              </Label>
                              <Input
                                id={`carouselSlides[${index}].title`}
                                name={`carouselSlides[${index}].title`}
                                value={slide.title}
                                onChange={homepageForm.handleChange}
                                placeholder="e.g. Summer Collection 2024"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`carouselSlides[${index}].subtitle`}
                              >
                                Subtitle
                              </Label>
                              <Input
                                id={`carouselSlides[${index}].subtitle`}
                                name={`carouselSlides[${index}].subtitle`}
                                value={slide.subtitle}
                                onChange={homepageForm.handleChange}
                                placeholder="e.g. Discover our latest arrivals..."
                              />
                            </div>
                          </div>

                          {/* Image Upload Section */}
                          <div className="space-y-2">
                            <Label htmlFor={`carouselSlides[${index}].image`}>
                              Slide Image
                            </Label>
                            <div className="flex flex-col gap-4">
                              <div className="flex gap-2">
                                <Input
                                  id={`carouselSlides[${index}].image`}
                                  name={`carouselSlides[${index}].image`}
                                  value={slide.image}
                                  onChange={homepageForm.handleChange}
                                  placeholder="/images/carousel-bg.jpg"
                                />
                                <Button variant="outline" size="icon">
                                  <ImageIcon className="h-4 w-4" />
                                </Button>
                              </div>

                              {/* File Upload */}
                              <div className="flex items-center gap-4">
                                <input
                                  type="file"
                                  accept="image/*"
                                  onChange={(e) => {
                                    const file = e.currentTarget.files?.[0];
                                    if (file) {
                                      const reader = new FileReader();
                                      reader.onloadend = () => {
                                        homepageForm.setFieldValue(
                                          `carouselSlides[${index}].image`,
                                          reader.result
                                        );
                                      };
                                      reader.readAsDataURL(file);
                                    }
                                  }}
                                  className="text-sm text-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-medium file:bg-primary file:text-primary-foreground hover:file:bg-primary/90"
                                />
                              </div>

                              {/* Image Preview */}
                              {slide.image && (
                                <div className="relative w-full h-32 overflow-hidden rounded-md bg-muted">
                                  <img
                                    src={slide.image || "/placeholder.svg"}
                                    alt={`Slide ${index + 1} preview`}
                                    className="w-full h-full object-cover"
                                  />
                                </div>
                              )}
                            </div>
                          </div>

                          <div className="grid gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                              <Label
                                htmlFor={`carouselSlides[${index}].buttonText`}
                              >
                                Button Text
                              </Label>
                              <Input
                                id={`carouselSlides[${index}].buttonText`}
                                name={`carouselSlides[${index}].buttonText`}
                                value={slide.buttonText}
                                onChange={homepageForm.handleChange}
                                placeholder="e.g. Shop Now"
                              />
                            </div>
                            <div className="space-y-2">
                              <Label
                                htmlFor={`carouselSlides[${index}].buttonLink`}
                              >
                                Button Link
                              </Label>
                              <Input
                                id={`carouselSlides[${index}].buttonLink`}
                                name={`carouselSlides[${index}].buttonLink`}
                                value={slide.buttonLink}
                                onChange={homepageForm.handleChange}
                                placeholder="e.g. /products"
                              />
                            </div>
                          </div>

                          {/* Color Picker Section */}
                          <div className="space-y-2">
                            <Label htmlFor={`carouselSlides[${index}].color`}>
                              Background Color
                            </Label>
                            <div className="flex gap-2">
                              <Input
                                id={`carouselSlides[${index}].color`}
                                name={`carouselSlides[${index}].color`}
                                value={slide.color}
                                onChange={homepageForm.handleChange}
                                placeholder="#3b82f6"
                              />
                              <input
                                type="color"
                                value={slide.color || "#3b82f6"}
                                onChange={(e) => {
                                  homepageForm.setFieldValue(
                                    `carouselSlides[${index}].color`,
                                    e.target.value
                                  );
                                }}
                                className="h-10 w-10 cursor-pointer rounded-md border"
                              />
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Categories</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showCategories"
                        checked={homepageForm.values.showCategories}
                        onCheckedChange={(checked) => {
                          productForm.setFieldValue("showCategories", checked);
                        }}
                      />
                      <Label htmlFor="showCategories">Show Section</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoriesTitle">Section Title</Label>
                    <Input
                      id="categoriesTitle"
                      value={homepageForm.values.categoriesTitle}
                      onChange={homepageForm.handleChange}
                      placeholder={`${
                        settingsData?.homepage.categoriesTitle ||
                        "Sort by Category"
                      }`}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => homepageForm.handleSubmit()}
                  className="ml-auto flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="categories" className="space-y-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Categories Management</CardTitle>
                  <CardDescription>
                    Manage your store categories and subcategories
                  </CardDescription>
                </div>
                <Dialog
                  open={isAddingCategory}
                  onOpenChange={setIsAddingCategory}
                >
                  <DialogTrigger asChild>
                    <Button className="flex items-center gap-2">
                      <Plus className="h-4 w-4" />
                      Add Category
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Add New Category</DialogTitle>
                      <DialogDescription>
                        Create a new category for your products. Fill in the
                        details below.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="flex flex-col md:flex-row justify-start items-start gap-4 py-4">
                      <section className="grid grid-cols-1 gap-4">
                        <div>
                          <Label
                            htmlFor="categoryName"
                            className="ml-2 text-md"
                          >
                            Category Name
                          </Label>
                          <Input
                            className="mt-2 w-full"
                            name="category"
                            id="categoryName"
                            value={createCategory.values.category}
                            onChange={createCategory.handleChange}
                          />
                        </div>
                        <div>
                          <Label htmlFor="Subcategory" className="ml-2 text-md">
                            Add Sub Category
                          </Label>

                          <div className="flex items-center gap-2">
                            <Input
                              className="mt-2 w-full"
                              name="state"
                              id="Subcategory"
                              value={createCategory.values.state}
                              onChange={createCategory.handleChange}
                            />
                            <Button
                              onClick={() => {
                                createCategory.setFieldValue("subcategory", [
                                  ...createCategory.values.subcategory,
                                  createCategory.values.state,
                                ]);
                                createCategory.setFieldValue("state", "");
                              }}
                            >
                              <Plus className="h-4 w-4" /> Add
                            </Button>
                          </div>
                        </div>
                      </section>
                      <div>
                        <Label
                          htmlFor="subcategoryName"
                          className="ml-2 text-md"
                        >
                          Sub Categories
                        </Label>
                        {createCategory.values.subcategory &&
                          createCategory.values.subcategory.map(
                            (item, index) => (
                              <p key={index} className="text-sm ml-2 py-2">
                                {index + 1}. {item}
                              </p>
                            )
                          )}
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        variant="outline"
                        onClick={() => setIsAddingCategory(false)}
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => createCategory.handleSubmit()}
                        className="gap-2"
                      >
                        <Plus className="h-4 w-4" />
                        Save
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <ScrollArea className="h-[400px] rounded-md border p-4">
                      <Accordion type="single" collapsible className="w-full">
                        {categories.map((category, index) => (
                          <AccordionItem key={index} value={category.category}>
                            <AccordionTrigger className="hover:no-underline">
                              <div className="flex items-center gap-2">
                                <span>{category.category}</span>
                                <Badge variant="outline" className="ml-2">
                                  {category.subcategory.length} subcategories
                                </Badge>
                              </div>
                            </AccordionTrigger>
                            <AccordionContent>
                              <div className="space-y-4 pt-2">
                                <div className="rounded-md border">
                                  <Table>
                                    <TableHeader>
                                      <TableRow>
                                        <TableHead>Name</TableHead>
                                      </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                      {category.subcategory.length === 0 ? (
                                        <TableRow>
                                          <TableCell
                                            colSpan={4}
                                            className="h-16 text-center"
                                          >
                                            No subcategories found. Add your
                                            first subcategory to get started.
                                          </TableCell>
                                        </TableRow>
                                      ) : (
                                        category.subcategory.map(
                                          (subcategory: any, index) => (
                                            <TableRow key={index}>
                                              <TableCell className="font-medium">
                                                {subcategory}
                                              </TableCell>

                                              <TableCell className="text-right">
                                                <Button
                                                  variant="default"
                                                  size="sm"
                                                >
                                                  Edit
                                                </Button>
                                              </TableCell>
                                            </TableRow>
                                          )
                                        )
                                      )}
                                    </TableBody>
                                  </Table>
                                </div>
                              </div>
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </ScrollArea>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="ml-auto flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="footer" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Footer Settings</CardTitle>
                <CardDescription>
                  Customize the content and appearance of your website footer
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Newsletter</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showNewsletter"
                        checked={footerForm.values.showNewsletter}
                        onCheckedChange={(checked) => {
                          productForm.setFieldValue("showSocialLinks", checked);
                        }}
                      />
                      <Label htmlFor="showNewsletter">Show Newsletter</Label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newsletterTitle">Newsletter Title</Label>
                      <Input
                        id="newsletterTitle"
                        value={footerForm.values.newsletterTitle}
                        onChange={footerForm.handleChange}
                        placeholder={`${
                          settingsData?.footer.newsletterTitle ||
                          "Subscribe to our Newsletter"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newsletterText">Newsletter Text</Label>
                      <Textarea
                        id="newsletterText"
                        value={footerForm.values.newsletterText}
                        onChange={footerForm.handleChange}
                        placeholder={`${
                          settingsData?.footer.newsletterText ||
                          "Get the latest updates and offers."
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Social Links</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showSocialLinks"
                        checked={footerForm.values.showSocialLinks}
                        onCheckedChange={(checked) => {
                          productForm.setFieldValue("showSocialLinks", checked);
                        }}
                      />
                      <Label htmlFor="showSocialLinks">Show Social Links</Label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook URL</Label>
                      <Input
                        id="facebook"
                        value={footerForm.values.facebook}
                        onChange={footerForm.handleChange}
                        placeholder={`${
                          settingsData?.footer.facebook ||
                          "https://facebook.com"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter URL</Label>
                      <Input
                        id="twitter"
                        value={footerForm.values.twitter}
                        onChange={footerForm.handleChange}
                        placeholder={`${
                          settingsData?.footer.twitter || "https://twitter.com"
                        }`}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram URL</Label>
                      <Input
                        id="instagram"
                        value={footerForm.values.instagram}
                        onChange={footerForm.handleChange}
                        placeholder={`${
                          settingsData?.footer.instagram ||
                          "https://instagram.com"
                        }`}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label htmlFor="copyrightText">Copyright Text</Label>
                  <Input
                    id="copyrightText"
                    value={footerForm.values.copyrightText}
                    onChange={footerForm.handleChange}
                    placeholder="© 2023 ShopNow. All rights reserved."
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => footerForm.submitForm()}
                  className="ml-auto flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="product" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Product Page Settings</CardTitle>
                <CardDescription>
                  Customize the appearance and features of product pages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Related Products</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showRelatedProducts"
                        checked={productForm.values.showRelatedProducts}
                        onCheckedChange={(checked) => {
                          productForm.setFieldValue(
                            "showRelatedProducts",
                            checked
                          );
                        }}
                      />
                      <Label htmlFor="showRelatedProducts">
                        Show Related Products
                      </Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relatedProductsTitle">Section Title</Label>
                    <Input
                      id="relatedProductsTitle"
                      value={productForm.values.relatedProductsTitle}
                      onChange={productForm.handleChange}
                      placeholder={`${
                        settingsData?.product.relatedProductsTitle ||
                        "Related Products"
                      }`}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Reviews</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showReviews"
                        name="showReviews"
                        checked={productForm.values.showReviews}
                        onCheckedChange={(checked) => {
                          productForm.setFieldValue("showReviews", checked);
                        }}
                      />
                      <Label htmlFor="showReviews">Show Reviews</Label>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableRatings"
                      checked={productForm.values.enableRatings}
                      onCheckedChange={productForm.handleChange}
                    />
                    <Label htmlFor="enableRatings">Enable Ratings</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={() => productForm.submitForm()}
                  className="ml-auto flex items-center gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
