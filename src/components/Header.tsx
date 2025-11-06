"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { categories } from "@/lib/categories";
import { useCart } from "@/hooks/use-cart";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";

export default function Header() {
  const { cartCount } = useCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = categories.map(category => (
    <Link
      key={category.id}
      href={`/category/${category.slug}`}
      className="text-sm font-medium transition-colors hover:text-primary"
    >
      {category.name}
    </Link>
  ));

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background/80 backdrop-blur-sm">
      <div className="bg-accent text-accent-foreground text-center text-sm font-medium p-2">
        Free shipping on all orders above ₹799
      </div>
      <div className="container flex h-16 items-center">
        <div className="mr-4 hidden md:flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold font-headline text-2xl">TulunaduStore</span>
          </Link>
          <nav className="flex items-center space-x-6 text-sm font-medium">
            {navLinks}
          </nav>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
           <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col h-full">
                    <div className="border-b p-4">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2">
                            <span className="font-bold font-headline text-2xl">TulunaduStore</span>
                        </Link>
                    </div>
                    <nav className="flex flex-col space-y-4 p-4 text-lg">
                        {categories.map(category => (
                          <SheetClose asChild key={category.id}>
                            <Link
                              href={`/category/${category.slug}`}
                              className="font-medium transition-colors hover:text-primary"
                            >
                              {category.name}
                            </Link>
                          </SheetClose>
                        ))}
                    </nav>
                </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Mobile Logo */}
        <div className="flex justify-center flex-1 md:hidden">
            <Link href="/" className="flex items-center space-x-2">
                <span className="font-bold font-headline text-xl">TulunaduStore</span>
            </Link>
        </div>


        <div className="flex flex-1 items-center justify-end space-x-2 md:space-x-4">
          <Button variant="ghost" size="icon" className="hidden md:inline-flex">
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="icon">
            <User className="h-5 w-5" />
            <span className="sr-only">Account</span>
          </Button>
          <Link href="/cart" passHref>
            <Button variant="ghost" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <span className="sr-only">Cart</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                  {cartCount}
                </span>
              )}
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
