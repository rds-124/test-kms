'use client';

import { useState } from 'react';
import Image from 'next/image';

// ─── Types ───────────────────────────────────────────────────────────────────

type Category = 'All' | 'Recipes' | 'Food Culture' | 'Product Guides' | 'Festivals & Occasions';

interface BlogPost {
  id: number;
  slug: string;
  title: string;
  excerpt: string;
  category: Exclude<Category, 'All'>;
  author: string;
  date: string;
  readTime: string;
  coverColor: string;
  emoji: string;
  featured?: boolean;
  // Real posts
  imageUrl?: string;
  imageHint?: string;
  prepTime?: string;
  serves?: string;
}

// ─── Dummy Data ───────────────────────────────────────────────────────────────

const ALL_POSTS: BlogPost[] = [
  // 1 — Featured post (real)
  {
    id: 1,
    slug: 'what-is-kori-rotti',
    title: "What is Kori Rotti? The Complete Guide to Mangalore's Most Iconic Dish",
    excerpt:
      "Kori Rotti is one of Coastal Karnataka's most beloved dishes — crispy rice wafers served with rich, spiced chicken curry. Here's everything you need to know.",
    category: 'Food Culture',
    author: 'Meena Shetty',
    date: '19 Mar 2026',
    readTime: '5 min read',
    coverColor: 'from-amber-700 to-orange-900',
    emoji: '🍛',
    featured: true,
    imageUrl: 'https://images.unsplash.com/photo-1603284845744-9ffce8a7c8c4?auto=format&fit=crop&w=900&q=80',
    imageHint: 'kori rotti crispy rice wafers coastal food',
  },
  // Recipes — first card is real
  {
    id: 2,
    slug: 'kori-rotti-kori-gassi',
    title: 'Kori Rotti with Kori Gassi — Authentic Mangalorean Chicken Curry Recipe',
    excerpt:
      'The ultimate Mangalorean comfort meal. Crispy Kori Rotti soaked in a rich coconut-based Kori Gassi — here\'s how to make it at home, the authentic Coastal Karnataka way.',
    category: 'Recipes',
    author: 'Meena Shetty',
    date: '19 Mar 2026',
    readTime: '8 min read',
    coverColor: 'from-red-700 to-orange-900',
    emoji: '🍛',
    imageUrl: 'https://images.unsplash.com/photo-1603284845744-9ffce8a7c8c4?auto=format&fit=crop&w=900&q=80',
    imageHint: 'chicken curry kori gassi coconut mangalorean food',
    prepTime: '30 min',
    serves: 'Serves 4',
  },
  {
    id: 3,
    slug: 'neer-dosa-recipe',
    title: 'Neer Dosa Recipe: The Delicate Rice Crepe from the Coast',
    excerpt:
      'Gossamer-thin, silky-soft, and made from just soaked rice — Neer Dosa is the simplest yet most elegant breakfast from Coastal Karnataka.',
    category: 'Recipes',
    author: 'Savitha Rao',
    date: '28 Feb 2025',
    readTime: '5 min read',
    coverColor: 'from-stone-500 to-stone-700',
    emoji: '🫓',
  },
  {
    id: 4,
    slug: 'goli-baje-recipe',
    title: 'Goli Baje Recipe: The Ultimate Mangalorean Teatime Snack',
    excerpt:
      'These pillowy, golden-fried fritters made with maida and sour curd are Mangalore\'s answer to every rainy afternoon. Serve hot with coconut chutney.',
    category: 'Recipes',
    author: 'Anitha Kamath',
    date: '20 Feb 2025',
    readTime: '4 min read',
    coverColor: 'from-orange-600 to-amber-700',
    emoji: '🎈',
  },
  {
    id: 5,
    slug: 'bangude-pullimunchi-recipe',
    title: 'Bangude Pullimunchi: Mackerel in a Tangy Kokum Curry',
    excerpt:
      'Bold, sour, and fiery — Bangude Pullimunchi is the kind of fish curry that makes you forget everything else. A step-by-step guide to mastering this Coastal classic.',
    category: 'Recipes',
    author: 'Meena Shetty',
    date: '14 Feb 2025',
    readTime: '7 min read',
    coverColor: 'from-red-700 to-rose-900',
    emoji: '🐟',
  },
  // Food Culture (3 posts)
  {
    id: 6,
    slug: '17-things-mangaloreans-in-bengaluru',
    title: '17 Things Only Mangaloreans in Bengaluru Will Understand',
    excerpt:
      'From desperately hunting for authentic Kori Rotti to explaining what Tulu means — the Mangalorean immigrant experience in Bengaluru is something else entirely.',
    category: 'Food Culture',
    author: 'Rohit Alva',
    date: '8 Mar 2025',
    readTime: '9 min read',
    coverColor: 'from-violet-700 to-purple-900',
    emoji: '🏙️',
  },
  {
    id: 7,
    slug: 'history-of-mangalorean-buns',
    title: 'The Fascinating History of the Mangalorean Bun',
    excerpt:
      'Sweet, fluffy, and deep-fried — the Mangalorean Bun has a rich history tied to the region\'s culinary melting pot. Here\'s where it came from and why everyone loves it.',
    category: 'Food Culture',
    author: 'Rohit Alva',
    date: '1 Mar 2025',
    readTime: '5 min read',
    coverColor: 'from-amber-500 to-yellow-700',
    emoji: '🫓',
  },
  {
    id: 8,
    slug: 'coconut-coast-food-culture',
    title: 'How the Coconut Shapes Every Meal on the Karavali Coast',
    excerpt:
      'From the coconut oil in your curry to the fresh grated coconut in the chutney — no ingredient is more sacred to Coastal Karnataka cuisine than the humble coconut.',
    category: 'Food Culture',
    author: 'Anitha Kamath',
    date: '22 Feb 2025',
    readTime: '6 min read',
    coverColor: 'from-green-600 to-teal-800',
    emoji: '🥥',
  },
  // Product Guides (2 posts)
  {
    id: 9,
    slug: 'guide-to-mangalorean-pickles',
    title: 'Your Complete Guide to Mangalorean Pickles & Chutneys',
    excerpt:
      'From fiery raw mango pickle to the subtle sweetness of tamarind chutney — we break down every bottle in our collection and how to pair them with your meals.',
    category: 'Product Guides',
    author: 'Savitha Rao',
    date: '10 Mar 2025',
    readTime: '7 min read',
    coverColor: 'from-lime-600 to-green-800',
    emoji: '🫙',
  },
  {
    id: 10,
    slug: 'choosing-best-rice-flour',
    title: 'How to Choose the Best Rice Flour for Dosas and Chakli',
    excerpt:
      'Not all rice flours are created equal. We explain the difference between raw rice flour, idli rice flour, and par-boiled rice flour — and which to use when.',
    category: 'Product Guides',
    author: 'Meena Shetty',
    date: '3 Mar 2025',
    readTime: '5 min read',
    coverColor: 'from-gray-500 to-stone-700',
    emoji: '🌾',
  },
  // Festivals & Occasions (2 posts)
  {
    id: 11,
    slug: 'ugadi-special-dishes',
    title: 'Ugadi Special Dishes from Coastal Karnataka You Must Try',
    excerpt:
      'Ugadi marks the New Year with new beginnings — and the food on the table reflects that perfectly. Here are the traditional dishes that grace every Mangalorean home on this auspicious day.',
    category: 'Festivals & Occasions',
    author: 'Anitha Kamath',
    date: '6 Mar 2025',
    readTime: '6 min read',
    coverColor: 'from-pink-600 to-rose-800',
    emoji: '🌸',
  },
  {
    id: 12,
    slug: 'christmas-on-the-karavali-coast',
    title: 'Christmas on the Karavali Coast: A Catholic Food Tradition',
    excerpt:
      'Rose cookies, Kuswar platters, and rich coconut milk desserts — Christmas in Mangalore is a culinary event unlike anywhere else in India. A celebration of the region\'s Catholic food heritage.',
    category: 'Festivals & Occasions',
    author: 'Rohit Alva',
    date: '25 Dec 2024',
    readTime: '8 min read',
    coverColor: 'from-red-600 to-green-800',
    emoji: '🎄',
  },
];

