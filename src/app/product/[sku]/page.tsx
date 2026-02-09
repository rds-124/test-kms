
"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products as allProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Star, Minus, Plus, ShieldCheck, Truck, Info } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useFirestoreCart } from '@/hooks/use-firestore-cart';
import { useUser, useAuth } from '@/firebase';
import { initiateAnonymousSignIn } from '@/firebase/non-blocking-login';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useIsMobile } from '@/hooks/use-mobile';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

export default function ProductPage() {
  const params = useParams();
  const { sku } = params;
  const { toast } = useToast();
  const { user, isUserLoading } = useUser();
  const auth = useAuth();
  const { getCartItem, addToCart, updateCartItemQuantity, isLoading: isCartLoading } = useFirestoreCart();
  const isMobile = useIsMobile();

  const product = allProducts.find((p) => p.sku === sku);
  const cartItem = product ? getCartItem(product.sku) : undefined;
  
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!product) {
    return (
      <div className="container mx-auto text-center py-20">
        <h1 className="text-2xl font-bold">Product not found</h1>
      </div>
    );
  }
  
  const isOutOfStock = product.stock_status === 'outofstock';
  const relatedProducts = allProducts.filter(p => p.category === product.category && p.sku !== product.sku).slice(0, 4);

  const discount = product.sale_price
    ? Math.round(((product.price - product.sale_price) / product.price) * 100)
    : 0;

  const handleAddToCart = () => {
    if (!user && !isUserLoading) {
        initiateAnonymousSignIn(auth);
        setTimeout(() => {
            if (auth.currentUser) {
                addToCart(product, 1);
                toast({
                  title: "Added to cart",
                  description: `1 x ${product.title} has been added.`,
                });
            }
        }, 1000); 
    } else if (user) {
        addToCart(product, 1);
        toast({
          title: "Added to cart",
          description: `1 x ${product.title} has been added.`,
        });
    }
  };

  const handleQuantityUpdate = (newQuantity: number) => {
    if (cartItem) {
      updateCartItemQuantity(cartItem.id, newQuantity);
    }
  };

  const formatPrice = (price: number) => {
    if (!isClient) {
      return `₹${price.toFixed(2)}`;
    }
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
    }).format(price);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image Carousel */}
        <Carousel className="w-full">
          <CarouselContent>
            {product.images.map((imgId, index) => {
              const image = PlaceHolderImages.find(p => p.id === imgId);
              return (
                <CarouselItem key={index}>
                  <Card className='overflow-hidden'>
                    <CardContent className="p-0 flex aspect-square items-center justify-center">
                    {image && (
                      <Image
                        src={image.imageUrl}
                        alt={`${product.title} - ${index + 1}`}
                        width={600}
                        height={600}
                        className="object-cover w-full h-full"
                        data-ai-hint={image.imageHint}
                      />
                    )}
                    </CardContent>
                  </Card>
                </CarouselItem>
              );
            })}
          </CarouselContent>
          <CarouselPrevious className="left-4"/>
          <CarouselNext className="right-4"/>
        </Carousel>

        {/* Product Details */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.title}</h1>
            {product.kannada_title && (
              <p className="text-xl text-muted-foreground mt-1">{product.kannada_title}</p>
            )}
            {product.weight && (
              <p className="text-muted-foreground text-lg mt-1">{product.weight}</p>
            )}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-yellow-400 fill-current' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(12 reviews)</span>
          </div>

          <div className="flex items-baseline gap-2">
            <p className="text-3xl font-bold text-foreground inline-flex items-baseline price">
              {formatPrice(product.sale_price ?? product.price)}
            </p>
            {product.sale_price && (
              <p className="text-xl text-muted-foreground mrp">
                {formatPrice(product.price)}
              </p>
            )}
            {discount > 0 && <Badge variant="destructive">{discount}% OFF</Badge>}
          </div>

          <p className="text-muted-foreground">{product.short_description}</p>

          <Separator />

          <div className="space-y-4">
            {isOutOfStock ? (
              <Button size="lg" className="w-full rounded-full" disabled>Out of Stock</Button>
            ) : isCartLoading ? (
                <Button size="lg" className="w-full rounded-full" disabled>Loading...</Button>
            ) : cartItem ? (
                <div className="flex w-full justify-center">
                    <div className="flex items-center h-12 rounded-full bg-primary/10 dark:bg-primary/20 p-2 gap-2 border border-primary w-48">
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 rounded-full text-primary hover:bg-primary/20"
                            onClick={() => handleQuantityUpdate(cartItem.quantity - 1)}
                            aria-label="Decrease quantity"
                        >
                            <Minus className="h-5 w-5" />
                        </Button>
                        <span className="flex-1 text-center text-primary font-bold text-lg tabular-nums">
                            {cartItem.quantity}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            className="w-8 h-8 rounded-full text-primary hover:bg-primary/20"
                            onClick={() => handleQuantityUpdate(cartItem.quantity + 1)}
                            aria-label="Increase quantity"
                            disabled={cartItem.quantity >= product.stock_qty}
                        >
                            <Plus className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            ) : (
                <Button size="lg" className="w-full rounded-full" onClick={handleAddToCart} disabled={isUserLoading}>
                  Add to Cart
                </Button>
            )}
            
            {isOutOfStock && (
                <Button variant="outline" className='w-full rounded-full'>Notify Me When Available</Button>
            )}
          </div>
          

          <Card className="bg-secondary/50">
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span>Authentic products from Karavali</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-accent" />
                <span>Free shipping within 5 km on orders over ₹799</span>
                {isMobile ? (
                  <Popover>
                    <PopoverTrigger asChild>
                      <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                    </PopoverTrigger>
                    <PopoverContent className="w-auto max-w-[240px] p-2 text-sm">
                      <p>Delivery distance is calculated from our store location.</p>
                    </PopoverContent>
                  </Popover>
                ) : (
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Info className="h-4 w-4 text-muted-foreground cursor-pointer" />
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Delivery distance is calculated from our store location.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </CardContent>
          </Card>

          <Separator />
          
          <div>
            <h3 className="font-bold text-lg mb-2">Description</h3>
            <p className="text-muted-foreground whitespace-pre-line">{product.description}</p>
          </div>
        </div>
      </div>

      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div className="mt-16">
            <h2 className="text-3xl font-headline font-bold text-center mb-8">You Might Also Like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map(p => <ProductCard key={p.sku} product={p} />)}
            </div>
        </div>
      )}
    </div>
  );
}
