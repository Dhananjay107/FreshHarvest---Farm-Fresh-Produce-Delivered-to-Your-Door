export interface Product {
  id: number;
  name: string;
  description: string;
  longDescription?: string;
  price: number;
  image: string;
  weightOptions: string[];
  category: string;
  tags: string[];
  featured: boolean;
  seasonal: boolean;
  inStock: boolean;
  nutritionFacts?: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
  };
  origin?: string;
  storageInfo?: string;
  discount?: number;
  bulkDiscounts?: BulkDiscount[];
  availability?: RegionAvailability;
  subscriptionOptions?: SubscriptionOption[];
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
}

export interface Review {
  id: number;
  productId: number;
  userName: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BulkDiscount {
  minQuantity: number;
  discountPercentage: number;
}

export interface RegionAvailability {
  regions: string[];
  inStock: boolean;
  stockQuantity?: number;
}

export interface SubscriptionOption {
  id: string;
  name: string;
  frequency: 'weekly' | 'biweekly' | 'monthly';
  discountPercentage: number;
  description: string;
}

export interface OrderStatus {
  id: string;
  status: 'pending' | 'preparing' | 'out_for_delivery' | 'delivered';
  timestamp: number;
  location?: {
    lat: number;
    lng: number;
  };
  estimatedDeliveryTime?: string;
}

export interface Subscription {
  id: string;
  userId: string;
  plan: SubscriptionOption;
  products: {
    productId: number;
    quantity: number;
    weightOption: string;
  }[];
  preferences: {
    organicOnly: boolean;
    excludedProducts: number[];
  };
  nextDeliveryDate: string;
  status: 'active' | 'paused' | 'cancelled';
}