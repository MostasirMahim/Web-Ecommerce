"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { CreditCard, Heart, LogOut, Package, Settings, User } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { type UserProfile, useUserStore } from "@/lib/store"

export default function AccountPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { isLoggedIn, profile, login, logout, updateProfile } = useUserStore()
  const [activeTab, setActiveTab] = useState("profile")
  const [formData, setFormData] = useState<UserProfile>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "",
  })
  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  })

  // Redirect if not logged in
  useEffect(() => {
    if (!isLoggedIn && activeTab !== "login") {
      setActiveTab("login")
    }
  }, [isLoggedIn, activeTab])

  // Initialize form data from profile
  useEffect(() => {
    if (profile) {
      setFormData(profile)
    }
  }, [profile])

  const handleProfileUpdate = (e) => {
    e.preventDefault()
    updateProfile(formData)

    toast({
      title: "Profile updated",
      description: "Your profile information has been updated successfully.",
    })
  }

  const handleLogin = (e) => {
    e.preventDefault()

    // Demo login - in a real app, this would validate with a backend
    if (loginForm.email && loginForm.password) {
      login({
        firstName: "John",
        lastName: "Doe",
        email: loginForm.email,
        phone: "555-123-4567",
        address: "123 Main St",
        city: "New York",
        state: "NY",
        zipCode: "10001",
        country: "USA",
      })

      toast({
        title: "Logged in successfully",
        description: "Welcome back to ShopNow!",
      })

      setActiveTab("profile")
    } else {
      toast({
        title: "Login failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      })
    }
  }

  const handleLogout = () => {
    logout()
    router.push("/")

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    })
  }

  if (!isLoggedIn && activeTab !== "login") {
    return (
      <div className="container mx-auto flex min-h-[70vh] items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Login Required</CardTitle>
            <CardDescription>Please log in to access your account.</CardDescription>
          </CardHeader>
          <CardFooter>
            <Button className="w-full" onClick={() => setActiveTab("login")}>
              Go to Login
            </Button>
          </CardFooter>
        </Card>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold sm:text-3xl">My Account</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <div className="flex flex-col gap-4 md:flex-row">
          {/* Sidebar for larger screens */}
          <div className="hidden w-64 shrink-0 md:block">
            <div className="sticky top-20 space-y-4">
              {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-3 rounded-lg border p-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
                      {profile?.firstName?.charAt(0)}
                      {profile?.lastName?.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">
                        {profile?.firstName} {profile?.lastName}
                      </p>
                      <p className="text-sm text-muted-foreground">{profile?.email}</p>
                    </div>
                  </div>
                  <TabsList className="flex h-auto flex-col justify-start gap-1 bg-transparent p-0">
                    <TabsTrigger
                      value="profile"
                      className="flex w-full justify-start gap-2 data-[state=active]:bg-muted"
                    >
                      <User className="h-4 w-4" />
                      Profile
                    </TabsTrigger>
                    <TabsTrigger
                      value="orders"
                      className="flex w-full justify-start gap-2 data-[state=active]:bg-muted"
                    >
                      <Package className="h-4 w-4" />
                      Orders
                    </TabsTrigger>
                    <TabsTrigger
                      value="wishlist"
                      className="flex w-full justify-start gap-2 data-[state=active]:bg-muted"
                    >
                      <Heart className="h-4 w-4" />
                      Wishlist
                    </TabsTrigger>
                    <TabsTrigger
                      value="payment"
                      className="flex w-full justify-start gap-2 data-[state=active]:bg-muted"
                    >
                      <CreditCard className="h-4 w-4" />
                      Payment Methods
                    </TabsTrigger>
                    <TabsTrigger
                      value="settings"
                      className="flex w-full justify-start gap-2 data-[state=active]:bg-muted"
                    >
                      <Settings className="h-4 w-4" />
                      Settings
                    </TabsTrigger>
                    <Separator className="my-2" />
                    <Button variant="ghost" className="flex w-full justify-start gap-2" onClick={handleLogout}>
                      <LogOut className="h-4 w-4" />
                      Logout
                    </Button>
                  </TabsList>
                </>
              ) : (
                <TabsList className="flex h-auto flex-col justify-start gap-1 bg-transparent p-0">
                  <TabsTrigger value="login" className="flex w-full justify-start gap-2 data-[state=active]:bg-muted">
                    <User className="h-4 w-4" />
                    Login
                  </TabsTrigger>
                </TabsList>
              )}
            </div>
          </div>

          {/* Mobile tabs */}
          <div className="md:hidden">
            <TabsList className="w-full">
              {isLoggedIn ? (
                <>
                  <TabsTrigger value="profile">Profile</TabsTrigger>
                  <TabsTrigger value="orders">Orders</TabsTrigger>
                  <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
                  <TabsTrigger value="settings">Settings</TabsTrigger>
                </>
              ) : (
                <TabsTrigger value="login">Login</TabsTrigger>
              )}
            </TabsList>
          </div>

          {/* Tab content */}
          <div className="flex-1">
            {isLoggedIn ? (
              <>
                <TabsContent value="profile" className="mt-0 md:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Profile Information</CardTitle>
                      <CardDescription>Update your personal information</CardDescription>
                    </CardHeader>
                    <form onSubmit={handleProfileUpdate}>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                              id="firstName"
                              value={formData.firstName}
                              onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                              id="lastName"
                              value={formData.lastName}
                              onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                              id="email"
                              type="email"
                              value={formData.email}
                              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="phone">Phone</Label>
                            <Input
                              id="phone"
                              type="tel"
                              value={formData.phone}
                              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                            />
                          </div>
                        </div>

                        <Separator />
                        <h3 className="text-lg font-medium">Address Information</h3>

                        <div className="space-y-2">
                          <Label htmlFor="address">Street Address</Label>
                          <Input
                            id="address"
                            value={formData.address}
                            onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="city">City</Label>
                            <Input
                              id="city"
                              value={formData.city}
                              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="state">State</Label>
                            <Input
                              id="state"
                              value={formData.state}
                              onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="zipCode">ZIP Code</Label>
                            <Input
                              id="zipCode"
                              value={formData.zipCode}
                              onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="country">Country</Label>
                          <Input
                            id="country"
                            value={formData.country}
                            onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                          />
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button type="submit">Save Changes</Button>
                      </CardFooter>
                    </form>
                  </Card>
                </TabsContent>

                <TabsContent value="orders" className="mt-0 md:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Order History</CardTitle>
                      <CardDescription>View and track your recent orders</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <Package className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No orders yet</h3>
                        <p className="mt-1 text-muted-foreground">
                          When you place an order, it will appear here for you to track.
                        </p>
                        <Button className="mt-4" asChild>
                          <Link href="/products">Start Shopping</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="wishlist" className="mt-0 md:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>My Wishlist</CardTitle>
                      <CardDescription>Items you've saved for later</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <Heart className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">Your wishlist is waiting</h3>
                        <p className="mt-1 text-muted-foreground">Add items to your wishlist to save them for later.</p>
                        <Button className="mt-4" asChild>
                          <Link href="/wishlist">View Wishlist</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="payment" className="mt-0 md:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Methods</CardTitle>
                      <CardDescription>Manage your payment options</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="text-center">
                        <CreditCard className="mx-auto h-12 w-12 text-muted-foreground" />
                        <h3 className="mt-2 text-lg font-medium">No payment methods yet</h3>
                        <p className="mt-1 text-muted-foreground">Add a payment method to make checkout faster.</p>
                        <Button className="mt-4">Add Payment Method</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="settings" className="mt-0 md:mt-0">
                  <Card>
                    <CardHeader>
                      <CardTitle>Account Settings</CardTitle>
                      <CardDescription>Manage your account preferences</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <h3 className="font-medium">Email Notifications</h3>
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" id="marketing-emails" className="h-4 w-4 rounded border-gray-300" />
                          <Label htmlFor="marketing-emails">Receive marketing emails</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            id="order-updates"
                            className="h-4 w-4 rounded border-gray-300"
                            defaultChecked
                          />
                          <Label htmlFor="order-updates">Order status updates</Label>
                        </div>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-medium">Password</h3>
                        <Button variant="outline">Change Password</Button>
                      </div>

                      <Separator />

                      <div className="space-y-2">
                        <h3 className="font-medium">Delete Account</h3>
                        <p className="text-sm text-muted-foreground">
                          Once you delete your account, there is no going back. Please be certain.
                        </p>
                        <Button variant="destructive">Delete Account</Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </>
            ) : (
              <TabsContent value="login" className="mt-0 md:mt-0">
                <Card>
                  <CardHeader>
                    <CardTitle>Login to Your Account</CardTitle>
                    <CardDescription>Enter your credentials to access your account</CardDescription>
                  </CardHeader>
                  <form onSubmit={handleLogin}>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="login-email">Email</Label>
                        <Input
                          id="login-email"
                          type="email"
                          placeholder="your.email@example.com"
                          value={loginForm.email}
                          onChange={(e) => setLoginForm({ ...loginForm, email: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <Label htmlFor="login-password">Password</Label>
                          <Button variant="link" className="h-auto p-0 text-xs">
                            Forgot password?
                          </Button>
                        </div>
                        <Input
                          id="login-password"
                          type="password"
                          placeholder="••••••••"
                          value={loginForm.password}
                          onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                          required
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex-col space-y-4">
                      <Button type="submit" className="w-full">
                        Login
                      </Button>
                      <div className="text-center text-sm">
                        Don't have an account?{" "}
                        <Button variant="link" className="h-auto p-0">
                          Register
                        </Button>
                      </div>
                    </CardFooter>
                  </form>
                </Card>
              </TabsContent>
            )}
          </div>
        </div>
      </Tabs>
    </main>
  )
}
