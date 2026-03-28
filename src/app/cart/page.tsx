"use client";

import Image from "next/image";
import Link from "next/link";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Minus, Plus } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";

export default function CartPage() {
  const { cartItems, updateCartItemQuantity, cartTotal, cartCount, isLoading } = useFirestoreCart();
  const mrp = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);

  if (isLoading) {
    return <div className="text-center py-20">Loading cart...</div>;
  }

  return (
    <div style={{ width: "100%", maxWidth: "100vw", overflowX: "hidden", boxSizing: "border-box", paddingTop: 32, paddingBottom: 32, paddingLeft: "max(16px, env(safe-area-inset-left))", paddingRight: "max(16px, env(safe-area-inset-right))" }}>
      <h1 className="text-3xl md:text-4xl font-headline font-bold text-center mb-8">Your Shopping Cart</h1>
      
      {cartCount === 0 ? (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground mb-4">Your cart is empty.</p>
          <Button asChild>
            <Link href="/category/all">Continue Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid lg:grid-cols-3 gap-8 w-full">
          <div className="lg:col-span-2">
            {/* Free shipping progress bar */}
            {(() => {
              const threshold = 799;
              const progress = Math.min((cartTotal / threshold) * 100, 100);
              const remaining = Math.max(threshold - cartTotal, 0);
              const free = cartTotal >= threshold;
              return (
                <div style={{
                  background: "#ffffff", borderRadius: 12, padding: "12px 16px",
                  marginBottom: 12, border: "1px solid #EDE8E0",
                  width: "100%", boxSizing: "border-box",
                }}>
                  <p style={{
                    fontFamily: "var(--font-barlow)", fontSize: "0.8rem", fontWeight: 600,
                    color: free ? "#2E8A57" : "#1A2A1E", marginBottom: 8,
                  }}>
                    {free ? "🎉 You've unlocked free delivery!" : `Add ₹${remaining} more for FREE delivery!`}
                  </p>
                  <div style={{ height: 6, background: "#EDE8E0", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${progress}%`,
                      background: "linear-gradient(90deg, #2E8A57, #4CAF78)",
                      borderRadius: 99, transition: "width 0.4s ease",
                    }} />
                  </div>
                </div>
              );
            })()}
            {/* Section heading — outside card */}
            <div className="flex items-center justify-between mb-3">
              <span style={{ fontFamily: "var(--font-fraunces)", fontSize: "0.9rem", fontWeight: 700, color: "#1A2A1E" }}>
                Review Your Order
              </span>
              <span style={{ fontFamily: "var(--font-barlow)", fontSize: "0.78rem", color: "#7A7065" }}>
                {cartCount} {cartCount === 1 ? "Item" : "Items"}
              </span>
            </div>

            {/* Product list — white card, divider-only between items */}
            <div style={{ background: "#ffffff", borderRadius: 12, width: "100%", boxSizing: "border-box" }}>
              {cartItems.map((item, idx) => {
                const productImage = PlaceHolderImages.find(p => p.id === item.product.images[0]);
                const price = item.product.sale_price ?? item.product.price;
                return (
                  <div key={item.product.sku} style={{
                    display: "flex", alignItems: "flex-start", gap: 12,
                    padding: "14px 16px",
                    borderTop: idx > 0 ? "1px solid #EDE8E0" : "none",
                    width: "100%", boxSizing: "border-box",
                  }}>
                    {/* Image */}
                    <div style={{
                      width: 68, height: 68, borderRadius: 8, overflow: "hidden",
                      flexShrink: 0, position: "relative",
                      border: "1px solid #EDE8E0", background: "#F4F1EC",
                    }}>
                      {productImage ? (
                        <Image src={productImage.imageUrl} alt={item.product.title} fill
                          className="object-cover" data-ai-hint={productImage.imageHint} />
                      ) : (
                        <div style={{ width: "100%", height: "100%", display: "flex",
                          alignItems: "center", justifyContent: "center", color: "#C4B8AE", fontSize: "0.7rem" }}>
                          No img
                        </div>
                      )}
                    </div>

                    {/* Middle — name + weight + stepper */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{
                        fontFamily: "var(--font-fraunces)", fontSize: "0.9rem", fontWeight: 600,
                        color: "#1A2A1E", margin: "0 0 2px",
                      }}>
                        {item.product.title}
                      </p>
                      {item.product.weight && (
                        <p style={{ fontFamily: "var(--font-barlow)", fontSize: "0.72rem", color: "#7A7065", margin: "0 0 8px" }}>
                          {item.product.weight}
                        </p>
                      )}
                      {/* Stepper */}
                      <div style={{ display: "flex", alignItems: "center",
                        border: "1.5px solid #EDE8E0", borderRadius: 8,
                        overflow: "hidden", width: "fit-content" }}>
                        <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                          style={{ width: 30, height: 30, display: "flex", alignItems: "center",
                            justifyContent: "center", background: "none", border: "none", cursor: "pointer" }}>
                          <Minus size={13} strokeWidth={2.5} color="#1A2A1E" />
                        </button>
                        <span style={{ fontFamily: "var(--font-barlow)", fontSize: "0.85rem", fontWeight: 700,
                          color: "#1A2A1E", padding: "0 10px", minWidth: 26, textAlign: "center" }}>
                          {item.quantity}
                        </span>
                        <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                          style={{ width: 30, height: 30, display: "flex", alignItems: "center",
                            justifyContent: "center", background: "none", border: "none", cursor: "pointer" }}>
                          <Plus size={13} strokeWidth={2.5} color="#1A2A1E" />
                        </button>
                      </div>
                    </div>

                    {/* Right — prices + trash */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end",
                      justifyContent: "flex-end", gap: 6, alignSelf: "stretch", flexShrink: 0, paddingBottom: 42 }}>
                      <div style={{ textAlign: "right" }}>
                        {item.product.sale_price != null && item.product.sale_price < item.product.price && (
                          <div style={{ fontFamily: "var(--font-barlow)", fontSize: "0.7rem",
                            color: "#9CA3AF", textDecoration: "line-through" }}>
                            ₹{item.product.price.toFixed(2)}
                          </div>
                        )}
                        <div style={{ fontFamily: "var(--font-barlow)", fontSize: "0.9rem",
                          fontWeight: 700, color: "#1A2A1E" }}>
                          ₹{price.toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          
          <div className="lg:col-span-1 w-full">
            {/* Section heading — outside card */}
            <p style={{ fontFamily: "var(--font-fraunces)", fontSize: "0.9rem", fontWeight: 700, color: "#1A2A1E", marginBottom: 12 }}>
              Order Summary
            </p>
            <Card style={{ backgroundColor: "#ffffff", width: "100%", boxSizing: "border-box" }}>
              <CardContent className="space-y-4 pt-4">
                <OrderSummaryPanel cartTotal={cartTotal} mrp={mrp} />
              </CardContent>
              <CardFooter className="flex flex-col gap-3 pb-5">
                <Button asChild size="lg" className="w-full">
                  <Link href="/checkout">Proceed to Checkout</Link>
                </Button>
                <div style={{ display: "flex", justifyContent: "center", gap: 16, width: "100%" }}>
                  <span style={{ fontFamily: "var(--font-barlow)", fontSize: "0.65rem", color: "#6B7280", whiteSpace: "nowrap" }}>
                    🔒 Secure Checkout
                  </span>
                  <span style={{ fontFamily: "var(--font-barlow)", fontSize: "0.65rem", color: "#6B7280", whiteSpace: "nowrap" }}>
                    🚚 Free delivery above ₹799
                  </span>
                </div>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}