const CATEGORIES: Category[] = ['All', 'Recipes', 'Food Culture', 'Product Guides', 'Festivals & Occasions'];

const INITIAL_VISIBLE = 9;
const LOAD_MORE_COUNT = 6;

// ─── Sub-components ───────────────────────────────────────────────────────────

function CategoryTag({ category, small = false }: { category: string; small?: boolean }) {
  return (
    <span
      className={`inline-block font-body font-semibold uppercase tracking-wider rounded-full ${
        small
          ? 'text-[10px] px-2.5 py-0.5'
          : 'text-xs px-3 py-1'
      }`}
      style={{
        backgroundColor: 'hsl(18, 56%, 53%)',
        color: '#FDFAF6',
        letterSpacing: '0.06em',
      }}
    >
      {category}
    </span>
  );
}

function PostMeta({ author, date, readTime, small = false }: { author: string; date: string; readTime: string; small?: boolean }) {
  return (
    <div
      className={`flex items-center gap-2 font-body ${small ? 'text-xs' : 'text-sm'}`}
      style={{ color: '#8B6914' }}
    >
      <span className="font-medium" style={{ color: '#5C3D0F' }}>{author}</span>
      <span style={{ color: '#C9A96E' }}>·</span>
      <span>{date}</span>
      <span style={{ color: '#C9A96E' }}>·</span>
      <span>{readTime}</span>
    </div>
  );
}

