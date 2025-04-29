import { Product, BulkDiscount } from '../types/product';

export const calculateDiscountedPrice = (
  product: Product,
  quantity: number,
  weightOption: string
): { finalPrice: number; savings: number; appliedDiscount?: BulkDiscount } => {
  const basePrice = product.price * parseFloat(weightOption);
  let discountedPrice = basePrice;
  let appliedDiscount: BulkDiscount | undefined;

  // Apply product discount if available
  if (product.discount) {
    discountedPrice = basePrice * (1 - product.discount / 100);
  }

  // Check for bulk discounts
  if (product.bulkDiscounts && product.bulkDiscounts.length > 0) {
    // Sort discounts by quantity in descending order to get the best discount
    const eligibleDiscounts = product.bulkDiscounts
      .filter(discount => quantity >= discount.minQuantity)
      .sort((a, b) => b.discountPercentage - a.discountPercentage);

    if (eligibleDiscounts.length > 0) {
      appliedDiscount = eligibleDiscounts[0];
      discountedPrice = discountedPrice * (1 - appliedDiscount.discountPercentage / 100);
    }
  }

  const finalPrice = discountedPrice * quantity;
  const savings = (basePrice * quantity) - finalPrice;

  return {
    finalPrice,
    savings,
    appliedDiscount,
  };
};

export const getAvailableSubscriptionSavings = (
  product: Product,
  quantity: number,
  weightOption: string
): number => {
  if (!product.subscriptionOptions) return 0;

  // Get the highest discount percentage from available subscription options
  const maxDiscount = Math.max(
    ...product.subscriptionOptions.map(option => option.discountPercentage)
  );

  const regularPrice = product.price * parseFloat(weightOption) * quantity;
  const potentialSavings = regularPrice * (maxDiscount / 100);

  return potentialSavings;
};