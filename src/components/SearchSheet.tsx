'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { products as allProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Product } from '@/types';
import { useIsMobile } from '@/hooks/use-mobile';

function SearchResultItem({ product, onLinkClick }: { product: Product, onLinkClick: () => void }) {
  const productImage = PlaceHolderImages.find(p => p.id === product.images[0]);
  const price = product.sale_price ?? product.price;

  return (
    <Link href={`/product/${product.sku}`} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted" onClick={onLinkClick}>
      <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0 border">
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

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export default function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  
  // Mobile-specific refs for gesture handling
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const touchStartPos = useRef(0);
  const isSwiping = useRef(false);
  const SWIPE_THRESHOLD = 100;

  // This hook determines if the component should render in mobile or desktop mode.
  const isMobile = useIsMobile();

  // This effect handles focusing the search input on both mobile and desktop.
  useEffect(() => {
    if (!open) return;

    if (isMobile) {
      // On mobile, we delay focus to prevent the keyboard from causing layout shifts.
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(focusTimer);
    } else {
      // On desktop, we can focus more quickly after the dialog animation.
      const focusTimer = setTimeout(() => inputRef.current?.focus(), 100);
      return () => clearTimeout(focusTimer);
    }
  }, [open, isMobile]);

  // This effect contains logic that should ONLY run on mobile devices.
  useEffect(() => {
    // If the sheet isn't open or we're on desktop, do nothing.
    if (!open || !isMobile) return;

    // --- Dynamic Viewport Height (Mobile) ---
    // This solves issues with `100vh` on mobile browsers where the keyboard changes viewport height.
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);

    // --- Browser History Manipulation for Back Gesture (Mobile) ---
    // This allows the user to close the sheet with the system back button/gesture.
    window.history.pushState({ searchSheetOpen: true }, '');
    const handlePopState = (e: PopStateEvent) => {
      // If the user navigates back, close the sheet.
      if (!e.state?.searchSheetOpen) {
        onOpenChange(false);
      }
    };
    window.addEventListener('popstate', handlePopState);

    // --- Cleanup function ---
    return () => {
      window.removeEventListener('resize', setVh);
      window.removeEventListener('popstate', handlePopState);
      // Clean up our history state if the sheet is closed by other means (X button, swipe)
      if (window.history.state?.searchSheetOpen) {
        window.history.back();
      }
    };
  }, [open, isMobile, onOpenChange]);

  const handleClose = () => {
    onOpenChange(false);
  };

  // When the sheet is closed (via any method), clear the search query.
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setSearchQuery(''), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  // Memoized search filtering logic.
  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) return [];
    const lowercasedQuery = searchQuery.toLowerCase();
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)))
    );
  }, [searchQuery]);

  // --- Gesture Handling for Swipe-to-Close (Mobile-only) ---
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (scrollAreaRef.current && scrollAreaRef.current.scrollTop === 0) {
      touchStartPos.current = e.touches[0].clientY;
      isSwiping.current = true;
    }
  };
  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwiping.current || !sheetContentRef.current) return;
    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartPos.current;
    if (deltaY > 0) {
      e.preventDefault();
      sheetContentRef.current.style.transform = `translateY(${deltaY}px)`;
      sheetContentRef.current.style.transition = 'none';
    }
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwiping.current || !sheetContentRef.current) return;
    const currentY = e.changedTouches[0].clientY;
    const deltaY = currentY - touchStartPos.current;
    if (deltaY > SWIPE_THRESHOLD) {
      onOpenChange(false);
    } else {
      sheetContentRef.current.style.transition = 'transform 0.2s ease';
      sheetContentRef.current.style.transform = 'translateY(0px)';
    }
    isSwiping.current = false;
    touchStartPos.current = 0;
  };

  // This JSX contains the search results, which is shared between mobile and desktop.
  const resultsContent = (
    <div className="p-4">
      {searchQuery && filteredProducts.length === 0 && (
        <div className="text-center py-20">
          <p className="text-lg text-muted-foreground">No products found for "{searchQuery}"</p>
        </div>
      )}
      {searchQuery && filteredProducts.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-semibold px-3 mb-2">{filteredProducts.length} results found</h3>
          {filteredProducts.map(product => (
            <SearchResultItem key={product.sku} product={product} onLinkClick={handleClose} />
          ))}
        </div>
      )}
      {!searchQuery && (
        <div className="text-center py-20">
          <Search className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4" />
          <p className="text-lg text-muted-foreground">Find your favorite products</p>
          <p className="text-sm text-muted-foreground/80">Search for spices, snacks, and more.</p>
        </div>
      )}
    </div>
  );

  // Avoid rendering anything on the server or during the first client render to prevent hydration mismatches.
  if (isMobile === undefined) {
    return null;
  }

  // --- Mobile Rendering ---
  // Uses a Sheet component that slides up from the bottom.
  if (isMobile) {
    return (
      <Sheet open={open} onOpenChange={onOpenChange}>
        <SheetContent
          ref={sheetContentRef}
          side="bottom"
          className="flex flex-col p-0 bg-background overflow-hidden"
          style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <SheetHeader 
            className="p-4 border-b flex-shrink-0" 
            style={{ paddingTop: 'calc(env(safe-area-inset-top) + 1rem)' }}
          >
            <SheetTitle className="sr-only">Search Products</SheetTitle>
            <div className="flex items-center gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  ref={inputRef}
                  type="search"
                  placeholder="Search for products..."
                  className="w-full rounded-full bg-muted pl-10 pr-4 h-11 text-base"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button variant="ghost" size="icon" className="rounded-full h-11 w-11" onClick={handleClose}>
                <X className="h-5 w-5"/>
                <span className="sr-only">Close</span>
              </Button>
            </div>
          </SheetHeader>
          <div className="flex-grow overflow-y-auto" ref={scrollAreaRef}>
            {resultsContent}
          </div>
        </SheetContent>
      </Sheet>
    );
  }

  // --- Desktop Rendering ---
  // Uses a Dialog component that appears as a centered modal.
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-2xl p-0 gap-0 flex flex-col max-h-[80vh] h-[80vh]">
        <DialogHeader className="p-4 border-b">
          <DialogTitle className="sr-only">Search Products</DialogTitle>
          <div className="flex items-center gap-2">
            <div className="relative flex-grow">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                ref={inputRef}
                type="search"
                placeholder="Search for products..."
                className="w-full rounded-full bg-muted pl-10 pr-4 h-11 text-base"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </DialogHeader>
        <div className="flex-grow overflow-y-auto">
          {resultsContent}
        </div>
      </DialogContent>
    </Dialog>
  );
}
