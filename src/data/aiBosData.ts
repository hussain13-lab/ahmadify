import { AIBOSPlugin, AIAuditIssue, AIBOSActionLog, AIAgentType } from '../types';

export interface AIAgentMeta {
  type: AIAgentType;
  name: string;
  title: string;
  avatar: string;
  description: string;
  specialty: string[];
  systemRole: string;
  color: string;
  badge: string;
}

export const AI_AGENTS_LIST: AIAgentMeta[] = [
  {
    type: 'ceo',
    name: 'Executive Chief AI',
    title: 'CEO & Strategic Director',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    description: 'High-level business direction, store expansion, strategic decision auditing, and profit maximization.',
    specialty: ['Store Growth', 'Risk Control', 'KPI Synthesis', 'Executive Approvals'],
    systemRole: 'Supervise store performance, evaluate multi-department AI tool requests, and optimize store revenue.',
    color: 'from-amber-500 to-amber-700',
    badge: 'CEO'
  },
  {
    type: 'marketing',
    name: 'Campaign Master AI',
    title: 'Chief Marketing Officer',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    description: 'Generates promotional campaigns, coupon codes, seasonal sales events (Black Friday, Ramadan, Father\'s Day).',
    specialty: ['Coupons & Discounts', 'Email Newsletters', 'Flash Sales', 'Landing Pages'],
    systemRole: 'Design, write, and deploy sales strategies, coupons, and email marketing workflows.',
    color: 'from-purple-500 to-pink-600',
    badge: 'CMO'
  },
  {
    type: 'seo',
    name: 'Search Optimizer AI',
    title: 'Head of Technical SEO',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
    description: 'Optimizes meta titles, descriptions, canonical URLs, image alt tags, JSON-LD structured data, and Google indexing.',
    specialty: ['Meta Tags', 'Schema JSON-LD', 'Keyword Rank', 'Sitemap XML'],
    systemRole: 'Audit all store pages and products for search engine visibility and execute bulk SEO improvements.',
    color: 'from-emerald-500 to-teal-700',
    badge: 'SEO'
  },
  {
    type: 'product_manager',
    name: 'Catalog Curator AI',
    title: 'Global Product Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    description: 'Manages products, categories, collections, duplicate cleanup, pricing rules, and catalog taxonomy.',
    specialty: ['Product Creation', 'Bulk Price Updates', 'Category Organization', 'Duplicate Merging'],
    systemRole: 'Maintain product data integrity, organize collections, and adjust prices dynamically.',
    color: 'from-sky-500 to-blue-700',
    badge: 'CATALOG'
  },
  {
    type: 'inventory_manager',
    name: 'Stock Commander AI',
    title: 'Inventory & Warehouse Lead',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    description: 'Monitors low stock alerts, manages automated restock orders, deducts inventory, and tracks safety stock.',
    specialty: ['Restock Automation', 'Stock Thresholds', 'SKU Mapping', 'Warehouse Sync'],
    systemRole: 'Prevent out-of-stock scenarios and balance stock across international warehouses.',
    color: 'from-orange-500 to-amber-600',
    badge: 'STOCK'
  },
  {
    type: 'supplier_manager',
    name: 'Supply Chain AI',
    title: 'Supplier Integration Lead',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=300&q=80',
    description: 'Integrates and syncs with CJdropshipping, AliExpress, Spocket, Zendrop, Syncee, Printful, and Printify.',
    specialty: ['1-Click Product Import', 'Automated Order Push', 'Tracking Sync', 'Cost Price Monitoring'],
    systemRole: 'Fetch trending products, monitor supplier price changes, and auto-route customer orders to fulfillment.',
    color: 'from-indigo-500 to-cyan-600',
    badge: 'SUPPLIER'
  },
  {
    type: 'finance',
    name: 'Profit Auditor AI',
    title: 'Chief Financial Officer',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
    description: 'Calculates profit margins, handles currency exchange rates, multi-country tax rules, and invoice generation.',
    specialty: ['Margin Calculation', 'VAT/Tax Rules', 'Stripe Ledger', 'Revenue Forecasting'],
    systemRole: 'Ensure store profitability, flag negative-margin products, and maintain tax compliance.',
    color: 'from-emerald-600 to-green-700',
    badge: 'CFO'
  },
  {
    type: 'support',
    name: 'Customer Success AI',
    title: 'Head of Customer Relations',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    description: 'Handles tracking inquiries, automated WhatsApp & email updates, return authorizations, and customer CRM.',
    specialty: ['Order Tracking', 'WhatsApp Direct', 'Return Approvals', 'CRM Insights'],
    systemRole: 'Provide instant customer support, resolve return requests, and track satisfaction metrics.',
    color: 'from-rose-500 to-red-600',
    badge: 'SUPPORT'
  },
  {
    type: 'designer',
    name: 'Visual Studio AI',
    title: 'Creative Director & Theme Designer',
    avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=300&q=80',
    description: 'Redesigns theme layouts, generates promotional banners, replaces lifestyle product photos, and updates color palettes.',
    specialty: ['Theme Customization', 'AI Banners', 'Layout Rearranging', 'Mobile UX'],
    systemRole: 'Craft stunning storefront visuals, banner layouts, and responsive page themes.',
    color: 'from-fuchsia-500 to-pink-600',
    badge: 'DESIGN'
  },
  {
    type: 'writer',
    name: 'Copycraft AI',
    title: 'Senior Content & Blog Writer',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=300&q=80',
    description: 'Generates high-converting product descriptions, blog articles, press releases, and legal policy documentation.',
    specialty: ['Product Descriptions', 'Blog Generation', 'Policy Drafting', 'Brand Messaging'],
    systemRole: 'Write compelling, persuasive e-commerce copy and generate search-optimized blog posts.',
    color: 'from-violet-500 to-purple-700',
    badge: 'CONTENT'
  },
  {
    type: 'ads',
    name: 'Ad Scale AI',
    title: 'Paid Media & Ad Specialist',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=300&q=80',
    description: 'Generates Meta, Google, and TikTok ad creative copy, audience targeting parameters, and conversion tracking pixel setups.',
    specialty: ['Meta Ad Copy', 'TikTok Hooks', 'Google Shopping Feeds', 'Conversion Pixels'],
    systemRole: 'Formulate ad campaigns and generate viral hooks for social media marketing.',
    color: 'from-blue-600 to-indigo-700',
    badge: 'ADS'
  },
  {
    type: 'developer',
    name: 'Full-Stack Code AI',
    title: 'Lead Software Architect',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&w=300&q=80',
    description: 'Generates new dashboard widgets, customs APIs, webhook handlers, site backup points, and plugin extensions.',
    specialty: ['Code Generation', 'Plugin Creation', 'API Integration', 'DB Schema'],
    systemRole: 'Extend system capabilities, add new UI components, and maintain zero-downtime stability.',
    color: 'from-slate-600 to-slate-800',
    badge: 'DEV'
  },
  {
    type: 'security',
    name: 'GuardShield AI',
    title: 'Chief Information Security Officer',
    avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    description: 'Monitors API key safety, inspects audit logs, enforces rate limits, manages permissions, and guards owner authority.',
    specialty: ['Rate Limiting', 'Permission Matrix', 'Audit Trail', 'Secret Vault'],
    systemRole: 'Audit platform security, prevent unauthorized changes, and enforce owner verification.',
    color: 'from-red-600 to-slate-900',
    badge: 'SECURITY'
  },
  {
    type: 'analyst',
    name: 'Data Intelligence AI',
    title: 'Head of Business Intelligence',
    avatar: 'https://images.unsplash.com/photo-1570295999919-56ceb5ecca61?auto=format&fit=crop&w=300&q=80',
    description: 'Answers complex business questions ("Why are sales down?", "Which products make most profit?"), analyzes funnel conversion rates.',
    specialty: ['Sales Diagnostic', 'Customer Lifetime Value', 'Churn Analysis', 'Cohort Reports'],
    systemRole: 'Analyze store data metrics and provide actionable revenue optimization reports.',
    color: 'from-amber-600 to-orange-700',
    badge: 'BI'
  }
];

