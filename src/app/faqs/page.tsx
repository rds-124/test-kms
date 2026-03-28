"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Where do you deliver?",
    a: "We currently deliver across Bengaluru. Whether you're in Jayanagar, Malleswaram, Hebbal, or anywhere in between — if you're in Bengaluru, we've got you covered. Pan-India delivery is coming soon.",
  },
  {
    q: "How long will my order take to arrive?",
    a: "If you're within 10 km of our store in Ganganagar, Bengaluru, you'll receive your order the same day — provided you place it before 12:00 PM. For locations beyond 10 km within Bengaluru, delivery is the next day. We are operational Tuesday to Sunday.",
  },
  {
    q: "Are your products authentically from Mangalore and Coastal Karnataka?",
    a: "Yes — and this is something we take seriously. Karavali Mangalore Store has been serving Bengaluru's Mangalorean community from our physical store since 2007. Every product we stock is sourced from trusted suppliers along the Karavali coast. When you order from us, you're getting the same products our walk-in customers have trusted for 19 years.",
  },
  {
    q: "What is the minimum order value for free delivery?",
    a: "Orders above ₹799 qualify for free delivery. For orders below ₹799, a flat shipping charge of ₹70 applies.",
  },
  {
    q: "Do you accept Cash on Delivery?",
    a: "Yes, we do. A COD handling surcharge of ₹45 is added at checkout to cover cash collection costs. If you'd prefer to avoid the surcharge, prepaid payment via UPI, card, or net banking is always free.",
  },
  {
    q: "How fresh are the products?",
    a: "Very. Unlike large online marketplaces that warehouse products for weeks, we operate from a physical retail store with high daily turnover built over 19 years. Products are sourced regularly and dispatched directly from our store — not from a distant warehouse. Shelf life details for each product are listed on the respective product page.",
  },
  {
    q: "What if my order arrives damaged or a product is spoiled?",
    a: "Contact us on WhatsApp (+91 96115 73008) within 24 hours of delivery with a photo of the affected product. For spoiled items, we issue a store credit coupon equal to the value of the item, valid for 30 days. For damaged or incorrect orders, contact us on the same number — we'll look into it and make it right. Full details are in our Returns & Refund Policy.",
  },
  {
    q: "How will I know the status of my order?",
    a: "You'll receive order status updates via SMS and WhatsApp at each stage — order confirmed, order dispatched, and out for delivery. No app needed, no login required.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major payment methods — UPI (GPay, PhonePe, Paytm), debit and credit cards, net banking, and Cash on Delivery. Payments are processed securely via Razorpay.",
  },
  {
    q: "Can I cancel my order after placing it?",
    a: "Yes, as long as your order hasn't been packed yet. To cancel, WhatsApp us at +91 96115 73008 with your order number as soon as possible. Once packing begins, cancellation is not possible. Prepaid orders cancelled before dispatch are fully refunded within 5–7 business days.",
  },
  {
    q: "Do you have a physical store I can visit?",
    a: "Yes — and we're proud of it. Our store at 94/1, Opp. 108B Bus Stop, Ganganagar, Bengaluru has been open since 2007. We're open Tuesday to Sunday, 9:00 AM to 9:00 PM. The online store brings the same products and the same trust to your doorstep.",
  },
  {
    q: "I'm looking for a specific Mangalorean product — how do I know if you stock it?",
    a: "Browse our full catalogue on the website across categories — Snacks, Sweets, Grocery, Ready to Eat & Cook, Masalas, Pickles, and more. If you can't find what you're looking for, WhatsApp us at +91 96115 73008 and we'll check if it's available or coming soon.",
  },
];

export default function FAQsPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ minHeight: "100vh", background: "#FAF7F2", paddingBottom: 64 }}>
      {/* Header */}
      <div style={{ background: "#2E8A57", padding: "48px 24px 40px", textAlign: "center" }}>
        <h1 style={{ fontFamily: "var(--font-fraunces)", fontSize: "clamp(1.6rem, 4vw, 2.4rem)", fontWeight: 700, color: "#ffffff", margin: "0 0 10px" }}>
          Frequently Asked Questions
        </h1>
        <p style={{ fontFamily: "var(--font-barlow)", fontSize: "1rem", color: "rgba(255,255,255,0.82)", margin: 0 }}>
          Everything you need to know before you order.
        </p>
      </div>

      {/* FAQ list */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "40px 16px 0" }}>
        {faqs.map((faq, i) => (
          <div
            key={i}
            style={{
              background: "#ffffff",
              borderRadius: 14,
              marginBottom: 12,
              border: "1px solid #EDE8E0",
              overflow: "hidden",
              boxShadow: "0 1px 4px rgba(0,0,0,0.04)",
            }}
          >
            <button
              onClick={() => toggle(i)}
              style={{
                width: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: 16,
                padding: "18px 20px",
                background: "none",
                border: "none",
                cursor: "pointer",
                textAlign: "left",
              }}
            >
              <span style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "1rem",
                fontWeight: 700,
                color: "#1A2A1E",
                lineHeight: 1.4,
              }}>
                {faq.q}
              </span>
              <ChevronDown
                size={18}
                color="#2E8A57"
                strokeWidth={2.5}
                style={{
                  flexShrink: 0,
                  transition: "transform 0.25s ease",
                  transform: openIndex === i ? "rotate(180deg)" : "rotate(0deg)",
                }}
              />
            </button>
            {openIndex === i && (
              <div style={{ padding: "0 20px 18px" }}>
                <p style={{
                  fontFamily: "var(--font-barlow)",
                  fontSize: "0.9rem",
                  color: "#4A4540",
                  lineHeight: 1.7,
                  margin: 0,
                }}>
                  {faq.a}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
