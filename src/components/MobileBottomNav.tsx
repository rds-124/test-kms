'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, LayoutGrid, Search, ShoppingCart } from 'lucide-react';
import { useFirestoreCart } from '@/hooks/use-firestore-cart';
import { cn } from '@/lib/utils';

export default function MobileBottomNav() {
  const pathname = usePathname();
  const { cartCount } = useFirestoreCart();

  // The main navigation items that will appear inside the pill.
  const navItems = [
    { href: '/', icon: Home, label: 'Home' },
    { href: '/category/all', icon: LayoutGrid, label: 'Categories' },
    { href: '/cart', icon: ShoppingCart, label: 'Cart' },
    { href: '/category/all', icon: Search, label: 'Search' },
  ];

  // The bottom nav should not appear on admin pages.
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    /**
     * A container fixed to the bottom of the screen on mobile devices.
     * It uses a relative positioning context for the overlapping logo.
     */
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:hidden">
      <div className="relative mx-auto flex h-16 max-w-sm items-center">
        
        {/* Main Navigation Pill */}
        <nav className="flex h-full flex-grow items-center justify-around rounded-full bg-background pr-16 shadow-[0_4px_24px_rgba(0,0,0,0.1)] border border-border/50">
          {navItems.map((item) => {
            // Determine if the current item is active.
            const isActive =
              (item.href === '/' && pathname === '/') ||
              (item.href !== '/' &&
                item.label !== 'Search' && // Search icon doesn't get an active state.
                pathname.startsWith(item.href));

            return (
              <Link
                href={item.href}
                key={item.label}
                className={cn(
                  'flex h-full w-full flex-col items-center justify-center gap-1 rounded-full text-xs transition-colors',
                  isActive
                    ? 'text-primary font-bold'
                    : 'text-muted-foreground hover:text-primary'
                )}
              >
                <div className="relative">
                  {/* The icon's fill changes on active state, mimicking the reference image. */}
                  <item.icon
                    className={cn('h-6 w-6', isActive && 'fill-current')}
                  />
                  {/* Badge for cart item count. */}
                  {item.label === 'Cart' && cartCount > 0 && (
                    <span className="absolute -top-1.5 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-primary-foreground text-[10px] font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                <span className="text-[10px]">{item.label}</span>
              </Link>
            );
          })}
        </nav>
        
        {/* Overlapping Store Logo Button */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2">
          <Link
            href="/"
            className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-2 ring-background"
          >
            <span className="font-headline text-3xl font-bold">K</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
