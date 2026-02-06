
"use client";

import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { products as allProducts } from '@/lib/products';
import { categories } from '@/lib/categories';
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
    sortOption,
    setSortOption,
    inStockOnly,
    setInStockOnly,
    priceRange,
    setPriceRange,
    selectedCategories,
    toggleCategory,
    clearCategoryFilter,
    isAllCategoryPage,
    subCategoryQuery,
    currentCategorySlug,
    subCategories
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
                                <Badge
                                  variant={subCategoryQuery === sc ? 'default' : 'secondary'}
                                  className="cursor-pointer"
                                >
                                  {sc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                </Badge>
                              </Link>
                            ))}
                             {subCategoryQuery && <Link href={`/category/${currentCategorySlug}`} scroll={false}><Badge variant="outline" className="cursor-pointer">Clear</Badge></Link>}
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
                        <Slider
                            defaultValue={priceRange}
                            max={2000}
                            step={50}
                            onValueChange={(value) => setPriceRange(value as [number, number])}
                        />
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
                                        {selectedCategories.length > 0 && <>
                                            <DropdownMenuSeparator />
                                            <Button variant="ghost" className="w-full justify-center" size="sm" onClick={clearCategoryFilter}>Clear</Button>
                                        </>}
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
                                        <Slider
                                            defaultValue={priceRange}
                                            max={2000}
                                            step={50}
                                            onValueChange={(value) => setPriceRange(value as [number, number])}
                                        />
                                    </div>
                                </DropdownMenuContent>
                            </DropdownMenu>
                             {subCategories.length > 0 && (
                                <div className="hidden lg:flex items-center gap-2">
                                  {subCategories.map(sc => (
                                    <Link key={sc} href={`/category/${currentCategorySlug}?sub_category=${sc}`} scroll={false}>
                                      <Badge
                                        variant={subCategoryQuery === sc ? 'default' : 'secondary'}
                                        className="cursor-pointer"
                                      >
                                        {sc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                                      </Badge>
                                    </Link>
                                  ))}
                                   {subCategoryQuery && <Link href={`/category/${currentCategorySlug}`} scroll={false}><Badge variant="outline" className="cursor-pointer">Clear</Badge></Link>}
                                </div>
                              )}
                            <div className="hidden lg:flex items-center space-x-2 pl-2">
                                <Checkbox id="in-stock-bar" checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(Boolean(checked))} />
                                <Label htmlFor="in-stock-bar">In Stock</Label>
                            </div>
                        </div>
                        
                        <div className="lg:hidden">
                            {AllFiltersSheet}
                        </div>
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

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const subCategoryQuery = searchParams.get('sub_category');
  const isAllCategoryPage = slug === 'all';

  const [sortOption, setSortOption] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 2000]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
      !isAllCategoryPage && slug ? [slug] : []
  );

  const toggleCategory = (categorySlug: string) => {
    setSelectedCategories(prev =>
        prev.includes(categorySlug)
            ? prev.filter(s => s !== categorySlug)
            : [...prev, categorySlug]
    );
  };
  
  const clearCategoryFilter = () => setSelectedCategories([]);
  
  const category = useMemo(() => {
    if (isAllCategoryPage) return { name: 'All Products', slug: 'all', id: 'all', imageId: '' };
    return categories.find(c => c.slug === slug)
  }, [slug, isAllCategoryPage]);

  const subCategories = useMemo(() => {
    if (isAllCategoryPage) return [];
    const productSubCategories = allProducts
      .filter(p => p.category === slug && p.sub_category)
      .map(p => p.sub_category!);
    return [...new Set(productSubCategories)];
  }, [slug, isAllCategoryPage]);


  const filteredProducts = useMemo(() => {
    return allProducts
      .filter(p => {
        if (isAllCategoryPage) {
          // Logic for /category/all page
          if (selectedCategories.length > 0 && !selectedCategories.includes(p.category)) {
            return false;
          }
        } else {
          // Logic for specific category pages like /category/grocery
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
  
  const formatSlug = (s: string) => s.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  
  const pageTitle = useMemo(() => {
    if (subCategoryQuery) return formatSlug(subCategoryQuery);
    if (category) return category.name;
    return 'Products'
  }, [category, subCategoryQuery]);

  const MobileSubCategoryNav = () => (
    <aside className="w-1/4 h-screen overflow-y-auto sticky top-0 bg-secondary/30 border-r py-4">
        <nav className="flex flex-col items-center gap-2">
            <Link href={`/category/${slug}`} scroll={false}
                className={cn(
                    "flex flex-col items-center gap-1 p-2 rounded-lg text-center w-full",
                    !subCategoryQuery ? "bg-primary/10" : ""
                )}
            >
                <div className={cn(
                    "relative w-14 h-14 rounded-full overflow-hidden border-2",
                    !subCategoryQuery ? "border-primary" : "border-transparent"
                )}>
                    {category && PlaceHolderImages.find(p => p.id === category.imageId) ? (
                        <Image
                            src={PlaceHolderImages.find(p => p.id === category.imageId)!.imageUrl}
                            alt={category.name}
                            fill
                            className="object-cover"
                        />
                    ) : (
                         <div className="w-full h-full bg-secondary flex items-center justify-center">
                            <span className="text-muted-foreground text-xs p-1">All</span>
                        </div>
                    )}
                </div>
                 <span className={cn("text-xs font-medium leading-tight", !subCategoryQuery ? "text-primary" : "text-foreground")}>
                    All
                </span>
            </Link>

            {subCategories.map((subCategorySlug) => {
                const firstProduct = allProducts.find(p => p.category === slug && p.sub_category === subCategorySlug);
                const image = PlaceHolderImages.find(p => p.id === firstProduct?.images[0]);
                const isActive = subCategoryQuery === subCategorySlug;
                return (
                    <Link href={`/category/${slug}?sub_category=${subCategorySlug}`} key={subCategorySlug} scroll={false}
                        className={cn(
                            "flex flex-col items-center gap-1 p-2 rounded-lg text-center w-full",
                            isActive ? "bg-primary/10" : ""
                        )}
                    >
                        <div className={cn(
                            "relative w-14 h-14 rounded-full overflow-hidden border-2",
                            isActive ? "border-primary" : "border-transparent"
                        )}>
                            {image ? (
                                <Image
                                    src={image.imageUrl}
                                    alt={formatSlug(subCategorySlug)}
                                    fill
                                    className="object-cover"
                                    data-ai-hint={image.imageHint}
                                />
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

      {/* Mobile Layout */}
      <div className="md:hidden">
        {isAllCategoryPage ? (
          <div className="container mx-auto px-4 py-8">
            <section className="mb-12">
              <h2 className="text-3xl font-headline font-bold text-center mb-8">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
              {categories.map((category) => {
                  const categoryImage = PlaceHolderImages.find(p => p.id === category.imageId);
                  return (
                      <Link href={`/category/${category.slug}`} key={category.id} className="group flex flex-col bg-card rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl text-center">
                          <div className="relative w-full aspect-square">
                              {categoryImage && (
                              <Image
                                  src={categoryImage.imageUrl}
                                  alt={category.name}
                                  fill
                                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                                  data-ai-hint={categoryImage.imageHint}
                              />
                              )}
                          </div>
                          <div className="p-3 flex-grow flex items-center justify-center">
                              <h3 className="font-semibold text-base">{category.name}</h3>
                          </div>
                      </Link>
                  )
              })}
              </div>
            </section>
            <div className="text-center mb-8">
              <h1 className="text-4xl font-headline font-bold">{pageTitle}</h1>
            </div>
            <ProductFilterBar {...{ sortOption, setSortOption, inStockOnly, setInStockOnly, priceRange, setPriceRange, selectedCategories, toggleCategory, clearCategoryFilter, isAllCategoryPage, subCategoryQuery, currentCategorySlug: slug, subCategories }} />
            <main>
              {sortedProducts.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 md:gap-6">
                  {sortedProducts.map((product) => (
                    <ProductCard key={product.sku} product={product} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-20">
                  <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
                </div>
              )}
            </main>
          </div>
        ) : (
          <div className="flex">
            <MobileSubCategoryNav />
            <main className="w-3/4 flex-1 p-4">
              <ProductFilterBar {...{ sortOption, setSortOption, inStockOnly, setInStockOnly, priceRange, setPriceRange, selectedCategories, toggleCategory, clearCategoryFilter, isAllCategoryPage, subCategoryQuery, currentCategorySlug: slug, subCategories }} />
              <div className="mt-4">
                {sortedProducts.length > 0 ? (
                    <div className="grid grid-cols-2 gap-4">
                        {sortedProducts.map((product) => (
                            <ProductCard key={product.sku} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20">
                        <p className="text-lg text-muted-foreground">No products found.</p>
                    </div>
                )}
              </div>
            </main>
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden md:block container mx-auto px-4 py-8">
        {isAllCategoryPage && (
            <section className="mb-12">
                <h2 className="text-3xl font-headline font-bold text-center mb-8">Shop by Category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                {categories.map((category) => {
                    const categoryImage = PlaceHolderImages.find(p => p.id === category.imageId);
                    return (
                        <Link href={`/category/${category.slug}`} key={category.id} className="group flex flex-col bg-card rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl text-center">
                            <div className="relative w-full aspect-square">
                                {categoryImage && (
                                <Image
                                    src={categoryImage.imageUrl}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    data-ai-hint={categoryImage.imageHint}
                                />
                                )}
                            </div>
                            <div className="p-3 flex-grow flex items-center justify-center">
                                <h3 className="font-semibold text-base">{category.name}</h3>
                            </div>
                        </Link>
                    )
                })}
                </div>
            </section>
        )}
      
        <div className="text-center mb-8">
          <h1 className="text-4xl font-headline font-bold">{pageTitle}</h1>
        </div>
        
        {!isAllCategoryPage && subCategories.length > 0 && !subCategoryQuery && (
            <section className="mb-12">
                <h2 className="text-3xl font-headline font-bold text-center mb-8">Shop by Sub-category</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
                    {subCategories.map((subCategorySlug) => {
                        const firstProduct = allProducts.find(p => p.category === slug && p.sub_category === subCategorySlug);
                        const image = PlaceHolderImages.find(p => p.id === firstProduct?.images[0]);
                        
                        return (
                            <Link href={`/category/${slug}?sub_category=${subCategorySlug}`} key={subCategorySlug} scroll={false} className="group flex flex-col bg-card rounded-3xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl text-center">
                                <div className="relative w-full aspect-square">
                                    {image ? (
                                        <Image
                                            src={image.imageUrl}
                                            alt={formatSlug(subCategorySlug)}
                                            fill
                                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                                            data-ai-hint={image.imageHint}
                                        />
                                    ) : (
                                      <div className="w-full h-full bg-secondary flex items-center justify-center">
                                        <span className="text-muted-foreground text-sm p-2">No Image</span>
                                      </div>
                                    )}
                                </div>
                                <div className="p-3 flex-grow flex items-center justify-center">
                                    <h3 className="font-semibold text-base">{formatSlug(subCategorySlug)}</h3>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </section>
        )}

       <ProductFilterBar {...{ sortOption, setSortOption, inStockOnly, setInStockOnly, priceRange, setPriceRange, selectedCategories, toggleCategory, clearCategoryFilter, isAllCategoryPage, subCategoryQuery, currentCategorySlug: slug, subCategories }} />

        <main>
          {sortedProducts.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
              {sortedProducts.map((product) => (
                <ProductCard key={product.sku} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <p className="text-lg text-muted-foreground">No products found matching your criteria.</p>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
