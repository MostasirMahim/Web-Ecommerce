"use client";

import React, { useState } from "react";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import AdminHeader from "@/components/admin/admin-header";
import { useToast } from "@/hooks/use-toast";
import { useFormik } from "formik";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { contentCuz, getSettings, ownerCuz, storeCuz } from "@/actions/settings.action";

export default function AdminSettings() {
  const { toast } = useToast();
  const  queryClient  = useQueryClient();


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
  const { mutate: storeCustomize, isPending: isStorePending } = useMutation(
      {
        mutationFn: async (data: any) => {
          try {
            const res = await storeCuz(data);
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
          storeForm.resetForm();
          toast({
            title: "Updated successfully",
            description: "Refresh to see the changes!",
          });
        },
      }
    );
    const { mutate: contentCustomize, isPending: isGeneralPending } = useMutation(
        {
          mutationFn: async (data: any) => {
            try {
              const res = await contentCuz(data);
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
            contentForm.resetForm();
            toast({
              title: "Updated successfully",
              description: "Refresh to see the changes!",
            });
          },
        }
      );

      const { mutate: ownerCustomize, isPending: isOwnerPending } = useMutation(
          {
            mutationFn: async (data: any) => {
              try {
                const res = await ownerCuz(data);
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
              ownerForm.resetForm();
              toast({
                title: "Updated successfully",
                description: "Refresh to see the changes!",
              });
            },
          }
        );

  const [paymentSettings, setPaymentSettings] = useState({
    paymentMethods: {
      creditCard: true,
      paypal: true,
      applePay: false,
      googlePay: false,
    },
    taxRate: 8.5,
    automaticTaxCalculation: true,
  });

  const [shippingSettings, setShippingSettings] = useState({
    shippingMethods: {
      standard: true,
      express: true,
      overnight: false,
    },
    freeShippingThreshold: 50,
    internationalShipping: false,
  });

  const storeForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    },
    onSubmit: (values) => {
      storeCustomize(values);
    },
  });

  const contentForm = useFormik({
    initialValues: {
      cauroTitle: "",
      cauroSubtitle: "",
      aboutTitle: "",
      aboutContent: "",
      privacyContent: "",
      termsContent: "",
      shippingContent: "",
      returnContent: "",
    },
    onSubmit: (values) => {
      contentCustomize(values);
    },
  });

  const ownerForm = useFormik({
    initialValues: {
      name: "",
      email: "",
      phone: "",
      position: "",
    },
    onSubmit: (values) => {
      ownerCustomize(values);
    },
  });

  const handlePaymentSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Payment settings updated",
      description: "Your payment settings have been saved successfully.",
    });
  };

  const handleShippingSettingsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Shipping settings updated",
      description: "Your shipping settings have been saved successfully.",
    });
  };

  

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
            <form onSubmit={storeForm.handleSubmit}>
              <CardHeader>
                <CardTitle>Store Information</CardTitle>
                <CardDescription>
                  Manage your store details and contact information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-name">Store Name</Label>
                    <Input
                      id="name"
                      value={storeForm.values.name}
                      onChange={storeForm.handleChange}
                      placeholder={`${settingsData?.store?.name || "ShopNow"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-email">Email Address</Label>
                    <Input
                      id="email"
                      type="email"
                      value={storeForm.values.email}
                      onChange={storeForm.handleChange}
                      placeholder={`${settingsData?.store?.email || "jW7lD@example.com"}`}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={storeForm.values.phone}
                      onChange={storeForm.handleChange}
                      placeholder={`${settingsData?.store?.phone || "+1 (555) 123-4567"}`}
                    />
                  </div>
                 
                <div className="space-y-2">
                  <Label htmlFor="store-address">Address</Label>
                  <Input
                    id="address"
                    value={storeForm.values.address}
                    onChange={storeForm.handleChange}
                    placeholder={`${settingsData?.store?.address || "123 Main St, Suite 100"}`}
                  />
                </div>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="store-city">City</Label>
                    <Input
                      id="city"
                      value={storeForm.values.city}
                      onChange={storeForm.handleChange}
                      placeholder={`${settingsData?.store?.city || "New York"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-state">State/Province</Label>
                    <Input
                      id="state"
                      value={storeForm.values.state}
                      onChange={storeForm.handleChange}
                      placeholder={`${settingsData?.store?.state || "NY"}`}
                    />
                  </div>
                  
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="store-country">Country</Label>
                  <Select
                    value={storeForm.values.country}
                    onValueChange={(value) =>
                      storeForm.setFieldValue("country", value)
                    }
                  >
                    <SelectTrigger id="store-country">
                      <SelectValue placeholder="Select country" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="USA">United States</SelectItem>
                        <SelectItem value="BD">Bangladesh</SelectItem>
                        <SelectItem value="IND">India</SelectItem>
                        <SelectItem value="AUS">Australia</SelectItem>
                        <SelectItem value="DEU">Germany</SelectItem>
                        <SelectItem value="FRA">France</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="store-zipcode">ZIP/Postal Code</Label>
                    <Input
                      id="zipCode"
                      value={storeForm.values.zipCode}
                      onChange={storeForm.handleChange}
                      placeholder={`${settingsData?.store?.zipCode || "10001"}`}
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

        <TabsContent value="payment" className="space-y-4">
          <Card>
            <form onSubmit={handlePaymentSettingsSubmit}>
              <CardHeader>
                <CardTitle>Payment Settings</CardTitle>
                <CardDescription>
                  Configure payment methods and tax settings
                </CardDescription>
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
                            paymentMethods: {
                              ...paymentSettings.paymentMethods,
                              creditCard: checked,
                            },
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
                            paymentMethods: {
                              ...paymentSettings.paymentMethods,
                              paypal: checked,
                            },
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
                            paymentMethods: {
                              ...paymentSettings.paymentMethods,
                              applePay: checked,
                            },
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
                            paymentMethods: {
                              ...paymentSettings.paymentMethods,
                              googlePay: checked,
                            },
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
                        setPaymentSettings({
                          ...paymentSettings,
                          taxRate: Number.parseFloat(e.target.value),
                        })
                      }
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="automatic-tax"
                      checked={paymentSettings.automaticTaxCalculation}
                      onCheckedChange={(checked) =>
                        setPaymentSettings({
                          ...paymentSettings,
                          automaticTaxCalculation: checked,
                        })
                      }
                    />
                    <Label htmlFor="automatic-tax">
                      Enable automatic tax calculation
                    </Label>
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
                <CardDescription>
                  Configure shipping methods and options
                </CardDescription>
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
                            shippingMethods: {
                              ...shippingSettings.shippingMethods,
                              standard: checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor="shipping-standard">
                        Standard Shipping
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="shipping-express"
                        checked={shippingSettings.shippingMethods.express}
                        onCheckedChange={(checked) =>
                          setShippingSettings({
                            ...shippingSettings,
                            shippingMethods: {
                              ...shippingSettings.shippingMethods,
                              express: checked,
                            },
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
                            shippingMethods: {
                              ...shippingSettings.shippingMethods,
                              overnight: checked,
                            },
                          })
                        }
                      />
                      <Label htmlFor="shipping-overnight">
                        Overnight Shipping
                      </Label>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Shipping Options</h3>
                  <div className="space-y-2">
                    <Label htmlFor="free-shipping-threshold">
                      Free Shipping Threshold ($)
                    </Label>
                    <Input
                      id="free-shipping-threshold"
                      type="number"
                      min="0"
                      step="0.01"
                      value={shippingSettings.freeShippingThreshold}
                      onChange={(e) =>
                        setShippingSettings({
                          ...shippingSettings,
                          freeShippingThreshold: Number.parseFloat(
                            e.target.value
                          ),
                        })
                      }
                    />
                    <p className="text-xs text-muted-foreground">
                      Orders above this amount qualify for free shipping. Set to
                      0 to disable.
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch
                      id="international-shipping"
                      checked={shippingSettings.internationalShipping}
                      onCheckedChange={(checked) =>
                        setShippingSettings({
                          ...shippingSettings,
                          internationalShipping: checked,
                        })
                      }
                    />
                    <Label htmlFor="international-shipping">
                      Enable international shipping
                    </Label>
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
            <form onSubmit={contentForm.handleSubmit}>
              <CardHeader>
                <CardTitle>Website Content</CardTitle>
                <CardDescription>
                  Manage your website content and pages
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Homepage Hero Section</h3>
                  <div className="space-y-2">
                    <Label htmlFor="hero-title">Carousel Title</Label>
                    <Input
                      id="heroTitle"
                      value={contentForm.values.cauroTitle}
                      onChange={contentForm.handleChange}
                      placeholder={`${settingsData?.content?.cauroTitle || "Welcome to ShopNow"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="hero-subtitle">Carousel Subtitle</Label>
                    <Input
                      id="heroSubtitle"
                      value={contentForm.values.cauroSubtitle}
                      onChange={contentForm.handleChange}
                      placeholder={`${settingsData?.content?.cauroSubtitle || "Your one-stop shop for everything!"}`}   
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">About Page</h3>
                  <div className="space-y-2">
                    <Label htmlFor="about-title">About Title</Label>
                    <Input
                      id="aboutTitle"
                      value={contentForm.values.aboutTitle}
                      onChange={contentForm.handleChange}
                      placeholder={`${settingsData?.content?.aboutTitle || "About Us"}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="about-content">About Content</Label>
                    <Textarea
                      id="aboutContent"
                      name="aboutContent"
                      rows={5}
                      value={contentForm.values.aboutContent}
                      onChange={contentForm.handleChange}
                      placeholder={`${settingsData?.content?.aboutContent || "Learn more about our story, mission, and values."}`}
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Legal Policies</h3>
          
                  <div className="space-y-2">
                    <Label htmlFor="privacy-content">Privacy Content</Label>
                    <Textarea
                      id="privacy-content"
                      name="privacyContent"
                      rows={5}
                      value={contentForm.values.privacyContent}
                      onChange={contentForm.handleChange}
                      placeholder={`${settingsData?.content?.privacyContent || "Your privacy policy content goes here."}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="terms-content">Terms Content</Label>
                    <Textarea
                      id="terms-content"
                      name="termsContent"
                      rows={5}
                      value={contentForm.values.termsContent}
                      onChange={contentForm.handleChange}
                      placeholder={`${settingsData?.content?.termsContent || "Your terms and conditions content goes here."}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shipping-content">Shipping Content</Label>
                    <Textarea
                      id="shipping-content"
                      name="shippingContent"
                      rows={5}
                      value={contentForm.values.shippingContent}
                      onChange={contentForm.handleChange}
                      placeholder={`${settingsData?.content?.shippingContent || "Your shipping policy content goes here."}`}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="return-content">Return Content</Label>
                    <Textarea
                      id="return-content"
                      name="returnContent"
                      rows={5}
                      value={contentForm.values.returnContent}
                      onChange={contentForm.handleChange}
                      placeholder={`${settingsData?.content?.returnContent || "Your return policy content goes here."}`}
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
            <form onSubmit={ownerForm.handleSubmit}>
              <CardHeader>
                <CardTitle>Owner Details</CardTitle>
                <CardDescription>
                  Manage store owner information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="owner-name">Name</Label>
                  <Input
                    id="name"
                    value={ownerForm.values.name}
                    onChange={ownerForm.handleChange}
                    placeholder={`${settingsData?.owner?.name || "John Doe"}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={ownerForm.values.email}
                    onChange={ownerForm.handleChange}
                    placeholder={`${settingsData?.owner?.email || "b5Ht4@example.com"}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-phone">Phone</Label>
                  <Input
                    id="phone"
                    value={ownerForm.values.phone}
                    onChange={ownerForm.handleChange}
                    placeholder={`${settingsData?.owner?.phone || "+1 (555) 234-5678"}`}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="owner-position">Position</Label>
                  <Input
                    id="position"
                    value={ownerForm.values.position}
                    onChange={ownerForm.handleChange}
                    placeholder={`${settingsData?.owner?.position || "Founder & CEO"}`}
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
              <CardDescription>
                Configure email and system notifications
              </CardDescription>
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
                    <Label htmlFor="notify-order-status">
                      Order status changes
                    </Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-low-stock" defaultChecked />
                    <Label htmlFor="notify-low-stock">Low stock alerts</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="notify-new-customer" defaultChecked />
                    <Label htmlFor="notify-new-customer">
                      New customer registration
                    </Label>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="notification-email">Notification Email</Label>
                  <Input
                    id="notification-email"
                    type="email"
                    defaultValue="admin@shopnow.com"
                  />
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
  );
}
