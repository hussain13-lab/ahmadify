import React, { useState } from 'react';
import { CJDropshippingApp } from './apps/CJDropshippingApp';
import { StripeApp } from './apps/StripeApp';
import { GoogleAnalyticsApp } from './apps/GoogleAnalyticsApp';
import { GenericPluginApp } from './apps/GenericPluginApp';
import {
  ShoppingBag,
  Package,
  Settings,
  Sparkles,
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  RefreshCw,
  Search,
  Filter,
  Plus,
  Download,
  Upload,
  Trash2,
  ExternalLink,
  Key,
  Globe,
  Activity,
  Terminal,
  FileText,
  Check,
  X,
  ChevronRight,
  ChevronDown,
  Layers,
  Zap,
  Code,
  Database,
  Lock,
  Sliders,
  Cpu,
  MessageSquare,
  Mail,
  Smartphone,
  Share2,
  DollarSign,
  Truck,
  BarChart3,
  Users,
  Wrench,
  Bot,
  Eye,
  Info,
  Server,
  Workflow
} from 'lucide-react';

export interface AppIntegration {
  id: string;
  name: string;
  category: string;
  description: string;
  iconUrl?: string;
  iconBg: string;
  iconText: string;
  version: string;
  developer: string;
  status: 'installed' | 'active' | 'disabled' | 'available' | 'error' | 'syncing';
  health: 'healthy' | 'warning' | 'error' | 'offline';
  installedDate?: string;
  lastUpdated?: string;
  permissions: string[];
  featured?: boolean;
  official?: boolean;
  rating: number;
  reviewsCount: number;
  config: {
    apiKey?: string;
    secretKey?: string;
    environment?: 'sandbox' | 'production' | 'live';
    webhookUrl?: string;
    autoSync?: boolean;
    syncIntervalMinutes?: number;
    customSettings?: Record<string, string>;
  };
  documentationUrl?: string;
  dependencies?: string[];
  compatibilityVersion?: string;
}

export interface AppLogEntry {
  id: string;
  appId: string;
  appName: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'sync' | 'install' | 'ai_action';
  message: string;
  details?: string;
}

const CATEGORIES = [
  'All Categories',
  'Payments',
  'Shipping',
  'Dropshipping',
  'Marketing',
  'SEO',
  'Accounting',
  'CRM',
  'Analytics',
  'Customer Support',
  'Live Chat',
  'Email Marketing',
  'SMS',
  'WhatsApp',
  'Social Media',
  'Marketplace Integrations',
  'Inventory',
  'AI',
  'Themes',
  'Security',
  'Automation',
  'Productivity',
  'Reports',
  'Developer Tools'
];

