export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'AED' | 'CAD' | 'AUD' | 'PKR' | 'SAR';
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ar' | 'ur';

export interface CompanyInfo {
  name: string;
  type: string;
  domain: string;
  email: string;
  whatsapp: string;
  phone: string;
  registeredOffice: {
    line1: string;
    line2: string;
    city: string;
    postcode: string;
    country: string;
  };
  registrationNumber: string;
  vatNumber: string;
  defaultCurrency: CurrencyCode;
  defaultTaxRatePercent: number;
  defaultShippingFee: number;
  freeShippingThreshold: number;
}

export interface BusinessHours {
  mondayToFriday: string;
  saturday: string;
  sunday: string;
}

export interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
  youtube?: string;
  tiktok?: string;
  whatsapp?: string;
}

export interface MapLocation {
  address: string;
  latitude: number;
  longitude: number;
  embedUrl: string;
}

export interface LegalPolicyDoc {
  key: string; // 'about' | 'contact' | 'faq' | 'privacy' | 'cookie' | 'terms' | 'shipping' | 'refund' | 'cancellation' | 'payment' | 'warranty' | 'track' | 'accessibility'
  title: string;
  lastUpdated: string;
  content: string;
}

export interface SEOSettings {
  defaultTitle: string;
  titleTemplate: string;
  defaultDescription: string;
  defaultKeywords: string[];
  ogImage: string;
  canonicalBase: string;
  twitterHandle: string;
  homepageTitle: string;
  homepageDescription: string;
  blogTitleTemplate: string;
}

export interface AnalyticsSettings {
  ga4Id: string;
  gscVerification: string;
  clarityId: string;
  metaPixelId: string;
  enabled: boolean;
}

export interface AISEOResult {
  seoTitle: string;
  metaDescription: string;
  imageAltText: string;
  keywords: string[];
  internalLinks: string[];
  productTags: string[];
}

export interface ProductVariant {
  id: string;
  name: string; // e.g., "Color: Space Gray, Size: 256GB"
  color?: string;
  size?: string;
  sku: string;
  price: number;
  stock: number;
  image?: string;
}

export interface ProductSpecification {
  key: string;
  value: string;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
}

export interface Product {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDescription: string;
  price: number;
  originalPrice?: number;
  category: string;
  brand: string;
  images: string[];
  videoUrl?: string;
  videos?: string[];
  stock: number;
  sku: string;
  cjProductId?: string;
  cjVariantId?: string;
  profitMarginPercent?: number;
  variants: ProductVariant[];
  specifications: ProductSpecification[];
  rating: number;
  reviewCount: number;
  reviews?: ProductReview[];
  tags: string[];
  isFeatured?: boolean;
  isFlashDeal?: boolean;
  isNewArrival?: boolean;
  createdAt: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  itemCount: number;
}

export interface CartItem {
  productId: string;
  variantId?: string;
  title: string;
  image: string;
  sku: string;
  price: number;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface Address {
  fullName: string;
  street: string;
  city: string;
  postcode: string;
  country: string;
  phone: string;
}

export type OrderStatus =
  | 'pending'
  | 'paid'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';
export type PaymentMethod = 'stripe' | 'paypal' | 'cod';

export interface Order {
  id: string;
  orderNumber: string; // e.g. AHM-98241
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: Address;
  items: CartItem[];
  subtotal: number;
  taxAmount: number;
  shippingCost: number;
  discountAmount: number;
  totalAmount: number;
  currency: CurrencyCode;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  orderStatus: OrderStatus;
  trackingNumber?: string;
  carrier?: string;
  estimatedDelivery?: string;
  cjSyncStatus?: 'synced' | 'pending' | 'failed' | 'not_applicable';
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface CJProduct {
  cjId: string;
  name: string;
  category: string;
  priceUsd: number;
  suggestedRetailPriceUsd: number;
  image: string;
  variantsCount: number;
  rating: number;
  cjSku: string;
  shippingCostEstimateUsd: number;
  stock: number;
}

export interface CJSyncLog {
  id: string;
  timestamp: string;
  type: 'inventory' | 'price' | 'order' | 'import' | 'status';
  status: 'success' | 'warning' | 'error';
  message: string;
  details?: string;
}

export interface Coupon {
  code: string;
  discountPercent?: number;
  fixedDiscountAmount?: number;
  minSpend?: number;
  validUntil: string;
  usageCount: number;
  active: boolean;
}

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'staff' | 'customer';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  addresses?: Address[];
  createdAt: string;
}

export interface AuditLog {
  id: string;
  timestamp: string;
  userEmail: string;
  userRole: UserRole;
  action: string;
  details: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  image: string;
  date: string;
  readTime: string;
  tags: string[];
}