function ReadMoreLink({ href }: { href: string }) {
  return (
    <a
      href={href}
      className="inline-flex items-center gap-1 font-body font-semibold text-sm group transition-all duration-200"
      style={{ color: 'hsl(18, 56%, 53%)' }}
    >
      Read More
      <span
        className="inline-block transition-transform duration-200 group-hover:translate-x-1"
        aria-hidden="true"
      >
        →
      </span>
    </a>
  );
}

function CoverImage({
  post,
  aspectClass,
  roundedClass,
}: {
  post: BlogPost;
  aspectClass: string;
  roundedClass?: string;
}) {
  if (post.imageUrl) {
    return (
      <div className={`w-full ${aspectClass} ${roundedClass ?? ''} overflow-hidden relative flex-shrink-0`}>
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          data-ai-hint={post.imageHint}
          sizes="(max-width: 768px) 100vw, 50vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>
    );
  }
  return (
    <div
      className={`w-full ${aspectClass} ${roundedClass ?? ''} overflow-hidden relative flex-shrink-0 bg-gradient-to-br ${post.coverColor}`}
    >
      {/* Subtle warm texture overlay */}
      <div
        className="absolute inset-0 opacity-20"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg'%3e%3cfilter id='n'%3e%3cfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/%3e%3cfeColorMatrix values='0 0 0 0 0.9 0 0 0 0 0.7 0 0 0 0 0.3 0 0 0 0.25 0'/%3e%3c/filter%3e%3crect width='100%25' height='100%25' filter='url(%23n)'/%3e%3c/svg%3e\")",
        }}
      />
      {/* Big centred emoji */}
      <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
        <span
          className="text-white/30 filter drop-shadow-lg"
          style={{ fontSize: 'clamp(3rem, 10vw, 6rem)' }}
          aria-hidden
        >
          {post.emoji}
        </span>
      </div>
      {/* Subtle gradient vignette from bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
    </div>
  );
}

// ─── URL helper ──────────────────────────────────────────────────────────────

function categorySegment(category: string): string {
  const map: Record<string, string> = {
    Recipes: 'recipes',
    'Food Culture': 'food-culture',
    'Product Guides': 'product-guides',
    'Festivals & Occasions': 'festivals',
  };
  return map[category] ?? 'food-culture';
}

// ─── Featured Post Card ───────────────────────────────────────────────────────

function FeaturedCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="group rounded-2xl overflow-hidden shadow-lg border transition-all duration-300 hover:shadow-2xl hover:-translate-y-0.5"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E8D9BE',
      }}
    >
      {/* Hero image — 16:9 */}
      <div className="relative">
        <CoverImage post={post} aspectClass="aspect-video" />
        {/* Category tag overlaid on image */}
        <div className="absolute top-4 left-4 z-10">
          <CategoryTag category={post.category} />
        </div>
      </div>

      {/* Content */}
      <div className="p-6 md:p-8 space-y-4">
        <div className="inline-flex items-center gap-2 text-xs font-body font-semibold uppercase tracking-widest" style={{ color: 'hsl(18, 56%, 53%)' }}>
          <span className="w-6 h-px bg-current inline-block" />
          Featured Story
        </div>
        <h2
          className="font-headline font-bold leading-tight line-clamp-2 transition-colors duration-200 group-hover:text-[hsl(18,56%,53%)]"
          style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: '#1C1008' }}
        >
          {post.title}
        </h2>
        <p
          className="font-body leading-relaxed line-clamp-2"
          style={{ color: '#5C3D0F', fontSize: '0.97rem' }}
        >
          {post.excerpt}
        </p>
        <div className="flex items-center justify-between flex-wrap gap-3 pt-1">
          <PostMeta author={post.author} date={post.date} readTime={post.readTime} />
          <ReadMoreLink href={`/blog/${categorySegment(post.category)}/${post.slug}`} />
        </div>
      </div>
    </article>
  );
}

