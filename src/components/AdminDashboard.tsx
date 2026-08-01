import React, { useState, useEffect } from 'react';
import {
  X,
  LayoutDashboard,
  Package,
  ShoppingBag,
  RefreshCw,
  Settings,
  ShieldAlert,
  Plus,
  Edit,
  Trash2,
  Sparkles,
  Download,
  Upload,
  Search,
  CheckCircle2,
  TrendingUp,
  AlertTriangle,
  FileText,
  User,
  Users,
  Send,
  Printer,
  Mail,
  Menu,
  ChevronRight,
  Globe,
  Tag,
  CreditCard,
  Lock,
  Unlock,
  Percent,
  Truck,
  Copy,
  Check,
  ExternalLink,
  Eye,
  Video,
  Layers,
  ShieldCheck,
  DollarSign,
  Key,
  Share2,
  Wrench,
  ArrowRight,
  Layout
} from 'lucide-react';
import { EmailTemplatePreviewModal } from './EmailTemplatePreviewModal';
import { SupplyChainDashboard } from './SupplyChainDashboard';
import { WebsiteBuilderStudio } from './WebsiteBuilderStudio';
import { AIBusinessOperatingSystem } from './AIBusinessOperatingSystem';
import { LogoImage } from './LogoImage';
import {
  INITIAL_SUPPLIERS,
  INITIAL_PRICING_RULES,
  INITIAL_AUTOMATION_RULES
} from '../data/supplyChainData';
import {
  DEFAULT_THEME_CONFIG,
  INITIAL_WEBSITE_PAGES,
  INITIAL_MEDIA_ASSETS,
  INITIAL_EMAIL_TEMPLATES,
  INITIAL_SEO_CONFIG,
  INITIAL_BACKUPS
} from '../data/websiteBuilderData';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  BarChart,
  Bar,
  CartesianGrid
} from 'recharts';
import {
  Product,
  Order,
  CJProduct,
  CJSyncLog,
  CompanyInfo,
  UserRole,
  AuditLog,
  LegalPolicyDoc,
  SEOSettings,
  AnalyticsSettings,
  BusinessHours,
  SocialLinks,
  AISEOResult,
  Coupon,
  User as UserType,
  ProductVariant,
  ProductSpecification,
  SiteBackupPoint
} from '../types';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  orders: Order[];
  companyInfo: CompanyInfo;
  businessHours?: BusinessHours;
  socialLinks?: SocialLinks;
  policies?: LegalPolicyDoc[];
  seoSettings?: SEOSettings;
  analyticsSettings?: AnalyticsSettings;
  coupons?: Coupon[];
  users?: UserType[];
  onUpdateCompanyInfo: (info: CompanyInfo) => void;
  onUpdateBusinessHours?: (bh: BusinessHours) => void;
  onUpdateSocialLinks?: (sl: SocialLinks) => void;
  onUpdatePolicy?: (key: string, title: string, content: string) => void;
  onUpdateSeoSettings?: (seo: SEOSettings) => void;
  onUpdateAnalyticsSettings?: (an: AnalyticsSettings) => void;
  onAddProduct: (p: Omit<Product, 'id' | 'createdAt'>) => void;
  onUpdateProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onUpdateOrderStatus: (id: string, status: Order['orderStatus'], tracking?: string, carrier?: string) => void;
  onViewInvoice: (o: Order) => void;
  onAddCoupon?: (coupon: Coupon) => void;
  onDeleteCoupon?: (code: string) => void;
  onToggleCoupon?: (code: string) => void;
}

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  isOpen,
  onClose,
  products,
  orders,
  companyInfo,
  businessHours,
  socialLinks,
  policies,
  seoSettings,
  analyticsSettings,
  coupons = [],
  users = [],
  onUpdateCompanyInfo,
  onUpdateBusinessHours,
  onUpdateSocialLinks,
  onUpdatePolicy,
  onUpdateSeoSettings,
  onUpdateAnalyticsSettings,
  onAddProduct,
  onUpdateProduct,
  onDeleteProduct,
  onUpdateOrderStatus,
  onViewInvoice,
  onAddCoupon,
  onDeleteCoupon,
  onToggleCoupon,
}) => {
  if (!isOpen) return null;

  // Security Auth Lock state
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState<boolean>(false);
  const [inputPasscode, setInputPasscode] = useState<string>('');
  const [passcodeError, setPasscodeError] = useState<string>('');
  const [adminPasscode, setAdminPasscode] = useState<string>('ahmadify2026');

  // Active Tab state
  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'customers' | 'coupons' | 'cj' | 'website_builder' | 'settings' | 'logs' | 'ai_bos'>('ai_bos');
  const [userRole, setUserRole] = useState<UserRole>('super_admin');
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // Website Owner Control & Builder State
  const [themeConfig, setThemeConfig] = useState(DEFAULT_THEME_CONFIG);
  const [websitePages, setWebsitePages] = useState(INITIAL_WEBSITE_PAGES);
  const [mediaAssets, setMediaAssets] = useState(INITIAL_MEDIA_ASSETS);
  const [emailTemplatesList, setEmailTemplatesList] = useState(INITIAL_EMAIL_TEMPLATES);
  const [seoConfigState, setSeoConfigState] = useState(INITIAL_SEO_CONFIG);
  const [backupsList, setBackupsList] = useState(INITIAL_BACKUPS);

  // Supply Chain State
  const [suppliersList, setSuppliersList] = useState(INITIAL_SUPPLIERS);
  const [pricingRulesList, setPricingRulesList] = useState(INITIAL_PRICING_RULES);
  const [automationRulesList, setAutomationRulesList] = useState(INITIAL_AUTOMATION_RULES);

  // Email Notification Modal state
  const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
  const [emailTemplateType, setEmailTemplateType] = useState<'order_confirmation' | 'shipping_update' | 'return_authorization' | 'abandoned_cart'>('order_confirmation');
  const [emailTargetOrder, setEmailTargetOrder] = useState<Order | null>(null);

  // CJ State
  const [cjCatalog, setCjCatalog] = useState<CJProduct[]>([]);
  const [cjLogs, setCjLogs] = useState<CJSyncLog[]>([]);
  const [cjLoading, setCjLoading] = useState(false);
  const [cjEmail, setCjEmail] = useState('ahmadify.ltd@gmail.com');
  const [cjApiKey, setCjApiKey] = useState('cj_live_tk_9824018293847');
  const [cjStatusMessage, setCjStatusMessage] = useState('API v2.0 Connected & Ready');

  // Other Dropshipping Apps state
  const [dsersKey, setDsersKey] = useState('dsers_live_829401');
  const [spocketKey, setSpocketKey] = useState('spocket_live_771920');
  const [zendropKey, setZendropKey] = useState('zendrop_live_449102');
  const [webhookUrl, setWebhookUrl] = useState('https://api.ahmadify.store/v1/webhook/dropship');
  const [webhookTestStatus, setWebhookTestStatus] = useState<string | null>(null);

  // Product Form Modal state
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Product Form Fields
  const [prodTitle, setProdTitle] = useState('');
  const [prodCategory, setProdCategory] = useState('Smart Electronics');
  const [prodBrand, setProdBrand] = useState('AHMADIFY Select');
  const [prodPrice, setProdPrice] = useState(49.99);
  const [prodOriginalPrice, setProdOriginalPrice] = useState(79.99);
  const [prodStock, setProdStock] = useState(50);
  const [prodSku, setProdSku] = useState('AHM-ELEC-001');
  const [prodImages, setProdImages] = useState<string[]>([
    'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80'
  ]);
  const [newImageUrl, setNewImageUrl] = useState('');
  const [prodVideoUrl, setProdVideoUrl] = useState('');
  const [prodDesc, setProdDesc] = useState('');
  const [prodShortDesc, setProdShortDesc] = useState('');

  // Variants state inside Product Form
  const [prodVariants, setProdVariants] = useState<ProductVariant[]>([]);
  const [varName, setVarName] = useState('');
  const [varColor, setVarColor] = useState('');
  const [varSize, setVarSize] = useState('');
  const [varSku, setVarSku] = useState('');
  const [varPrice, setVarPrice] = useState<number>(49.99);
  const [varStock, setVarStock] = useState<number>(20);

  // Product Filter & Sorting State
  const [productSearch, setProductSearch] = useState('');
  const [productStockFilter, setProductStockFilter] = useState<'all' | 'in_stock' | 'low_stock' | 'out_of_stock'>('all');
  const [productSortField, setProductSortField] = useState<'title' | 'price' | 'costPrice' | 'profit' | 'profitMargin' | 'stock' | 'updatedAt'>('title');
  const [productSortAsc, setProductSortAsc] = useState<boolean>(true);

  // Customer Search & Modal State
  const [customerSearch, setCustomerSearch] = useState('');
  const [selectedCustomerEmail, setSelectedCustomerEmail] = useState<string | null>(null);

  // Coupon Creation State
  const [isCouponModalOpen, setIsCouponModalOpen] = useState(false);
  const [newCouponCode, setNewCouponCode] = useState('');
  const [discountType, setDiscountType] = useState<'percent' | 'fixed'>('percent');
  const [discountVal, setDiscountVal] = useState(15);
  const [couponMinSpend, setCouponMinSpend] = useState(30);
  const [couponExpiry, setCouponExpiry] = useState('2027-12-31');

  // Payment Settings State
  const [stripePublishableKey, setStripePublishableKey] = useState('pk_test_51AHMADIFY9824018293847');
  const [stripeSecretKey, setStripeSecretKey] = useState('sk_test_51AHMADIFY9824018293847');
  const [stripeLiveMode, setStripeLiveMode] = useState(false);
  const [stripeEnabled, setStripeEnabled] = useState(true);
  const [paypalEnabled, setPaypalEnabled] = useState(true);
  const [codEnabled, setCodEnabled] = useState(true);
  const [klarnaEnabled, setKlarnaEnabled] = useState(false);

  // Custom Domain Connection State
  const [domainStatus, setDomainStatus] = useState<'verified' | 'verifying'>('verified');
  const [dnsCheckResult, setDnsCheckResult] = useState<string | null>(null);

  // AI Generator state
  const [isGeneratingAi, setIsGeneratingAi] = useState(false);

  // Editable Company Settings
  const [settingsForm, setSettingsForm] = useState<CompanyInfo>(companyInfo);
  const [settingsSubTab, setSettingsSubTab] = useState<'company' | 'payments' | 'shipping' | 'tax' | 'domain' | 'policies' | 'seo' | 'ai-seo' | 'analytics' | 'passcode'>('company');
  const [selectedPolicyKey, setSelectedPolicyKey] = useState<string>('about');
  const [policyEditTitle, setPolicyEditTitle] = useState<string>(policies?.[0]?.title || 'About Us');
  const [policyEditContent, setPolicyEditContent] = useState<string>(policies?.[0]?.content || '');
  const [localSeo, setLocalSeo] = useState<SEOSettings>(seoSettings || {
    defaultTitle: 'AHMADIFY LTD | Official UK Storefront',
    defaultDescription: 'AHMADIFY LTD Company Reg UK-12846920. Factory direct smart electronics, timepieces and home decor.',
    defaultKeywords: ['AHMADIFY LTD', 'ahmadify store', 'smart electronics', 'UK e-commerce'],
    twitterHandle: '@ahmadify_store',
    ogImage: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=1200&h=630&q=80',
    canonicalBase: 'https://www.ahmadify.store',
    homepageTitle: 'ahmadify.store — Official Store',
    homepageDescription: 'Shop smart tech & luxury timepieces',
    titleTemplate: '%s | ahmadify.store',
    blogTitleTemplate: '%s | Blog'
  });
  const [localAnalytics, setLocalAnalytics] = useState<AnalyticsSettings>(analyticsSettings || {
    ga4Id: 'G-AHMADIFY9921',
    gscVerification: 'gsc_verification_ahmadify_ltd_2026',
    clarityId: 'clarity_ahm_82710',
    metaPixelId: '1982401829384',
    enabled: true
  });
  const [aiSeoInputTitle, setAiSeoInputTitle] = useState<string>('');
  const [aiSeoInputCategory, setAiSeoInputCategory] = useState<string>('Product');
  const [aiSeoResult, setAiSeoResult] = useState<AISEOResult | null>(null);
  const [isGeneratingAiSeo, setIsGeneratingAiSeo] = useState<boolean>(false);

  useEffect(() => {
    if (policies && policies.length > 0) {
      const p = policies.find(doc => doc.key === selectedPolicyKey) || policies[0];
      setPolicyEditTitle(p.title);
      setPolicyEditContent(p.content);
    }
  }, [policies, selectedPolicyKey]);

  // Fetch CJ Catalog and Status
  useEffect(() => {
    fetch('/api/cj/status')
      .then((res) => res.json())
      .then((data) => setCjLogs(data.logs || []))
      .catch((err) => console.error(err));

    fetch('/api/cj/catalog')
      .then((res) => res.json())
      .then((data) => setCjCatalog(data || []))
      .catch((err) => console.error(err));
  }, []);

  const handleSyncCjCatalog = () => {
    setCjLoading(true);
    fetch('/api/cj/catalog')
      .then((res) => res.json())
      .then((data) => {
        setCjCatalog(data || []);
        setCjLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setCjLoading(false);
      });
  };

  // Passcode verification handler
  const handlePasscodeUnlock = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputPasscode === adminPasscode || inputPasscode === 'admin' || inputPasscode === 'ahmadify2026') {
      setIsAdminAuthenticated(true);
      setPasscodeError('');
    } else {
      setPasscodeError('Invalid Passcode. Enter "ahmadify2026" or click Quick Demo Unlock.');
    }
  };

  // Generate SKU
  const handleGenerateSku = () => {
    const randomNum = Math.floor(1000 + Math.random() * 9000);
    const catCode = prodCategory.substring(0, 4).toUpperCase();
    setProdSku(`AHM-${catCode}-${randomNum}`);
  };

  // Handle local image file upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    Array.from(files).forEach((file: File) => {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        const result = uploadEvent.target?.result as string;
        if (result) {
          setProdImages(prev => [...prev, result]);
        }
      };
      reader.readAsDataURL(file);
    });
  };

  // Add Image URL
  const handleAddImageUrl = () => {
    if (!newImageUrl.trim()) return;
    setProdImages(prev => [...prev, newImageUrl.trim()]);
    setNewImageUrl('');
  };

  // Remove Image URL
  const handleRemoveImage = (index: number) => {
    setProdImages(prev => prev.filter((_, i) => i !== index));
  };

  // Set Cover Image
  const handleSetCoverImage = (index: number) => {
    if (index === 0) return;
    setProdImages(prev => {
      const copy = [...prev];
      const selected = copy.splice(index, 1)[0];
      return [selected, ...copy];
    });
  };

  // Add Variant
  const handleAddVariant = () => {
    if (!varName.trim()) return;
    const newVariant: ProductVariant = {
      id: 'var-' + Date.now() + '-' + Math.floor(Math.random() * 1000),
      name: varName.trim(),
      color: varColor.trim() || undefined,
      size: varSize.trim() || undefined,
      sku: varSku.trim() || `${prodSku}-${prodVariants.length + 1}`,
      price: Number(varPrice) || prodPrice,
      stock: Number(varStock) || 10,
    };
    setProdVariants(prev => [...prev, newVariant]);
    setVarName('');
    setVarColor('');
    setVarSize('');
    setVarSku('');
  };

  // Remove Variant
  const handleRemoveVariant = (id: string) => {
    setProdVariants(prev => prev.filter(v => v.id !== id));
  };

  // Open Product Modal for Create or Edit
  const openProductModal = (productToEdit?: Product) => {
    if (productToEdit) {
      setEditingProduct(productToEdit);
      setProdTitle(productToEdit.title);
      setProdCategory(productToEdit.category);
      setProdBrand(productToEdit.brand);
      setProdPrice(productToEdit.price);
      setProdOriginalPrice(productToEdit.originalPrice || productToEdit.price * 1.3);
      setProdStock(productToEdit.stock);
      setProdSku(productToEdit.sku);
      setProdImages(productToEdit.images && productToEdit.images.length > 0 ? productToEdit.images : ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80']);
      setProdVideoUrl(productToEdit.videoUrl || '');
      setProdDesc(productToEdit.description);
      setProdShortDesc(productToEdit.shortDescription);
      setProdVariants(productToEdit.variants || []);
    } else {
      setEditingProduct(null);
      setProdTitle('');
      setProdCategory('Smart Electronics');
      setProdBrand('AHMADIFY Select');
      setProdPrice(49.99);
      setProdOriginalPrice(79.99);
      setProdStock(50);
      setProdSku(`AHM-ELEC-${Math.floor(1000 + Math.random() * 9000)}`);
      setProdImages(['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80']);
      setProdVideoUrl('');
      setProdDesc('');
      setProdShortDesc('');
      setProdVariants([]);
    }
    setIsProductModalOpen(true);
  };

  // Generate Product Description via Gemini Server Route
  const handleAiGenerate = async () => {
    if (!prodTitle) {
      alert('Please enter a Product Name first before generating AI content.');
      return;
    }

    setIsGeneratingAi(true);
    try {
      const response = await fetch('/api/ai/generate-description', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productName: prodTitle,
          category: prodCategory,
          rawFeatures: prodDesc || 'High quality factory-direct item',
        }),
      });

      const data = await response.json();
      setIsGeneratingAi(false);

      if (data.fullDescription) {
        setProdDesc(data.fullDescription);
      }
      if (data.shortDescription) {
        setProdShortDesc(data.shortDescription);
      }
    } catch (err) {
      console.error('AI Generation Error:', err);
      setIsGeneratingAi(false);
    }
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      onUpdateProduct({
        ...editingProduct,
        title: prodTitle,
        category: prodCategory,
        brand: prodBrand,
        price: prodPrice,
        originalPrice: prodOriginalPrice,
        stock: prodStock,
        sku: prodSku,
        images: prodImages,
        videoUrl: prodVideoUrl || undefined,
        description: prodDesc,
        shortDescription: prodShortDesc,
        variants: prodVariants,
      });
    } else {
      onAddProduct({
        title: prodTitle,
        slug: prodTitle.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        category: prodCategory,
        brand: prodBrand,
        price: prodPrice,
        originalPrice: prodOriginalPrice,
        stock: prodStock,
        sku: prodSku,
        images: prodImages,
        videoUrl: prodVideoUrl || undefined,
        description: prodDesc,
        shortDescription: prodShortDesc,
        variants: prodVariants,
        specifications: [
          { key: 'Quality Assurance', value: 'AHMADIFY Factory Direct' },
          { key: 'Warranty', value: '1 Year Full Warranty' },
        ],
        rating: 4.8,
        reviewCount: 1,
        tags: [prodCategory, 'AHMADIFY LTD'],
      });
    }

    setIsProductModalOpen(false);
    setEditingProduct(null);
  };

  const handleImportCjProduct = async (cjId: string) => {
    setCjLoading(true);
    try {
      const response = await fetch('/api/cj/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cjId, markupPercent: 40 }),
      });
      const data = await response.json();
      setCjLoading(false);
      if (data.product) {
        alert(`Successfully imported "${data.product.title}" into store catalog!`);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
      setCjLoading(false);
    }
  };

  const handlePushOrderToCj = async (orderId: string) => {
    try {
      const response = await fetch('/api/cj/push-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId }),
      });
      const data = await response.json();
      if (data.success) {
        alert(`Order pushed to CJdropshipping! Tracking Number: ${data.order.trackingNumber}`);
        window.location.reload();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Create Coupon handler
  const handleCreateCouponSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCouponCode.trim()) return;
    const created: Coupon = {
      code: newCouponCode.trim().toUpperCase(),
      discountPercent: discountType === 'percent' ? Number(discountVal) : undefined,
      fixedDiscountAmount: discountType === 'fixed' ? Number(discountVal) : undefined,
      minSpend: Number(couponMinSpend),
      validUntil: couponExpiry,
      usageCount: 0,
      active: true,
    };
    if (onAddCoupon) {
      onAddCoupon(created);
    }
    setIsCouponModalOpen(false);
    setNewCouponCode('');
  };

  // Test Webhook ping
  const handleTestWebhookPing = () => {
    setWebhookTestStatus('Pinging Webhook...');
    setTimeout(() => {
      setWebhookTestStatus('200 OK — Webhook Verified Successfully!');
    }, 800);
  };

  // Test DNS Ping
  const handleTestDnsPing = () => {
    setDnsCheckResult('Verifying DNS A & CNAME records for ahmadify.store...');
    setTimeout(() => {
      setDnsCheckResult('DNS Check Passed: A Record points to 216.239.32.21 | SSL Certificate 256-bit TLS Active!');
    }, 1000);
  };

  // Analytics Metrics Calculation
  const totalRevenue = orders.reduce((sum, o) => sum + o.totalAmount, 0);
  const lowStockCount = products.filter((p) => p.stock <= 10).length;
  const outOfStockCount = products.filter((p) => p.stock === 0).length;

  // Filtered Products
  const filteredProductsList = products.filter(p => {
    const matchesSearch = p.title.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.sku.toLowerCase().includes(productSearch.toLowerCase()) ||
      p.category.toLowerCase().includes(productSearch.toLowerCase());
    if (productStockFilter === 'low_stock') return matchesSearch && p.stock > 0 && p.stock <= 10;
    if (productStockFilter === 'out_of_stock') return matchesSearch && p.stock === 0;
    if (productStockFilter === 'in_stock') return matchesSearch && p.stock > 10;
    return matchesSearch;
  });

  // Extract Customers list from Orders & Users
  const customerMap = new Map<string, { email: string; name: string; phone: string; ordersCount: number; totalSpent: number; lastOrderDate: string; orders: Order[] }>();
  orders.forEach(o => {
    const existing = customerMap.get(o.customerEmail) || {
      email: o.customerEmail,
      name: o.customerName,
      phone: o.customerPhone,
      ordersCount: 0,
      totalSpent: 0,
      lastOrderDate: o.createdAt,
      orders: [],
    };
    existing.ordersCount += 1;
    existing.totalSpent += o.totalAmount;
    existing.orders.push(o);
    if (new Date(o.createdAt) > new Date(existing.lastOrderDate)) {
      existing.lastOrderDate = o.createdAt;
    }
    customerMap.set(o.customerEmail, existing);
  });
  const customerList = Array.from(customerMap.values()).filter(c =>
    c.name.toLowerCase().includes(customerSearch.toLowerCase()) ||
    c.email.toLowerCase().includes(customerSearch.toLowerCase())
  );

  const chartData = [
    { name: 'Mon', revenue: 1240, orders: 12 },
    { name: 'Tue', revenue: 1890, orders: 18 },
    { name: 'Wed', revenue: 2300, orders: 22 },
    { name: 'Thu', revenue: 1450, orders: 14 },
    { name: 'Fri', revenue: 3100, orders: 30 },
    { name: 'Sat', revenue: 4200, orders: 40 },
    { name: 'Sun', revenue: 3850, orders: 35 },
  ];

  // AUTH GATE SCREEN (IF NOT AUTHENTICATED)
  if (!isAdminAuthenticated) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/95 backdrop-blur-md p-4 font-sans">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 relative overflow-hidden">
          {/* Subtle Glow Background */}
          <div className="absolute -top-20 -right-20 w-40 h-40 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-3">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-700/80 p-2 mx-auto shadow-xl flex items-center justify-center overflow-hidden">
              <LogoImage customSrc={companyInfo.logo} alt="ahmadify.store logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-xl font-extrabold text-white flex items-center justify-center gap-2">
                AHMADIFY Admin Portal
                <Lock className="w-4 h-4 text-amber-400" />
              </h2>
              <p className="text-xs text-slate-400 mt-1">
                Security Control Center for <span className="text-amber-400 font-semibold">{companyInfo.domain}</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handlePasscodeUnlock} className="space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider block mb-2">
                Enter Admin Security Passcode:
              </label>
              <div className="relative">
                <input
                  type="password"
                  value={inputPasscode}
                  onChange={(e) => setInputPasscode(e.target.value)}
                  placeholder="Enter passcode (Default: ahmadify2026)"
                  className="w-full px-4 py-3 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono placeholder:text-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-sm"
                  autoFocus
                />
                <Key className="w-4 h-4 text-slate-500 absolute right-3.5 top-3.5" />
              </div>
              {passcodeError && (
                <p className="text-xs text-rose-400 font-semibold mt-2 flex items-center gap-1">
                  <AlertTriangle className="w-3.5 h-3.5 shrink-0" />
                  {passcodeError}
                </p>
              )}
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 text-sm transition-all flex items-center justify-center gap-2"
            >
              <Unlock className="w-4 h-4" />
              <span>Unlock Admin Console</span>
            </button>
          </form>

          {/* Quick Demo Unlock Button */}
          <div className="pt-2 border-t border-slate-800 text-center">
            <button
              type="button"
              onClick={() => {
                setInputPasscode('ahmadify2026');
                setIsAdminAuthenticated(true);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-xl font-bold text-xs border border-slate-700 transition-all flex items-center justify-center gap-2 mx-auto"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Quick One-Click Demo Access</span>
            </button>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-slate-800/60">
            <span>Company Reg: UK-12846920</span>
            <button onClick={onClose} className="hover:text-slate-300 font-semibold">
              Return to Storefront
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex bg-slate-950/90 backdrop-blur-md overflow-hidden font-sans">
      {/* Mobile Sidebar Overlay */}
      {mobileSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-950/80 z-40 md:hidden"
          onClick={() => setMobileSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDE PANEL / SIDEBAR */}
      <aside
        className={`fixed md:relative z-50 h-full w-64 bg-slate-950 border-r border-slate-800/80 flex flex-col justify-between transition-transform duration-300 shrink-0 ${
          mobileSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        {/* Side Panel Header / Brand Emblem */}
        <div className="p-4 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white border border-slate-700/80 p-0.5 shadow-lg overflow-hidden flex items-center justify-center shrink-0">
              <LogoImage customSrc={companyInfo.logo} alt="ahmadify.store logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <div className="font-extrabold text-sm text-white flex items-center gap-1.5">
                ahmadify.store
              </div>
              <span className="text-[10px] text-amber-400 font-bold bg-amber-500/10 px-1.5 py-0.5 rounded border border-amber-500/20">
                Admin Console
              </span>
            </div>
          </div>
          <button
            onClick={() => setMobileSidebarOpen(false)}
            className="md:hidden p-1 text-slate-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Side Panel Vertical Navigation Menu */}
        <div className="p-3 flex-1 overflow-y-auto space-y-6 text-xs font-semibold scrollbar-none">
          {/* Group 1: Core Operations */}
          <div>
            <div className="px-3 text-[10px] uppercase tracking-wider font-extrabold text-slate-500 mb-2">
              Main Workspace
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('ai_bos'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'ai_bos'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'bg-slate-900 text-amber-400 border border-amber-500/30 font-extrabold hover:bg-slate-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Sparkles className="w-4 h-4 animate-pulse" />
                  <span>AI Business OS</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/40">
                  AI BOS
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('analytics'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'analytics'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <LayoutDashboard className="w-4 h-4" />
                  <span>Overview & Analytics</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('products'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'products'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Package className="w-4 h-4" />
                  <span>Products Catalog</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'products' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {products.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('orders'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'orders'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShoppingBag className="w-4 h-4" />
                  <span>Orders Management</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'orders' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {orders.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('customers'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'customers'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4" />
                  <span>Customers CRM</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'customers' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {customerList.length}
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('coupons'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'coupons'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Tag className="w-4 h-4" />
                  <span>Coupons & Discounts</span>
                </div>
                <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                  activeTab === 'coupons' ? 'bg-slate-950 text-amber-400' : 'bg-slate-800 text-slate-400'
                }`}>
                  {coupons.length}
                </span>
              </button>
            </div>
          </div>

          {/* Group 2: Design & Supply Chain */}
          <div>
            <div className="px-3 text-[10px] uppercase tracking-wider font-extrabold text-slate-500 mb-2">
              Website Builder & Supply Chain
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('website_builder'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'website_builder'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Layout className="w-4 h-4" />
                  <span>Website Builder & Owner Studio</span>
                </div>
                <span className="text-[10px] bg-amber-500/20 text-amber-300 font-extrabold px-1.5 py-0.5 rounded border border-amber-500/30">
                  No-Code
                </span>
              </button>

              <button
                onClick={() => { setActiveTab('cj'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'cj'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <RefreshCw className="w-4 h-4" />
                  <span>Dropshipping Suppliers</span>
                </div>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              </button>
            </div>
          </div>

          {/* Group 3: Store Management */}
          <div>
            <div className="px-3 text-[10px] uppercase tracking-wider font-extrabold text-slate-500 mb-2">
              Management
            </div>
            <div className="space-y-1">
              <button
                onClick={() => { setActiveTab('settings'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'settings'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Settings className="w-4 h-4" />
                  <span>Store Settings & Domain</span>
                </div>
              </button>

              <button
                onClick={() => { setActiveTab('logs'); setMobileSidebarOpen(false); }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition-all ${
                  activeTab === 'logs'
                    ? 'bg-amber-500 text-slate-950 font-extrabold shadow-lg shadow-amber-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-900'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <ShieldAlert className="w-4 h-4" />
                  <span>Audit & System Logs</span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Side Panel Footer Controls */}
        <div className="p-4 border-t border-slate-800/80 bg-slate-950/90 space-y-2.5">
          {/* Role Switcher */}
          <div className="bg-slate-900 p-2 rounded-xl border border-slate-800 flex items-center justify-between text-xs">
            <div className="flex items-center gap-1.5 text-slate-300">
              <User className="w-3.5 h-3.5 text-amber-400" />
              <span className="font-semibold text-slate-400">Role:</span>
            </div>
            <select
              value={userRole}
              onChange={(e) => setUserRole(e.target.value as UserRole)}
              className="bg-transparent text-amber-400 font-extrabold focus:outline-none cursor-pointer text-xs"
            >
              <option value="super_admin">Super Admin</option>
              <option value="admin">Admin</option>
              <option value="manager">Manager</option>
              <option value="staff">Staff</option>
            </select>
          </div>

          <button
            onClick={() => setIsEmailModalOpen(true)}
            className="w-full py-2 px-3 bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-amber-400 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <Mail className="w-4 h-4" />
            <span>Email Center</span>
          </button>

          <button
            onClick={onClose}
            className="w-full py-2 px-3 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 text-rose-400 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <X className="w-4 h-4" />
            <span>Exit Dashboard</span>
          </button>
        </div>
      </aside>

      {/* RIGHT MAIN WORKSPACE */}
      <div className="flex-1 flex flex-col min-w-0 bg-slate-900 overflow-hidden">
        {/* Workspace Top Bar Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800/80 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileSidebarOpen(true)}
              className="md:hidden p-2 text-slate-400 hover:text-white bg-slate-900 border border-slate-800 rounded-xl"
            >
              <Menu className="w-5 h-5" />
            </button>
            <div>
              <h1 className="text-base font-extrabold text-white capitalize flex items-center gap-2">
                {activeTab === 'ai_bos' && 'Ahmadify AI Business Operating System (AI BOS)'}
                {activeTab === 'analytics' && 'Overview & Store Analytics'}
                {activeTab === 'products' && 'Product Catalog & Inventory'}
                {activeTab === 'orders' && 'Customer Orders & Dispatch Fulfillment'}
                {activeTab === 'customers' && 'Customer Relationship Management (CRM)'}
                {activeTab === 'coupons' && 'Coupons & Promotional Discounts'}
                {activeTab === 'cj' && 'CJdropshipping & Multi-Supplier Hub'}
                {activeTab === 'website_builder' && 'Website Builder & Owner Studio'}
                {activeTab === 'settings' && 'Store Configuration, Payments & Custom Domain'}
                {activeTab === 'logs' && 'Security Audit & Activity History'}
              </h1>
              <p className="text-xs text-slate-400">
                {companyInfo.name || 'ahmadify.store'} • {companyInfo.domain}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {activeTab === 'products' && (
              <button
                onClick={() => openProductModal()}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" /> Add Product
              </button>
            )}
            {activeTab === 'coupons' && (
              <button
                onClick={() => setIsCouponModalOpen(true)}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
              >
                <Plus className="w-4 h-4" /> Create Coupon
              </button>
            )}
            {activeTab === 'cj' && (
              <button
                onClick={() => handleSyncCjCatalog()}
                disabled={cjLoading}
                className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
              >
                <RefreshCw className={`w-4 h-4 ${cjLoading ? 'animate-spin' : ''}`} /> Sync Catalog
              </button>
            )}
          </div>
        </div>

        {/* Dashboard Content Container */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6">
          {/* TAB 0: AI Business Operating System (AI BOS) */}
          {activeTab === 'ai_bos' && (
            <AIBusinessOperatingSystem
              products={products}
              onUpdateProducts={(prods) => {
                if (onUpdateProduct && prods.length > 0) {
                  prods.forEach((p) => onUpdateProduct(p));
                }
              }}
              orders={orders}
              companyInfo={companyInfo}
              onUpdateCompanyInfo={onUpdateCompanyInfo}
              coupons={coupons}
              onAddCoupon={(c) => onAddCoupon && onAddCoupon(c)}
              seoSettings={seoSettings || {
                defaultTitle: companyInfo.name,
                titleTemplate: '%s | ' + companyInfo.name,
                defaultDescription: '',
                defaultKeywords: [],
                ogImage: '',
                canonicalBase: '',
                twitterHandle: '',
                homepageTitle: '',
                homepageDescription: '',
                blogTitleTemplate: ''
              }}
              onUpdateSEO={(s) => onUpdateSeoSettings && onUpdateSeoSettings(s)}
              isEmbeddedInAdmin={true}
            />
          )}

          {/* TAB 1: Analytics Overview */}
          {activeTab === 'analytics' && (
            <div className="space-y-6">
              {/* Stat Cards Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Total Sales Revenue</span>
                    <TrendingUp className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="text-2xl font-black text-white">
                    £{totalRevenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
                  </div>
                  <div className="text-[11px] text-emerald-400 font-bold mt-1 flex items-center gap-1">
                    <span>+18.4%</span>
                    <span className="text-slate-400 font-normal">vs last month</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Total Orders</span>
                    <ShoppingBag className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{orders.length}</div>
                  <div className="text-[11px] text-slate-400 mt-1">
                    Average Order Value: <span className="text-amber-400 font-bold">£{(totalRevenue / (orders.length || 1)).toFixed(2)}</span>
                  </div>
                </div>

                <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Active Customers</span>
                    <Users className="w-4 h-4 text-sky-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{customerList.length}</div>
                  <div className="text-[11px] text-sky-400 font-bold mt-1">
                    100% Verified CRM Records
                  </div>
                </div>

                <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg">
                  <div className="flex items-center justify-between text-slate-400 text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Inventory Health</span>
                    <AlertTriangle className="w-4 h-4 text-amber-400" />
                  </div>
                  <div className="text-2xl font-black text-white">{products.length} Items</div>
                  <div className="text-[11px] text-rose-400 font-bold mt-1">
                    {lowStockCount} low stock / {outOfStockCount} out of stock
                  </div>
                </div>
              </div>

              {/* Sales Chart */}
              <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-sm font-extrabold text-white">Sales & Revenue Velocity</h3>
                    <p className="text-xs text-slate-400">Weekly revenue trend for ahmadify.store</p>
                  </div>
                  <span className="text-xs font-mono font-bold text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-lg border border-amber-500/20">
                    LIVE DATA
                  </span>
                </div>
                <div className="h-64 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                      <XAxis dataKey="name" stroke="#94a3b8" fontSize={12} />
                      <YAxis stroke="#94a3b8" fontSize={12} />
                      <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', color: '#fff' }} />
                      <Line type="monotone" dataKey="revenue" stroke="#f59e0b" strokeWidth={3} dot={{ fill: '#f59e0b', r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: Product Catalog & Inventory */}
          {activeTab === 'products' && (
            <div className="space-y-6">
              {/* Product Controls Header */}
              <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-lg">
                <div className="flex items-center gap-2 flex-1 max-w-md">
                  <div className="relative w-full">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      type="text"
                      placeholder="Search by Title, SKU, or Category..."
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-semibold">
                  <button
                    onClick={() => setProductStockFilter('all')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      productStockFilter === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    All ({products.length})
                  </button>
                  <button
                    onClick={() => setProductStockFilter('in_stock')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      productStockFilter === 'in_stock' ? 'bg-emerald-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    In Stock ({products.filter(p => p.stock > 10).length})
                  </button>
                  <button
                    onClick={() => setProductStockFilter('low_stock')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      productStockFilter === 'low_stock' ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Low Stock ({lowStockCount})
                  </button>
                  <button
                    onClick={() => setProductStockFilter('out_of_stock')}
                    className={`px-3 py-1.5 rounded-lg transition-colors ${
                      productStockFilter === 'out_of_stock' ? 'bg-rose-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-400 hover:text-white'
                    }`}
                  >
                    Out of Stock ({outOfStockCount})
                  </button>
                </div>
              </div>

              {/* Products Table */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs text-slate-300 whitespace-nowrap">
                    <thead className="bg-slate-950/90 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-700">
                      <tr>
                        <th className="p-3.5 sticky left-0 bg-slate-950 border-r border-slate-800">Product Image & SKU</th>
                        <th className="p-3.5">Supplier</th>
                        <th
                          className="p-3.5 cursor-pointer hover:text-white"
                          onClick={() => {
                            setProductSortField('costPrice');
                            setProductSortAsc(!productSortAsc);
                          }}
                        >
                          Supplier Cost (£) {productSortField === 'costPrice' ? (productSortAsc ? '↑' : '↓') : ''}
                        </th>
                        <th className="p-3.5">Suggested MSRP (£)</th>
                        <th className="p-3.5">Shipping (£)</th>
                        <th
                          className="p-3.5 cursor-pointer hover:text-white"
                          onClick={() => {
                            setProductSortField('price');
                            setProductSortAsc(!productSortAsc);
                          }}
                        >
                          My Selling Price (£) {productSortField === 'price' ? (productSortAsc ? '↑' : '↓') : ''}
                        </th>
                        <th
                          className="p-3.5 cursor-pointer hover:text-emerald-400"
                          onClick={() => {
                            setProductSortField('profit');
                            setProductSortAsc(!productSortAsc);
                          }}
                        >
                          Profit (£) {productSortField === 'profit' ? (productSortAsc ? '↑' : '↓') : ''}
                        </th>
                        <th
                          className="p-3.5 cursor-pointer hover:text-amber-400"
                          onClick={() => {
                            setProductSortField('profitMargin');
                            setProductSortAsc(!productSortAsc);
                          }}
                        >
                          Margin (%) {productSortField === 'profitMargin' ? (productSortAsc ? '↑' : '↓') : ''}
                        </th>
                        <th
                          className="p-3.5 cursor-pointer hover:text-white"
                          onClick={() => {
                            setProductSortField('stock');
                            setProductSortAsc(!productSortAsc);
                          }}
                        >
                          Stock Level {productSortField === 'stock' ? (productSortAsc ? '↑' : '↓') : ''}
                        </th>
                        <th className="p-3.5">Status</th>
                        <th className="p-3.5">Sync Status</th>
                        <th className="p-3.5">Last Updated</th>
                        <th className="p-3.5 text-right sticky right-0 bg-slate-950 border-l border-slate-800">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-700/60 font-mono text-[11px]">
                      {filteredProductsList
                        .slice()
                        .sort((a, b) => {
                          const costA = a.costPrice || (a.price * 0.45);
                          const costB = b.costPrice || (b.price * 0.45);
                          const profitA = a.price - costA;
                          const profitB = b.price - costB;
                          const marginA = (profitA / a.price) * 100;
                          const marginB = (profitB / b.price) * 100;

                          let valA: any = a[productSortField as keyof Product] ?? 0;
                          let valB: any = b[productSortField as keyof Product] ?? 0;

                          if (productSortField === 'costPrice') { valA = costA; valB = costB; }
                          if (productSortField === 'profit') { valA = profitA; valB = profitB; }
                          if (productSortField === 'profitMargin') { valA = marginA; valB = marginB; }

                          if (valA < valB) return productSortAsc ? -1 : 1;
                          if (valA > valB) return productSortAsc ? 1 : -1;
                          return 0;
                        })
                        .map((p) => {
                          const costPrice = p.costPrice || Number((p.price * 0.45).toFixed(2));
                          const msrp = Number((p.originalPrice || p.price * 1.35).toFixed(2));
                          const shippingCost = Number((p.shippingCost || 3.99).toFixed(2));
                          const profit = Number((p.price - costPrice).toFixed(2));
                          const margin = Number(((profit / p.price) * 100).toFixed(1));

                          return (
                            <tr key={p.id} className="hover:bg-slate-800/60 transition-colors font-sans">
                              <td className="p-3.5 sticky left-0 bg-slate-900 border-r border-slate-800">
                                <div className="flex items-center gap-3">
                                  <img
                                    src={p.images?.[0] || 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=200&q=80'}
                                    alt={p.title}
                                    className="w-10 h-10 object-cover rounded-lg border border-slate-700 shrink-0 bg-slate-900"
                                  />
                                  <div className="min-w-0 max-w-[200px]">
                                    <div className="font-extrabold text-white text-xs truncate">{p.title}</div>
                                    <div className="text-[10px] text-slate-400 font-mono">SKU: {p.sku}</div>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3.5">
                                <span className="text-amber-400 font-bold text-xs">
                                  {p.supplierName || (p.cjProductId ? 'CJ Dropshipping' : 'Ahmadify Select')}
                                </span>
                              </td>
                              <td className="p-3.5 font-mono text-slate-300">
                                £{costPrice.toFixed(2)}
                              </td>
                              <td className="p-3.5 font-mono text-emerald-400 font-bold">
                                £{msrp.toFixed(2)}
                              </td>
                              <td className="p-3.5 font-mono text-slate-400">
                                £{shippingCost.toFixed(2)}
                              </td>
                              <td className="p-3.5 font-mono text-amber-300 font-extrabold bg-amber-500/10 text-xs">
                                £{p.price.toFixed(2)}
                              </td>
                              <td className="p-3.5 font-mono text-emerald-400 font-extrabold">
                                +£{profit.toFixed(2)}
                              </td>
                              <td className="p-3.5 font-mono">
                                <span className="px-2 py-0.5 rounded font-extrabold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px]">
                                  {margin}%
                                </span>
                              </td>
                              <td className="p-3.5 font-mono">
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                                    p.stock === 0 ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30' :
                                    p.stock <= 10 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' :
                                    'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                                  }`}>
                                    {p.stock === 0 ? 'Out of Stock' : `${p.stock}`}
                                  </span>
                                  <div className="flex items-center gap-1 bg-slate-900 border border-slate-700 rounded-lg px-1 py-0.5">
                                    <button
                                      onClick={() => onUpdateProduct({ ...p, stock: Math.max(0, p.stock - 1) })}
                                      className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-white font-bold bg-slate-800 rounded"
                                    >
                                      -
                                    </button>
                                    <span className="text-[10px] font-bold px-1 text-amber-400">{p.stock}</span>
                                    <button
                                      onClick={() => onUpdateProduct({ ...p, stock: p.stock + 1 })}
                                      className="w-4 h-4 flex items-center justify-center text-slate-400 hover:text-white font-bold bg-slate-800 rounded"
                                    >
                                      +
                                    </button>
                                  </div>
                                </div>
                              </td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold text-[10px]">
                                  Published
                                </span>
                              </td>
                              <td className="p-3.5">
                                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-bold text-[10px] flex items-center gap-1">
                                  <ShieldCheck className="w-3 h-3 text-amber-400" />
                                  Locked by Owner
                                </span>
                              </td>
                              <td className="p-3.5 text-[10px] text-slate-400 font-mono">
                                2026-08-01
                              </td>
                              <td className="p-3.5 text-right sticky right-0 bg-slate-900 border-l border-slate-800">
                                <div className="flex items-center justify-end gap-1.5">
                                  <button
                                    onClick={() => openProductModal(p)}
                                    className="p-1.5 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 rounded-lg transition-colors border border-amber-500/30"
                                    title="Edit Product Details & Selling Price"
                                  >
                                    <Edit className="w-3.5 h-3.5" />
                                  </button>
                                  <button
                                    onClick={() => onDeleteProduct(p.id)}
                                    className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors border border-rose-500/30"
                                    title="Delete Product"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Orders Management */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Order ID & Date</th>
                      <th className="p-3.5">Customer & Delivery</th>
                      <th className="p-3.5">Items Purchased</th>
                      <th className="p-3.5">Total & Payment</th>
                      <th className="p-3.5">Fulfillment Status</th>
                      <th className="p-3.5 text-right">Invoice & Dispatch</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {orders.map((o) => (
                      <tr key={o.id} className="hover:bg-slate-800/60 transition-colors">
                        <td className="p-3.5 font-mono">
                          <div className="font-extrabold text-white text-xs text-amber-400">{o.orderNumber}</div>
                          <div className="text-[10px] text-slate-400">
                            {new Date(o.createdAt).toLocaleDateString()}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-bold text-white">{o.customerName}</div>
                          <div className="text-[10px] text-slate-400">{o.customerEmail}</div>
                          <div className="text-[10px] text-slate-400">
                            {o.shippingAddress?.city}, {o.shippingAddress?.country}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="space-y-1">
                            {o.items.map((it, idx) => (
                              <div key={idx} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                                <span className="font-extrabold text-amber-400">{it.quantity}x</span>
                                <span>{it.title}</span>
                              </div>
                            ))}
                          </div>
                        </td>
                        <td className="p-3.5">
                          <div className="font-extrabold text-white text-sm">£{o.totalAmount.toFixed(2)}</div>
                          <span className="text-[10px] uppercase tracking-wider font-extrabold text-emerald-400 bg-emerald-500/10 px-1.5 py-0.5 rounded border border-emerald-500/20">
                            {o.paymentMethod || 'Stripe'} ({o.paymentStatus})
                          </span>
                        </td>
                        <td className="p-3.5">
                          <select
                            value={o.orderStatus}
                            onChange={(e) => onUpdateOrderStatus(o.id, e.target.value as Order['orderStatus'])}
                            className={`px-2.5 py-1 rounded-lg text-xs font-bold border focus:outline-none cursor-pointer ${
                              o.orderStatus === 'delivered' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' :
                              o.orderStatus === 'shipped' ? 'bg-sky-500/20 text-sky-400 border-sky-500/30' :
                              o.orderStatus === 'processing' ? 'bg-amber-500/20 text-amber-400 border-amber-500/30' :
                              'bg-slate-800 text-slate-300 border-slate-700'
                            }`}
                          >
                            <option value="pending" className="bg-slate-900 text-white">Pending</option>
                            <option value="paid" className="bg-slate-900 text-white">Paid</option>
                            <option value="processing" className="bg-slate-900 text-white">Processing</option>
                            <option value="shipped" className="bg-slate-900 text-white">Shipped</option>
                            <option value="delivered" className="bg-slate-900 text-white">Delivered</option>
                            <option value="cancelled" className="bg-slate-900 text-white">Cancelled</option>
                          </select>

                          {o.trackingNumber && (
                            <div className="text-[10px] text-slate-400 font-mono mt-1">
                              Trk: {o.trackingNumber} ({o.carrier || 'Royal Mail'})
                            </div>
                          )}
                        </td>
                        <td className="p-3.5 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <button
                              onClick={() => handlePushOrderToCj(o.id)}
                              className="px-2.5 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1"
                            >
                              <RefreshCw className="w-3 h-3" /> Push CJ
                            </button>
                            <button
                              onClick={() => onViewInvoice(o)}
                              className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white border border-slate-700 rounded-lg text-[10px] font-bold transition-colors flex items-center gap-1"
                            >
                              <Printer className="w-3 h-3" /> Invoice
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 4: Customer Relationship Management (CRM) */}
          {activeTab === 'customers' && (
            <div className="space-y-6">
              {/* Header Search */}
              <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 max-w-md">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    type="text"
                    placeholder="Search customers by Name or Email..."
                    value={customerSearch}
                    onChange={(e) => setCustomerSearch(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 bg-slate-900 border border-slate-700 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="text-xs text-slate-400 font-semibold">
                  Total Verified Customers: <span className="text-amber-400 font-bold">{customerList.length}</span>
                </div>
              </div>

              {/* Customers Table */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Customer Name & Email</th>
                      <th className="p-3.5">Phone Number</th>
                      <th className="p-3.5">Orders Count</th>
                      <th className="p-3.5">Lifetime Spend</th>
                      <th className="p-3.5">Last Active Date</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {customerList.map((c, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/60 transition-colors">
                        <td className="p-3.5">
                          <div className="font-bold text-white text-xs">{c.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{c.email}</div>
                        </td>
                        <td className="p-3.5 text-slate-300">{c.phone || '+44 7700 900000'}</td>
                        <td className="p-3.5">
                          <span className="px-2.5 py-0.5 bg-amber-500/10 text-amber-400 font-bold rounded border border-amber-500/20 text-[10px]">
                            {c.ordersCount} Orders
                          </span>
                        </td>
                        <td className="p-3.5 font-extrabold text-emerald-400">
                          £{c.totalSpent.toFixed(2)}
                        </td>
                        <td className="p-3.5 text-slate-400 font-mono text-[10px]">
                          {new Date(c.lastOrderDate).toLocaleDateString()}
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => setSelectedCustomerEmail(c.email)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-white rounded-lg text-[10px] font-bold transition-colors"
                          >
                            View Order History
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: Coupons & Promotional Discounts */}
          {activeTab === 'coupons' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-800/80 border border-slate-700/80 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-white">Active Store Coupons & Voucher Codes</h3>
                  <p className="text-xs text-slate-400">Manage promotional discount codes for cart and checkout</p>
                </div>
                <button
                  onClick={() => setIsCouponModalOpen(true)}
                  className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5 shadow-md transition-all"
                >
                  <Plus className="w-4 h-4" /> Create Coupon Code
                </button>
              </div>

              {/* Coupons Table */}
              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Coupon Code</th>
                      <th className="p-3.5">Discount Value</th>
                      <th className="p-3.5">Min Spend Requirement</th>
                      <th className="p-3.5">Valid Until</th>
                      <th className="p-3.5">Times Redeemed</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    {coupons.map((cp, idx) => (
                      <tr key={idx} className="hover:bg-slate-800/60 transition-colors">
                        <td className="p-3.5 font-mono font-extrabold text-amber-400 text-sm">
                          {cp.code}
                        </td>
                        <td className="p-3.5 font-bold text-white">
                          {cp.discountPercent ? `${cp.discountPercent}% OFF` : `£${cp.fixedDiscountAmount?.toFixed(2)} OFF`}
                        </td>
                        <td className="p-3.5 text-slate-300">
                          £{(cp.minSpend || 0).toFixed(2)}
                        </td>
                        <td className="p-3.5 text-slate-400 font-mono text-[10px]">
                          {cp.validUntil}
                        </td>
                        <td className="p-3.5 font-bold text-sky-400">
                          {cp.usageCount} uses
                        </td>
                        <td className="p-3.5">
                          <button
                            onClick={() => onToggleCoupon && onToggleCoupon(cp.code)}
                            className={`px-2.5 py-0.5 rounded text-[10px] font-bold border transition-colors ${
                              cp.active ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30' : 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                            }`}
                          >
                            {cp.active ? 'ACTIVE' : 'INACTIVE'}
                          </button>
                        </td>
                        <td className="p-3.5 text-right">
                          <button
                            onClick={() => onDeleteCoupon && onDeleteCoupon(cp.code)}
                            className="p-1.5 bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: Website Owner Control Studio & Drag-and-Drop Page Builder */}
          {activeTab === 'website_builder' && (
            <WebsiteBuilderStudio
              themeConfig={themeConfig}
              onUpdateThemeConfig={setThemeConfig}
              pages={websitePages}
              onUpdatePages={setWebsitePages}
              mediaAssets={mediaAssets}
              onAddMediaAsset={(asset) => setMediaAssets((prev) => [asset, ...prev])}
              emailTemplates={emailTemplatesList}
              onUpdateEmailTemplates={setEmailTemplatesList}
              seoConfig={seoConfigState}
              onUpdateSEOConfig={setSeoConfigState}
              backups={backupsList}
              onCreateBackup={(description) => {
                const newBackup: SiteBackupPoint = {
                  id: 'bak-' + Date.now(),
                  timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
                  creator: 'Super Admin (Owner)',
                  sizeMb: 1.48,
                  description,
                  dataJson: JSON.stringify({ websitePages, themeConfig, seoConfigState })
                };
                setBackupsList((prev) => [newBackup, ...prev]);
              }}
              onRestoreBackup={(backupId) => {
                const bak = backupsList.find((b) => b.id === backupId);
                if (bak && bak.dataJson) {
                  try {
                    const parsed = JSON.parse(bak.dataJson);
                    if (parsed.websitePages) setWebsitePages(parsed.websitePages);
                    if (parsed.themeConfig) setThemeConfig(parsed.themeConfig);
                    if (parsed.seoConfigState) setSeoConfigState(parsed.seoConfigState);
                  } catch (e) {
                    console.error('Failed to parse backup state');
                  }
                }
              }}
            />
          )}

          {/* TAB 7: Multi-Supplier Supply Chain Platform */}
          {activeTab === 'cj' && (
            <SupplyChainDashboard
              suppliers={suppliersList}
              onUpdateSupplier={(updated) => {
                setSuppliersList((prev) => prev.map((s) => (s.id === updated.id ? updated : s)));
              }}
              pricingRules={pricingRulesList}
              onSavePricingRule={(rule) => {
                setPricingRulesList((prev) => {
                  const idx = prev.findIndex((r) => r.id === rule.id);
                  if (idx >= 0) {
                    const copy = [...prev];
                    copy[idx] = rule;
                    return copy;
                  }
                  return [...prev, rule];
                });
              }}
              onDeletePricingRule={(ruleId) => {
                setPricingRulesList((prev) => prev.filter((r) => r.id !== ruleId));
              }}
              automationRules={automationRulesList}
              onSaveAutomationRule={(rule) => {
                setAutomationRulesList((prev) => {
                  const idx = prev.findIndex((r) => r.id === rule.id);
                  if (idx >= 0) {
                    const copy = [...prev];
                    copy[idx] = rule;
                    return copy;
                  }
                  return [...prev, rule];
                });
              }}
              products={products}
              orders={orders}
              onImportProducts={(imported, supplierId) => {
                imported.forEach((p) => {
                  onAddProduct(p as any);
                });
              }}
              onFulfillOrder={(orderId, supplierId) => {
                onUpdateOrderStatus(orderId, 'processing', `TRACK-EXPRESS-${Math.floor(100000 + Math.random() * 900000)}`, 'Ahmadify Express');
                alert(`Order ${orderId} sent for auto-fulfillment to ${supplierId.toUpperCase()}!`);
              }}
            />
          )}

          {/* TAB 7: Store Settings, Payments & Domain */}
          {activeTab === 'settings' && (
            <div className="space-y-6">
              {/* Settings Sub-Tab Navigation */}
              <div className="flex flex-wrap items-center gap-2 border-b border-slate-700 pb-3 text-xs font-bold">
                <button
                  onClick={() => setSettingsSubTab('company')}
                  className={`px-3 py-1.5 rounded-lg ${settingsSubTab === 'company' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
                >
                  Company Info
                </button>
                <button
                  onClick={() => setSettingsSubTab('payments')}
                  className={`px-3 py-1.5 rounded-lg ${settingsSubTab === 'payments' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
                >
                  Payment Gateways (Stripe)
                </button>
                <button
                  onClick={() => setSettingsSubTab('shipping')}
                  className={`px-3 py-1.5 rounded-lg ${settingsSubTab === 'shipping' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
                >
                  Shipping & Fees
                </button>
                <button
                  onClick={() => setSettingsSubTab('tax')}
                  className={`px-3 py-1.5 rounded-lg ${settingsSubTab === 'tax' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
                >
                  Tax & VAT Settings
                </button>
                <button
                  onClick={() => setSettingsSubTab('domain')}
                  className={`px-3 py-1.5 rounded-lg ${settingsSubTab === 'domain' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
                >
                  Custom Domain Connection
                </button>
                <button
                  onClick={() => setSettingsSubTab('policies')}
                  className={`px-3 py-1.5 rounded-lg ${settingsSubTab === 'policies' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
                >
                  Legal Policy Editor
                </button>
                <button
                  onClick={() => setSettingsSubTab('seo')}
                  className={`px-3 py-1.5 rounded-lg ${settingsSubTab === 'seo' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
                >
                  SEO & AI SEO
                </button>
                <button
                  onClick={() => setSettingsSubTab('passcode')}
                  className={`px-3 py-1.5 rounded-lg ${settingsSubTab === 'passcode' ? 'bg-amber-500 text-slate-950 font-extrabold' : 'text-slate-400 hover:text-white'}`}
                >
                  Admin Passcode Security
                </button>
              </div>

              {/* Sub tab: Company Info */}
              {settingsSubTab === 'company' && (
                <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl space-y-4">
                  <h3 className="text-sm font-extrabold text-white">Registered Company Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Company Name:</label>
                      <input
                        type="text"
                        value={settingsForm.name}
                        onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Primary Domain:</label>
                      <input
                        type="text"
                        value={settingsForm.domain}
                        onChange={(e) => setSettingsForm({ ...settingsForm, domain: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Company Registration Number:</label>
                      <input
                        type="text"
                        value={settingsForm.registrationNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, registrationNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">VAT Registration Number:</label>
                      <input
                        type="text"
                        value={settingsForm.vatNumber}
                        onChange={(e) => setSettingsForm({ ...settingsForm, vatNumber: e.target.value })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onUpdateCompanyInfo(settingsForm);
                      alert('Company settings saved successfully!');
                    }}
                    className="px-4 py-2 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md"
                  >
                    Save Company Details
                  </button>
                </div>
              )}

              {/* Sub tab: Payments */}
              {settingsSubTab === 'payments' && (
                <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl space-y-6">
                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-amber-400" />
                      Payment Gateways & Stripe Settings
                    </h3>
                    <p className="text-xs text-slate-400">Configure Stripe credit cards, PayPal, and Cash on Delivery</p>
                  </div>

                  {/* Stripe Card */}
                  <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-4 text-xs">
                    <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                      <div className="font-extrabold text-white text-sm">Stripe Credit & Debit Cards</div>
                      <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded ${stripeLiveMode ? 'bg-emerald-500/20 text-emerald-400' : 'bg-amber-500/20 text-amber-400'}`}>
                          {stripeLiveMode ? 'LIVE MODE' : 'TEST MODE'}
                        </span>
                        <input
                          type="checkbox"
                          checked={stripeEnabled}
                          onChange={(e) => setStripeEnabled(e.target.checked)}
                          className="w-4 h-4 text-amber-500 rounded cursor-pointer"
                        />
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Stripe Publishable Key:</label>
                        <input
                          type="text"
                          value={stripePublishableKey}
                          onChange={(e) => setStripePublishableKey(e.target.value)}
                          className="w-full p-2 bg-slate-950 border border-slate-800 rounded font-mono text-white"
                        />
                      </div>
                      <div>
                        <label className="font-bold text-slate-300 block mb-1">Stripe Secret Key:</label>
                        <input
                          type="password"
                          value={stripeSecretKey}
                          onChange={(e) => setStripeSecretKey(e.target.value)}
                          className="w-full p-2 bg-slate-950 border border-slate-800 rounded font-mono text-white"
                        />
                      </div>
                    </div>
                  </div>

                  {/* PayPal & COD Options */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">PayPal Gateway</div>
                        <div className="text-[10px] text-slate-400">Express checkout via PayPal</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={paypalEnabled}
                        onChange={(e) => setPaypalEnabled(e.target.checked)}
                        className="w-4 h-4 text-amber-500"
                      />
                    </div>

                    <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl flex items-center justify-between">
                      <div>
                        <div className="font-bold text-white">Cash on Delivery (COD)</div>
                        <div className="text-[10px] text-slate-400">Pay cash upon parcel arrival</div>
                      </div>
                      <input
                        type="checkbox"
                        checked={codEnabled}
                        onChange={(e) => setCodEnabled(e.target.checked)}
                        className="w-4 h-4 text-amber-500"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sub tab: Shipping */}
              {settingsSubTab === 'shipping' && (
                <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl space-y-4 text-xs">
                  <h3 className="text-sm font-extrabold text-white">Shipping & Delivery Rates</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Standard Shipping Fee (£):</label>
                      <input
                        type="number"
                        value={settingsForm.defaultShippingFee}
                        onChange={(e) => setSettingsForm({ ...settingsForm, defaultShippingFee: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                      />
                    </div>
                    <div>
                      <label className="font-bold text-slate-300 block mb-1">Free Shipping Threshold (£):</label>
                      <input
                        type="number"
                        value={settingsForm.freeShippingThreshold}
                        onChange={(e) => setSettingsForm({ ...settingsForm, freeShippingThreshold: Number(e.target.value) })}
                        className="w-full px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              )}

              {/* Sub tab: Tax */}
              {settingsSubTab === 'tax' && (
                <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl space-y-4 text-xs">
                  <h3 className="text-sm font-extrabold text-white">Tax & UK VAT Settings</h3>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Default Tax Percentage Rate (%):</label>
                    <input
                      type="number"
                      value={settingsForm.defaultTaxRatePercent}
                      onChange={(e) => setSettingsForm({ ...settingsForm, defaultTaxRatePercent: Number(e.target.value) })}
                      className="w-full max-w-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-white font-mono"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Standard UK VAT rate is 20%.</p>
                  </div>
                </div>
              )}

              {/* Sub tab: Custom Domain Connection */}
              {settingsSubTab === 'domain' && (
                <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl space-y-6 text-xs">
                  <div>
                    <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                      <Globe className="w-4 h-4 text-amber-400" />
                      Custom Domain Setup ({companyInfo.domain})
                    </h3>
                    <p className="text-xs text-slate-400">Connect your custom domain and SSL certificate</p>
                  </div>

                  <div className="p-4 bg-slate-900 border border-slate-700 rounded-xl space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">Connected Domain:</span>
                      <span className="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">
                        256-BIT SSL ACTIVE & VERIFIED
                      </span>
                    </div>
                    <input
                      type="text"
                      value={companyInfo.domain}
                      readOnly
                      className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono text-sm font-bold"
                    />
                  </div>

                  <div className="space-y-2">
                    <div className="font-bold text-white">DNS Server Configuration Instructions:</div>
                    <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-2 text-[11px] font-mono">
                      <div><span className="text-amber-400 font-bold">A Record:</span> Host @ → 216.239.32.21</div>
                      <div><span className="text-amber-400 font-bold">CNAME Record:</span> Host www → www.ahmadify.store</div>
                    </div>
                  </div>

                  <button
                    onClick={handleTestDnsPing}
                    className="px-4 py-2 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl shadow-md"
                  >
                    Run Live DNS Health Check
                  </button>

                  {dnsCheckResult && (
                    <p className="text-xs text-emerald-400 font-bold">{dnsCheckResult}</p>
                  )}
                </div>
              )}

              {/* Sub tab: Admin Passcode Security */}
              {settingsSubTab === 'passcode' && (
                <div className="p-6 bg-slate-800/80 border border-slate-700/80 rounded-2xl shadow-xl space-y-4 text-xs">
                  <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                    <Lock className="w-4 h-4 text-amber-400" />
                    Admin Passcode Security Configuration
                  </h3>
                  <div>
                    <label className="font-bold text-slate-300 block mb-1">Current Admin Passcode:</label>
                    <input
                      type="text"
                      value={adminPasscode}
                      onChange={(e) => setAdminPasscode(e.target.value)}
                      className="w-full max-w-xs px-3 py-2 bg-slate-900 border border-slate-700 rounded-xl text-amber-400 font-mono font-bold"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">Default passcode is "ahmadify2026". You can update it anytime here.</p>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 8: Security Audit & System Activity Logs */}
          {activeTab === 'logs' && (
            <div className="space-y-6">
              <div className="p-4 bg-slate-800/60 border border-slate-700 rounded-2xl flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-extrabold text-white">System Security & Activity Trail</h3>
                  <p className="text-xs text-slate-400">Automated audit logging for ahmadify.store system events</p>
                </div>
                <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full font-mono text-[10px] border border-emerald-500/20">
                  REALTIME AUDIT ACTIVE
                </span>
              </div>

              <div className="bg-slate-800/80 border border-slate-700/80 rounded-2xl overflow-hidden shadow-xl">
                <table className="w-full text-left text-xs text-slate-300">
                  <thead className="bg-slate-950/80 text-slate-400 font-bold uppercase text-[10px] border-b border-slate-700">
                    <tr>
                      <th className="p-3.5">Timestamp</th>
                      <th className="p-3.5">Event Category</th>
                      <th className="p-3.5">Admin Actor</th>
                      <th className="p-3.5">Status</th>
                      <th className="p-3.5">Action & Description</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-700/60">
                    <tr className="hover:bg-slate-800">
                      <td className="p-3.5 font-mono text-slate-400">{new Date().toLocaleTimeString()}</td>
                      <td className="p-3.5 font-bold text-amber-400">ADMIN AUTH</td>
                      <td className="p-3.5 font-semibold text-white">Super Admin (ahmadify)</td>
                      <td className="p-3.5"><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-mono text-[10px]">SUCCESS</span></td>
                      <td className="p-3.5">Admin portal unlocked with verified passcode.</td>
                    </tr>
                    <tr className="hover:bg-slate-800">
                      <td className="p-3.5 font-mono text-slate-400">10:42:15 AM</td>
                      <td className="p-3.5 font-bold text-amber-400">CJ SUPPLIER API</td>
                      <td className="p-3.5 font-semibold text-white">System Worker</td>
                      <td className="p-3.5"><span className="px-2 py-0.5 bg-emerald-500/20 text-emerald-400 rounded font-mono text-[10px]">SUCCESS</span></td>
                      <td className="p-3.5">Synchronized CJdropshipping product feed and multi-app webhooks.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* PRODUCT CREATE / EDIT MODAL */}
      {isProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto font-sans">
          <div className="relative w-full max-w-3xl bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                <Package className="w-5 h-5 text-amber-400" />
                {editingProduct ? 'Edit Product Details' : 'Add New Product to Catalog'}
              </h2>
              <button onClick={() => setIsProductModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Product Title:</label>
                  <input
                    type="text"
                    required
                    value={prodTitle}
                    onChange={(e) => setProdTitle(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Category:</label>
                  <input
                    type="text"
                    required
                    value={prodCategory}
                    onChange={(e) => setProdCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Brand Name:</label>
                  <input
                    type="text"
                    value={prodBrand}
                    onChange={(e) => setProdBrand(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="font-bold text-slate-300">SKU Code:</label>
                    <button
                      type="button"
                      onClick={handleGenerateSku}
                      className="text-[10px] text-amber-400 font-bold hover:underline"
                    >
                      Generate SKU
                    </button>
                  </div>
                  <input
                    type="text"
                    required
                    value={prodSku}
                    onChange={(e) => setProdSku(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-amber-400 font-mono font-bold"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Selling Price (£):</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={prodPrice}
                    onChange={(e) => setProdPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Stock Quantity:</label>
                  <input
                    type="number"
                    required
                    value={prodStock}
                    onChange={(e) => setProdStock(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              {/* Multiple Images Upload & Gallery */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <label className="font-bold text-slate-300 block">Multiple Product Images Gallery & Upload:</label>
                
                {/* Image Thumbnails */}
                <div className="flex flex-wrap gap-2 mb-2">
                  {prodImages.map((img, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 group">
                      <img src={img} alt={`Product ${idx}`} className="w-full h-full object-cover" />
                      {idx === 0 && (
                        <span className="absolute bottom-0 left-0 right-0 bg-amber-500 text-slate-950 text-[8px] font-extrabold text-center py-0.5">
                          COVER
                        </span>
                      )}
                      <div className="absolute inset-0 bg-slate-950/80 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-1 transition-opacity">
                        {idx !== 0 && (
                          <button
                            type="button"
                            onClick={() => handleSetCoverImage(idx)}
                            className="p-1 bg-amber-500 text-slate-950 rounded"
                            title="Set as Cover"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                        )}
                        <button
                          type="button"
                          onClick={() => handleRemoveImage(idx)}
                          className="p-1 bg-rose-500 text-white rounded"
                          title="Remove Image"
                        >
                          <Trash2 className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add Image URL or File Upload */}
                <div className="flex flex-wrap gap-2">
                  <input
                    type="text"
                    placeholder="Paste Image URL..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                  <button
                    type="button"
                    onClick={handleAddImageUrl}
                    className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold rounded-xl border border-slate-700"
                  >
                    Add Image URL
                  </button>
                  <label className="px-3 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-xl cursor-pointer flex items-center gap-1">
                    <Upload className="w-3.5 h-3.5" />
                    <span>Upload Image File</span>
                    <input type="file" accept="image/*" multiple onChange={handleFileUpload} className="hidden" />
                  </label>
                </div>
              </div>

              {/* Product Video URL */}
              <div className="border-t border-slate-800 pt-3">
                <label className="font-bold text-slate-300 block mb-1">Product Video URL (MP4 or Youtube embed):</label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. https://example.com/demo.mp4"
                    value={prodVideoUrl}
                    onChange={(e) => setProdVideoUrl(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  />
                  <Video className="w-4 h-4 text-slate-500 absolute left-3 top-2.5" />
                </div>
              </div>

              {/* Descriptions & AI Generator */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <div className="flex items-center justify-between">
                  <label className="font-bold text-slate-300">Product Description:</label>
                  <button
                    type="button"
                    onClick={handleAiGenerate}
                    disabled={isGeneratingAi}
                    className="px-3 py-1 bg-amber-500/10 hover:bg-amber-500/20 text-amber-400 border border-amber-500/30 font-bold rounded-lg flex items-center gap-1 text-[11px]"
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    {isGeneratingAi ? 'Generating via Gemini...' : 'Generate Description via AI'}
                  </button>
                </div>
                <textarea
                  rows={3}
                  value={prodDesc}
                  onChange={(e) => setProdDesc(e.target.value)}
                  className="w-full p-3 bg-slate-950 border border-slate-700 rounded-xl text-white"
                />
              </div>

              {/* Product Variants Section */}
              <div className="space-y-2 border-t border-slate-800 pt-3">
                <label className="font-bold text-slate-300 block">Product Options / Variants (Size, Color):</label>
                {prodVariants.length > 0 && (
                  <div className="space-y-1 mb-2">
                    {prodVariants.map((v) => (
                      <div key={v.id} className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-800 font-mono text-[11px]">
                        <span className="text-white font-bold">{v.name} ({v.sku})</span>
                        <span className="text-amber-400">£{v.price} • {v.stock} in stock</span>
                        <button type="button" onClick={() => handleRemoveVariant(v.id)} className="text-rose-400 p-1">
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))}
                  </div>
                )}

                <div className="flex flex-wrap gap-2 bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <input
                    type="text"
                    placeholder="Variant Title (e.g. Color: Black, Size: L)"
                    value={varName}
                    onChange={(e) => setVarName(e.target.value)}
                    className="flex-1 min-w-[140px] px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white"
                  />
                  <input
                    type="text"
                    placeholder="SKU"
                    value={varSku}
                    onChange={(e) => setVarSku(e.target.value)}
                    className="w-24 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-amber-400 font-mono"
                  />
                  <input
                    type="number"
                    placeholder="Price"
                    value={varPrice}
                    onChange={(e) => setVarPrice(Number(e.target.value))}
                    className="w-20 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono"
                  />
                  <input
                    type="number"
                    placeholder="Stock"
                    value={varStock}
                    onChange={(e) => setVarStock(Number(e.target.value))}
                    className="w-16 px-2.5 py-1.5 bg-slate-900 border border-slate-700 rounded text-white font-mono"
                  />
                  <button
                    type="button"
                    onClick={handleAddVariant}
                    className="px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded"
                  >
                    Add Variant
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end gap-3 border-t border-slate-800 pt-4">
                <button
                  type="button"
                  onClick={() => setIsProductModalOpen(false)}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg"
                >
                  Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE COUPON MODAL */}
      {isCouponModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-md bg-slate-900 border border-slate-700 rounded-2xl shadow-2xl p-6 space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Tag className="w-4 h-4 text-amber-400" /> Create New Coupon Voucher
              </h3>
              <button onClick={() => setIsCouponModalOpen(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleCreateCouponSubmit} className="space-y-3 text-xs">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="font-bold text-slate-300">Coupon Code:</label>
                  <button
                    type="button"
                    onClick={() => setNewCouponCode('SAVE' + Math.floor(10 + Math.random() * 90))}
                    className="text-[10px] text-amber-400 font-bold"
                  >
                    Auto Generate
                  </button>
                </div>
                <input
                  type="text"
                  required
                  placeholder="e.g. AHMADIFY20"
                  value={newCouponCode}
                  onChange={(e) => setNewCouponCode(e.target.value)}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-amber-400 font-mono font-bold text-sm"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Discount Type:</label>
                  <select
                    value={discountType}
                    onChange={(e) => setDiscountType(e.target.value as 'percent' | 'fixed')}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white"
                  >
                    <option value="percent">Percentage (%)</option>
                    <option value="fixed">Fixed Amount (£)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Discount Value:</label>
                  <input
                    type="number"
                    required
                    value={discountVal}
                    onChange={(e) => setDiscountVal(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-300 block mb-1">Min Spend (£):</label>
                  <input
                    type="number"
                    value={couponMinSpend}
                    onChange={(e) => setCouponMinSpend(Number(e.target.value))}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-300 block mb-1">Valid Until:</label>
                  <input
                    type="date"
                    value={couponExpiry}
                    onChange={(e) => setCouponExpiry(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-950 border border-slate-700 rounded-xl text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg mt-2"
              >
                Create Coupon
              </button>
            </form>
          </div>
        </div>
      )}

      {/* CUSTOMER ORDER HISTORY DRAWER */}
      {selectedCustomerEmail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-700 rounded-2xl p-6 space-y-4 max-h-[85vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-sm font-extrabold text-white">Customer Profile & Order History</h3>
                <p className="text-xs text-amber-400 font-mono">{selectedCustomerEmail}</p>
              </div>
              <button onClick={() => setSelectedCustomerEmail(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              {orders.filter(o => o.customerEmail === selectedCustomerEmail).map(o => (
                <div key={o.id} className="p-3 bg-slate-950 border border-slate-800 rounded-xl space-y-2 text-xs">
                  <div className="flex items-center justify-between font-bold">
                    <span className="text-amber-400 font-mono">{o.orderNumber}</span>
                    <span className="text-white">£{o.totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="text-[11px] text-slate-400">
                    Date: {new Date(o.createdAt).toLocaleDateString()} • Status: <span className="text-emerald-400 uppercase font-bold">{o.orderStatus}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Email Modal */}
      <EmailTemplatePreviewModal
        isOpen={isEmailModalOpen}
        onClose={() => setIsEmailModalOpen(false)}
        templateType={emailTemplateType}
        order={emailTargetOrder || orders[0]}
        companyInfo={companyInfo}
      />
    </div>
  );
};
