"use client";

import { useState, useMemo } from 'react';
import { useParams, useSearchParams } from 'next/navigation';
import { products as allProducts } from '@/lib/products';
import { categories } from '@/lib/categories';
import ProductCard from '@/components/ProductCard';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import type { Product } from '@/types';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

export default function CategoryPage() {
  const params = useParams();
  const searchParams = useSearchParams();
  const slug = params.slug as string;
  const subCategoryQuery = searchParams.get('sub_category');

  const [sortOption, setSortOption] = useState('featured');
  const [inStockOnly, setInStockOnly] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 2000]);

  const category = categories.find(c => c.slug === slug) || { name: 'All Products', slug: 'all' };

  const subCategories = useMemo(() => {
    if (slug === 'all') return [];
    const productSubCategories = allProducts
      .filter(p => p.category === slug && p.sub_category)
      .map(p => p.sub_category!);
    return [...new Set(productSubCategories)];
  }, [slug]);

  const filteredProducts = allProducts
    .filter(p => slug === 'all' || p.category === slug)
    .filter(p => !subCategoryQuery || p.sub_category === subCategoryQuery)
    .filter(p => !inStockOnly || p.stock_status === 'instock')
    .filter(p => {
      const price = p.sale_price ?? p.price;
      return price >= priceRange[0] && price <= priceRange[1];
    });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    const priceA = a.sale_price ?? a.price;
    const priceB = b.sale_price ?? b.price;
    switch (sortOption) {
      case 'price-asc':
        return priceA - priceB;
      case 'price-desc':
        return priceB - priceA;
      case 'title-asc':
        return a.title.localeCompare(b.title);
      case 'title-desc':
        return b.title.localeCompare(a.title);
      default:
        return 0; // 'featured'
    }
  });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-headline font-bold">{subCategoryQuery ? allProducts.find(p=>p.sub_category === subCategoryQuery)?.sub_category?.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()) : category.name}</h1>
      </div>
      <div className="grid md:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="md:col-span-1">
          <Card>
            <CardHeader>
              <CardTitle>Filters</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label>Sort by</Label>
                <Select value={sortOption} onValueChange={setSortOption}>
                  <SelectTrigger>
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

              {subCategories.length > 0 && (
                <div className="space-y-2">
                  <Label>Sub-categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {subCategories.map(sc => (
                      <Link key={sc} href={`/category/${slug}?sub_category=${sc}`}>
                        <Badge
                          variant={subCategoryQuery === sc ? 'default' : 'secondary'}
                          className="cursor-pointer"
                        >
                          {sc.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                        </Badge>
                      </Link>
                    ))}
                     {subCategoryQuery && <Link href={`/category/${slug}`}><Badge variant="outline" className="cursor-pointer">Clear</Badge></Link>}
                  </div>
                </div>
              )}


              <div className="flex items-center space-x-2">
                <Checkbox id="in-stock" checked={inStockOnly} onCheckedChange={(checked) => setInStockOnly(Boolean(checked))} />
                <Label htmlFor="in-stock">In stock only</Label>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <Label>Price Range</Label>
                  <span className="text-sm font-medium">₹{priceRange[0]} - ₹{priceRange[1]}</span>
                </div>
                <Slider
                  defaultValue={[0, 2000]}
                  max={2000}
                  step={50}
                  onValueChange={(value) => setPriceRange(value)}
                />
              </div>
            </CardContent>
          </Card>
        </aside>

        {/* Products Grid */}
        <main className="md:col-span-3">
          {sortedProducts.length > 0 ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
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
