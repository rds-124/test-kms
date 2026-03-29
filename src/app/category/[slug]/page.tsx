import type { Metadata } from 'next';
import { categories } from '@/lib/categories';
import { categorySEO } from '@/lib/category-seo';
import CategoryClient from './CategoryClient';

const SITE_URL = 'https://karavalimangalorestore.com';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = params;
  const category = categories.find(c => c.slug === slug);
  const name = slug === 'all' ? 'All Products' : (category?.name ?? 'Products');
  const seo = categorySEO[slug];

  return {
    title: seo?.pageTitle ?? `${name} | Karavali Mangalore Store`,
    description: seo?.metaDescription ?? `Shop authentic ${name.toLowerCase()} from Karavali Mangalore Store. Delivered across Bengaluru.`,
    alternates: {
      canonical: `/category/${slug}`,
    },
  };
}

export default function CategoryPage({ params }: Props) {
  const { slug } = params;
  const category = categories.find(c => c.slug === slug);
  const name = slug === 'all' ? 'All Products' : (category?.name ?? 'Products');
  const canonicalUrl = `${SITE_URL}/category/${slug}`;
  const seo = categorySEO[slug];

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: canonicalUrl },
    ],
  };

  const collectionPageSchema = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: `${name} — Authentic Mangalorean Products`,
    description: `Shop authentic ${name.toLowerCase()} from Karavali Mangalore Store. Delivered across Bengaluru.`,
    url: canonicalUrl,
    breadcrumb: breadcrumbSchema,
    provider: {
      '@type': 'LocalBusiness',
      name: 'Karavali Mangalore Store',
      url: SITE_URL,
      address: {
        '@type': 'PostalAddress',
        streetAddress: '94/1, Opp. 108B Bus Stop, Ganganagar',
        addressLocality: 'Bengaluru',
        addressRegion: 'Karnataka',
        addressCountry: 'IN',
      },
    },
  };

  const faqSchema = seo
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: seo.faqs.map(faq => ({
          '@type': 'Question',
          name: faq.q,
          acceptedAnswer: { '@type': 'Answer', text: faq.a },
        })),
      }
    : null;

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionPageSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      {/* H1 — one per page, server-rendered, above all content */}
      <div style={{ background: '#FAF7F2', padding: '24px 16px 0', textAlign: 'center' }}>
        <h1
          className="text-2xl md:text-[clamp(1.5rem,4vw,2.2rem)]"
          style={{
            fontFamily: 'var(--font-fraunces)',
            fontWeight: 700,
            color: '#1A2A1E',
            margin: '0 auto 6px',
            maxWidth: 720,
            lineHeight: 1.25,
          }}
        >
          {seo?.h1 ?? `${name} — Authentic Mangalorean Products`}
        </h1>
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ marginBottom: 12 }} className="md:[margin-bottom:24px]">
          <ol style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, listStyle: 'none', padding: 0, margin: 0 }}>
            <li>
              <a href="/" style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.8rem', color: '#7A7065', textDecoration: 'none' }}>
                Home
              </a>
            </li>
            <li style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.8rem', color: '#C4B8AE' }}>›</li>
            <li>
              <span style={{ fontFamily: 'var(--font-barlow)', fontSize: '0.8rem', color: '#2E8A57', fontWeight: 600 }}>
                {name}
              </span>
            </li>
          </ol>
        </nav>
      </div>

      <CategoryClient slug={slug} />
    </>
  );
}
