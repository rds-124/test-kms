import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Smile, Leaf, Users, ShieldCheck, Truck, Package, CreditCard, MapPin, Clock, PhoneCall, CheckCircle, ArrowRight } from "lucide-react";
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
  
  const phoneNumber = '+911234567890';
  const message = "Hello! I want to place an order from Karavali Store.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

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
          <Button asChild size="lg" className="mt-8">
            <Link href="/category/all">Shop now</Link>
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
                  <h3 className="font-bold text-sm md:text-base text-white shadow-sm">{category.name}</h3>
                </div>
              </Link>
            )
          })}
          <Link href="/category/all" className="group flex flex-col items-center justify-center bg-accent/10 dark:bg-accent/20 p-3 md:p-4 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 text-center aspect-[1/1]">
              <div className="flex items-center justify-center h-10 w-10 md:h-12 md:w-12 bg-white dark:bg-slate-800 rounded-full mb-2 shadow-md transition-transform duration-300 group-hover:scale-110">
                  <ArrowRight className="h-5 w-5 md:h-6 md:w-6 text-accent" />
              </div>
              <span className="font-bold text-sm md:text-base text-accent">See all</span>
          </Link>
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
      <section className="bg-secondary">
        <div className="container mx-auto px-4 py-12 md:py-20 space-y-12 md:space-y-20">

          {/* About Us Teaser Section */}
          {/* This card has a semi-transparent background image to create a textured, premium feel. */}
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
            <div className="relative z-10">
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
          </div>

          {/* Customer Reviews Section */}
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
            <div className="relative z-10">
                <h2 className="text-3xl font-headline font-bold text-center mb-10">What Our Customers Say</h2>
                <ReviewCarousel />
            </div>
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
                <div className="p-8 md:p-10">
                    <div className="flex justify-center items-center gap-4 mb-8">
                        <Truck className="w-12 h-12 text-primary" strokeWidth={1.5} />
                        <h2 className="text-3xl font-bold text-primary">Fast & Reliable Delivery</h2>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 text-center text-muted-foreground">
                        <div className="flex flex-col items-center gap-2">
                            <MapPin className="w-8 h-8 text-accent" />
                            <p className="font-semibold">Delivering in Bangalore<br />& Across Karnataka</p>
                        </div>
                        <div className="flex flex-col items-center gap-2 sm:border-x sm:border-dashed sm:border-accent/50 px-4">
                            <Clock className="w-8 h-8 text-accent" />
                            <p className="font-semibold">Orders Dispatched<br />in 24 Hours</p>
                        </div>
                        <div className="flex flex-col items-center gap-2">
                            <PhoneCall className="w-8 h-8 text-accent" />
                            <p className="font-semibold">24/7 Customer Support</p>
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
                        <h3 className="font-headline text-4xl text-primary">Experience the Authentic Taste of the Coast!</h3>
                        <p className="text-xl font-semibold">Order Now & Bring Home the Flavors of Karavali!</p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Button asChild size="lg" className="rounded-lg text-lg px-8 py-6">
                                <Link href="/category/all">Shop Now</Link>
                            </Button>
                            <Button asChild variant="outline" size="lg" className="rounded-lg text-lg px-8 py-6">
                                <Link href={whatsappUrl} target="_blank">
                                    <WhatsAppIcon /> Order on WhatsApp
                                </Link>
                            </Button>
                        </div>
                        <div className="flex items-center justify-center gap-2 text-accent font-bold pt-4">
                            <CheckCircle className="w-5 h-5"/>
                            <span>100% Satisfaction Guaranteed!</span>
                        </div>
                    </div>
                </div>
              </div>
          </div>

        </div>
      </section>
    </div>
  );
}
