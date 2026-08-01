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
  fontFamilyHeading: 'Playfair Display',
  fontFamilyBody: 'Plus Jakarta Sans',
  buttonStyle: 'rounded-xl',
  borderRadius: 12,
  layoutWidth: 'contained',
  enableDarkMode: true,
  logoUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=120&q=80',
  faviconUrl: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=32&q=80',
  announcementText: '✨ FREE UK Express Delivery on Orders Over £50 | Use Code "AHMADIFY15" for 15% Off',
  announcementLink: '/offers',
  showAnnouncement: true,
  whatsappNumber: '+44 7000 889900',
  supportPhone: '+44 20 7946 0912',
  supportEmail: 'support@ahmadify.store',
  addressText: 'Ahmadify Commerce Platform Ltd, 100 Mayfair High Street, London W1K 2AA, UK'
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
