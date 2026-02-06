
"use client";

import Image from "next/image";
import { Star } from "lucide-react";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { cn } from "@/lib/utils";

const reviews = [
  {
    name: "Priya S.",
    avatarId: "customer-1",
    rating: 5,
    review: "The ghee roast masala is a game-changer! Tastes just like the one from my favorite restaurant in Mangalore. So happy I found this store.",
  },
  {
    name: "Rajesh K.",
    avatarId: "customer-2",
    rating: 5,
    review: "Finally, authentic Karavali products in Bangalore. The jackfruit chips were crispy and fresh. Will definitely be a repeat customer.",
  },
  {
    name: "Anjali M.",
    avatarId: "customer-3",
    rating: 4,
    review: "I ordered the tender mango pickle, and it was delicious. The packaging was very secure, and the delivery was prompt. A bit pricey, but worth it.",
  },
  {
    name: "Suresh P.",
    avatarId: "customer-4",
    rating: 5,
    review: "Loved the Neer Dosa batter. It made my Sunday breakfast so much easier and tastier. It felt just like homemade dosa. Highly recommended!",
  },
   {
    name: "Deepa V.",
    avatarId: "customer-1", // Re-using avatars for loop effect
    rating: 5,
    review: "The cold-pressed coconut oil is of excellent quality. The aroma itself tells you how pure it is. I use it for cooking and for my hair.",
  },
];

export default function ReviewCarousel() {
  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden [mask-image:_linear-gradient(to_right,transparent_0,_black_128px,_black_calc(100%-128px),transparent_100%)] group"
    >
      <ul className="flex items-center justify-center md:justify-start [&_li]:mx-4 animate-scroll group-hover:[animation-play-state:paused]">
        {[...reviews, ...reviews].map((review, index) => {
           const avatarImage = PlaceHolderImages.find(p => p.id === review.avatarId);
           return (
            <li key={index} className="flex-shrink-0">
                <div className="w-80 h-48 bg-card rounded-2xl shadow-lg p-6 flex flex-col justify-between">
                    <p className="text-sm text-muted-foreground italic">"{review.review}"</p>
                    <div className="flex items-center gap-4 mt-4">
                        {avatarImage && (
                            <Image
                                src={avatarImage.imageUrl}
                                alt={review.name}
                                width={48}
                                height={48}
                                className="w-12 h-12 rounded-full object-cover"
                                data-ai-hint={avatarImage.imageHint}
                            />
                        )}
                        <div>
                            <p className="font-bold">{review.name}</p>
                            <div className="flex items-center gap-0.5">
                                {[...Array(5)].map((_, i) => (
                                    <Star key={i} className={cn("h-4 w-4", i < review.rating ? "text-primary fill-primary" : "text-muted-foreground/50")} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </li>
        )})}
      </ul>
    </div>
  );
}
