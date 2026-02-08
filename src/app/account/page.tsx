
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
  Bell,
  Trash2,
  Wallet,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const mockOrders = [
  { id: 'ORD001', date: 'Nov 23, 2023', status: 'Delivered', total: '₹1250.00', items: 'Authentic Ghee Roast Masala & 2 more' },
  { id: 'ORD002', date: 'Dec 05, 2023', status: 'In Transit', total: '₹850.50', items: 'Crispy Jackfruit Chips' },
  { id: 'ORD003', date: 'Jan 10, 2024', status: 'Cancelled', total: '₹450.00', items: 'Homemade Mango Pickle' },
];

const quickActions = [
    { icon: Package, label: 'My Orders', href: '#' },
    { icon: MapPin, label: 'Addresses', href: '#' },
    { icon: Heart, label: 'Wishlist', href: '#' },
    { icon: Wallet, label: 'Payments', href: '#' },
];

const menuItems = [
    { icon: Bell, label: 'Notifications' },
    { icon: LogOut, label: 'Logout' },
    { icon: Trash2, label: 'Delete Account', isDestructive: true },
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
            <div className="grid grid-cols-4 gap-3 text-center">
                {quickActions.map(action => (
                    <Link href={action.href} key={action.label}>
                        <Card className="p-3 flex flex-col items-center justify-center aspect-square shadow-sm hover:shadow-md transition-shadow">
                            <action.icon className="h-6 w-6 text-primary mb-1" />
                            <span className="text-xs font-medium text-muted-foreground">{action.label}</span>
                        </Card>
                    </Link>
                ))}
            </div>

            {/* Menu List */}
            <Card className="overflow-hidden shadow-sm">
                 <CardContent className="p-0">
                    <div className="divide-y">
                    {menuItems.map(item => (
                        <div
                            key={item.label}
                            className={`flex items-center justify-between p-4 ${item.isDestructive ? 'text-destructive' : 'text-foreground'} ${item.label === 'Logout' ? 'cursor-pointer hover:bg-muted/50' : ''}`}
                        >
                            <div className="flex items-center gap-4">
                                <item.icon className="h-5 w-5" />
                                <span className="font-medium">{item.label}</span>
                            </div>
                            {item.label === 'Notifications' ? <Switch /> : <ChevronRight className="h-5 w-5 text-muted-foreground" />}
                        </div>
                    ))}
                    </div>
                </CardContent>
            </Card>

            {/* Past Orders */}
            <div className="space-y-4">
                <h2 className="font-bold text-lg px-2">PAST ORDERS</h2>
                {mockOrders.map((order) => (
                    <Card key={order.id} className="overflow-hidden shadow-sm">
                        <CardContent className="p-4">
                            <div className="flex justify-between items-start">
                                <div>
                                    <p className="font-bold text-primary">{order.id}</p>
                                    <p className="text-xs text-muted-foreground">{order.date}</p>
                                    <p className="text-sm mt-2">{order.items}</p>
                                </div>
                                <div className="text-right flex flex-col items-end">
                                    <Badge
                                        variant={
                                            order.status === 'Delivered' ? 'default' : order.status === 'In Transit' ? 'secondary' : 'destructive'
                                        }
                                        className={
                                            order.status === 'Delivered' ? 'bg-green-100 text-green-800' : 
                                            order.status === 'In Transit' ? 'bg-yellow-100 text-yellow-800' : ''
                                        }
                                    >
                                        {order.status}
                                    </Badge>
                                    <p className="font-semibold mt-2">{order.total}</p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </main>
    </div>
  );
}
