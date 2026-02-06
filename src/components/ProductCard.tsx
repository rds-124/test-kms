"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import type { Product } from "@/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Plus, Minus } from "lucide-react";
import { useUser, useAuth } from "@/firebase";
import { initiateAnonymousSignIn } from "@/firebase/non-blocking-login";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const auth = useAuth();
  const { user } = useUser();
  const { getCartItem, addToCart, updateCartItemQuantity } = useFirestoreCart();
  
  const cartItem = getCartItem(product.sku);

  const productImage = PlaceHolderImages && PlaceHolderImages.find(p => p.id === product.images[0]);
  const isOutOfStock = product.stock_status === 'outofstock';

  const handleInitialAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
        initiateAnonymousSignIn(auth);
    }
    addToCart(product);
  };
  
  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
        const newQuantity = cartItem.quantity + 1;
        if (newQuantity <= product.stock_qty) {
            updateCartItemQuantity(cartItem.id, newQuantity);
        }
    }
  };
  
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
        const newQuantity = cartItem.quantity - 1;
        updateCartItemQuantity(cartItem.id, newQuantity);
    }
  };

  return (
    <Card className="w-full overflow-hidden transition-all duration-300 hover:shadow-lg flex flex-col h-full text-center">
      <Link href={`/product/${product.sku}`} className="flex flex-col flex-grow">
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
          {isOutOfStock && (
            <Badge variant="secondary" className="absolute top-2 right-2">Out of Stock</Badge>
          )}
        </div>
        
        <div className="p-4 flex flex-col flex-grow justify-between">
            <div className="space-y-1">
                <h3 className="font-semibold text-base">{product.title}</h3>
                {product.brand && <p className="text-muted-foreground text-sm">({product.brand})</p>}
                <p className="text-muted-foreground text-xs pt-1">{product.weight}</p>
            </div>
            <div className="pt-2">
                <p className={`font-bold text-2xl price`}>
                    ₹{product.sale_price ?? product.price}
                </p>
                {product.sale_price && (
                    <p className="text-base text-muted-foreground mrp">
                        ₹{product.price}
                    </p>
                )}
            </div>
        </div>
      </Link>
      
      <div className="px-4 pb-4">
        {isOutOfStock ? (
          <Button className="w-full h-11" disabled variant="outline">
              Out of Stock
          </Button>
        ) : cartItem && cartItem.quantity > 0 ? (
          <div className="flex items-center justify-between bg-green-600 text-white rounded-lg h-11 w-full px-1">
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-green-700 hover:text-white rounded-md" onClick={decrementQuantity} aria-label="Decrease quantity">
              <Minus className="h-5 w-5" />
            </Button>
            <span className="font-bold text-base w-8 text-center tabular-nums">{cartItem.quantity}</span>
            <Button variant="ghost" size="icon" className="h-9 w-9 text-white hover:bg-green-700 hover:text-white rounded-md" onClick={incrementQuantity} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        ) : (
          <Button 
            className="w-full h-11 text-2xl font-light"
            variant="secondary"
            onClick={handleInitialAdd}
          >
            <Plus className="h-6 w-6"/>
          </Button>
        )}
      </div>
    </Card>
  );
}
