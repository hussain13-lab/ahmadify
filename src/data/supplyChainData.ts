import { SupplierConfig, PricingRule, AutomationRule, ImportJob, SupplierAnalyticsMetric, ImportSettingsOptions } from '../types';

export const INITIAL_SUPPLIERS: SupplierConfig[] = [
  {
    id: 'cj_dropshipping',
    name: 'CJ Dropshipping',
    logo: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=120&q=80',
    description: 'Centralized global dropshipping partner with fast CJ Packet UK Special Line and warehouse fulfillment.',
    status: 'connected',
    email: 'ahmadify.ltd@gmail.com',
    apiKey: 'CJ-API-DEMO-KEY-882194',
    apiSecret: 'CJ-SEC-992104-X821',
    warehouse: 'UK Warehouse & Yiwu Primary',
    currency: 'USD',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T10:00:00Z',
    rateLimitPerMin: 120,
    activeProductsCount: 14,
    avgShippingDays: '2 - 4 Days',
    rating: 4.9
  },
  {
    id: 'aliexpress',
    name: 'AliExpress Direct / DSers',
    logo: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=120&q=80',
    description: 'Direct integration with official AliExpress Open API and DSers automatic order placing.',
    status: 'connected',
    email: 'ahmadify.ltd@gmail.com',
    apiKey: 'ALI-OPENAPI-9921820',
    apiSecret: 'ALI-SEC-88219',
    warehouse: 'Global Choice Warehouses',
    currency: 'USD',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T09:30:00Z',
    rateLimitPerMin: 180,
    activeProductsCount: 22,
    avgShippingDays: '5 - 8 Days',
    rating: 4.7
  },
  {
    id: 'zendrop',
    name: 'Zendrop Express',
    logo: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=120&q=80',
    description: 'US & European fast shipping with custom branded thank-you cards and white-label packaging.',
    status: 'connected',
    apiKey: 'ZEN-EXP-772104',
    apiSecret: 'ZEN-SEC-11204',
    warehouse: 'US East & EU Central Hub',
    currency: 'USD',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T08:15:00Z',
    rateLimitPerMin: 100,
    activeProductsCount: 8,
    avgShippingDays: '3 - 5 Days',
    rating: 4.85
  },
  {
    id: 'spocket',
    name: 'Spocket US/EU Suppliers',
    logo: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=120&q=80',
    description: 'Verified US, UK and EU dropship suppliers with discounted wholesale pricing.',
    status: 'connected',
    apiKey: 'SPOCKET-KEY-55102',
    warehouse: 'London & Frankfurt Logistics',
    currency: 'GBP',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T07:45:00Z',
    rateLimitPerMin: 90,
    activeProductsCount: 6,
    avgShippingDays: '2 - 3 Days',
    rating: 4.8
  },
  {
    id: 'syncee',
    name: 'Syncee Global Marketplace',
    logo: 'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=120&q=80',
    description: 'Automated catalog sync engine connecting hundreds of vetted global brand manufacturers.',
    status: 'connected',
    apiKey: 'SYNC-API-338210',
    warehouse: 'UK & EU Multi-Vendor Warehouses',
    currency: 'GBP',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T06:20:00Z',
    rateLimitPerMin: 150,
    activeProductsCount: 11,
    avgShippingDays: '3 - 6 Days',
    rating: 4.75
  },
  {
    id: 'autods',
    name: 'AutoDS Automation Hub',
    logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
    description: 'Automated price monitoring, auto-ordering, and multi-supplier price optimization.',
    status: 'standby',
    apiKey: 'AUTODS-TOKEN-99821',
    warehouse: 'Global Auto-Routing Hub',
    currency: 'USD',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-30T14:10:00Z',
    rateLimitPerMin: 200,
    activeProductsCount: 5,
    avgShippingDays: '4 - 7 Days',
    rating: 4.65
  },
  {
    id: 'dsers',
    name: 'DSers Official Partner',
    logo: 'https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=120&q=80',
    description: 'Bulk order processing and supplier switching tool for high-volume order management.',
    status: 'connected',
    apiKey: 'DSERS-AUTH-771204',
    warehouse: 'Shenzhen Express Hub',
    currency: 'USD',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T09:00:00Z',
    rateLimitPerMin: 300,
    activeProductsCount: 18,
    avgShippingDays: '4 - 6 Days',
    rating: 4.9
  },
  {
    id: 'modalyst',
    name: 'Modalyst Luxury Brands',
    logo: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&w=120&q=80',
    description: 'Premium fashion brands, indie designer collections, and high-margin luxury goods.',
    status: 'connected',
    apiKey: 'MODALYST-PRO-88192',
    warehouse: 'Milan & Paris Designer Hubs',
    currency: 'EUR',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T05:10:00Z',
    rateLimitPerMin: 80,
    activeProductsCount: 4,
    avgShippingDays: '3 - 5 Days',
    rating: 4.8
  },
  {
    id: 'printful',
    name: 'Printful Print-on-Demand',
    logo: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=120&q=80',
    description: 'Custom print apparel, engraved jewelry, and white-label merchandise fulfillment.',
    status: 'connected',
    apiKey: 'PRINTFUL-OAUTH-TOKEN-99210',
    warehouse: 'Wolverhampton UK Print Facility',
    currency: 'GBP',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T08:50:00Z',
    rateLimitPerMin: 120,
    activeProductsCount: 7,
    avgShippingDays: '2 - 4 Days',
    rating: 4.95
  },
  {
    id: 'printify',
    name: 'Printify Global POD Network',
    logo: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?auto=format&fit=crop&w=120&q=80',
    description: 'Global print provider network with automated routing to the nearest regional print shop.',
    status: 'connected',
    apiKey: 'PRINTIFY-KEY-330192',
    warehouse: 'UK & EU Local Print Shops',
    currency: 'GBP',
    language: 'en',
    shippingCountry: 'United Kingdom',
    lastConnectedAt: '2026-07-31T07:10:00Z',
    rateLimitPerMin: 100,
    activeProductsCount: 5,
    avgShippingDays: '2 - 4 Days',
    rating: 4.88
  }
];

