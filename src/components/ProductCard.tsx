"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useState, MouseEvent } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useFirestoreCart } from "@/hooks/use-firestore-cart";
import type { Product } from "@/types";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import { Plus, Minus, Heart } from "lucide-react";
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

  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find the corresponding placeholder image for the product.
  const productImage = PlaceHolderImages && PlaceHolderImages.find(p => p.id === product.images[0]);
  const isOutOfStock = product.stock_status === 'outofstock';

  const discount = product.sale_price ? Math.round(((product.price - product.sale_price) / product.price) * 100) : 0;

  /**
   * Handles the initial addition of a product to the cart.
   * If the user is not signed in, it initiates an anonymous sign-in process first.
   * @param e - The mouse event, to prevent navigation.
   */
  const handleInitialAdd = (e: MouseEvent) => {
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
  const incrementQuantity = (e: MouseEvent) => {
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
  const decrementQuantity = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (cartItem) {
      const newQuantity = cartItem.quantity - 1;
      updateCartItemQuantity(cartItem.id, newQuantity);
    }
  };

  /**
   * Toggles the wishlisted state of the product.
   * @param e - The mouse event, to prevent navigation.
   */
  const toggleWishlist = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    // In a real app, this would also call a function to update the user's wishlist in Firestore.
  };

  return (
    // Using a more standard card layout. `rounded-xl` for a softer modern look.
    <Card className="group w-full h-full bg-card rounded-xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col">
      <Link href={`/product/${product.sku}`} className="flex-grow flex flex-col">
        {/* Product Image Section */}
        <div className="relative w-full overflow-hidden">
          {productImage && (
            <Image
              src={productImage.imageUrl}
              alt={product.title}
              width={400}
              height={400}
              className="aspect-square w-full object-cover transition-transform duration-300 group-hover:scale-105"
              data-ai-hint={productImage.imageHint}
            />
          )}

          {/* Wishlist Heart Button */}
          <Button
            size="icon"
            variant="ghost"
            className="absolute top-2 right-2 z-20 h-8 w-8 rounded-full bg-background/50 backdrop-blur-sm hover:bg-background/75"
            onClick={toggleWishlist}
          >
            <Heart className={cn(
              "h-5 w-5 text-red-500 transition-all",
              isWishlisted ? "fill-red-500" : "fill-transparent"
            )} />
            <span className="sr-only">Add to wishlist</span>
          </Button>

          {discount > 0 && !isOutOfStock && (
            <Badge variant="destructive" className="absolute top-2 left-2 z-10">{discount}% OFF</Badge>
          )}
          {isOutOfStock && (
            <Badge variant="secondary" className="absolute top-2 left-2 z-10 text-xs">Out of Stock</Badge>
          )}
        </div>

        {/* Product Details Section */}
        <div className="p-3 flex-grow flex flex-col">
          <h3 className="font-semibold text-xs md:text-sm line-clamp-2 text-left flex-grow">{product.title}</h3>
        </div>
      </Link>

      {/* Bottom Action Area: Sits at the bottom. Contains price and button. */}
      <div className="p-3 pt-0 mt-auto flex justify-between items-center gap-1">
        {/* Price */}
        <div className="flex flex-row items-baseline gap-0.5">
          <p className={cn("font-bold price text-foreground", "text-sm md:text-base")}>
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
            <div className="flex items-center h-9 rounded-full bg-primary/10 dark:bg-primary/20 p-1 gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 rounded-full border border-primary text-primary hover:bg-primary/20"
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-center text-primary font-bold text-sm tabular-nums px-1 min-w-[1rem]">
                {cartItem.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="w-6 h-6 rounded-full border border-primary text-primary hover:bg-primary/20"
                onClick={incrementQuantity}
                aria-label="Increase quantity"
                disabled={cartItem.quantity >= product.stock_qty}
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="h-9 px-4 rounded-full border-primary text-primary bg-primary/10 hover:bg-primary/20 hover:text-primary font-bold"
              onClick={handleInitialAdd}
              aria-label="Add to cart"
            >
              ADD
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
