'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  User,
  Package,
  Heart,
  MapPin,
  MessageSquare,
  LogOut,
  ChevronRight,
  Settings,
  Bell,
  Trash2,
  Phone,
  Mail,
  Edit,
  RefreshCw,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { products } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import ProductCard from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

const WhatsAppIcon = () => (
    <svg
      className="w-6 h-6"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
    >
      <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.886-.001 2.269.655 4.383 1.905 6.195l-1.256 4.595 4.672-1.225z" />
    </svg>
);
  
const phoneNumber = '+911234567890';
const message = "Hello! I need help with my order.";
const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;


const mockOrders = [
  { id: 'ORD001', date: 'Nov 23, 2023', status: 'Delivered', total: '₹1250.00' },
  { id: 'ORD002', date: 'Dec 05, 2023', status: 'In Transit', total: '₹850.50' },
  { id: 'ORD003', date: 'Jan 10, 2024', status: 'Cancelled', total: '₹450.00' },
];

const mockAddresses = [
    { id: '1', type: 'Home', address: '123, Sunshine Apartments, Koramangala, Bangalore - 560034' },
    { id: '2', type: 'Work', address: '456, Tech Park, Whitefield, Bangalore - 560066' },
]

export default function AccountPage() {
    const boughtAgainProducts = products.slice(0, 5);
  return (
    <div className="container mx-auto max-w-4xl px-4 py-8 space-y-8">
      <h1 className="text-3xl md:text-4xl font-headline font-bold">My Account</h1>

      {/* Profile Section */}
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
            <Avatar className="h-16 w-16">
                <AvatarImage src="https://picsum.photos/seed/100/100/100" />
                <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div>
                <CardTitle>John Doe</CardTitle>
                <CardDescription className="flex items-center gap-2 mt-1"><Phone className="h-4 w-4"/>+91 98765 43210</CardDescription>
                <CardDescription className="flex items-center gap-2 mt-1"><Mail className="h-4 w-4"/>john.doe@example.com</CardDescription>
            </div>
             <Button variant="outline" size="sm" className="ml-auto"><Edit className="mr-2 h-4 w-4"/>Edit Profile</Button>
        </CardHeader>
      </Card>
      
      {/* My Orders Section */}
      <Card>
        <CardHeader>
          <CardTitle>My Orders</CardTitle>
          <CardDescription>View your recent orders and their status.</CardDescription>
        </CardHeader>
        <CardContent>
            <div className="space-y-4">
                {mockOrders.map(order => (
                    <div key={order.id} className="flex items-center justify-between p-4 rounded-lg border">
                        <div className="grid gap-1">
                            <p className="font-bold text-primary">{order.id}</p>
                            <p className="text-sm text-muted-foreground">{order.date}</p>
                            <p className="font-semibold">{order.total}</p>
                        </div>
                        <div className="flex flex-col items-end gap-2">
                             <Badge
                                variant={
                                    order.status === 'Delivered' ? 'default' : order.status === 'In Transit' ? 'secondary' : 'destructive'
                                }
                                className={
                                    order.status === 'Delivered' ? 'bg-green-500/20 text-green-700' : 
                                    order.status === 'In Transit' ? 'bg-yellow-500/20 text-yellow-700' : ''
                                }
                                >
                                {order.status}
                            </Badge>
                            <Button variant="outline" size="sm">View Details</Button>
                        </div>
                    </div>
                ))}
            </div>
        </CardContent>
      </Card>

      {/* Buy Again Section */}
      <Card>
        <CardHeader>
          <CardTitle>Buy Again</CardTitle>
          <CardDescription>Quickly reorder your favorite items.</CardDescription>
        </CardHeader>
        <CardContent>
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {boughtAgainProducts.map((product, index) => (
                  <CarouselItem key={index} className="basis-1/2 md:basis-1/3 lg:basis-1/4">
                    <div className="p-1">
                      <ProductCard product={product} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="hidden sm:flex" />
              <CarouselNext className="hidden sm:flex" />
            </Carousel>
        </CardContent>
      </Card>

      {/* Saved Addresses Section */}
       <Card>
        <CardHeader className="flex-row items-center justify-between">
            <div>
                <CardTitle>Saved Addresses</CardTitle>
                <CardDescription>Manage your shipping addresses.</CardDescription>
            </div>
            <Button variant="outline">Add New</Button>
        </CardHeader>
        <CardContent className="space-y-4">
          {mockAddresses.map(addr => (
              <div key={addr.id} className="flex items-start justify-between p-4 rounded-lg border">
                  <div className="flex items-start gap-4">
                    <MapPin className="h-5 w-5 text-primary mt-1" />
                    <div>
                        <p className="font-semibold">{addr.type}</p>
                        <p className="text-muted-foreground text-sm">{addr.address}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="icon"><Edit className="h-4 w-4" /></Button>
                    <Button variant="ghost" size="icon"><Trash2 className="h-4 w-4" /></Button>
                  </div>
              </div>
          ))}
        </CardContent>
      </Card>

      {/* Support & Help Section */}
      <Card>
        <CardHeader>
          <CardTitle>Support & Help</CardTitle>
          <CardDescription>Have questions? We're here to help.</CardDescription>
        </CardHeader>
        <CardContent>
            <Button asChild size="lg" className="w-full">
                <Link href={whatsappUrl} target="_blank">
                    <WhatsAppIcon /> Chat with Support
                </Link>
            </Button>
            <div className="text-sm text-muted-foreground mt-4 text-center">
                Get help with orders, returns, and other queries.
            </div>
        </CardContent>
      </Card>

      {/* Account Settings Section */}
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                    <Bell className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Push Notifications</span>
                </div>
                <Switch />
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border">
                <div className="flex items-center gap-3">
                    <LogOut className="h-5 w-5 text-muted-foreground" />
                    <span className="font-medium">Logout</span>
                </div>
                <Button variant="outline" size="sm">Logout</Button>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg border border-destructive/50">
                <div className="flex items-center gap-3">
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <span className="font-medium text-destructive">Delete Account</span>
                </div>
                <Button variant="destructive" size="sm">Delete</Button>
            </div>
        </CardContent>
      </Card>

    </div>
  );
}
