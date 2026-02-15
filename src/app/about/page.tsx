import { CheckCircle } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="bg-background">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-headline font-bold">
              Our Story – Rooted in Tradition, Built on Trust
            </h1>
          </div>

          <div className="space-y-12">
            <section>
              <h2 className="text-3xl font-headline font-bold mb-4 text-center md:text-left">The Beginning</h2>
              <div className="space-y-4 text-muted-foreground md:text-lg">
                <p>
                  In 2007, our parents started a small neighborhood shop in Bengaluru called Mangalore Store. What began as a modest family-run store was built on a simple promise — to provide genuine Karavali and Malnad products with honesty, freshness, and care.
                </p>
                <p>
                  With deep roots in Coastal Karnataka, our family understood the importance of preserving authentic flavours and traditions. Every product stocked in our store was carefully chosen, not just for quality, but for its connection to our heritage.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-headline font-bold mb-4 text-center md:text-left">Growing with Our Community</h2>
              <div className="space-y-4 text-muted-foreground md:text-lg">
                <p>
                  Over the years, Mangalore Store became a trusted name among families in Bengaluru. Customers returned not just for products, but for the reliability and warmth of a family-run business that stood by its values.
                </p>
                <p>
                  We built relationships with suppliers, local producers, and loyal customers — ensuring that authenticity was never compromised.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-3xl font-headline font-bold mb-4 text-center md:text-left">The Birth of Karavali Mangalore Store</h2>
              <div className="space-y-4 text-muted-foreground md:text-lg">
                <p>
                  As demand grew beyond our neighborhood, we realized that many people across Bengaluru — and even across India — were looking for authentic coastal products they could trust.
                </p>
                <p>
                  That is how Karavali Mangalore Store was born.
                </p>
                <p>
                  An extension of our family legacy, created to bring the true taste of Coastal Karnataka to homes beyond our physical store.
                </p>
              </div>
            </section>
            
            <section>
              <h2 className="text-3xl font-headline font-bold mb-4 text-center md:text-left">Our Commitment</h2>
              <ul className="space-y-3 md:text-lg">
                <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Authentic Karavali & Malnad heritage foods</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Quality sourcing and freshness</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Preserving coastal traditions</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Supporting trusted suppliers</span>
                </li>
                 <li className="flex items-start gap-3">
                  <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                  <span className="text-muted-foreground">Serving our customers with honesty and care</span>
                </li>
              </ul>
            </section>

            <div className="text-center pt-8 border-t border-dashed">
              <p className="text-xl md:text-2xl font-semibold text-foreground leading-relaxed">
                What started as a small family store continues today with the same values — only now, we are proud to serve a wider community.
              </p>
              <p className="mt-4 text-xl md:text-2xl font-semibold text-foreground">
                From our family to yours, we bring the true taste of Coastal Karnataka.
              </p>
              <p className="mt-4 text-lg text-muted-foreground">
                Thank you for being a part of our journey. We are grateful to serve you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
