"use client";

import { useEffect } from "react";
import Link from "next/link";
import { useCart } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { useRouter } from "next/navigation";

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    if (cartCount === 0) {
      router.push('/cart');
    }
  }, [cartCount, router]);

  if (cartCount === 0) {
    return null; // or a loading spinner
  }

  const shippingThreshold = 799;
  const shippingCost = cartTotal >= shippingThreshold ? 0 : 50;
  const tax = cartTotal * 0.05; // Example 5% tax
  const total = cartTotal + shippingCost + tax;

  const handlePlaceOrder = () => {
    // In a real app, this would call a serverless function to create an order
    // and initiate payment with Razorpay/Cashfree.
    console.log("Placing order...");
    // On success, clear cart and redirect
    clearCart();
    router.push("/order-confirmation");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-8">Checkout</h1>
      
      <div className="grid lg:grid-cols-2 gap-12">
        {/* Shipping & Payment Details */}
        <div>
            <Card>
                <CardHeader>
                    <CardTitle>Customer Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <Input type="email" placeholder="Email Address" />
                    
                    <div className="space-y-2 mt-6">
                        <h3 className="font-semibold text-lg">Shipping Address</h3>
                        <div className="grid grid-cols-2 gap-4">
                            <Input placeholder="First Name" />
                            <Input placeholder="Last Name" />
                        </div>
                        <Input placeholder="Address" />
                        <Input placeholder="Apartment, suite, etc. (optional)" />
                        <div className="grid grid-cols-3 gap-4">
                            <Input placeholder="City" />
                            <Input placeholder="State" />
                            <Input placeholder="PIN Code" />
                        </div>
                        <Input placeholder="Phone" />
                    </div>
                </CardContent>
            </Card>

            <Card className="mt-8">
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent>
                    <RadioGroup defaultValue="card" className="space-y-2">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="card" id="card" />
                            <Label htmlFor="card">Credit/Debit Card / UPI (Razorpay)</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cod" id="cod" />
                            <Label htmlFor="cod">Cash on Delivery (COD)</Label>
                        </div>
                    </RadioGroup>
                </CardContent>
            </Card>
        </div>
        
        {/* Order Summary */}
        <div className="row-start-1 lg:row-start-auto">
            <Card className="bg-secondary/50">
                <CardHeader>
                    <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                        {cartItems.map(item => {
                            const productImage = PlaceHolderImages.find(p => p.id === item.product.images[0]);
                            const price = item.product.sale_price ?? item.product.price;
                            return (
                                <div key={item.product.sku} className="flex items-center gap-4">
                                <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                                    {productImage && (
                                    <Image
                                        src={productImage.imageUrl}
                                        alt={item.product.title}
                                        fill
                                        className="object-cover"
                                        data-ai-hint={productImage.imageHint}
                                    />
                                    )}
                                </div>
                                <div className="flex-grow">
                                    <p className="font-semibold text-sm">{item.product.title}</p>
                                    <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium text-sm">₹{(price * item.quantity).toFixed(2)}</p>
                                </div>
                            );
                        })}
                    </div>
                    <Separator />
                    <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Subtotal</span>
                            <span>₹{cartTotal.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Shipping</span>
                            <span>{shippingCost > 0 ? `₹${shippingCost.toFixed(2)}` : 'Free'}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Taxes (Est.)</span>
                            <span>₹{tax.toFixed(2)}</span>
                        </div>
                        <Separator />
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>₹{total.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Button size="lg" className="w-full mt-6" onClick={handlePlaceOrder}>
                Place Order
            </Button>
            <Link href="/cart" className="text-sm text-center block mt-4 text-primary hover:underline">
                &larr; Return to cart
            </Link>
        </div>
      </div>
    </div>
  );
}
