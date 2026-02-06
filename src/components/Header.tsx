"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, ChevronDown, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { categories } from "@/lib/categories";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { useUser, useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";


export default function Header() {
  const { cartCount } = useFirestoreCart();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const auth = useAuth();

  const handleAuthClick = () => {
    if (!user) {
      initiateAnonymousSignIn(auth);
    } else {
      // Future: Open user account menu
      console.log("User is already signed in:", user.uid);
    }
  };

  return (
    // This header is hidden on mobile screens (below md breakpoint) and visible on desktop.
    <header className="sticky top-0 z-40 hidden w-full p-2 md:block">
      <div className="container mx-auto flex h-16 items-center justify-between gap-6 rounded-full bg-accent px-4 text-accent-foreground">
        
        {/* Left Section: Menu and Brand */}
        <div className="flex items-center gap-2">
          {/* The Sheet component provides an off-canvas menu, primarily for mobile, but linked here for consistency. */}
          <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="hover:bg-primary/20 focus-visible:bg-primary/20">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Open menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
                <div className="flex flex-col h-full">
                    <div className="border-b p-4">
                        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center space-x-2">
                            <span className="font-bold font-headline text-2xl">Karavali Store</span>
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
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold font-headline text-2xl">Karavali Store</span>
          </Link>
        </div>

        {/* Center Section: Search Bar */}
        <div className="relative flex-grow max-w-xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input 
                type="search"
                placeholder="Search for spices, snacks, and more..."
                className="w-full rounded-full border-none bg-background text-foreground pl-12 pr-4 h-10 shadow-inner"
            />
        </div>

        {/* Right Section: Actions */}
        <div className="flex items-center gap-1">
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="hover:bg-primary/20 focus-visible:bg-primary/20">
                        <LayoutGrid className="mr-2 h-5 w-5" />
                        Categories
                        <ChevronDown className="ml-1 h-5 w-5" />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56">
                    {categories.map(category => (
                        <DropdownMenuItem key={category.id} asChild>
                             <Link href={`/category/${category.slug}`}>{category.name}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuContent>
            </DropdownMenu>

            <ThemeToggle />

            <Button variant="ghost" size="icon" className="hover:bg-primary/20 focus-visible:bg-primary/20" onClick={handleAuthClick} aria-label="Account">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
            </Button>

            <Link href="/cart" passHref>
                <Button variant="ghost" size="icon" className="relative hover:bg-primary/20 focus-visible:bg-primary/20">
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
