"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle2, CreditCard, Truck } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import { type Address, useCartStore, useCheckoutStore } from "@/lib/store"

export default function CheckoutPage() {
  const router = useRouter()
  const { toast } = useToast()
  const { items, totalItems, totalPrice, clearCart } = useCartStore()
  const {
    step,
    shippingAddress,
    billingAddress,
    paymentMethod,
    shippingMethod,
    setStep,
    setShippingAddress,
    setBillingAddress,
    setPaymentMethod,
    setShippingMethod,
    resetCheckout,
  } = useCheckoutStore()

  const [sameAsShipping, setSameAsShipping] = useState(true)
  const [formData, setFormData] = useState<Address>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  })
  const [billingFormData, setBillingFormData] = useState<Address>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    country: "USA",
  })
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    cardName: "",
    expiryDate: "",
    cvv: "",
  })
  const [orderComplete, setOrderComplete] = useState(false)
  const [orderNumber, setOrderNumber] = useState("")

  // Redirect if cart is empty
  useEffect(() => {
    if (items.length === 0 && !orderComplete) {
      router.push("/products")
    }
  }, [items, router, orderComplete])

  // Initialize form data from stored addresses
  useEffect(() => {
    if (shippingAddress) {
      setFormData(shippingAddress)
    }
    if (billingAddress) {
      setBillingFormData(billingAddress)
    }
  }, [shippingAddress, billingAddress])

  const handleShippingSubmit = (e) => {
    e.preventDefault()
    setShippingAddress(formData)

    if (sameAsShipping) {
      setBillingAddress(formData)
    } else {
      setBillingAddress(billingFormData)
    }

    setStep(2)
  }

  const handlePaymentSubmit = (e) => {
    e.preventDefault()
    setPaymentMethod(cardDetails.cardNumber ? "credit-card" : "paypal")
    setStep(3)
  }

  const handlePlaceOrder = () => {
    // Generate a random order number
    const newOrderNumber = `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`
    setOrderNumber(newOrderNumber)

    // Show success message
    toast({
      title: "Order placed successfully!",
      description: `Your order #${newOrderNumber} has been placed.`,
    })

    // Clear cart and reset checkout
    setTimeout(() => {
      clearCart()
      resetCheckout()
      setOrderComplete(true)
    }, 500)
  }

  if (orderComplete) {
    return (
      <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-8 text-center sm:px-6 lg:px-8">
        <div className="mx-auto max-w-md">
          <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
          <h1 className="mt-6 text-2xl font-bold sm:text-3xl">Order Confirmed!</h1>
          <p className="mt-2 text-muted-foreground">
            Thank you for your purchase. Your order #{orderNumber} has been placed successfully.
          </p>
          <p className="mt-4 text-muted-foreground">
            We've sent a confirmation email to {shippingAddress?.email}. You can track your order in the "My Orders"
            section.
          </p>
          <div className="mt-8 flex flex-col gap-2 sm:flex-row sm:justify-center">
            <Button asChild size="lg">
              <Link href="/orders">View My Orders</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <Link
          href="/products"
          className="inline-flex items-center text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-1 h-4 w-4" />
          Continue Shopping
        </Link>
        <h1 className="mt-2 text-2xl font-bold sm:text-3xl">Checkout</h1>
      </div>

      <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <Tabs value={`step-${step}`} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="step-1" disabled={step !== 1} onClick={() => setStep(1)}>
                Shipping
              </TabsTrigger>
              <TabsTrigger value="step-2" disabled={step < 2} onClick={() => step >= 2 && setStep(2)}>
                Payment
              </TabsTrigger>
              <TabsTrigger value="step-3" disabled={step < 3} onClick={() => step >= 3 && setStep(3)}>
                Review
              </TabsTrigger>
            </TabsList>

            {/* Step 1: Shipping Information */}
            <TabsContent value="step-1" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Information</CardTitle>
                  <CardDescription>Enter your shipping details</CardDescription>
                </CardHeader>
                <form onSubmit={handleShippingSubmit}>
                  <CardContent className="space-y-6">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                          required
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
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">Phone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="address">Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        required
                      />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zipCode">ZIP Code</Label>
                        <Input
                          id="zipCode"
                          value={formData.zipCode}
                          onChange={(e) => setFormData({ ...formData, zipCode: e.target.value })}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Select
                        value={formData.country}
                        onValueChange={(value) => setFormData({ ...formData, country: value })}
                      >
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="USA">United States</SelectItem>
                          <SelectItem value="CAN">Canada</SelectItem>
                          <SelectItem value="GBR">United Kingdom</SelectItem>
                          <SelectItem value="AUS">Australia</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-4">
                      <div className="font-medium">Shipping Method</div>
                      <RadioGroup defaultValue={shippingMethod} onValueChange={setShippingMethod}>
                        <div className="flex items-center justify-between rounded-md border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label htmlFor="standard" className="font-normal">
                              Standard Shipping (3-5 business days)
                            </Label>
                          </div>
                          <div className="font-medium">Free</div>
                        </div>
                        <div className="flex items-center justify-between rounded-md border p-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label htmlFor="express" className="font-normal">
                              Express Shipping (1-2 business days)
                            </Label>
                          </div>
                          <div className="font-medium">$9.99</div>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="sameAsBilling"
                        checked={sameAsShipping}
                        onCheckedChange={(checked) => setSameAsShipping(checked === true)}
                      />
                      <Label htmlFor="sameAsBilling" className="font-normal">
                        Billing address is the same as shipping address
                      </Label>
                    </div>

                    {!sameAsShipping && (
                      <div className="space-y-4 rounded-md border p-4">
                        <div className="font-medium">Billing Address</div>
                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="billingFirstName">First Name</Label>
                            <Input
                              id="billingFirstName"
                              value={billingFormData.firstName}
                              onChange={(e) => setBillingFormData({ ...billingFormData, firstName: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingLastName">Last Name</Label>
                            <Input
                              id="billingLastName"
                              value={billingFormData.lastName}
                              onChange={(e) => setBillingFormData({ ...billingFormData, lastName: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="billingAddress">Address</Label>
                          <Input
                            id="billingAddress"
                            value={billingFormData.address}
                            onChange={(e) => setBillingFormData({ ...billingFormData, address: e.target.value })}
                            required
                          />
                        </div>

                        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
                          <div className="space-y-2">
                            <Label htmlFor="billingCity">City</Label>
                            <Input
                              id="billingCity"
                              value={billingFormData.city}
                              onChange={(e) => setBillingFormData({ ...billingFormData, city: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingState">State</Label>
                            <Input
                              id="billingState"
                              value={billingFormData.state}
                              onChange={(e) => setBillingFormData({ ...billingFormData, state: e.target.value })}
                              required
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="billingZipCode">ZIP Code</Label>
                            <Input
                              id="billingZipCode"
                              value={billingFormData.zipCode}
                              onChange={(e) => setBillingFormData({ ...billingFormData, zipCode: e.target.value })}
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="billingCountry">Country</Label>
                          <Select
                            value={billingFormData.country}
                            onValueChange={(value) => setBillingFormData({ ...billingFormData, country: value })}
                          >
                            <SelectTrigger id="billingCountry">
                              <SelectValue placeholder="Select country" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="USA">United States</SelectItem>
                              <SelectItem value="CAN">Canada</SelectItem>
                              <SelectItem value="GBR">United Kingdom</SelectItem>
                              <SelectItem value="AUS">Australia</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button type="submit" className="ml-auto">
                      Continue to Payment
                    </Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Step 2: Payment Information */}
            <TabsContent value="step-2" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                  <CardDescription>Choose your payment method</CardDescription>
                </CardHeader>
                <form onSubmit={handlePaymentSubmit}>
                  <CardContent className="space-y-6">
                    <RadioGroup defaultValue="credit-card">
                      <div className="rounded-md border p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="credit-card" id="credit-card" />
                          <Label htmlFor="credit-card" className="font-medium">
                            Credit Card
                          </Label>
                        </div>
                        <div className="mt-4 space-y-4 pl-6">
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Card Number</Label>
                            <Input
                              id="cardNumber"
                              placeholder="1234 5678 9012 3456"
                              value={cardDetails.cardNumber}
                              onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="cardName">Name on Card</Label>
                            <Input
                              id="cardName"
                              placeholder="John Doe"
                              value={cardDetails.cardName}
                              onChange={(e) => setCardDetails({ ...cardDetails, cardName: e.target.value })}
                            />
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="expiryDate">Expiry Date</Label>
                              <Input
                                id="expiryDate"
                                placeholder="MM/YY"
                                value={cardDetails.expiryDate}
                                onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                              />
                            </div>
                            <div className="space-y-2">
                              <Label htmlFor="cvv">CVV</Label>
                              <Input
                                id="cvv"
                                placeholder="123"
                                value={cardDetails.cvv}
                                onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="rounded-md border p-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="paypal" id="paypal" />
                          <Label htmlFor="paypal" className="font-medium">
                            PayPal
                          </Label>
                        </div>
                        <div className="mt-2 pl-6 text-sm text-muted-foreground">
                          You will be redirected to PayPal to complete your purchase securely.
                        </div>
                      </div>
                    </RadioGroup>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <Button variant="outline" type="button" onClick={() => setStep(1)}>
                      Back
                    </Button>
                    <Button type="submit">Continue to Review</Button>
                  </CardFooter>
                </form>
              </Card>
            </TabsContent>

            {/* Step 3: Review Order */}
            <TabsContent value="step-3" className="mt-6">
              <Card>
                <CardHeader>
                  <CardTitle>Review Your Order</CardTitle>
                  <CardDescription>Please review your order before placing it</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <h3 className="font-medium">Items in Your Order</h3>
                    <ScrollArea className="h-[200px] rounded-md border p-4">
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div key={item.id} className="flex items-center gap-4">
                            <div className="h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border">
                              <img
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <div className="flex-1">
                              <h4 className="text-sm font-medium">{item.name}</h4>
                              <div className="mt-1 flex items-center text-sm text-muted-foreground">
                                <span>Qty: {item.quantity}</span>
                                {item.color && (
                                  <span className="ml-4 flex items-center">
                                    Color:
                                    <span
                                      className="ml-1 h-3 w-3 rounded-full"
                                      style={{ backgroundColor: item.color }}
                                    />
                                  </span>
                                )}
                                {item.size && <span className="ml-4">Size: {item.size}</span>}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="font-medium">
                                $
                                {(
                                  (item.discountPercentage
                                    ? item.price * (1 - item.discountPercentage / 100)
                                    : item.price) * item.quantity
                                ).toFixed(2)}
                              </div>
                              {item.discountPercentage > 0 && (
                                <div className="text-xs text-muted-foreground line-through">
                                  ${(item.price * item.quantity).toFixed(2)}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>

                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <div>
                      <h3 className="font-medium">Shipping Information</h3>
                      <div className="mt-2 rounded-md border p-4">
                        <div className="text-sm">
                          <p className="font-medium">
                            {shippingAddress?.firstName} {shippingAddress?.lastName}
                          </p>
                          <p>{shippingAddress?.address}</p>
                          <p>
                            {shippingAddress?.city}, {shippingAddress?.state} {shippingAddress?.zipCode}
                          </p>
                          <p>{shippingAddress?.country}</p>
                          <p className="mt-2">{shippingAddress?.email}</p>
                          <p>{shippingAddress?.phone}</p>
                        </div>
                        <div className="mt-4 flex items-center gap-2">
                          <Truck className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {shippingMethod === "express"
                              ? "Express Shipping (1-2 business days)"
                              : "Standard Shipping (3-5 business days)"}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-medium">Payment Method</h3>
                      <div className="mt-2 rounded-md border p-4">
                        <div className="flex items-center gap-2">
                          <CreditCard className="h-4 w-4 text-muted-foreground" />
                          <span className="text-sm font-medium">
                            {paymentMethod === "credit-card"
                              ? `Credit Card (${cardDetails.cardNumber.slice(-4).padStart(cardDetails.cardNumber.length, "*")})`
                              : "PayPal"}
                          </span>
                        </div>
                        {!sameAsShipping && (
                          <div className="mt-4 text-sm">
                            <p className="font-medium">Billing Address:</p>
                            <p>
                              {billingAddress?.firstName} {billingAddress?.lastName}
                            </p>
                            <p>{billingAddress?.address}</p>
                            <p>
                              {billingAddress?.city}, {billingAddress?.state} {billingAddress?.zipCode}
                            </p>
                            <p>{billingAddress?.country}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)}>
                    Back
                  </Button>
                  <Button onClick={handlePlaceOrder}>Place Order</Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal ({totalItems} items)</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingMethod === "express" ? "$9.99" : "Free"}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${(totalPrice * 0.08).toFixed(2)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>${(totalPrice + (shippingMethod === "express" ? 9.99 : 0) + totalPrice * 0.08).toFixed(2)}</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
