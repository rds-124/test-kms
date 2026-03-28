"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Lock, Plus, Truck, Zap, CreditCard, Wallet, CheckCircle, ShoppingBag } from "lucide-react";
import OrderSummaryPanel from "@/components/OrderSummaryPanel";

// ─── Mock pincode data ───────────────────────────────────────────────
const PINCODE_MAP: Record<string, { city: string; state: string }> = {
  "560001": { city: "Bengaluru", state: "Karnataka" },
  "560002": { city: "Bengaluru", state: "Karnataka" },
  "560034": { city: "Bengaluru", state: "Karnataka" },
  "560038": { city: "Bengaluru", state: "Karnataka" },
  "575001": { city: "Mangaluru", state: "Karnataka" },
  "575002": { city: "Mangaluru", state: "Karnataka" },
  "576101": { city: "Udupi", state: "Karnataka" },
  "400001": { city: "Mumbai", state: "Maharashtra" },
  "110001": { city: "New Delhi", state: "Delhi" },
};

// ─── Hardcoded test items ────────────────────────────────────────────
const TEST_ITEMS = [
  { id: 1, name: "Authentic Ghee Roast Masala", qty: 2, price: 129, mrp: 160 },
  { id: 2, name: "Kundapur Masala Powder",      qty: 1, price: 130, mrp: 150 },
  { id: 3, name: "Kori Rotti (Pack of 4)",      qty: 1, price: 85,  mrp: 100 },
];

const SUBTOTAL      = TEST_ITEMS.reduce((s, i) => s + i.price * i.qty, 0);
const MRP_TOTAL     = TEST_ITEMS.reduce((s, i) => s + i.mrp * i.qty, 0);
const DELIVERY_STD  = 50;
const DELIVERY_EXP  = 99;
const COD_CHARGE    = 45;
const VALID_COUPON  = "KARAVALI10";
const COUPON_PCT    = 10;

// ─── Shared style tokens ─────────────────────────────────────────────
const ui = {
  fontHead: "var(--font-fraunces)",
  fontBody: "var(--font-barlow)",
  green:    "#2E8A57",
  accent:   "#C0673A",
  dark:     "#1A2A1E",
  muted:    "#7A7065",
  border:   "#E2D9D0",
  card: {
    background:   "#ffffff",
    borderRadius: 18,
    boxShadow:    "0 2px 16px rgba(46,138,87,0.08), 0 1px 3px rgba(0,0,0,0.05)",
    borderTop:    "3px solid #2E8A57",
    padding:      "24px 20px 22px",
    marginBottom: 16,
    width:        "100%",
    boxSizing:    "border-box",
  } as React.CSSProperties,
};

// ─── Sub-components ──────────────────────────────────────────────────
function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <p style={{ fontFamily: ui.fontHead, fontSize: "1.05rem", fontWeight: 700, color: ui.dark, marginBottom: 16 }}>
      {children}
    </p>
  );
}

function Field({
  label, children, error, optional,
}: {
  label: string; children: React.ReactNode; error?: string; optional?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontFamily: ui.fontBody, fontSize: "0.78rem", fontWeight: 600, color: "#4A4540", letterSpacing: "0.03em" }}>
        {label}{optional && <span style={{ fontWeight: 400, color: ui.muted }}> (optional)</span>}
      </label>
      {children}
      {error && <p style={{ fontFamily: ui.fontBody, fontSize: "0.75rem", color: ui.accent }}>{error}</p>}
    </div>
  );
}

function StyledInput(props: React.InputHTMLAttributes<HTMLInputElement> & { hasError?: boolean }) {
  const { hasError, ...rest } = props;
  const [focused, setFocused] = useState(false);
  return (
    <input
      {...rest}
      onFocus={(e) => { setFocused(true); props.onFocus?.(e); }}
      onBlur={(e)  => { setFocused(false); props.onBlur?.(e); }}
      style={{
        width: "100%",
        padding: "11px 14px",
        fontFamily: ui.fontBody,
        fontSize: "0.9rem",
        color: ui.dark,
        background: "#FDFCFA",
        border: `1.5px solid ${hasError ? ui.accent : focused ? ui.green : ui.border}`,
        borderRadius: 10,
        outline: "none",
        boxShadow: focused ? `0 0 0 3px rgba(46,138,87,0.10)` : "none",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxSizing: "border-box",
        ...props.style,
      }}
    />
  );
}

