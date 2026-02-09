"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/categories";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import { useState, useEffect, useRef } from "react";
import { useUser, useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { cn } from "@/lib/utils";
import { MobileThemeToggle } from "./MobileThemeToggle";
import { ThemeToggle } from "./ThemeToggle";

export default function Header() {
  const { cartCount } = useFirestoreCart();
  const { user } = useUser();
  const auth = useAuth();
  const [isAtTop, setIsAtTop] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY === 0);

      // Hiding navbar logic for desktop
      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        // Scrolling down
        setShowNav(false);
      } else {
        // Scrolling up or at the top
        setShowNav(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Set initial state

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleAuthClick = () => {
    if (!user) {
      initiateAnonymousSignIn(auth);
    }
  };

  const isHomePage = pathname === '/';
  const showMobileAccountButton = isHomePage || pathname.startsWith('/category');

  return (
    <>
      {isHomePage && (
        <div className={cn(
          "fixed top-4 left-4 z-50 md:hidden transition-opacity duration-300",
          isAtTop ? "opacity-90" : "opacity-0 pointer-events-none"
        )}>
          <MobileThemeToggle />
        </div>
      )}

      {showMobileAccountButton && (
        <div className={cn(
          "fixed top-4 right-4 z-50 md:hidden transition-opacity duration-300",
          isAtTop ? "opacity-90" : "opacity-0 pointer-events-none"
        )}>
          {user ? (
            <Link href="/account" passHref>
              <Button variant="ghost" size="icon" className="h-9 w-9 bg-background/80 backdrop-blur-sm rounded-full shadow-md text-foreground" aria-label="Account">
                <User className="h-4 w-4" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="icon" className="h-9 w-9 bg-background/80 backdrop-blur-sm rounded-full shadow-md text-foreground" onClick={handleAuthClick} aria-label="Account">
              <User className="h-4 w-4" />
            </Button>
          )}
        </div>
      )}

      <header className={cn(
        "sticky top-0 z-40 hidden w-full p-4 md:block transition-transform duration-300",
        showNav ? "translate-y-0" : "-translate-y-full"
      )}>
        <div className="container mx-auto flex h-16 items-center justify-between gap-4 rounded-2xl bg-primary px-6 text-primary-foreground">
          
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center">
              <div className="bg-primary-foreground rounded-full px-4 py-1 shadow-inner flex flex-col items-center">
                  <span className="font-bold font-headline text-2xl leading-none bg-gradient-to-b from-primary via-primary to-black/70 bg-clip-text text-transparent">Karavali</span>
                  <span className="font-medium text-primary text-[0.6rem] tracking-[0.2em] uppercase">
                      Mangalore Store
                  </span>
              </div>
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10">
                  Categories <ChevronDown className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                {categories.map((category) => (
                  <DropdownMenuItem key={category.id} asChild>
                    <Link href={`/category/${category.slug}`}>{category.name}</Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <div className="relative flex-grow max-w-lg">
              <Input 
                  type="search"
                  placeholder="Search for Grocery, Stores, Vegetable or Meat"
                  className="w-full rounded-full border-none bg-background text-foreground pl-4 pr-10 h-10 shadow-inner"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          </div>

          <div className="flex items-center gap-4">
              <ThemeToggle className="text-primary-foreground hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10" />

              {user ? (
                <Link href="/account" passHref>
                  <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10" aria-label="Account">
                    <User className="h-5 w-5" />
                  </Button>
                </Link>
              ) : (
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10" onClick={handleAuthClick} aria-label="Account">
                  <User className="h-5 w-5" />
                </Button>
              )}

              <Link href="/cart" passHref>
                  <Button variant="ghost" size="icon" className="relative hover:bg-primary-foreground/10 focus-visible:bg-primary-foreground/10">
                      <ShoppingCart className="h-5 w-5" />
                      <span className="sr-only">Cart</span>
                      {cartCount > 0 && (
                          <span className="absolute -top-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-destructive text-destructive-foreground text-xs font-bold">
                          {cartCount}
                          </span>
                      )}
                  </Button>
              </Link>
          </div>
        </div>
      </header>
    </>
  );
}
