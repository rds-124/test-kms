import Link from 'next/link';
import { Facebook, Instagram, Twitter, MapPin } from 'lucide-react';

export default function Footer() {
  const linkSections = [
    {
      title: 'Support',
      links: [
        { name: 'Contact Us', href: '/contact' },
        { name: 'Shipping Policy', href: '/shipping-policy' },
        { name: 'Returns Policy', href: '/returns-policy' },
      ],
    },
    {
      title: 'Company',
      links: [
        { name: 'About Us', href: '/about' },
        { name: 'Privacy Policy', href: '/privacy-policy' },
      ],
    },
  ];

  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="col-span-1 sm:col-span-2 lg:col-span-1">
            <h3 className="font-headline text-2xl font-bold">Karavali Mangalore Store</h3>
            <p className="mt-2 text-sm max-w-sm">
              Bringing the authentic taste and culture of Karavali right to your doorstep.
            </p>
          </div>
          {linkSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold tracking-wide uppercase">{section.title}</h4>
              <ul className="mt-4 space-y-2">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm hover:text-primary transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <h4 className="font-bold tracking-wide uppercase">Our Location</h4>
            <div className="mt-4 flex items-start gap-2 text-sm">
              <MapPin className="h-4 w-4 flex-shrink-0 mt-1" />
              <span>123 Temple Road, <br/>Mangalore, Karnataka <br/>575001, India</span>
            </div>
            <div className="mt-4 flex space-x-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 hover:text-primary transition-colors" /></Link>
            </div>
          </div>
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Karavali Mangalore Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
