import type { Metadata } from "next";
import { Inter, Playfair_Display, Noto_Sans, Roboto } from "next/font/google";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import MobileBottomNav from "@/components/MobileBottomNav";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  weight: ["400", "700"],
});

const playfair_display = Playfair_Display({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-playfair-display",
  weight: "700",
});

const noto_sans = Noto_Sans({
    subsets: ['latin'],
    variable: '--font-noto-sans',
    weight: ['400', '700'],
    display: 'swap',
});

const roboto = Roboto({
    subsets: ['latin'],
    variable: '--font-roboto',
    weight: ['400', '700'],
    display: 'swap',
});

export const metadata: Metadata = {
  title: "Karavali Store",
  description: "Authentic products from the heart of Karavali.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair_display.variable} ${noto_sans.variable} ${roboto.variable}`} suppressHydrationWarning>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          disableTransitionOnChange
        >
          <FirebaseClientProvider>
            <div className="flex flex-col min-h-screen pb-20 md:pb-0">
              <Header />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
            <WhatsAppButton />
            <MobileBottomNav />
            <Toaster />
          </FirebaseClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