export const INITIAL_PRICING_RULES: PricingRule[] = [
  {
    id: 'pr-1',
    name: 'Standard Global Profit Markup (45%)',
    supplierId: 'all',
    category: 'all',
    brand: 'all',
    markupType: 'percentage',
    percentageValue: 45,
    fixedValue: 0,
    roundingMode: 'round_99',
    minProfitMargin: 5.00,
    includeShippingInMarkup: true,
    includeVatInMarkup: true,
    currencyConversionMultiplier: 1.0,
    automaticDiscountPercent: 0,
    active: true
  },
  {
    id: 'pr-2',
    name: 'Smart Electronics Premium Margin (50% + £5)',
    supplierId: 'cj_dropshipping',
    category: 'Smart Electronics',
    brand: 'all',
    markupType: 'hybrid',
    percentageValue: 50,
    fixedValue: 5.00,
    roundingMode: 'round_99',
    minProfitMargin: 10.00,
    includeShippingInMarkup: true,
    includeVatInMarkup: true,
    currencyConversionMultiplier: 0.78, // USD to GBP
    automaticDiscountPercent: 10,
    active: true
  },
  {
    id: 'pr-3',
    name: 'Luxury Apparel & Timepieces Rule (60%)',
    supplierId: 'modalyst',
    category: 'Luxury Accessories & Timepieces',
    brand: 'all',
    markupType: 'percentage',
    percentageValue: 60,
    fixedValue: 0,
    roundingMode: 'round_95',
    minProfitMargin: 25.00,
    includeShippingInMarkup: true,
    includeVatInMarkup: true,
    currencyConversionMultiplier: 0.86, // EUR to GBP
    automaticDiscountPercent: 5,
    active: true
  }
];

export const INITIAL_DEFAULT_IMPORT_SETTINGS: ImportSettingsOptions = {
  importTitle: true,
  importDescription: true,
  importSpecifications: true,
  importImages: true,
  importVideos: true,
  importVariants: true,
  importAttributes: true,
  importWeight: true,
  importDimensions: true,
  importSupplierSku: true,
  importReviews: true,
  importSupplierPrice: true,
  targetWarehouse: 'UK Express Facility',
  targetBrand: 'AHMADIFY Select',
  targetCategory: 'Smart Electronics',
  targetTags: ['Imported', 'Verified Quality', 'Fast Shipping']
};

export const INITIAL_AUTOMATION_RULES: AutomationRule[] = [
  {
    id: 'ar-1',
    name: 'Auto-Fulfill Standard Orders Under £200',
    trigger: 'order_placed',
    conditionValue: 'total <= 200',
    action: 'auto_fulfill',
    active: true
  },
  {
    id: 'ar-2',
    name: 'Auto-Switch Supplier to Lowest Price on Out of Stock',
    trigger: 'low_stock',
    conditionValue: 'stock <= 3',
    action: 'auto_switch_lowest_price',
    active: true
  },
  {
    id: 'ar-3',
    name: 'Auto-Adjust Selling Price when Supplier Increases Cost > 10%',
    trigger: 'price_increase',
    conditionValue: 'cost_delta > 10%',
    action: 'auto_adjust_price',
    active: true
  }
];

