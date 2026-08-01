import { Product, Category, Order, CJProduct, CJSyncLog, Coupon, User, AuditLog, BlogPost, CompanyInfo, BusinessHours, SocialLinks, MapLocation, LegalPolicyDoc, SEOSettings, AnalyticsSettings } from '../types';

export const INITIAL_COMPANY_INFO: CompanyInfo = {
  name: "ahmadify.store",
  type: "Official E-Commerce Storefront",
  domain: "https://www.ahmadify.store",
  email: "ahmadify.ltd@gmail.com",
  whatsapp: "+92 317 8031001",
  phone: "+92 317 8031001",
  registeredOffice: {
    line1: "OFFICE 12846",
    line2: "182–184 High Street North, East Ham",
    city: "London",
    postcode: "E6 2JA",
    country: "United Kingdom"
  },
  registrationNumber: "UK-12846920",
  vatNumber: "GB98240182",
  defaultCurrency: "GBP",
  defaultTaxRatePercent: 20, // 20% UK VAT
  defaultShippingFee: 4.99,
  freeShippingThreshold: 50.00
};

export const INITIAL_BUSINESS_HOURS: BusinessHours = {
  mondayToFriday: "09:00 AM – 06:00 PM GMT",
  saturday: "10:00 AM – 04:00 PM GMT",
  sunday: "Closed (Online Support 24/7)"
};

export const INITIAL_SOCIAL_LINKS: SocialLinks = {
  facebook: "https://facebook.com/ahmadify.store",
  instagram: "https://instagram.com/ahmadify.store",
  twitter: "https://x.com/ahmadify_store",
  linkedin: "https://linkedin.com/company/ahmadify-ltd",
  youtube: "https://youtube.com/@ahmadifystore",
  tiktok: "https://tiktok.com/@ahmadify.official",
  whatsapp: "https://wa.me/923178031001"
};

export const INITIAL_MAP_LOCATION: MapLocation = {
  address: "OFFICE 12846, 182–184 High Street North, East Ham, London, E6 2JA, United Kingdom",
  latitude: 51.5369,
  longitude: 0.0519,
  embedUrl: "https://maps.google.com/maps?q=182-184%20High%20Street%20North%20East%20Ham%20London%20E6%202JA&t=&z=15&ie=UTF8&iwloc=&output=embed"
};

export const INITIAL_SEO_SETTINGS: SEOSettings = {
  defaultTitle: "ahmadify.store | Premium Electronics & Modern Living Essentials",
  titleTemplate: "%s | ahmadify.store",
  defaultDescription: "ahmadify.store (Official Online Storefront). Factory direct smart electronics, luxury timepieces & fashion essentials with free UK delivery.",
  defaultKeywords: ["ahmadify.store", "AHMADIFY", "smart electronics", "luxury watches", "CJdropshipping", "UK online store", "buy tech online"],
  ogImage: "/logo.png",
  canonicalBase: "https://www.ahmadify.store",
  twitterHandle: "@ahmadify_store",
  homepageTitle: "ahmadify.store — Official Online Store | Smart Tech & Luxury Essentials",
  homepageDescription: "Shop high quality smart gadgets, luxury watches & fashion accessories directly at ahmadify.store. Fast UK express shipping & 24/7 WhatsApp support.",
  blogTitleTemplate: "%s — ahmadify.store Insights & Guides"
};

export const INITIAL_ANALYTICS_SETTINGS: AnalyticsSettings = {
  ga4Id: "G-AHMADIFY9921",
  gscVerification: "gsc_verification_ahmadify_ltd_2026",
  clarityId: "clarity_ahm_82710",
  metaPixelId: "1982401829384",
  enabled: true
};

