"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";

export default function LoginPage() {
  const router = useRouter();
  const { toast } = useToast();

  const [step, setStep] = useState<"phone" | "otp">("phone");
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  useEffect(() => {
    if (step === "otp") {
      setTimeout(() => otpRefs[0].current?.focus(), 100);
    }
  }, [step]);

  const handleSendOtp = () => {
    const cleaned = phone.replace(/\D/g, "");
    if (cleaned.length !== 10) {
      setError("Please enter a valid 10-digit mobile number");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({
        title: `OTP sent to +91 ${phone}`,
        description: "Use any 4-digit code to login (test mode)",
      });
      setStep("otp");
    }, 800);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError("");
    if (value && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleVerifyOtp = () => {
    const filled = otp.join("");
    if (filled.length < 4) {
      setError("Please enter a valid OTP");
      return;
    }
    setError("");
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast({ title: "Login successful!", description: "Welcome back." });
      router.push("/");
    }, 800);
  };

  const handlePhoneKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleSendOtp();
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4 py-12"
      style={{ background: "#FAF7F2" }}
    >
      {/* Decorative background blobs */}
      <div
        style={{
          position: "fixed",
          top: "-10%",
          right: "-5%",
          width: 320,
          height: 320,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(46,138,87,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-5%",
          left: "-8%",
          width: 280,
          height: 280,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(192,103,58,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <div
        className="w-full relative z-10"
        style={{ maxWidth: 420 }}
      >
        {/* Card */}
        <div
          style={{
            background: "#ffffff",
            borderRadius: 24,
            boxShadow: "0 4px 32px rgba(46,138,87,0.10), 0 1px 4px rgba(0,0,0,0.06)",
            padding: "40px 36px 36px",
            borderTop: "3px solid #2E8A57",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <Image
              src="/logo-symbol-tr.png"
              alt="Karavali Mangalore Store"
              width={64}
              height={64}
              className="object-contain"
            />
          </div>

          {/* Heading */}
          <div className="text-center mb-8">
            <h1
              style={{
                fontFamily: "var(--font-fraunces)",
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#1A2A1E",
                lineHeight: 1.2,
                marginBottom: 6,
              }}
            >
              Welcome Back
            </h1>
            <p
              style={{
                fontFamily: "var(--font-barlow)",
                fontSize: "0.875rem",
                color: "#7A7065",
              }}
            >
              {step === "phone"
                ? "Login to your account"
                : `Enter the OTP sent to +91 ${phone}`}
            </p>
          </div>

          {/* Step 1 — Phone */}
          {step === "phone" && (
            <div className="flex flex-col gap-4">
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#4A4540",
                    display: "block",
                    marginBottom: 8,
                    letterSpacing: "0.03em",
                  }}
                >
                  Mobile Number
                </label>
                <div
                  className="flex items-center"
                  style={{
                    border: `1.5px solid ${error ? "#C0673A" : "#E2D9D0"}`,
                    borderRadius: 12,
                    overflow: "hidden",
                    background: "#FDFCFA",
                    transition: "border-color 0.2s",
                  }}
                  onFocus={() => {}}
                >
                  {/* +91 prefix */}
                  <div
                    style={{
                      padding: "12px 14px",
                      fontFamily: "var(--font-barlow)",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#2E8A57",
                      borderRight: "1.5px solid #E2D9D0",
                      background: "#F4F9F6",
                      whiteSpace: "nowrap",
                      userSelect: "none",
                    }}
                  >
                    +91
                  </div>
                  <input
                    type="tel"
                    inputMode="numeric"
                    maxLength={10}
                    value={phone}
                    onChange={(e) => {
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10));
                      setError("");
                    }}
                    onKeyDown={handlePhoneKeyDown}
                    placeholder="10-digit mobile number"
                    style={{
                      flex: 1,
                      padding: "12px 14px",
                      fontFamily: "var(--font-barlow)",
                      fontSize: "0.95rem",
                      color: "#1A2A1E",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                    }}
                  />
                </div>
                {error && (
                  <p
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: "0.78rem",
                      color: "#C0673A",
                      marginTop: 6,
                    }}
                  >
                    {error}
                  </p>
                )}
              </div>

              <button
                onClick={handleSendOtp}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: loading ? "#7DBD9A" : "#2E8A57",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 12,
                  fontFamily: "var(--font-barlow)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.2s, transform 0.1s",
                  letterSpacing: "0.02em",
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget.style.background = "#256E47");
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget.style.background = "#2E8A57");
                }}
              >
                {loading ? "Sending..." : "Send OTP"}
              </button>
            </div>
          )}

          {/* Step 2 — OTP */}
          {step === "otp" && (
            <div className="flex flex-col gap-4">
              <div>
                <label
                  style={{
                    fontFamily: "var(--font-barlow)",
                    fontSize: "0.8rem",
                    fontWeight: 600,
                    color: "#4A4540",
                    display: "block",
                    marginBottom: 12,
                    letterSpacing: "0.03em",
                  }}
                >
                  Enter OTP
                </label>

                {/* OTP boxes */}
                <div className="flex items-center justify-center gap-3">
                  {otp.map((digit, i) => (
                    <input
                      key={i}
                      ref={otpRefs[i]}
                      type="tel"
                      inputMode="numeric"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(i, e.target.value)}
                      onKeyDown={(e) => handleOtpKeyDown(i, e)}
                      style={{
                        width: 60,
                        height: 64,
                        textAlign: "center",
                        fontFamily: "var(--font-fraunces)",
                        fontSize: "1.5rem",
                        fontWeight: 700,
                        color: "#1A2A1E",
                        background: digit ? "#F4F9F6" : "#FDFCFA",
                        border: `2px solid ${error ? "#C0673A" : digit ? "#2E8A57" : "#E2D9D0"}`,
                        borderRadius: 12,
                        outline: "none",
                        transition: "border-color 0.2s, background 0.2s",
                        caretColor: "#2E8A57",
                      }}
                      onFocus={(e) => {
                        e.currentTarget.style.borderColor = "#2E8A57";
                        e.currentTarget.style.boxShadow = "0 0 0 3px rgba(46,138,87,0.12)";
                      }}
                      onBlur={(e) => {
                        e.currentTarget.style.boxShadow = "none";
                        if (!digit) e.currentTarget.style.borderColor = "#E2D9D0";
                      }}
                    />
                  ))}
                </div>

                {error && (
                  <p
                    style={{
                      fontFamily: "var(--font-barlow)",
                      fontSize: "0.78rem",
                      color: "#C0673A",
                      marginTop: 8,
                      textAlign: "center",
                    }}
                  >
                    {error}
                  </p>
                )}
              </div>

              <button
                onClick={handleVerifyOtp}
                disabled={loading}
                style={{
                  width: "100%",
                  padding: "13px",
                  background: loading ? "#7DBD9A" : "#2E8A57",
                  color: "#ffffff",
                  border: "none",
                  borderRadius: 12,
                  fontFamily: "var(--font-barlow)",
                  fontSize: "0.95rem",
                  fontWeight: 600,
                  cursor: loading ? "not-allowed" : "pointer",
                  transition: "background 0.2s",
                  letterSpacing: "0.02em",
                  marginTop: 4,
                }}
                onMouseEnter={(e) => {
                  if (!loading) (e.currentTarget.style.background = "#256E47");
                }}
                onMouseLeave={(e) => {
                  if (!loading) (e.currentTarget.style.background = "#2E8A57");
                }}
              >
                {loading ? "Verifying..." : "Verify OTP"}
              </button>

              {/* Change number */}
              <p
                style={{
                  textAlign: "center",
                  fontFamily: "var(--font-barlow)",
                  fontSize: "0.82rem",
                  color: "#7A7065",
                }}
              >
                Wrong number?{" "}
                <button
                  onClick={() => {
                    setStep("phone");
                    setOtp(["", "", "", ""]);
                    setError("");
                  }}
                  style={{
                    color: "#C0673A",
                    fontWeight: 600,
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    padding: 0,
                    fontFamily: "var(--font-barlow)",
                    fontSize: "0.82rem",
                    textDecoration: "underline",
                    textUnderlineOffset: 2,
                  }}
                >
                  Change number
                </button>
              </p>
            </div>
          )}

          {/* Footer note */}
          <p
            style={{
              marginTop: 28,
              textAlign: "center",
              fontFamily: "var(--font-barlow)",
              fontSize: "0.75rem",
              color: "#B0A89E",
              lineHeight: 1.5,
            }}
          >
            By continuing, you agree to our{" "}
            <a href="/privacy-policy" style={{ color: "#2E8A57", textDecoration: "underline", textUnderlineOffset: 2 }}>
              Privacy Policy
            </a>
          </p>
        </div>

        {/* Brand tagline below card */}
        <p
          style={{
            textAlign: "center",
            marginTop: 20,
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            fontSize: "0.85rem",
            color: "#A09890",
          }}
        >
          Taste Authentic Karavali at Home
        </p>
      </div>
    </div>
  );
}