export const INITIAL_AI_PLUGINS: AIBOSPlugin[] = [
  {
    id: 'plug-stripe',
    name: 'Stripe Payments Enterprise',
    category: 'payment',
    description: 'Accept credit cards, Apple Pay, Google Pay, Klarna, and 3D Secure 2.0 payments globally.',
    iconName: 'CreditCard',
    installed: true,
    version: '4.12.0',
    author: 'Stripe Inc.',
    official: true
  },
  {
    id: 'plug-paypal',
    name: 'PayPal Commerce Platform',
    category: 'payment',
    description: 'Express PayPal checkout, Pay in 4 installment option, and global fraud protection.',
    iconName: 'DollarSign',
    installed: true,
    version: '3.8.1',
    author: 'PayPal',
    official: true
  },
  {
    id: 'plug-cj',
    name: 'CJdropshipping Automated Logistics',
    category: 'dropshipping',
    description: 'Direct API product import, automated tracking sync, and global warehouse routing.',
    iconName: 'RefreshCw',
    installed: true,
    version: '2.5.0',
    author: 'CJ Group',
    official: true
  },
  {
    id: 'plug-ali',
    name: 'AliExpress Official Sync',
    category: 'dropshipping',
    description: 'Bulk product importer and automated order fulfillment via AliExpress API.',
    iconName: 'Globe',
    installed: true,
    version: '1.9.4',
    author: 'Alibaba Group',
    official: true
  },
  {
    id: 'plug-spocket',
    name: 'Spocket US/EU Fast Shipping',
    category: 'dropshipping',
    description: 'Source high-margin products from vetted suppliers in the United States and Europe.',
    iconName: 'Package',
    installed: true,
    version: '2.1.0',
    author: 'Spocket Inc.',
    official: true
  },
  {
    id: 'plug-zendrop',
    name: 'Zendrop Express Fulfillment',
    category: 'dropshipping',
    description: 'Custom branding, automated fulfillment, and 5-day expedited US shipping.',
    iconName: 'Truck',
    installed: true,
    version: '2.0.2',
    author: 'Zendrop',
    official: true
  },
  {
    id: 'plug-printful',
    name: 'Printful Print-on-Demand',
    category: 'dropshipping',
    description: 'Custom apparel, mugs, and wall art produced on demand with custom pack-ins.',
    iconName: 'Printer',
    installed: false,
    version: '3.1.0',
    author: 'Printful',
    official: true
  },
  {
    id: 'plug-ga4',
    name: 'Google Analytics 4 & GSC',
    category: 'analytics',
    description: 'E-commerce event tracking, funnel analysis, and Google Search Console indexing.',
    iconName: 'BarChart',
    installed: true,
    version: '4.0.1',
    author: 'Google LLC',
    official: true
  },
  {
    id: 'plug-meta-pixel',
    name: 'Facebook & Instagram Meta Pixel',
    category: 'marketing',
    description: 'Conversion API (CAPI) and Meta Pixel tracking for targeted ad retargeting.',
    iconName: 'Share2',
    installed: true,
    version: '2.8.0',
    author: 'Meta Platforms',
    official: true
  },
  {
    id: 'plug-tiktok',
    name: 'TikTok Ads Pixel & Shop',
    category: 'marketing',
    description: 'Events API and catalog synchronization for TikTok Shop and video shopping ads.',
    iconName: 'Video',
    installed: true,
    version: '1.6.0',
    author: 'TikTok Bytedance',
    official: true
  },
  {
    id: 'plug-whatsapp',
    name: 'WhatsApp Business Order Bot',
    category: 'crm',
    description: 'Send instant order confirmations, tracking links, and 24/7 customer chat support.',
    iconName: 'Send',
    installed: true,
    version: '3.2.0',
    author: 'Ahmadify Labs',
    official: true
  },
  {
    id: 'plug-livechat',
    name: 'AI Live Support Agent',
    category: 'crm',
    description: 'AI-driven real-time chat assistant answering visitor questions and boosting checkout conversion.',
    iconName: 'Users',
    installed: true,
    version: '1.5.0',
    author: 'Ahmadify AI',
    official: true
  }
];

