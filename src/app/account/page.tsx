'use client';

import Link from 'next/link';
import {
  ArrowLeft,
  ChevronRight,
  HelpCircle,
  Heart,
  LogOut,
  MapPin,
  MoreVertical,
  Package,
  Headset,
  Wallet,
  User,
  Ticket,
  CheckCircle,
  XCircle,
  Truck,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useState } from 'react';
import Image from 'next/image';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Star, X } from 'lucide-react';
import { products as allProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { cn } from '@/lib/utils';
import { Product } from '@/types';


const mockOrders = [
    {
      id: 'ORD001',
      date: '18 Jul 2025, 03:48 PM',
      status: 'Delivered',
      total: '₹1250.00',
      items: [
        { quantity: 1, name: 'Authentic Ghee Roast Masala' },
        { quantity: 1, name: 'Crispy Jackfruit Chips' },
      ],
      moreItems: 2,
      isRated: false,
    },
    {
        id: 'ORD004',
        date: '19 Jul 2025, 11:00 AM',
        status: 'In Transit',
        total: '₹90.00',
        items: [{ quantity: 1, name: 'Boiled Red Rice (Kaje Akki)' }],
        moreItems: 0,
        isRated: false,
    },
    {
      id: 'ORD002',
      date: '05 Dec 2024, 10:30 AM',
      status: 'Delivered',
      total: '₹850.50',
      items: [{ quantity: 1, name: 'Spicy Banana Chips' }],
      moreItems: 0,
      isRated: true,
    },
    {
      id: 'ORD003',
      date: '10 Jan 2024, 01:00 PM',
      status: 'Cancelled',
      total: '₹450.00',
      items: [{ quantity: 1, name: 'Homemade Mango Pickle' }],
      moreItems: 0,
      isRated: false,
    },
];

type Order = typeof mockOrders[number];


const statusConfig: { [key: string]: { Icon: React.ElementType; className: string; text: string } } = {
    Delivered: {
        Icon: CheckCircle,
        className: 'text-green-600',
        text: 'Delivered',
    },
    'In Transit': {
        Icon: Truck,
        className: 'text-blue-600',
        text: 'In Transit',
    },
    Cancelled: {
        Icon: XCircle,
        className: 'text-red-600',
        text: 'Cancelled',
    },
};


const quickActions = [
    { icon: Package, label: 'My Orders', href: '#' },
    { icon: MapPin, label: 'Saved Address', href: '#' },
    { icon: Heart, label: 'Wishlist', href: '#' },
    { icon: Wallet, label: 'Payment Modes', href: '#' },
];

function RatingDialog({ order, isOpen, onOpenChange }: { order: Order | null, isOpen: boolean, onOpenChange: (open: boolean) => void }) {
  const [ratings, setRatings] = useState<{ [key: string]: number }>({});

  if (!order) return null;

  const handleRating = (itemName: string, rating: number) => {
    setRatings(prev => ({
      ...prev,
      [itemName]: rating === ratings[itemName] ? 0 : rating, // Allow un-rating by clicking the same star
    }));
  };

  const getProductFromOrderItem = (itemName: string): Product | undefined => {
    return allProducts.find(p => p.title === itemName);
  }

  const allOrderItems = [
      ...order.items,
      // NOTE: `moreItems` is just a number, so we cannot render the actual items.
      // In a real application, the full item list should be fetched.
  ];

  const handleSubmit = () => {
    console.log("Submitting ratings:", ratings);
    onOpenChange(false);
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-full bg-background p-0 flex flex-col h-screen sm:h-auto sm:max-h-[90vh] gap-0 rounded-t-2xl sm:rounded-lg">
        <DialogHeader className="p-4 border-b flex-shrink-0">
            <div className="flex items-center justify-between">
                <div>
                    <DialogTitle className="text-lg font-bold">Rate your order</DialogTitle>
                    <p className="text-sm text-muted-foreground">{order.items.length + order.moreItems} Items • {order.total}</p>
                </div>
                 <button onClick={() => onOpenChange(false)} className="p-1 rounded-full absolute top-3.5 right-3.5 opacity-70 hover:opacity-100">
                    <X className="h-5 w-5" />
                </button>
            </div>
        </DialogHeader>

        <div className="flex-grow overflow-y-auto p-4 space-y-4">
            <h3 className="font-semibold text-md">Rate the items in your order</h3>
            <div className="divide-y">
            {allOrderItems.map((item, index) => {
                const product = getProductFromOrderItem(item.name);
                const productImage = product ? PlaceHolderImages.find(img => img.id === product.images[0]) : null;

                return (
                    <div key={index} className="flex gap-4 py-4 first:pt-0">
                        {productImage && (
                            <Image
                                src={productImage.imageUrl}
                                alt={item.name}
                                width={56}
                                height={56}
                                className="rounded-lg object-cover aspect-square border"
                                data-ai-hint={productImage.imageHint}
                            />
                        )}
                        {!productImage && (
                            <div className="w-14 h-14 bg-muted rounded-lg flex-shrink-0 border"/>
                        )}
                        <div className="flex-1">
                            <p className="font-medium text-sm leading-tight">{item.name}</p>
                            {product && (
                                <p className="text-xs text-muted-foreground mt-1">₹{product.sale_price ?? product.price} • {product.weight}</p>
                            )}
                            <div className="flex gap-1 mt-2">
                                {[...Array(5)].map((_, i) => (
                                    <Star
                                        key={i}
                                        className={cn("h-7 w-7 cursor-pointer transition-colors", (ratings[item.name] || 0) > i ? "text-yellow-400 fill-yellow-400" : "text-gray-300")}
                                        onClick={() => handleRating(item.name, i + 1)}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                )
            })}
            </div>
        </div>

        <DialogFooter className="p-4 border-t bg-background flex-shrink-0 sticky bottom-0">
          <Button size="lg" className="w-full" onClick={handleSubmit}>Submit rating</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}


export default function AccountPage() {
  const [ratingOrder, setRatingOrder] = useState<Order | null>(null);

  return (
    <div className="bg-muted/20 min-h-screen">
        {/* Profile Header */}
        <header className="bg-primary text-primary-foreground p-4 rounded-b-3xl shadow-lg relative overflow-hidden">
             <div className="absolute -right-12 -top-12 w-48 h-48 bg-primary-foreground/10 rounded-full" />
             <div className="absolute -left-16 bottom-0 w-40 h-40 bg-primary-foreground/10 rounded-full" />

            <div className="flex items-center justify-between relative z-10">
                <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20" asChild>
                    <Link href="/">
                        <ArrowLeft />
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                     <Button variant="ghost" className="rounded-full hover:bg-primary-foreground/20">
                        <HelpCircle className="mr-2 h-4 w-4" /> Help
                    </Button>
                     <Button variant="ghost" size="icon" className="hover:bg-primary-foreground/20">
                        <MoreVertical />
                    </Button>
                </div>
            </div>
            <div className="mt-4 flex items-center gap-4 relative z-10">
                <Avatar className="h-16 w-16 border-2 border-primary-foreground/50">
                    <AvatarImage src="https://picsum.photos/seed/100/100/100" />
                    <AvatarFallback>JD</AvatarFallback>
                </Avatar>
                <div>
                    <h1 className="text-2xl font-bold">John Doe</h1>
                    <p className="text-sm opacity-90">+91 98765 43210</p>
                    <p className="text-sm opacity-90">john.doe@example.com</p>
                </div>
            </div>
        </header>

        <main className="p-4 space-y-6">
            {/* Quick Actions Grid */}
            <div className="grid grid-cols-4 gap-3">
                {quickActions.map(action => (
                    <Link href={action.href} key={action.label} className="block aspect-square">
                        <Card className="w-full h-full p-3 flex flex-col items-center justify-center text-center shadow-sm hover:shadow-md transition-shadow rounded-2xl">
                            <action.icon className="h-6 w-6 text-primary mb-1" />
                            <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Menu List */}
            <Card className="overflow-hidden shadow-sm rounded-2xl">
                 <CardContent className="p-0">
                    <div className="divide-y">
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                            <div className="flex items-center gap-4">
                                <User className="h-5 w-5 text-primary" />
                                <span className="font-medium">Profile</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                            <div className="flex items-center gap-4">
                                <Ticket className="h-5 w-5 text-primary" />
                                <span className="font-medium">Coupons</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50">
                            <div className="flex items-center gap-4">
                                <Headset className="h-5 w-5 text-primary" />
                                <span className="font-medium">Support via WhatsApp</span>
                            </div>
                            <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                        <div className="flex items-center justify-between p-4 cursor-pointer hover:bg-muted/50 text-destructive">
                            <div className="flex items-center gap-4">
                                <LogOut className="h-5 w-5" />
                                <span className="font-medium">Logout</span>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Past Orders */}
            <div className="space-y-4">
                <h2 className="font-bold text-lg px-2">PAST ORDERS</h2>
                {mockOrders.map((order) => {
                    const StatusInfo = statusConfig[order.status];
                    return (
                        <Card key={order.id} className="overflow-hidden shadow-sm rounded-2xl">
                            <CardContent className="p-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <p className="font-bold text-lg">{order.id}</p>
                                    </div>
                                    {StatusInfo ? (
                                        <div className={`flex items-center font-semibold ${StatusInfo.className}`}>
                                            <span>{StatusInfo.text}</span>
                                            <StatusInfo.Icon className="h-5 w-5 ml-1" />
                                        </div>
                                    ) : (
                                        <Badge variant="secondary">{order.status}</Badge>
                                    )}
                                </div>

                                <div className="border-b pt-3 pb-4 my-3">
                                    <div className="text-sm text-muted-foreground space-y-2">
                                        {order.items.map((item, index) => (
                                            <div key={index} className="flex items-center gap-3">
                                                <span className="text-xs font-medium bg-muted px-2 py-1 rounded-md border">{item.quantity}x</span>
                                                <span className="flex-1 truncate">{item.name}</span>
                                            </div>
                                        ))}
                                        {order.moreItems > 0 && (
                                            <Link href="#" className="text-primary text-sm font-medium hover:underline ml-12">& {order.moreItems} more</Link>
                                        )}
                                    </div>
                                </div>
                                
                                {order.status === 'Delivered' && (
                                    <div className="text-center mb-4">
                                        {order.isRated ? (
                                            <div>
                                                <p className="text-xs text-muted-foreground mb-1.5">You've already rated this order</p>
                                                <Button onClick={() => setRatingOrder(order)} variant="secondary" className="w-full sm:w-auto font-semibold text-primary hover:bg-primary/10 rounded-lg">Edit Rating</Button>
                                            </div>
                                        ) : (
                                            <Button onClick={() => setRatingOrder(order)} variant="secondary" className="w-full sm:w-auto font-semibold text-primary hover:bg-primary/10 rounded-lg">Rate Order</Button>
                                        )}
                                    </div>
                                )}
                                
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Ordered: {order.date}</span>
                                    <span className="font-semibold text-foreground">Bill Total: {order.total}</span>
                                </div>
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </main>
        <RatingDialog 
            order={ratingOrder}
            isOpen={!!ratingOrder}
            onOpenChange={(open) => {
                if (!open) setRatingOrder(null);
            }}
        />
    </div>
  );
}
