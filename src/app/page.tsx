import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Leaf, Users, ShieldCheck, Truck, Package, CreditCard } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import ReviewCarousel from "@/components/ReviewCarousel";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');

export default function Home() {
  const featuredProducts = products.slice(0, 8);

  const trustBadges = [
    { icon: ShieldCheck, text: "Authentic Products", description: "Sourced directly from local artisans" },
    { icon: Truck, text: "Fast Delivery", description: "Swift and reliable shipping" },
    { icon: Package, text: "Secure Packaging", description: "Ensuring your items arrive safely" },
    { icon: CreditCard, text: "Safe Payments", description: "Secure and encrypted transactions" },
  ];

  const whyChooseUsBadges = [
    { icon: Smile, title: "Authentic Coastal Flavors", description: "Crafted from traditional recipes to deliver the original, beloved taste of home." },
    { icon: Leaf, title: "Fresh & High Quality", description: "We handpick the finest ingredients to ensure every product meets our high standards of freshness." },
    { icon: Users, title: "Loved by Locals", description: "For over a decade, we've been the trusted choice for our community's daily needs." },
    { icon: ShieldCheck, title: "Satisfaction Guaranteed", description: "We stand by our quality. If you're not happy, we'll make it right." },
  ];

  const aboutShopImage = PlaceHolderImages.find(p => p.id === 'about-shop');
  const aboutUsFarmBgImage = PlaceHolderImages.find(p => p.id === 'about-us-farm-bg');


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
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
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

      {/* This new parent section provides a continuous background for the two sections below. */}
      {/* A light secondary color gives a soft, premium feel. */}
      <section className="bg-secondary/30">
        <div className="container mx-auto px-4 py-12 md:py-20 space-y-12 md:space-y-20">

          {/* About Us Teaser Section */}
          {/* This card has a semi-transparent background image to create a textured, premium feel. */}
          <div className="bg-lime-50 dark:bg-lime-950/20 rounded-3xl p-8 md:p-12 shadow-lg overflow-hidden relative">
            {aboutUsFarmBgImage && (
                <Image
                    src={aboutUsFarmBgImage.imageUrl}
                    alt={aboutUsFarmBgImage.description}
                    fill
                    className="object-cover opacity-10 dark:opacity-20"
                    data-ai-hint={aboutUsFarmBgImage.imageHint}
                />
            )}
            <div className="grid md:grid-cols-2 gap-12 items-center relative z-10">
              {/* Text Content */}
              <div className="text-center md:text-left">
                <h2 className="text-3xl md:text-4xl font-headline font-bold">
                  From Our Family to Your Home
                </h2>
                <p className="mt-4 text-muted-foreground max-w-xl mx-auto md:mx-0">
                  Since 2007, our family has been proudly running a small shop in Bangalore, dedicated to bringing you the authentic flavors of coastal Karnataka. What started with our dad's passion for genuine Karavali products has grown into a trusted local favorite, known for its quality and freshness.
                </p>
                <Button asChild size="lg" className="mt-8">
                  <Link href="/about">Read Our Story</Link>
                </Button>
              </div>
              {/* Image Content */}
              {aboutShopImage && (
                  <div className="relative w-full h-64 md:h-80 rounded-2xl overflow-hidden">
                  <Image
                      src={aboutShopImage.imageUrl}
                      alt={aboutShopImage.description}
                      fill
                      className="object-cover"
                      data-ai-hint={aboutShopImage.imageHint}
                  />
                  </div>
              )}
            </div>
          </div>

          {/* Why Choose Us Section */}
          {/* This section now sits within the same container, sharing the background. */}
          <div>
            <h2 className="text-3xl font-headline font-bold text-center mb-10">Why Choose Karavali Store?</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
              {whyChooseUsBadges.map((badge, index) => (
                // These cards have their own background and a stronger shadow to stand out from the new background.
                <Card key={index} className="bg-card text-center p-6 rounded-3xl shadow-lg hover:shadow-xl transition-shadow">
                  <CardContent className="flex flex-col items-center justify-center gap-4 p-0">
                    <div className="bg-primary/10 p-3 rounded-full">
                        <badge.icon className="w-8 h-8 text-primary" />
                    </div>
                    <h3 className="font-bold text-lg">{badge.title}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <h2 className="text-3xl font-headline font-bold text-center mb-10">What Our Customers Say</h2>
            <ReviewCarousel />
          </div>

        </div>
      </section>
    </div>
  );
}
