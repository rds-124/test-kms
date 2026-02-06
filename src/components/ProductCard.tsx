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
 * It features a modern, curvy design inspired by grocery apps, where the action button
 * is seamlessly integrated into the card's rounded base.
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
    // Main card container: uses flex-col, rounded-3xl, and overflow-hidden to achieve the integrated button look.
    <Card className="group w-full flex flex-col h-full bg-background rounded-3xl shadow-md overflow-hidden transition-all duration-300 text-center hover:shadow-xl">
      
      {/* The linkable area containing the product image and details. It grows to fill available space. */}
      <Link href={`/product/${product.sku}`} className="flex flex-col flex-grow">
        
        {/* Product Image Section */}
        {/* The image is set to cover its container, ensuring a uniform and larger look. */}
        {/* The card's `overflow-hidden` and `rounded-3xl` will give the image its curvy look. */}
        <div className="relative w-full">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.title}
              width={400}
              height={400}
              className="aspect-square w-full object-cover" // Changed from object-contain
              data-ai-hint={productImage.imageHint}
            />
          )}
          {discount > 0 && !isOutOfStock && (
            <Badge variant="destructive" className="absolute top-2 left-2 z-10">{discount}% OFF</Badge>
          )}
          {isOutOfStock && (
            <Badge variant="secondary" className="absolute top-2 right-2 z-10">Out of Stock</Badge>
          )}
        </div>
        
        {/* Product Details Section: uses flex-grow to push price to the bottom of this section. Padding is added here instead of the Link. */}
        <div className="flex flex-col flex-grow mt-2 p-4">
            <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
            {/* Weight has been removed as requested. */}
            
            {/* Price section pushed to the bottom. Prices are now on the same line. */}
            <div className="mt-auto pt-2 flex items-baseline justify-center gap-2">
                <p className={`font-bold text-lg price`}>
                    ₹{product.sale_price ?? product.price}
                </p>
                {product.sale_price && (
                    <p className="text-xs text-muted-foreground mrp">
                        ₹{product.price}
                    </p>
                )}
            </div>
        </div>
      </Link>
      
      {/* Bottom Action Area: Sits at the bottom of the flex container. The parent's overflow-hidden clips its bottom corners. */}
      <div className="mt-auto">
        {isOutOfStock ? (
            // Disabled state for out-of-stock items.
            <div className="h-14 flex items-center justify-center bg-muted font-bold text-muted-foreground">
                Out of Stock
            </div>
        ) : cartItem && cartItem.quantity > 0 ? (
            // Active state: Quantity selector with a green background.
            <div className="h-14 bg-green-600 flex items-center justify-evenly text-white transition-all duration-300">
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full text-white ring-1 ring-white/50 hover:bg-white/10" onClick={decrementQuantity} aria-label="Decrease quantity">
                    <Minus className="h-5 w-5" />
                </Button>
                <span className="font-bold text-lg w-8 text-center tabular-nums">{cartItem.quantity}</span>
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full text-white ring-1 ring-white/50 hover:bg-white/10" onClick={incrementQuantity} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
                    <Plus className="h-5 w-5" />
                </Button>
            </div>
        ) : (
            // Default state: A full-width button to add the item.
            <button 
                className="w-full h-14 bg-secondary transition-colors group-hover:bg-green-100 text-green-600 flex items-center justify-center"
                onClick={handleInitialAdd}
                aria-label="Add to cart"
            >
                <Plus className="h-7 w-7"/>
            </button>
        )}
      </div>
    </Card>
  );
}
