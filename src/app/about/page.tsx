'use client';

import { useEffect, useRef, useState } from 'react';
import { CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

// Reusable component for the animated sections on scroll
const StorySection = ({ children, className }: { children: React.ReactNode, className?: string }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        rootMargin: '0px 0px -100px 0px', // Trigger when 100px of the element is visible
      }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <section
      ref={ref}
      className={cn(
        'transition-all duration-[0.6s] ease-out',
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5',
        className
      )}
    >
      {children}
    </section>
  );
};

// Reusable placeholder for images
const ImagePlaceholder = () => (
    <div className="aspect-[4/3] w-full flex items-center justify-center rounded-[18px] border-2 border-dashed border-muted-foreground/30 bg-muted/20 p-4 shadow-sm">
        <p className="text-center text-muted-foreground">Add Story Image Here</p>
    </div>
);

export default function AboutPage() {
  return (
    <div className="bg-background">
      {/* 1. Hero Section */}
      <div className="bg-[#f6f4ef] dark:bg-zinc-900/50 py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-headline font-bold">
            Our Story – Rooted in Tradition, Built on Trust
          </h1>
           <div className="mx-auto mt-4 h-px w-24 bg-primary/30"></div>
          <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
            A journey of family, tradition, and authentic coastal flavours since 2007
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-16 md:py-24 space-y-24">
        {/* 2. Alternating Content Blocks */}
        
        {/* Section 1: The Beginning */}
        <StorySection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ImagePlaceholder />
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold">The Beginning</h2>
              <div className="space-y-4 text-muted-foreground md:text-lg">
                <p>
                  In 2007, our parents started a small neighborhood shop in Bengaluru called Mangalore Store. What began as a modest family-run store was built on a simple promise — to provide genuine Karavali and Malnad products with honesty, freshness, and care.
                </p>
                <p>
                  With deep roots in Coastal Karnataka, our family understood the importance of preserving authentic flavours and traditions. Every product stocked in our store was carefully chosen, not just for quality, but for its connection to our heritage.
                </p>
              </div>
            </div>
          </div>
        </StorySection>

        {/* Section 2: Growing with Our Community */}
        <StorySection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-4 md:order-last">
              <h2 className="text-3xl font-headline font-bold">Growing with Our Community</h2>
              <div className="space-y-4 text-muted-foreground md:text-lg">
                <p>
                  Over the years, Mangalore Store became a trusted name among families in Bengaluru. Customers returned not just for products, but for the reliability and warmth of a family-run business that stood by its values.
                </p>
                <p>
                  We built relationships with suppliers, local producers, and loyal customers — ensuring that authenticity was never compromised.
                </p>
              </div>
            </div>
            <ImagePlaceholder />
          </div>
        </StorySection>

        {/* Section 3: The Birth of Karavali Mangalore Store */}
        <StorySection>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <ImagePlaceholder />
            <div className="space-y-4">
              <h2 className="text-3xl font-headline font-bold">The Birth of Karavali Mangalore Store</h2>
              <div className="space-y-4 text-muted-foreground md:text-lg">
                 <p>
                  As demand grew beyond our neighborhood, we realized that many people across Bengaluru and across India were looking for authentic coastal products they could trust.
                </p>
                <p>
                  That is how Karavali Mangalore Store was born.
                </p>
                <p>
                  An extension of our family legacy, created to bring the true taste of Coastal Karnataka to homes beyond our physical store.
                </p>
              </div>
            </div>
          </div>
        </StorySection>
        
        {/* Section 4: Our Commitment */}
        <StorySection>
            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6 md:order-last">
                    <h2 className="text-3xl font-headline font-bold">Our Commitment</h2>
                    <ul className="grid sm:grid-cols-2 gap-4">
                        {[
                            "Authentic Karavali & Malnad heritage foods",
                            "Quality sourcing and freshness",
                            "Preserving coastal traditions",
                            "Supporting trusted suppliers",
                            "Serving our customers with honesty and care"
                        ].map((item, index) => (
                            <li key={index} className="bg-[#fbfaf7] dark:bg-zinc-900/60 p-4 rounded-xl shadow-sm flex items-start gap-3">
                                <CheckCircle className="h-6 w-6 text-accent flex-shrink-0 mt-1" />
                                <span className="text-muted-foreground">{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                 <ImagePlaceholder />
            </div>
        </StorySection>

        {/* 3. Closing Highlight Box */}
        <StorySection>
          <div className="bg-[#f1ede4] dark:bg-zinc-900/70 p-10 rounded-2xl text-center max-w-4xl mx-auto">
            <p className="text-2xl md:text-3xl font-bold text-foreground leading-snug">
                From our family to yours, we bring the true taste of Coastal Karnataka.
            </p>
            <p className="mt-4 text-muted-foreground md:text-lg">
                Thank you for being part of our journey.
            </p>
          </div>
        </StorySection>
      </div>
    </div>
  );
}
