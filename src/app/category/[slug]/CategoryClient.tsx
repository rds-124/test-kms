"use client";

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { products as allProducts } from '@/lib/products';
import { categories } from '@/lib/categories';
import { categorySEO } from '@/lib/category-seo';
import ProductCard from '@/components/ProductCard';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import Image from 'next/image';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { ChevronDown, SlidersHorizontal } from 'lucide-react';
import { DropdownMenu, DropdownMenuContent, DropdownMenuCheckboxItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import type { Category } from '@/types';
import { cn } from '@/lib/utils';

const PAGE_SIZE = 20;

interface ProductFilterBarProps {
  sortOption: string;
  setSortOption: (value: string) => void;
  inStockOnly: boolean;
  setInStockOnly: (value: boolean) => void;
  priceRange: [number, number];
  setPriceRange: (value: [number, number]) => void;
  selectedCategories: string[];
  toggleCategory: (slug: string) => void;
  clearCategoryFilter: () => void;
  isAllCategoryPage: boolean;
  subCategoryQuery?: string | null;
  currentCategorySlug?: string;
  subCategories: string[];
}

function ProductFilterBar({
  sortOption, setSortOption, inStockOnly, setInStockOnly,
  priceRange, setPriceRange, selectedCategories, toggleCategory,
  clearCategoryFilter, isAllCategoryPage, subCategoryQuery,
  currentCategorySlug, subCategories,
}: ProductFilterBarProps) {

  const AllFiltersSheet = (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          <span>All Filters</span>
        </Button>
      </SheetTrigger>
      <SheetContent className="w-[300px] sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
        </SheetHeader>
        <div className="space-y-6 py-6">
          {isAllCategoryPage && (
            <div className="space-y-2">
              <h3 className="font-semibold">Categories</h3>
              {categories.map(category => (
                <div key={category.id} className="flex items-center gap-2">
                  <Checkbox
                    id={`filter-cat-${category.slug}`}
                    checked={selectedCategories.includes(category.slug)}
                    onCheckedChange={() => toggleCategory(category.slug)}
                  />
                  <Label htmlFor={`filter-cat-${category.slug}`}>{category.name}</Label>
                </div>
              ))}
            </div>
          )}
          {subCategories.length > 0 && (
            <div className="space-y-2">
              <Label>Sub-categories</Label>
              <div className="flex flex-wrap gap-2">
                {subCategories.map(sc => (
                  <Link key={sc} href={`/category/${currentCategorySlug}?sub_category=${sc}`} scroll={false}>
                    <Badge variant={subCategoryQuery === sc ? 'default' : 'secondary'} className="cursor-pointer">
                      {sc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                    </Badge>
                  </Link>
                ))}
                {subCategoryQuery && (
                  <Link href={`/category/${currentCategorySlug}`} scroll={false}>
                    <Badge variant="outline" className="cursor-pointer">Clear</Badge>
                  </Link>
                )}
              </div>
            </div>
          )}
          <div className="flex items-center space-x-2">
            <Checkbox id="in-stock-sheet" checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(Boolean(checked))} />
            <Label htmlFor="in-stock-sheet">In stock only</Label>
          </div>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <Label>Price Range</Label>
              <span className="text-sm font-medium">₹{priceRange[0]} - ₹{priceRange[1]}</span>
            </div>
            <Slider defaultValue={priceRange} max={2000} step={50} onValueChange={(value) => setPriceRange(value as [number, number])} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );

  return (
    <div className="sticky top-0 bg-background/95 backdrop-blur-sm z-30 py-3 border-b mb-8 md:mb-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 md:gap-4">
            <div className="hidden md:flex items-center gap-2">
              {isAllCategoryPage && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant={selectedCategories.length > 0 ? "default" : "outline"}>
                      Categories {selectedCategories.length > 0 && `(${selectedCategories.length})`}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start">
                    <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.map((category: Category) => (
                      <DropdownMenuCheckboxItem
                        key={category.id}
                        checked={selectedCategories.includes(category.slug)}
                        onCheckedChange={() => toggleCategory(category.slug)}
                      >
                        {category.name}
                      </DropdownMenuCheckboxItem>
                    ))}
                    {selectedCategories.length > 0 && (
                      <>
                        <DropdownMenuSeparator />
                        <Button variant="ghost" className="w-full justify-center" size="sm" onClick={clearCategoryFilter}>Clear</Button>
                      </>
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline">Price <ChevronDown className="ml-2 h-4 w-4" /></Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="p-4 w-64">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Price Range</Label>
                      <span className="text-sm font-medium">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                    </div>
                    <Slider defaultValue={priceRange} max={2000} step={50} onValueChange={(value) => setPriceRange(value as [number, number])} />
                  </div>
                </DropdownMenuContent>
              </DropdownMenu>
              {subCategories.length > 0 && (
                <div className="hidden lg:flex items-center gap-2">
                  {subCategories.map(sc => (
                    <Link key={sc} href={`/category/${currentCategorySlug}?sub_category=${sc}`} scroll={false}>
                      <Badge variant={subCategoryQuery === sc ? 'default' : 'secondary'} className="cursor-pointer">
                        {sc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                      </Badge>
                    </Link>
                  ))}
                  {subCategoryQuery && (
                    <Link href={`/category/${currentCategorySlug}`} scroll={false}>
                      <Badge variant="outline" className="cursor-pointer">Clear</Badge>
                    </Link>
                  )}
                </div>
              )}
              <div className="hidden lg:flex items-center space-x-2 pl-2">
                <Checkbox id="in-stock-bar" checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(Boolean(checked))} />
                <Label htmlFor="in-stock-bar">In Stock</Label>
              </div>
            </div>
            <div className="lg:hidden">{AllFiltersSheet}</div>
          </div>
          <div className="flex items-center gap-2 ml-auto">
            <Label htmlFor="sort-by" className="hidden sm:block">Sort by</Label>
            <Select value={sortOption} onValueChange={setSortOption}>
              <SelectTrigger className="w-auto md:w-[180px]" id="sort-by">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-asc">Price: Low to High</SelectItem>
                <SelectItem value="price-desc">Price: High to Low</SelectItem>
                <SelectItem value="title-asc">Alphabetically, A-Z</SelectItem>
                <SelectItem value="title-desc">Alphabetically, Z-A</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CategoryClient({ slug }: { slug: string }) {
  const searchParams = useSearchParams();
  const subCategoryQuery = searchParams.get('sub_category');
  const isAllCategoryPage = slug === 'all';

  const [sortOption, setSortOption] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    !isAllCategoryPage && slug ? [slug] : []
  );
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories(prev =>
      prev.includes(categorySlug) ? prev.filter(s => s !== categorySlug) : [...prev, categorySlug]
    );
  };
  const clearCategoryFilter = () => setSelectedCategories([]);

  const category = useMemo(() => {
    if (isAllCategoryPage) return { name: 'All Products', slug: 'all', id: 'all', imageId: '' };
    return categories.find(c => c.slug === slug);
  }, [slug, isAllCategoryPage]);

  const subCategories = useMemo(() => {
    if (isAllCategoryPage) return [];
    const subs = allProducts.filter(p => p.category === slug && p.sub_category).map(p => p.sub_category!);
    return [...new Set(subs)];
  }, [slug, isAllCategoryPage]);

  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => {
        if (isAllCategoryPage) {
          if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) return false;
        } else {
          if (p.category !== slug) return false;
          if (subCategoryQuery && p.sub_category !== subCategoryQuery) return false;
        }
        return true;
      })
      .filter(p => !inStockOnly || p.stock_status === 'instock')
      .filter(p => {
        const price = p.sale_price ?? p.price;
        return price >= priceRange[0] && price <= priceRange[1];
      });
  }, [slug, subCategoryQuery, inStockOnly, priceRange, selectedCategories, isAllCategoryPage]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const priceA = a.sale_price ?? a.price;
      const priceB = b.sale_price ?? b.price;
      switch (sortOption) {
        case 'price-asc': return priceA - priceB;
        case 'price-desc': return priceB - priceA;
        case 'title-asc': return a.title.localeCompare(b.title);
        case 'title-desc': return b.title.localeCompare(a.title);
        default: return 0;
      }
    });
  }, [filteredProducts, sortOption]);

  // Reset visible count when filters/sort changes
  useEffect(() => {
    setVisibleCount(PAGE_SIZE);
  }, [sortedProducts.length, sortOption]);

  const visibleProducts = sortedProducts.slice(0, visibleCount);
  const hasMore = visibleCount < sortedProducts.length;

  const formatSlug = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());

  const seo = categorySEO[slug];
  const relatedCategories = seo?.relatedSlugs
    .map(s => categories.find(c => c.slug === s))
    .filter(Boolean) as Category[];

  // ── SEO Content Block ─────────────────────────────────
  const SEOContentBlock = () => {
    if (!seo || isAllCategoryPage) return null;
    const name = category?.name ?? formatSlug(slug);
    return (
      <section style={{ margin: '2px 0' }}>
        <details className="px-3 py-1.5 md:px-5 md:py-4" style={{ background: '#FAF7F2', borderRadius: 12, border: '1px solid #EDE8E0' }}>
          <summary
            className="text-[0.72rem] md:text-[1rem]"
            style={{
              fontFamily: 'var(--font-fraunces)',
              fontWeight: 700,
              color: '#1A2A1E',
              cursor: 'pointer',
              listStyle: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <span className="md:flex-1 md:text-center">{seo.visibleHeadline ?? `About Our ${name}`}</span>
            <ChevronDown size={16} color="#2E8A57" />
          </summary>
          <div style={{ marginTop: 14 }}>
            {seo.description.split('\n\n').map((para, i) => (
              <p key={i} style={{
                fontFamily: 'var(--font-barlow)',
                fontSize: '0.88rem',
                color: '#4A4540',
                lineHeight: 1.75,
                marginBottom: i < seo.description.split('\n\n').length - 1 ? 12 : 0,
              }}>
                {para}
              </p>
            ))}
          </div>
        </details>
      </section>
    );
  };

  // ── FAQ Block ─────────────────────────────────────────
  const FAQBlock = () => {
    if (!seo) return null;
    return (
      <section style={{ marginTop: 48, marginBottom: 32 }}>
        <h2 style={{
          fontFamily: 'var(--font-fraunces)',
          fontSize: '1.4rem',
          fontWeight: 700,
          color: '#1A2A1E',
          marginBottom: 16,
        }}>
          Frequently Asked Questions
        </h2>
        <div>
          {seo.faqs.map((faq, i) => (
            <details key={i} style={{
              borderBottom: '1px solid #EDE8E0',
            }}>
              <summary style={{
                fontFamily: 'var(--font-barlow)',
                fontSize: '0.95rem',
                fontWeight: 600,
                color: '#1A2A1E',
                cursor: 'pointer',
                listStyle: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 12,
                padding: '14px 0',
              }}>
                <span>{faq.q}</span>
                <ChevronDown size={15} color="#2E8A57" style={{ flexShrink: 0 }} />
              </summary>
              <p style={{
                fontFamily: 'var(--font-barlow)',
                fontSize: '0.875rem',
                color: '#7A7065',
                lineHeight: 1.7,
                padding: '0 0 12px',
                margin: 0,
              }}>
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>
    );
  };

  // ── Related Categories ────────────────────────────────
  const RelatedCategoriesStrip = () => {
    const links = seo?.relatedLinks
      ? seo.relatedLinks
      : relatedCategories?.map(cat => ({ label: cat.name, href: `/category/${cat.slug}` }));
    if (!links || links.length === 0) return null;
    return (
      <nav aria-label="Related Categories" style={{ marginTop: 40, marginBottom: 16, padding: '16px 20px', background: '#ffffff', borderRadius: 12, border: '1px solid #EDE8E0' }}>
        <p style={{ fontFamily: 'var(--font-fraunces)', fontSize: '0.85rem', fontWeight: 700, color: '#7A7065', marginBottom: 12, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
          Also explore
        </p>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              style={{
                fontFamily: 'var(--font-barlow)',
                fontSize: '0.875rem',
                fontWeight: 600,
                color: '#2E8A57',
                textDecoration: 'none',
                padding: '6px 14px',
                borderRadius: 99,
                border: '1.5px solid #2E8A57',
                transition: 'background 0.15s',
              }}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </nav>
    );
  };

  // ── Load More Button ──────────────────────────────────
  const LoadMoreButton = () => (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: 32 }}>
      <button
        onClick={() => setVisibleCount(c => c + PAGE_SIZE)}
        style={{
          fontFamily: 'var(--font-barlow)',
          fontSize: '0.9rem',
          fontWeight: 600,
          color: '#2E8A57',
          background: '#ffffff',
          border: '2px solid #2E8A57',
          borderRadius: 10,
          padding: '11px 32px',
          cursor: 'pointer',
          transition: 'background 0.15s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#F4F9F6')}
        onMouseLeave={e => (e.currentTarget.style.background = '#ffffff')}
      >
        Load More ({sortedProducts.length - visibleCount} remaining)
      </button>
    </div>
  );

  // ── Mobile Sub-category Sidebar ───────────────────────
  const MobileSubCategoryNav = () => (
    <aside className="w-20 h-screen overflow-y-auto sticky top-0 bg-secondary/30 border-r py-4">
      <nav className="flex flex-col items-center gap-2">
        <Link href={`/category/${slug}`} scroll={false}
          className={cn("flex flex-col items-center gap-1 p-2 rounded-lg text-center w-full", !subCategoryQuery ? "bg-primary/10" : "")}
        >
          <div className={cn("relative w-12 h-12 rounded-full overflow-hidden border-2", !subCategoryQuery ? "border-primary" : "border-transparent")}>
            {category && PlaceHolderImages.find(p => p.id === category.imageId) ? (
              <Image src={PlaceHolderImages.find(p => p.id === category.imageId)!.imageUrl} alt={category.name} fill className="object-cover" />
            ) : (
              <div className="w-full h-full bg-secondary flex items-center justify-center">
                <span className="text-muted-foreground text-xs p-1">All</span>
              </div>
            )}
          </div>
          <span className={cn("text-xs font-medium leading-tight", !subCategoryQuery ? "text-primary" : "text-foreground")}>All</span>
        </Link>
        {subCategories.map((subCategorySlug) => {
          const firstProduct = allProducts.find(p => p.category === slug && p.sub_category === subCategorySlug);
          const image = PlaceHolderImages.find(p => p.id === firstProduct?.images[0]);
          const isActive = subCategoryQuery === subCategorySlug;
          return (
            <Link href={`/category/${slug}?sub_category=${subCategorySlug}`} key={subCategorySlug} scroll={false}
              className={cn("flex flex-col items-center gap-1 p-2 rounded-lg text-center w-full", isActive ? "bg-primary/10" : "")}
            >
              <div className={cn("relative w-12 h-12 rounded-full overflow-hidden border-2", isActive ? "border-primary" : "border-transparent")}>
                {image ? (
                  <Image src={image.imageUrl} alt={formatSlug(subCategorySlug)} fill className="object-cover" data-ai-hint={image.imageHint} />
                ) : (
                  <div className="w-full h-full bg-secondary flex items-center justify-center">
                    <span className="text-muted-foreground text-xs p-1">No Image</span>
                  </div>
                )}
              </div>
              <span className={cn("text-xs font-medium leading-tight", isActive ? "text-primary" : "text-foreground")}>
                {formatSlug(subCategorySlug)}
              </span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );

  return (
    <div className="bg-background">

      {/* ── Mobile Layout ─────────────────────────────── */}
      <div className="md:hidden">
        {isAllCategoryPage ? (
          <div className="container mx-auto px-4 py-8">
            <section className="mb-12">
              <h2 className="text-3xl font-headline font-bold text-center mb-8">Shop by Category</h2>
              <div className="grid grid-cols-2 gap-4">
                {categories.map((cat) => {
                  const categoryImage = PlaceHolderImages.find(p => p.id === cat.imageId);
                  return (
                    <Link href={`/category/${cat.slug}`} key={cat.id} className="group relative block bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 aspect-[1/1] overflow-hidden">
                      {categoryImage && (
                        <Image src={categoryImage.imageUrl} alt={`${cat.name} — Authentic Mangalorean products`} fill className="object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={categoryImage.imageHint} />
                      )}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
                      <div className="absolute bottom-0 left-0 w-full p-3">
                        <h3 className="font-bold text-xl text-white drop-shadow-md">{cat.name}</h3>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
            <ProductFilterBar {...{ sortOption, setSortOption, inStockOnly, setInStockOnly, priceRange, setPriceRange, selectedCategories, toggleCategory, clearCategoryFilter, isAllCategoryPage, subCategoryQuery, currentCategorySlug: slug, subCategories }} />
            <main>
              {visibleProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {visibleProducts.map((product, idx) => (
                    <ProductCard key={product.sku} product={product} priority={idx < 4} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                </div>
              )}
              {hasMore && <LoadMoreButton />}
            </main>
          </div>
        ) : (
          <>
            <div className="px-4 pt-4">
              <SEOContentBlock />
            </div>
            <div className="flex">
              <MobileSubCategoryNav />
              <main className="flex-1 p-2">
                <ProductFilterBar {...{ sortOption, setSortOption, inStockOnly, setInStockOnly, priceRange, setPriceRange, selectedCategories, toggleCategory, clearCategoryFilter, isAllCategoryPage, subCategoryQuery, currentCategorySlug: slug, subCategories }} />
                <div className="mt-4">
                  {visibleProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {visibleProducts.map((product, idx) => (
                        <ProductCard key={product.sku} product={product} priority={idx < 4} compact />
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-20">
                      <p className="text-lg text-muted-foreground">No products found.</p>
                    </div>
                  )}
                  {hasMore && <LoadMoreButton />}
                </div>
              </main>
            </div>
            <div className="px-4 pb-8">
              <FAQBlock />
              <RelatedCategoriesStrip />
            </div>
          </>
        )}
        {isAllCategoryPage && (
          <div className="px-4 pb-8">
            <FAQBlock />
            <RelatedCategoriesStrip />
          </div>
        )}
      </div>

      {/* ── Desktop Layout ─────────────────────────────── */}
      <div className="hidden md:block container mx-auto px-4 py-8">
        {isAllCategoryPage && (
          <section className="mb-12">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">Shop by Category</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((cat) => {
                const categoryImage = PlaceHolderImages.find(p => p.id === cat.imageId);
                return (
                  <Link href={`/category/${cat.slug}`} key={cat.id} className="group relative block bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 aspect-[1/1] overflow-hidden">
                    {categoryImage && (
                      <Image src={categoryImage.imageUrl} alt={`${cat.name} — Authentic Mangalorean products`} fill className="object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={categoryImage.imageHint} />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-full p-3 md:p-4">
                      <h3 className="font-bold text-xl md:text-2xl text-white drop-shadow-md">{cat.name}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <SEOContentBlock />

        {!isAllCategoryPage && subCategories.length > 0 && !subCategoryQuery && (
          <section className="mb-8">
            <div style={{ display: 'grid', gridTemplateColumns: `repeat(${subCategories.length}, 1fr)`, gap: 16 }}>
              {subCategories.map((subCategorySlug) => {
                const firstProduct = allProducts.find(p => p.category === slug && p.sub_category === subCategorySlug);
                const image = PlaceHolderImages.find(p => p.id === firstProduct?.images[0]);
                return (
                  <Link href={`/category/${slug}?sub_category=${subCategorySlug}`} key={subCategorySlug} scroll={false}
                    className="group relative block bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 aspect-[1/1] overflow-hidden">
                    {image ? (
                      <Image src={image.imageUrl} alt={`${formatSlug(subCategorySlug)} — ${category?.name ?? ''} from Karavali Mangalore Store`} fill className="object-cover transition-transform duration-300 group-hover:scale-110" data-ai-hint={image.imageHint} />
                    ) : (
                      <div className="w-full h-full bg-secondary" />
                    )}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
                    <div className="absolute bottom-0 left-0 w-full p-3 md:p-4">
                      <h3 className="font-bold text-xl md:text-2xl text-white drop-shadow-md">{formatSlug(subCategorySlug)}</h3>
                    </div>
                  </Link>
                );
              })}
            </div>
          </section>
        )}

        <ProductFilterBar {...{ sortOption, setSortOption, inStockOnly, setInStockOnly, priceRange, setPriceRange, selectedCategories, toggleCategory, clearCategoryFilter, isAllCategoryPage, subCategoryQuery, currentCategorySlug: slug, subCategories }} />

        <main>
          {visibleProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {visibleProducts.map((product, idx) => (
                <ProductCard key={product.sku} product={product} priority={idx < 5} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
          {hasMore && <LoadMoreButton />}
        </main>

        <FAQBlock />
        <RelatedCategoriesStrip />
      </div>
    </div>
  );
}