// ─── Blog Post Grid Card ──────────────────────────────────────────────────────

function BlogCard({ post }: { post: BlogPost }) {
  return (
    <article
      className="group flex flex-col rounded-2xl overflow-hidden shadow-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
      style={{
        backgroundColor: '#FFFFFF',
        borderColor: '#E8D9BE',
      }}
    >
      {/* Cover image — 3:2 ratio */}
      <div className="relative flex-shrink-0">
        <CoverImage post={post} aspectClass="aspect-[3/2]" roundedClass="rounded-t-2xl rounded-b-none" />
        {/* Category pill on image (top-left) */}
        <div className="absolute top-3 left-3 z-10">
          <CategoryTag category={post.category} small />
        </div>
        {/* Recipe badge (bottom-left) — only for recipe posts with prepTime */}
        {post.prepTime && (
          <div className="absolute bottom-3 left-3 z-10">
            <span
              className="inline-block font-body font-bold uppercase text-[9px] tracking-widest px-2 py-0.5 rounded-full"
              style={{ backgroundColor: '#3D1F00', color: '#FDFAF6', letterSpacing: '0.08em' }}
            >
              Recipe
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-col flex-1 p-5 space-y-3">
        <h3
          className="font-headline font-bold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[hsl(18,56%,53%)]"
          style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', color: '#1C1008' }}
        >
          {post.title}
        </h3>
        <p
          className="font-body leading-relaxed line-clamp-2 text-sm flex-1"
          style={{ color: '#7A5630' }}
        >
          {post.excerpt}
        </p>
        <div className="pt-1 flex items-center justify-between flex-wrap gap-2">
          <div className="flex flex-col gap-1">
            <PostMeta author={post.author} date={post.date} readTime={post.readTime} small />
            {/* Recipe meta row */}
            {post.prepTime && (
              <p className="font-body text-xs" style={{ color: '#C9A96E' }}>
                🕐 {post.prepTime}&nbsp;&nbsp;👥 {post.serves}
              </p>
            )}
          </div>
          <ReadMoreLink href={`/blog/${categorySegment(post.category)}/${post.slug}`} />
        </div>
      </div>
    </article>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState<Category>('All');
  const [visibleCount, setVisibleCount] = useState(INITIAL_VISIBLE);

  const featuredPost = ALL_POSTS.find((p) => p.featured)!;

  // Non-featured posts filtered by category
  const gridPosts = ALL_POSTS.filter((p) => {
    if (p.featured) return false;
    if (activeCategory === 'All') return true;
    return p.category === activeCategory;
  });

  // When featured post matches the active category filter, show it in the grid too
  const showFeaturedInGrid =
    activeCategory !== 'All' && featuredPost.category === activeCategory;

  const allGridPosts = showFeaturedInGrid ? [featuredPost, ...gridPosts] : gridPosts;
  const visibleGridPosts = allGridPosts.slice(0, visibleCount);
  const hasMore = visibleCount < allGridPosts.length;

  const handleCategoryChange = (cat: Category) => {
    setActiveCategory(cat);
    setVisibleCount(INITIAL_VISIBLE);
  };

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + LOAD_MORE_COUNT);
  };

  const showFeaturedHero = activeCategory === 'All';

  return (
    <div
      className="min-h-screen"
      style={{ backgroundColor: '#FDFAF6', color: '#1C1008' }}
    >
      {/* ── Page Header ──────────────────────────────────────────── */}
      <section
        className="py-16 md:py-24 text-center relative overflow-hidden"
        style={{ backgroundColor: '#FDFAF6' }}
      >
        {/* Warm decorative pattern behind header */}
        <div
          className="absolute inset-0 pointer-events-none opacity-30"
          aria-hidden
          style={{
            backgroundImage:
              "radial-gradient(ellipse at 20% 50%, #D47C0F22 0%, transparent 60%), radial-gradient(ellipse at 80% 30%, #C9913322 0%, transparent 60%)",
          }}
        />
        <h1
          className="font-headline font-bold leading-tight px-4 relative"
          style={{
            fontSize: 'clamp(2rem, 6vw, 3.5rem)',
            color: '#1C1008',
            lineHeight: 1.2,
          }}
        >
          The Karavali Journal
        </h1>

        <p
          className="mt-5 font-body max-w-xl mx-auto px-6 leading-relaxed relative"
          style={{ color: '#7A5630', fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)' }}
        >
          Stories, recipes, and everything Coastal Karnataka food.
        </p>
      </section>

      {/* ── Category Filter Tabs ─────────────────────────────────── */}
      <div
        className="sticky top-0 z-30 border-b"
        style={{ backgroundColor: '#FDFAF6', borderColor: '#E8D9BE' }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div
            className="flex gap-1 overflow-x-auto md:overflow-x-visible md:flex-wrap no-scrollbar py-1"
            role="tablist"
            aria-label="Blog categories"
          >
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => handleCategoryChange(cat)}
                  className="relative flex-shrink-0 px-4 py-3 font-body font-medium text-sm md:text-base transition-colors duration-200 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(147,50%,36%)] rounded-sm"
                  style={{
                    color: isActive ? 'hsl(147, 50%, 36%)' : '#7A5630',
                  }}
                >
                  {cat}
                  {/* Saffron underline indicator */}
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full transition-all duration-300"
                    style={{
                      backgroundColor: 'hsl(147, 50%, 36%)',
                      opacity: isActive ? 1 : 0,
                      transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Main Content ─────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto px-4 py-10 md:py-14 space-y-12">

        {/* Featured Post — only shown on "All" tab */}
        {showFeaturedHero && (
          <section aria-label="Featured post">
            <FeaturedCard post={featuredPost} />
          </section>
        )}

        {/* Divider with label (only on All tab) */}
        {showFeaturedHero && allGridPosts.length > 0 && (
          <div className="flex items-center gap-4">
            <div className="flex-1 h-px" style={{ backgroundColor: '#E8D9BE' }} />
            <span
              className="font-body font-semibold uppercase tracking-widest text-xs flex-shrink-0"
              style={{ color: '#C9913A', letterSpacing: '0.14em' }}
            >
              More Stories
            </span>
            <div className="flex-1 h-px" style={{ backgroundColor: '#E8D9BE' }} />
          </div>
        )}

        {/* Blog Post Grid */}
        <div
          key={activeCategory}
          style={{ animation: 'blog-fade-in 200ms ease-out' }}
        >
          {visibleGridPosts.length > 0 ? (
            <section aria-label="Blog post grid">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {visibleGridPosts.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </section>
          ) : (
            <div className="text-center py-20">
              <p
                className="font-body text-base"
                style={{ color: '#7A5630' }}
              >
                More posts coming soon.
              </p>
            </div>
          )}
        </div>

        {/* Load More Button */}
        {hasMore && (
          <div className="text-center pt-4">
            <button
              onClick={handleLoadMore}
              className="inline-flex items-center gap-2 font-body font-semibold px-8 py-3 rounded-full border-2 transition-all duration-200 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(147,50%,36%)]"
              style={{
                borderColor: 'hsl(147, 50%, 36%)',
                color: 'hsl(147, 50%, 36%)',
                backgroundColor: 'transparent',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'hsl(147, 50%, 36%)';
                e.currentTarget.style.color = '#FDFAF6';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'hsl(147, 50%, 36%)';
              }}
            >
              Load More Stories
            </button>
          </div>
        )}

      </main>

      {/* ── Footer Banner (blog-specific) ────────────────────────── */}
      <section
        className="mt-16 py-12 text-center"
        style={{
          background: 'linear-gradient(135deg, #3D1F00 0%, #6B3A10 50%, #3D1F00 100%)',
        }}
      >
        <p
          className="font-headline text-xl md:text-2xl font-bold mb-2"
          style={{ color: '#F5DEB3' }}
        >
          🍲 Want more from our kitchen?
        </p>
        <p
          className="font-body text-sm md:text-base mb-6"
          style={{ color: '#C9A96E' }}
        >
          Shop authentic Mangalorean ingredients and ready-to-eat products.
        </p>
        <a
          href="/category/all"
          className="inline-flex items-center gap-2 font-body font-bold px-8 py-3 rounded-full transition-all duration-200 hover:opacity-90 hover:scale-105 active:scale-95"
          style={{ backgroundColor: 'hsl(147, 50%, 36%)', color: '#FDFAF6' }}
        >
          Shop Now →
        </a>
      </section>

      {/* ── Scrollbar hide utility ────────────────────────────────── */}
      {/* eslint-disable-next-line react/no-unknown-property */}
      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes blog-fade-in {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
