import React from "react";
import { computeTotalSavings, FREE_SHIPPING_THRESHOLD, SHIPPING_COST } from "@/lib/cart-savings";

const s = {
  fontBody: "var(--font-barlow)",
  fontHead: "var(--font-fraunces)",
  green:    "#2E8A57",
  muted:    "#7A7065",
  dark:     "#1A2A1E",
  border:   "#EDE8E0",
  accent:   "#C0673A",
};

interface OrderSummaryPanelProps {
  /** Sum of (sale_price ?? price) * quantity */
  cartTotal: number;
  /** Sum of original price * quantity */
  mrp: number;
  /** Override the auto-calculated delivery charge (e.g. express delivery) */
  deliveryChargeOverride?: number;
  /** Label for the delivery row e.g. "Standard Delivery" */
  deliveryLabel?: string;
  /** COD charge (pass 45 when COD selected, 0 otherwise) */
  codCharge?: number;
  /** Coupon discount amount */
  couponDiscount?: number;
  /** Coupon code label e.g. "KARAVALI10" */
  couponCode?: string;
}

export default function OrderSummaryPanel({
  cartTotal,
  mrp,
  deliveryChargeOverride,
  deliveryLabel = "Delivery Fee",
  codCharge = 0,
  couponDiscount = 0,
  couponCode,
}: OrderSummaryPanelProps) {
  const discount     = mrp - cartTotal;
  const shippingFree = deliveryChargeOverride === undefined
    ? cartTotal >= FREE_SHIPPING_THRESHOLD
    : false;
  const shipping     = deliveryChargeOverride !== undefined
    ? deliveryChargeOverride
    : shippingFree ? 0 : SHIPPING_COST;
  const youPay       = cartTotal + shipping + codCharge - couponDiscount;
  const totalSavings = computeTotalSavings({ mrp, cartTotal, shippingFree, couponDiscount });

  const row = (
    label: React.ReactNode,
    value: React.ReactNode,
    valueColor = s.dark,
    small = false,
  ) => (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
      <span style={{ fontFamily: s.fontBody, fontSize: small ? "0.78rem" : "0.84rem", color: s.muted }}>
        {label}
      </span>
      <span style={{ fontFamily: s.fontBody, fontSize: small ? "0.78rem" : "0.84rem",
        fontWeight: 600, color: valueColor }}>
        {value}
      </span>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>

      {/* MRP */}
      {row("MRP", `₹${mrp}`)}

      {/* Discount */}
      {discount > 0 && row(
        "Discount",
        `−₹${discount}`,
        s.green,
      )}

      {/* Delivery */}
      {row(
        deliveryLabel,
        shippingFree ? (
          <span style={{ display: "flex", alignItems: "center", gap: 5 }}>
            <span style={{ textDecoration: "line-through", color: s.muted, fontWeight: 400 }}>
              ₹{SHIPPING_COST}
            </span>
            <span style={{ color: s.green }}>Free</span>
          </span>
        ) : `₹${SHIPPING_COST}`,
      )}

      {/* COD charge */}
      {codCharge > 0 && row("COD Charge", `₹${codCharge}`, s.accent)}

      {/* Coupon discount */}
      {couponDiscount > 0 && row(
        <>
          Coupon
          {couponCode && (
            <span style={{ fontFamily: s.fontBody, fontSize: "0.72rem", fontWeight: 600,
              color: s.green, background: "#E8F5EE", borderRadius: 99,
              padding: "1px 7px", marginLeft: 6 }}>
              {couponCode}
            </span>
          )}
        </>,
        `−₹${couponDiscount}`,
        s.green,
      )}

      {/* Divider */}
      <div style={{ borderTop: `1.5px solid ${s.border}`, margin: "4px 0" }} />

      {/* You Pay */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontFamily: s.fontHead, fontSize: "1rem", fontWeight: 700, color: s.dark }}>
          You Pay
        </span>
        <span style={{ fontFamily: s.fontHead, fontSize: "1.15rem", fontWeight: 900, color: s.green }}>
          ₹{youPay}
        </span>
      </div>

      {/* Savings badge */}
      {totalSavings > 0 && (
        <div style={{
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "7px 14px", background: "#E8F5EE", borderRadius: 99,
          marginTop: 4,
        }}>
          <span style={{ fontFamily: s.fontBody, fontSize: "0.78rem", fontWeight: 600, color: s.green }}>
            🎉 You&apos;re saving ₹{totalSavings} on this order!
          </span>
        </div>
      )}
    </div>
  );
}
