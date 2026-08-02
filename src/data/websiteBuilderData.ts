import {
  WebsitePageConfig,
  GlobalThemeConfig,
  MediaAsset,
  EmailTemplateConfig,
  SEOCenterConfig,
  SiteBackupPoint
} from '../types';

export const DEFAULT_THEME_CONFIG: GlobalThemeConfig = {
  primaryColor: '#F59E0B', // Amber
  secondaryColor: '#0F172A', // Slate 900
  accentColor: '#10B981', // Emerald
  backgroundColorLight: '#F8FAFC',
  backgroundColorDark: '#0B0F17',
  textColorLight: '#0F172A',
  textColorDark: '#F8FAFC',
  borderColor: '#334155',
  fontFamilyHeading: 'Playfair Display',
  fontFamilyBody: 'Plus Jakarta Sans',
  fontSizeBase: 16,
  buttonStyle: 'rounded-xl',
  buttonPaddingX: 20,
  buttonPaddingY: 10,
  borderRadius: 12,
  cardShadow: 'md',
  layoutWidth: 'contained',
  enableDarkMode: true,
  activeMode: 'dark',
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
  logoHeightPx: 40,
  faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=32&q=80',
  announcementText: '✨ FREE UK Express Delivery on Orders Over £50 | Use Code "AHMADIFY15" for 15% Off',
  announcementLink: '/offers',
  showAnnouncement: true,
  announcementBgColor: '#7C2D12',
  announcementTextColor: '#FEF3C7',
  whatsappNumber: '+44 7000 889900',
  supportPhone: '+44 20 7946 0912',
  supportEmail: 'support@ahmadify.store',
  addressText: 'Ahmadify Commerce Platform Ltd, 100 Mayfair High Street, London W1K 2AA, UK',
  // Header Builder defaults
  showSearchBar: true,
  showCategoriesDropdown: true,
  showLanguageSelector: true,
  showCurrencySelector: true,
  showWishlistIcon: true,
  showCartIcon: true,
  showTrackOrderLink: true,
  showAccountLink: true,
  stickyHeader: true,
  // Footer Builder defaults
  footerColumnsCount: 4,
  copyrightText: '© 2026 Ahmadify Commerce Platform Ltd. All Rights Reserved. Built for UK & Global Excellence.',
  showPaymentIcons: true,
  showTrustBadgesFooter: true,
  showNewsletterFooter: true,
  // Custom Code Injection
  customCssGlobal: '/* Global Custom CSS rules injected by Owner Studio */\n.owner-badge { border-radius: 9999px; }',
  customJsGlobal: '// Custom JavaScript snippet\nconsole.log("Ahmadify Owner Studio active.");',
  googleAnalyticsId: 'G-AHMADIFY9921',
  facebookPixelId: 'FB-PIXEL-882193',
  tiktokPixelId: 'TT-PIXEL-102938',
  headerScriptsHtml: '<!-- Header Tracking Scripts -->',
  footerScriptsHtml: '<!-- Footer Analytics Scripts -->'
};

