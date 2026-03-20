'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
  ChevronDown,
  ChevronRight,
  Clock,
  Flame,
  Users,
  BarChart3,
  Bookmark,
  Share2,
  ShoppingCart,
  Check,
} from 'lucide-react';

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
  saffronPale: '#FEF3C7',
  card: '#FFFFFF',
  border: '#E8D9BE',
  brown: '#3D1F00',
};

// ─── Types ────────────────────────────────────────────────────────────────────

interface IngredientGroup {
  heading: string;
  items: string[];
}

interface Step {
  instruction: string;
  imageAfter?: { src: string; alt: string; hint: string; caption: string };
}

interface RecipeProduct {
  id: string;
  name: string;
  kannadaName: string;
  description?: string;
  price: number;
  salePrice?: number;
  badge?: { label: string; color: string };
  imageUrl: string;
  imageHint: string;
  href: string;
}

interface MoreRecipe {
  slug: string;
  title: string;
  cookTime: string;
  serves: string;
  category: string;
  coverGradient: string;
  emoji: string;
  author: string;
}

interface FaqItem {
  q: string;
  a: string;
}

// ─── Static recipe data ───────────────────────────────────────────────────────

const RECIPE_META = {
  title: 'Kori Rotti with Kori Gassi — Authentic Mangalorean Chicken Curry',
  description:
    'The definitive Mangalorean recipe: sun-dried rice wafers served alongside a deeply spiced, coconut-rich chicken curry — made exactly the way it has been for generations.',
  category: 'Recipe',
  author: 'Meena Shetty',
  date: '12 March 2025',
  prepTime: '30 min',
  cookTime: '45 min',
  serves: '4 people',
  difficulty: 'Intermediate',
  heroImage: {
    src: 'https://images.unsplash.com/photo-1603284845744-9ffce8a7c8c4?auto=format&fit=crop&w=1400&q=85',
    alt: 'A traditional Kori Rotti serving — crispy rice wafers in a copper plate alongside a vibrant Kori Gassi curry in an earthen vessel, garnished with fresh curry leaves and served on a banana leaf',
    hint: 'chicken curry rice wafers coastal food',
  },
};

const INGREDIENT_GROUPS: IngredientGroup[] = [
  {
    heading: 'For the Kori Gassi (Chicken Curry)',
    items: [
      '750g country chicken (naati koli), cut into medium pieces',
      '2 medium onions, roughly chopped',
      '1½ cups fresh coconut, grated',
      '8–10 Byadagi dry red chillies (adjust to taste)',
      '1 tsp whole coriander seeds',
      '½ tsp black peppercorns',
      '3 cloves',
      '1 small piece cinnamon (1-inch)',
      '2 Kalpasi (stone flower) pieces',
      '1 tsp tamarind paste (or a small marble-sized piece soaked in water)',
      '2 tbsp cold-pressed coconut oil',
      '10–12 fresh curry leaves',
      'Salt to taste',
    ],
  },
  {
    heading: 'For the Onion Tempering',
    items: [
      '1 medium onion, thinly sliced',
      '1 tbsp coconut oil',
    ],
  },
  {
    heading: 'For Serving',
    items: [
      '400g Kori Rotti rice wafers (1 packet)',
      'Fresh coriander leaves for garnish',
      'Banana leaf (optional, for traditional serving)',
    ],
  },
];