export const INITIAL_POLICIES: LegalPolicyDoc[] = [
  {
    key: "about",
    title: "About Us",
    lastUpdated: "2026-07-31",
    content: `# About AHMADIFY LTD

**AHMADIFY LTD** is a Private Company Limited by Shares incorporated and registered in **England and Wales** under Company Registration Number **UK-12846920**.

### Registered Office Address
OFFICE 12846  
182–184 HIGH STREET NORTH  
EAST HAM, LONDON  
UNITED KINGDOM, E6 2JA  

### Company Overview & Mission
AHMADIFY LTD operates as a modern international eCommerce business via our primary domain [https://www.ahmadify.store](https://www.ahmadify.store). Our mission is to curate and deliver high-performance smart electronics, luxury timepieces, ergonomic home decor, and premium apparel directly to customers worldwide without inflated middleman retail markups.

We partner directly with leading factory suppliers and automated fulfillment networks (such as CJdropshipping) while maintaining strict UK quality assurance standards, 256-bit SSL encrypted PCI payment security, and dedicated customer support.`
  },
  {
    key: "contact",
    title: "Contact Us",
    lastUpdated: "2026-07-31",
    content: `# Contact & Customer Support

At **AHMADIFY LTD**, customer satisfaction is our highest priority. We offer multi-channel support for order inquiries, returns, tracking, and wholesale requests.

### Direct Contact Channels
- **Email:** [ahmadify.ltd@gmail.com](mailto:ahmadify.ltd@gmail.com) *(Guaranteed response within 12 business hours)*
- **WhatsApp Support:** [+92 317 8031001](https://wa.me/923178031001) *(Available 24/7 for instant tracking & chat)*
- **Primary Website:** [https://www.ahmadify.store](https://www.ahmadify.store)

### Registered Office Location
AHMADIFY LTD  
OFFICE 12846, 182–184 HIGH STREET NORTH, EAST HAM  
LONDON, UNITED KINGDOM, E6 2JA  

### Customer Service Hours
- **Monday – Friday:** 09:00 AM – 06:00 PM GMT
- **Saturday:** 10:00 AM – 04:00 PM GMT
- **Sunday & UK Bank Holidays:** Closed for office visits *(Online WhatsApp & Email support active)*`
  },
  {
    key: "faq",
    title: "Frequently Asked Questions (FAQ)",
    lastUpdated: "2026-07-31",
    content: `# Frequently Asked Questions

### 1. Who is AHMADIFY LTD?
AHMADIFY LTD is a registered Private Company Limited by Shares in England and Wales (Reg No: UK-12846920), operating the store [https://www.ahmadify.store](https://www.ahmadify.store).

### 2. How long does shipping take?
UK express deliveries arrive within 2–4 business days. International express shipments generally take 5–8 business days depending on destination customs clearance.

### 3. How can I track my order?
Use our interactive "Track Your Order" tool in the navigation menu. Enter your Order ID (e.g. AHM-98241) or tracking number to view carrier dispatch status.

### 4. Are customs duties and import taxes included?
Orders shipped within the UK include applicable UK VAT (20%). For international shipments outside the UK, customers are solely responsible for any applicable local customs duties, tariffs, and import taxes levied by their country's customs authority.

### 5. What payment methods do you accept?
We accept Stripe (Credit/Debit Cards), Visa, MasterCard, Apple Pay, Google Pay, PayPal, and Cash on Delivery (COD where eligible).`
  },
  {
    key: "privacy",
    title: "Privacy Policy",
    lastUpdated: "2026-07-31",
    content: `# Privacy Policy & Data Protection

**AHMADIFY LTD** ("we", "us", "our") is committed to protecting the privacy and personal data of visitors and customers on [https://www.ahmadify.store](https://www.ahmadify.store) in compliance with the UK General Data Protection Regulation (UK GDPR) and Data Protection Act 2018.

### Data We Collect
- **Contact & Identification Data:** Name, email address, phone number, shipping and billing address.
- **Order & Transaction Data:** Items purchased, transaction totals, payment method identifiers. *(We never store raw credit card numbers)*.
- **Technical & Usage Data:** IP address, browser type, cookies, and page interaction telemetry.

### Purpose of Processing
1. Processing and fulfilling customer orders and logistics dispatches.
2. Sending order confirmations, shipping updates, and UK official invoices.
3. Providing responsive customer support via WhatsApp and email.
4. Detecting and preventing fraud or unauthorized transactions.

### Data Security & Rights
We utilize 256-bit SSL encryption across all servers. You have the right to request access to your personal data, request correction or deletion, or withdraw consent at any time by contacting **ahmadify.ltd@gmail.com**.`
  },
  {
    key: "cookie",
    title: "Cookie Policy",
    lastUpdated: "2026-07-31",
    content: `# Cookie Policy

**AHMADIFY LTD** uses cookies and similar tracking technologies on [https://www.ahmadify.store](https://www.ahmadify.store) to enhance navigation, analyze site traffic, and optimize your shopping experience.

### Types of Cookies Used
- **Essential Cookies:** Necessary for core site functionality, cart persistence, and secure checkout login.
- **Performance & Analytics Cookies:** Google Analytics 4 (GA4) and Microsoft Clarity cookies help us understand aggregate page performance and user interactions.
- **Preference Cookies:** Remember currency preference (GBP, USD, EUR) and cookie consent status.

You can adjust your browser settings to refuse or block cookies at any time, though some site features may require essential cookies to operate correctly.`
  },
  {
    key: "terms",
    title: "Terms & Conditions",
    lastUpdated: "2026-07-31",
    content: `# Terms & Conditions of Business

Welcome to **AHMADIFY LTD** ([https://www.ahmadify.store](https://www.ahmadify.store)). By placing an order or accessing this website, you agree to be bound by these Terms and Conditions.

### 1. Company Identification
AHMADIFY LTD is a Private Company Limited by Shares registered in England and Wales under Registration Number **UK-12846920**. Registered Office: OFFICE 12846, 182–184 High Street North, East Ham, London, E6 2JA, United Kingdom.

### 2. Pricing & Currency
All prices listed on the website default to **GBP (£)** and include applicable UK VAT unless stated otherwise. We reserve the right to correct pricing errors prior to order dispatch.

### 3. Order Acceptance
Receipt of an electronic order confirmation does not signify our final acceptance of your order. We reserve the right to decline or cancel any order in cases of stock unavailability or suspected fraudulent activity.

### 4. Governing Law
These Terms & Conditions are governed by and construed in accordance with the laws of **England and Wales**.`
  },
  {
    key: "shipping",
    title: "Shipping & Delivery Policy",
    lastUpdated: "2026-07-31",
    content: `# Shipping & Delivery Policy

**AHMADIFY LTD** delivers across the United Kingdom and internationally using tracked logistics networks including Royal Mail, CJ Express Special Line, and DHL.

### Shipping Rates & Speeds
- **UK Standard Shipping:** £4.99 flat rate.
- **UK Free Delivery:** FREE on all orders with subtotal of **£50.00** or higher.
- **International Shipping:** Calculated at checkout based on destination country.

### Processing & Customs Duties Notice
- **Dispatch Time:** Orders are processed within 1 business day.
- **Customs & Import Taxes Notice:** For all international orders delivered outside the United Kingdom, **customers are solely responsible for paying any local customs duties, VAT, import taxes, or clearance fees** required by their destination country's customs authorities.`
  },
  {
    key: "refund",
    title: "Return & Refund Policy",
    lastUpdated: "2026-07-31",
    content: `# 30-Day Return & Refund Policy

At **AHMADIFY LTD**, we take pride in the quality of every product sold on [https://www.ahmadify.store](https://www.ahmadify.store). If you are not satisfied with your purchase, you may return it within **30 days** of delivery.

### Return Conditions
1. Items must be unused, in original condition, and returned with original packaging and tags attached.
2. Proof of purchase (Order Number e.g. AHM-98241 or receipt) is required.

### Refund Procedure
Contact our customer support team at **ahmadify.ltd@gmail.com** or WhatsApp **+92 317 8031001** to obtain a Return Authorization. Once returned items are received and inspected, refunds are credited back to the original payment method (Stripe or PayPal) within 3–5 business days.`
  },
  {
    key: "cancellation",
    title: "Cancellation Policy",
    lastUpdated: "2026-07-31",
    content: `# Order Cancellation Policy

### Cancelling Before Dispatch
You may request an immediate full cancellation and refund for your order before it has been processed and dispatched by our warehouse team.

To cancel your order:
- WhatsApp us instantly at **+92 317 8031001** with your Order ID.
- Email **ahmadify.ltd@gmail.com** with the subject "URGENT CANCELLATION - [Order Number]".

If the order has already been handed over to the shipping carrier, it cannot be recalled in transit; however, you may return the package upon arrival following our 30-Day Return Policy.`
  },
  {
    key: "payment",
    title: "Payment Policy",
    lastUpdated: "2026-07-31",
    content: `# Payment Policy & Security

**AHMADIFY LTD** provides multi-currency, PCI-DSS Level 1 compliant secure payment methods on [https://www.ahmadify.store](https://www.ahmadify.store).

### Accepted Payment Methods
1. **Credit & Debit Cards:** Visa, MasterCard, American Express via Stripe.
2. **Digital Wallets:** Apple Pay & Google Pay.
3. **PayPal Express Checkout.**
4. **Cash on Delivery (COD):** Available for selected destination regions.

### Payment Protection
All card transactions are processed over encrypted 256-bit SSL connections. AHMADIFY LTD does not store sensitive cardholder details on site databases.`
  },
  {
    key: "warranty",
    title: "Warranty & Guarantee Policy",
    lastUpdated: "2026-07-31",
    content: `# Warranty Policy

All electronic items, luxury timepieces, and smart gadgets sold by **AHMADIFY LTD** come with a **12-Month Manufacturer Limited Warranty** covering defects in materials and craftsmanship.

### What is Covered
- Internal electrical failure, battery defects, and mechanical assembly faults under normal operating conditions.

### What is Not Covered
- Damage resulting from accidental drops, liquid immersion beyond specified IP ratings, unauthorized repairs, or normal wear and tear.`
  },
  {
    key: "track",
    title: "Track Your Order Policy",
    lastUpdated: "2026-07-31",
    content: `# Track Your Order

Every order placed with **AHMADIFY LTD** includes real-time end-to-end tracking capabilities.

### How to Track
1. Enter your **Order Number** (e.g., AHM-98241) into our online order tracking tool.
2. View current status: *Order Placed → Paid → CJ Fulfillment Sync → Shipped → Out for Delivery*.
3. Click the provided carrier tracking link (Royal Mail or CJ Packet) for live courier telemetry.`
  },
  {
    key: "accessibility",
    title: "Accessibility Statement",
    lastUpdated: "2026-07-31",
    content: `# Accessibility Statement

**AHMADIFY LTD** is committed to ensuring digital accessibility for individuals of all abilities browsing [https://www.ahmadify.store](https://www.ahmadify.store).

### Measures Implemented
- High contrast color themes (WCAG 2.1 AA compliant).
- Full keyboard navigation and screen-reader accessible ARIA attributes.
- Clear font scaling and responsive layout design.

If you experience any accessibility barriers while using our website, please email **ahmadify.ltd@gmail.com** or contact us via WhatsApp **+92 317 8031001** for prompt assistance.`
  }
];

