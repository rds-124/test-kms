"use client";

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { products as allProducts } from '@/lib/products';
import { PlaceHolderImages } from '@/lib/placeholder-images';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { useCart } from '@/hooks/use-cart';
import { useToast } from '@/hooks/use-toast';
import { Star, Minus, Plus, ShoppingCart, ShieldCheck, Truck } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

export default function ProductPage() {
  const params = useParams();
  const { sku } = params;
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);
  const [isClient, setIsClient] = useState(false);

  const product = allProducts.find((p) => p.sku === sku);
  const cartItem = cartItems.find(item => item.product.sku === product?.sku);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (cartItem) {
      setQuantity(cartItem.quantity);
    } else {
      setQuantity(1);
    }
  }, [cartItem]);

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
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} has been added.`,
    });
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
  
  const handleQuantityUpdate = (newQuantity: number) => {
    if (newQuantity > 0) {
      updateQuantity(product.sku, newQuantity);
    } else {
      updateQuantity(product.sku, 0); // This will remove the item via the logic in useCart
    }
  };

  const handleLocalQuantityChange = (newQuantity: number) => {
    if (newQuantity > 0 && newQuantity <= product.stock_qty) {
        setQuantity(newQuantity);
    }
  }

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
          <h1 className="text-3xl lg:text-4xl font-headline font-bold">{product.title}</h1>
          
          <div className="flex items-center gap-2">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className={`h-5 w-5 ${i < 4 ? 'text-primary fill-current' : 'text-muted-foreground'}`} />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">(12 reviews)</span>
          </div>

          <div className="flex items-baseline gap-2">
            <p className={`text-3xl font-bold ${product.sale_price ? 'text-primary' : ''} inline-flex items-baseline price`}>
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
              <Button size="lg" className="w-full" disabled>Out of Stock</Button>
            ) : cartItem ? (
                <div className="flex items-center gap-4">
                    <p className='font-semibold'>In Cart:</p>
                    <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" onClick={() => handleQuantityUpdate(cartItem.quantity - 1)} aria-label="Decrease quantity">
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-12 text-center font-bold tabular-nums">{cartItem.quantity}</span>
                    <Button variant="ghost" size="icon" onClick={() => handleQuantityUpdate(cartItem.quantity + 1)} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
                        <Plus className="h-4 w-4" />
                    </Button>
                    </div>
                </div>
            ) : (
              <div className="flex items-center gap-4">
                <div className="flex items-center border rounded-md">
                  <Button variant="ghost" size="icon" onClick={() => handleLocalQuantityChange(quantity - 1)} aria-label="Decrease quantity">
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-12 text-center font-bold tabular-nums">{quantity}</span>
                  <Button variant="ghost" size="icon" onClick={() => handleLocalQuantityChange(quantity + 1)} aria-label="Increase quantity">
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <Button size="lg" className="flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full" onClick={handleAddToCart}>
                  Add to Cart
                </Button>
              </div>
            )}
            
            {isOutOfStock && (
                <Button variant="outline" className='w-full'>Notify Me When Available</Button>
            )}
          </div>
          

          <Card className="bg-secondary/50">
            <CardContent className="p-4 space-y-2 text-sm">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-accent" />
                <span>Authentic products from Tulunadu</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="h-5 w-5 text-accent" />
                <span>Free shipping on orders over ₹799</span>
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
