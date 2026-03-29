export interface CategorySEOData {
  description: string;
  faqs: { q: string; a: string }[];
  relatedSlugs: string[];
  // Optional overrides — if set, these take precedence over generated defaults
  pageTitle?: string;
  metaDescription?: string;
  h1?: string;
  visibleHeadline?: string;
  relatedLinks?: { label: string; href: string }[];
}

export const categorySEO: Record<string, CategorySEOData> = {
  instant: {
    description: `Karavali Mangalore Store brings you a carefully curated selection of authentic instant products sourced directly from the Karavali coast. Whether you're a Mangalorean living in Bengaluru or simply someone who loves coastal Karnataka's rich culinary heritage, our instant range lets you recreate those familiar flavours in minutes. Every product in this category is selected for quality, authenticity, and ease of preparation — so you never have to compromise on taste even on your busiest days. We stock trusted brands and home-style preparations that have been a part of Mangalorean kitchens for generations. From ready-mix batters to instant gravies, each product is dispatched fresh from our physical store in Ganganagar, Bengaluru — the same store that has served the Mangalorean community since 2007. We do not warehouse products for weeks; high daily turnover means you receive products at peak freshness. All items are clearly labelled with shelf life information. Browse our full instant range, add your favourites to the cart, and enjoy same-day delivery if you're within 10 km of our store. Pan-India delivery is coming soon.`,
    faqs: [
      {
        q: "What types of instant products does Karavali Mangalore Store carry?",
        a: "We stock a wide range of instant products including ready-mix batters, instant gravies, spice pastes, and quick-cook preparations all inspired by traditional Mangalorean and Karavali coastal recipes.",
      },
      {
        q: "Are the instant products preservative-free or natural?",
        a: "We prioritise products made with minimal additives. Shelf life and ingredient details are listed on each product page so you can make an informed choice.",
      },
      {
        q: "How long does delivery take for instant products?",
        a: "Orders placed before 12:00 PM are delivered the same day if you're within 10 km of our Ganganagar store. Locations beyond 10 km within Bengaluru receive next-day delivery.",
      },
      {
        q: "Can I return an instant product if it is damaged?",
        a: "Yes. Contact us on WhatsApp (+91 96115 73008) within 24 hours of delivery with a photo. We will issue a store credit coupon equal to the value of the item.",
      },
      {
        q: "Do you restock instant products regularly?",
        a: "Yes. We source products regularly from our suppliers along the Karavali coast to maintain freshness and availability. If a product is out of stock, it is typically restocked within a few days.",
      },
    ],
    relatedSlugs: ["ready-to-eat", "grocery", "snacks", "sweets"],
  },

  snacks: {
    pageTitle: "Buy Mangalorean Snacks Online | Karavali Mangalore Store",
    metaDescription: "Shop 80+ authentic Coastal Karnataka snacks online — chips, chakli, murukku, nippat, mixture and more. Delivered across Bengaluru.",
    h1: "Authentic Mangalorean Snacks — Buy Online, Delivered in Bengaluru",
    visibleHeadline: "ಕರಾವಳಿಯ ತಿಂಡಿಗಳು — The Karavali Snack Shelf",
    description: `Coastal Karnataka has one of the most distinct snack traditions in India — built on coconut oil, rice flour, local spices and techniques that have not changed across generations of Tulu Nadu kitchens. At Karavali Mangalore Store, we stock over 80 authentic Mangalorean snacks sourced directly from the producers who have been making them for decades.

Our range spans every format the Karavali snack tradition produces. Traditional chips made from banana, tapioca, sweet potato and bitter gourd — sliced thin and fried in coconut oil the way they have always been made along the coast. Murukku and chakli in over a dozen varieties, from the rich buttery benne murukku to the earthy ragi chakali from the Udupi tradition. Nippat, kodubale and kadi — the flat wafers, rings and sticks that every Mangalorean household keeps permanently stocked. Mixtures and chivda, masala peanuts, roasted pulses, avalakki preparations, and the full range of Karnataka bakery snacks from the iconic khara biscuit to crumbly nankhatai.

Many of these products — the sonte, the tengolu, the sabakki nippat, the congress kadle — are genuinely difficult to find outside of a specialist Coastal Karnataka store. If you grew up eating them, you already know what you are looking for. If you are discovering Karavali snacks for the first time, this shelf is the right place to start.

All snacks are delivered fresh across Bengaluru. Pan-India delivery coming soon.`,
    faqs: [
      {
        q: "What types of Mangalorean snacks are available?",
        a: "We stock over 80 authentic Coastal Karnataka snacks including banana chips, tapioca chips, chakli, murukku, nippat, kodubale, mixtures, roasted peanuts, avalakki preparations and Karnataka bakery snacks like khara biscuit and nankhatai.",
      },
      {
        q: "Are these snacks made with preservatives?",
        a: "Our snacks are sourced from trusted Coastal Karnataka producers who follow traditional recipes. Most preparations use no artificial preservatives — the same way they have always been made in Karavali homes.",
      },
      {
        q: "Do you deliver Mangalorean snacks in Bengaluru?",
        a: "Yes, we deliver across Bengaluru. Order online and get authentic Coastal Karnataka snacks delivered to your door.",
      },
      {
        q: "Are there snacks suitable for gifting?",
        a: "Yes. Many of our snacks — chakli, mixture, nippat and ladoo combinations — work well as gift hampers for festivals and occasions.",
      },
      {
        q: "Where can I find snacks like sonte, tengolu or sabakki nippat online?",
        a: "These are specialist Coastal Karnataka preparations not available in mainstream stores. Karavali Mangalore Store stocks the full range of hard-to-find Karavali snacks and delivers across Bengaluru.",
      },
    ],
    relatedSlugs: ["sweets", "ready-to-eat", "grocery", "instant"],
    relatedLinks: [
      { label: "Sweets", href: "/category/sweets" },
      { label: "Papads & Sandige", href: "/category/grocery?sub_category=papads-sandige" },
      { label: "Pickles & Podis", href: "/category/grocery?sub_category=pickles-condiments" },
      { label: "Masalas", href: "/category/grocery?sub_category=spices-masalas" },
      { label: "Ready to Eat", href: "/category/ready-to-eat" },
    ],
  },

  sweets: {
    description: `Karavali Mangalore Store's sweets collection celebrates the rich confectionery traditions of coastal Karnataka. From the iconic Dharwad peda to Mangalorean halwa, coconut-based laddoos, and festival sweets that evoke memories of home — every item in our sweets category has been selected with care. These are not mass-produced sweets from a central factory; they are sourced from artisan makers and regional suppliers who preserve authentic recipes passed down through generations. We understand how important it is to find the right sweet for a festival, a celebration, or simply an everyday indulgence. Our store in Ganganagar, Bengaluru has been the go-to destination for Bengaluru's Mangalorean community for 19 years, and we carry only sweets that meet the standards our walk-in customers expect. Freshness is a priority — we maintain high stock turnover and dispatch directly from our store. Shelf life information is clearly listed on every product page. Order before 12:00 PM for same-day delivery within 10 km of our Ganganagar store, or next day for anywhere else in Bengaluru. Looking for a specific traditional sweet? WhatsApp us at +91 96115 73008 and we'll check our stock for you.`,
    faqs: [
      {
        q: "How long do the sweets stay fresh after delivery?",
        a: "Shelf life varies by product and is listed on each product page. Most traditional sweets are best consumed within 3–7 days of purchase. Store in a cool, dry place or refrigerate as advised.",
      },
      {
        q: "Do you carry sweets specific to Mangalorean festivals?",
        a: "Yes. We stock traditional Mangalorean festival sweets including seasonal specialities. Availability varies by season — WhatsApp us at +91 96115 73008 to ask about specific items.",
      },
      {
        q: "Can I order sweets for Diwali or wedding functions in bulk?",
        a: "Yes, we do bulk orders. Please WhatsApp us at +91 96115 73008 at least 3–4 days in advance for large orders so we can confirm availability and prepare accordingly.",
      },
      {
        q: "Are the sweets made with natural ingredients?",
        a: "We source from producers who use traditional, minimally processed ingredients. Ingredient details and allergen information are listed on each product page.",
      },
      {
        q: "Do you sell sugar-free sweets?",
        a: "We are working on expanding our range to include sugar-free options. WhatsApp us at +91 96115 73008 if you are looking for a specific product and we will check what's available.",
      },
    ],
    relatedSlugs: ["snacks", "instant", "grocery", "ready-to-eat"],
  },

  grocery: {
    pageTitle: "Buy Grocery Essentials Online | Karavali Mangalore Store",
    metaDescription: "Shop authentic Coastal Karnataka grocery essentials online — rice, pulses, oils, jaggery, spices, kokum and more. Delivered across Bengaluru.",
    h1: "Authentic Coastal Karnataka Grocery Essentials — Buy Online, Delivered in Bengaluru",
    visibleHeadline: "ಕರಾವಳಿಯ ದಿನಸಿ — The Karavali Pantry",
    description: `The Coastal Karnataka kitchen runs on a specific set of ingredients that you will not find in a standard supermarket — kaje boiled rice, tingalavare, byadgi chilli, dry kokum puli, joni bella, barkuru bella, kachampuli — each one specific to a regional cooking tradition that has been maintained along the Karavali coast for centuries. At Karavali Mangalore Store, we stock the complete Coastal Karnataka pantry, sourced directly from the producers and regions that have always supplied these ingredients.

Our grocery range covers every staple the Karavali kitchen depends on. Rice in eight varieties including the prized kaje boiled rice and rajamudhi heritage rice that form the backbone of the Mangalorean meal. Pulses essential to Coastal Karnataka cooking — tingalavare, alasande kalu, hurali kalu, hesaru kalu and more — the specific varieties that authentic ghassi and curry preparations require. Cold-pressed coconut oil, desi ghee and coconut oil from trusted Coastal Karnataka brands that serious Mangalorean cooks specifically seek out. The full range of souring agents — dry kokum puli, jarige puli, kodampuli and kachampuli — each used in specific preparations where no substitute produces the right result. Jaggery in every form the Karavali tradition uses — jaggery powder, organic cubes, joni bella liquid jaggery, barkuru bella and antu bella coconut palm jaggery. Whole spices, turmeric, tamarind, cardamom, byadgi and gundu chillies, and the herbal beverage staples of the Karavali home — vedha sukku kaapi, malnad kashaya and more.

This is not a generic Indian grocery selection. Every product in this range is specific to the Coastal Karnataka culinary tradition and chosen because it is the ingredient that authentic Karavali cooking actually requires.

All groceries are delivered across Bengaluru. Pan-India delivery coming soon.`,
    faqs: [
      {
        q: "What makes Coastal Karnataka grocery essentials different from regular Indian groceries?",
        a: "Coastal Karnataka cooking depends on specific regional ingredients — kaje rice, tingalavare, byadgi chilli, kokum puli, joni bella, kachampuli — that are not available in standard supermarkets. These are the ingredients that give Mangalorean cooking its distinctive character and cannot be substituted.",
      },
      {
        q: "Do you stock kaje rice and other Mangalorean rice varieties?",
        a: "Yes. We stock kaje boiled rice in multiple brands and sizes, semi-parboiled kaje rice, rajamudhi heritage rice and white boiled rice — all in 5kg and 10kg options.",
      },
      {
        q: "Do you stock kokum and other Coastal Karnataka souring agents?",
        a: "Yes. We stock dry kokum puli, jarige puli, kodampuli and kachampuli — the full range of Coastal Karnataka souring agents used across fish curry, ghassi and meat preparations.",
      },
      {
        q: "Are the oils and ghee cold-pressed and authentic?",
        a: "Yes. We stock cold-pressed coconut oil, cold-pressed groundnut oil and desi ghee from trusted Coastal Karnataka brands including Prakash, KV Prabhu, Aarvi and Sakalika.",
      },
      {
        q: "Do you deliver grocery essentials across Bengaluru?",
        a: "Yes. All grocery products are delivered across Bengaluru. Bulk rice options are available in 5kg and 10kg. Order online and get authentic Coastal Karnataka pantry staples delivered to your door.",
      },
    ],
    relatedSlugs: ["snacks", "sweets", "ayurvedic", "instant"],
    relatedLinks: [
      { label: "Snacks", href: "/category/snacks" },
      { label: "Sweets", href: "/category/sweets" },
      { label: "Masalas", href: "/category/grocery?sub_category=spices-masalas" },
      { label: "Pickles & Podis", href: "/category/grocery?sub_category=pickles-condiments" },
      { label: "Ayurvedic & Wellness", href: "/category/ayurvedic" },
    ],
  },

  ayurvedic: {
    description: `Karavali Mangalore Store's Ayurvedic section brings you time-tested herbal and natural wellness products rooted in the traditions of coastal Karnataka. The Karavali region has a long heritage of Ayurvedic practice, and many of the products we carry are formulations that local communities have relied on for health and wellbeing for generations. Our range includes herbal preparations, natural remedies, immunity-supporting kadhas, traditional hair and skin care products, and more — all sourced from trusted producers in coastal Karnataka. We do not carry generic Ayurvedic brands available everywhere; our focus is on authentic regional formulations that are harder to find outside the Karavali belt. All products are clearly labelled with ingredients, usage instructions, and shelf life. We recommend consulting a healthcare professional if you are using these products alongside prescribed medication. Our store in Ganganagar, Bengaluru has served the Mangalorean community since 2007, and the same standards of quality apply to every product in this section. Orders above ₹799 qualify for free delivery. For queries about specific Ayurvedic products or remedies, WhatsApp us at +91 96115 73008.`,
    faqs: [
      {
        q: "Are the Ayurvedic products on your site certified?",
        a: "We source from established regional producers. Certification details where available are listed on individual product pages. We recommend checking labels before use.",
      },
      {
        q: "Can Ayurvedic products be used alongside prescription medication?",
        a: "We recommend consulting your healthcare provider before combining Ayurvedic products with any prescribed medication. Our products are traditional wellness items, not substitutes for medical treatment.",
      },
      {
        q: "Do you stock Ayurvedic hair and skin care products?",
        a: "Yes, we carry a selection of traditional Karavali-region herbal hair and skin care products. Browse our Ayurvedic category for current listings.",
      },
      {
        q: "How are Ayurvedic products packaged for delivery?",
        a: "All products are carefully packed to prevent damage or spillage during transit. Liquid products are sealed and wrapped in protective packaging.",
      },
      {
        q: "Can I request specific Ayurvedic products not listed on the site?",
        a: "Yes. WhatsApp us at +91 96115 73008 with the product name and we will check if it is available in our store or can be sourced.",
      },
    ],
    relatedSlugs: ["grocery", "household", "instant", "snacks"],
  },

  "ready-to-eat": {
    description: `Karavali Mangalore Store's Ready to Eat category is built for Mangaloreans and coastal Karnataka food lovers who want an authentic meal on the table without the hours of preparation. Our ready-to-eat range includes traditional preparations like shavige, patrode, kotte kadubu, neer dose, and more — products that capture the true essence of a Mangalorean kitchen. These are not generic ready meals; every item here is sourced from producers who follow traditional recipes using coastal Karnataka ingredients. Many of these products require minimal preparation — a quick steam or reheat is all it takes to bring these regional favourites to your table. We understand the comfort of familiar food, and our ready-to-eat section is designed to make that comfort accessible every day. Our physical store in Ganganagar, Bengaluru has been trusted by the local Mangalorean community since 2007, and we apply the same quality standards online. Freshness is maintained through regular sourcing and high daily turnover. All products include preparation instructions and shelf life information. Order before 12:00 PM for same-day delivery within 10 km of our store. Browse the full range and bring the taste of the Karavali coast to your dining table today.`,
    faqs: [
      {
        q: "How do I prepare the ready-to-eat products from Karavali store?",
        a: "Most of our ready-to-eat products require minimal preparation — typically steaming, reheating, or serving directly. Detailed preparation instructions are included on each product page and on the product packaging.",
      },
      {
        q: "Are the ready-to-eat products freshly made or packaged?",
        a: "Our ready-to-eat products are sourced fresh from regional producers with short shelf lives. We maintain high stock turnover to ensure freshness. Best-before dates are clearly marked on packaging.",
      },
      {
        q: "Can I freeze the ready-to-eat products to extend shelf life?",
        a: "Some products can be frozen to extend their shelf life. Check the individual product page or packaging label for freezing guidance specific to each item.",
      },
      {
        q: "Do you stock vegetarian and non-vegetarian ready-to-eat options?",
        a: "We stock both. Each product page clearly indicates whether a product is vegetarian or non-vegetarian. Filter by dietary preference to find what suits you.",
      },
      {
        q: "What is the delivery time for ready-to-eat products?",
        a: "Same-day delivery is available for orders placed before 12:00 PM for addresses within 10 km of our Ganganagar, Bengaluru store. Next-day delivery for other Bengaluru locations.",
      },
    ],
    relatedSlugs: ["instant", "snacks", "grocery", "sweets"],
  },

  vegetables: {
    description: `Karavali Mangalore Store's vegetables section focuses on the fresh and dried produce that is integral to authentic Mangalorean and coastal Karnataka cooking. Certain vegetables, raw banana varieties, raw jackfruit, colocasia, and other coastal produce that define the cuisine of the Karavali region are difficult to source in regular Bengaluru markets. Our vegetables category bridges that gap — making it easy to find the exact produce you need for your favourite coastal recipes. We source directly from trusted suppliers to ensure quality and freshness. Whether you're preparing kori rotti, patrode, or a traditional Mangalorean curry, the right vegetables make all the difference. Our store in Ganganagar, Bengaluru has served the city's Mangalorean community since 2007, and our produce selection reflects what our customers have asked for over nearly two decades. Product availability may vary seasonally. Shelf life and storage details are listed on each product page. For seasonal produce or specific items you cannot find listed, WhatsApp us at +91 96115 73008 and we will check availability. Orders above ₹799 qualify for free delivery. Same-day delivery for orders placed before 12:00 PM within 10 km of our store.`,
    faqs: [
      {
        q: "Do you stock vegetables specific to Mangalorean cooking?",
        a: "Yes. We carry coastal Karnataka produce that is harder to find in regular Bengaluru markets — including specific varieties of raw banana, raw jackfruit, colocasia, and more. Browse our current listings for availability.",
      },
      {
        q: "How fresh are the vegetables at the time of delivery?",
        a: "We source regularly and maintain high turnover. All produce is dispatched directly from our store, not from a distant warehouse. Best-before information is provided on each listing.",
      },
      {
        q: "Are seasonal vegetables available throughout the year?",
        a: "Availability of certain seasonal vegetables may vary. For specific items, WhatsApp us at +91 96115 73008 to check current stock before placing an order.",
      },
      {
        q: "Can I order vegetables along with other grocery items in the same order?",
        a: "Yes. You can add vegetables and any other products to your cart and place a single order. Orders above ₹799 qualify for free delivery.",
      },
      {
        q: "How should I store the vegetables after delivery?",
        a: "Storage instructions vary by vegetable type. General guidance and best-before information are listed on each product page and on the packaging.",
      },
    ],
    relatedSlugs: ["grocery", "ready-to-eat", "instant", "ayurvedic"],
  },

  household: {
    description: `Karavali Mangalore Store's household section carries a curated selection of products for the home — with a focus on items that reflect the cultural and daily life of coastal Karnataka. This includes traditional pooja items, puja accessories, religious essentials specific to Tulu Nadu practices, and select kitchenware suited to Mangalorean cooking. We understand that for many Mangaloreans in Bengaluru, finding region-specific religious items and traditional kitchenware can be a challenge. Our store has been filling that gap since 2007, stocking products that our walk-in customers have trusted for nearly two decades. All household items in our catalogue are sourced from reliable suppliers and clearly described on their individual product pages. Whether you're setting up a puja room with authentic coastal Karnataka items or looking for kitchen tools that suit traditional Karavali cooking methods, you'll find them here. Browse by sub-category for pooja items or kitchenware. If you're looking for a specific item not listed, WhatsApp us at +91 96115 73008. Orders above ₹799 qualify for free delivery to all Bengaluru locations. Same-day delivery is available for orders placed before 12:00 PM within 10 km of our Ganganagar store.`,
    faqs: [
      {
        q: "Do you stock pooja items specific to Tulu Nadu traditions?",
        a: "Yes. We carry religious and pooja items specific to coastal Karnataka and Tulu Nadu practices that are difficult to find in regular stores in Bengaluru.",
      },
      {
        q: "What types of kitchenware do you sell?",
        a: "We stock traditional kitchenware suited to Mangalorean cooking methods. Browse the Kitchenware sub-category for current listings, or WhatsApp us for specific items.",
      },
      {
        q: "Can I return a household item if it is damaged on delivery?",
        a: "Yes. Contact us on WhatsApp (+91 96115 73008) within 24 hours of delivery with a photo of the damaged item and we will resolve it promptly.",
      },
      {
        q: "Do you stock items for specific Mangalorean festivals and rituals?",
        a: "Yes, we carry festival-specific items. Availability may vary by season. WhatsApp us at +91 96115 73008 before major festivals to check stock of specific items.",
      },
      {
        q: "Is there a minimum order value for household items?",
        a: "No minimum order value, but orders above ₹799 qualify for free delivery. For orders below ₹799, a flat shipping charge of ₹70 applies.",
      },
    ],
    relatedSlugs: ["grocery", "ayurvedic", "snacks", "sweets"],
  },

  all: {
    description: `Karavali Mangalore Store is Bengaluru's dedicated online store for authentic Mangalorean and coastal Karnataka products. Founded in 2007 as a physical retail store in Ganganagar, Bengaluru, we have served the city's Mangalorean community for nearly two decades. Our online store brings the same products — snacks, sweets, grocery staples, ready-to-eat items, instant mixes, Ayurvedic products, vegetables, and household essentials — directly to your doorstep. Every product we carry is sourced from trusted suppliers along the Karavali coast, the same suppliers our walk-in customers have relied on for 19 years. Unlike large online marketplaces, we do not warehouse products for weeks. Our physical store has high daily turnover, which means you receive products at peak freshness. We are operational Tuesday to Sunday. Same-day delivery is available for orders placed before 12:00 PM within 10 km of our Ganganagar store. For locations beyond 10 km within Bengaluru, delivery is the next day. Orders above ₹799 qualify for free delivery. Browse our full catalogue across 8 categories, add your favourites to the cart, and bring the authentic taste and culture of the Karavali coast to your home in Bengaluru.`,
    faqs: [
      {
        q: "What types of products does Karavali Mangalore Store sell?",
        a: "We sell authentic Mangalorean and coastal Karnataka products across 8 categories: Snacks, Sweets, Grocery, Instant, Ready to Eat, Ayurvedic, Vegetables, and Household items.",
      },
      {
        q: "Do you deliver outside Bengaluru?",
        a: "We currently deliver across Bengaluru. Pan-India delivery is coming soon. Follow us on Instagram or WhatsApp us to stay updated.",
      },
      {
        q: "How do I know which products are in stock?",
        a: "Product pages show current stock status. Out-of-stock items are clearly labelled. You can also WhatsApp us at +91 96115 73008 to check availability of a specific product.",
      },
      {
        q: "Is the online store the same as the physical store in Ganganagar?",
        a: "Yes. Our online store is run directly from our physical store at 94/1, Opp. 108B Bus Stop, Ganganagar, Bengaluru. The same products, the same suppliers, the same quality — now delivered to your home.",
      },
      {
        q: "How can I contact Karavali Mangalore Store for support?",
        a: "The quickest way to reach us is via WhatsApp at +91 96115 73008. You can also visit our store at 94/1, Opp. 108B Bus Stop, Ganganagar, Bengaluru, open Tuesday to Sunday, 9:00 AM to 9:00 PM.",
      },
    ],
    relatedSlugs: ["snacks", "sweets", "grocery", "ready-to-eat", "instant"],
  },
};
