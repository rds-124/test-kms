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

/**
 * ProductCard component displays a single product with an interactive add-to-cart functionality.
 * It features a modern, curvy design inspired by grocery apps.
 */
export default function ProductCard({ product }: ProductCardProps) {
  // Firebase and cart hooks to manage state and actions.
  const auth = useAuth();
  const { user } = useUser();
  const { getCartItem, addToCart, updateCartItemQuantity } = useFirestoreCart();
  
  // Memoize getting the specific cart item to avoid re-renders.
  const cartItem = getCartItem(product.sku);

  // Find the corresponding placeholder image for the product.
  const productImage = PlaceHolderImages && PlaceHolderImages.find(p => p.id === product.images[0]);
  const isOutOfStock = product.stock_status === 'outofstock';

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
    // Main card container with soft, rounded corners and a subtle shadow.
    // The `group` class is used to manage hover states on child elements.
    <Card className="relative w-full flex flex-col h-full bg-background rounded-3xl shadow-md overflow-hidden transition-all duration-300 group text-center hover:shadow-xl">
      
      {/* Link wraps the main content of the card, leading to the product detail page.
          Padding at the bottom (`pb-16`) creates space for the absolute-positioned action area. */}
      <Link href={`/product/${product.sku}`} className="flex flex-col flex-grow pb-16">
        
        {/* Product Image Section */}
        <div className="relative p-4">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.title}
              width={400}
              height={400}
              className="aspect-square w-full object-cover rounded-2xl"
              data-ai-hint={productImage.imageHint}
            />
          )}
          {isOutOfStock && (
            <Badge variant="secondary" className="absolute top-6 right-6">Out of Stock</Badge>
          )}
        </div>
        
        {/* Product Details Section */}
        <div className="px-4 flex flex-col flex-grow justify-end">
            <div className="space-y-1">
                <h3 className="font-semibold text-base line-clamp-2">{product.title}</h3>
                <p className="text-muted-foreground text-sm">{product.weight}</p>
            </div>
            <div className="pt-2">
                <p className={`font-bold text-xl price`}>
                    ₹{product.sale_price ?? product.price}
                </p>
                {product.sale_price && (
                    <p className="text-sm text-muted-foreground mrp">
                        ₹{product.price}
                    </p>
                )}
            </div>
        </div>
      </Link>
      
      {/* Bottom Action Area: The "wave" container for the add/quantity controls. */}
      {/* This container is positioned absolutely to overlay the bottom of the card. */}
      <div className="absolute bottom-0 left-0 right-0 h-20 w-full overflow-hidden">
        {isOutOfStock ? (
            // Disabled state for out-of-stock items.
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-muted/50 rounded-t-[2rem] flex items-center justify-center transition-all duration-300">
                <span className="font-bold text-muted-foreground">Out of Stock</span>
            </div>
        ) : cartItem && cartItem.quantity > 0 ? (
            // Active state: Quantity selector with a green, curved background.
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-green-600 rounded-t-[2rem] flex items-center justify-evenly text-white transition-all duration-300">
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full text-white hover:bg-green-700 hover:text-white" onClick={decrementQuantity} aria-label="Decrease quantity">
                    <Minus className="h-5 w-5" />
                </Button>
                <span className="font-bold text-lg w-8 text-center tabular-nums">{cartItem.quantity}</span>
                <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full text-white hover:bg-green-700 hover:text-white" onClick={incrementQuantity} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
                    <Plus className="h-5 w-5" />
                </Button>
            </div>
        ) : (
            // Default state: A large "+" button to add the item to the cart.
            <div className="absolute bottom-0 left-0 right-0 h-16 bg-secondary rounded-t-[2rem] flex items-center justify-center transition-all duration-300 group-hover:bg-green-100">
                <Button 
                    className="w-12 h-12 rounded-full bg-background shadow-md hover:bg-background text-green-600 hover:scale-110 transition-transform"
                    onClick={handleInitialAdd}
                    aria-label="Add to cart"
                >
                    <Plus className="h-6 w-6"/>
                </Button>
            </div>
        )}
      </div>
    </Card>
  );
}
