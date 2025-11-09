"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";
import type { Product } from "@/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Plus, Minus } from "lucide-react";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, cartItems, updateQuantity } = useCart();
  const { toast } = useToast();
  const [isClient, setIsClient] = useState(false);
  const [quantity, setQuantity] = useState(1);
  
  const cartItem = cartItems.find(item => item.product.sku === product.sku);

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

  const productImage = PlaceHolderImages && PlaceHolderImages.find(p => p.id === product.images[0]);
  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;
  
  const isOutOfStock = product.stock_status === 'outofstock';

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, quantity);
    toast({
      title: "Added to cart",
      description: `${quantity} x ${product.title} has been added.`,
    });
  };

  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newQuantity = cartItem ? cartItem.quantity + 1 : quantity + 1;
    if (newQuantity <= product.stock_qty) {
      if (cartItem) {
        updateQuantity(product.sku, newQuantity);
      } else {
        setQuantity(newQuantity);
      }
    }
  };
  
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const newQuantity = cartItem ? cartItem.quantity - 1 : quantity - 1;
    if (newQuantity > 0) {
      if (cartItem) {
        updateQuantity(product.sku, newQuantity);
      } else {
        setQuantity(newQuantity);
      }
    } else if(cartItem) {
        updateQuantity(product.sku, 0); // remove from cart
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
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col">
      <Link href={`/product/${product.sku}`} className="block flex-grow">
        <CardContent className="p-0">
          <div className="relative">
            {productImage && (
              <Image
                src={productImage.imageUrl}
                alt={product.title}
                width={400}
                height={400}
                className="aspect-square w-full object-cover"
                data-ai-hint={productImage.imageHint}
              />
            )}
            {discount > 0 && (
              <Badge variant="destructive" className="absolute top-2 left-2">{discount}% OFF</Badge>
            )}
             {isOutOfStock && (
              <Badge variant="secondary" className="absolute top-2 right-2">Out of Stock</Badge>
            )}
          </div>
          <div className="p-4 space-y-2">
            <h3 className="font-semibold text-base truncate h-6">{product.title}</h3>
            <div className="flex items-baseline gap-2">
              <p className={`font-bold text-lg ${product.sale_price ? 'text-primary' : ''} inline-flex items-baseline price`}>
                {formatPrice(product.sale_price ?? product.price)}
              </p>
              {product.sale_price && (
                <p className="text-sm text-muted-foreground mrp">
                  {formatPrice(product.price)}
                </p>
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <div className="px-4 pb-4 mt-auto">
        {isOutOfStock ? (
           <Button className="w-full" disabled variant="outline">
              Out of Stock
          </Button>
        ) : cartItem ? (
          <div className="flex items-center justify-center">
            <Button variant="outline" size="icon" className="h-9 w-9" onClick={decrementQuantity} aria-label="Decrease quantity">
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-bold text-lg w-12 text-center tabular-nums">{cartItem.quantity}</span>
             <Button variant="outline" size="icon" className="h-9 w-9" onClick={incrementQuantity} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        ) : (
            <div className="flex items-center gap-2">
                <div className="flex items-center border rounded-md">
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={decrementQuantity} aria-label="Decrease quantity">
                        <Minus className="h-4 w-4" />
                    </Button>
                    <span className="font-bold text-base w-8 text-center tabular-nums">{quantity}</span>
                    <Button variant="ghost" size="icon" className="h-9 w-9" onClick={incrementQuantity} aria-label="Increase quantity" disabled={quantity >= product.stock_qty}>
                        <Plus className="h-4 w-4" />
                    </Button>
                </div>
                <Button 
                    className="w-full flex-1 bg-green-600 hover:bg-green-700 text-white rounded-full"
                    onClick={handleAddToCart}
                >
                    Add
                </Button>
            </div>
        )}
      </div>
    </Card>
  );
}
