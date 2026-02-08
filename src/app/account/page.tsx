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
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

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


const quickActions = [
    { icon: Package, label: 'My Orders', href: '#' },
    { icon: MapPin, label: 'Saved Address', href: '#' },
    { icon: Heart, label: 'Wishlist', href: '#' },
    { icon: Wallet, label: 'Payment Modes', href: '#' },
];

export default function AccountPage() {
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
                {mockOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden shadow-sm rounded-2xl">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="font-bold text-lg">{order.id}</p>
                                </div>
                                {order.status === 'Delivered' ? (
                                    <div className="flex items-center text-green-600 font-semibold">
                                        <CheckCircle className="h-5 w-5 mr-1" />
                                        <span>Delivered</span>
                                    </div>
                                ) : (
                                    <Badge
                                        variant={order.status === 'In Transit' ? 'secondary' : 'destructive'}
                                        className={
                                            order.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : ''
                                        }
                                    >
                                        {order.status}
                                    </Badge>
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
                                            <Button variant="outline" size="sm" className="font-semibold text-primary border-primary hover:bg-primary/10 hover:text-primary">Edit Rating</Button>
                                        </div>
                                    ) : (
                                        <Button variant="secondary" className="w-full sm:w-auto font-semibold text-primary hover:bg-primary/10">Rate Order</Button>
                                    )}
                                </div>
                            )}
                            
                            <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Ordered: {order.date}</span>
                                <span className="font-semibold text-foreground">Bill Total: {order.total}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    </div>
  );
}