export const INITIAL_AUDIT_ISSUES: AIAuditIssue[] = [
  {
    id: 'aud-001',
    type: 'low_profit',
    severity: 'high',
    title: 'Low Profit Margin Item Detected',
    description: 'Product "Ultra-Slim Wireless Power Bank" has a profit margin of 12%, below your 30% target rule.',
    affectedItem: 'Ultra-Slim Wireless Power Bank',
    suggestedTool: 'update_prices',
    toolParams: { productId: 'prod-1', targetMargin: 35 },
    resolved: false
  },
  {
    id: 'aud-002',
    type: 'seo_error',
    severity: 'medium',
    title: 'Missing Meta Description',
    description: '2 imported supplier products are missing SEO meta descriptions for Google indexing.',
    affectedItem: '2 Products',
    suggestedTool: 'generate_seo',
    toolParams: { bulk: true },
    resolved: false
  },
  {
    id: 'aud-003',
    type: 'inventory_warning',
    severity: 'high',
    title: 'Low Stock Alert (< 5 units)',
    description: 'Product "RGB Mechanical Gaming Keyboard" has only 3 units left in main warehouse.',
    affectedItem: 'RGB Mechanical Gaming Keyboard',
    suggestedTool: 'sync_supplier',
    toolParams: { action: 'restock', quantity: 50 },
    resolved: false
  },
  {
    id: 'aud-004',
    type: 'broken_link',
    severity: 'low',
    title: 'Footer Social Link Unverified',
    description: 'TikTok social link is currently missing in store settings.',
    affectedItem: 'Footer Component',
    suggestedTool: 'edit_menu',
    toolParams: { section: 'social' },
    resolved: false
  },
  {
    id: 'aud-005',
    type: 'accessibility',
    severity: 'medium',
    title: 'Image Alt Tag Missing',
    description: 'Hero Banner image #2 is missing descriptive ALT text for screen readers.',
    affectedItem: 'Hero Banner Slide 2',
    suggestedTool: 'edit_page',
    toolParams: { section: 'hero', altText: 'AHMADIFY Tech Lifestyle Showcase' },
    resolved: false
  }
];

