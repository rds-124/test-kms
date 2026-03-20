import Link from 'next/link';
import Image from 'next/image';
import { Facebook, Instagram, MessageCircle, MapPin } from 'lucide-react';

export default function Footer() {
  const linkSections = [
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Contact', href: '/contact' },
        { name: 'Privacy', href: '/privacy-policy' },
      ],
    },
    {
      title: 'Support',
      links: [
        { name: 'Shipping', href: '/shipping-policy' },
        { name: 'Returns', href: '/returns-policy' },
        { name: 'FAQs', href: '/faqs' },
      ],
    },

  ];

  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-8">
        {/* Two-column layout: Brand left | Sections right */}
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start">
          {/* Brand Section */}
          <div className="flex-shrink-0 sm:pl-6 flex flex-col items-center sm:items-start">
            {/* Outer tight container — tagline centers relative to this block */}
            <div className="inline-block">
              {/* Logo + Brand Name Row */}
              <Link href="/" className="flex items-center gap-2 mb-1.5 group">
                {/* Logo — sized to match the text block height */}
                <div className="relative w-[90px] h-[90px] flex-shrink-0">
                  <Image
                    src="/logo-symbol-tr.png"
                    alt="Karavali Mangalore Store Logo"
                    fill
                    sizes="90px"
                    className="object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                {/* Brand Text Stack — children centered to KARAVALI width */}
                <div className="flex flex-col items-center gap-1.5 leading-none">
                  <span
                    className="font-headline font-bold tracking-widest uppercase"
                    style={{ fontSize: '1.6rem', letterSpacing: '0.12em', lineHeight: 1 }}
                  >
                    Karavali
                  </span>
                  <span
                    className="font-body font-medium tracking-wide opacity-90"
                    style={{ fontSize: '0.95rem', letterSpacing: '0.06em' }}
                  >
                    Mangalore Store
                  </span>
                  <span
                    className="opacity-60 flex items-center gap-1"
                    style={{ fontSize: '0.7rem', letterSpacing: '0.15em' }}
                  >
                    <span className="inline-block w-4 border-t border-current opacity-60" />
                    SINCE 2007
                    <span className="inline-block w-4 border-t border-current opacity-60" />
                  </span>
                </div>
              </Link>
              {/* Tagline — 2-line wrap, centered to brand block width */}
              <p className="text-sm opacity-75 leading-relaxed text-center max-w-[18rem] mx-auto">
                Bringing the authentic taste and culture of Karavali right to your doorstep.
              </p>
            </div>
          </div>

          {/* The Karavali Journal — desktop centre gap (hidden on mobile, shown inside right group) */}
          <div className="hidden sm:flex flex-1 self-stretch items-center justify-center">
            <Link
              href="/blog"
              className="font-headline italic text-xl text-primary-foreground opacity-90 hover:opacity-100 hover:underline hover:decoration-white underline-offset-4 transition-all duration-200"
            >
              The Karavali Journal
            </Link>
          </div>

          {/* Right group — Company/Support/Location */}
          <div className="flex flex-col items-center gap-6 sm:flex sm:flex-row sm:flex-wrap sm:items-start sm:gap-10">

            {/* The Karavali Journal — pill button, centered on mobile, inline on desktop */}
            <div className="w-full flex justify-center mb-2 sm:hidden">
              <Link
                href="/blog"
                className="font-headline italic text-base sm:text-xl text-primary-foreground opacity-90 hover:opacity-100 hover:underline hover:decoration-[#D47C0F] underline-offset-4 transition-all duration-200"
              >
                The Karavali Journal
              </Link>
            </div>

            {/* Company, Support, Location — 3-col grid on mobile;
                sm:contents makes them flow as direct flex children on desktop */}
            <div className="grid grid-cols-3 gap-x-6 gap-y-8 w-full sm:contents">

              {/* Link Sections (Company, Support) */}
              {linkSections.map((section) => (
                <div key={section.title}>
                  <h4 className="font-bold tracking-widest uppercase text-xs opacity-60 mb-4">
                    {section.title}
                  </h4>
                  <ul className="space-y-2">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <Link
                          href={link.href}
                          className="text-sm opacity-85 hover:opacity-100 hover:underline underline-offset-2 transition-all"
                        >
                          {link.name}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}

              {/* Location & Socials */}
              <div>
                <h4 className="font-bold tracking-widest uppercase text-xs opacity-60 mb-4">
                  Location
                </h4>
                <div className="flex items-start gap-2 text-sm mb-4">
                  <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5 opacity-80" />
                  <a
                    href="https://maps.app.goo.gl/agTFVts4baEWtys57"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs opacity-90 hover:opacity-100 hover:underline underline-offset-2 transition-opacity"
                  >
                    94/1, Opp. 108B bus stop,<br />
                    Ganganagar, Bengaluru
                  </a>
                </div>
                <div className="flex items-center gap-4">
                  <a
                    href="https://www.facebook.com/people/Karavali-Mangalore-Store/61588141570257/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Facebook"
                    className="opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <Facebook className="h-5 w-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/karavalimangalorestore/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Instagram"
                    className="opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <Instagram className="h-5 w-5" />
                  </a>
                  <a
                    href="https://wa.me/919611573008"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="WhatsApp"
                    className="opacity-75 hover:opacity-100 transition-opacity"
                  >
                    <MessageCircle className="h-5 w-5" />
                  </a>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-white/20 pt-5 text-center text-xs opacity-60">
          <p>© {new Date().getFullYear()} Karavali Mangalore Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