export const INITIAL_IMPORT_JOBS: ImportJob[] = [
  {
    id: 'job-101',
    supplierId: 'cj_dropshipping',
    supplierName: 'CJ Dropshipping',
    query: 'Smart ANC Audio Devices',
    importType: 'keyword',
    totalFound: 14,
    importedCount: 14,
    failedCount: 0,
    status: 'completed',
    createdAt: '2026-07-31T08:30:00Z',
    errorLog: []
  },
  {
    id: 'job-102',
    supplierId: 'aliexpress',
    supplierName: 'AliExpress Direct',
    query: 'https://aliexpress.com/item/1005008291023.html',
    importType: 'url',
    totalFound: 1,
    importedCount: 1,
    failedCount: 0,
    status: 'completed',
    createdAt: '2026-07-31T09:12:00Z',
    errorLog: []
  }
];

export const INITIAL_SUPPLIER_ANALYTICS: SupplierAnalyticsMetric[] = [
  {
    supplierId: 'cj_dropshipping',
    supplierName: 'CJ Dropshipping',
    totalOrders: 1420,
    onTimeDeliveryRate: 98.4,
    avgShippingDays: 3.2,
    defectReturnRate: 0.6,
    avgProfitMargin: 46.5,
    costEfficiencyScore: 96
  },
  {
    supplierId: 'aliexpress',
    supplierName: 'AliExpress Direct',
    totalOrders: 980,
    onTimeDeliveryRate: 94.2,
    avgShippingDays: 5.8,
    defectReturnRate: 1.2,
    avgProfitMargin: 52.0,
    costEfficiencyScore: 91
  },
  {
    supplierId: 'zendrop',
    supplierName: 'Zendrop Express',
    totalOrders: 640,
    onTimeDeliveryRate: 99.1,
    avgShippingDays: 3.0,
    defectReturnRate: 0.4,
    avgProfitMargin: 44.0,
    costEfficiencyScore: 95
  },
  {
    supplierId: 'spocket',
    supplierName: 'Spocket US/EU',
    totalOrders: 510,
    onTimeDeliveryRate: 98.8,
    avgShippingDays: 2.5,
    defectReturnRate: 0.5,
    avgProfitMargin: 42.0,
    costEfficiencyScore: 93
  },
  {
    supplierId: 'syncee',
    supplierName: 'Syncee Marketplace',
    totalOrders: 430,
    onTimeDeliveryRate: 96.5,
    avgShippingDays: 4.1,
    defectReturnRate: 0.8,
    avgProfitMargin: 48.0,
    costEfficiencyScore: 89
  },
  {
    supplierId: 'autods',
    supplierName: 'AutoDS Hub',
    totalOrders: 290,
    onTimeDeliveryRate: 95.0,
    avgShippingDays: 4.5,
    defectReturnRate: 1.0,
    avgProfitMargin: 49.0,
    costEfficiencyScore: 87
  },
  {
    supplierId: 'dsers',
    supplierName: 'DSers Partner',
    totalOrders: 1120,
    onTimeDeliveryRate: 96.8,
    avgShippingDays: 4.8,
    defectReturnRate: 0.9,
    avgProfitMargin: 51.5,
    costEfficiencyScore: 94
  },
  {
    supplierId: 'modalyst',
    supplierName: 'Modalyst Luxury',
    totalOrders: 210,
    onTimeDeliveryRate: 97.9,
    avgShippingDays: 3.8,
    defectReturnRate: 0.3,
    avgProfitMargin: 58.0,
    costEfficiencyScore: 92
  },
  {
    supplierId: 'printful',
    supplierName: 'Printful POD',
    totalOrders: 380,
    onTimeDeliveryRate: 99.5,
    avgShippingDays: 2.8,
    defectReturnRate: 0.2,
    avgProfitMargin: 40.0,
    costEfficiencyScore: 97
  },
  {
    supplierId: 'printify',
    supplierName: 'Printify POD',
    totalOrders: 310,
    onTimeDeliveryRate: 98.0,
    avgShippingDays: 3.1,
    defectReturnRate: 0.5,
    avgProfitMargin: 41.5,
    costEfficiencyScore: 92
  }
];
