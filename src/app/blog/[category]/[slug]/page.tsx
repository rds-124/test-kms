'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, ChevronRight, ShoppingCart } from 'lucide-react';

// ─── Colour tokens ────────────────────────────────────────────────────────────
const C = {
  bg: '#FDFAF6',
  text: '#1C1008',
  textMuted: '#7A5630',
  textLight: '#C9A96E',
  saffron: '#D47C0F',
  green: 'hsl(147, 50%, 36%)',
  greenDark: 'hsl(147, 50%, 28%)',
  terracotta: 'hsl(18, 56%, 53%)',
  saffronDark: '#B5660C',
  card: '#FFFFFF',
  border: '#E8D9BE',
  brown: '#3D1F00',
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverGradient: string;
  emoji: string;
}

interface BlogProduct {
  id: string;
  name: string;
  kannadaName: string;
  description: string;
  price: number;
  salePrice?: number;
  badge?: { label: string; color: string };
  imageUrl: string;
  imageHint: string;
  href: string;
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── Static data ──────────────────────────────────────────────────────────────

const POST: BlogPostMeta = {
  slug: 'what-is-kori-rotti',
  title: "What is Kori Rotti? The Complete Guide to Mangalore's Most Iconic Dish",
  excerpt:
    "Kori Rotti is Mangalore's most beloved dish — crispy sun-dried rice wafers served with a fiery, coconut-rich chicken curry. Learn everything about it here.",
  category: 'Food Culture',
  author: 'Meena Shetty',
  date: '12 March 2025',
  readTime: '6 min read',
  coverGradient: 'linear-gradient(135deg, #7C2D12 0%, #C2410C 50%, #92400E 100%)',
  emoji: '🍛',
};

// Sidebar & inline products
const SIDEBAR_PRODUCTS: BlogProduct[] = [
  {
    id: 'kori-rotti-pack',
    name: 'Traditional Kori Rotti',
    kannadaName: 'ಕೋರಿ ರೊಟ್ಟಿ',
    description: 'Authentic sun-dried crispy rice wafers, 400g',
    price: 149,
    salePrice: 120,
    badge: { label: 'Best Seller', color: '#CA8A04' },
    imageUrl:
      'https://images.unsplash.com/photo-1603284845744-9ffce8a7c8c4?auto=format&fit=crop&w=400&q=80',
    imageHint: 'rice wafers',
    href: '/product/kori-rotti-400g',
  },
  {
    id: 'kori-curry-masala',
    name: 'Kori Sukka Masala',
    kannadaName: 'ಕೋರಿ ಸುಕ್ಕ ಮಸಾಲ',
    description: 'Ready-to-use dry chicken masala, 100g',
    price: 89,
    badge: { label: 'Popular', color: '#7C3AED' },
    imageUrl:
      'https://images.unsplash.com/photo-1710857389305-5cba9211033f?auto=format&fit=crop&w=400&q=80',
    imageHint: 'masala spice powder',
    href: '/product/kori-sukka-masala-100g',
  },
];

const INLINE_PRODUCTS: BlogProduct[] = [
  {
    id: 'coconut-oil',
    name: 'Cold-Pressed Coconut Oil',
    kannadaName: 'ತೆಂಗಿನ ಎಣ್ಣೆ',
    description: 'Pure coconut oil for authentic Coastal cooking — 500ml',
    price: 249,
    salePrice: 199,
    badge: { label: 'New Arrival', color: '#16A34A' },
    imageUrl:
      'https://images.unsplash.com/photo-1588413333412-82148535db53?auto=format&fit=crop&w=400&q=80',
    imageHint: 'coconut oil bottle',
    href: '/product/cold-pressed-coconut-oil-500ml',
  },
  {
    id: 'ghee-roast-masala',
    name: 'Mangalorean Ghee Roast Masala',
    kannadaName: 'ಘೀ ರೋಸ್ಟ್ ಮಸಾಲ',
    description: 'The secret blend for iconic Mangalorean Ghee Roast dishes — 75g',
    price: 129,
    badge: { label: 'Best Seller', color: '#CA8A04' },
    imageUrl:
      'https://images.unsplash.com/photo-1704650312022-ed1a76dbed1b?auto=format&fit=crop&w=400&q=80',
    imageHint: 'spice masala powder',
    href: '/product/ghee-roast-masala-75g',
  },
];

const RELATED_PRODUCTS: BlogProduct[] = [
  {
    id: 'rp-1',
    name: 'Traditional Kori Rotti',
    kannadaName: 'ಕೋರಿ ರೊಟ್ಟಿ',
    description: '',
    price: 149,
    salePrice: 120,
    badge: { label: 'Best Seller', color: '#CA8A04' },
    imageUrl:
      'https://images.unsplash.com/photo-1603284845744-9ffce8a7c8c4?auto=format&fit=crop&w=400&q=80',
    imageHint: 'rice wafers',
    href: '/product/kori-rotti-400g',
  },
  {
    id: 'rp-2',
    name: 'Kori Sukka Masala',
    kannadaName: 'ಕೋರಿ ಸುಕ್ಕ ಮಸಾಲ',
    description: '',
    price: 89,
    badge: { label: 'Popular', color: '#7C3AED' },
    imageUrl:
      'https://images.unsplash.com/photo-1710857389305-5cba9211033f?auto=format&fit=crop&w=400&q=80',
    imageHint: 'masala spice',
    href: '/product/kori-sukka-masala-100g',
  },
  {
    id: 'rp-3',
    name: 'Cold-Pressed Coconut Oil',
    kannadaName: 'ತೆಂಗಿನ ಎಣ್ಣೆ',
    description: '',
    price: 249,
    salePrice: 199,
    badge: { label: 'New Arrival', color: '#16A34A' },
    imageUrl:
      'https://images.unsplash.com/photo-1588413333412-82148535db53?auto=format&fit=crop&w=400&q=80',
    imageHint: 'coconut oil',
    href: '/product/cold-pressed-coconut-oil-500ml',
  },
  {
    id: 'rp-4',
    name: 'Mangalorean Ghee Roast Masala',
    kannadaName: 'ಘೀ ರೋಸ್ಟ್ ಮಸಾಲ',
    description: '',
    price: 129,
    badge: { label: 'Best Seller', color: '#CA8A04' },
    imageUrl:
      'https://images.unsplash.com/photo-1704650312022-ed1a76dbed1b?auto=format&fit=crop&w=400&q=80',
    imageHint: 'ghee roast masala',
    href: '/product/ghee-roast-masala-75g',
  },
];

const RELATED_POSTS: BlogPostMeta[] = [
  {
    slug: 'mangalorean-chakli-recipe',
    title: 'Mangalorean Chakli Recipe: The Perfect Crunchy Spiral',
    excerpt:
      "Our family's heirloom recipe for the crispiest chakli you'll ever make at home.",
    category: 'Recipes',
    author: 'Savitha Rao',
    date: '5 Mar 2025',
    readTime: '8 min read',
    coverGradient: 'linear-gradient(135deg, #92400E 0%, #B45309 100%)',
    emoji: '🌀',
  },
  {
    slug: 'neer-dosa-recipe',
    title: 'Neer Dosa Recipe: The Delicate Rice Crepe from the Coast',
    excerpt:
      'Gossamer-thin, silky-soft, and made from just soaked rice — the simplest Coastal breakfast.',
    category: 'Recipes',
    author: 'Savitha Rao',
    date: '28 Feb 2025',
    readTime: '5 min read',
    coverGradient: 'linear-gradient(135deg, #44403C 0%, #78716C 100%)',
    emoji: '🫓',
  },
  {
    slug: '17-things-mangaloreans-in-bengaluru',
    title: '17 Things Only Mangaloreans in Bengaluru Will Understand',
    excerpt:
      'The Mangalorean immigrant experience in Bengaluru is something else entirely.',
    category: 'Food Culture',
    author: 'Rohit Alva',
    date: '8 Mar 2025',
    readTime: '9 min read',
    coverGradient: 'linear-gradient(135deg, #4C1D95 0%, #7C3AED 100%)',
    emoji: '🏙️',
  },
];

const FAQS: FaqItem[] = [
  {
    q: 'What does Kori Rotti mean?',
    a: '"Kori" means chicken in Tulu, the local language of Coastal Karnataka, and "Rotti" refers to the thin, crispy sun-dried rice wafers. Together, Kori Rotti literally means "chicken with rice wafers" — though the term is colloquially used for the entire dish including the curry.',
  },
  {
    q: 'Is Kori Rotti available outside Mangalore?',
    a: 'Yes! With the rise of Mangalorean D2C food brands and specialty restaurants, you can now find Kori Rotti in Bengaluru, Mumbai, Pune, and other cities with significant Mangalorean diaspora. You can also order authentic Kori Rotti wafers and masala online from stores like Karavali Mangalore Store and recreate it at home.',
  },
  {
    q: 'Can I make Kori Rotti at home?',
    a: 'You can absolutely make Kori Rotti at home. The rice wafers are challenging to make from scratch as they require sun-drying, but you can easily buy them ready-made. The Kori Curry itself is made with chicken, freshly grated coconut, a special blend of spices, and coconut oil — all of which are available in our store.',
  },
  {
    q: 'What is the best way to eat Kori Rotti?',
    a: "The traditional method is to break the dry rotti into pieces and soak them in the hot curry just before eating. Don't let them soak too long — the joy is in the contrast between the soft, curry-soaked inner layer and the slightly crispy outer layer. Eat with your right hand for the full cultural experience!",
  },
  {
    q: 'Is Kori Rotti spicy?',
    a: 'Kori Rotti is traditionally medium-to-hot in spice level. The heat comes from the use of Byadagi chillies, which give the curry its characteristic deep red colour without being overpoweringly fiery. You can always adjust the chilli quantity to your preference when making it at home.',
  },
];

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryPill({ label }: { label: string }) {
  return (
    <span
      className="inline-block font-body font-semibold uppercase tracking-wider rounded-full text-xs px-3 py-1"
      style={{ backgroundColor: C.terracotta, color: C.bg, letterSpacing: '0.06em' }}
    >
      {label}
    </span>
  );
}

// Sidebar product card (vertical stacked)
function SidebarProductCard({ product }: { product: BlogProduct }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="rounded-xl overflow-hidden border flex flex-col transition-shadow duration-200 hover:shadow-lg"
      style={{ backgroundColor: C.card, borderColor: C.border }}
    >
      {/* Image */}
      <div className="relative w-full aspect-[4/3] overflow-hidden flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          data-ai-hint={product.imageHint}
        />
        {product.badge && (
          <span
            className="absolute top-2 left-2 text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: product.badge.color }}
          >
            {product.badge.label}
          </span>
        )}
      </div>
      {/* Info */}
      <div className="p-3 space-y-1.5 flex-1 flex flex-col">
        <div>
          <p className="font-body font-semibold text-sm leading-snug" style={{ color: C.text }}>
            {product.name}
          </p>
          <p className="font-body text-xs mt-0.5" style={{ color: C.textLight }}>
            {product.kannadaName}
          </p>
        </div>
        <div className="flex items-baseline gap-1.5 mt-auto pt-1">
          <span className="font-body font-bold text-sm" style={{ color: C.text }}>
            ₹{product.salePrice ?? product.price}
          </span>
          {product.salePrice && (
            <span
              className="font-body text-xs line-through"
              style={{ color: C.textLight }}
            >
              ₹{product.price}
            </span>
          )}
        </div>
        <button
          className="mt-1 w-full font-body font-bold text-xs h-9 px-4 rounded-full border-2 transition-all duration-200 active:scale-95"
          style={{
            borderColor: C.green,
            color: C.green,
            backgroundColor: hovered ? 'hsla(147, 50%, 36%, 0.2)' : 'hsla(147, 50%, 36%, 0.1)',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => window.location.href = product.href}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// Inline product card (horizontal)
function InlineProductCard({ product }: { product: BlogProduct }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="my-8">
      {/* Featured product label */}
      <div
        className="inline-flex items-center gap-1.5 mb-3 font-body font-bold text-xs uppercase tracking-widest"
        style={{ color: C.terracotta }}
      >
        <span className="w-4 h-px bg-current" />
        Featured Product
        <span className="w-4 h-px bg-current" />
      </div>
      <div
        className="flex gap-4 rounded-xl border-l-4 p-4 transition-shadow duration-200 hover:shadow-md"
        style={{
          backgroundColor: C.bg,
          borderColor: C.terracotta,
          boxShadow: '0 1px 4px rgba(202,108,68,0.08)',
          border: `1px solid ${C.border}`,
          borderLeftWidth: '4px',
          borderLeftColor: C.terracotta,
        }}
      >
        {/* Product Image */}
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
          />
        </div>
        {/* Product Info */}
        <div className="flex flex-col flex-1 min-w-0 justify-between">
          <div>
            <p className="font-body font-semibold text-sm leading-snug" style={{ color: C.text }}>
              {product.name}
            </p>
            <p className="font-body text-xs mt-0.5" style={{ color: C.textLight }}>
              {product.kannadaName}
            </p>
            <p className="font-body text-xs mt-1.5 leading-relaxed" style={{ color: C.textMuted }}>
              {product.description}
            </p>
          </div>
          <div className="flex items-center gap-3 mt-2 flex-wrap">
            <div className="flex items-baseline gap-1.5">
              <span className="font-body font-bold text-base" style={{ color: C.text }}>
                ₹{product.salePrice ?? product.price}
              </span>
              {product.salePrice && (
                <span className="font-body text-xs line-through" style={{ color: C.textLight }}>
                  ₹{product.price}
                </span>
              )}
            </div>
            <button
              className="inline-flex items-center gap-1.5 font-body font-bold text-xs h-9 px-4 rounded-full border-2 transition-all duration-200 active:scale-95"
              style={{
                borderColor: C.green,
                color: C.green,
                backgroundColor: hovered ? 'hsla(147, 50%, 36%, 0.2)' : 'hsla(147, 50%, 36%, 0.1)',
              }}
              onMouseEnter={() => setHovered(true)}
              onMouseLeave={() => setHovered(false)}
              onClick={() => window.location.href = product.href}
            >
              Buy Now <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// FAQ accordion item
function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className="rounded-xl border overflow-hidden transition-shadow duration-200"
            style={{
              borderColor: isOpen ? C.terracotta : C.border,
              backgroundColor: C.card,
            }}
          >
            <button
              className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left font-body font-semibold text-sm md:text-base focus-visible:outline-none"
              style={{ color: C.text }}
              onClick={() => setOpenIdx(isOpen ? null : i)}
              aria-expanded={isOpen}
            >
              <span>{faq.q}</span>
              <ChevronDown
                className="h-4 w-4 flex-shrink-0 transition-transform duration-300"
                style={{
                  color: C.terracotta,
                  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
                }}
              />
            </button>
            <div
              className="overflow-hidden transition-all duration-300 ease-in-out"
              style={{
                maxHeight: isOpen ? '600px' : '0px',
                opacity: isOpen ? 1 : 0,
              }}
            >
              <p
                className="px-5 pb-4 font-body text-sm leading-relaxed"
                style={{ color: C.textMuted }}
              >
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// Related blog post card (same style as /blog listing)

function categorySegment(category: string): string {
  const map: Record<string, string> = {
    Recipes: 'recipes',
    'Food Culture': 'food-culture',
    'Product Guides': 'product-guides',
    'Festivals & Occasions': 'festivals',
  };
  return map[category] ?? 'food-culture';
}

function RelatedPostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Link
      href={`/blog/${categorySegment(post.category)}/${post.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden shadow-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
      style={{ backgroundColor: C.card, borderColor: C.border }}
    >
      {/* Cover */}
      <div
        className="relative w-full aspect-[3/2] flex items-center justify-center overflow-hidden flex-shrink-0"
        style={{ background: post.coverGradient }}
      >
        <span
          className="text-white/30 select-none pointer-events-none"
          style={{ fontSize: 'clamp(2.5rem, 8vw, 4rem)' }}
          aria-hidden
        >
          {post.emoji}
        </span>
        <div
          className="absolute top-3 left-3"
        >
          <span
            className="inline-block font-body font-semibold uppercase tracking-wider rounded-full text-[10px] px-2.5 py-0.5"
            style={{ backgroundColor: C.terracotta, color: C.bg }}
          >
            {post.category}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      {/* Body */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <h3
          className="font-headline font-bold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[hsl(18,56%,53%)]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.1rem)', color: C.text }}
        >
          {post.title}
        </h3>
        <p className="font-body text-sm leading-relaxed line-clamp-2 flex-1" style={{ color: C.textMuted }}>
          {post.excerpt}
        </p>
        <div className="flex items-center gap-2 text-xs font-body" style={{ color: C.textMuted }}>
          <span className="font-medium" style={{ color: '#5C3D0F' }}>{post.author}</span>
          <span style={{ color: C.textLight }}>·</span>
          <span>{post.date}</span>
          <span style={{ color: C.textLight }}>·</span>
          <span>{post.readTime}</span>
        </div>
      </div>
    </Link>
  );
}

// Related horizontal product card
function RelatedProductCard({ product }: { product: BlogProduct }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-shrink-0 w-48 sm:w-52 flex flex-col rounded-xl overflow-hidden border shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
      style={{ backgroundColor: C.card, borderColor: C.border }}
    >
      <div className="relative w-full aspect-square overflow-hidden flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          data-ai-hint={product.imageHint}
        />
        {product.badge && (
          <span
            className="absolute top-2 left-2 text-white text-[10px] font-body font-bold px-2 py-0.5 rounded-full"
            style={{ backgroundColor: product.badge.color }}
          >
            {product.badge.label}
          </span>
        )}
      </div>
      <div className="p-3 flex flex-col flex-1 space-y-1.5">
        <p className="font-body font-semibold text-xs leading-snug line-clamp-2" style={{ color: C.text }}>
          {product.name}
        </p>
        <p className="font-body text-[11px]" style={{ color: C.textLight }}>
          {product.kannadaName}
        </p>
        <div className="flex items-baseline gap-1 mt-auto pt-1">
          <span className="font-body font-bold text-sm" style={{ color: C.text }}>
            ₹{product.salePrice ?? product.price}
          </span>
          {product.salePrice && (
            <span className="font-body text-xs line-through" style={{ color: C.textLight }}>
              ₹{product.price}
            </span>
          )}
        </div>
        <button
          className="mt-1 w-full font-body font-bold text-xs h-9 px-4 rounded-full border-2 flex items-center justify-center gap-1 transition-all duration-200 active:scale-95"
          style={{
            borderColor: C.green,
            color: C.green,
            backgroundColor: hovered ? 'hsla(147, 50%, 36%, 0.2)' : 'hsla(147, 50%, 36%, 0.1)',
          }}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          onClick={() => window.location.href = product.href}
        >
          <ShoppingCart className="h-3 w-3" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ─── Article content images ───────────────────────────────────────────────────

function ArticleImage({
  src,
  alt,
  hint,
  caption,
}: {
  src: string;
  alt: string;
  hint: string;
  caption: string;
}) {
  return (
    <figure className="my-8">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          data-ai-hint={hint}
        />
      </div>
      {caption && (
        <figcaption
          className="mt-2 text-center font-body text-xs italic"
          style={{ color: C.textMuted }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPostPage() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg, color: C.text }}>

      {/* ── Breadcrumb ────────────────────────────────────────────── */}
      <nav
        className="max-w-6xl mx-auto px-4 pt-5 pb-0"
        aria-label="Breadcrumb"
      >
        <ol className="flex items-center gap-1.5 font-body text-xs flex-wrap" style={{ color: C.textMuted }}>
          <li>
            <Link
              href="/"
              className="transition-colors duration-200 hover:text-[#D47C0F]"
              style={{ color: C.textMuted }}
            >
              Home
            </Link>
          </li>
          <li><ChevronRight className="h-3 w-3 flex-shrink-0" style={{ color: C.textLight }} /></li>
          <li>
            <Link
              href="/blog"
              className="transition-colors duration-200 hover:text-[#D47C0F]"
              style={{ color: C.textMuted }}
            >
              Blog
            </Link>
          </li>
          <li><ChevronRight className="h-3 w-3 flex-shrink-0" style={{ color: C.textLight }} /></li>
          <li>
            <Link
              href="/blog?category=food-culture"
              className="transition-colors duration-200 hover:text-[#D47C0F]"
              style={{ color: C.textMuted }}
            >
              Food Culture
            </Link>
          </li>
          <li
            className="line-clamp-1 max-w-[200px] sm:max-w-xs"
            style={{ color: C.textLight }}
            aria-current="page"
          >
            {POST.title}
          </li>
        </ol>
      </nav>

      {/* ── Post header ──────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto px-4 pt-8 pb-0">
        <div className="max-w-3xl">
          <CategoryPill label={POST.category} />
          <h1
            className="font-headline font-bold mt-4 leading-tight"
            style={{
              fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)',
              color: C.text,
              lineHeight: 1.2,
            }}
          >
            {POST.title}
          </h1>
          {/* Meta row */}
          <div
            className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 font-body text-sm"
            style={{ color: C.textMuted }}
          >
            <span className="font-semibold" style={{ color: '#5C3D0F' }}>{POST.author}</span>
            <span style={{ color: C.textLight }}>·</span>
            <time dateTime="2025-03-12">{POST.date}</time>
            <span style={{ color: C.textLight }}>·</span>
            <span>{POST.readTime}</span>
          </div>
        </div>

        {/* Hero image — full width */}
        <div className="relative w-full aspect-video mt-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src="https://images.unsplash.com/photo-1603284845744-9ffce8a7c8c4?auto=format&fit=crop&w=1400&q=85"
            alt="A plate of Kori Rotti — crispy rice wafers served alongside a rich coconut chicken curry in a traditional copper vessel, garnished with fresh curry leaves"
            fill
            priority
            className="object-cover"
            data-ai-hint="chicken curry rice wafers coastal food"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </header>

      {/* ── Two-column layout ─────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-10 mb-16 lg:flex lg:gap-10">

        {/* ── Main article column ──────────────────────────────── */}
        <main className="flex-1 min-w-0">
          <article
            className="font-body leading-relaxed"
            style={{ fontSize: '17px', lineHeight: 1.75, color: C.text }}
          >

            {/* ── Section 1: Intro ── */}
            <p>
              If you've ever been to a Mangalorean wedding, visited a traditional Udupi home, or had Tulu-speaking colleagues who wax poetic about food — you've heard of Kori Rotti. It is, without exaggeration, the single most iconic dish of Coastal Karnataka. The name is deceptively simple: "Kori" is chicken in Tulu, and "Rotti" refers to the wafer-thin, sun-dried rice crackers that are the dish's signature element. Together, they form a meal unlike anything else in Indian cuisine.
            </p>
            <p className="mt-5">
              Kori Rotti is more than food — it's a cultural institution. It's served at weddings that last two days, at temple feasts where hundreds gather, and in modest homes on special Sunday afternoons. To understand Kori Rotti is to understand a little bit about what makes the Karavali coast so deeply rooted in its culinary identity.
            </p>
            <p className="mt-5">
              In this guide, we'll walk you through the history, the anatomy of the dish, how it's made, and — most importantly — how you can experience it yourself, whether you're in Mangalore or sitting thousands of kilometres away.
            </p>

            {/* ── Section 2: The Rotti ── */}
            <h2
              className="font-headline font-bold mt-10 mb-5"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              The Rotti: Mangalore's Edible Cracker
            </h2>
            <p>
              The defining element of Kori Rotti isn't the chicken curry — it's the rotti itself. These are extraordinarily thin rice wafers made from a fermented rice batter that is spread on large flat mats and sun-dried for several hours, then baked until brittle and crisp. The result is a wafer with a pale ivory colour, a gentle toasted smell, and a texture that shatters when you break it.
            </p>
            <p className="mt-5">
              Making Rotti from scratch is an art form passed down through generations, particularly among women from the Bunt and Billava communities of Coastal Karnataka. The process requires good weather, the right quality of rice (traditionally Jyothi or Sona Masoori), and a flat surface to spread the batter paper-thin. In the past, entire neighbourhoods would come together for Rotti-making days.
            </p>
            <p className="mt-5">
              Today, authentic Kori Rotti wafers are available from specialty stores and D2C brands that source them directly from Mangalorean households. When you buy a packet, you're not just buying a snack — you're buying a piece of living heritage.
            </p>

            {/* Article image 1 */}
            <ArticleImage
              src="https://images.unsplash.com/photo-1686820740687-426a7b9b2043?auto=format&fit=crop&w=900&q=85"
              alt="Close-up of thin, crispy rice wafers (Kori Rotti) laid out on a traditional mat before being packed, showcasing their delicate texture"
              hint="thin rice crackers flatbread"
              caption="Traditional sun-dried Kori Rotti wafers — brittle, ivory-white, and flavour-neutral by design, they act as the perfect vehicle for the curry."
            />

            {/* ── Section 3: The Curry ── */}
            <h2
              className="font-headline font-bold mt-10 mb-5"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              The Kori Curry: A Coconut-Rich Masterpiece
            </h2>
            <p>
              The curry that accompanies the rotti is equally important, and equally nuanced. Unlike many North Indian curries that rely on a tomato-onion base, the Kori Curry is built on freshly grated coconut that is toasted to different degrees, blended with Byadagi chillies (which give the curry its deep crimson colour without excessive heat), coriander seeds, peppercorns, cloves, and the key aromatic — the Kalpasi or stone flower.
            </p>
            <p className="mt-5">
              The chicken is traditionally made with free-range country chicken (naati koli), which has a firmer texture and more concentrated flavour than commercial broiler chicken. The fat used is almost exclusively cold-pressed coconut oil — never refined oils — which gives the finished curry a subtle nuttiness.
            </p>
            <p className="mt-5">
              The curry is intentionally left slightly thin in consistency, because it needs to soak into the rotti wafers. A thick, restaurant-style gravy would make the rotti soggy; the thinner consistency allows it to absorb gradually, creating layers of soft (curry-soaked) and crispy (still dry) texture in every bite.
            </p>

            {/* INLINE PRODUCT CARD 1 */}
            <InlineProductCard product={INLINE_PRODUCTS[0]} />

            {/* ── Section 4: How to Eat ── */}
            <h2
              className="font-headline font-bold mt-10 mb-5"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              How to Eat Kori Rotti (The Right Way)
            </h2>
            <p>
              Eating Kori Rotti is an experience in itself. The rotti is served dry, either whole or broken into large pieces, on a banana leaf or a plate. The curry is served separately, hot and steaming, in a bowl on the side. You break a piece of rotti, dip it into the curry, and eat quickly — not because you're in a hurry, but because the magic lies in catching the rotti at just the right moment of saturation.
            </p>
            <p className="mt-5">
              Too quickly and the rotti is still bone dry and crackers; too slowly and it becomes completely mushy. The perfection lies in between — when the outside is slightly soft from the curry but the centre still has that satisfying crunch. Most Mangaloreans achieve this instinctively, having eaten it since childhood. First-timers often pour the entire curry over the rotti upfront and wonder why it tastes different from what they expected.
            </p>
            <p className="mt-5">
              Traditionally, Kori Rotti is eaten with your right hand. A banana-leaf serving, a mound of rice rotti, a bowl of deep red curry, and perhaps a side of Pachadi (coconut chutney) or Sol Kadi (kokum-coconut milk drink) — that's the full Mangalorean experience.
            </p>

            {/* Article image 2 */}
            <ArticleImage
              src="https://images.unsplash.com/photo-1710857389305-5cba9211033f?auto=format&fit=crop&w=900&q=85"
              alt="An overhead shot of the Kori Rotti spice blend — whole Byadagi chillies, peppercorns, coriander seeds, cloves, and stone flower laid out before grinding"
              hint="indian spices chilli pepper"
              caption="The spice blend for authentic Kori Curry — whole Byadagi chillies are the backbone, providing colour without overwhelming heat."
            />

            {/* ── Section 5: At Home ── */}
            <h2
              className="font-headline font-bold mt-10 mb-5"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              Making Kori Rotti at Home
            </h2>
            <p>
              If you want to make Kori Rotti at home, the good news is that you don't have to make the rotti from scratch. Authentic, hand-made Kori Rotti wafers are available from Mangalorean food brands, including right here at Karavali Mangalore Store. We source ours directly from home-based producers in Mangalore, ensuring they're made the traditional way — no preservatives, no artificial additives, just rice, water, and the skill of the maker.
            </p>
            <p className="mt-5">
              For the curry, the recipe has three key steps: making the spice paste (grinding toasted coconut with chillies and aromatics), cooking the chicken to near-done in this paste, and finishing with fresh coconut oil and curry leaves. A Ghee Roast Masala or a dedicated Kori Curry masala powder can significantly simplify the process without compromising authenticity.
            </p>

            {/* INLINE PRODUCT CARD 2 */}
            <InlineProductCard product={INLINE_PRODUCTS[1]} />

            {/* ── Section 6: Cultural significance ── */}
            <h2
              className="font-headline font-bold mt-10 mb-5"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              Kori Rotti's Place in Mangalorean Culture
            </h2>
            <p>
              No Mangalorean wedding is complete without Kori Rotti. No homecoming celebration, no major festival meal in a Tulu-speaking household would feel right without it. It is the dish that Mangaloreans describe to outsiders when asked "what is your regional food?" — and it rarely fails to impress.
            </p>
            <p className="mt-5">
              In Bengaluru, where hundreds of thousands of Mangaloreans have settled, a small but thriving ecosystem of Mangalorean restaurants and home-food services has emerged specifically to cater to the craving for Kori Rotti. In cities like Mumbai and Pune, Mangalorean food festivals regularly feature it as the headline dish.
            </p>
            <p className="mt-5">
              More recently, with the rise of D2C food brands and the ability to ship authentic ingredients across India, Kori Rotti has crossed regional borders entirely. People across the country are discovering it — and falling in love with it — for the first time. That, perhaps, is the most exciting development in the story of this remarkable dish.
            </p>

          </article>

          {/* ── FAQ Section ─────────────────────────────────────── */}
          <section className="mt-14" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="font-headline font-bold mb-6"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              Frequently Asked Questions
            </h2>
            <FaqAccordion faqs={FAQS} />
          </section>

          {/* ── Mobile sidebar — below article, above FAQ ─────── */}
          <section className="mt-12 lg:hidden" aria-label="Products you might like">
            <h3
              className="font-headline font-bold mb-5"
              style={{ fontSize: '1.25rem', color: C.text }}
            >
              You Might Like
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {SIDEBAR_PRODUCTS.map((p) => (
                <SidebarProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>

        </main>

        {/* ── Sticky Sidebar (desktop only) ────────────────────── */}
        <aside
          className="hidden lg:block w-72 flex-shrink-0"
          aria-label="You might like"
        >
          <div className="sticky top-24 space-y-5">
            <h3
              className="font-headline font-bold"
              style={{ fontSize: '1.2rem', color: C.text }}
            >
              You Might Like
            </h3>
            {SIDEBAR_PRODUCTS.map((p) => (
              <SidebarProductCard key={p.id} product={p} />
            ))}

            {/* Share prompt */}
            <div
              className="rounded-xl border p-4 text-center space-y-2"
              style={{ borderColor: C.border, backgroundColor: C.card }}
            >
              <p className="font-body font-semibold text-sm" style={{ color: C.text }}>
                Enjoyed this article?
              </p>
              <p className="font-body text-xs" style={{ color: C.textMuted }}>
                Share it with your foodie friends!
              </p>
              <div className="flex gap-2 justify-center flex-wrap">
                {['WhatsApp', 'Twitter', 'Copy Link'].map((s) => (
                  <button
                    key={s}
                    className="font-body text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors duration-200 hover:bg-[hsl(147,50%,36%)] hover:text-[#FDFAF6] hover:border-[hsl(147,50%,36%)]"
                    style={{ borderColor: C.border, color: C.textMuted }}
                    onClick={() => {}}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* ── End CTA Banner ────────────────────────────────────────── */}
      <section
        className="py-14 text-center px-4"
        style={{
          background: 'linear-gradient(135deg, #F5E6C8 0%, #EDD9A3 40%, #F0E0B0 100%)',
        }}
        aria-label="Shop CTA"
      >
        <p
          className="font-body font-semibold uppercase tracking-widest text-xs mb-3"
          style={{ color: C.terracotta, letterSpacing: '0.18em' }}
        >
          Taste the Coast
        </p>
        <h2
          className="font-headline font-bold leading-tight mb-4"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: C.brown }}
        >
          Ready to taste authentic<br />Mangalorean food?
        </h2>
        <p
          className="font-body max-w-md mx-auto mb-8"
          style={{ color: '#6B4C1C', fontSize: '1rem' }}
        >
          From Kori Rotti wafers to fresh spice masalas — everything you need is delivered to your door.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            href="/category/all"
            className="inline-flex items-center gap-2 font-body font-bold px-8 py-3.5 rounded-full transition-all duration-200 hover:scale-105 active:scale-95 shadow-lg"
            style={{ backgroundColor: C.brown, color: '#F5E6C8' }}
          >
            Shop Now
          </a>
          <a
            href="/category/all"
            className="inline-flex items-center gap-2 font-body font-bold px-8 py-3.5 rounded-full border-2 transition-all duration-200 hover:scale-105 active:scale-95"
            style={{ borderColor: C.brown, color: C.brown, backgroundColor: 'transparent' }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = C.brown;
              e.currentTarget.style.color = '#F5E6C8';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
              e.currentTarget.style.color = C.brown;
            }}
          >
            Browse All Products
          </a>
        </div>
      </section>

      {/* ── Related Posts ─────────────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-4 py-14"
        aria-labelledby="related-posts-heading"
      >
        <h2
          id="related-posts-heading"
          className="font-headline font-bold mb-8"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
        >
          More From Our Kitchen
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {RELATED_POSTS.map((post) => (
            <RelatedPostCard key={post.slug} post={post} />
          ))}
        </div>
      </section>

      {/* ── Related Products Row ──────────────────────────────────── */}
      <section
        className="py-10 pb-16"
        style={{ backgroundColor: '#FEF3C7' }}
        aria-labelledby="related-products-heading"
      >
        <div className="max-w-6xl mx-auto px-4">
          <h2
            id="related-products-heading"
            className="font-headline font-bold mb-6"
            style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
          >
            You May Also Like
          </h2>
          <div className="flex gap-4 overflow-x-auto pb-4 no-scrollbar">
            {RELATED_PRODUCTS.map((product) => (
              <RelatedProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>

    </div>
  );
}