const STEPS: Step[] = [
  {
    instruction:
      'Toast the coconut and spices: In a dry heavy-bottomed pan over medium heat, toast the grated coconut, stirring continuously, until it turns a deep golden-brown (about 5–7 minutes). It should smell nutty and look well-roasted — this step gives the curry its characteristic Mangalorean depth. Set aside to cool.',
  },
  {
    instruction:
      'In the same pan, dry-roast the Byadagi chillies, coriander seeds, peppercorns, cloves, cinnamon, and Kalpasi for 2–3 minutes until fragrant. Be careful not to burn the spices — remove from heat as soon as you smell them.',
  },
  {
    instruction:
      'Grind the masala: Once cooled, grind the toasted coconut and roasted spices together with the tamarind paste and a little water into a smooth, thick paste. This is your Gassi masala. It should be a deep reddish-brown colour with an intensely aromatic smell.',
    imageAfter: {
      src: 'https://images.unsplash.com/photo-1710857389305-5cba9211033f?auto=format&fit=crop&w=900&q=85',
      alt: 'The freshly ground Kori Gassi masala paste — a deep reddish-brown smooth paste made from toasted coconut, Byadagi chillies, and whole spices in a stone grinder',
      hint: 'indian spice masala paste grinding',
      caption: 'The freshly ground Gassi masala — the depth of colour comes from perfectly roasted coconut and Byadagi chillies.',
    },
  },
  {
    instruction:
      'Cook the chicken: In a large, heavy pot, heat 2 tbsp coconut oil over medium-high heat. Add the roughly chopped onions and fry until translucent and lightly golden, about 6–8 minutes. Add the chicken pieces and stir-fry for 3–4 minutes to seal the meat.',
  },
  {
    instruction:
      'Add the ground Gassi masala to the pot with the chicken. Stir well to coat each piece of chicken. Add 1½ cups of water and mix everything together. Bring to a boil, then reduce the heat, cover, and simmer for 25–30 minutes until the chicken is cooked through and the oil begins to separate at the top.',
  },
  {
    instruction:
      'Prepare the onion tempering: In a small pan, heat 1 tbsp coconut oil over high heat. Add the thinly sliced onion and fry, stirring frequently, until the slices are deep golden-brown and slightly crispy — about 8–10 minutes. Add the curry leaves in the last minute; they will crackle and become crisp.',
    imageAfter: {
      src: 'https://images.unsplash.com/photo-1604719312566-8912e9227c6a?auto=format&fit=crop&w=900&q=85',
      alt: 'Golden-fried onion slices in a cast iron pan with fresh curry leaves — the final tempering before adding to the Kori Gassi curry',
      hint: 'fried onions pan cooking',
      caption: 'The onion tempering is the finishing touch — the crispy onions dissolve into the curry and add a sweet, caramelised note.',
    },
  },
  {
    instruction:
      'Finish the curry: Pour the sizzling onion tempering directly into the simmering curry and stir. Taste and adjust salt. The curry should be moderately thin in consistency — this is critical, as it needs to soak into the Rotti wafers. If too thick, add a little water. Let it simmer together for 5 more minutes.',
  },
  {
    instruction:
      'Serve immediately: Break the Kori Rotti wafers into large pieces and place them in a plate or banana leaf. Serve the hot Kori Gassi in a bowl alongside. Let guests dip the rotti into the curry as they eat — the wafers should absorb the curry gradually, not be pre-soaked. Garnish with fresh coriander.',
  },
];

const INLINE_PRODUCT: RecipeProduct = {
  id: 'kori-rotti-400g',
  name: 'Traditional Kori Rotti (Rice Wafers)',
  kannadaName: 'ಕೋರಿ ರೊಟ್ಟಿ',
  description: 'Sun-dried, hand-made crispy rice wafers sourced from Mangalore — 400g',
  price: 149,
  salePrice: 120,
  badge: { label: 'Best Seller', color: '#CA8A04' },
  imageUrl:
    'https://images.unsplash.com/photo-1603284845744-9ffce8a7c8c4?auto=format&fit=crop&w=400&q=80',
  imageHint: 'rice crackers wafers',
  href: '/product/kori-rotti-400g',
};

const SIDEBAR_PRODUCTS: RecipeProduct[] = [
  {
    id: 'kori-rotti-pack',
    name: 'Traditional Kori Rotti',
    kannadaName: 'ಕೋರಿ ರೊಟ್ಟಿ',
    price: 149,
    salePrice: 120,
    badge: { label: 'Best Seller', color: '#CA8A04' },
    imageUrl:
      'https://images.unsplash.com/photo-1603284845744-9ffce8a7c8c4?auto=format&fit=crop&w=400&q=80',
    imageHint: 'rice wafers crackers',
    href: '/product/kori-rotti-400g',
  },
  {
    id: 'kori-gassi-masala',
    name: 'Kori Gassi Masala Powder',
    kannadaName: 'ಕೋರಿ ಗಸ್ಸಿ ಮಸಾಲ',
    price: 99,
    badge: { label: 'Popular', color: '#7C3AED' },
    imageUrl:
      'https://images.unsplash.com/photo-1710857389305-5cba9211033f?auto=format&fit=crop&w=400&q=80',
    imageHint: 'masala spice powder',
    href: '/product/kori-gassi-masala-100g',
  },
  {
    id: 'coconut-oil',
    name: 'Cold-Pressed Coconut Oil',
    kannadaName: 'ತೆಂಗಿನ ಎಣ್ಣೆ',
    price: 249,
    salePrice: 199,
    badge: { label: 'New Arrival', color: '#16A34A' },
    imageUrl:
      'https://images.unsplash.com/photo-1588413333412-82148535db53?auto=format&fit=crop&w=400&q=80',
    imageHint: 'coconut oil bottle',
    href: '/product/cold-pressed-coconut-oil-500ml',
  },
];

