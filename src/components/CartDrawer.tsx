"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Minus, Plus, ShoppingBag, Package } from "lucide-react";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import OrderSummaryPanel from "./OrderSummaryPanel";
import { computeTotalSavings } from "@/lib/cart-savings";

const FREE_SHIPPING_THRESHOLD = 799;

const f = {
  head: "var(--font-fraunces)",
  body: "var(--font-barlow)",
  green: "#2E8A57",
  dark:  "#1A2A1E",
  muted: "#7A7065",
  border: "#EDE8E0",
  accent: "#C0673A",
};

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function CartDrawer({ open, onClose }: CartDrawerProps) {
  const { cartItems, cartTotal, updateCartItemQuantity } = useFirestoreCart();
  const drawerRef = useRef<HTMLDivElement>(null);

  const mrp         = cartItems.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const actualTotal = cartItems.reduce((s, i) => s + (i.product.sale_price ?? i.product.price) * i.quantity, 0);
  const itemCount   = cartItems.reduce((s, i) => s + i.quantity, 0);
  const progress    = Math.min((cartTotal / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining   = Math.max(FREE_SHIPPING_THRESHOLD - cartTotal, 0);
  const shippingFree = cartTotal >= FREE_SHIPPING_THRESHOLD;
  const shipping    = shippingFree ? 0 : 50;
  const youPay      = actualTotal + shipping;
  const savings     = computeTotalSavings({ mrp, cartTotal: actualTotal, shippingFree });

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: "fixed", inset: 0,
          background: "rgba(15, 25, 18, 0.45)",
          zIndex: 50,
          backdropFilter: "blur(2px)",
          opacity: open ? 1 : 0,
          pointerEvents: open ? "auto" : "none",
          transition: "opacity 0.3s ease",
        }}
      />

      {/* Drawer */}
      <div
        ref={drawerRef}
        style={{
          position: "fixed", top: 0, right: 0,
          width: 440, maxWidth: "100vw",
          height: "100vh",
          background: "#FAF7F2",
          zIndex: 51,
          boxShadow: "-8px 0 32px rgba(0,0,0,0.12)",
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.35s cubic-bezier(0.32, 0, 0.15, 1)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
        }}
      >
        {/* ── Header ─────────────────────────────── */}
        <div style={{
          flexShrink: 0,
          display: "flex", alignItems: "center", gap: 10,
          padding: "16px 20px",
          height: 64,
          boxSizing: "border-box",
          background: "#ffffff",
          borderBottom: `1px solid ${f.border}`,
        }}>
          <button
            onClick={onClose}
            aria-label="Close cart"
            style={{
              display: "flex", alignItems: "center", justifyContent: "center",
              width: 32, height: 32, borderRadius: "50%",
              background: "#F4F1EC", border: "none", cursor: "pointer",
              transition: "background 0.15s", flexShrink: 0,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#EDE8E0")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#F4F1EC")}
          >
            <ArrowLeft size={16} color={f.dark} strokeWidth={2.5} />
          </button>
          <div>
            <h2 style={{
              fontFamily: f.head, fontSize: "1.1rem", fontWeight: 700,
              color: f.dark, margin: 0, lineHeight: 1.2,
            }}>
              Your Shopping Cart
            </h2>
          </div>
        </div>

        {cartItems.length === 0 ? (
          /* ── Empty state ─────────────────────────── */
          <div style={{
            flex: 1,
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: 14, padding: 32,
          }}>
            <div style={{
              width: 72, height: 72, borderRadius: "50%",
              background: "#F4F9F6", display: "flex",
              alignItems: "center", justifyContent: "center",
            }}>
              <ShoppingBag size={32} color={f.green} strokeWidth={1.5} />
            </div>
            <p style={{ fontFamily: f.head, fontSize: "1.05rem", fontWeight: 700, color: f.dark, margin: 0 }}>
              Your cart is empty
            </p>
            <p style={{ fontFamily: f.body, fontSize: "0.82rem", color: f.muted,
              textAlign: "center", margin: 0, lineHeight: 1.5 }}>
              Add some authentic Karavali products to get started.
            </p>
            <Link href="/category/all" onClick={onClose} style={{
              marginTop: 8, padding: "10px 24px",
              background: f.green, color: "#fff", borderRadius: 10,
              fontFamily: f.body, fontSize: "0.85rem", fontWeight: 600,
              textDecoration: "none",
            }}>
              Shop Now
            </Link>
          </div>
        ) : (
          <>
            {/* ── Scrollable content ────────────────── */}
            <div style={{ flex: 1, minHeight: 0, overflowY: "auto" }}>
              {/* Inner flex column — all cards are direct children */}
              <div style={{
                display: "flex", flexDirection: "column", gap: 12,
                padding: "12px 16px 16px",
              }}>

                {/* Free shipping progress bar */}
                <div style={{
                  background: "#ffffff", borderRadius: 12, padding: "12px 16px",
                  border: `1px solid ${f.border}`,
                }}>
                  <p style={{
                    fontFamily: f.body, fontSize: "0.8rem", fontWeight: 600,
                    color: shippingFree ? f.green : f.dark, marginBottom: 8,
                  }}>
                    {shippingFree
                      ? "🎉 You've unlocked free delivery!"
                      : `Add ₹${remaining} more for FREE delivery!`}
                  </p>
                  <div style={{ height: 6, background: "#EDE8E0", borderRadius: 99, overflow: "hidden" }}>
                    <div style={{
                      height: "100%", width: `${progress}%`,
                      background: `linear-gradient(90deg, ${f.green}, #4CAF78)`,
                      borderRadius: 99, transition: "width 0.4s ease",
                    }} />
                  </div>
                </div>

                {/* Section header */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontFamily: f.head, fontSize: "1rem", fontWeight: 700, color: f.dark }}>
                    Review Your Order
                  </span>
                  <span style={{ fontFamily: f.body, fontSize: "0.78rem", color: f.muted }}>
                    {itemCount} {itemCount === 1 ? "Item" : "Items"}
                  </span>
                </div>

                {/* Product list — white card, divider-only between items */}
                <div style={{ background: "#ffffff", borderRadius: 12 }}>
                  {cartItems.map((item, idx) => {
                    const img   = PlaceHolderImages.find(p => p.id === item.product.images?.[0]);
                    const price = item.product.sale_price ?? item.product.price;
                    return (
                      <div key={item.id} style={{
                        display: "flex", alignItems: "flex-start", gap: 12,
                        padding: "14px 16px",
                        borderTop: idx > 0 ? `1px solid ${f.border}` : "none",
                      }}>
                        {/* Image */}
                        <div style={{
                          width: 68, height: 68, borderRadius: 8, overflow: "hidden",
                          flexShrink: 0, position: "relative",
                          border: `1px solid ${f.border}`, background: "#F4F1EC",
                        }}>
                          {img ? (
                            <Image src={img.imageUrl} alt={item.product.title} fill
                              className="object-cover" data-ai-hint={img.imageHint} />
                          ) : (
                            <div style={{ width: "100%", height: "100%", display: "flex",
                              alignItems: "center", justifyContent: "center" }}>
                              <Package size={22} color="#C4B8AE" />
                            </div>
                          )}
                        </div>

                        {/* Middle — name + stepper */}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <p style={{
                            fontFamily: f.head, fontSize: "0.85rem", fontWeight: 600,
                            color: f.dark, margin: "0 0 2px",
                            overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap",
                          }}>
                            {item.product.title}
                          </p>
                          {item.product.weight && (
                            <p style={{ fontFamily: f.body, fontSize: "0.72rem", color: f.muted, margin: "0 0 8px" }}>
                              {item.product.weight}
                            </p>
                          )}
                          {/* Stepper */}
                          <div style={{ display: "flex", alignItems: "center",
                            border: `1.5px solid ${f.border}`, borderRadius: 8,
                            overflow: "hidden", width: "fit-content" }}>
                            <button onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                              style={{ width: 28, height: 28, display: "flex", alignItems: "center",
                                justifyContent: "center", background: "none", border: "none",
                                cursor: "pointer", color: f.dark }}>
                              <Minus size={12} strokeWidth={2.5} />
                            </button>
                            <span style={{ fontFamily: f.body, fontSize: "0.82rem", fontWeight: 700,
                              color: f.dark, padding: "0 8px", minWidth: 22, textAlign: "center" }}>
                              {item.quantity}
                            </span>
                            <button onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                              style={{ width: 28, height: 28, display: "flex", alignItems: "center",
                                justifyContent: "center", background: "none", border: "none",
                                cursor: "pointer", color: f.dark }}>
                              <Plus size={12} strokeWidth={2.5} />
                            </button>
                          </div>
                        </div>

                        {/* Right — prices + trash */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end",
                          justifyContent: "flex-end", gap: 6, alignSelf: "stretch", paddingBottom: 34 }}>
                          <div style={{ textAlign: "right" }}>
                            {item.product.sale_price != null && item.product.sale_price < item.product.price && (
                              <div style={{ fontFamily: f.body, fontSize: "0.7rem",
                                color: "#9CA3AF", textDecoration: "line-through" }}>
                                ₹{item.product.price.toFixed(2)}
                              </div>
                            )}
                            <div style={{ fontFamily: f.body, fontSize: "0.9rem",
                              fontWeight: 700, color: f.dark }}>
                              ₹{price.toFixed(2)}
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Order Summary heading — outside card */}
                <span style={{ fontFamily: f.head, fontSize: "1rem", fontWeight: 700, color: f.dark }}>
                  Order Summary
                </span>

                {/* Order Summary card — no heading inside */}
                <div style={{
                  background: "#ffffff", borderRadius: 12,
                  border: `1px solid ${f.border}`, padding: "16px",
                }}>
                  <OrderSummaryPanel cartTotal={actualTotal} mrp={mrp} />
                </div>

                {/* Bottom spacer */}
                <div style={{ height: 8 }} />
              </div>
            </div>

            {/* ── Sticky bottom CTA ─────────────────── */}
            <div style={{
              flexShrink: 0,
              boxSizing: "border-box",
              padding: "10px 16px 14px",
              background: "#ffffff",
              borderTop: `1px solid ${f.border}`,
            }}>
              {/* You Pay summary — single row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 10 }}>
                <span style={{ fontFamily: f.head, fontSize: "0.95rem", fontWeight: 700, color: f.dark, flexShrink: 0 }}>
                  You Pay
                </span>
                {savings > 0 && (
                  <span style={{
                    display: "inline-flex", alignItems: "center",
                    background: "#E8F5EE", color: f.green,
                    fontFamily: f.body, fontSize: "0.7rem", fontWeight: 600,
                    borderRadius: 99, padding: "3px 9px", flexShrink: 0,
                  }}>
                    🎉 You&apos;re saving ₹{savings}
                  </span>
                )}
                <span style={{ fontFamily: f.head, fontSize: "1rem", fontWeight: 700, color: f.green, flexShrink: 0 }}>
                  ₹{youPay}
                </span>
              </div>

              <Link
                href="/checkout"
                onClick={onClose}
                style={{
                  display: "block", width: "100%", padding: "13px",
                  background: f.green, color: "#fff", borderRadius: 12,
                  fontFamily: f.body, fontSize: "0.95rem", fontWeight: 700,
                  textAlign: "center", textDecoration: "none",
                  transition: "background 0.2s", boxSizing: "border-box",
                }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = "#256E47")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.background = f.green)}
              >
                Proceed to Checkout →
              </Link>
              <div style={{ display: "flex", justifyContent: "center", gap: 20, marginTop: 10 }}>
                <span style={{ fontFamily: f.body, fontSize: "0.72rem", color: "#6B7280", whiteSpace: "nowrap" }}>
                  🔒 Secure Checkout
                </span>
                <span style={{ fontFamily: f.body, fontSize: "0.72rem", color: "#6B7280", whiteSpace: "nowrap" }}>
                  🚚 Free delivery above ₹799
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
