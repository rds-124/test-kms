"use client";

import { cn } from "@/lib/utils";
import { useState, useEffect, useRef } from "react";
import { useIsMobile } from "@/hooks/use-mobile";

const reviews = [
  {
    name: "Gangarathna KV",
    rating: 5,
    review: "Very nice hygienic food products and they are very helpful in guiding about the products. I have been coming here since 18 years, very happy and would definitely suggest!",
  },
  {
    name: "Ravindranath Padinjat",
    rating: 5,
    review: "One stop shop for all sweets and savouries. A family enterprise with nice, well behaved and hardworking people. I have been visiting this shop for so many years and never disappointed.",
  },
  {
    name: "Hameed Kayarkhan",
    rating: 5,
    review: "This shop is very good. I have been purchasing here for more than 15 years. Always a great experience.",
  },
  {
    name: "Narayana Murthy M",
    rating: 5,
    review: "Most of the Mangalore foods, condiments and daily essentials are available here. Great service. You get traditional items like pathre vade, shavige, neer dosa, sannas and so much more.",
  },
  {
    name: "Chandan Bhat",
    rating: 4,
    review: "Good place for authentic foods from Uttara Kannada and Dakshina Kannada. Great varieties of snacks and other products. They also have fresh traditional foods like kotte idli and pathrode which you won't easily find elsewhere.",
  },
  {
    name: "Rajashree P",
    rating: 5,
    review: "Love the murukus! So crispy and fresh. Absolutely love it.",
  },
  {
    name: "Chaithra Suresh",
    rating: 5,
    review: "We get amazing Mangalore products of good quality, be it eatables, snacks, rice, oil or daily essentials. All products are organic and of good quality. Really happy with everything.",
  },
  {
    name: "Arathi Subbaiah",
    rating: 4,
    review: "Good place to get region specific products. Whole lot of Mangalorean snacks, fryums, pickles, masalas, rice and so much more. Really good range overall.",
  },
  {
    name: "Karan Jadav",
    rating: 5,
    review: "A lot of variety of items. Always great interaction, polite and helpful. Always get the vegetables and snacks I need.",
  },
  {
    name: "Shivananda Kamath",
    rating: 5,
    review: "Hardworking, nice people. You get almost all the South Canara items here. They don't compromise on quality at all.",
  },
  {
    name: "Maitreya",
    rating: 5,
    review: "Great place for authentic stuff from coastal Karnataka. Snacks, pickles, cashew, kashaya powder and so much more. Everything is genuinely authentic.",
  },
  {
    name: "Vanamala Kiran",
    rating: 5,
    review: "You can fulfill your desire of eating most of the Mangalorean snacks here. Really good place.",
  },
  {
    name: "Jagadish Nayak",
    rating: 5,
    review: "Very good store which supplies all your daily needs. It's a one stop shop for all coastal delicacies.",
  },
  {
    name: "Nanda Kishore",
    rating: 5,
    review: "A good place to get and savour authentic coastal Karnataka items. Really happy with the variety and quality.",
  },
  {
    name: "Satish Prabhu",
    rating: 5,
    review: "Best place to buy coastal and malnad items. Snacks, spices and so much more. Highly recommend.",
  },
  {
    name: "Pragathi T",
    rating: 5,
    review: "Udupi and Mangalore items available. Only place of its kind in Bangalore. Love the range and their service.",
  },
  {
    name: "Gautham Bangera",
    rating: 5,
    review: "It's a big store and there's pretty much everything you'll get of Mangalorean items. Really great place.",
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className="h-3.5 w-3.5"
          viewBox="0 0 20 20"
          fill={i < rating ? "#D4920A" : "none"}
          stroke={i < rating ? "#D4920A" : "#D1C9BC"}
          strokeWidth="1.5"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function ReviewCard({ review }: { review: typeof reviews[0] }) {
  const initial = review.name.charAt(0).toUpperCase();

  return (
    <div
      className="flex-shrink-0 w-72 mx-3 flex flex-col"
      style={{
        background: "#FEFCF8",
        borderRadius: "16px",
        boxShadow: "0 2px 12px rgba(46,138,87,0.08), 0 1px 3px rgba(0,0,0,0.06)",
        borderTop: "3px solid #2E8A57",
        padding: "20px 22px 18px",
      }}
    >
      {/* Top row: avatar + stars */}
      <div className="flex items-center justify-between mb-3">
        <div
          className="flex items-center justify-center text-sm font-bold text-white flex-shrink-0"
          style={{
            width: 36,
            height: 36,
            borderRadius: "50%",
            background: "linear-gradient(135deg, #2E8A57 0%, #3da868 100%)",
            fontFamily: "var(--font-barlow)",
            letterSpacing: "0.05em",
          }}
        >
          {initial}
        </div>
        <StarRating rating={review.rating} />
      </div>

      {/* Quote mark + review text */}
      <div className="relative flex-1">
        <span
          className="absolute -top-2 -left-1 leading-none select-none"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontSize: "3rem",
            color: "#2E8A57",
            opacity: 0.18,
            lineHeight: 1,
          }}
        >
          &ldquo;
        </span>
        <p
          className="relative z-10 text-sm leading-relaxed"
          style={{
            fontFamily: "var(--font-fraunces)",
            fontStyle: "italic",
            color: "#3D3028",
            paddingTop: "4px",
          }}
        >
          {review.review}
        </p>
      </div>

      {/* Divider + name */}
      <div
        className="mt-4 pt-3 flex items-center justify-between"
        style={{ borderTop: "1px dashed #E8DDD0" }}
      >
        <p
          className="text-xs font-semibold tracking-wide truncate"
          style={{
            fontFamily: "var(--font-barlow)",
            color: "#2E8A57",
          }}
        >
          {review.name}
        </p>
        <span
          className="text-xs whitespace-nowrap ml-2 flex-shrink-0"
          style={{ color: "#B8A898" }}
        >
          Google Review
        </span>
      </div>
    </div>
  );
}

export default function ReviewCarousel() {
  const [isPaused, setIsPaused] = useState(false);
  const isMobile = useIsMobile();
  const pauseTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleInteraction = () => {
    if (isMobile) {
      setIsPaused((prev) => !prev);
    }
  };

  useEffect(() => {
    if (pauseTimeout.current) {
      clearTimeout(pauseTimeout.current);
      pauseTimeout.current = null;
    }
    if (isMobile && isPaused) {
      pauseTimeout.current = setTimeout(() => {
        setIsPaused(false);
      }, 7000);
    }
    return () => {
      if (pauseTimeout.current) {
        clearTimeout(pauseTimeout.current);
      }
    };
  }, [isMobile, isPaused]);

  return (
    <div
      className="w-full inline-flex flex-nowrap overflow-hidden group py-3"
      style={{
        maskImage:
          "linear-gradient(to right, transparent 0, black 100px, black calc(100% - 100px), transparent 100%)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent 0, black 100px, black calc(100% - 100px), transparent 100%)",
      }}
      onClick={handleInteraction}
    >
      <ul
        className={cn(
          "flex items-stretch justify-center md:justify-start animate-scroll",
          isMobile
            ? isPaused
              ? "[animation-play-state:paused]"
              : "[animation-play-state:running]"
            : "group-hover:[animation-play-state:paused]"
        )}
      >
        {[...reviews, ...reviews].map((review, index) => (
          <li key={index} className="flex items-stretch">
            <ReviewCard review={review} />
          </li>
        ))}
      </ul>
    </div>
  );
}