const INITIAL_APPS: AppIntegration[] = [
  {
    id: 'stripe',
    name: 'Stripe Payments',
    category: 'Payments',
    description: 'Accept credit cards, Apple Pay, Google Pay, and localized payment methods globally with instant payouts.',
    iconBg: 'bg-indigo-600',
    iconText: 'S',
    version: '3.4.1',
    developer: 'Stripe Official',
    status: 'active',
    health: 'healthy',
    installedDate: '2026-01-10',
    lastUpdated: '2026-07-28',
    permissions: ['Payments', 'Orders', 'Webhooks', 'Customer Vault'],
    featured: true,
    official: true,
    rating: 4.9,
    reviewsCount: 1240,
    config: {
      apiKey: 'pk_live_51M0...99xZ',
      secretKey: 'sk_live_51M0...k81Q',
      environment: 'production',
      webhookUrl: 'https://ahmadify.store/api/webhooks/stripe',
      autoSync: true,
      syncIntervalMinutes: 5
    },
    documentationUrl: 'https://stripe.com/docs',
    compatibilityVersion: 'v2026.1+'
  },
  {
    id: 'cj_dropshipping',
    name: 'CJ Dropshipping',
    category: 'Dropshipping',
    description: 'Auto-sync product sourcing, automated order fulfillment, global warehousing, and custom packaging.',
    iconBg: 'bg-amber-600',
    iconText: 'CJ',
    version: '2.1.0',
    developer: 'CJ Group',
    status: 'active',
    health: 'healthy',
    installedDate: '2026-02-14',
    lastUpdated: '2026-07-30',
    permissions: ['Products', 'Orders', 'Shipping', 'Inventory'],
    featured: true,
    official: true,
    rating: 4.8,
    reviewsCount: 890,
    config: {
      apiKey: 'cj_ak_88291048129038',
      secretKey: 'cj_sk_192830192830',
      environment: 'live',
      webhookUrl: 'https://ahmadify.store/api/webhooks/cj',
      autoSync: true,
      syncIntervalMinutes: 15
    },
    documentationUrl: 'https://cjdropshipping.com/api-docs'
  },
  {
    id: 'google_analytics',
    name: 'Google Analytics 4',
    category: 'Analytics',
    description: 'Real-time visitor tracking, conversion funnel diagnostics, user behavior heatmaps, and e-commerce tracking.',
    iconBg: 'bg-amber-500',
    iconText: 'GA4',
    version: '1.9.0',
    developer: 'Google LLC',
    status: 'active',
    health: 'healthy',
    installedDate: '2026-01-05',
    lastUpdated: '2026-07-15',
    permissions: ['Analytics', 'Customer Tracking', 'Traffic Logs'],
    featured: true,
    official: true,
    rating: 4.9,
    reviewsCount: 3100,
    config: {
      apiKey: 'G-AHMADIFY2026',
      environment: 'production',
      autoSync: true
    }
  },
  {
    id: 'paypal',
    name: 'PayPal Commerce',
    category: 'Payments',
    description: 'Offer Express Checkout, Pay in 4 installment billing, and international buyer protection.',
    iconBg: 'bg-blue-600',
    iconText: 'PP',
    version: '2.8.4',
    developer: 'PayPal Inc.',
    status: 'available',
    health: 'offline',
    permissions: ['Payments', 'Orders'],
    featured: true,
    official: true,
    rating: 4.7,
    reviewsCount: 1820,
    config: {
      apiKey: '',
      environment: 'sandbox'
    }
  },
  {
    id: 'klaviyo',
    name: 'Klaviyo Email & SMS',
    category: 'Email Marketing',
    description: 'Smart abandoned cart flows, automated welcome series, predictive customer lifetime value segmentation.',
    iconBg: 'bg-emerald-600',
    iconText: 'KL',
    version: '4.0.2',
    developer: 'Klaviyo',
    status: 'available',
    health: 'offline',
    permissions: ['Customers', 'Orders', 'Email Dispatch', 'Marketing Data'],
    featured: true,
    official: true,
    rating: 4.9,
    reviewsCount: 950,
    config: {
      apiKey: ''
    }
  },
  {
    id: 'whatsapp_business',
    name: 'WhatsApp Business API',
    category: 'WhatsApp',
    description: 'Automated order confirmations, tracking dispatch alerts, and live 2-way customer support chat on WhatsApp.',
    iconBg: 'bg-green-600',
    iconText: 'WA',
    version: '1.5.0',
    developer: 'Meta Inc.',
    status: 'available',
    health: 'offline',
    permissions: ['Orders', 'Customer Phone', 'Notifications', 'Messaging'],
    featured: true,
    official: true,
    rating: 4.8,
    reviewsCount: 740,
    config: {
      apiKey: ''
    }
  },
  {
    id: 'fedex_shipping',
    name: 'FedEx Express Shipping',
    category: 'Shipping',
    description: 'Live rate calculation at checkout, automated shipping label generation, and real-time package tracking.',
    iconBg: 'bg-purple-600',
    iconText: 'FX',
    version: '2.0.1',
    developer: 'FedEx Corp',
    status: 'available',
    health: 'offline',
    permissions: ['Shipping', 'Orders', 'Label Printing'],
    rating: 4.6,
    reviewsCount: 520,
    config: {}
  },
  {
    id: 'quickbooks',
    name: 'QuickBooks Online Sync',
    category: 'Accounting',
    description: 'Automated invoice syncing, tax calculation, payout reconciliation, and financial P&L reporting.',
    iconBg: 'bg-emerald-700',
    iconText: 'QB',
    version: '3.1.0',
    developer: 'Intuit',
    status: 'available',
    health: 'offline',
    permissions: ['Orders', 'Payments', 'Accounting Data', 'Taxes'],
    rating: 4.7,
    reviewsCount: 680,
    config: {}
  },
  {
    id: 'amazon_mws',
    name: 'Amazon Seller Central',
    category: 'Marketplace Integrations',
    description: 'Multi-channel fulfillment, inventory cross-sync, and automated Amazon order routing.',
    iconBg: 'bg-amber-700',
    iconText: 'AZ',
    version: '2.4.0',
    developer: 'Amazon Web Services',
    status: 'available',
    health: 'offline',
    permissions: ['Products', 'Inventory', 'Orders', 'Fulfillment'],
    featured: true,
    rating: 4.8,
    reviewsCount: 1400,
    config: {}
  },
  {
    id: 'openai_bos',
    name: 'OpenAI GPT-4o Commerce',
    category: 'AI',
    description: 'AI product description writing, intelligent support chat, sentiment analysis, and automated market research.',
    iconBg: 'bg-teal-600',
    iconText: 'AI',
    version: '1.0.0',
    developer: 'OpenAI',
    status: 'active',
    health: 'healthy',
    installedDate: '2026-03-01',
    lastUpdated: '2026-07-20',
    permissions: ['Products', 'AI Tools', 'Customer Messages', 'Analytics'],
    official: true,
    rating: 5.0,
    reviewsCount: 2200,
    config: {
      apiKey: 'sk-proj-8829...001',
      environment: 'production'
    }
  },
  {
    id: 'meta_pixel',
    name: 'Meta Pixel & Conversion API',
    category: 'Marketing',
    description: 'Track Facebook & Instagram ad conversions, build custom retargeting audiences, and optimize CPA.',
    iconBg: 'bg-blue-500',
    iconText: 'FB',
    version: '3.0.1',
    developer: 'Meta Inc.',
    status: 'available',
    health: 'offline',
    permissions: ['Analytics', 'Customer Tracking', 'Ad Conversions'],
    rating: 4.7,
    reviewsCount: 1100,
    config: {}
  },
  {
    id: 'dhl_express',
    name: 'DHL Express Global',
    category: 'Shipping',
    description: 'Worldwide door-to-door courier delivery, customs documentation generation, and priority clearance.',
    iconBg: 'bg-yellow-600',
    iconText: 'DHL',
    version: '2.2.0',
    developer: 'Deutsche Post DHL',
    status: 'available',
    health: 'offline',
    permissions: ['Shipping', 'Customs Docs', 'Label Printing'],
    rating: 4.8,
    reviewsCount: 430,
    config: {}
  },
  {
    id: 'aliexpress_dsers',
    name: 'AliExpress & DSers',
    category: 'Dropshipping',
    description: '1-Click product importer, bulk order placing, supplier price monitoring, and stock alerts.',
    iconBg: 'bg-orange-600',
    iconText: 'DS',
    version: '1.8.5',
    developer: 'DSers Official',
    status: 'available',
    health: 'offline',
    permissions: ['Products', 'Orders', 'Inventory'],
    rating: 4.6,
    reviewsCount: 980,
    config: {}
  },
  {
    id: 'hubspot_crm',
    name: 'HubSpot Commerce CRM',
    category: 'CRM',
    description: '360-degree customer profile view, deal pipeline tracking, ticket resolution, and lead scoring.',
    iconBg: 'bg-orange-500',
    iconText: 'HS',
    version: '2.1.2',
    developer: 'HubSpot',
    status: 'available',
    health: 'offline',
    permissions: ['Customers', 'Orders', 'Tickets'],
    rating: 4.8,
    reviewsCount: 610,
    config: {}
  },
  {
    id: 'tiktok_shop',
    name: 'TikTok Shop Integration',
    category: 'Social Media',
    description: 'Sync product catalog directly to TikTok live shopping, influencer affiliate links, and in-app checkout.',
    iconBg: 'bg-slate-900',
    iconText: 'TK',
    version: '1.2.0',
    developer: 'ByteDance',
    status: 'available',
    health: 'offline',
    permissions: ['Products', 'Orders', 'Inventory', 'Social Marketing'],
    featured: true,
    rating: 4.9,
    reviewsCount: 880,
    config: {}
  }
];

