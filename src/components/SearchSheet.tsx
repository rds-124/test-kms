'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { products as allProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { Product } from '@/types';

interface SearchSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

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

export default function SearchSheet({ open, onOpenChange }: SearchSheetProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const sheetContentRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Refs for gesture handling to prevent re-renders on touch move
  const touchStartPos = useRef(0);
  const isSwiping = useRef(false);
  const SWIPE_THRESHOLD = 100; // Min pixels to swipe down to close

  useEffect(() => {
    if (!open) return;

    // --- Dynamic Viewport Height ---
    // This solves issues with 100vh on mobile browsers where the keyboard changes the viewport height.
    const setVh = () => {
      document.documentElement.style.setProperty('--vh', `${window.innerHeight * 0.01}px`);
    };
    setVh();
    window.addEventListener('resize', setVh);

    // --- Delayed Input Focus ---
    // Prevents the keyboard from causing the layout to jump on initial render.
    const focusTimer = setTimeout(() => inputRef.current?.focus(), 300);

    // --- Browser History Manipulation for Back Gesture ---
    // This allows the user to close the sheet with the system back button/gesture.
    window.history.pushState({ searchSheetOpen: true }, '');
    const handlePopState = (e: PopStateEvent) => {
      // If the history event is not our specific state, it means the user went back.
      if (!e.state?.searchSheetOpen) {
        onOpenChange(false);
      }
    };
    window.addEventListener('popstate', handlePopState);

    // --- Cleanup function ---
    return () => {
      clearTimeout(focusTimer);
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('resize', setVh);
      // Clean up our history state if the sheet is closed by other means (X button, swipe)
      if (window.history.state?.searchSheetOpen) {
        window.history.back();
      }
    };
  }, [open, onOpenChange]);


  const handleClose = () => {
    onOpenChange(false);
  };
  
  // When sheet is closed (via any method), clear the search query
  useEffect(() => {
    if (!open) {
      const timer = setTimeout(() => setSearchQuery(''), 300);
      return () => clearTimeout(timer);
    }
  }, [open]);

  const filteredProducts = useMemo(() => {
    if (!searchQuery.trim()) {
      return [];
    }
    const lowercasedQuery = searchQuery.toLowerCase();
    return allProducts.filter(product =>
      product.title.toLowerCase().includes(lowercasedQuery) ||
      product.category.toLowerCase().includes(lowercasedQuery) ||
      (product.tags && product.tags.some(tag => tag.toLowerCase().includes(lowercasedQuery)))
    );
  }, [searchQuery]);

  // --- Gesture Handling for Swipe-to-Close ---
  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    // Only start tracking a swipe if the search results are not scrolled down.
    if (scrollAreaRef.current && scrollAreaRef.current.scrollTop === 0) {
      touchStartPos.current = e.touches[0].clientY;
      isSwiping.current = true;
    }
  };

  const onTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwiping.current || !sheetContentRef.current) return;

    const currentY = e.touches[0].clientY;
    const deltaY = currentY - touchStartPos.current;

    // Only handle downward swipes.
    if (deltaY > 0) {
      e.preventDefault(); // Prevent page scroll while swiping the sheet.
      // Apply visual feedback by moving the sheet down.
      sheetContentRef.current.style.transform = `translateY(${deltaY}px)`;
      sheetContentRef.current.style.transition = 'none'; // Ensure smooth dragging.
    }
  };

  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isSwiping.current || !sheetContentRef.current) return;

    const currentY = e.changedTouches[0].clientY;
    const deltaY = currentY - touchStartPos.current;

    if (deltaY > SWIPE_THRESHOLD) {
      // If the user swiped far enough, close the sheet.
      onOpenChange(false);
    } else {
      // Otherwise, animate the sheet back to its original position.
      sheetContentRef.current.style.transition = 'transform 0.2s ease';
      sheetContentRef.current.style.transform = 'translateY(0px)';
    }

    // Reset swipe tracking state.
    isSwiping.current = false;
    touchStartPos.current = 0;
  };

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
                <SheetClose asChild>
                    <Button variant="ghost" size="icon" className="rounded-full h-11 w-11">
                        <X className="h-5 w-5"/>
                        <span className="sr-only">Close</span>
                    </Button>
                </SheetClose>
            </div>
        </SheetHeader>
        <div className="flex-grow overflow-y-auto" ref={scrollAreaRef}>
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
                    <Search className="h-16 w-16 text-muted-foreground/20 mx-auto mb-4"/>
                    <p className="text-lg text-muted-foreground">Find your favorite products</p>
                    <p className="text-sm text-muted-foreground/80">Search for spices, snacks, and more.</p>
                </div>
            )}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
