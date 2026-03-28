

'use client';

import { useState, useMemo, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Leaf, Users, ShieldCheck, Truck, Package, CreditCard, MapPin, Clock, PhoneCall, CheckCircle, ArrowRight, Quote } from "lucide-react";
import { products } from "@/lib/products";
import { categories } from "@/lib/categories";
import ProductCard from "@/components/ProductCard";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import ReviewCarousel from "@/components/ReviewCarousel";
import { cn } from "@/lib/utils";

const heroImage = PlaceHolderImages.find(p => p.id === 'hero');
const heroMobileImage = PlaceHolderImages.find(p => p.id === 'hero-mobile');

export default function Home() {
  const [activeFilter, setActiveFilter] = useState('All');
  const filters = ['All', 'Snacks', 'Sweets', 'Grocery', 'Instant'];

  const featuredProducts = useMemo(() => {
    if (activeFilter === 'All') {
      return products.slice(0, 8);
    }
    const categorySlug = activeFilter.toLowerCase();
    return products.filter(p => p.category === categorySlug).slice(0, 8);
  }, [activeFilter]);

  const trustBadges = [
    { icon: ShieldCheck, text: "Authentic Products", description: "Sourced directly from local artisans" },
    { icon: Truck, text: "Fast Delivery", description: "Swift and reliable shipping" },
    { icon: Package, text: "Secure Packaging", description: "Ensuring your items arrive safely" },
    { icon: CreditCard, text: "Safe Payments", description: "Secure and encrypted transactions" },
  ];

  const whyChooseUsBadges = [
    { icon: Smile, title: "Authentic Coastal Flavors", description: "Crafted from traditional recipes to deliver the original, beloved taste of home." },
    { icon: Leaf, title: "Fresh & High Quality", description: "Every product is carefully selected to meet our standards of quality and freshness." },
    { icon: Users, title: "Trusted Since 2007", description: "For nearly two decades, we've been the trusted choice for our community's daily needs." },
    { icon: ShieldCheck, title: "Satisfaction Guaranteed", description: "We stand by our quality. If you're not happy, we'll make it right." },
  ];

  const aboutShopImage = PlaceHolderImages.find(p => p.id === 'about-shop');
  const aboutUsFarmBgImage = PlaceHolderImages.find(p => p.id === 'about-us-farm-bg');
  const ctaSnacksImage = PlaceHolderImages.find(p => p.id === 'cta-snacks');

  const WhatsAppIcon = () => (
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.383 1.905 6.195l-1.256 4.595 4.672-1.225z" />
    </svg>
  );

  const whatsappUrl = "https://wa.me/919611573008";

  return (
    <div className="space-y-12 md:space-y-20">
      {/* Hero Section */}
      <section className="relative w-full text-center text-white overflow-hidden md:block bg-black">
        {/* Desktop Rendering (Artwork Full-Width Banner) */}
        <div className="hidden md:block relative w-full h-auto">
          {heroImage && (
            <img
              src={heroImage.imageUrl}
              alt={heroImage.description}
              className="w-full h-auto block"
            />
          )}



          {/* Desktop Overlay Content - Centered on the image space */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-full max-w-7xl px-12 text-center animate-in fade-in zoom-in-95 duration-1000">
              <h1 className="text-4xl lg:text-5xl xl:text-6xl font-headline font-bold leading-[1.2] tracking-tight text-shadow-xl mb-8">
                Bringing the True Taste of <br className="hidden lg:block" /> Coastal Karnataka to Your Home
              </h1>

              <div className="space-y-10">
                <p className="text-xl lg:text-2xl font-light tracking-wide text-white/90 text-shadow-md max-w-2xl mx-auto leading-relaxed">
                  Authentic Karavali & Malnad heritage foods rooted in tradition and crafted with care.
                </p>

                <div className="pt-4">
                  <Button asChild size="lg" className="h-16 px-12 text-xl font-bold rounded-xl bg-primary hover:bg-primary/85 text-primary-foreground border-none shadow-lg transition-all duration-500 hover:scale-110 active:scale-95 font-ui tracking-widest uppercase">
                    <Link href="/category/all">Shop Now</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Image — renders at natural aspect ratio, never cropped */}
        {heroMobileImage && (
          <img
            src={heroMobileImage.imageUrl}
            alt={heroMobileImage.description}
            className="md:hidden w-full h-auto block mt-10"
            data-ai-hint={heroMobileImage.imageHint}
          />
        )}

        {/* Mobile gradient overlay */}
        <div className="md:hidden absolute inset-0 bg-gradient-to-b from-black/25 via-transparent to-black/35 pointer-events-none" />

        {/* Desktop gradient overlay */}
        <div className="hidden md:block absolute inset-0 bg-gradient-to-b from-black/10 via-transparent to-black/20 pointer-events-none" />

        {/* Mobile text overlay — percentage-positioned relative to image height */}
        <div
          className="md:hidden absolute inset-0 flex flex-col items-center px-6"
          style={{ paddingTop: '5%', paddingBottom: '34%' }}
        >
          {/* Headline — sits in upper dark zone */}
          <h1
            className="mt-0 font-headline font-bold tracking-tight text-shadow-xl leading-[1.25] animate-in fade-in slide-in-from-top-4 duration-1000"
            style={{ fontSize: 'clamp(1.9rem, 9vw, 2.3rem)', wordSpacing: '0.05em' }}
          >
            Bringing the True<br />Taste of Coastal<br />Karnataka to <br />Your Home
          </h1>

          {/* Flex spacer — pushes CTA group to ~68% of image height */}
          <div className="flex-1" />

          {/* Subtext + CTA group */}
          <div className="w-full max-w-xs flex flex-col items-center gap-5 animate-in fade-in zoom-in-95 duration-1000 delay-500">
            <div className="relative group">
              <div className="absolute inset-0 bg-black/20 blur-2xl rounded-full scale-150 transform -z-10" />
              <p
                className="font-light tracking-wide text-white text-shadow-md leading-relaxed px-4 py-2 text-center"
                style={{ fontSize: 'clamp(1rem, 4.5vw, 1.125rem)' }}
              >
                Authentic Karavali &amp; Malnad heritage foods rooted in tradition and crafted with care.
              </p>
            </div>
            <Button asChild size="lg" className="transform -translate-y-4 h-12 px-8 text-lg font-semibold rounded-2xl bg-primary hover:bg-primary/85 text-primary-foreground border-none shadow-lg transition-all duration-500 hover:scale-110 active:scale-95 font-ui tracking-widest uppercase">
              <Link href="/category/all">Shop Now</Link>
            </Button>
          </div>
        </div>

      </section>

      {/* Trust Badges Section */}
      <section className="container mx-auto px-4">
        <div className="grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-4 lg:gap-8">
          {trustBadges.map((badge, index) => (
            <div key={index} className="group rounded-3xl p-4 text-center shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl md:p-6" style={{ backgroundColor: '#FFFFFF' }}>
              <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-accent/10 shadow-lg transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
                <badge.icon className="h-6 w-6 text-accent sm:h-10 sm:w-10" />
              </div>
              <h3 className="text-xs font-bold text-foreground sm:text-lg md:text-xl whitespace-nowrap">{badge.text}</h3>
              <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{badge.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Category Showcase */}
      <section className="container mx-auto px-4">
        <h2 className="text-3xl font-headline font-bold text-center md:text-left mb-8">Explore Our Range</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
          {categories.slice(0, 5).map((category) => {
            const categoryImage = PlaceHolderImages.find(p => p.id === category.imageId);
            return (
              <Link href={`/category/${category.slug}`} key={category.id} className="group relative block bg-card rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 aspect-[1/1] overflow-hidden">
                {categoryImage && (
                  <Image
                    src={categoryImage.imageUrl}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                    data-ai-hint={categoryImage.imageHint}
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent group-hover:from-black/70 transition-colors" />
                <div className="absolute bottom-0 left-0 w-full p-3 md:p-4">
                  <h3 className="font-bold text-xl md:text-2xl text-white drop-shadow-md">{category.name}</h3>
                </div>
              </Link>
            )
          })}
          <Link href="/category/all" className="group flex flex-col items-center justify-center bg-accent/10 dark:bg-accent/20 p-3 md:p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center aspect-[1/1]">
            <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-white dark:bg-slate-800 rounded-full mb-2 shadow-md transition-transform duration-300 group-hover:scale-110">
              <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-accent" />
            </div>
            <span className="font-headline font-bold text-xl md:text-2xl text-accent">See all</span>
          </Link>
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <h2 className="text-3xl font-headline font-bold text-center md:text-left">Handpicked for You</h2>
          <div className="flex flex-nowrap items-center justify-start gap-2 overflow-x-auto pb-2 md:flex-wrap md:justify-end md:overflow-x-visible md:pb-0">
            {filters.map((filter) => (
              <Button
                key={filter}
                variant={activeFilter === filter ? 'default' : 'outline'}
                size="sm"
                className="rounded-full px-4"
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </Button>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {featuredProducts.map((product) => (
            <ProductCard key={product.sku} product={product} />
          ))}
        </div>
        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-primary hover:bg-primary/90">
            <Link href="/category/all#all-products">View All Products</Link>
          </Button>
        </div>
      </section>

      {/* This section now uses the default background, allowing the pattern to show through. */}
      <section>
        <div className="container mx-auto px-4 py-12 md:py-20 space-y-12 md:space-y-20">

          {/* About Us Teaser Section */}
          <div className="bg-background rounded-3xl p-8 md:p-12 shadow-lg overflow-hidden relative">
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
                <div className="mt-4 max-w-xl mx-auto md:mx-0 space-y-4" style={{ color: '#57534E' }}>
                  <p>
                    Established in 2007, Mangalore Store has been a trusted family-run shop in Bengaluru, founded and managed by our father and mother. Built on values of quality, authenticity, and customer trust, the store has grown into a reliable destination for genuine Karavali and Malnad products.
                  </p>
                  <p>
                    Karavali Mangalore Store carries forward this legacy — blending tradition with modern convenience to serve customers across Bengaluru and India.
                  </p>
                </div>
                <Button asChild size="lg" className="mt-8 rounded-lg shadow-md hover:shadow-lg transition-transform duration-200 hover:scale-[1.02]">
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
          <div>
            <h2 className="text-3xl font-headline font-bold text-center md:text-left mb-10">Why Choose Karavali Mangalore Store?</h2>
            <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
              {whyChooseUsBadges.map((badge, index) => (
                <div key={index} className="group text-center p-4 md:p-6 rounded-3xl shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl" style={{ backgroundColor: '#FFFFFF' }}>
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 shadow-lg transition-transform group-hover:scale-105 sm:h-20 sm:w-20">
                    <badge.icon className="h-6 w-6 text-primary sm:h-10 sm:w-10" />
                  </div>
                  <h3 className="font-bold text-sm sm:text-lg md:text-xl text-foreground">{badge.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{badge.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews Section */}
          <div>
            <h2 className="text-3xl font-headline font-bold text-center md:text-left mb-10">What Our<br className="md:hidden" /> Customers Say</h2>
            <ReviewCarousel />
          </div>

          {/* Final CTA Section */}
          <div className="bg-background rounded-3xl shadow-lg overflow-hidden relative">
            {aboutUsFarmBgImage && (
              <Image
                src={aboutUsFarmBgImage.imageUrl}
                alt={aboutUsFarmBgImage.description}
                fill
                className="object-cover opacity-10 dark:opacity-20"
                data-ai-hint={aboutUsFarmBgImage.imageHint}
              />
            )}
            <div className="relative z-10">
              <div className="px-3 pt-8 pb-5 sm:p-8 md:p-10">
                <div className="flex justify-center items-center gap-4 mb-8">
                  <h2 className="text-3xl font-headline font-bold text-foreground text-center md:text-left">Fast &amp; Reliable<br className="sm:hidden" />{' '}Delivery</h2>
                </div>
                <div className="grid grid-cols-3 gap-2 sm:gap-6 text-center my-5" style={{ color: '#57534E' }}>
                  <div className="flex flex-col items-center gap-2">
                    <MapPin className="w-6 h-6 text-accent" />
                    <p className="font-semibold text-xs sm:text-base">Delivering in Bengaluru<br />&amp; Across India</p>
                  </div>
                  <div className="flex flex-col items-center gap-2 sm:border-x sm:border-dashed sm:border-accent/50 px-4">
                    <Clock className="w-6 h-6 text-accent" />
                    <p className="font-semibold text-xs sm:text-base">Orders Dispatched<br />in 24 Hours</p>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <PhoneCall className="w-6 h-6 text-accent" />
                    <p className="font-semibold text-xs sm:text-base">Dedicated Customer Support</p>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dashed border-accent/50"></div>

              <div className="grid md:grid-cols-2 items-center">
                <div className="relative w-full h-64 md:h-full min-h-[300px] order-last md:order-first">
                  {ctaSnacksImage && (
                    <Image src={ctaSnacksImage.imageUrl} alt={ctaSnacksImage.description} fill className="object-cover" data-ai-hint={ctaSnacksImage.imageHint} />
                  )}
                </div>
                <div className="p-8 text-center space-y-5">
                  <h3 className="font-headline text-4xl text-foreground font-bold">Taste<br className="md:hidden" /> Authentic<br className="md:hidden" /> Karavali at<br className="md:hidden" /> Home</h3>
                  <p className="text-xl font-semibold text-[#3A3A3A] dark:text-muted-foreground whitespace-nowrap">Fresh. Authentic. Delivered.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild size="lg" className="rounded-lg text-lg px-8 py-6">
                      <Link href="/category/all">Shop Now</Link>
                    </Button>
                    <Button asChild variant="outline" size="lg" className="rounded-lg text-lg px-8 py-6 border-2 border-[#25D366] bg-white text-[#25D366] hover:bg-[#25D366] hover:text-white transition-colors duration-200">
                      <Link href={whatsappUrl} target="_blank">
                        <WhatsAppIcon /> Chat on WhatsApp
                      </Link>
                    </Button>
                  </div>
                  <div className="space-y-2">
                    <div className="font-bold whitespace-nowrap" style={{ color: '#57534E' }}>
                      ⭐ Trusted by 1000+ families
                    </div>
                    <div className="flex items-center justify-center gap-2 text-accent font-bold">
                      <CheckCircle className="w-5 h-5" />
                      <span className="whitespace-nowrap">100% Satisfaction Guaranteed!</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>
    </div >
  );
}
