import type { Metadata } from "next";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import { ThemeProvider } from "@/components/ThemeProvider";
import { FirebaseClientProvider } from "@/firebase/client-provider";
import MobileBottomNav from "@/components/MobileBottomNav";
import "./globals.css";

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;700&family=Noto+Sans:wght@400;700&family=Roboto:wght@400;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-body antialiased">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
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
