export type CurrencyCode = 'GBP' | 'USD' | 'EUR' | 'AED' | 'CAD' | 'AUD' | 'PKR' | 'SAR';
export type LanguageCode = 'en' | 'es' | 'fr' | 'de' | 'ar' | 'ur';

export interface CompanyInfo {
  name: string;
  logo?: string;
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
  supplierId?: SupplierId;
  supplierName?: string;
  supplierProductId?: string;
  supplierSku?: string;
  warehouse?: string;
  costPrice?: number;
  shippingCost?: number;
  estimatedDeliveryDays?: string;
  countryOfOrigin?: string;
  supplierRating?: number;
  suppliersList?: SupplierSource[];
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
  supplierId?: SupplierId;
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
  supplierFulfillmentStatus?: 'pending' | 'sent_to_supplier' | 'confirmed' | 'shipped' | 'delivered' | 'failed';
  supplierId?: SupplierId;
  supplierOrderId?: string;
  trackingProvider?: TrackingProvider;
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

export type UserRole = 'super_admin' | 'admin' | 'manager' | 'inventory_manager' | 'marketing' | 'customer_support' | 'staff' | 'customer';

export type PaymentMethod = 'stripe' | 'paypal' | 'google_pay' | 'apple_pay' | 'klarna' | 'wise' | 'bank_transfer' | 'cod';

export type SupplierId =
  | 'cj_dropshipping'
  | 'aliexpress'
  | 'zendrop'
  | 'spocket'
  | 'syncee'
  | 'autods'
  | 'dsers'
  | 'modalyst'
  | 'printful'
  | 'printify';

export interface SupplierConfig {
  id: SupplierId;
  name: string;
  logo: string;
  description: string;
  status: 'connected' | 'disconnected' | 'standby' | 'error';
  apiKey?: string;
  apiSecret?: string;
  email?: string;
  warehouse?: string;
  currency?: CurrencyCode;
  language?: LanguageCode;
  shippingCountry?: string;
  lastConnectedAt?: string;
  rateLimitPerMin?: number;
  activeProductsCount?: number;
  avgShippingDays?: string;
  rating?: number;
}

export interface SupplierSource {
  supplierId: SupplierId;
  supplierName: string;
  supplierProductId: string;
  supplierSku: string;
  warehouse: string;
  costPrice: number;
  shippingCost: number;
  estimatedDeliveryDays: string;
  countryOfOrigin: string;
  rating: number;
  inventory: number;
  isPrimary?: boolean;
}

export interface PricingRule {
  id: string;
  name: string;
  supplierId: SupplierId | 'all';
  category: string | 'all';
  brand: string | 'all';
  markupType: 'percentage' | 'fixed' | 'hybrid';
  percentageValue: number;
  fixedValue: number;
  roundingMode: 'none' | 'round_99' | 'round_95';
  minProfitMargin: number;
  maxProfitMargin?: number;
  includeShippingInMarkup: boolean;
  includeVatInMarkup: boolean;
  currencyConversionMultiplier: number;
  automaticDiscountPercent: number;
  active: boolean;
}

export interface ImportSettingsOptions {
  importTitle: boolean;
  importDescription: boolean;
  importSpecifications: boolean;
  importImages: boolean;
  importVideos: boolean;
  importVariants: boolean;
  importAttributes: boolean;
  importWeight: boolean;
  importDimensions: boolean;
  importSupplierSku: boolean;
  importReviews: boolean;
  importSupplierPrice: boolean;
  targetWarehouse: string;
  targetBrand?: string;
  targetCategory?: string;
  targetTags?: string[];
}

export interface AutomationRule {
  id: string;
  name: string;
  trigger: 'order_placed' | 'low_stock' | 'price_increase' | 'shipping_delay';
  conditionValue?: string;
  action: 'auto_fulfill' | 'auto_switch_lowest_price' | 'auto_switch_fastest_shipping' | 'auto_adjust_price' | 'notify_admin';
  active: boolean;
}

export interface ImportJob {
  id: string;
  supplierId: SupplierId;
  supplierName: string;
  query: string;
  importType: 'keyword' | 'url' | 'sku' | 'category' | 'brand' | 'collection' | 'trending' | 'bestseller' | 'new_arrival' | 'discounted';
  totalFound: number;
  importedCount: number;
  failedCount: number;
  status: 'running' | 'completed' | 'failed' | 'partial';
  createdAt: string;
  errorLog?: string[];
}

export type TrackingProvider = 'cj_tracking' | 'seventeen_track' | 'aftership' | 'parcel_panel';

export interface SupplierAnalyticsMetric {
  supplierId: SupplierId;
  supplierName: string;
  totalOrders: number;
  onTimeDeliveryRate: number; // percentage
  avgShippingDays: number;
  defectReturnRate: number; // percentage
  avgProfitMargin: number; // percentage
  costEfficiencyScore: number; // 0-100
}

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

export type PageId =
  | 'home'
  | 'header'
  | 'footer'
  | 'header_footer'
  | 'navigation_menu'
  | 'mega_menu'
  | 'all_pages'
  | 'hero_section'
  | 'featured_categories'
  | 'featured_products'
  | 'category_page'
  | 'collection_page'
  | 'search_page'
  | 'cart_page'
  | 'wishlist_page'
  | 'trending'
  | 'bestsellers'
  | 'flash_sales'
  | 'collections'
  | 'about_us'
  | 'contact'
  | 'faq'
  | 'privacy_policy'
  | 'terms_conditions'
  | 'return_policy'
  | 'shipping_policy'
  | 'policies'
  | 'blogs'
  | 'announcement_bar'
  | 'popup_banner'
  | 'landing_page'
  | 'page_404'
  | 'maintenance_page'
  | 'product_detail'
  | 'checkout'
  | 'thank_you'
  | 'customer_dashboard'
  | string;

export type BlockType =
  | 'hero'
  | 'slider'
  | 'heading'
  | 'paragraph'
  | 'image'
  | 'video'
  | 'button'
  | 'product_grid'
  | 'category_carousel'
  | 'countdown_timer'
  | 'testimonial'
  | 'reviews'
  | 'faq_accordion'
  | 'trust_badges'
  | 'payment_icons'
  | 'newsletter_signup'
  | 'contact_form'
  | 'blog_feed'
  | 'recently_viewed'
  | 'recommended_products'
  | 'maps'
  | 'image_gallery'
  | 'social_media'
  | 'custom_html'
  | 'custom_css'
  | 'custom_js'
  | 'columns';

export interface PageBlock {
  id: string;
  type: BlockType;
  title: string;
  content: string;
  imageUrl?: string;
  videoUrl?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundColor?: string;
  textColor?: string;
  visible: boolean;
  order: number;
  scheduleStart?: string;
  scheduleEnd?: string;
  paddingY?: number;
  customCss?: string;
  customJs?: string;
  settings?: Record<string, any>;
}

export interface WebsitePageConfig {
  id: PageId;
  title: string;
  slug: string;
  isPublished: boolean;
  metaTitle: string;
  metaDescription: string;
  blocks: PageBlock[];
  updatedAt: string;
  customHeaderHtml?: string;
  customFooterHtml?: string;
}

export interface GlobalThemeConfig {
  primaryColor: string;
  secondaryColor: string;
  accentColor: string;
  backgroundColorLight: string;
  backgroundColorDark: string;
  textColorLight?: string;
  textColorDark?: string;
  borderColor?: string;
  fontFamilyHeading: string;
  fontFamilyBody: string;
  fontSizeBase?: number;
  buttonStyle: 'rounded-full' | 'rounded-xl' | 'rounded-md' | 'square';
  buttonPaddingX?: number;
  buttonPaddingY?: number;
  borderRadius: number; // in px
  cardShadow?: 'none' | 'sm' | 'md' | 'lg' | '2xl';
  layoutWidth: 'contained' | 'fluid' | 'narrow';
  enableDarkMode: boolean;
  activeMode?: 'light' | 'dark';
  logoUrl: string;
  logoHeightPx?: number;
  faviconUrl: string;
  announcementText: string;
  announcementLink: string;
  showAnnouncement: boolean;
  announcementBgColor?: string;
  announcementTextColor?: string;
  whatsappNumber: string;
  supportPhone: string;
  supportEmail: string;
  addressText: string;
  // Header Builder settings
  showSearchBar?: boolean;
  showCategoriesDropdown?: boolean;
  showLanguageSelector?: boolean;
  showCurrencySelector?: boolean;
  showWishlistIcon?: boolean;
  showCartIcon?: boolean;
  showTrackOrderLink?: boolean;
  showAccountLink?: boolean;
  stickyHeader?: boolean;
  // Footer Builder settings
  footerColumnsCount?: number;
  copyrightText?: string;
  showPaymentIcons?: boolean;
  showTrustBadgesFooter?: boolean;
  showNewsletterFooter?: boolean;
  // Custom Code Injection
  customCssGlobal?: string;
  customJsGlobal?: string;
  googleAnalyticsId?: string;
  facebookPixelId?: string;
  tiktokPixelId?: string;
  headerScriptsHtml?: string;
  footerScriptsHtml?: string;
}

export interface MediaAsset {
  id: string;
  name: string;
  url: string;
  type: 'image' | 'video' | 'pdf' | 'document' | 'icon';
  sizeBytes: number;
  folder: string;
  dimensions?: string;
  createdAt: string;
}

export interface EmailTemplateConfig {
  id: 'order_confirmation' | 'shipping_update' | 'refund' | 'password_reset' | 'newsletter' | 'abandoned_cart' | 'welcome';
  name: string;
  subject: string;
  previewText: string;
  bodyHtml: string;
  active: boolean;
}

export interface SEOCenterConfig {
  siteTitle: string;
  siteDescription: string;
  keywords: string[];
  ogImage: string;
  twitterHandle: string;
  canonicalUrl: string;
  robotsTxt: string;
  enableSitemap: boolean;
  structuredDataJsonLd: string;
}

export interface SiteBackupPoint {
  id: string;
  timestamp: string;
  creator: string;
  sizeMb: number;
  description: string;
  dataJson: string;
}

// =========================================================================
// AHMADIFY AI BUSINESS OPERATING SYSTEM (AI BOS) TYPES
// =========================================================================

export type AIAgentType =
  | 'ceo'
  | 'marketing'
  | 'seo'
  | 'product_manager'
  | 'inventory_manager'
  | 'supplier_manager'
  | 'finance'
  | 'support'
  | 'designer'
  | 'writer'
  | 'ads'
  | 'developer'
  | 'security'
  | 'analyst';

export type AIExecutionMode =
  | 'suggestion'
  | 'preview'
  | 'approval'
  | 'automatic'
  | 'simulation'
  | 'rollback';

export interface AIToolCall {
  id: string;
  toolName: string;
  description: string;
  parameters: Record<string, any>;
  status: 'pending' | 'executing' | 'approved' | 'rejected' | 'completed' | 'failed' | 'rolled_back';
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  affectedEntities: string[];
  backupCreated: boolean;
  timestamp: string;
  result?: any;
  rollbackData?: any;
}

export interface AIBOSActionLog {
  id: string;
  prompt: string;
  agent: AIAgentType;
  mode: AIExecutionMode;
  timestamp: string;
  summary: string;
  toolCalls: AIToolCall[];
  riskLevel: 'low' | 'medium' | 'high' | 'critical';
  status: 'completed' | 'pending_approval' | 'rejected' | 'rolled_back';
  estimatedTime: string;
  responseMessage?: string;
  affectedPages?: string[];
  affectedProductsCount?: number;
}

export interface AIBOSPlugin {
  id: string;
  name: string;
  category: 'payment' | 'dropshipping' | 'analytics' | 'marketing' | 'crm' | 'shipping' | 'ai' | 'automation';
  description: string;
  iconName: string;
  installed: boolean;
  version: string;
  author: string;
  official: boolean;
  settings?: Record<string, any>;
}

export interface AIAuditIssue {
  id: string;
  type: 'broken_link' | 'missing_image' | 'seo_error' | 'security_alert' | 'low_profit' | 'inventory_warning' | 'supplier_sync' | 'failed_payment' | 'accessibility';
  severity: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  affectedItem?: string;
  suggestedTool: string;
  toolParams: Record<string, any>;
  resolved: boolean;
}

