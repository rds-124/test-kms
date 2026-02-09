export type Product = {
  sku: string;
  title: string;
  kannada_title?: string;
  category: string;
  sub_category?: string;
  price: number;
  sale_price?: number;
  currency: 'INR';
  weight?: string;
  stock_qty: number;
  stock_status: 'instock' | 'outofstock';
  description: string;
  short_description: string;
  images: string[];
  tags?: string[];
  brand?: string;
  gst_rate?: number;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  imageId: string;
};
export type SubCategory = {
  id: string;
  name: string;
  slug: string;
  imageId: string;
};

// This type is now managed by src/hooks/use-firestore-cart.ts
// It remains here for other parts of the app that might need the type definition.
export type CartItem = {
  id: string; // Firestore document ID
  product: Product;
  quantity: number;
};
