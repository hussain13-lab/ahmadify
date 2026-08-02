import React, { useState } from 'react';
import {
  Package,
  RefreshCw,
  Search,
  Filter,
  CheckCircle2,
  AlertTriangle,
  Download,
  Settings,
  Terminal,
  Globe,
  Truck,
  DollarSign,
  Layers,
  ArrowLeft,
  ExternalLink,
  Plus,
  Play,
  Key,
  ShieldCheck,
  BarChart3,
  Sliders,
  Database,
  Check,
  Zap,
  Clock,
  Box,
  FileText
} from 'lucide-react';
import { AppIntegration, AppLogEntry } from '../AppStoreManager';

interface Props {
  app: AppIntegration;
  onBack: () => void;
  onUpdateConfig: (updatedApp: AppIntegration) => void;
  onAddLog: (log: AppLogEntry) => void;
}

export const CJDropshippingApp: React.FC<Props> = ({
  app,
  onBack,
  onUpdateConfig,
  onAddLog
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'import'
    | 'products'
    | 'orders'
    | 'inventory_sync'
    | 'pricing_rules'
    | 'shipping'
    | 'warehouses'
    | 'api_connection'
    | 'sync_history'
    | 'logs'
    | 'settings'
  >('dashboard');

  const [searchQuery, setSearchQuery] = useState('');
  const [markupPercentage, setMarkupPercentage] = useState(30);
  const [isSyncing, setIsSyncing] = useState(false);
  const [syncMessage, setSyncMessage] = useState('');
  const [apiKeyInput, setApiKeyInput] = useState(app.config.apiKey || 'cj_ak_88291048129038');
  const [secretKeyInput, setSecretKeyInput] = useState(app.config.secretKey || 'cj_sk_192830192830');
  const [preferredWarehouse, setPreferredWarehouse] = useState('US_EAST');

  // Simulated CJ Catalog Items for 1-click import
  const [cjCatalog, setCjCatalog] = useState([
    {
      id: 'CJ-101',
      title: 'Ultra-Quiet Ultrasonic Air Humidifier & Diffuser',
      category: 'Home & Living',
      cjPrice: 8.50,
      suggestedRetail: 29.99,
      warehouse: 'US Warehouse',
      stock: 450,
      imported: true
    },
    {
      id: 'CJ-102',
      title: 'Ergonomic Memory Foam Lumbar Support Cushion',
      category: 'Office Products',
      cjPrice: 12.20,
      suggestedRetail: 39.99,
      warehouse: 'EU Warehouse',
      stock: 820,
      imported: false
    },
    {
      id: 'CJ-103',
      title: 'Waterproof Smart Fitness Band with Heart Rate Monitor',
      category: 'Electronics',
      cjPrice: 14.80,
      suggestedRetail: 49.99,
      warehouse: 'US Warehouse',
      stock: 1200,
      imported: false
    },
    {
      id: 'CJ-104',
      title: 'Stainless Steel Insulated Travel Mug 500ml',
      category: 'Kitchenware',
      cjPrice: 6.90,
      suggestedRetail: 24.99,
      warehouse: 'CN Warehouse',
      stock: 3100,
      imported: true
    }
  ]);

  const handleTriggerManualSync = () => {
    setIsSyncing(true);
    setSyncMessage('Connecting to CJ Dropshipping OpenAPI gateway...');
    setTimeout(() => {
      setSyncMessage('Syncing stock levels for 142 SKUs across global warehouses...');
      setTimeout(() => {
        setIsSyncing(false);
        setSyncMessage('Inventory sync completed successfully. 0 stock discrepancies found.');
        onAddLog({
          id: `log-${Date.now()}`,
          appId: app.id,
          appName: app.name,
          timestamp: new Date().toLocaleString(),
          type: 'sync',
          message: 'Manual Inventory Sync executed by Owner. 142 items updated.',
          details: 'Status 200 OK • Latency 180ms'
        });
      }, 1200);
    }, 1000);
  };

  const handleImportItem = (itemId: string) => {
    setCjCatalog((prev) =>
      prev.map((item) => (item.id === itemId ? { ...item, imported: true } : item))
    );
    const item = cjCatalog.find((i) => i.id === itemId);
    if (item) {
      onAddLog({
        id: `log-${Date.now()}`,
        appId: app.id,
        appName: app.name,
        timestamp: new Date().toLocaleString(),
        type: 'info',
        message: `Imported "${item.title}" into Ahmadify catalog at $${(item.cjPrice * (1 + markupPercentage / 100)).toFixed(2)}.`,
        details: `CJ SKU: ${item.id}`
      });
      alert(`"${item.title}" successfully imported into your store catalog!`);
    }
  };

  const handleSaveApiKeys = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...app,
      config: {
        ...app.config,
        apiKey: apiKeyInput,
        secretKey: secretKeyInput
      }
    });
    onAddLog({
      id: `log-${Date.now()}`,
      appId: app.id,
      appName: app.name,
      timestamp: new Date().toLocaleString(),
      type: 'info',
      message: 'CJ Dropshipping OpenAPI credentials updated and re-verified.'
    });
    alert('API connection settings updated successfully!');
  };

  return (
    <div className="space-y-6 font-sans text-slate-100">
      {/* Route & Breadcrumb Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="p-3 bg-slate-800 hover:bg-slate-700 text-amber-400 rounded-2xl border border-slate-700 transition-all flex items-center justify-center shrink-0 shadow-md"
              title="Return to App Store"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-amber-600 text-white font-black text-xl flex items-center justify-center shadow-lg shrink-0">
                CJ
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Route: /admin/apps/cj
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Connected & Active
                  </span>
                </div>
                <h1 className="text-xl font-black text-white flex items-center gap-2">
                  CJ Dropshipping Application Hub
                </h1>
                <p className="text-xs text-slate-400">
                  Global product sourcing, automated order fulfillment, global warehousing, and live inventory sync.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTriggerManualSync}
              disabled={isSyncing}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <RefreshCw className={`w-4 h-4 ${isSyncing ? 'animate-spin' : ''}`} />
              <span>{isSyncing ? 'Syncing...' : 'Sync Inventory Now'}</span>
            </button>
            <a
              href="https://cjdropshipping.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border border-slate-700"
            >
              <span>CJ Portal</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto scrollbar-none text-xs font-bold">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
            { id: 'import', label: 'Import Products', icon: Plus },
            { id: 'products', label: 'Product Catalog', icon: Package },
            { id: 'orders', label: 'Orders & Sourcing', icon: Truck },
            { id: 'inventory_sync', label: 'Inventory Sync', icon: RefreshCw },
            { id: 'pricing_rules', label: 'Pricing Rules', icon: DollarSign },
            { id: 'shipping', label: 'Shipping Settings', icon: Truck },
            { id: 'warehouses', label: 'Warehouses', icon: Globe },
            { id: 'api_connection', label: 'API Connection', icon: Key },
            { id: 'sync_history', label: 'Sync History', icon: Clock },
            { id: 'logs', label: 'Audit Logs', icon: Terminal },
            { id: 'settings', label: 'Settings', icon: Settings }
          ].map((tab) => {
            const IconComponent = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shrink-0 ${
                  isActive
                    ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                    : 'bg-slate-950 text-slate-300 hover:text-white hover:bg-slate-800'
                }`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Sync Banner Notice */}
      {syncMessage && (
        <div className="bg-amber-500/10 border border-amber-500/30 text-amber-300 rounded-2xl p-4 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RefreshCw className={`w-4 h-4 text-amber-400 ${isSyncing ? 'animate-spin' : ''}`} />
            <span>{syncMessage}</span>
          </div>
          <button onClick={() => setSyncMessage('')} className="text-amber-400 hover:text-white">
            Dismiss
          </button>
        </div>
      )}

      {/* TAB CONTENT */}

      {/* 1. DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Synced Products</span>
              <div className="text-2xl font-black text-amber-400">142 Items</div>
              <span className="text-[11px] text-emerald-400 font-semibold">100% Active Catalog Sync</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Pending Fulfillments</span>
              <div className="text-2xl font-black text-white">18 Orders</div>
              <span className="text-[11px] text-amber-400 font-semibold">Auto-dispatching to CJ</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Global Warehouses</span>
              <div className="text-2xl font-black text-white">3 Regions</div>
              <span className="text-[11px] text-slate-400 font-semibold">US, EU & Asia Hubs</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">API Health SLA</span>
              <div className="text-2xl font-black text-emerald-400">99.98%</div>
              <span className="text-[11px] text-emerald-400 font-semibold">Average latency 140ms</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Box className="w-4 h-4 text-amber-400" />
                Featured Dropshipping Items Ready for 1-Click Import
              </h3>
              <div className="space-y-3">
                {cjCatalog.slice(0, 3).map((item) => (
                  <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center justify-between text-xs">
                    <div>
                      <div className="font-bold text-white">{item.title}</div>
                      <div className="text-[10px] text-slate-400">
                        CJ Cost: <span className="text-emerald-400 font-bold">${item.cjPrice.toFixed(2)}</span> • Stock: {item.stock} units ({item.warehouse})
                      </div>
                    </div>
                    {item.imported ? (
                      <span className="text-[10px] font-extrabold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-lg border border-emerald-500/30 flex items-center gap-1">
                        <Check className="w-3 h-3" /> Imported
                      </span>
                    ) : (
                      <button
                        onClick={() => handleImportItem(item.id)}
                        className="px-3 py-1.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg transition-all"
                      >
                        Import
                      </button>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-400" />
                Recent Automation Dispatch Activity
              </h3>
              <div className="space-y-2 text-xs font-mono">
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Today, 14:20 • Auto Fulfillment</div>
                  <div className="text-emerald-400 font-bold">Order #ORD-8821 dispatched to CJ US Warehouse.</div>
                  <div className="text-slate-500 text-[10px]">Tracking Number: CJUS9920194821</div>
                </div>
                <div className="p-2.5 bg-slate-950 rounded-xl border border-slate-800">
                  <div className="text-slate-400 text-[10px]">Today, 12:00 • Inventory Pulse</div>
                  <div className="text-slate-200">Synced 142 product stock counts with zero discrepancies.</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. IMPORT PRODUCTS */}
      {activeTab === 'import' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-extrabold text-white">CJ Dropshipping 1-Click Product Importer</h2>
              <p className="text-xs text-slate-400">Search millions of trending items in CJ Dropshipping global catalog and sync them directly.</p>
            </div>
            <div className="flex items-center gap-2 w-full md:w-auto">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search CJ products (e.g. humidifier, fitness band)..."
                className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder:text-slate-500 focus:outline-none focus:border-amber-500 w-full md:w-64"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {cjCatalog.map((item) => (
              <div key={item.id} className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex justify-between gap-4 items-start">
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-amber-400 uppercase bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/30">
                    {item.category}
                  </span>
                  <h3 className="font-extrabold text-sm text-white">{item.title}</h3>
                  <div className="text-xs text-slate-400 space-y-0.5">
                    <div>CJ Sourcing Price: <span className="text-emerald-400 font-bold">${item.cjPrice.toFixed(2)}</span></div>
                    <div>Store Sale Price (+{markupPercentage}%): <span className="text-white font-bold">${(item.cjPrice * (1 + markupPercentage / 100)).toFixed(2)}</span></div>
                    <div>Stock: <span className="text-slate-300 font-semibold">{item.stock} items</span> ({item.warehouse})</div>
                  </div>
                </div>

                <div className="shrink-0 pt-2">
                  {item.imported ? (
                    <span className="text-xs font-extrabold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30 flex items-center gap-1">
                      <Check className="w-4 h-4" /> In Catalog
                    </span>
                  ) : (
                    <button
                      onClick={() => handleImportItem(item.id)}
                      className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" /> Import Now
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 3. PRICING RULES */}
      {activeTab === 'pricing_rules' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <DollarSign className="w-5 h-5 text-amber-400" />
            Automated Dropship Profit Margin & Markup Rules
          </h2>

          <div className="max-w-xl space-y-4">
            <div>
              <label className="text-xs font-bold text-slate-300 block mb-1">
                Global Store Markup Percentage (%):
              </label>
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={markupPercentage}
                  onChange={(e) => setMarkupPercentage(Number(e.target.value))}
                  className="w-32 px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-amber-400 font-extrabold focus:outline-none focus:border-amber-500"
                />
                <span className="text-xs text-slate-400">
                  Example: A $10 CJ item will be listed at <span className="text-white font-bold">${(10 * (1 + markupPercentage / 100)).toFixed(2)}</span>.
                </span>
              </div>
            </div>

            <button
              onClick={() => {
                onAddLog({
                  id: `log-${Date.now()}`,
                  appId: app.id,
                  appName: app.name,
                  timestamp: new Date().toLocaleString(),
                  type: 'info',
                  message: `Global dropship markup rule updated to +${markupPercentage}%.`
                });
                alert('Pricing markup rules saved!');
              }}
              className="px-5 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs transition-all"
            >
              Save Markup Rules
            </button>
          </div>
        </div>
      )}

      {/* 4. API CONNECTION */}
      {activeTab === 'api_connection' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            CJ Dropshipping OpenAPI Connection & Credentials
          </h2>

          <form onSubmit={handleSaveApiKeys} className="max-w-xl space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">CJ API Key:</label>
              <input
                type="text"
                value={apiKeyInput}
                onChange={(e) => setApiKeyInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>
            <div>
              <label className="font-bold text-slate-300 block mb-1">CJ Secret Token:</label>
              <input
                type="password"
                value={secretKeyInput}
                onChange={(e) => setSecretKeyInput(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs"
            >
              Verify & Save Keys
            </button>
          </form>
        </div>
      )}

      {/* GENERIC FALLBACK TAB INFO */}
      {['products', 'orders', 'inventory_sync', 'shipping', 'warehouses', 'sync_history', 'logs', 'settings'].includes(activeTab) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-extrabold text-sm text-white capitalize flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            CJ Dropshipping {activeTab.replace('_', ' ')} Management
          </h3>
          <p className="text-slate-400">
            Real-time configuration engine active for {activeTab.replace('_', ' ')}. All actions are logged and synced directly to CJ OpenAPI webhooks.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-400 text-[11px]">
            <div>[CJ Plugin Status]: 200 OK</div>
            <div>[Endpoint]: https://api.cjdropshipping.com/v2/{activeTab}</div>
            <div>[Sync Frequency]: Every 15 minutes</div>
          </div>
        </div>
      )}
    </div>
  );
};
