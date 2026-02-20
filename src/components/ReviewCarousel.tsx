"use client";

import { Star, Quote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const reviews = [
  {
    name: "Priya S.",
    rating: 5,
    review: "The ghee roast masala is a game-changer! Tastes just like the one from my favorite restaurant in Mangalore. So happy I found this store.",
  },
  {
    name: "Rajesh K.",
    rating: 5,
    review: "Finally, authentic Karavali products in Bangalore. The jackfruit chips were crispy and fresh. Will definitely be a repeat customer.",
  },
  {
    name: "Anjali M.",
    rating: 4,
    review: "I ordered the tender mango pickle, and it was delicious. The packaging was very secure, and the delivery was prompt. A bit pricey, but worth it.",
  },
  {
    name: "Suresh P.",
    rating: 5,
    review: "Loved the Neer Dosa batter. It made my Sunday breakfast so much easier and tastier. It felt just like homemade dosa. Highly recommended!",
  },
   {
    name: "Deepa V.",
    rating: 5,
    review: "The cold-pressed coconut oil is of excellent quality. The aroma itself tells you how pure it is. I use it for cooking and for my hair.",
  },
];

export default function ReviewCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = () => {
    if (isMobile) {
      // Toggle the pause state on tap
      setIsPaused((prev) => !prev);
    }
  };

  // This effect manages the auto-resume functionality on mobile
  useEffect(() => {
    // Always clear any existing timeout when the pause state changes or on unmount
    if (pauseTimeout.current) {
      clearTimeout(pauseTimeout.current);
      pauseTimeout.current = null;
    }

    // If the carousel is paused on mobile, set a timeout to resume it automatically
    if (isMobile && isPaused) {
      pauseTimeout.current = setTimeout(() => {
        setIsPaused(false);
      }, 7000); // 7 seconds
    }

    // Cleanup function to clear timeout if the component unmounts
    return () => {
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
      }
    };
  }, [isMobile, isPaused]); // Rerun effect when mobile status or pause state changes


  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear_gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group"
      onClick={handleInteraction}
    >
      <ul
        className={cn(
          "flex items-center justify-center md:justify-start [&_li]:mx-4 animate-scroll",
          // On desktop, pause on hover. On mobile, control pause via state.
          isMobile
            ? isPaused ? "[animation-play-state:paused]" : "[animation-play-state:running]"
            : "group-hover:[animation-play-state:paused]"
        )}
      >
        {[...reviews, ...reviews].map((review, index) => {
           return (
            <li key={index} className="flex-shrink-0 w-80 p-6 text-center">
                <Quote className="mx-auto h-12 w-12 text-primary/20 dark:text-primary/30 fill-current" />
                <p className="text-sm text-muted-foreground my-4">"{review.review}"</p>
                <div className="text-left">
                    <p className="font-bold">{review.name}</p>
                    <div className="flex items-center gap-0.5">
                        {[...Array(5)].map((_, i) => (
                            <Star key={i} className={cn("h-4 w-4", i < review.rating ? "text-primary fill-primary" : "text-muted-foreground/50")} />
                        ))}
                    </div>
                </div>
            </li>
        )})}
      </ul>
    </div>
  );
}