const RELATED_PRODUCTS: RecipeProduct[] = [
  ...SIDEBAR_PRODUCTS,
  {
    id: 'byadagi-chilli',
    name: 'Byadagi Dry Red Chillies',
    kannadaName: 'ಬ್ಯಾಡಗಿ ಮೆಣಸಿನಕಾಯಿ',
    price: 79,
    badge: { label: 'Popular', color: '#7C3AED' },
    imageUrl:
      'https://images.unsplash.com/photo-1696516044148-2fa85af03395?auto=format&fit=crop&w=400&q=80',
    imageHint: 'red chilli pepper dried',
    href: '/product/byadagi-dry-red-chilli-100g',
  },
];

const MORE_RECIPES: MoreRecipe[] = [
  {
    slug: 'neer-dosa-recipe',
    title: 'Neer Dosa — The Gossamer Rice Crepe',
    cookTime: '15 min',
    serves: '2–3',
    category: 'Recipe',
    coverGradient: 'linear-gradient(135deg, #44403C 0%, #78716C 100%)',
    emoji: '🫓',
    author: 'Savitha Rao',
  },
  {
    slug: 'mangalorean-chakli-recipe',
    title: 'Crispy Mangalorean Chakli — The Heirloom Snack',
    cookTime: '40 min',
    serves: '6–8',
    category: 'Recipe',
    coverGradient: 'linear-gradient(135deg, #92400E 0%, #B45309 100%)',
    emoji: '🌀',
    author: 'Anitha Kamath',
  },
  {
    slug: 'goli-baje-recipe',
    title: 'Goli Baje — Mangalorean Teatime Fritters',
    cookTime: '20 min',
    serves: '4',
    category: 'Recipe',
    coverGradient: 'linear-gradient(135deg, #C2410C 0%, #F97316 100%)',
    emoji: '🟡',
    author: 'Savitha Rao',
  },
];

