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
      <Link href={`/product/${product.sku}`} className="flex flex-col flex-grow p-4">
        
        {/* Product Image Section */}
        <div className="relative w-full">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.title}
              width={400}
              height={400}
              className="aspect-square w-full object-contain"
              data-ai-hint={productImage.imageHint}
            />
          )}
          {isOutOfStock && (
            <Badge variant="secondary" className="absolute top-2 right-2">Out of Stock</Badge>
          )}
        </div>
        
        {/* Product Details Section: uses flex-grow to push price to the bottom of this section. */}
        <div className="flex flex-col flex-grow mt-2">
            <h3 className="font-semibold text-lg line-clamp-2">{product.title}</h3>
            {product.weight && <p className="text-muted-foreground text-sm">{product.weight}</p>}
            
            {/* Price section pushed to the bottom via mt-auto */}
            <div className="mt-auto pt-2">
                <p className={`font-bold text-2xl price`}>
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
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full text-white hover:bg-green-700 hover:text-white" onClick={decrementQuantity} aria-label="Decrease quantity">
                    <Minus className="h-5 w-5" />
                </Button>
                <span className="font-bold text-lg w-8 text-center tabular-nums">{cartItem.quantity}</span>
                <Button variant="ghost" size="icon" className="w-12 h-12 rounded-full text-white hover:bg-green-700 hover:text-white" onClick={incrementQuantity} aria-label="Increase quantity" disabled={cartItem.quantity >= product.stock_qty}>
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