const INITIAL_LOGS: AppLogEntry[] = [
  {
    id: 'log-101',
    appId: 'stripe',
    appName: 'Stripe Payments',
    timestamp: '2026-08-02 14:10:02',
    type: 'sync',
    message: 'Webhook received: payment_intent.succeeded ($149.00 USD). Order #ORD-8821 fulfilled.',
    details: 'Status 200 OK • Response time 120ms'
  },
  {
    id: 'log-102',
    appId: 'cj_dropshipping',
    appName: 'CJ Dropshipping',
    timestamp: '2026-08-02 13:45:18',
    type: 'info',
    message: 'Automated inventory sync completed. 14 items updated across global warehouses.',
    details: 'Sync status: SUCCESS'
  },
  {
    id: 'log-103',
    appId: 'openai_bos',
    appName: 'OpenAI GPT-4o Commerce',
    timestamp: '2026-08-02 12:30:10',
    type: 'ai_action',
    message: 'AI Assistant auto-configured app permissions and tested live endpoint.',
    details: 'Latency: 280ms • Token consumption: 142 tokens'
  }
];

export const AppStoreManager: React.FC<{ companyInfo?: any }> = ({ companyInfo }) => {
  const [apps, setApps] = useState<AppIntegration[]>(INITIAL_APPS);
  const [logs, setLogs] = useState<AppLogEntry[]>(INITIAL_LOGS);
  const [activeTab, setActiveTab] = useState<'marketplace' | 'installed' | 'ai_installer' | 'custom_app' | 'sdk' | 'logs' | 'health'>('marketplace');
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedApp, setSelectedApp] = useState<AppIntegration | null>(null);
  
  // Opened App Operational View
  const [openedApp, setOpenedApp] = useState<AppIntegration | null>(null);
  const [actionModalApp, setActionModalApp] = useState<{
    app: AppIntegration;
    mode: 'docs' | 'health' | 'repair' | 'update' | 'permissions';
  } | null>(null);

  // Direct handlers for sub-app operational dashboards
  const handleSaveAppConfigDirect = (updatedApp: AppIntegration) => {
    setApps((prev) => prev.map((a) => (a.id === updatedApp.id ? updatedApp : a)));
  };

  const handleAddLogDirect = (newLog: AppLogEntry) => {
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleUpdateApp = (appToUpdate: AppIntegration) => {
    const today = new Date().toISOString().split('T')[0];
    const versionParts = appToUpdate.version.split('.');
    const patch = parseInt(versionParts[2] || '0', 10) + 1;
    const newVersion = `${versionParts[0] || '1'}.${versionParts[1] || '0'}.${patch}`;

    setApps((prev) =>
      prev.map((a) =>
        a.id === appToUpdate.id
          ? {
              ...a,
              version: newVersion,
              lastUpdated: today,
              health: 'healthy',
              status: 'active'
            }
          : a
      )
    );

    const newLog: AppLogEntry = {
      id: `log-${Date.now()}`,
      appId: appToUpdate.id,
      appName: appToUpdate.name,
      timestamp: new Date().toLocaleString(),
      type: 'info',
      message: `Updated "${appToUpdate.name}" to latest patch release v${newVersion}. Health re-verified.`,
      details: 'HTTP 200 OK • Dependencies reconciled'
    };
    setLogs((prev) => [newLog, ...prev]);
    alert(`"${appToUpdate.name}" has been updated to v${newVersion}!`);
  };

  const handleRepairApp = (appToRepair: AppIntegration) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === appToRepair.id
          ? { ...a, status: 'active', health: 'healthy' }
          : a
      )
    );

    const newLog: AppLogEntry = {
      id: `log-${Date.now()}`,
      appId: appToRepair.id,
      appName: appToRepair.name,
      timestamp: new Date().toLocaleString(),
      type: 'sync',
      message: `Automated diagnostic repair executed for "${appToRepair.name}". Webhooks re-bound & credentials validated.`,
      details: 'Status 200 OK • Latency 110ms'
    };
    setLogs((prev) => [newLog, ...prev]);
    alert(`Repair diagnostics completed for "${appToRepair.name}". All systems normal.`);
  };

  // Modals
  const [installingApp, setInstallingApp] = useState<AppIntegration | null>(null);
  const [configuringApp, setConfiguringApp] = useState<AppIntegration | null>(null);
  const [viewingAppLogs, setViewingAppLogs] = useState<AppIntegration | null>(null);

  // AI Installer state
  const [aiPromptInput, setAiPromptInput] = useState<string>('');
  const [aiIsProcessing, setAiIsProcessing] = useState<boolean>(false);
  const [aiLogMessages, setAiLogMessages] = useState<string[]>([]);

  // Custom App Upload state
  const [customAppName, setCustomAppName] = useState<string>('');
  const [customAppCategory, setCustomAppCategory] = useState<string>('Developer Tools');
  const [customAppZipName, setCustomAppZipName] = useState<string>('');
  const [customAppRepoUrl, setCustomAppRepoUrl] = useState<string>('');
  const [customAppManifestJson, setCustomAppManifestJson] = useState<string>(`{
  "name": "My Custom Order Notifier",
  "version": "1.0.0",
  "developer": "In-House Dev",
  "permissions": ["Orders", "Webhooks"],
  "main": "index.js"
}`);

  // Filter apps
  const filteredApps = apps.filter((app) => {
    const matchesSearch =
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.developer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      selectedCategory === 'All Categories' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const installedApps = apps.filter((a) => a.status === 'active' || a.status === 'installed' || a.status === 'error' || a.status === 'disabled');

  // App Install / Uninstall / Enable / Disable Handlers
  const handleConfirmInstall = (appToInstall: AppIntegration) => {
    const today = new Date().toISOString().split('T')[0];
    setApps((prev) =>
      prev.map((a) =>
        a.id === appToInstall.id
          ? { ...a, status: 'active', health: 'healthy', installedDate: today, lastUpdated: today }
          : a
      )
    );

    const newLog: AppLogEntry = {
      id: `log-${Date.now()}`,
      appId: appToInstall.id,
      appName: appToInstall.name,
      timestamp: new Date().toLocaleString(),
      type: 'install',
      message: `App "${appToInstall.name}" installed successfully with approved owner permissions (${appToInstall.permissions.join(', ')}).`,
      details: `Installed version v${appToInstall.version} by Owner`
    };
    setLogs((prev) => [newLog, ...prev]);
    setInstallingApp(null);
  };

  const handleToggleAppStatus = (appId: string) => {
    setApps((prev) =>
      prev.map((a) => {
        if (a.id === appId) {
          const nextStatus = a.status === 'active' ? 'disabled' : 'active';
          return { ...a, status: nextStatus, health: nextStatus === 'active' ? 'healthy' : 'offline' };
        }
        return a;
      })
    );
  };

  const handleUninstallApp = (appToUninstall: AppIntegration) => {
    setApps((prev) =>
      prev.map((a) =>
        a.id === appToUninstall.id
          ? { ...a, status: 'available', health: 'offline', config: {} }
          : a
      )
    );
    const newLog: AppLogEntry = {
      id: `log-${Date.now()}`,
      appId: appToUninstall.id,
      appName: appToUninstall.name,
      timestamp: new Date().toLocaleString(),
      type: 'warning',
      message: `App "${appToUninstall.name}" uninstalled and configuration cleared by Owner.`
    };
    setLogs((prev) => [newLog, ...prev]);
  };

  const handleSaveAppConfig = (e: React.FormEvent) => {
    e.preventDefault();
    if (!configuringApp) return;

    setApps((prev) =>
      prev.map((a) => (a.id === configuringApp.id ? configuringApp : a))
    );

    const newLog: AppLogEntry = {
      id: `log-${Date.now()}`,
      appId: configuringApp.id,
      appName: configuringApp.name,
      timestamp: new Date().toLocaleString(),
      type: 'info',
      message: `Updated environment configuration & API keys for ${configuringApp.name}.`,
      details: `Env: ${configuringApp.config.environment || 'production'}`
    };
    setLogs((prev) => [newLog, ...prev]);
    setConfiguringApp(null);
  };

  // AI Installer Simulator
  const handleRunAiInstaller = (promptText?: string) => {
    const textToRun = promptText || aiPromptInput;
    if (!textToRun.trim()) return;

    setAiIsProcessing(true);
    setAiLogMessages(['Analyzing AI command intent...', `Search catalog for matching integration: "${textToRun}"`]);

    setTimeout(() => {
      // Find matching app
      const matched = apps.find((a) => textToRun.toLowerCase().includes(a.name.toLowerCase().split(' ')[0]) || textToRun.toLowerCase().includes(a.category.toLowerCase()));
      const targetApp = matched || apps.find((a) => a.id === 'stripe') || apps[0];

      setAiLogMessages((prev) => [
        ...prev,
        `Matched integration: [${targetApp.name}] (Category: ${targetApp.category})`,
        `Checking dependency tree & compatibility matrix (v${targetApp.version})...`,
        `Verifying security permissions required: [${targetApp.permissions.join(', ')}]`,
        `Provisioning API route proxy and environment keys...`,
        `Executing health check benchmark...`
      ]);

      setTimeout(() => {
        handleConfirmInstall(targetApp);
        setAiLogMessages((prev) => [
          ...prev,
          `SUCCESS: ${targetApp.name} has been installed, configured, and verified successfully!`
        ]);
        setAiIsProcessing(false);
      }, 1200);
    }, 1000);
  };

  // Handle Custom App Creation
  const handleInstallCustomApp = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `custom_${Date.now()}`;
    const name = customAppName || 'In-House Custom Plugin';
    const newApp: AppIntegration = {
      id: newId,
      name,
      category: customAppCategory,
      description: customAppZipName
        ? `Installed from custom ZIP package (${customAppZipName}).`
        : customAppRepoUrl
        ? `Linked to GitHub repository (${customAppRepoUrl}).`
        : 'In-house custom plugin installed via JSON manifest.',
      iconBg: 'bg-indigo-900',
      iconText: 'CP',
      version: '1.0.0-custom',
      developer: 'Ahmadify In-House Dev',
      status: 'active',
      health: 'healthy',
      installedDate: new Date().toISOString().split('T')[0],
      permissions: ['Custom API', 'Webhooks'],
      rating: 5.0,
      reviewsCount: 1,
      config: {
        autoSync: true
      }
    };

    setApps((prev) => [newApp, ...prev]);
    const newLog: AppLogEntry = {
      id: `log-${Date.now()}`,
      appId: newId,
      appName: name,
      timestamp: new Date().toLocaleString(),
      type: 'install',
      message: `Custom Plugin "${name}" deployed and compiled into runtime container successfully.`
    };
    setLogs((prev) => [newLog, ...prev]);
    setCustomAppName('');
    setCustomAppZipName('');
    setCustomAppRepoUrl('');
    alert(`Custom Plugin "${name}" installed successfully!`);
    setActiveTab('installed');
  };

  if (openedApp) {
    if (openedApp.id === 'cj_dropshipping' || openedApp.id === 'cj') {
      return (
        <CJDropshippingApp
          app={openedApp}
          onBack={() => setOpenedApp(null)}
          onUpdateConfig={handleSaveAppConfigDirect}
          onAddLog={handleAddLogDirect}
        />
      );
    }
    if (openedApp.id === 'stripe') {
      return (
        <StripeApp
          app={openedApp}
          onBack={() => setOpenedApp(null)}
          onUpdateConfig={handleSaveAppConfigDirect}
          onAddLog={handleAddLogDirect}
        />
      );
    }
    if (openedApp.id === 'google_analytics' || openedApp.id === 'google-analytics') {
      return (
        <GoogleAnalyticsApp
          app={openedApp}
          onBack={() => setOpenedApp(null)}
          onUpdateConfig={handleSaveAppConfigDirect}
          onAddLog={handleAddLogDirect}
        />
      );
    }
    return (
      <GenericPluginApp
        app={openedApp}
        onBack={() => setOpenedApp(null)}
        onUpdateConfig={handleSaveAppConfigDirect}
        onAddLog={handleAddLogDirect}
      />
    );
  }

  return (
    <div className="space-y-6 font-sans text-slate-100">
      {/* Top Banner Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-950 to-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-2xl bg-amber-500 text-slate-950 flex items-center justify-center font-black shadow-xl shadow-amber-500/20 shrink-0">
              <Layers className="w-7 h-7" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-black text-white tracking-wide">
                  Apps & Integrations Studio
                </h1>
                <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/40 text-amber-300 font-extrabold text-[11px]">
                  Enterprise App Store
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1 max-w-xl">
                Install, configure, and automate 40+ modular apps, payment gateways, dropshipping suppliers, and AI agents seamlessly into the Ahmadify Commerce engine.
              </p>
            </div>
          </div>

          {/* Quick Metrics Bar */}
          <div className="flex items-center gap-3">
            <div className="bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Installed Apps</span>
              <span className="text-lg font-black text-amber-400">{installedApps.length}</span>
            </div>
            <div className="bg-slate-900/80 border border-slate-800 px-4 py-2.5 rounded-2xl text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Available</span>
              <span className="text-lg font-black text-emerald-400">{apps.length}</span>
            </div>
            <button
              onClick={() => setActiveTab('ai_installer')}
              className="px-4 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-2xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>AI App Installer</span>
            </button>
          </div>
        </div>

        {/* Sub Navigation Bar */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800/80 overflow-x-auto scrollbar-none text-xs font-extrabold">
          <button
            onClick={() => setActiveTab('marketplace')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'marketplace'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            <span>App Marketplace</span>
          </button>

          <button
            onClick={() => setActiveTab('installed')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'installed'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Package className="w-4 h-4" />
            <span>Installed Apps ({installedApps.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('ai_installer')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'ai_installer'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-amber-400 border border-amber-500/30 hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4 animate-pulse" />
            <span>AI Installer Assistant</span>
          </button>

          <button
            onClick={() => setActiveTab('health')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'health'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Activity className="w-4 h-4" />
            <span>App Health Monitoring</span>
          </button>

          <button
            onClick={() => setActiveTab('logs')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'logs'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Terminal className="w-4 h-4" />
            <span>Audit & Sync Logs</span>
          </button>

          <button
            onClick={() => setActiveTab('custom_app')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'custom_app'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Upload className="w-4 h-4" />
            <span>Install Custom Plugin</span>
          </button>

          <button
            onClick={() => setActiveTab('sdk')}
            className={`px-4 py-2 rounded-xl transition-all flex items-center gap-2 shrink-0 ${
              activeTab === 'sdk'
                ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/20'
                : 'bg-slate-900 text-slate-300 hover:text-white hover:bg-slate-800'
            }`}
          >
            <Code className="w-4 h-4" />
            <span>Plugin Developer SDK</span>
          </button>
        </div>
      </div>

      {/* TABS CONTENT SECTION */}

      {/* TAB 1: APP MARKETPLACE */}
      {activeTab === 'marketplace' && (
        <div className="space-y-6">
          {/* Search & Category Filter Header */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3.5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search 40+ integrations (e.g. Stripe, CJ Dropshipping, PayPal, GA4)..."
                className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-3 text-slate-400 hover:text-white"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Category Select Filter */}
            <div className="flex items-center gap-2 overflow-x-auto">
              <Filter className="w-4 h-4 text-amber-400 shrink-0" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="bg-slate-950 border border-slate-800 text-xs font-bold text-amber-400 rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500 cursor-pointer"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Category Chips Scrollbar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-extrabold whitespace-nowrap transition-all border ${
                  selectedCategory === cat
                    ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-md shadow-amber-500/20'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:border-slate-700 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Marketplace Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredApps.map((app) => {
              const isInstalled = app.status === 'active' || app.status === 'installed';
              return (
                <div
                  key={app.id}
                  className="bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-2xl p-5 shadow-xl transition-all hover:scale-[1.01] flex flex-col justify-between space-y-4 group"
                >
                  <div>
                    {/* Card Top Header */}
                    <div className="flex items-start justify-between gap-3 mb-3">
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-12 h-12 rounded-2xl ${app.iconBg} text-white font-black text-lg flex items-center justify-center shadow-lg shrink-0`}
                        >
                          {app.iconText}
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <h3 className="font-extrabold text-sm text-white group-hover:text-amber-400 transition-colors">
                              {app.name}
                            </h3>
                            {app.official && (
                              <span title="Official Verified Integration" className="text-amber-400">
                                <ShieldCheck className="w-4 h-4 shrink-0" />
                              </span>
                            )}
                          </div>
                          <span className="text-[10px] text-slate-400 font-bold block">
                            by {app.developer} • v{app.version}
                          </span>
                        </div>
                      </div>

                      {/* Status Badge */}
                      <span
                        className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full border shrink-0 ${
                          isInstalled
                            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                            : 'bg-slate-800 text-slate-400 border-slate-700'
                        }`}
                      >
                        {isInstalled ? 'Installed' : 'Available'}
                      </span>
                    </div>

                    {/* Category & Rating */}
                    <div className="flex items-center justify-between text-[11px] mb-2">
                      <span className="bg-slate-950 text-slate-300 px-2 py-0.5 rounded-lg border border-slate-800 font-bold">
                        {app.category}
                      </span>
                      <span className="text-amber-400 font-extrabold flex items-center gap-1">
                        ★ {app.rating} ({app.reviewsCount})
                      </span>
                    </div>

                    {/* Description */}
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {app.description}
                    </p>

                    {/* Permissions Badges */}
                    <div className="mt-3 flex flex-wrap gap-1">
                      {app.permissions.slice(0, 3).map((perm) => (
                        <span
                          key={perm}
                          className="text-[9px] font-semibold bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800/80"
                        >
                          {perm}
                        </span>
                      ))}
                      {app.permissions.length > 3 && (
                        <span className="text-[9px] font-bold text-slate-500 px-1">
                          +{app.permissions.length - 3} more
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons Footer */}
                  <div className="pt-3 border-t border-slate-800/80 space-y-2">
                    {isInstalled ? (
                      <>
                        <button
                          onClick={() => setOpenedApp(app)}
                          className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center justify-center gap-1.5"
                        >
                          <Zap className="w-3.5 h-3.5" />
                          <span>Open Dashboard</span>
                        </button>
                        <div className="grid grid-cols-3 gap-1.5 text-[11px] font-bold">
                          <button
                            onClick={() => setConfiguringApp(app)}
                            className="py-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg flex items-center justify-center gap-1"
                            title="Configure Settings"
                          >
                            <Settings className="w-3 h-3" />
                            <span>Config</span>
                          </button>
                          <button
                            onClick={() => handleUpdateApp(app)}
                            className="py-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg flex items-center justify-center gap-1"
                            title="Update Plugin"
                          >
                            <RefreshCw className="w-3 h-3" />
                            <span>Update</span>
                          </button>
                          <button
                            onClick={() => handleToggleAppStatus(app.id)}
                            className={`py-1.5 rounded-lg border flex items-center justify-center ${
                              app.status === 'active'
                                ? 'bg-rose-500/10 text-rose-400 border-rose-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}
                          >
                            {app.status === 'active' ? 'Disable' : 'Enable'}
                          </button>
                        </div>
                      </>
                    ) : (
                      <button
                        onClick={() => setInstallingApp(app)}
                        className="w-full py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md shadow-amber-500/20 transition-all flex items-center justify-center gap-1.5"
                      >
                        <Download className="w-3.5 h-3.5" />
                        <span>Install App</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: INSTALLED APPS */}
      {activeTab === 'installed' && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center justify-between">
            <div>
              <h2 className="text-base font-extrabold text-white">Active Installed Plugins & Services</h2>
              <p className="text-xs text-slate-400">
                Manage live configurations, permissions, and status of installed platform apps.
              </p>
            </div>
            <button
              onClick={() => setActiveTab('marketplace')}
              className="px-3.5 py-2 bg-amber-500 text-slate-950 font-extrabold text-xs rounded-xl flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" />
              <span>Browse App Store</span>
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 text-slate-400 uppercase tracking-wider text-[10px] font-extrabold">
                  <tr>
                    <th className="px-4 py-3">App Integration</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Version & Dev</th>
                    <th className="px-4 py-3">Health Status</th>
                    <th className="px-4 py-3">Permissions</th>
                    <th className="px-4 py-3 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800 text-slate-300 font-semibold">
                  {installedApps.map((app) => (
                    <tr key={app.id} className="hover:bg-slate-800/50 transition-colors">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          <div
                            className={`w-9 h-9 rounded-xl ${app.iconBg} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-md`}
                          >
                            {app.iconText}
                          </div>
                          <div>
                            <div className="font-extrabold text-white flex items-center gap-1">
                              {app.name}
                              {app.official && <ShieldCheck className="w-3.5 h-3.5 text-amber-400" />}
                            </div>
                            <span className="text-[10px] text-slate-400">
                              Installed: {app.installedDate || '2026-01-01'}
                            </span>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 font-bold text-[11px]">
                          {app.category}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-[11px]">
                        <div className="font-bold text-white">v{app.version}</div>
                        <div className="text-[10px] text-slate-400">{app.developer}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <span className={`w-2.5 h-2.5 rounded-full ${
                            app.status === 'active' ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500'
                          }`} />
                          <span className={`font-extrabold text-[11px] capitalize ${
                            app.status === 'active' ? 'text-emerald-400' : 'text-slate-400'
                          }`}>
                            {app.status}
                          </span>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex flex-wrap gap-1 max-w-xs">
                          {app.permissions.map((p) => (
                            <span
                              key={p}
                              className="text-[9px] bg-slate-950 text-slate-400 px-2 py-0.5 rounded border border-slate-800"
                            >
                              {p}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          <button
                            onClick={() => setOpenedApp(app)}
                            className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-lg transition-all flex items-center gap-1 shadow-sm"
                            title="Open Application Dashboard"
                          >
                            <Zap className="w-3.5 h-3.5" />
                            <span>Open</span>
                          </button>
                          <button
                            onClick={() => setConfiguringApp(app)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-lg transition-colors"
                            title="Configure Settings & API Keys"
                          >
                            <Settings className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleUpdateApp(app)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-emerald-400 rounded-lg transition-colors"
                            title="Update Application"
                          >
                            <RefreshCw className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleRepairApp(app)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-indigo-400 rounded-lg transition-colors"
                            title="Repair Diagnostics"
                          >
                            <Wrench className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setViewingAppLogs(app)}
                            className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors"
                            title="View App Audit Logs"
                          >
                            <Terminal className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleAppStatus(app.id)}
                            className={`px-2.5 py-1.5 font-bold text-[11px] rounded-lg transition-all border ${
                              app.status === 'active'
                                ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                                : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30'
                            }`}
                          >
                            {app.status === 'active' ? 'Disable' : 'Enable'}
                          </button>
                          <button
                            onClick={() => handleUninstallApp(app)}
                            className="p-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 rounded-lg transition-colors border border-rose-500/30"
                            title="Uninstall App"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: AI APP INSTALLER ASSISTANT */}
      {activeTab === 'ai_installer' && (
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
            <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/40">
              <Sparkles className="w-6 h-6 animate-spin" style={{ animationDuration: '6s' }} />
            </div>
            <div>
              <h2 className="text-lg font-black text-white flex items-center gap-2">
                Autonomous AI App Installer & Configurator
              </h2>
              <p className="text-xs text-slate-400">
                Command the AI agent to install, grant permissions, wire API endpoints, and test connections automatically.
              </p>
            </div>
          </div>

          {/* Quick Command Suggestions */}
          <div>
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Quick One-Click Commands:
            </label>
            <div className="flex flex-wrap gap-2 text-xs">
              {[
                'Install Stripe.',
                'Connect CJ Dropshipping.',
                'Install Google Analytics.',
                'Add PayPal Commerce.',
                'Install WhatsApp Business.',
                'Connect Amazon Seller Central.'
              ].map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => {
                    setAiPromptInput(cmd);
                    handleRunAiInstaller(cmd);
                  }}
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 text-amber-400 font-bold rounded-xl border border-slate-800 hover:border-amber-500/40 transition-all flex items-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5 text-amber-400" />
                  <span>"{cmd}"</span>
                </button>
              ))}
            </div>
          </div>

          {/* Command Prompt Box */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-300 block">
              Ask AI Agent to Install & Wire Up Any App Integration:
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                placeholder="e.g. 'Install Stripe Payments and generate webhooks for live checkout'"
                className="flex-1 px-4 py-3 bg-slate-950 border border-slate-700 rounded-2xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 font-mono"
              />
              <button
                onClick={() => handleRunAiInstaller()}
                disabled={aiIsProcessing || !aiPromptInput.trim()}
                className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-2xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 disabled:opacity-50"
              >
                {aiIsProcessing ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Executing...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Execute AI Install</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* AI Terminal Output */}
          {aiLogMessages.length > 0 && (
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-emerald-400 space-y-2 max-h-60 overflow-y-auto shadow-inner">
              <div className="flex items-center justify-between text-[10px] text-slate-500 border-b border-slate-800 pb-2">
                <span>AI Execution Terminal Logs</span>
                <span>Status: {aiIsProcessing ? 'Running' : 'Complete'}</span>
              </div>
              {aiLogMessages.map((msg, i) => (
                <div key={i} className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold">&gt;</span>
                  <span className={msg.startsWith('SUCCESS') ? 'text-amber-300 font-bold' : ''}>{msg}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* TAB 4: APP HEALTH & MONITORING */}
      {activeTab === 'health' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-emerald-500/20 text-emerald-400 rounded-2xl border border-emerald-500/30">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block">Connected Services</span>
                <span className="text-xl font-black text-white">
                  {apps.filter((a) => a.health === 'healthy').length} Active
                </span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-amber-500/20 text-amber-400 rounded-2xl border border-amber-500/30">
                <Activity className="w-6 h-6 animate-pulse" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block">Auto Sync Status</span>
                <span className="text-xl font-black text-amber-400">Normal (100% SLA)</span>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex items-center gap-4">
              <div className="p-3 bg-blue-500/20 text-blue-400 rounded-2xl border border-blue-500/30">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase block">Security Rate Limits</span>
                <span className="text-xl font-black text-blue-400">0 Throttle Alerts</span>
              </div>
            </div>
          </div>

          {/* Health Grid */}
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Activity className="w-4 h-4 text-emerald-400" />
              Live Health Diagnostics Matrix
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {installedApps.map((app) => (
                <div key={app.id} className="bg-slate-950 border border-slate-800 rounded-xl p-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg ${app.iconBg} text-white font-bold text-xs flex items-center justify-center`}>
                      {app.iconText}
                    </div>
                    <div>
                      <div className="font-bold text-xs text-white">{app.name}</div>
                      <div className="text-[10px] text-slate-400">Endpoint: {app.config.webhookUrl || 'API Gateway'}</div>
                    </div>
                  </div>

                  <div className="text-right space-y-1">
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-extrabold">
                      100% Operational
                    </span>
                    <span className="text-[10px] text-slate-500 block">Ping: 42ms</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: AUDIT LOGS */}
      {activeTab === 'logs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Terminal className="w-4 h-4 text-amber-400" />
              App Integration Audit & Webhook Event Logs
            </h3>
            <button
              onClick={() => setLogs([])}
              className="text-xs text-rose-400 hover:underline font-bold"
            >
              Clear Log History
            </button>
          </div>

          <div className="space-y-2">
            {logs.map((log) => (
              <div
                key={log.id}
                className="bg-slate-950 border border-slate-800/80 rounded-xl p-3 flex flex-col md:flex-row md:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-start gap-3">
                  <span className="text-slate-500 text-[10px] shrink-0 mt-0.5">{log.timestamp}</span>
                  <div>
                    <span className="font-bold text-amber-400 mr-2">[{log.appName}]</span>
                    <span className="text-slate-200">{log.message}</span>
                    {log.details && (
                      <div className="text-[11px] text-slate-400 mt-1">{log.details}</div>
                    )}
                  </div>
                </div>
                <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-slate-400 shrink-0 self-start md:self-auto">
                  {log.type}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 6: INSTALL CUSTOM PLUGIN */}
      {activeTab === 'custom_app' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <Upload className="w-5 h-5 text-amber-400" />
              Install Custom Plugin or Third-Party Integration
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Upload custom `.zip` plugin bundles, link private GitHub repositories, or supply a direct plugin JSON manifest.
            </p>
          </div>

          <form onSubmit={handleInstallCustomApp} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Plugin / Integration Name *
                </label>
                <input
                  type="text"
                  required
                  value={customAppName}
                  onChange={(e) => setCustomAppName(e.target.value)}
                  placeholder="e.g. Custom Shipping Courier API"
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Plugin Category
                </label>
                <select
                  value={customAppCategory}
                  onChange={(e) => setCustomAppCategory(e.target.value)}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                >
                  {CATEGORIES.filter((c) => c !== 'All Categories').map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Option A: ZIP Upload */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <label className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                <FileText className="w-4 h-4" /> Option A: Upload Plugin ZIP Archive
              </label>
              <input
                type="file"
                accept=".zip"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    setCustomAppZipName(e.target.files[0].name);
                  }
                }}
                className="block w-full text-xs text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-xl file:border-0 file:text-xs file:font-extrabold file:bg-slate-800 file:text-amber-400 hover:file:bg-slate-700 cursor-pointer"
              />
              {customAppZipName && (
                <p className="text-[11px] text-emerald-400 font-bold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Bundle selected: {customAppZipName}
                </p>
              )}
            </div>

            {/* Option B: GitHub Repo URL */}
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-2xl space-y-2">
              <label className="text-xs font-extrabold text-amber-400 flex items-center gap-1.5">
                <Globe className="w-4 h-4" /> Option B: GitHub Repository URL
              </label>
              <input
                type="url"
                value={customAppRepoUrl}
                onChange={(e) => setCustomAppRepoUrl(e.target.value)}
                placeholder="https://github.com/organization/plugin-repo"
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>

            {/* Option C: JSON Manifest */}
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Plugin Manifest JSON Configuration:
              </label>
              <textarea
                rows={5}
                value={customAppManifestJson}
                onChange={(e) => setCustomAppManifestJson(e.target.value)}
                className="w-full p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400 focus:outline-none focus:border-amber-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Compile & Deploy Custom Plugin</span>
            </button>
          </form>
        </div>
      )}

      {/* TAB 7: DEVELOPER SDK */}
      {activeTab === 'sdk' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-base font-black text-white flex items-center gap-2">
              <Code className="w-5 h-5 text-amber-400" />
              Ahmadify Plugin Development SDK & API Webhook Bench
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Build custom apps that register admin UI views, dashboard widgets, AI tools, and background sync jobs.
            </p>
          </div>

          <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-slate-300 space-y-3">
            <div className="text-amber-400 font-bold">// Sample Plugin Entry Point (plugin.ts)</div>
            <pre className="text-slate-400 text-[11px] overflow-x-auto p-3 bg-slate-900 rounded-lg">
{`import { createAhmadifyPlugin } from '@ahmadify/plugin-sdk';

export default createAhmadifyPlugin({
  id: 'my-custom-analytics',
  name: 'Custom Analytics Widget',
  version: '1.0.0',
  permissions: ['Orders', 'Analytics'],
  
  onInstall: async (context) => {
    console.log('Plugin installed for store:', context.companyInfo.domain);
  },
  
  onOrderCreated: async (order, api) => {
    await api.post('https://api.my-analytics.com/events', { orderId: order.id });
  }
});`}
            </pre>
          </div>
        </div>
      )}

      {/* INSTALL CONFIRMATION PERMISSIONS MODAL */}
      {installingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-lg bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className={`w-12 h-12 rounded-2xl ${installingApp.iconBg} text-white font-black text-xl flex items-center justify-center shadow-lg`}>
                  {installingApp.iconText}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">{installingApp.name}</h3>
                  <span className="text-xs text-slate-400">by {installingApp.developer} • v{installingApp.version}</span>
                </div>
              </div>
              <button
                onClick={() => setInstallingApp(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
              {installingApp.description}
            </p>

            {/* Requested Security Permissions */}
            <div>
              <label className="text-xs font-bold text-amber-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4" /> Required Security & API Permissions:
              </label>
              <div className="bg-slate-950 border border-slate-800 rounded-xl p-3 space-y-2">
                {installingApp.permissions.map((perm) => (
                  <div key={perm} className="flex items-center gap-2 text-xs text-slate-200">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>Access & Manage Store <strong className="text-white">{perm}</strong></span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
              <button
                onClick={() => setInstallingApp(null)}
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all"
              >
                Cancel
              </button>
              <button
                onClick={() => handleConfirmInstall(installingApp)}
                className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>Approve Permissions & Install</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* CONFIGURE APP MODAL */}
      {configuringApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-5 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl ${configuringApp.iconBg} text-white font-black text-sm flex items-center justify-center shadow-lg`}>
                  {configuringApp.iconText}
                </div>
                <div>
                  <h3 className="font-extrabold text-base text-white">{configuringApp.name} Configuration</h3>
                  <span className="text-xs text-slate-400">Environment & API Keys</span>
                </div>
              </div>
              <button
                onClick={() => setConfiguringApp(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveAppConfig} className="space-y-4">
              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  API Key / Public Key:
                </label>
                <input
                  type="text"
                  value={configuringApp.config.apiKey || ''}
                  onChange={(e) =>
                    setConfiguringApp({
                      ...configuringApp,
                      config: { ...configuringApp.config, apiKey: e.target.value }
                    })
                  }
                  placeholder="e.g. pk_live_..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Secret Key / Auth Token:
                </label>
                <input
                  type="password"
                  value={configuringApp.config.secretKey || ''}
                  onChange={(e) =>
                    setConfiguringApp({
                      ...configuringApp,
                      config: { ...configuringApp.config, secretKey: e.target.value }
                    })
                  }
                  placeholder="e.g. sk_live_..."
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 font-mono"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Environment:
                  </label>
                  <select
                    value={configuringApp.config.environment || 'production'}
                    onChange={(e) =>
                      setConfiguringApp({
                        ...configuringApp,
                        config: {
                          ...configuringApp.config,
                          environment: e.target.value as any
                        }
                      })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-400 font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value="production">Production / Live</option>
                    <option value="sandbox">Sandbox / Test Mode</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-bold text-slate-300 block mb-1">
                    Auto-Sync Frequency:
                  </label>
                  <select
                    value={configuringApp.config.syncIntervalMinutes || 15}
                    onChange={(e) =>
                      setConfiguringApp({
                        ...configuringApp,
                        config: {
                          ...configuringApp.config,
                          syncIntervalMinutes: Number(e.target.value)
                        }
                      })
                    }
                    className="w-full px-3 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-300 font-bold focus:outline-none focus:border-amber-500"
                  >
                    <option value={5}>Every 5 Minutes</option>
                    <option value={15}>Every 15 Minutes</option>
                    <option value={60}>Every Hour</option>
                    <option value={1440}>Once Daily</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-300 block mb-1">
                  Webhook Endpoint URL:
                </label>
                <input
                  type="text"
                  readOnly
                  value={`https://ahmadify.store/api/webhooks/${configuringApp.id}`}
                  className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 text-slate-400 rounded-xl text-xs font-mono select-all"
                />
              </div>

              <div className="pt-3 border-t border-slate-800 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setConfiguringApp(null)}
                  className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-lg shadow-emerald-500/20 transition-all flex items-center gap-2"
                >
                  <Check className="w-4 h-4" />
                  <span>Save App Settings</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* VIEW APP LOGS MODAL */}
      {viewingAppLogs && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md font-sans">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-6 space-y-4 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-3">
                <Terminal className="w-5 h-5 text-amber-400" />
                <h3 className="font-extrabold text-base text-white">
                  Audit Logs: {viewingAppLogs.name}
                </h3>
              </div>
              <button
                onClick={() => setViewingAppLogs(null)}
                className="p-1.5 text-slate-400 hover:text-white rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 font-mono text-xs text-slate-300 space-y-3 max-h-80 overflow-y-auto">
              {logs.filter((l) => l.appId === viewingAppLogs.id).length === 0 ? (
                <div className="text-slate-500 text-center py-6">No recent logs recorded for this app.</div>
              ) : (
                logs
                  .filter((l) => l.appId === viewingAppLogs.id)
                  .map((log) => (
                    <div key={log.id} className="border-b border-slate-900 pb-2">
                      <div className="flex justify-between text-[10px] text-slate-500">
                        <span>{log.timestamp}</span>
                        <span className="uppercase text-amber-400 font-bold">{log.type}</span>
                      </div>
                      <div className="text-slate-200 mt-1">{log.message}</div>
                    </div>
                  ))
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
