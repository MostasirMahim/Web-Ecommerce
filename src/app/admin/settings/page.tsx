"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import AdminHeader from "@/components/admin/admin-header"
import { useToast } from "@/hooks/use-toast"

export default function AdminSettings() {
  const { toast } = useToast()
  const [storeSettings, setStoreSettings] = useState({
    name: "ShopNow",
    email: "info@shopnow.com",
    phone: "+1 (555) 123-4567",
    address: "123 Commerce St, Suite 100",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "USA",
    currency: "USD",
    timezone: "America/New_York",
    logo: null,
    favicon: null,
  })

  const [paymentSettings, setPaymentSettings] = useState({
    paymentMethods: {
      creditCard: true,
      paypal: true,
      applePay: false,
      googlePay: false,
    },
    taxRate: 8.5,
    automaticTaxCalculation: true,
  })

  const [shippingSettings, setShippingSettings] = useState({
    shippingMethods: {
      standard: true,
      express: true,
      overnight: false,
    },
    freeShippingThreshold: 50,
    internationalShipping: false,
  })

  const [websiteContent, setWebsiteContent] = useState({
    heroTitle: "Welcome to ShopNow",
    heroSubtitle: "Your one-stop shop for all your needs",
    aboutTitle: "About Us",
    aboutContent:
      "ShopNow is a premier online shopping destination offering high-quality products at competitive prices. Founded in 2020, we've quickly grown to become a trusted retailer for thousands of customers worldwide.",
    contactEmail: "contact@shopnow.com",
    contactPhone: "+1 (555) 987-6543",
    contactAddress: "123 Commerce St, New York, NY 10001",
    socialLinks: {
      facebook: "https://facebook.com/shopnow",
      twitter: "https://twitter.com/shopnow",
      instagram: "https://instagram.com/shopnow",
    },
  })

  const [ownerDetails, setOwnerDetails] = useState({
    name: "John Doe",
    email: "john.doe@shopnow.com",
    phone: "+1 (555) 234-5678",
    position: "CEO & Founder",
  })

  const handleStoreSettingsSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Store settings updated",
      description: "Your store settings have been saved successfully.",
    })
  }

  const handlePaymentSettingsSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Payment settings updated",
      description: "Your payment settings have been saved successfully.",
    })
  }

  const handleShippingSettingsSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Shipping settings updated",
      description: "Your shipping settings have been saved successfully.",
    })
  }

  const handleWebsiteContentSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Website content updated",
      description: "Your website content has been saved successfully.",
    })
  }

  const handleOwnerDetailsSubmit = (e) => {
    e.preventDefault()
    toast({
      title: "Owner details updated",
      description: "Your owner details have been saved successfully.",
    })
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8">
      <AdminHeader title="Settings" description="Manage your store settings" />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-6">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="payment">Payment</TabsTrigger>
          <TabsTrigger value="shipping">Shipping</TabsTrigger>
          <TabsTrigger value="content">Content</TabsTrigger>
          <TabsTrigger value="owner">Owner</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <form onSubmit={handleStoreSettingsSubmit}>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>Manage your store details and contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="store-name"
                      value={storeSettings.name}
                      onChange={(e) => setStoreSettings({ ...storeSettings, name: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email Address</Label>
                    <Input
                      id="store-email"
                      type="email"
                      value={storeSettings.email}
                      onChange={(e) => setStoreSettings({ ...storeSettings, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Phone Number</Label>
                    <Input
                      id="store-phone"
                      value={storeSettings.phone}
                      onChange={(e) => setStoreSettings({ ...storeSettings, phone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-currency">Currency</Label>
                    <Select
                      value={storeSettings.currency}
                      onValueChange={(value) => setStoreSettings({ ...storeSettings, currency: value })}
                    >
                      <SelectTrigger id="store-currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectItem value="USD">USD - US Dollar</SelectItem>
                          <SelectItem value="EUR">EUR - Euro</SelectItem>
                          <SelectItem value="GBP">GBP - British Pound</SelectItem>
                          <SelectItem value="CAD">CAD - Canadian Dollar</SelectItem>
                          <SelectItem value="AUD">AUD - Australian Dollar</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-address">Address</Label>
                  <Input
                    id="store-address"
                    value={storeSettings.address}
                    onChange={(e) => setStoreSettings({ ...storeSettings, address: e.target.value })}
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                  <div className="space-y-2">
                    <Label htmlFor="store-city">City</Label>
                    <Input
                      id="store-city"
                      value={storeSettings.city}
                      onChange={(e) => setStoreSettings({ ...storeSettings, city: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-state">State/Province</Label>
                    <Input
                      id="store-state"
                      value={storeSettings.state}
                      onChange={(e) => setStoreSettings({ ...storeSettings, state: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-zipcode">ZIP/Postal Code</Label>
                    <Input
                      id="store-zipcode"
                      value={storeSettings.zipCode}
                      onChange={(e) => setStoreSettings({ ...storeSettings, zipCode: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-country">Country</Label>
                  <Select
                    value={storeSettings.country}
                    onValueChange={(value) => setStoreSettings({ ...storeSettings, country: value })}
                  >
                    <SelectTrigger id="store-country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="CAN">Canada</SelectItem>
                        <SelectItem value="GBR">United Kingdom</SelectItem>
                        <SelectItem value="AUS">Australia</SelectItem>
                        <SelectItem value="DEU">Germany</SelectItem>
                        <SelectItem value="FRA">France</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="store-timezone">Timezone</Label>
                  <Select
                    value={storeSettings.timezone}
                    onValueChange={(value) => setStoreSettings({ ...storeSettings, timezone: value })}
                  >
                    <SelectTrigger id="store-timezone">
                      <SelectValue placeholder="Select timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="America/New_York">Eastern Time (ET)</SelectItem>
                        <SelectItem value="America/Chicago">Central Time (CT)</SelectItem>
                        <SelectItem value="America/Denver">Mountain Time (MT)</SelectItem>
                        <SelectItem value="America/Los_Angeles">Pacific Time (PT)</SelectItem>
                        <SelectItem value="Europe/London">Greenwich Mean Time (GMT)</SelectItem>
                        <SelectItem value="Europe/Paris">Central European Time (CET)</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <form onSubmit={handlePaymentSettingsSubmit}>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>Configure payment methods and tax settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Payment Methods</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="payment-credit-card"
                        checked={paymentSettings.paymentMethods.creditCard}
                        onCheckedChange={(checked) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            paymentMethods: { ...paymentSettings.paymentMethods, creditCard: checked },
                          })
                        }
                      />
                      <Label htmlFor="payment-credit-card">Credit Card</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="payment-paypal"
                        checked={paymentSettings.paymentMethods.paypal}
                        onCheckedChange={(checked) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            paymentMethods: { ...paymentSettings.paymentMethods, paypal: checked },
                          })
                        }
                      />
                      <Label htmlFor="payment-paypal">PayPal</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="payment-apple-pay"
                        checked={paymentSettings.paymentMethods.applePay}
                        onCheckedChange={(checked) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            paymentMethods: { ...paymentSettings.paymentMethods, applePay: checked },
                          })
                        }
                      />
                      <Label htmlFor="payment-apple-pay">Apple Pay</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="payment-google-pay"
                        checked={paymentSettings.paymentMethods.googlePay}
                        onCheckedChange={(checked) =>
                          setPaymentSettings({
                            ...paymentSettings,
                            paymentMethods: { ...paymentSettings.paymentMethods, googlePay: checked },
                          })
                        }
                      />
                      <Label htmlFor="payment-google-pay">Google Pay</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Tax Settings</h3>
                  <div className="space-y-2">
                    <Label htmlFor="tax-rate">Default Tax Rate (%)</Label>
                    <Input
                      id="tax-rate"
                      type="number"
                      min="0"
                      max="100"
                      step="0.01"
                      value={paymentSettings.taxRate}
                      onChange={(e) =>
                        setPaymentSettings({ ...paymentSettings, taxRate: Number.parseFloat(e.target.value) })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="automatic-tax"
                      checked={paymentSettings.automaticTaxCalculation}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({ ...paymentSettings, automaticTaxCalculation: checked })
                      }
                    />
                    <Label htmlFor="automatic-tax">Enable automatic tax calculation</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="shipping" className="space-y-4">
          <Card>
            <form onSubmit={handleShippingSettingsSubmit}>
              <CardHeader>
                <CardTitle>Shipping Settings</CardTitle>
                <CardDescription>Configure shipping methods and options</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Methods</h3>
                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="shipping-standard"
                        checked={shippingSettings.shippingMethods.standard}
                        onCheckedChange={(checked) =>
                          setShippingSettings({
                            ...shippingSettings,
                            shippingMethods: { ...shippingSettings.shippingMethods, standard: checked },
                          })
                        }
                      />
                      <Label htmlFor="shipping-standard">Standard Shipping</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="shipping-express"
                        checked={shippingSettings.shippingMethods.express}
                        onCheckedChange={(checked) =>
                          setShippingSettings({
                            ...shippingSettings,
                            shippingMethods: { ...shippingSettings.shippingMethods, express: checked },
                          })
                        }
                      />
                      <Label htmlFor="shipping-express">Express Shipping</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="shipping-overnight"
                        checked={shippingSettings.shippingMethods.overnight}
                        onCheckedChange={(checked) =>
                          setShippingSettings({
                            ...shippingSettings,
                            shippingMethods: { ...shippingSettings.shippingMethods, overnight: checked },
                          })
                        }
                      />
                      <Label htmlFor="shipping-overnight">Overnight Shipping</Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Options</h3>
                  <div className="space-y-2">
                    <Label htmlFor="free-shipping-threshold">Free Shipping Threshold ($)</Label>
                    <Input
                      id="free-shipping-threshold"
                      type="number"
                      min="0"
                      step="0.01"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) =>
                        setShippingSettings({
                          ...shippingSettings,
                          freeShippingThreshold: Number.parseFloat(e.target.value),
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Orders above this amount qualify for free shipping. Set to 0 to disable.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="international-shipping"
                      checked={shippingSettings.internationalShipping}
                      onCheckedChange={(checked) =>
                        setShippingSettings({ ...shippingSettings, internationalShipping: checked })
                      }
                    />
                    <Label htmlFor="international-shipping">Enable international shipping</Label>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="content" className="space-y-4">
          <Card>
            <form onSubmit={handleWebsiteContentSubmit}>
              <CardHeader>
                <CardTitle>Website Content</CardTitle>
                <CardDescription>Manage your website content and pages</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Homepage Hero Section</h3>
                  <div className="space-y-2">
                    <Label htmlFor="hero-title">Hero Title</Label>
                    <Input
                      id="hero-title"
                      value={websiteContent.heroTitle}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, heroTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
                    <Input
                      id="hero-subtitle"
                      value={websiteContent.heroSubtitle}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, heroSubtitle: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">About Page</h3>
                  <div className="space-y-2">
                    <Label htmlFor="about-title">About Title</Label>
                    <Input
                      id="about-title"
                      value={websiteContent.aboutTitle}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, aboutTitle: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about-content">About Content</Label>
                    <Textarea
                      id="about-content"
                      rows={5}
                      value={websiteContent.aboutContent}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, aboutContent: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Contact Information</h3>
                  <div className="space-y-2">
                    <Label htmlFor="contact-email">Contact Email</Label>
                    <Input
                      id="contact-email"
                      type="email"
                      value={websiteContent.contactEmail}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, contactEmail: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-phone">Contact Phone</Label>
                    <Input
                      id="contact-phone"
                      value={websiteContent.contactPhone}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, contactPhone: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="contact-address">Contact Address</Label>
                    <Input
                      id="contact-address"
                      value={websiteContent.contactAddress}
                      onChange={(e) => setWebsiteContent({ ...websiteContent, contactAddress: e.target.value })}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Social Media Links</h3>
                  <div className="space-y-2">
                    <Label htmlFor="social-facebook">Facebook</Label>
                    <Input
                      id="social-facebook"
                      value={websiteContent.socialLinks.facebook}
                      onChange={(e) =>
                        setWebsiteContent({
                          ...websiteContent,
                          socialLinks: { ...websiteContent.socialLinks, facebook: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-twitter">Twitter</Label>
                    <Input
                      id="social-twitter"
                      value={websiteContent.socialLinks.twitter}
                      onChange={(e) =>
                        setWebsiteContent({
                          ...websiteContent,
                          socialLinks: { ...websiteContent.socialLinks, twitter: e.target.value },
                        })
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="social-instagram">Instagram</Label>
                    <Input
                      id="social-instagram"
                      value={websiteContent.socialLinks.instagram}
                      onChange={(e) =>
                        setWebsiteContent({
                          ...websiteContent,
                          socialLinks: { ...websiteContent.socialLinks, instagram: e.target.value },
                        })
                      }
                    />
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="owner" className="space-y-4">
          <Card>
            <form onSubmit={handleOwnerDetailsSubmit}>
              <CardHeader>
                <CardTitle>Owner Details</CardTitle>
                <CardDescription>Manage store owner information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Name</Label>
                  <Input
                    id="owner-name"
                    value={ownerDetails.name}
                    onChange={(e) => setOwnerDetails({ ...ownerDetails, name: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <Input
                    id="owner-email"
                    type="email"
                    value={ownerDetails.email}
                    onChange={(e) => setOwnerDetails({ ...ownerDetails, email: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-phone">Phone</Label>
                  <Input
                    id="owner-phone"
                    value={ownerDetails.phone}
                    onChange={(e) => setOwnerDetails({ ...ownerDetails, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-position">Position</Label>
                  <Input
                    id="owner-position"
                    value={ownerDetails.position}
                    onChange={(e) => setOwnerDetails({ ...ownerDetails, position: e.target.value })}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button type="submit">Save Changes</Button>
              </CardFooter>
            </form>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Configure email and system notifications</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <h3 className="text-lg font-medium">Email Notifications</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-new-order" defaultChecked />
                    <Label htmlFor="notify-new-order">New order received</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-order-status" defaultChecked />
                    <Label htmlFor="notify-order-status">Order status changes</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-low-stock" defaultChecked />
                    <Label htmlFor="notify-low-stock">Low stock alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-new-customer" defaultChecked />
                    <Label htmlFor="notify-new-customer">New customer registration</Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input id="notification-email" type="email" defaultValue="admin@shopnow.com" />
                  <p className="text-xs text-muted-foreground">
                    All system notifications will be sent to this email address.
                  </p>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