export const INITIAL_WEBSITE_PAGES: WebsitePageConfig[] = [
  {
    id: 'home',
    title: 'Home Page',
    slug: '/',
    isPublished: true,
    metaTitle: 'AHMADIFY | Premier Global Online Store & Modern Lifestyle',
    metaDescription: 'Discover luxury timepieces, smart electronics, designer accessories, and home living. Express UK shipping with 100% verified quality guarantee.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-hero-1',
        type: 'hero',
        title: 'Crafted for Perfection. Curated for Luxury.',
        content: 'Experience factory-direct luxury products, high-grade smart technology, and Italian artisan accessories delivered with lightning-fast UK express shipping.',
        imageUrl: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
        ctaText: 'Explore Collection',
        ctaLink: '/products',
        backgroundColor: '#0F172A',
        textColor: '#FFFFFF',
        visible: true,
        order: 1
      },
      {
        id: 'blk-trust-1',
        type: 'trust_badges',
        title: 'The Ahmadify Guarantee',
        content: 'Inspected for quality, backed by full warranties and instant UK tracked delivery.',
        visible: true,
        order: 2
      },
      {
        id: 'blk-prod-grid-1',
        type: 'product_grid',
        title: 'Featured Luxury Selection',
        content: 'Handpicked products from our top-rated dropshipping suppliers with immediate UK dispatch.',
        visible: true,
        order: 3
      },
      {
        id: 'blk-countdown-1',
        type: 'countdown_timer',
        title: 'Flash Sale Deals - Ends Soon!',
        content: 'Get up to 40% discount on select smart watches and premium Italian leather accessories.',
        backgroundColor: '#7C2D12',
        textColor: '#FEF3C7',
        visible: true,
        order: 4
      },
      {
        id: 'blk-newsletter-1',
        type: 'newsletter_signup',
        title: 'Join the Ahmadify Insiders Club',
        content: 'Subscribe to receive private sale invitations, instant discount vouchers, and early access to dropshipping arrivals.',
        visible: true,
        order: 5
      }
    ]
  },
  {
    id: 'product_detail',
    title: 'Product Details Page Template',
    slug: '/product/:id',
    isPublished: true,
    metaTitle: 'Product Details | Ahmadify Commerce',
    metaDescription: 'View comprehensive product specifications, high-resolution media, customer reviews, and shipping estimates.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-pd-reviews',
        type: 'reviews',
        title: 'Verified Customer Reviews & Ratings',
        content: '4.9/5 Average rating across 1,280+ verified purchases.',
        visible: true,
        order: 1
      },
      {
        id: 'blk-pd-rec',
        type: 'recommended_products',
        title: 'Frequently Bought Together',
        content: 'Complete your luxury setup with these curated pairings.',
        visible: true,
        order: 2
      }
    ]
  },
  {
    id: 'category_page',
    title: 'Category & Catalog Page',
    slug: '/category/:slug',
    isPublished: true,
    metaTitle: 'Explore Categories | Ahmadify Store',
    metaDescription: 'Browse electronics, fashion, home decor, and watch collections.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-cat-grid',
        type: 'category_carousel',
        title: 'Browse All Product Categories',
        content: 'Discover hand-curated collections with express delivery.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'collection_page',
    title: 'Curated Collections Page',
    slug: '/collections',
    isPublished: true,
    metaTitle: 'Curated Collections | Ahmadify Luxury',
    metaDescription: 'Exclusive product lines and seasonal drops.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-coll-grid',
        type: 'product_grid',
        title: 'Seasonal Curated Drop',
        content: 'Limited run inventory sourced direct from prime manufacturers.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'cart_page',
    title: 'Shopping Cart Page',
    slug: '/cart',
    isPublished: true,
    metaTitle: 'Your Shopping Cart | Ahmadify',
    metaDescription: 'Review selected items, apply promo vouchers, and calculate UK shipping.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-cart-trust',
        type: 'trust_badges',
        title: '256-Bit SSL Encrypted Checkout Guarantee',
        content: 'Your payment information is secured with bank-grade encryption.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'checkout',
    title: 'Checkout & Payment Page',
    slug: '/checkout',
    isPublished: true,
    metaTitle: 'Secure Express Checkout | Ahmadify',
    metaDescription: 'Fast, frictionless checkout supporting Stripe, Klarna, PayPal, and Apple Pay.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-chk-pay',
        type: 'payment_icons',
        title: 'Accepted Payment Methods',
        content: 'Instant processing via Visa, MasterCard, Amex, PayPal, and Klarna Pay Later.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'customer_dashboard',
    title: 'Customer Account & Orders',
    slug: '/account',
    isPublished: true,
    metaTitle: 'My Account & Order Tracking | Ahmadify',
    metaDescription: 'Track package dispatches, view invoices, manage addresses, and request returns.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-acc-dash',
        type: 'heading',
        title: 'Welcome to Your VIP Member Portal',
        content: 'Manage your active orders and personal saved addresses.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'wishlist_page',
    title: 'Customer Wishlist',
    slug: '/wishlist',
    isPublished: true,
    metaTitle: 'My Saved Wishlist | Ahmadify',
    metaDescription: 'Your saved favorite items and price drop alerts.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-wish-head',
        type: 'heading',
        title: 'Your Saved Favorites',
        content: 'Save items now and complete purchase anytime.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'blogs',
    title: 'Blog & Editorial Journal',
    slug: '/blog',
    isPublished: true,
    metaTitle: 'Ahmadify Journal | Trends, Guides & Luxury Lifestyle',
    metaDescription: 'Read expert buying guides, luxury watch maintenance tips, and smart home technology trends.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-blog-feed',
        type: 'blog_feed',
        title: 'Latest Editorial Stories',
        content: 'Insights into manufacturing excellence, styling, and technology.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'about_us',
    title: 'About Us',
    slug: '/about',
    isPublished: true,
    metaTitle: 'About Ahmadify Commerce Platform | Our Mission',
    metaDescription: 'Learn about Ahmadify Commerce, our commitment to global product excellence, multi-supplier transparency, and customer satisfaction.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-about-hero',
        type: 'hero',
        title: 'Redefining E-Commerce with Uncompromising Quality',
        content: 'Founded in London, Ahmadify connects discerning shoppers with world-class manufacturers through an intelligent multi-supplier supply chain.',
        imageUrl: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1200&q=80',
        visible: true,
        order: 1
      },
      {
        id: 'blk-about-text',
        type: 'paragraph',
        title: 'Our Promise & Standard',
        content: 'Every product listed on Ahmadify undergoes rigorous supplier verification, price optimization audits, and white-label quality testing before shipping.',
        visible: true,
        order: 2
      }
    ]
  },
  {
    id: 'contact',
    title: 'Contact Us',
    slug: '/contact',
    isPublished: true,
    metaTitle: 'Contact Customer Care | Ahmadify Support',
    metaDescription: 'Get in touch with Ahmadify Commerce support. Available 24/7 via Live Chat, Email, or WhatsApp.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-contact-form',
        type: 'contact_form',
        title: 'Send Us a Direct Message',
        content: 'Our team responds to all inquiries within 2 hours.',
        visible: true,
        order: 1
      },
      {
        id: 'blk-contact-map',
        type: 'maps',
        title: 'Headquarters & Logistics Centre',
        content: '100 Mayfair High Street, London W1K 2AA, United Kingdom',
        visible: true,
        order: 2
      }
    ]
  },
  {
    id: 'faq',
    title: 'Frequently Asked Questions',
    slug: '/faq',
    isPublished: true,
    metaTitle: 'Ahmadify FAQ | Shipping, Returns & Tracking',
    metaDescription: 'Find quick answers regarding UK delivery times, tracking numbers, returns, and multi-supplier orders.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-faq-1',
        type: 'faq_accordion',
        title: 'Frequently Asked Questions',
        content: 'Common answers about shipping times, tracking, and warranty.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'privacy_policy',
    title: 'Privacy Policy',
    slug: '/privacy-policy',
    isPublished: true,
    metaTitle: 'Privacy Policy | Ahmadify Store',
    metaDescription: 'How we protect your personal information in compliance with UK GDPR.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-privacy-text',
        type: 'paragraph',
        title: 'UK GDPR Privacy Compliance Statement',
        content: 'At Ahmadify Commerce, we process customer data strictly for order fulfillment, fraud prevention, and customer support with complete encryption.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'terms_conditions',
    title: 'Terms & Conditions',
    slug: '/terms',
    isPublished: true,
    metaTitle: 'Terms & Conditions of Service | Ahmadify',
    metaDescription: 'Official terms governing purchases, warranties, and store policies.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-terms-text',
        type: 'paragraph',
        title: 'Terms of Service Overview',
        content: 'All sales are governed by UK Consumer Rights regulations and Ahmadify quality guarantee policies.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'return_policy',
    title: '30-Day Return & Refund Policy',
    slug: '/return-policy',
    isPublished: true,
    metaTitle: 'Return & Refund Policy | Ahmadify Guarantee',
    metaDescription: 'Hassle-free 30-day returns with prepaid UK return labels.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-ret-text',
        type: 'paragraph',
        title: '30-Day Money-Back Guarantee',
        content: 'If you are not completely satisfied with your purchase, return it within 30 days for a full refund.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'shipping_policy',
    title: 'Shipping & Delivery Policy',
    slug: '/shipping-policy',
    isPublished: true,
    metaTitle: 'Shipping & Delivery Times | Ahmadify Express',
    metaDescription: 'Fast 1-3 day UK delivery and insured international dispatch options.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-ship-text',
        type: 'paragraph',
        title: 'Tracked Express Dispatch Standard',
        content: 'Orders placed before 2:00 PM GMT are dispatched same-day via Royal Mail, DPD, or DHL Express.',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'landing_page',
    title: 'Exclusive VIP Sale Landing Page',
    slug: '/vip-sale',
    isPublished: true,
    metaTitle: 'VIP Sale - Up to 50% Off | Ahmadify Exclusive',
    metaDescription: 'Special limited time deals for VIP members.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-vip-hero',
        type: 'hero',
        title: 'Exclusive Private Sale Access',
        content: 'Claim your member discount before stock runs out.',
        imageUrl: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=1200&q=80',
        ctaText: 'Shop VIP Deals Now',
        ctaLink: '/products?category=Flash+Sales',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'page_404',
    title: '404 Page Not Found',
    slug: '/404',
    isPublished: true,
    metaTitle: 'Page Not Found | Ahmadify Store',
    metaDescription: 'The page you requested could not be found.',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-404-hero',
        type: 'hero',
        title: '404 - Oops! Page Not Found',
        content: 'The page you are looking for might have been moved or renamed.',
        ctaText: 'Return to Home',
        ctaLink: '/',
        visible: true,
        order: 1
      }
    ]
  },
  {
    id: 'maintenance_page',
    title: 'Maintenance Mode Page',
    slug: '/maintenance',
    isPublished: false,
    metaTitle: 'Store Maintenance | Ahmadify',
    metaDescription: 'We are updating our store to serve you better. We will be back shortly!',
    updatedAt: new Date().toISOString(),
    blocks: [
      {
        id: 'blk-maint-hero',
        type: 'hero',
        title: 'Upgrading Store Infrastructure',
        content: 'We are enhancing our catalog and adding new luxury dropshipping arrivals. Check back in 15 minutes!',
        visible: true,
        order: 1
      }
    ]
  }
];