const FAQS: FaqItem[] = [
  {
    q: 'Can I use regular chicken instead of country chicken?',
    a: 'Yes, broiler chicken works fine and is much easier to source. The main difference is texture and flavour — country chicken (naati koli) has a firmer bite and deeper, more concentrated flavour. If using broiler, reduce the cook time slightly (to about 15–18 minutes) to prevent it from becoming mushy.',
  },
  {
    q: 'How do I store leftover Kori Gassi?',
    a: 'The curry refrigerates well for 2–3 days in an airtight container. In fact, many Mangaloreans find the flavour improves the next day as the spices deepen overnight. Reheat gently on the stovetop with a splash of water — do not microwave, as it can break the coconut gravy. Store the Rotti wafers separately at room temperature.',
  },
  {
    q: 'Where can I buy authentic Kori Rotti wafers?',
    a: 'Authentic Kori Rotti wafers are available from Karavali Mangalore Store, sourced directly from home-based producers in Mangalore. We recommend our 400g pack, which is enough for 4 servings. They are shelf-stable for several months and can be shipped across India.',
  },
  {
    q: 'Can I make this recipe without fresh coconut?',
    a: "Fresh coconut is important for the authentic flavour, but you can substitute with desiccated (dried) coconut in a pinch. Use the same quantity and lightly toast it. The colour won't be as deep and the flavour will be slightly different, but the dish will still be delicious. Frozen grated coconut is the best alternative to fresh.",
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

function RecipeMetaBadge({
  icon: Icon,
  label,
  value,
}: {
  icon: React.FC<{ className?: string; style?: React.CSSProperties }>;
  label: string;
  value: string;
}) {
  return (
    <div
      className="flex items-center gap-2 px-4 py-2.5 rounded-full border font-body flex-shrink-0"
      style={{ backgroundColor: C.bg, borderColor: C.border }}
    >
      <Icon className="h-4 w-4 flex-shrink-0" style={{ color: C.terracotta }} />
      <div className="leading-none">
        <p className="text-[10px] font-semibold uppercase tracking-wider" style={{ color: C.textLight }}>
          {label}
        </p>
        <p className="text-sm font-bold mt-0.5" style={{ color: C.text }}>
          {value}
        </p>
      </div>
    </div>
  );
}

// ─── Interactive ingredient checklist ────────────────────────────────────────

function IngredientChecklist({ groups }: { groups: IngredientGroup[] }) {
  // Track which items are checked by a flat key: "groupIdx-itemIdx"
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      {groups.map((group, gi) => (
        <div key={gi}>
          {group.heading && (
            <h3
              className="font-body font-semibold text-sm uppercase tracking-widest mb-3"
              style={{ color: C.terracotta, letterSpacing: '0.1em' }}
            >
              {group.heading}
            </h3>
          )}
          <ul className="space-y-2">
            {group.items.map((item, ii) => {
              const key = `${gi}-${ii}`;
              const isChecked = checked.has(key);
              return (
                <li key={ii}>
                  <button
                    className="flex items-start gap-3 w-full text-left group focus-visible:outline-none"
                    onClick={() => toggle(key)}
                    aria-pressed={isChecked}
                  >
                    {/* Checkbox circle */}
                    <span
                      className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200"
                      style={{
                        borderColor: isChecked ? C.green : C.border,
                        backgroundColor: isChecked ? C.green : 'transparent',
                      }}
                    >
                      {isChecked && <Check className="h-3 w-3" style={{ color: C.bg }} />}
                    </span>
                    <span
                      className="font-body text-sm leading-relaxed transition-all duration-200"
                      style={{
                        color: isChecked ? C.textLight : C.text,
                        textDecoration: isChecked ? 'line-through' : 'none',
                        opacity: isChecked ? 0.6 : 1,
                      }}
                    >
                      {item}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      ))}
    </div>
  );
}

// ─── Instruction step card ────────────────────────────────────────────────────

function StepCard({
  step,
  index,
}: {
  step: Step;
  index: number;
}) {
  return (
    <div className="space-y-0">
      <div className="flex gap-4">
        {/* Step number circle */}
        <div
          className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-body font-bold text-sm mt-0.5"
          style={{ backgroundColor: C.green, color: C.bg }}
        >
          {index + 1}
        </div>
        {/* Instruction text */}
        <div
          className="flex-1 rounded-xl px-5 py-4 border"
          style={{ backgroundColor: C.card, borderColor: C.border }}
        >
          <p className="font-body leading-relaxed text-sm" style={{ color: C.text, lineHeight: 1.75 }}>
            {step.instruction}
          </p>
        </div>
      </div>
      {/* Optional image after this step */}
      {step.imageAfter && (
        <div className="ml-13 pl-[52px] mt-4">
          <figure>
            <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-md">
              <Image
                src={step.imageAfter.src}
                alt={step.imageAfter.alt}
                fill
                className="object-cover"
                data-ai-hint={step.imageAfter.hint}
              />
            </div>
            {step.imageAfter.caption && (
              <figcaption
                className="mt-2 text-center font-body text-xs italic"
                style={{ color: C.textMuted }}
              >
                {step.imageAfter.caption}
              </figcaption>
            )}
          </figure>
        </div>
      )}
    </div>
  );
}

// ─── Inline product CTA ───────────────────────────────────────────────────────

function InlineProductCard({ product }: { product: RecipeProduct }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div className="my-8">
      <div
        className="text-xs font-body font-bold uppercase tracking-widest mb-3 inline-flex items-center gap-1.5"
        style={{ color: C.terracotta }}
      >
        <span className="w-4 h-px bg-current" />
        Don't have this ingredient? We deliver it.
        <span className="w-4 h-px bg-current" />
      </div>
      <div
        className="flex gap-4 rounded-xl p-4 transition-shadow duration-200 hover:shadow-md"
        style={{
          backgroundColor: C.bg,
          border: `1px solid ${C.border}`,
          borderLeft: `4px solid ${C.terracotta}`,
        }}
      >
        <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
          <Image
            src={product.imageUrl}
            alt={product.name}
            fill
            className="object-cover"
            data-ai-hint={product.imageHint}
          />
        </div>
        <div className="flex flex-col flex-1 min-w-0 justify-between">
          <div>
            <p className="font-body font-semibold text-sm leading-snug" style={{ color: C.text }}>
              {product.name}
            </p>
            <p className="font-body text-xs mt-0.5" style={{ color: C.textLight }}>
              {product.kannadaName}
            </p>
            {product.description && (
              <p className="font-body text-xs mt-1.5 leading-relaxed" style={{ color: C.textMuted }}>
                {product.description}
              </p>
            )}
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
              onClick={() => { window.location.href = product.href; }}
            >
              Buy Now <ChevronRight className="h-3 w-3" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Sidebar product card ─────────────────────────────────────────────────────

function SidebarProductCard({ product }: { product: RecipeProduct }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex items-start gap-3 p-3 rounded-xl border transition-shadow duration-200 hover:shadow-md"
      style={{ backgroundColor: C.card, borderColor: C.border }}
    >
      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
        <Image
          src={product.imageUrl}
          alt={product.name}
          fill
          className="object-cover"
          data-ai-hint={product.imageHint}
        />
        {product.badge && (
          <span
            className="absolute top-1 left-1 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full leading-none"
            style={{ backgroundColor: product.badge.color }}
          >
            {product.badge.label}
          </span>
        )}
      </div>
      <div className="flex-1 min-w-0 flex flex-col gap-1">
        <p className="font-body font-semibold text-xs leading-snug line-clamp-2" style={{ color: C.text }}>
          {product.name}
        </p>
        <p className="font-body text-[11px]" style={{ color: C.textLight }}>{product.kannadaName}</p>
        <div className="flex items-center justify-between mt-1 gap-2 flex-wrap">
          <div className="flex items-baseline gap-1">
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
            className="font-body font-bold text-[10px] h-9 px-4 rounded-full border-2 transition-all duration-200 active:scale-95 flex-shrink-0"
            style={{
              borderColor: C.green,
              color: C.green,
              backgroundColor: hovered ? 'hsla(147, 50%, 36%, 0.2)' : 'hsla(147, 50%, 36%, 0.1)',
            }}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => { window.location.href = product.href; }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

// ─── FAQ accordion ────────────────────────────────────────────────────────────

function FaqAccordion({ faqs }: { faqs: FaqItem[] }) {
  const [openIdx, setOpenIdx] = useState<number | null>(null);
  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => {
        const isOpen = openIdx === i;
        return (
          <div
            key={i}
            className="rounded-xl border overflow-hidden transition-all duration-200"
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
              style={{ maxHeight: isOpen ? '500px' : '0px', opacity: isOpen ? 1 : 0 }}
            >
              <p className="px-5 pb-4 font-body text-sm leading-relaxed" style={{ color: C.textMuted }}>
                {faq.a}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

// ─── More recipe card ─────────────────────────────────────────────────────────

function MoreRecipeCard({ recipe }: { recipe: MoreRecipe }) {
  return (
    <Link
      href={`/blog/recipes/${recipe.slug}`}
      className="group flex flex-col rounded-2xl overflow-hidden shadow-md border transition-all duration-300 hover:shadow-xl hover:-translate-y-1 h-full"
      style={{ backgroundColor: C.card, borderColor: C.border }}
    >
      {/* Cover */}
      <div
        className="relative w-full aspect-[3/2] flex items-end overflow-hidden flex-shrink-0"
        style={{ background: recipe.coverGradient }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="text-white/25 select-none pointer-events-none"
            style={{ fontSize: 'clamp(3rem, 8vw, 4.5rem)' }}
            aria-hidden
          >
            {recipe.emoji}
          </span>
        </div>
        {/* Category + recipe meta badges */}
        <div className="absolute top-3 left-3">
          <span
            className="inline-block font-body font-bold uppercase tracking-wider rounded-full text-[10px] px-2.5 py-0.5"
            style={{ backgroundColor: C.terracotta, color: C.bg }}
          >
            {recipe.category}
          </span>
        </div>
        <div className="absolute bottom-3 left-3 flex items-center gap-2">
          <span
            className="inline-flex items-center gap-1 font-body text-[10px] font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: '#FEF3C7' }}
          >
            <Flame className="h-2.5 w-2.5" /> {recipe.cookTime}
          </span>
          <span
            className="inline-flex items-center gap-1 font-body text-[10px] font-semibold px-2 py-1 rounded-full"
            style={{ backgroundColor: 'rgba(0,0,0,0.45)', color: '#FEF3C7' }}
          >
            <Users className="h-2.5 w-2.5" /> {recipe.serves}
          </span>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
      </div>
      {/* Body */}
      <div className="flex flex-col flex-1 p-5 space-y-2">
        <h3
          className="font-headline font-bold leading-snug line-clamp-2 transition-colors duration-200 group-hover:text-[hsl(18,56%,53%)]"
          style={{ fontSize: 'clamp(0.95rem, 2vw, 1.1rem)', color: C.text }}
        >
          {recipe.title}
        </h3>
        <p className="font-body text-xs mt-auto" style={{ color: C.textMuted }}>
          By {recipe.author}
        </p>
      </div>
    </Link>
  );
}

// ─── Related horizontal product card ─────────────────────────────────────────

function RelatedProductCard({ product }: { product: RecipeProduct }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      className="flex-shrink-0 w-44 sm:w-52 flex flex-col rounded-xl overflow-hidden border shadow-md transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
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
          onClick={() => { window.location.href = product.href; }}
        >
          <ShoppingCart className="h-3 w-3" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ─── Save / Share button ──────────────────────────────────────────────────────

function OutlineButton({
  children,
  icon: Icon,
  onClick,
}: {
  children: React.ReactNode;
  icon: React.FC<{ className?: string }>;
  onClick?: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  return (
    <button
      className="flex-1 flex items-center justify-center gap-2 font-body font-semibold text-sm py-2.5 rounded-xl border-2 transition-all duration-200 active:scale-95"
      style={{
        borderColor: C.green,
        color: hovered ? C.bg : C.green,
        backgroundColor: hovered ? C.green : 'transparent',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <Icon className="h-4 w-4" />
      {children}
    </button>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RecipePage() {
  const [saved, setSaved] = useState(false);

  return (
    <div className="min-h-screen" style={{ backgroundColor: C.bg, color: C.text }}>

      {/* ── Breadcrumb ──────────────────────────────────────────── */}
      <nav className="max-w-6xl mx-auto px-4 pt-5 pb-0" aria-label="Breadcrumb">
        <ol className="flex items-center gap-1.5 font-body text-xs flex-wrap" style={{ color: C.textMuted }}>
          <li>
            <Link href="/" className="hover:text-[#D47C0F] transition-colors duration-200" style={{ color: C.textMuted }}>
              Home
            </Link>
          </li>
          <li><ChevronRight className="h-3 w-3 flex-shrink-0" style={{ color: C.textLight }} /></li>
          <li>
            <Link href="/blog" className="hover:text-[#D47C0F] transition-colors duration-200" style={{ color: C.textMuted }}>
              Blog
            </Link>
          </li>
          <li><ChevronRight className="h-3 w-3 flex-shrink-0" style={{ color: C.textLight }} /></li>
          <li>
            <Link href="/blog?category=recipes" className="hover:text-[#D47C0F] transition-colors duration-200" style={{ color: C.textMuted }}>
              Recipes
            </Link>
          </li>
          <li><ChevronRight className="h-3 w-3 flex-shrink-0" style={{ color: C.textLight }} /></li>
          <li className="line-clamp-1 max-w-[200px] sm:max-w-xs" style={{ color: C.textLight }} aria-current="page">
            Kori Rotti with Kori Gassi
          </li>
        </ol>
      </nav>

      {/* ── Recipe Header ────────────────────────────────────────── */}
      <header className="max-w-6xl mx-auto px-4 pt-8 pb-0">
        <CategoryPill label={RECIPE_META.category} />

        <h1
          className="font-headline font-bold mt-4 leading-tight"
          style={{ fontSize: 'clamp(1.75rem, 4.5vw, 2.75rem)', color: C.text, lineHeight: 1.2 }}
        >
          {RECIPE_META.title}
        </h1>

        <p
          className="mt-4 font-body leading-relaxed max-w-2xl"
          style={{ color: C.textMuted, fontSize: '1.05rem' }}
        >
          {RECIPE_META.description}
        </p>

        {/* Author + date */}
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-4 font-body text-sm" style={{ color: C.textMuted }}>
          <span className="font-semibold" style={{ color: '#5C3D0F' }}>{RECIPE_META.author}</span>
          <span style={{ color: C.textLight }}>·</span>
          <time dateTime="2025-03-12">{RECIPE_META.date}</time>
        </div>

        {/* Recipe meta badges */}
        <div className="flex flex-wrap gap-3 mt-6 overflow-x-auto no-scrollbar pb-1">
          <RecipeMetaBadge icon={Clock} label="Prep Time" value={RECIPE_META.prepTime} />
          <RecipeMetaBadge icon={Flame} label="Cook Time" value={RECIPE_META.cookTime} />
          <RecipeMetaBadge icon={Users} label="Serves" value={RECIPE_META.serves} />
          <RecipeMetaBadge icon={BarChart3} label="Difficulty" value={RECIPE_META.difficulty} />
        </div>

        {/* Hero image */}
        <div className="relative w-full aspect-video mt-8 rounded-lg overflow-hidden shadow-lg">
          <Image
            src={RECIPE_META.heroImage.src}
            alt={RECIPE_META.heroImage.alt}
            fill
            priority
            className="object-cover"
            data-ai-hint={RECIPE_META.heroImage.hint}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
        </div>
      </header>

      {/* ── Two-column layout ────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 mt-10 mb-16 lg:flex lg:gap-10">

        {/* ── Main column ──────────────────────────────────────── */}
        <main className="flex-1 min-w-0 space-y-12">

          {/* INGREDIENTS */}
          <section aria-labelledby="ingredients-heading">
            <h2
              id="ingredients-heading"
              className="font-headline font-bold mb-6"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              Ingredients
            </h2>
            <p className="font-body text-xs mb-5 italic" style={{ color: C.textMuted }}>
              Tap each ingredient to mark it off as you go.
            </p>

            <div
              className="rounded-2xl border p-6"
              style={{ backgroundColor: C.card, borderColor: C.border }}
            >
              <IngredientChecklist groups={INGREDIENT_GROUPS} />
            </div>

            {/* Inline product CTA — after ingredients */}
            <InlineProductCard product={INLINE_PRODUCT} />
          </section>

          {/* INSTRUCTIONS */}
          <section aria-labelledby="instructions-heading">
            <h2
              id="instructions-heading"
              className="font-headline font-bold mb-6"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              Instructions
            </h2>
            <div className="space-y-5">
              {STEPS.map((step, i) => (
                <StepCard key={i} step={step} index={i} />
              ))}
            </div>
          </section>

          {/* TIPS & VARIATIONS */}
          <section aria-labelledby="tips-heading">
            <h2
              id="tips-heading"
              className="font-headline font-bold mb-5"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              Tips &amp; Variations
            </h2>
            <ul className="space-y-3">
              {[
                'For deeper flavour, marinate the chicken in the Gassi masala for 30–60 minutes before cooking.',
                'Vegetarian? Replace chicken with firm tofu or jackfruit. Use the same masala — the result is called "Gassi" and is equally delicious.',
                'If you cannot source Byadagi chillies, use Kashmiri red chillies for colour without heat, or a mix of paprika and a small amount of cayenne.',
                'Authentic Kori Rotti is always served broken into pieces — never whole. Break it by hand, not with a knife.',
              ].map((tip, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span
                    className="mt-1.5 flex-shrink-0 w-2 h-2 rounded-full"
                    style={{ backgroundColor: C.saffron }}
                  />
                  <p className="font-body text-sm leading-relaxed" style={{ color: C.textMuted }}>
                    {tip}
                  </p>
                </li>
              ))}
            </ul>
          </section>

          {/* HOW TO SERVE */}
          <section aria-labelledby="serve-heading">
            <h2
              id="serve-heading"
              className="font-headline font-bold mb-4"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              How to Serve
            </h2>
            <div
              className="rounded-2xl border p-6 space-y-3"
              style={{ backgroundColor: C.card, borderColor: C.border }}
            >
              <p className="font-body text-sm leading-relaxed" style={{ color: C.textMuted, lineHeight: 1.75 }}>
                Kori Rotti is best served fresh and hot. Arrange broken rotti pieces on each plate (or banana leaf for the full experience) and place the Kori Gassi in a bowl on the side — never pre-soak the rotti. The traditional way to eat is to break off a piece of rotti, dip it briefly into the curry, and eat with your right hand.
              </p>
              <p className="font-body text-sm leading-relaxed" style={{ color: C.textMuted, lineHeight: 1.75 }}>
                Pair with <strong style={{ color: C.text }}>Sol Kadi</strong> (kokum-coconut milk drink) to cool the palate, or a simple Pachadi (coconut chutney). For a complete Mangalorean feast, add a side of Neer Dosa and a seasonal vegetable stir-fry.
              </p>
            </div>
          </section>

          {/* Mobile sidebar */}
          <section className="lg:hidden" aria-label="Shop the ingredients">
            <div
              className="rounded-2xl border overflow-hidden"
              style={{ borderColor: C.border }}
            >
              <div
                className="px-5 py-4"
                style={{ backgroundColor: C.terracotta }}
              >
                <h3 className="font-headline font-bold text-base" style={{ color: C.bg }}>
                  🛒 Shop the Ingredients
                </h3>
                <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(253,250,246,0.8)' }}>
                  Everything you need, delivered to your door.
                </p>
              </div>
              <div
                className="p-4 space-y-3"
                style={{ backgroundColor: C.card }}
              >
                {SIDEBAR_PRODUCTS.map((p) => (
                  <SidebarProductCard key={p.id} product={p} />
                ))}
                <div className="flex gap-3 pt-2">
                  <OutlineButton icon={Bookmark} onClick={() => setSaved(!saved)}>
                    {saved ? 'Saved!' : 'Save Recipe'}
                  </OutlineButton>
                  <OutlineButton icon={Share2}>Share</OutlineButton>
                </div>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="font-headline font-bold mb-6"
              style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
            >
              Frequently Asked Questions
            </h2>
            <FaqAccordion faqs={FAQS} />
          </section>

        </main>

        {/* ── Sticky Sidebar (desktop) ──────────────────────────── */}
        <aside className="hidden lg:block w-72 flex-shrink-0" aria-label="Shop the ingredients">
          <div className="sticky top-24 space-y-0 rounded-2xl border overflow-hidden shadow-md" style={{ borderColor: C.border }}>
            {/* Sidebar header */}
            <div className="px-5 py-4" style={{ backgroundColor: C.terracotta }}>
              <h3 className="font-headline font-bold text-base" style={{ color: C.bg }}>
                🛒 Shop the Ingredients
              </h3>
              <p className="font-body text-xs mt-0.5" style={{ color: 'rgba(253,250,246,0.8)' }}>
                Everything you need, delivered fresh.
              </p>
            </div>
            {/* Products */}
            <div className="p-4 space-y-3" style={{ backgroundColor: C.card }}>
              {SIDEBAR_PRODUCTS.map((p) => (
                <SidebarProductCard key={p.id} product={p} />
              ))}
              {/* Save & share */}
              <div className="flex gap-3 pt-2">
                <OutlineButton icon={Bookmark} onClick={() => setSaved(!saved)}>
                  {saved ? 'Saved!' : 'Save'}
                </OutlineButton>
                <OutlineButton icon={Share2}>Share</OutlineButton>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* ── End CTA Banner ───────────────────────────────────────── */}
      <section
        className="py-14 text-center px-4"
        style={{ background: 'linear-gradient(135deg, #F5E6C8 0%, #EDD9A3 40%, #F0E0B0 100%)' }}
        aria-label="Shop CTA"
      >
        <p
          className="font-body font-semibold uppercase tracking-widest text-xs mb-3"
          style={{ color: C.terracotta, letterSpacing: '0.18em' }}
        >
          Ready to Cook?
        </p>
        <h2
          className="font-headline font-bold leading-tight mb-4"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', color: C.brown }}
        >
          Shop authentic Mangalorean ingredients<br className="hidden sm:block" /> delivered to your door in Bengaluru.
        </h2>
        <p className="font-body max-w-md mx-auto mb-8" style={{ color: '#6B4C1C', fontSize: '1rem' }}>
          From Kori Rotti wafers to Gassi masala — everything in this recipe is available in our store.
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
            style={{ borderColor: C.brown, color: C.brown }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = C.brown; e.currentTarget.style.color = '#F5E6C8'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = C.brown; }}
          >
            Browse All Products
          </a>
        </div>
      </section>

      {/* ── More Recipes Row ─────────────────────────────────────── */}
      <section
        className="max-w-6xl mx-auto px-4 py-14"
        aria-labelledby="more-recipes-heading"
      >
        <h2
          id="more-recipes-heading"
          className="font-headline font-bold mb-8"
          style={{ fontSize: 'clamp(1.4rem, 3vw, 1.9rem)', color: C.text }}
        >
          More Recipes
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {MORE_RECIPES.map((r) => (
            <MoreRecipeCard key={r.slug} recipe={r} />
          ))}
        </div>
      </section>

      {/* ── Related Products Row ─────────────────────────────────── */}
      <section
        className="py-10 pb-16"
        style={{ backgroundColor: C.saffronPale }}
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
            {RELATED_PRODUCTS.map((p) => (
              <RelatedProductCard key={p.id} product={p} />
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
