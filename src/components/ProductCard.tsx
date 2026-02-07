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
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
};

/**
 * ProductCard component displays a single product with an interactive add-to-cart functionality.
 * This version is designed to be more compact, especially for mobile grids.
 */
export default function ProductCard({ product }: ProductCardProps) {
  // Firebase and cart hooks to manage state and actions.
  const auth = useAuth();
  const { user } = useUser();
  const { getCartItem, addToCart, updateCartItemQuantity } = useFirestoreCart();
  
  const cartItem = getCartItem(product.sku);

  // Find the corresponding placeholder image for the product.
  const productImage = PlaceHolderImages && PlaceHolderImages.find(p => p.id === product.images[0]);
  const isOutOfStock = product.stock_status === 'outofstock';

  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;

  /**
   * Handles the initial addition of a product to the cart.
   * If the user is not signed in, it initiates an anonymous sign-in process first.
   * @param e - The mouse event, to prevent navigation.
   */
  const handleInitialAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
        initiateAnonymousSignIn(auth);
    }
    addToCart(product);
  };
  
  /**
   * Increases the quantity of an item already in the cart.
   * @param e - The mouse event, to prevent navigation.
   */
  const incrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
        const newQuantity = cartItem.quantity + 1;
        // Respect the stock quantity limit.
        if (newQuantity <= product.stock_qty) {
            updateCartItemQuantity(cartItem.id, newQuantity);
        }
    }
  };
  
  /**
   * Decreases the quantity of an item in the cart.
   * If the quantity becomes 0, the item is removed.
   * @param e - The mouse event, to prevent navigation.
   */
  const decrementQuantity = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
        const newQuantity = cartItem.quantity - 1;
        updateCartItemQuantity(cartItem.id, newQuantity);
    }
  };

  return (
    // Using a more standard card layout. `rounded-xl` for a softer modern look.
    <Card className="group w-full h-full bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col">
      <Link href={`/product/${product.sku}`} className="flex-grow flex flex-col">
        {/* Product Image Section */}
        <div className="relative w-full">
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
          {discount > 0 && !isOutOfStock && (
            <Badge variant="destructive" className="absolute top-2 left-2 z-10">{discount}% OFF</Badge>
          )}
          {isOutOfStock && (
            <Badge variant="secondary" className="absolute top-2 right-2 z-10 text-xs">Out of Stock</Badge>
          )}
        </div>
        
        {/* Product Details Section */}
        <div className="p-3 flex-grow flex flex-col">
            <h3 className="font-semibold text-xs line-clamp-2 text-left flex-grow">{product.title}</h3>
        </div>
      </Link>
      
      {/* Bottom Action Area: Sits at the bottom. Contains price and button. */}
      <div className="p-3 pt-0 mt-auto flex justify-between items-center gap-1">
          {/* Price */}
          <div className="flex flex-col items-start">
              <p className={cn("font-bold price", "text-sm")}>
                  ₹{product.sale_price ?? product.price}
              </p>
              {product.sale_price && (
                  <p className="text-xs text-muted-foreground mrp">
                      ₹{product.price}
                  </p>
              )}
          </div>

          {/* Action Button/Quantity Selector */}
          <div className="flex items-center">
            {isOutOfStock ? (
                <div className="text-xs font-bold text-destructive px-2">
                    Out of Stock
                </div>
            ) : cartItem && cartItem.quantity > 0 ? (
                <div className="flex items-center h-7 rounded-md bg-green-500/10 dark:bg-green-400/10 overflow-hidden">
                    <Button variant="ghost" size="icon" className="w-7 h-7 rounded-none text-green-700 dark:text-green-300 hover:bg-green-500/20" onClick={decrementQuantity} aria-label="Decrease quantity">
                        <Minus className="h-3 w-3" />
                    </Button>
                    <span className="flex items-center justify-center px-1 h-7 text-green-800 dark:text-green-200 font-bold text-xs tabular-nums">{cartItem.quantity}</span>
                    <Button variant="ghost" size="icon" className="w-7 h-7 rounded-none text-green-700 dark:text-green-300 hover:bg-green-500/20" onClick={incrementQuantity} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
                        <Plus className="h-3 w-3" />
                    </Button>
                </div>
            ) : (
                <Button 
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 rounded-md bg-zinc-100 dark:bg-zinc-800 text-green-800 dark:text-green-300 hover:bg-zinc-200 dark:hover:bg-zinc-700"
                    onClick={handleInitialAdd}
                    aria-label="Add to cart"
                >
                    <Plus className="h-4 w-4"/>
                </Button>
            )}
          </div>
      </div>
    </Card>
  );
}