export const INITIAL_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'med-1',
    name: 'hero_watch_banner.jpg',
    url: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    sizeBytes: 1048576,
    folder: 'Banners',
    dimensions: '1920x1080',
    createdAt: '2026-07-28'
  },
  {
    id: 'med-2',
    name: 'smart_anc_headset.jpg',
    url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    sizeBytes: 850000,
    folder: 'Products',
    dimensions: '1200x1200',
    createdAt: '2026-07-29'
  },
  {
    id: 'med-3',
    name: 'italian_leather_bag.jpg',
    url: 'https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&w=800&q=80',
    type: 'image',
    sizeBytes: 920000,
    folder: 'Products',
    dimensions: '1200x1200',
    createdAt: '2026-07-30'
  },
  {
    id: 'med-4',
    name: 'brand_catalog_guide.pdf',
    url: '#',
    type: 'pdf',
    sizeBytes: 2400000,
    folder: 'Documents',
    createdAt: '2026-07-31'
  }
];

export const INITIAL_EMAIL_TEMPLATES: EmailTemplateConfig[] = [
  {
    id: 'order_confirmation',
    name: 'Order Confirmation Email',
    subject: 'Order Confirmed - #{orderNumber} | Ahmadify Store',
    previewText: 'Thank you for your purchase! Your order is being processed for UK Express dispatch.',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 24px; border-radius: 12px;">
        <h1 style="color: #f59e0b; margin-bottom: 8px;">AHMADIFY COMMERCE</h1>
        <h2 style="font-size: 18px; margin-top: 0;">Thank you for your order, {{customerName}}!</h2>
        <p>Order Number: <strong>{{orderNumber}}</strong></p>
        <p>Total Paid: <strong>£{{totalAmount}}</strong></p>
        <p style="color: #94a3b8;">Your order is currently being routed to our express fulfillment facility. You will receive a tracking update as soon as carrier labels are printed.</p>
        <hr style="border: 1px solid #334155;" />
        <p style="font-size: 12px; color: #64748b;">Ahmadify Commerce Platform • 100 Mayfair High Street, London W1K 2AA</p>
      </div>
    `,
    active: true
  },
  {
    id: 'shipping_update',
    name: 'Shipping & Tracking Update',
    subject: 'Your Order #{orderNumber} Has Dispatched! 🚚',
    previewText: 'Your package is on its way via UK Express Tracked shipping.',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 24px; border-radius: 12px;">
        <h1 style="color: #f59e0b;">AHMADIFY DISPATCH</h1>
        <h2>Great news {{customerName}}! Your order is in transit.</h2>
        <p>Tracking Ref: <strong style="color: #10b981;">{{trackingNumber}}</strong></p>
        <p>Carrier: <strong>{{carrier}}</strong></p>
        <a href="https://www.ahmadify.store/track?ref={{trackingNumber}}" style="display: inline-block; padding: 12px 24px; background: #f59e0b; color: #000; font-weight: bold; text-decoration: none; border-radius: 8px; margin-top: 12px;">Track Package Live</a>
      </div>
    `,
    active: true
  },
  {
    id: 'abandoned_cart',
    name: 'Abandoned Cart Recovery',
    subject: 'Did you leave something behind in your cart?',
    previewText: 'Complete your checkout now and get an extra 10% off with code "SAVE10NOW".',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 24px; border-radius: 12px;">
        <h1 style="color: #f59e0b;">AHMADIFY RECOVERY</h1>
        <p>Hi {{customerName}}, your cart items are waiting for you!</p>
        <p>Use code <strong style="color: #f59e0b;">SAVE10NOW</strong> at checkout for 10% off your order.</p>
        <a href="https://www.ahmadify.store/checkout" style="display: inline-block; padding: 12px 24px; background: #10b981; color: #fff; font-weight: bold; text-decoration: none; border-radius: 8px; margin-top: 12px;">Complete Purchase</a>
      </div>
    `,
    active: true
  },
  {
    id: 'welcome',
    name: 'New VIP Customer Welcome',
    subject: 'Welcome to Ahmadify VIP Club! Here is your 15% voucher.',
    previewText: 'Thank you for joining Ahmadify Commerce Platform.',
    bodyHtml: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #0f172a; color: #ffffff; padding: 24px; border-radius: 12px;">
        <h1 style="color: #f59e0b;">WELCOME TO AHMADIFY</h1>
        <p>Welcome to our exclusive community! Enjoy 15% off your first purchase with voucher code <strong>WELCOME15</strong>.</p>
      </div>
    `,
    active: true
  }
];

