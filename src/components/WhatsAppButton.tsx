import Link from 'next/link';
import { Button } from '@/components/ui/button';

const WhatsAppIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.383 1.905 6.195l-1.256 4.595 4.672-1.225z" />
    </svg>
  );
  

export default function WhatsAppButton() {
  const phoneNumber = '+911234567890'; // Replace with actual number
  const message = "Hello! I have a question about Karavali Store.";
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;

  return (
    <Button asChild size="icon" className="fixed bottom-6 right-6 h-14 w-14 rounded-full bg-[#25D366] hover:bg-[#128C7E] shadow-lg z-50 hidden md:inline-flex">
      <Link href={whatsappUrl} target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
        <WhatsAppIcon />
      </Link>
    </Button>
  );
}
