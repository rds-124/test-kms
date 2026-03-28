
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Search, ShoppingCart, User, ChevronDown, LayoutGrid } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { categories } from "@/lib/categories";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import { useState, useEffect, useRef, useMemo } from "react";
import { useUser, useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";
import { cn } from "@/lib/utils";

import SearchSheet from "./SearchSheet";
import CartDrawer from "./CartDrawer";
import { Input } from "./ui/input";
import { products as allProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import type { Product } from "@/types";
import Image from "next/image";

function SearchResultItem({ product, onLinkClick }: { product: Product, onLinkClick: () => void }) {
  const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
  const price = product.sale_price ?? product.price;

  return (
    <Link href={`/product/${product.sku}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted" onClick={onLinkClick}>
      <div className="relative h-14 w-14 rounded-md overflow-hidden flex-shrink-0 border">
        {productImage ? (
          <Image
            src={productImage.imageUrl}
            alt={product.title}
            fill
            className="object-cover"
            data-ai-hint={productImage.imageHint}
          />
        ) : (
          <div className="w-full h-full bg-secondary" />
        )}
      </div>
      <div className="flex-grow">
        <p className="font-semibold text-sm line-clamp-2">{product.title}</p>
        <p className="text-sm text-muted-foreground">₹{price.toFixed(2)}</p>
      </div>
    </Link>
  );
}

export default function Header() {
  const { cartCount } = useFirestoreCart();
  const { user } = useUser();
  const auth = useAuth();
  const [isAtTop, setIsAtTop] = useState(true);
  const [showNav, setShowNav] = useState(true);
  const lastScrollY = useRef(0);
  const cartCountRef = useRef(cartCount); // mirrors cartCount without affecting scroll listener deps
  const pathname = usePathname();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Categories hover-open state
  const [isCatOpen, setIsCatOpen] = useState(false);
  const catCloseTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openCat = () => {
    if (catCloseTimer.current) clearTimeout(catCloseTimer.current);
    setIsCatOpen(true);
  };
  const scheduleCatClose = () => {
    catCloseTimer.current = setTimeout(() => setIsCatOpen(false), 200);
  };

  // Desktop search state
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsAtTop(currentScrollY === 0);

      // Hiding navbar logic for desktop — locked visible when cart has items
      if (currentScrollY > lastScrollY.current && currentScrollY > 100 && cartCountRef.current === 0) {
        // Scrolling down and cart is empty → hide
        setShowNav(false);
      } else {
        // Scrolling up, at top, OR cart has items → always show
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

  // Keep cartCountRef in sync; force navbar visible whenever cart has items
  useEffect(() => {
    cartCountRef.current = cartCount;
    if (cartCount > 0) setShowNav(true);
  }, [cartCount]);

  // Close dropdown on click outside or ESC
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleEscKey);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscKey);
    };
  }, []);

  const handleAuthClick = () => {
    if (!user) {
      initiateAnonymousSignIn(auth);
    }
  };

  const isHomePage = pathname === '/';
  const showMobileAccountButton = isHomePage || pathname.startsWith('/category');

  // Filter products for dropdown
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowercasedQuery = searchQuery.toLowerCase();
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)))
    );
  }, [searchQuery]);

  const handleLinkClick = () => {
    setIsDropdownOpen(false);
    setSearchQuery('');
  }

  return (
    <>

      {showMobileAccountButton && (
        <div className={cn(
          "fixed top-4 right-2 z-50 md:hidden transition-opacity duration-300",
          isAtTop ? "opacity-90" : "opacity-0 pointer-events-none"
        )}>
          {user ? (
            <Link href="/account" passHref>
              <Button variant="ghost" size="icon" className="h-10 w-10 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/20 shadow-lg text-white" aria-label="Account">
                <User className="h-5 w-5" />
              </Button>
            </Link>
          ) : (
            <Button variant="ghost" size="icon" className="h-10 w-10 bg-white/10 dark:bg-black/20 backdrop-blur-md rounded-full border border-white/20 shadow-lg text-white" onClick={handleAuthClick} aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          )}
        </div>
      )}

      <header
        className={cn(
          "sticky top-0 z-40 hidden w-full md:block transition-transform duration-300 shadow-md",
          showNav ? "translate-y-0" : "-translate-y-full"
        )}
        style={{ backgroundColor: 'hsl(var(--primary))' }}
      >
        <div className="flex h-16 items-center justify-between gap-4 px-8 text-primary-foreground">

          {/* Brand area — with soft radial bloom behind it */}
          <div className="relative flex items-center gap-4">
            <Link href="/" className="relative flex items-center gap-1.5 group">
              {/* Logo */}
              <div className="relative w-[56px] h-[56px] flex-shrink-0">
                <Image
                  src="/logo-symbol-tr.png"
                  alt="Karavali Mangalore Store Logo"
                  fill
                  sizes="56px"
                  className="object-contain drop-shadow-sm group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              {/* Brand Text Stack */}
              <div className="flex flex-col items-center leading-none gap-[3px]">
                <span
                  className="font-headline font-bold tracking-widest uppercase text-primary-foreground"
                  style={{ fontSize: '1.4rem', letterSpacing: '0.1em', lineHeight: 1 }}
                >
                  Karavali
                </span>
                <span
                  className="font-ui font-medium tracking-wide text-primary-foreground/85"
                  style={{ fontSize: '0.75rem', letterSpacing: '0.08em' }}
                >
                  Mangalore Store
                </span>
                <span
                  className="text-primary-foreground/55 flex items-center gap-0.5"
                  style={{ fontSize: '0.59rem', letterSpacing: '0.18em' }}
                >
                  <span className="inline-block w-3 border-t border-current" />
                  SINCE 2007
                  <span className="inline-block w-3 border-t border-current" />
                </span>
              </div>
            </Link>
          </div>


          {/* Unified pill search bar — Categories + Input + Search btn */}
          <div
            ref={searchContainerRef}
            className="relative flex-grow max-w-xl ml-8"
          >
            <div className="flex items-center w-full h-9 rounded-full border border-gray-200 overflow-hidden transition-all" style={{ backgroundColor: '#FAFAF9' }}>

              {/* ── Categories dropdown — opens on hover (desktop), tap (mobile) ── */}
              <DropdownMenu open={isCatOpen} onOpenChange={setIsCatOpen}>
                <DropdownMenuTrigger asChild>
                  <button
                    className="flex items-center gap-1.5 h-full pl-3 pr-3 bg-primary/80 text-primary-foreground text-sm font-medium whitespace-nowrap hover:bg-primary/70 transition-all flex-shrink-0 focus:outline-none font-ui tracking-wide"
                    onMouseEnter={openCat}
                    onMouseLeave={scheduleCatClose}
                  >
                    <LayoutGrid className="h-3.5 w-3.5" />
                    Categories
                    <ChevronDown className="h-3 w-3 opacity-70" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  align="start"
                  className="mt-2 p-2 min-w-[280px] data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-top-1 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-top-1 duration-150"
                  onMouseEnter={openCat}
                  onMouseLeave={scheduleCatClose}
                >
                  {/* Two-column grid with subtle centre divider */}
                  <div className="flex gap-0">
                    {/* Column 1 */}
                    <div className="flex flex-col flex-1">
                      {categories.slice(0, Math.ceil(categories.length / 2)).map((category) => (
                        <DropdownMenuItem key={category.id} asChild>
                          <Link href={`/category/${category.slug}`} onClick={handleLinkClick} className="px-3 py-1.5 rounded-md">
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                    {/* Vertical divider */}
                    <div className="w-px bg-border/40 mx-1 self-stretch" />
                    {/* Column 2 */}
                    <div className="flex flex-col flex-1">
                      {categories.slice(Math.ceil(categories.length / 2)).map((category) => (
                        <DropdownMenuItem key={category.id} asChild>
                          <Link href={`/category/${category.slug}`} onClick={handleLinkClick} className="px-3 py-1.5 rounded-md">
                            {category.name}
                          </Link>
                        </DropdownMenuItem>
                      ))}
                    </div>
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Divider */}
              <div className="w-px h-5 bg-gray-200 flex-shrink-0" />

              {/* ── Search input ── */}
              <input
                type="search"
                placeholder="Search for authentic Karavali products..."
                className="flex-grow h-full bg-transparent text-gray-800 placeholder:text-[#4B5563] text-sm px-2 outline-none border-none focus:ring-0 min-w-0"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={() => setIsDropdownOpen(true)}
              />

              {/* ── Search button (right) ── */}
              <button
                aria-label="Search"
                className="flex items-center justify-center h-8 w-8 mr-1 rounded-full bg-primary text-primary-foreground hover:bg-primary/85 transition-all flex-shrink-0 focus:outline-none"
              >
                <Search className="h-4 w-4" />
              </button>
            </div>

            {/* ── Search results dropdown ── */}
            {isDropdownOpen && (
              <div className="absolute top-full mt-2 w-full bg-background text-foreground rounded-xl shadow-lg border z-50 flex flex-col max-h-[60vh]">
                {searchQuery.trim() === '' ? (
                  <div className="flex flex-col items-center justify-center py-14 px-6 gap-3">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-gray-100">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-semibold text-gray-600">Find your favorite products</p>
                      <p className="text-xs text-gray-400 mt-0.5">Search for spices, snacks, and more.</p>
                    </div>
                  </div>
                ) : filteredProducts.length > 0 ? (
                  <>
                    <div className="overflow-y-auto p-2">
                      <div className="space-y-1">
                        {filteredProducts.slice(0, 8).map(product => (
                          <SearchResultItem key={product.sku} product={product} onLinkClick={handleLinkClick} />
                        ))}
                      </div>
                    </div>
                    {filteredProducts.length > 8 && (
                      <div className="p-2 border-t text-center">
                        <Button asChild variant="link" size="sm">
                          <Link href={`/search?q=${encodeURIComponent(searchQuery)}`} onClick={handleLinkClick}>
                            View all {filteredProducts.length} results
                          </Link>
                        </Button>
                      </div>
                    )}
                  </>
                ) : (
                  <div className="text-center py-12 px-4">
                    <p className="text-muted-foreground">No products found for "{searchQuery}"</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-6">

            {user ? (
              <Link
                href="/account"
                className="flex flex-col items-center gap-0.5 text-white cursor-pointer transition-all duration-150 hover:scale-105 focus-visible:outline-none select-none"
                aria-label="Account"
              >
                <span className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-white">
                  <User className="h-4 w-4" />
                </span>
                {user.displayName && (
                  <span className="text-[11px] font-semibold leading-none max-w-[56px] truncate translate-y-[1px]">
                    {user.displayName.split(' ')[0]}
                  </span>
                )}
              </Link>
            ) : (
              <Link
                href="/login"
                className="flex items-center justify-center text-white cursor-pointer transition-all duration-150 hover:scale-105 focus-visible:outline-none"
                aria-label="Login"
              >
                <span className="flex items-center justify-center h-7 w-7 rounded-full border-2 border-white">
                  <User className="h-4 w-4" />
                </span>
              </Link>
            )}

            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-1.5 text-white cursor-pointer transition-all duration-150 hover:scale-105 focus-visible:outline-none select-none bg-transparent border-none p-0"
              aria-label={`Cart, ${cartCount} items`}
            >
              <span className="relative">
                <ShoppingCart className="h-[28px] w-[28px]" strokeWidth={1.6} />
                {cartCount > 0 && (
                  <span
                    className="absolute -top-[7px] -right-[3px] text-[15px] font-extrabold leading-none"
                    style={{ color: '#ffffff', fontFamily: 'var(--font-fraunces)' }}
                  >
                    {cartCount}
                  </span>
                )}
              </span>
              <span className="text-[13px] font-semibold leading-none translate-y-[1px]">Cart</span>
            </button>
          </div>
        </div>
      </header>
      <SearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
      <CartDrawer open={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