export const INITIAL_SEO_CONFIG: SEOCenterConfig = {
  siteTitle: 'AHMADIFY | Premier Global E-Commerce & Luxury Lifestyle',
  siteDescription: 'Shop luxury timepieces, smart electronics, designer accessories, and home living. Express UK shipping with 100% verified quality guarantee.',
  keywords: [
    'Ahmadify Store',
    'Luxury Watches UK',
    'Smart Electronics',
    'Italian Leather Accessories',
    'Express Tracked Delivery',
    'Dropshipping UK Store'
  ],
  ogImage: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80',
  twitterHandle: '@AhmadifyStore',
  canonicalUrl: 'https://www.ahmadify.store',
  robotsTxt: 'User-agent: *\nAllow: /\nDisallow: /admin\nDisallow: /checkout\nSitemap: https://www.ahmadify.store/sitemap.xml',
  enableSitemap: true,
  structuredDataJsonLd: JSON.stringify(
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: 'Ahmadify Commerce Platform',
      url: 'https://www.ahmadify.store',
      logo: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+44 20 7946 0912',
        contactType: 'customer service'
      }
    },
    null,
    2
  )
};

export const INITIAL_BACKUPS: SiteBackupPoint[] = [
  {
    id: 'bak-101',
    timestamp: '2026-08-01 10:00:00',
    creator: 'Super Admin (Owner)',
    sizeMb: 1.45,
    description: 'Automated Daily System Snapshot prior to Multi-Supplier launch',
    dataJson: '{}'
  },
  {
    id: 'bak-102',
    timestamp: '2026-07-31 18:30:00',
    creator: 'System Auto-Backup',
    sizeMb: 1.42,
    description: 'Pre-theme update system checkpoint',
    dataJson: '{}'
  }
];
