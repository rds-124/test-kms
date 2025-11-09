import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, Truck, Package, CreditCard } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  const trustBadges = [
    { icon: ShieldCheck, text: "Authentic Products", description: "Sourced directly from local artisans" },
    { icon: Truck, text: "Fast Delivery", description: "Swift and reliable shipping" },
    { icon: Package, text: "Secure Packaging", description: "Ensuring your items arrive safely" },
    { icon: CreditCard, text: "Safe Payments", description: "Secure and encrypted transactions" },
  ];

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section */}
      <section className="relative h-[60vh] md:h-[70vh] w-full flex items-center justify-center text-center text-white">
        {heroImage && (
          <Image
            src={heroImage.imageUrl}
            alt={heroImage.description}
            fill
            className="object-cover"
            data-ai-hint={heroImage.imageHint}
            priority
          />
        )}
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 max-w-4xl p-8">
          <h1 className="text-4xl md:text-6xl font-headline font-bold text-shadow-lg">
            Experience the Essence of Tulunadu
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Discover authentic spices, traditional crafts, and unique delicacies from the coastal heart of Karnataka.
          </p>
          <Button asChild size="lg" className="mt-8 bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/category/all">Shop All Products</Link>
          </Button>
        </div>
      </section>

      {/* Trust Badges Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          {trustBadges.map((badge, index) => (
            <Card key={index} className="bg-secondary/50 border-none text-center p-4">
              <CardContent className="flex flex-col items-center justify-center gap-2 p-0">
                <badge.icon className="w-10 h-10 text-accent" />
                <h3 className="font-bold text-sm md:text-base">{badge.text}</h3>
                <p className="text-xs text-muted-foreground">{badge.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Category Showcase */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          {categories.slice(0, 8).map((category) => {
            const categoryImage = PlaceHolderImages.find(p => p.id === category.imageId);
            return (
              <Link href={`/category/${category.slug}`} key={category.id} className="group relative overflow-hidden rounded-lg shadow-lg">
                {categoryImage && (
                  <Image
                    src={categoryImage.imageUrl}
                    alt={category.name}
                    width={400}
                    height={400}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    data-ai-hint={categoryImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <h3 className="text-white text-xl md:text-2xl font-bold font-headline p-4 text-center">{category.name}</h3>
                </div>
              </Link>
            )
          })}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-center mb-8">Featured Products</h2>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild variant="outline" size="lg">
            <Link href="/category/all">View All Products</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