function SelectCard({
  selected, onClick, children,
}: {
  selected: boolean; onClick: () => void; children: React.ReactNode;
}) {
  return (
    <div
      onClick={onClick}
      style={{
        flex: 1,
        padding: "14px 16px",
        border: selected ? `2px solid ${ui.green}` : `1.5px solid ${ui.border}`,
        borderRadius: 12,
        background: selected ? "#F4F9F6" : "#FDFCFA",
        cursor: "pointer",
        transition: "border-color 0.2s, background 0.2s",
      }}
    >
      {children}
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────
export default function CheckoutPage() {
  const router = useRouter();
  const { toast } = useToast();

  // Contact
  const [showAltPhone, setShowAltPhone] = useState(false);
  const [altPhone, setAltPhone]         = useState("");

  // Address
  const [form, setForm] = useState({
    name: "", addr1: "", addr2: "", email: "", pincode: "", city: "", state: "",
  });
  const [saveAddr, setSaveAddr] = useState(false);
  const [errors, setErrors]     = useState<Record<string, string>>({});

  // Delivery
  const [delivery, setDelivery] = useState<"standard" | "express">("standard");

  // Payment
  const [payment, setPayment] = useState<"online" | "cod">("online");

  // Coupon
  const [coupon, setCoupon]           = useState("");
  const [couponState, setCouponState] = useState<"idle" | "valid" | "invalid">("idle");
  const [discount, setDiscount]       = useState(0);

  // Pincode auto-fill
  useEffect(() => {
    if (form.pincode.length === 6) {
      const found = PINCODE_MAP[form.pincode];
      if (found) {
        setForm((f) => ({ ...f, city: found.city, state: found.state }));
      } else {
        setForm((f) => ({ ...f, city: "Mumbai", state: "Maharashtra" }));
      }
    } else if (form.pincode.length < 6) {
      setForm((f) => ({ ...f, city: "", state: "" }));
    }
  }, [form.pincode]);

  const deliveryCharge = delivery === "standard" ? DELIVERY_STD : DELIVERY_EXP;
  const codCharge      = payment === "cod" ? COD_CHARGE : 0;

  function applyCoupon() {
    if (coupon.trim().toUpperCase() === VALID_COUPON) {
      const d = Math.round(SUBTOTAL * COUPON_PCT / 100);
      setDiscount(d);
      setCouponState("valid");
    } else {
      setDiscount(0);
      setCouponState("invalid");
    }
  }

  function removeCoupon() {
    setCoupon("");
    setDiscount(0);
    setCouponState("idle");
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!form.name.trim())    e.name  = "Full name is required";
    if (!form.addr1.trim())   e.addr1 = "Address is required";
    if (form.pincode.length !== 6) e.pincode = "Enter a valid 6-digit pincode";
    return e;
  }

  function handlePlaceOrder() {
    const e = validate();
    if (Object.keys(e).length) { setErrors(e); return; }
    setErrors({});
    toast({ title: "Order placed successfully!", description: "Thank you for shopping with us." });
    setTimeout(() => router.push("/"), 2000);
  }

  const set = (key: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    setErrors((err) => { const n = { ...err }; delete n[key]; return n; });
  };

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", paddingBottom: 48, boxSizing: "border-box" }}>

      {/* Page header */}
      <div style={{ background: "#ffffff", borderBottom: "1px solid #EDE8E0", padding: "18px 0", marginBottom: 28 }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", display: "flex", alignItems: "center", gap: 10 }}>
          <ShoppingBag size={20} color={ui.green} />
          <h1 style={{ fontFamily: ui.fontHead, fontSize: "1.35rem", fontWeight: 700, color: ui.dark, margin: 0 }}>
            Checkout
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: "max(16px, env(safe-area-inset-left))", paddingRight: "max(16px, env(safe-area-inset-right))", boxSizing: "border-box" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: 20, width: "100%", boxSizing: "border-box" }} className="checkout-grid">

          {/* ── LEFT COLUMN ─────────────────────────────────────── */}
          <div>

            {/* Section 1 — Contact */}
            <div style={ui.card}>
              <SectionTitle>Contact</SectionTitle>
              {/* Read-only phone */}
              <div style={{
                display: "flex", alignItems: "center", gap: 6,
                background: "#F4F9F6", border: `1.5px solid ${ui.border}`,
                borderRadius: 10, padding: "11px 14px",
              }}>
                <Lock size={15} color={ui.green} strokeWidth={2.5} style={{ flexShrink: 0 }} />
                <span style={{ fontFamily: ui.fontBody, fontSize: "0.9rem", color: ui.dark, flex: 1 }}>
                  +91 98765 43210
                </span>
                <span style={{ fontFamily: ui.fontBody, fontSize: "0.65rem", fontWeight: 600, color: ui.green,
                  background: "rgba(46,138,87,0.1)", padding: "2px 6px", borderRadius: 20 }}>
                  Verified
                </span>
              </div>
              <p style={{ fontFamily: ui.fontBody, fontSize: "0.73rem", color: ui.muted, marginTop: 6 }}>
                To change your number, please contact support.
              </p>

              {/* Alt phone */}
              {!showAltPhone ? (
                <button
                  onClick={() => setShowAltPhone(true)}
                  style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 4,
                    fontFamily: ui.fontBody, fontSize: "0.8rem", fontWeight: 600,
                    color: ui.green, background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                  <Plus size={14} strokeWidth={2.5} /> Add alternate number
                </button>
              ) : (
                <div style={{ marginTop: 12 }}>
                  <Field label="Alternate Phone">
                    <StyledInput
                      type="tel" inputMode="numeric" maxLength={10}
                      placeholder="10-digit number"
                      value={altPhone}
                      onChange={(e) => setAltPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                    />
                  </Field>
                </div>
              )}
            </div>

            {/* Section 2 — Delivery Address */}
            <div style={ui.card}>
              <SectionTitle>Delivery Address</SectionTitle>
              <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                <Field label="Full Name" error={errors.name}>
                  <StyledInput placeholder="As on ID" value={form.name} onChange={set("name")} hasError={!!errors.name} />
                </Field>
                <Field label="Address Line 1" error={errors.addr1}>
                  <StyledInput placeholder="House / Flat No., Building, Street" value={form.addr1} onChange={set("addr1")} hasError={!!errors.addr1} />
                </Field>
                <Field label="Address Line 2" optional>
                  <StyledInput placeholder="Area, Locality, Landmark" value={form.addr2} onChange={set("addr2")} />
                </Field>
                <Field label="Email Address" optional>
                  <StyledInput
                    type="email" inputMode="email"
                    placeholder="For order updates"
                    value={form.email}
                    onChange={set("email")}
                  />
                </Field>

                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }} className="addr-grid">
                  <Field label="Pincode" error={errors.pincode}>
                    <StyledInput
                      type="tel" inputMode="numeric" maxLength={6}
                      placeholder="6 digits"
                      value={form.pincode}
                      onChange={(e) => { set("pincode")(e); }}
                      hasError={!!errors.pincode}
                    />
                  </Field>
                  <Field label="City">
                    <StyledInput
                      placeholder="Auto-filled"
                      value={form.city}
                      onChange={set("city")}
                      style={{ background: form.city ? "#F4F9F6" : undefined, color: form.city ? ui.green : undefined, fontWeight: form.city ? 600 : undefined }}
                    />
                  </Field>
                  <Field label="State">
                    <StyledInput
                      placeholder="Auto-filled"
                      value={form.state}
                      onChange={set("state")}
                      style={{ background: form.state ? "#F4F9F6" : undefined, color: form.state ? ui.green : undefined, fontWeight: form.state ? 600 : undefined }}
                    />
                  </Field>
                </div>

                <label style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer", marginTop: 4 }}>
                  <input
                    type="checkbox"
                    checked={saveAddr}
                    onChange={(e) => setSaveAddr(e.target.checked)}
                    style={{ accentColor: ui.green, width: 16, height: 16 }}
                  />
                  <span style={{ fontFamily: ui.fontBody, fontSize: "0.82rem", color: "#4A4540" }}>
                    Save this address for future orders
                  </span>
                </label>
              </div>
            </div>

            {/* Section 3 — Delivery Type */}
            <div style={ui.card}>
              <SectionTitle>Delivery Type</SectionTitle>
              <div style={{ display: "flex", gap: 12 }}>
                <SelectCard selected={delivery === "standard"} onClick={() => setDelivery("standard")}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Truck size={18} color={delivery === "standard" ? ui.green : ui.muted} strokeWidth={2} />
                    <span style={{ fontFamily: ui.fontBody, fontSize: "0.88rem", fontWeight: 700,
                      color: delivery === "standard" ? ui.dark : ui.muted }}>
                      Standard
                    </span>
                  </div>
                  <p style={{ fontFamily: ui.fontBody, fontSize: "0.75rem", color: ui.muted, margin: 0 }}>4–6 business days</p>
                  <p style={{ fontFamily: ui.fontHead, fontSize: "0.95rem", fontWeight: 700,
                    color: delivery === "standard" ? ui.green : ui.muted, margin: "6px 0 0" }}>
                    ₹{DELIVERY_STD}
                  </p>
                </SelectCard>
                <SelectCard selected={delivery === "express"} onClick={() => setDelivery("express")}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6 }}>
                    <Zap size={18} color={delivery === "express" ? ui.green : ui.muted} strokeWidth={2} />
                    <span style={{ fontFamily: ui.fontBody, fontSize: "0.88rem", fontWeight: 700,
                      color: delivery === "express" ? ui.dark : ui.muted }}>
                      Express
                    </span>
                  </div>
                  <p style={{ fontFamily: ui.fontBody, fontSize: "0.75rem", color: ui.muted, margin: 0 }}>1–2 business days</p>
                  <p style={{ fontFamily: ui.fontHead, fontSize: "0.95rem", fontWeight: 700,
                    color: delivery === "express" ? ui.green : ui.muted, margin: "6px 0 0" }}>
                    ₹{DELIVERY_EXP}
                  </p>
                </SelectCard>
              </div>
            </div>

            {/* Section 4 — Payment */}
            <div style={ui.card}>
              <SectionTitle>Payment Method</SectionTitle>
              <div style={{ display: "flex", gap: 12 }}>
                <SelectCard selected={payment === "online"} onClick={() => setPayment("online")}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <CreditCard size={18} color={payment === "online" ? ui.green : ui.muted} strokeWidth={2} />
                    <span style={{ fontFamily: ui.fontBody, fontSize: "0.85rem", fontWeight: 700,
                      color: payment === "online" ? ui.dark : ui.muted }}>
                      Pay Online
                    </span>
                  </div>
                  <p style={{ fontFamily: ui.fontBody, fontSize: "0.72rem", color: ui.muted, margin: 0 }}>
                    UPI · Cards · Netbanking via Razorpay
                  </p>
                </SelectCard>
                <SelectCard selected={payment === "cod"} onClick={() => setPayment("cod")}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                    <Wallet size={18} color={payment === "cod" ? ui.green : ui.muted} strokeWidth={2} />
                    <span style={{ fontFamily: ui.fontBody, fontSize: "0.85rem", fontWeight: 700,
                      color: payment === "cod" ? ui.dark : ui.muted }}>
                      Cash on Delivery
                    </span>
                  </div>
                  <p style={{ fontFamily: ui.fontBody, fontSize: "0.72rem", color: ui.muted, margin: 0 }}>
                    Pay when your order arrives
                  </p>
                </SelectCard>
              </div>
              {payment === "cod" && (
                <div style={{ marginTop: 12, padding: "10px 14px", background: "#FEF7F0",
                  border: `1px solid ${ui.accent}30`, borderRadius: 10 }}>
                  <p style={{ fontFamily: ui.fontBody, fontSize: "0.78rem", color: ui.accent, margin: 0 }}>
                    ₹{COD_CHARGE} COD charge will be added to your order.
                  </p>
                </div>
              )}
            </div>

            {/* Section 5 — Coupon */}
            <div style={ui.card}>
              <SectionTitle>Coupon Code</SectionTitle>
              {couponState === "valid" ? (
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between",
                  padding: "12px 16px", background: "#F0FAF4", border: `1.5px solid ${ui.green}`,
                  borderRadius: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <CheckCircle size={16} color={ui.green} />
                    <span style={{ fontFamily: ui.fontBody, fontSize: "0.85rem", fontWeight: 600, color: ui.green }}>
                      {VALID_COUPON} — {COUPON_PCT}% off applied (−₹{discount})
                    </span>
                  </div>
                  <button onClick={removeCoupon}
                    style={{ fontFamily: ui.fontBody, fontSize: "0.75rem", color: ui.accent,
                      background: "none", border: "none", cursor: "pointer", fontWeight: 600 }}>
                    Remove
                  </button>
                </div>
              ) : (
                <div>
                  <div style={{ display: "flex", gap: 10 }}>
                    <div style={{ flex: 1 }}>
                      <StyledInput
                        placeholder="Enter coupon code"
                        value={coupon}
                        onChange={(e) => { setCoupon(e.target.value.toUpperCase()); setCouponState("idle"); }}
                        hasError={couponState === "invalid"}
                      />
                    </div>
                    <button
                      onClick={applyCoupon}
                      style={{ padding: "11px 20px", background: ui.green, color: "#fff",
                        border: "none", borderRadius: 10, fontFamily: ui.fontBody,
                        fontSize: "0.85rem", fontWeight: 600, cursor: "pointer",
                        flexShrink: 0, transition: "background 0.2s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#256E47")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = ui.green)}
                    >
                      Apply
                    </button>
                  </div>
                  {couponState === "invalid" && (
                    <p style={{ fontFamily: ui.fontBody, fontSize: "0.75rem", color: ui.accent, marginTop: 6 }}>
                      Invalid coupon code
                    </p>
                  )}
                  <p style={{ fontFamily: ui.fontBody, fontSize: "0.73rem", color: ui.muted, marginTop: 8 }}>
                    Try <strong style={{ color: ui.green }}>KARAVALI10</strong> for 10% off
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* ── RIGHT COLUMN — Order Summary ─────────────────────── */}
          <div>
            <div style={{ ...ui.card, position: "sticky", top: 20 }}>
              <SectionTitle>Order Summary</SectionTitle>

              {/* Items */}
              <div style={{ display: "flex", flexDirection: "column", gap: 14, marginBottom: 18 }}>
                {TEST_ITEMS.map((item) => (
                  <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    {/* Image placeholder */}
                    <div style={{ width: 52, height: 52, borderRadius: 10, background: "#F0EDE8",
                      flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1px solid ${ui.border}` }}>
                      <ShoppingBag size={20} color="#C4B8AE" />
                    </div>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p style={{ fontFamily: ui.fontBody, fontSize: "0.82rem", fontWeight: 600,
                        color: ui.dark, margin: 0, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: ui.fontBody, fontSize: "0.72rem", color: ui.muted, margin: "2px 0 0" }}>
                        Qty: {item.qty}
                      </p>
                    </div>
                    <div style={{ textAlign: "right", flexShrink: 0 }}>
                      {item.mrp > item.price && (
                        <div style={{ fontFamily: ui.fontBody, fontSize: "0.7rem",
                          color: "#9CA3AF", textDecoration: "line-through" }}>
                          ₹{item.mrp * item.qty}
                        </div>
                      )}
                      <div style={{ fontFamily: ui.fontHead, fontSize: "0.9rem", fontWeight: 700,
                        color: item.mrp > item.price ? ui.green : ui.dark }}>
                        ₹{item.price * item.qty}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Divider */}
              <div style={{ borderTop: `1px dashed ${ui.border}`, marginBottom: 16 }} />

              {/* Line items */}
              <OrderSummaryPanel
                cartTotal={SUBTOTAL}
                mrp={MRP_TOTAL}
                deliveryChargeOverride={deliveryCharge}
                deliveryLabel={`Delivery (${delivery === "standard" ? "Standard" : "Express"})`}
                codCharge={codCharge}
                couponDiscount={discount}
                couponCode={couponState === "valid" ? VALID_COUPON : undefined}
              />

              {/* CTA */}
              <button
                onClick={handlePlaceOrder}
                style={{ width: "100%", marginTop: 20, padding: "14px",
                  background: ui.green, color: "#ffffff", border: "none",
                  borderRadius: 12, fontFamily: ui.fontBody, fontSize: "0.95rem",
                  fontWeight: 700, cursor: "pointer", letterSpacing: "0.02em",
                  transition: "background 0.2s, transform 0.1s" }}
                onMouseEnter={(e) => (e.currentTarget.style.background = "#256E47")}
                onMouseLeave={(e) => (e.currentTarget.style.background = ui.green)}
                onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.98)")}
                onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                Place Order →
              </button>

              <p style={{ fontFamily: ui.fontBody, fontSize: "0.72rem", color: ui.muted,
                textAlign: "center", marginTop: 12 }}>
                By placing your order, you agree to our{" "}
                <a href="/privacy-policy" style={{ color: ui.green, textDecoration: "underline", textUnderlineOffset: 2 }}>
                  Privacy Policy
                </a>
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Responsive grid styles */}
      <style>{`
        @media (min-width: 1024px) {
          .checkout-grid {
            grid-template-columns: 1fr 420px !important;
          }
        }
        @media (max-width: 600px) {
          .addr-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
