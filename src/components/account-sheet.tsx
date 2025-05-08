"use client";

import type React from "react";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { CreditCard, Heart, LogOut, Package, Settings, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { useUserStore } from "@/lib/store";

export default function AccountSheet({
  trigger,
}: {
  trigger: React.ReactNode;
}) {
  const router = useRouter();
  const { toast } = useToast();
  const { isLoggedIn, profile, login, logout, updateProfile } = useUserStore();
  const [authMode, setAuthMode] = useState<"login" | "register">("login");
  const [isOpen, setIsOpen] = useState(false);

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const [registerForm, setRegisterForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    acceptTerms: false,
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

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
      });

      toast({
        title: "Logged in successfully",
        description: "Welcome back to ShopNow!",
      });

      setIsOpen(false);
    } else {
      toast({
        title: "Login failed",
        description: "Please enter both email and password.",
        variant: "destructive",
      });
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validate form
    if (registerForm.password !== registerForm.confirmPassword) {
      toast({
        title: "Passwords don't match",
        description: "Please make sure your passwords match.",
        variant: "destructive",
      });
      return;
    }

    if (!registerForm.acceptTerms) {
      toast({
        title: "Terms not accepted",
        description: "Please accept the terms and conditions to register.",
        variant: "destructive",
      });
      return;
    }

    // Demo registration - in a real app, this would send data to a backend
    login({
      firstName: registerForm.firstName,
      lastName: registerForm.lastName,
      email: registerForm.email,
      phone: registerForm.phone || "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
    });

    toast({
      title: "Registration successful",
      description: "Your account has been created successfully.",
    });

    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    setIsOpen(false);

    toast({
      title: "Logged out",
      description: "You have been logged out successfully.",
    });
  };

  const handleViewFullAccount = () => {
    router.push("/account");
    setIsOpen(false);
  };

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>{trigger}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-md overflow-y-auto sm:max-w-lg"
      >
        <SheetHeader className="mb-5">
          <div className="flex items-center justify-between">
            <SheetTitle>{isLoggedIn ? "My Account" : "Account"}</SheetTitle>
            <SheetClose className="rounded-full p-1 hover:bg-muted">
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </SheetClose>
          </div>
        </SheetHeader>

        {isLoggedIn ? (
          <div className="space-y-6">
            {/* User Profile Summary */}
            <div className="flex items-center gap-4 rounded-lg border p-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
                {profile?.firstName?.charAt(0)}
                {profile?.lastName?.charAt(0)}
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  {profile?.firstName} {profile?.lastName}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {profile?.email}
                </p>
                <p className="text-sm text-muted-foreground">
                  {profile?.phone}
                </p>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-2">
              <h3 className="font-medium">Quick Actions</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="flex h-auto flex-col items-center justify-center gap-2 p-4"
                  asChild
                >
                  <Link href="/orders" onClick={() => setIsOpen(false)}>
                    <Package className="h-5 w-5" />
                    <span>My Orders</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-auto flex-col items-center justify-center gap-2 p-4"
                  asChild
                >
                  <Link href="/wishlist" onClick={() => setIsOpen(false)}>
                    <Heart className="h-5 w-5" />
                    <span>Wishlist</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-auto flex-col items-center justify-center gap-2 p-4"
                  asChild
                >
                  <Link
                    href="/account?tab=payment"
                    onClick={() => setIsOpen(false)}
                  >
                    <CreditCard className="h-5 w-5" />
                    <span>Payment</span>
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="flex h-auto flex-col items-center justify-center gap-2 p-4"
                  asChild
                >
                  <Link
                    href="/account?tab=settings"
                    onClick={() => setIsOpen(false)}
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </Button>
              </div>
            </div>

            {/* Address Preview */}
            {profile?.address && (
              <div className="space-y-2">
                <h3 className="font-medium">Default Address</h3>
                <div className="rounded-lg border p-3 text-sm">
                  <p>{profile.address}</p>
                  <p>
                    {profile.city}, {profile.state} {profile.zipCode}
                  </p>
                  <p>{profile.country}</p>
                </div>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-col gap-2">
              <Button onClick={handleViewFullAccount}>View Full Account</Button>
              <Button variant="outline" onClick={handleLogout}>
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>
        ) : (
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login" onClick={() => setAuthMode("login")}>
                Login
              </TabsTrigger>
              <TabsTrigger
                value="register"
                onClick={() => setAuthMode("register")}
              >
                Register
              </TabsTrigger>
            </TabsList>

            <TabsContent value="login" className="mt-4">
              <form onSubmit={handleLogin} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="sheet-login-email">Email</Label>
                  <Input
                    id="sheet-login-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={loginForm.email}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, email: e.target.value })
                    }
                    required
                  />
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="sheet-login-password">Password</Label>
                    <Button variant="link" className="h-auto p-0 text-xs">
                      Forgot password?
                    </Button>
                  </div>
                  <Input
                    id="sheet-login-password"
                    type="password"
                    placeholder="••••••••"
                    value={loginForm.password}
                    onChange={(e) =>
                      setLoginForm({ ...loginForm, password: e.target.value })
                    }
                    required
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="register" className="mt-4">
              <form onSubmit={handleRegister} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sheet-register-firstName">First Name</Label>
                    <Input
                      id="sheet-register-firstName"
                      placeholder="John"
                      value={registerForm.firstName}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          firstName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="sheet-register-lastName">Last Name</Label>
                    <Input
                      id="sheet-register-lastName"
                      placeholder="Doe"
                      value={registerForm.lastName}
                      onChange={(e) =>
                        setRegisterForm({
                          ...registerForm,
                          lastName: e.target.value,
                        })
                      }
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sheet-register-email">Email</Label>
                  <Input
                    id="sheet-register-email"
                    type="email"
                    placeholder="your.email@example.com"
                    value={registerForm.email}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        email: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sheet-register-phone">Phone (optional)</Label>
                  <Input
                    id="sheet-register-phone"
                    type="tel"
                    placeholder="555-123-4567"
                    value={registerForm.phone}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        phone: e.target.value,
                      })
                    }
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sheet-register-password">Password</Label>
                  <Input
                    id="sheet-register-password"
                    type="password"
                    placeholder="••••••••"
                    value={registerForm.password}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        password: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="sheet-register-confirmPassword">
                    Confirm Password
                  </Label>
                  <Input
                    id="sheet-register-confirmPassword"
                    type="password"
                    placeholder="••••••••"
                    value={registerForm.confirmPassword}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="sheet-terms"
                    className="h-4 w-4 rounded border-gray-300"
                    checked={registerForm.acceptTerms}
                    onChange={(e) =>
                      setRegisterForm({
                        ...registerForm,
                        acceptTerms: e.target.checked,
                      })
                    }
                    required
                  />
                  <Label htmlFor="sheet-terms" className="text-sm">
                    I agree to the{" "}
                    <Link
                      href="/terms"
                      className="text-primary hover:underline"
                    >
                      Terms of Service
                    </Link>{" "}
                    and{" "}
                    <Link
                      href="/privacy"
                      className="text-primary hover:underline"
                    >
                      Privacy Policy
                    </Link>
                  </Label>
                </div>

                <Button type="submit" className="w-full">
                  Create Account
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        )}
      </SheetContent>
    </Sheet>
  );
}
