"use client"

import { useState } from "react"
import { Palette, ImageIcon, Type, LayoutGrid, Save } from "lucide-react"

import AdminHeader from "@/components/admin/admin-header"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { products } from "@/lib/data"

export default function CustomizePage() {
  const [activeTab, setActiveTab] = useState("general")

  // Mock data for customization settings
  const [settings, setSettings] = useState({
    general: {
      siteName: "ShopNow",
      siteDescription: "Your One-Stop E-commerce Shop",
      logo: "/logo.png",
      favicon: "/favicon.ico",
      primaryColor: "#0f172a",
      accentColor: "#3b82f6",
    },
    homepage: {
      heroTitle: "Discover Amazing Products",
      heroSubtitle: "Shop the latest trends at unbeatable prices",
      heroImage: "/hero.jpg",
      showFeaturedProducts: true,
      featuredProductsTitle: "Featured Products",
      featuredProductIds: ["1", "2", "3", "4"],
      showNewArrivals: true,
      newArrivalsTitle: "New Arrivals",
      showCategories: true,
      categoriesTitle: "Shop by Category",
    },
    footer: {
      showNewsletter: true,
      newsletterTitle: "Subscribe to our newsletter",
      newsletterText: "Get the latest updates on new products and upcoming sales",
      copyrightText: "© 2023 ShopNow. All rights reserved.",
      showSocialLinks: true,
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com",
    },
    product: {
      showRelatedProducts: true,
      relatedProductsTitle: "You may also like",
      showReviews: true,
      enableRatings: true,
    },
  })

  const handleGeneralChange = (field, value) => {
    setSettings({
      ...settings,
      general: {
        ...settings.general,
        [field]: value,
      },
    })
  }

  const handleHomepageChange = (field, value) => {
    setSettings({
      ...settings,
      homepage: {
        ...settings.homepage,
        [field]: value,
      },
    })
  }

  const handleFooterChange = (field, value) => {
    setSettings({
      ...settings,
      footer: {
        ...settings.footer,
        [field]: value,
      },
    })
  }

  const handleProductChange = (field, value) => {
    setSettings({
      ...settings,
      product: {
        ...settings.product,
        [field]: value,
      },
    })
  }

  const handleFeaturedProductChange = (productId) => {
    const currentIds = settings.homepage.featuredProductIds
    const newIds = currentIds.includes(productId)
      ? currentIds.filter((id) => id !== productId)
      : [...currentIds, productId]

    handleHomepageChange("featuredProductIds", newIds)
  }

  const handleSaveSettings = () => {
    // In a real app, this would save to a database
    console.log("Saving settings:", settings)
    // Show success message
    alert("Settings saved successfully!")
  }

  return (
    <div className="container mx-auto p-4 md:p-6">
      <AdminHeader
        title="Customize Website"
        description="Customize the appearance and content of your website"
        action={{
          label: "Save Changes",
          onClick: handleSaveSettings,
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
                <CardDescription>Customize the general appearance of your website</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="siteName">Site Name</Label>
                    <Input
                      id="siteName"
                      value={settings.general.siteName}
                      onChange={(e) => handleGeneralChange("siteName", e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="siteDescription">Site Description</Label>
                    <Input
                      id="siteDescription"
                      value={settings.general.siteDescription}
                      onChange={(e) => handleGeneralChange("siteDescription", e.target.value)}
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="logo">Logo URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="logo"
                        value={settings.general.logo}
                        onChange={(e) => handleGeneralChange("logo", e.target.value)}
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
                        value={settings.general.favicon}
                        onChange={(e) => handleGeneralChange("favicon", e.target.value)}
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
                        value={settings.general.primaryColor}
                        onChange={(e) => handleGeneralChange("primaryColor", e.target.value)}
                      />
                      <input
                        type="color"
                        value={settings.general.primaryColor}
                        onChange={(e) => handleGeneralChange("primaryColor", e.target.value)}
                        className="h-10 w-10 cursor-pointer rounded-md border"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="accentColor">Accent Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="accentColor"
                        value={settings.general.accentColor}
                        onChange={(e) => handleGeneralChange("accentColor", e.target.value)}
                      />
                      <input
                        type="color"
                        value={settings.general.accentColor}
                        onChange={(e) => handleGeneralChange("accentColor", e.target.value)}
                        className="h-10 w-10 cursor-pointer rounded-md border"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto flex items-center gap-2">
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
                <CardDescription>Customize the content and layout of your homepage</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Hero Section</h3>
                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="heroTitle">Hero Title</Label>
                      <Input
                        id="heroTitle"
                        value={settings.homepage.heroTitle}
                        onChange={(e) => handleHomepageChange("heroTitle", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="heroSubtitle">Hero Subtitle</Label>
                      <Input
                        id="heroSubtitle"
                        value={settings.homepage.heroSubtitle}
                        onChange={(e) => handleHomepageChange("heroSubtitle", e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="heroImage">Hero Image URL</Label>
                    <div className="flex gap-2">
                      <Input
                        id="heroImage"
                        value={settings.homepage.heroImage}
                        onChange={(e) => handleHomepageChange("heroImage", e.target.value)}
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
                        checked={settings.homepage.showFeaturedProducts}
                        onCheckedChange={(checked) => handleHomepageChange("showFeaturedProducts", checked)}
                      />
                      <Label htmlFor="showFeaturedProducts">Show Section</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="featuredProductsTitle">Section Title</Label>
                    <Input
                      id="featuredProductsTitle"
                      value={settings.homepage.featuredProductsTitle}
                      onChange={(e) => handleHomepageChange("featuredProductsTitle", e.target.value)}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Select Featured Products</Label>
                    <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                      {products.slice(0, 8).map((product) => (
                        <div
                          key={product.id}
                          className={`cursor-pointer rounded-md border p-2 transition-all ${
                            settings.homepage.featuredProductIds.includes(product.id)
                              ? "border-primary bg-primary/10"
                              : "hover:border-muted-foreground"
                          }`}
                          onClick={() => handleFeaturedProductChange(product.id)}
                        >
                          <div className="aspect-square w-full overflow-hidden rounded-md bg-muted">
                            <img
                              src={product.images[0] || "/placeholder.svg"}
                              alt={product.name}
                              className="h-full w-full object-cover"
                            />
                          </div>
                          <div className="mt-2 text-sm font-medium">{product.name}</div>
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
                        checked={settings.homepage.showNewArrivals}
                        onCheckedChange={(checked) => handleHomepageChange("showNewArrivals", checked)}
                      />
                      <Label htmlFor="showNewArrivals">Show Section</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="newArrivalsTitle">Section Title</Label>
                    <Input
                      id="newArrivalsTitle"
                      value={settings.homepage.newArrivalsTitle}
                      onChange={(e) => handleHomepageChange("newArrivalsTitle", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Categories</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showCategories"
                        checked={settings.homepage.showCategories}
                        onCheckedChange={(checked) => handleHomepageChange("showCategories", checked)}
                      />
                      <Label htmlFor="showCategories">Show Section</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="categoriesTitle">Section Title</Label>
                    <Input
                      id="categoriesTitle"
                      value={settings.homepage.categoriesTitle}
                      onChange={(e) => handleHomepageChange("categoriesTitle", e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto flex items-center gap-2">
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
                <CardDescription>Customize the content and appearance of your website footer</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Newsletter</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showNewsletter"
                        checked={settings.footer.showNewsletter}
                        onCheckedChange={(checked) => handleFooterChange("showNewsletter", checked)}
                      />
                      <Label htmlFor="showNewsletter">Show Newsletter</Label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="newsletterTitle">Newsletter Title</Label>
                      <Input
                        id="newsletterTitle"
                        value={settings.footer.newsletterTitle}
                        onChange={(e) => handleFooterChange("newsletterTitle", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="newsletterText">Newsletter Text</Label>
                      <Textarea
                        id="newsletterText"
                        value={settings.footer.newsletterText}
                        onChange={(e) => handleFooterChange("newsletterText", e.target.value)}
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
                        checked={settings.footer.showSocialLinks}
                        onCheckedChange={(checked) => handleFooterChange("showSocialLinks", checked)}
                      />
                      <Label htmlFor="showSocialLinks">Show Social Links</Label>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="space-y-2">
                      <Label htmlFor="facebook">Facebook URL</Label>
                      <Input
                        id="facebook"
                        value={settings.footer.facebook}
                        onChange={(e) => handleFooterChange("facebook", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="twitter">Twitter URL</Label>
                      <Input
                        id="twitter"
                        value={settings.footer.twitter}
                        onChange={(e) => handleFooterChange("twitter", e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="instagram">Instagram URL</Label>
                      <Input
                        id="instagram"
                        value={settings.footer.instagram}
                        onChange={(e) => handleFooterChange("instagram", e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="space-y-2 pt-4 border-t">
                  <Label htmlFor="copyrightText">Copyright Text</Label>
                  <Input
                    id="copyrightText"
                    value={settings.footer.copyrightText}
                    onChange={(e) => handleFooterChange("copyrightText", e.target.value)}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto flex items-center gap-2">
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
                <CardDescription>Customize the appearance and features of product pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Related Products</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showRelatedProducts"
                        checked={settings.product.showRelatedProducts}
                        onCheckedChange={(checked) => handleProductChange("showRelatedProducts", checked)}
                      />
                      <Label htmlFor="showRelatedProducts">Show Related Products</Label>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="relatedProductsTitle">Section Title</Label>
                    <Input
                      id="relatedProductsTitle"
                      value={settings.product.relatedProductsTitle}
                      onChange={(e) => handleProductChange("relatedProductsTitle", e.target.value)}
                    />
                  </div>
                </div>

                <div className="space-y-4 pt-4 border-t">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-medium">Reviews</h3>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="showReviews"
                        checked={settings.product.showReviews}
                        onCheckedChange={(checked) => handleProductChange("showReviews", checked)}
                      />
                      <Label htmlFor="showReviews">Show Reviews</Label>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Switch
                      id="enableRatings"
                      checked={settings.product.enableRatings}
                      onCheckedChange={(checked) => handleProductChange("enableRatings", checked)}
                    />
                    <Label htmlFor="enableRatings">Enable Ratings</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={handleSaveSettings} className="ml-auto flex items-center gap-2">
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
