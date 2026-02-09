import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Heart, Truck } from "lucide-react";

export default function AboutPage() {
  const aboutImage = PlaceHolderImages.find(p => p.id === 'about-us');

  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">About Karavali Store</h1>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Your authentic gateway to the rich heritage and flavors of the Karavali region.
          </p>
        </div>

        {aboutImage && (
          <div className="relative w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg mb-12">
            <Image
              src={aboutImage.imageUrl}
              alt={aboutImage.description}
              fill
              className="object-cover"
              data-ai-hint={aboutImage.imageHint}
            />
          </div>
        )}

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-headline font-bold mb-4">Our Story</h2>
            <p className="mb-4 text-muted-foreground">
              Karavali Store was born from a passion for preserving and sharing the unique cultural tapestry of the coastal Karnataka region, known as Karavali. We are a small team dedicated to sourcing the most authentic products, from fragrant spices that define our cuisine to handcrafted goods that tell a story.
            </p>
            <p className="text-muted-foreground">
              We work directly with local farmers, artisans, and small businesses to ensure that every product we offer is of the highest quality and carries the true essence of its origin. By choosing Karavali Store, you are not just buying a product; you are supporting local communities and helping to keep ancient traditions alive.
            </p>
          </div>
          <div>
            <h2 className="text-3xl font-headline font-bold mb-4">Our Commitment</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Leaf className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Quality & Authenticity</h3>
                    <p className="text-sm text-muted-foreground">We guarantee that our products are genuine, sourced with care, and free from artificial additives.</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Heart className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Community Support</h3>
                    <p className="text-sm text-muted-foreground">Your purchase empowers local artisans and farmers, fostering sustainable livelihoods within the Karavali region.</p>
                  </div>
                </CardContent>
              </Card>
               <Card>
                <CardContent className="p-6 flex items-start gap-4">
                  <Truck className="h-8 w-8 text-accent flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold">Customer Satisfaction</h3>
                    <p className="text-sm text-muted-foreground">We are committed to providing an exceptional shopping experience, from easy browsing to secure and timely delivery.</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
