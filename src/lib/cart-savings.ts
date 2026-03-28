export const FREE_SHIPPING_THRESHOLD = 799;
export const SHIPPING_COST = 50;

/**
 * Computes total savings for display in savings badges.
 * totalSavings = productDiscount + shippingSavings + couponDiscount
 */
export function computeTotalSavings({
  mrp,
  cartTotal,
  shippingFree,
  couponDiscount = 0,
}: {
  mrp: number;
  cartTotal: number;
  shippingFree: boolean;
  couponDiscount?: number;
}): number {
  const productDiscount = mrp - cartTotal;
  const shippingSavings = shippingFree ? SHIPPING_COST : 0;
  return productDiscount + shippingSavings + couponDiscount;
}
