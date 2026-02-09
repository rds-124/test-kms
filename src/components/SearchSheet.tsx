'use client';

import { useState, useMemo, useEffect, useRef } from 'react';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Input } from '@/components/ui/input';
import { products as allProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Search, X } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
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

  // Set dynamic viewport height to handle mobile keyboards correctly and delay focus
  useEffect(() => {
    if (!open) return;

    const setVh = () => {
      // We are multiplying by 0.01 to get a value for 1vh
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);

    // Focus after a delay to allow the keyboard animation to complete
    const timer = setTimeout(() => {
      inputRef.current?.focus();
    }, 300);

    return () => {
      window.removeEventListener('resize', setVh);
      clearTimeout(timer);
    };
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

  const handleClose = () => {
    onOpenChange(false);
    setSearchQuery('');
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="bottom"
        className="flex flex-col p-0 bg-background overflow-hidden"
        style={{ height: 'calc(var(--vh, 1vh) * 100)' }}
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
        <ScrollArea className="flex-grow">
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
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