export const INITIAL_CATEGORIES: Category[] = [
  {
    id: "cat-1",
    name: "Smart Electronics",
    slug: "smart-electronics",
    description: "Cutting-edge gadgets, smart audio, wearables, and home automation.",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    itemCount: 8
  },
  {
    id: "cat-2",
    name: "Luxury Accessories & Timepieces",
    slug: "luxury-accessories",
    description: "Premium watches, minimalist wallets, and crafted leather goods.",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=600&q=80",
    itemCount: 6
  },
  {
    id: "cat-3",
    name: "Home & Modern Living",
    slug: "home-living",
    description: "Aesthetic workspace lamps, ergonomic decor, and smart home essentials.",
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=600&q=80",
    itemCount: 7
  },
  {
    id: "cat-4",
    name: "Premium Fashion & Apparel",
    slug: "premium-fashion",
    description: "High-grade minimalist apparel designed for everyday comfort.",
    image: "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?auto=format&fit=crop&w=600&q=80",
    itemCount: 5
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: "prod-1",
    title: "Ahmadify Pro ANC Wireless Headphones",
    slug: "ahmadify-pro-anc-wireless-headphones",
    description: "Experience pristine studio sound with Active Noise Cancellation (ANC), 40-hour continuous battery life, ultra-comfortable memory foam earcups, and bluetooth 5.3 multipoint connectivity. Sourced directly with high quality assurance.",
    shortDescription: "Studio-grade ANC Wireless Headphones with 40h battery & Multipoint Bluetooth 5.3.",
    price: 89.99,
    originalPrice: 139.99,
    category: "Smart Electronics",
    brand: "AHMADIFY Audio",
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 45,
    sku: "AHM-AUD-001",
    cjProductId: "CJ-89021-AUD",
    cjVariantId: "CJ-VAR-BLACK",
    profitMarginPercent: 42,
    variants: [
      { id: "v1-1", name: "Matte Black", color: "Matte Black", sku: "AHM-AUD-001-BLK", price: 89.99, stock: 25 },
      { id: "v1-2", name: "Silver Gray", color: "Silver Gray", sku: "AHM-AUD-001-SLV", price: 89.99, stock: 20 }
    ],
    specifications: [
      { key: "Noise Cancellation", value: "Hybrid Active Noise Cancelling (up to -38dB)" },
      { key: "Battery Life", value: "40 Hours (ANC On) / 60 Hours (ANC Off)" },
      { key: "Charging", value: "USB-C Quick Charge (10 mins = 4 hours)" },
      { key: "Driver Unit", value: "40mm Custom Titanium Dynamic Drivers" }
    ],
    rating: 4.9,
    reviewCount: 128,
    reviews: [
      {
        id: "rev-1",
        author: "Sarah Jenkins",
        rating: 5,
        date: "2026-07-20",
        title: "Unbelievable noise cancelling!",
        comment: "I wear these on my daily London tube commute. The ANC blocks out all ambient track noise completely. Exceptional value from Ahmadify!",
        verifiedPurchase: true
      },
      {
        id: "rev-2",
        author: "David Miller",
        rating: 5,
        date: "2026-07-15",
        title: "Superb build and sound clarity",
        comment: "Crisp highs and warm deep bass without muddy distortion. Delivered in 2 days across UK.",
        verifiedPurchase: true
      }
    ],
    tags: ["Headphones", "Audio", "Wireless", "ANC", "Best Seller"],
    isFeatured: true,
    isFlashDeal: true,
    isNewArrival: false,
    createdAt: "2026-06-01T10:00:00Z"
  },
  {
    id: "prod-2",
    title: "Ahmadify Minimalist Automatic Skeleton Watch",
    slug: "ahmadify-minimalist-automatic-skeleton-watch",
    description: "Crafted from 316L surgical stainless steel with a scratch-resistant sapphire crystal lens and a Japanese self-winding automatic mechanical movement. Elegant view-through skeleton dial showcasing pure horological craftsmanship.",
    shortDescription: "Japanese Self-Winding Skeleton Automatic Watch with 316L Steel & Sapphire Lens.",
    price: 149.00,
    originalPrice: 229.00,
    category: "Luxury Accessories & Timepieces",
    brand: "AHMADIFY Time",
    images: [
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 18,
    sku: "AHM-WTC-102",
    cjProductId: "CJ-99410-WTC",
    profitMarginPercent: 55,
    variants: [
      { id: "v2-1", name: "Silver & Onyx Dial", color: "Silver", sku: "AHM-WTC-102-SLV", price: 149.00, stock: 10 },
      { id: "v2-2", name: "Rose Gold & Leather Strap", color: "Rose Gold", sku: "AHM-WTC-102-RGD", price: 159.00, stock: 8 }
    ],
    specifications: [
      { key: "Movement", value: "21-Jewel Japanese Automatic Movement" },
      { key: "Water Resistance", value: "50 Meters (5 ATM)" },
      { key: "Glass", value: "Anti-Reflective Sapphire Crystal" },
      { key: "Case Diameter", value: "41mm" }
    ],
    rating: 4.8,
    reviewCount: 64,
    tags: ["Watch", "Luxury", "Automatic", "Accessories"],
    isFeatured: true,
    isFlashDeal: false,
    isNewArrival: true,
    createdAt: "2026-07-01T10:00:00Z"
  },
  {
    id: "prod-3",
    title: "Smart Ergonomic LED Desk Lamp & Wireless Charger",
    slug: "smart-ergonomic-led-desk-lamp-wireless-charger",
    description: "Sleek architectural desk lamp featuring touch slider dimming, 5 color temperature modes (2700K - 6500K), auto timer, and a built-in 15W Fast Qi Wireless Charging Pad at the weighted aluminum base.",
    shortDescription: "5-Color Mode Eye-Care LED Lamp with 15W Fast Qi Wireless Charging Base.",
    price: 49.99,
    originalPrice: 79.99,
    category: "Home & Modern Living",
    brand: "AHMADIFY Home",
    images: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 60,
    sku: "AHM-LMP-303",
    cjProductId: "CJ-77120-LMP",
    profitMarginPercent: 38,
    variants: [
      { id: "v3-1", name: "Space Gray", color: "Space Gray", sku: "AHM-LMP-303-GRY", price: 49.99, stock: 35 },
      { id: "v3-2", name: "Pure White", color: "Pure White", sku: "AHM-LMP-303-WHT", price: 49.99, stock: 25 }
    ],
    specifications: [
      { key: "Wireless Output", value: "15W Fast Charging (Qi Standard)" },
      { key: "Brightness Level", value: "1000 Lumens Eye-Care Flicker Free" },
      { key: "USB Output", value: "5V/2.1A Extra Pass-Through Port" }
    ],
    rating: 4.7,
    reviewCount: 92,
    tags: ["Desk Lamp", "Wireless Charging", "Home Office"],
    isFeatured: true,
    isFlashDeal: true,
    isNewArrival: false,
    createdAt: "2026-06-15T10:00:00Z"
  },
  {
    id: "prod-4",
    title: "Ahmadify UltraFit Smart Fitness Tracker HR Watch",
    slug: "ahmadify-ultrafit-smart-fitness-tracker",
    description: "Track your heart rate, SpO2 blood oxygen, sleep phases, daily steps, and over 30 sports modes with 14-day battery life. Water resistant to 50M with crisp AMOLED 1.43\" display.",
    shortDescription: "AMOLED 1.43\" Fitness Watch with 14-day Battery, SpO2 & Heart Rate Monitor.",
    price: 59.99,
    originalPrice: 89.99,
    category: "Smart Electronics",
    brand: "AHMADIFY Fit",
    images: [
      "https://images.unsplash.com/photo-1510017803434-a899398421b3?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 2, // Low stock for demo alert!
    sku: "AHM-FIT-404",
    cjProductId: "CJ-55410-FIT",
    profitMarginPercent: 40,
    variants: [
      { id: "v4-1", name: "Midnight Black Silicone", color: "Black", sku: "AHM-FIT-404-BLK", price: 59.99, stock: 2 }
    ],
    specifications: [
      { key: "Display", value: "1.43 inch High Definition AMOLED" },
      { key: "Sensors", value: "PPG Heart Rate, SpO2 Oxygen, 6-Axis Accelerometer" },
      { key: "Battery", value: "300mAh (Up to 14 days normal use)" }
    ],
    rating: 4.6,
    reviewCount: 41,
    tags: ["Smartwatch", "Fitness", "Low Stock"],
    isFeatured: false,
    isFlashDeal: false,
    isNewArrival: true,
    createdAt: "2026-07-10T10:00:00Z"
  },
  {
    id: "prod-5",
    title: "Minimalist Italian Leather RFID Blocking Wallet",
    slug: "minimalist-italian-leather-rfid-wallet",
    description: "Handcrafted from full-grain vegetable-tanned Italian leather with a pop-up aluminum card holder mechanism that shields your credit cards against unauthorized RFID scanning.",
    shortDescription: "Full-Grain Italian Leather Wallet with Quick Pop-Up Aluminum RFID Card Holder.",
    price: 34.99,
    originalPrice: 49.99,
    category: "Luxury Accessories & Timepieces",
    brand: "AHMADIFY Leather",
    images: [
      "https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 50,
    sku: "AHM-WLT-505",
    cjProductId: "CJ-33290-WLT",
    profitMarginPercent: 50,
    variants: [
      { id: "v5-1", name: "Cognac Brown", color: "Cognac Brown", sku: "AHM-WLT-505-BRN", price: 34.99, stock: 30 },
      { id: "v5-2", name: "Stealth Black", color: "Stealth Black", sku: "AHM-WLT-505-BLK", price: 34.99, stock: 20 }
    ],
    specifications: [
      { key: "Material", value: "100% Genuine Italian Full Grain Leather" },
      { key: "Capacity", value: "6 Cards in Pop-Up Case + 4 Internal Slots + Cash Strap" },
      { key: "Protection", value: "Full 13.56 MHz RFID / NFC Shielding" }
    ],
    rating: 4.9,
    reviewCount: 88,
    tags: ["Leather", "Wallet", "RFID", "Accessories"],
    isFeatured: true,
    isFlashDeal: false,
    isNewArrival: false,
    createdAt: "2026-05-20T10:00:00Z"
  },
  {
    id: "prod-6",
    title: "Heavyweight Organic Cotton Minimalist Hoodie",
    slug: "heavyweight-organic-cotton-minimalist-hoodie",
    description: "450 GSM luxury heavyweight 100% GOTS-certified organic cotton. Pre-shrunk French terry fleece with double-lined hood, dropped shoulders, and clean double-needle stitching.",
    shortDescription: "450 GSM Heavyweight Organic French Terry Cotton Oversized Hoodie.",
    price: 64.99,
    originalPrice: 95.00,
    category: "Premium Fashion & Apparel",
    brand: "AHMADIFY Apparel",
    images: [
      "https://images.unsplash.com/photo-1556905055-8f358a7a47b2?auto=format&fit=crop&w=800&q=80"
    ],
    stock: 32,
    sku: "AHM-APP-606",
    cjProductId: "CJ-11029-APP",
    profitMarginPercent: 45,
    variants: [
      { id: "v6-1", name: "Oatmeal Beige / Medium", color: "Oatmeal", size: "M", sku: "AHM-APP-606-OAT-M", price: 64.99, stock: 12 },
      { id: "v6-2", name: "Oatmeal Beige / Large", color: "Oatmeal", size: "L", sku: "AHM-APP-606-OAT-L", price: 64.99, stock: 10 },
      { id: "v6-3", name: "Charcoal Gray / Large", color: "Charcoal", size: "L", sku: "AHM-APP-606-CHR-L", price: 64.99, stock: 10 }
    ],
    specifications: [
      { key: "Fabric", value: "450 GSM 100% Organic GOTS Certified Cotton" },
      { key: "Fit", value: "Relaxed Boxy Oversized Drop-Shoulder" },
      { key: "Care", value: "Machine Wash Cold inside out, Line Dry" }
    ],
    rating: 4.8,
    reviewCount: 35,
    tags: ["Fashion", "Hoodie", "Cotton", "Streetwear"],
    isFeatured: false,
    isFlashDeal: false,
    isNewArrival: true,
    createdAt: "2026-07-15T10:00:00Z"
  }
];

export const INITIAL_ORDERS: Order[] = [
  {
    id: "ord-1001",
    orderNumber: "AHM-98241",
    customerName: "Robert Hughes",
    customerEmail: "robert.hughes@example.co.uk",
    customerPhone: "+44 7700 900077",
    shippingAddress: {
      fullName: "Robert Hughes",
      street: "12 Baker Street, Marylebone",
      city: "London",
      postcode: "NW1 6XE",
      country: "United Kingdom",
      phone: "+44 7700 900077"
    },
    items: [
      {
        productId: "prod-1",
        title: "Ahmadify Pro ANC Wireless Headphones",
        image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
        sku: "AHM-AUD-001-BLK",
        price: 89.99,
        quantity: 1,
        selectedColor: "Matte Black"
      }
    ],
    subtotal: 89.99,
    taxAmount: 18.00,
    shippingCost: 0.00, // Free shipping over 50
    discountAmount: 9.00,
    totalAmount: 98.99,
    currency: "GBP",
    paymentMethod: "stripe",
    paymentStatus: "paid",
    orderStatus: "shipped",
    trackingNumber: "CJUK982410928821",
    carrier: "Royal Mail 24 Tracked",
    estimatedDelivery: "2026-08-02",
    cjSyncStatus: "synced",
    createdAt: "2026-07-29T14:32:00Z",
    updatedAt: "2026-07-30T09:15:00Z"
  },
  {
    id: "ord-1002",
    orderNumber: "AHM-98242",
    customerName: "Elena Rostova",
    customerEmail: "elena.r@example.com",
    customerPhone: "+44 7700 900112",
    shippingAddress: {
      fullName: "Elena Rostova",
      street: "45 Kensington High St",
      city: "London",
      postcode: "W8 5ED",
      country: "United Kingdom",
      phone: "+44 7700 900112"
    },
    items: [
      {
        productId: "prod-2",
        title: "Ahmadify Minimalist Automatic Skeleton Watch",
        image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
        sku: "AHM-WTC-102-SLV",
        price: 149.00,
        quantity: 1,
        selectedColor: "Silver"
      }
    ],
    subtotal: 149.00,
    taxAmount: 29.80,
    shippingCost: 0.00,
    discountAmount: 0.00,
    totalAmount: 178.80,
    currency: "GBP",
    paymentMethod: "stripe",
    paymentStatus: "paid",
    orderStatus: "processing",
    trackingNumber: "CJUK98242001928",
    carrier: "CJ Express UK",
    estimatedDelivery: "2026-08-04",
    cjSyncStatus: "synced",
    createdAt: "2026-07-30T18:12:00Z",
    updatedAt: "2026-07-31T08:00:00Z"
  }
];

export const INITIAL_CJ_CATALOG: CJProduct[] = [
  {
    cjId: "CJ-89021-AUD",
    name: "Wireless ANC Bluetooth Over-Ear Headphones Studio Master",
    category: "Smart Electronics",
    priceUsd: 42.00,
    suggestedRetailPriceUsd: 115.00,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    variantsCount: 3,
    rating: 4.9,
    cjSku: "CJSKU-AUD-89021",
    shippingCostEstimateUsd: 4.50,
    stock: 450
  },
  {
    cjId: "CJ-99410-WTC",
    name: "Mechanical Automatic Sapphire Glass Skeleton Wristwatch",
    category: "Luxury Accessories & Timepieces",
    priceUsd: 68.00,
    suggestedRetailPriceUsd: 189.00,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80",
    variantsCount: 4,
    rating: 4.8,
    cjSku: "CJSKU-WTC-99410",
    shippingCostEstimateUsd: 6.00,
    stock: 180
  },
  {
    cjId: "CJ-22019-RGB",
    name: "Smart RGB Mechanical Gaming Keyboard Hot Swappable",
    category: "Smart Electronics",
    priceUsd: 28.50,
    suggestedRetailPriceUsd: 79.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=800&q=80",
    variantsCount: 2,
    rating: 4.7,
    cjSku: "CJSKU-KBD-22019",
    shippingCostEstimateUsd: 5.20,
    stock: 620
  },
  {
    cjId: "CJ-77182-MUG",
    name: "Smart Temperature Control Heated Travel Mug 450ml",
    category: "Home & Modern Living",
    priceUsd: 19.90,
    suggestedRetailPriceUsd: 54.99,
    image: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80",
    variantsCount: 3,
    rating: 4.8,
    cjSku: "CJSKU-MUG-77182",
    shippingCostEstimateUsd: 3.80,
    stock: 310
  }
];

export const INITIAL_CJ_LOGS: CJSyncLog[] = [
  {
    id: "log-1",
    timestamp: "2026-07-31T09:00:00Z",
    type: "status",
    status: "success",
    message: "CJdropshipping API Connected successfully",
    details: "Account linked: ahmadify.ltd@gmail.com | API Key Verified"
  },
  {
    id: "log-2",
    timestamp: "2026-07-31T09:05:00Z",
    type: "order",
    status: "success",
    message: "Order AHM-98241 pushed to CJdropshipping warehouse",
    details: "CJ Order Ref: CJUK982410928821 | Status: Dispatching"
  },
  {
    id: "log-3",
    timestamp: "2026-07-31T09:10:00Z",
    type: "inventory",
    status: "success",
    message: "Automated inventory sync completed for 6 products",
    details: "Zero stock discrepancies found."
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: "AHMADIFY10",
    discountPercent: 10,
    minSpend: 20,
    validUntil: "2027-12-31",
    usageCount: 142,
    active: true
  },
  {
    code: "WELCOME20",
    fixedDiscountAmount: 20.00,
    minSpend: 100,
    validUntil: "2027-12-31",
    usageCount: 89,
    active: true
  }
];

export const INITIAL_USERS: User[] = [
  {
    id: "usr-admin-1",
    email: "ahmadify.ltd@gmail.com",
    name: "Super Admin (AHMADIFY)",
    role: "super_admin",
    phone: "+92 317 8031001",
    createdAt: "2026-01-01T00:00:00Z"
  },
  {
    id: "usr-staff-1",
    email: "manager@ahmadify.store",
    name: "Alex Store Manager",
    role: "manager",
    phone: "+44 7700 900000",
    createdAt: "2026-02-01T00:00:00Z"
  }
];

export const INITIAL_AUDIT_LOGS: AuditLog[] = [
  {
    id: "aud-1",
    timestamp: "2026-07-31T08:30:00Z",
    userEmail: "ahmadify.ltd@gmail.com",
    userRole: "super_admin",
    action: "STORE_SETTINGS_UPDATE",
    details: "Updated free shipping threshold to £50.00 and VAT rate to 20%."
  },
  {
    id: "aud-2",
    timestamp: "2026-07-31T09:15:00Z",
    userEmail: "ahmadify.ltd@gmail.com",
    userRole: "super_admin",
    action: "CJDROPSHIPPING_SYNC",
    details: "Triggered manual inventory and pricing auto-sync with CJ API."
  }
];

export const INITIAL_BLOG_POSTS: BlogPost[] = [
  {
    id: "blog-1",
    title: "How ahmadify.store Curates High-Performance Tech & Luxury Essentials",
    slug: "how-ahmadify-curates-high-performance-tech",
    excerpt: "Discover our stringent quality inspection pipeline and direct express logistics that bring premium items to your door in days.",
    content: "At ahmadify.store, we believe quality shouldn't come with exorbitant middleman markups. We partner directly with top-tier suppliers like CJdropshipping to source factory-direct electronics, timepieces, and modern living accessories.\n\nEvery item listed on https://www.ahmadify.store undergoes rigorous physical testing for durability, battery life, and finish before it is made available for international fulfillment.",
    author: "ahmadify.store Editorial Team",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-28",
    readTime: "4 min read",
    tags: ["Tech", "Quality Control", "ahmadify.store"]
  },
  {
    id: "blog-2",
    title: "The Ultimate Guide to Active Noise Cancelling (ANC) Technology in 2026",
    slug: "ultimate-guide-to-active-noise-cancelling-2026",
    excerpt: "Everything you need to know about hybrid dual-microphone ANC, transparency audio modes, and lossless Bluetooth 5.3 code streaming.",
    content: "Active Noise Cancellation has evolved drastically over the last few years. Modern ANC headsets like the Ahmadify Pro use internal and external microphones to measure ambient sound thousands of times per second, generating inverse audio waves to nullify outside noise cleanly.",
    author: "Senior Audio Engineer",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80",
    date: "2026-07-22",
    readTime: "6 min read",
    tags: ["Audio", "Headphones", "Guide"]
  }
];
