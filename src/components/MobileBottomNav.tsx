'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, ShoppingCart, Search } from 'lucide-react';
import { useFirestoreCart } from '@/hooks/use-firestore-cart';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import SearchSheet from './SearchSheet';
import Image from 'next/image';

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
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[94%] max-w-md z-50 md:hidden">
        <div
          className="relative h-[52px] rounded-full border-[2px] border-primary flex items-center justify-between px-2"
          style={{ background: '#FEFEFE', boxShadow: '0 2px 8px rgba(0,0,0,0.06), 0 8px 28px rgba(0,0,0,0.10), 0 24px 56px rgba(0,0,0,0.07)' }}
        >

          {/* Navigation Items Area */}
          <nav className="flex flex-grow items-center justify-around gap-4 pl-4 pr-16 h-full">
            {navItems.map((item) => {
              const isActive =
                (item.href === '/' && pathname === '/') ||
                (item.href !== '/' &&
                  item.href !== '#' &&
                  pathname.startsWith(item.href));

              const Icon = item.icon;

              return (
                <Link
                  href={item.href}
                  key={item.label}
                  onClick={(e) => handleNavClick(e, item)}
                  className={cn(
                    'relative flex flex-col items-center justify-center gap-0.5 transition-all duration-300 transform active:scale-90',
                    isActive
                      ? 'text-primary'
                      : 'text-muted-foreground'
                  )}
                >
                  <div className="relative">
                    <Icon
                      className={cn('h-6 w-6', isActive && 'fill-current')}
                    />
                    {item.label === 'Cart' && cartCount > 0 && (
                      <span className="absolute -top-0.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[9px] font-bold ring-1 ring-black/20">
                        {cartCount}
                      </span>
                    )}
                  </div>
                  <span className={cn(
                    "text-[11px] leading-none mt-1 whitespace-nowrap",
                    isActive ? "font-bold" : "font-medium"
                  )}>
                    {item.label}
                  </span>
                </Link>
              );
            })}
          </nav>

          {/* Right Overlapping Circular Brand Logo */}
          <div className="absolute -right-3 top-1/2 -translate-y-1/2 z-20">
            <Link
              href="/"
              className="relative flex h-[78px] w-[78px] items-center justify-center rounded-full bg-white overflow-hidden transition-transform active:scale-95 border border-black/5"
              style={{ boxShadow: '0 4px 10px rgba(0,0,0,0.08), 0 10px 28px rgba(0,0,0,0.10)' }}
            >
              <Image
                src="/navbar-logo.png"
                alt="Karavali Store Logo"
                fill
                className="w-full h-full object-contain scale-[2.1] translate-y-[2px]"
                priority
              />
            </Link>
          </div>

        </div>
      </div>
      <SearchSheet open={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </>
  );
}
