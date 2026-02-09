'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ShoppingCart, Search } from 'lucide-react';
import { useFirestoreCart } from '@/hooks/use-firestore-cart';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import SearchSheet from './SearchSheet';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount } = useFirestoreCart();
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  // The main navigation items that will appear inside the pill.
  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/category/all', icon: LayoutGrid, label: 'Categories' },
    { href: '/cart', icon: ShoppingCart, label: 'Cart' },
    { href: '#', icon: Search, label: 'Search' },
  ];

  // The bottom nav should not appear on admin pages.
  if (pathname.startsWith('/admin')) {
    return null;
  }
  
  const handleSearchClick = (e: React.MouseEvent, item: typeof navItems[0]) => {
    if (item.label === 'Search') {
        e.preventDefault();
        setIsSearchOpen(true);
    }
  };

  const createRipple = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const link = event.currentTarget;
    const rect = link.getBoundingClientRect();

    const circle = document.createElement("span");
    const diameter = Math.max(link.clientWidth, link.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - rect.left - radius}px`;
    circle.style.top = `${event.clientY - rect.top - radius}px`;
    circle.classList.add("ripple");

    const existingRipple = link.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    link.appendChild(circle);
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, item: typeof navItems[0]) => {
    createRipple(e);
    handleSearchClick(e, item);
  };

  return (
    <>
      <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
        <div className="relative mx-auto flex h-12 max-w-sm items-center">
          
          <nav className="flex h-full flex-grow items-center justify-around rounded-full bg-background pr-16 shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-primary">
            {navItems.map((item) => {
              const isActive =
                (item.href === '/' && pathname === '/') ||
                (item.href !== '/' &&
                  item.href !== '#' && 
                  pathname.startsWith(item.href));

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    'relative overflow-hidden flex h-full w-full flex-col items-center justify-center gap-1 rounded-full text-xs transition-colors',
                    isActive
                      ? 'text-primary font-bold'
                      : 'text-muted-foreground hover:text-primary'
                  )}
                >
                  <div className="relative z-10">
                    <item.icon
                      className={cn('h-6 w-6', isActive && 'fill-current')}
                    />
                    {item.label === 'Cart' && cartCount > 0 && (
                      <span className="absolute -top-1 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs font-bold">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className="text-[10px] z-10">{item.label}</span>
                </Link>
              );
            })}
          </nav>
          
          <div className="absolute right-0 top-1/2 -translate-y-1/2">
            <Link
              href="/"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-[0_4px_12px_rgba(0,0,0,0.2)] ring-2 ring-background"
            >
              <span className="font-headline text-2xl font-bold">K</span>
            </Link>
          </div>

        </div>
      </div>
      <SearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