export const INITIAL_AI_ACTION_LOGS: AIBOSActionLog[] = [
  {
    id: 'bos-log-101',
    prompt: 'Import the top 5 trending kitchen & smart home products from CJdropshipping with 45% markup.',
    agent: 'supplier_manager',
    mode: 'automatic',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    summary: 'Successfully imported 5 trending CJ products, assigned SKUs, and published to store catalog.',
    toolCalls: [
      {
        id: 'tc-1',
        toolName: 'import_supplier_products',
        description: 'Fetched CJ catalog items and applied 45% profit markup.',
        parameters: { supplier: 'CJdropshipping', count: 5, markupPercent: 45 },
        status: 'completed',
        riskLevel: 'low',
        affectedEntities: ['Products Catalog (5 items)'],
        backupCreated: true,
        timestamp: new Date(Date.now() - 3600000 * 2).toISOString()
      }
    ],
    riskLevel: 'low',
    status: 'completed',
    estimatedTime: '4 seconds',
    affectedPages: ['/category/home-kitchen', '/store'],
    affectedProductsCount: 5,
    responseMessage: 'Import complete! 5 kitchen items added with automatic USD to GBP price conversion and 45% gross margin.'
  },
  {
    id: 'bos-log-102',
    prompt: 'Increase all electronics category prices by 8% to cover supplier shipping fee increase.',
    agent: 'product_manager',
    mode: 'approval',
    timestamp: new Date(Date.now() - 3600000 * 5).toISOString(),
    summary: 'Adjusted retail pricing across 8 Smart Electronics items by +8%.',
    toolCalls: [
      {
        id: 'tc-2',
        toolName: 'update_prices',
        description: 'Bulk price inflation of 8% for category Smart Electronics.',
        parameters: { category: 'Smart Electronics', priceDeltaPercent: 8 },
        status: 'completed',
        riskLevel: 'medium',
        affectedEntities: ['Smart Electronics (8 items)'],
        backupCreated: true,
        timestamp: new Date(Date.now() - 3600000 * 5).toISOString()
      }
    ],
    riskLevel: 'medium',
    status: 'completed',
    estimatedTime: '2 seconds',
    affectedPages: ['/category/smart-electronics'],
    affectedProductsCount: 8,
    responseMessage: 'Price adjustment applied! Store backup point created prior to execution.'
  }
];
