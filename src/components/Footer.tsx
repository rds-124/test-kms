import Link from 'next/link';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function Footer() {
  const linkSections = [
    {
      title: 'Shop',
      links: [
        { name: 'Instant', href: '/category/instant' },
        { name: 'Snacks', href: '/category/snacks' },
        { name: 'Sweets', href: '/category/sweets' },
        { name: 'Grocery', href: '/category/grocery' },
        { name: 'Ayurvedic', href: '/category/ayurvedic' },
        { name: 'Ready to Eat', href: '/category/ready-to-eat' },
      ],
    },
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
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <h3 className="font-headline text-2xl font-bold">Karavali Store</h3>
            <p className="mt-2 text-sm max-w-sm">
              Bringing the authentic taste and culture of Karavali right to your doorstep.
            </p>
            <div className="mt-4 flex space-x-4">
              <Link href="#" aria-label="Facebook"><Facebook className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Instagram"><Instagram className="h-6 w-6 hover:text-primary transition-colors" /></Link>
              <Link href="#" aria-label="Twitter"><Twitter className="h-6 w-6 hover:text-primary transition-colors" /></Link>
            </div>
          </div>
          {linkSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold tracking-wide">{section.title}</h4>
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
        </div>
        <div className="mt-12 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} Karavali Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
