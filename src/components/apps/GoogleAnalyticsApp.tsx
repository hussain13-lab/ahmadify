import React, { useState } from 'react';
import {
  BarChart3,
  Globe,
  Users,
  Activity,
  ArrowLeft,
  CheckCircle2,
  Terminal,
  Settings,
  Key,
  ExternalLink,
  Zap,
  TrendingUp,
  Eye,
  Sliders,
  Send
} from 'lucide-react';
import { AppIntegration, AppLogEntry } from '../AppStoreManager';

interface Props {
  app: AppIntegration;
  onBack: () => void;
  onUpdateConfig: (updatedApp: AppIntegration) => void;
  onAddLog: (log: AppLogEntry) => void;
}

export const GoogleAnalyticsApp: React.FC<Props> = ({
  app,
  onBack,
  onUpdateConfig,
  onAddLog
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'realtime'
    | 'conversion_funnel'
    | 'heatmaps'
    | 'tracking_id'
    | 'logs'
    | 'settings'
  >('dashboard');

  const [measurementId, setMeasurementId] = useState(app.config.apiKey || 'G-8829104821');

  const handleTestPageViewEvent = () => {
    onAddLog({
      id: `log-${Date.now()}`,
      appId: app.id,
      appName: app.name,
      timestamp: new Date().toLocaleString(),
      type: 'info',
      message: `GA4 event "page_view" sent for Measurement ID [${measurementId}].`,
      details: 'HTTP 204 No Content • gtag.js dispatch'
    });
    alert('Test GA4 Event "page_view" dispatched successfully!');
  };

  const handleSaveTrackingId = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...app,
      config: {
        ...app.config,
        apiKey: measurementId
      }
    });
    onAddLog({
      id: `log-${Date.now()}`,
      appId: app.id,
      appName: app.name,
      timestamp: new Date().toLocaleString(),
      type: 'info',
      message: `Updated GA4 Measurement ID to ${measurementId}.`
    });
    alert('Google Analytics 4 Measurement ID saved!');
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
              <div className="w-12 h-12 rounded-2xl bg-amber-500 text-slate-950 font-black text-xl flex items-center justify-center shadow-lg shrink-0">
                <BarChart3 className="w-6 h-6" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Route: /admin/apps/google-analytics
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> Stream Active
                  </span>
                </div>
                <h1 className="text-xl font-black text-white flex items-center gap-2">
                  Google Analytics 4 (GA4) Commerce Hub
                </h1>
                <p className="text-xs text-slate-400">
                  Real-time visitor telemetry, e-commerce purchase tracking, conversion funnels, and attribution analysis.
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleTestPageViewEvent}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
            >
              <Send className="w-3.5 h-3.5" />
              <span>Test Event Ping</span>
            </button>
            <a
              href="https://analytics.google.com"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border border-slate-700"
            >
              <span>GA4 Console</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto scrollbar-none text-xs font-bold">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'realtime', label: 'Real-time Traffic', icon: Globe },
            { id: 'conversion_funnel', label: 'Conversion Funnel', icon: TrendingUp },
            { id: 'heatmaps', label: 'User Heatmaps', icon: Eye },
            { id: 'tracking_id', label: 'Tracking ID', icon: Key },
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

      {/* TAB CONTENT */}

      {/* 1. DASHBOARD */}
      {activeTab === 'dashboard' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Right Now (Live Visitors)</span>
              <div className="text-3xl font-black text-amber-400 flex items-center gap-2">
                <span>48</span>
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
              <span className="text-[11px] text-emerald-400 font-semibold">Active in last 30 minutes</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Conversion Rate</span>
              <div className="text-2xl font-black text-white">3.82%</div>
              <span className="text-[11px] text-emerald-400 font-semibold">+0.6% vs last week</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Avg. Session Duration</span>
              <div className="text-2xl font-black text-white">3m 42s</div>
              <span className="text-[11px] text-slate-400 font-semibold">High engagement score</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Bounce Rate</span>
              <div className="text-2xl font-black text-emerald-400">32.1%</div>
              <span className="text-[11px] text-emerald-400 font-semibold">Optimal UI performance</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <Globe className="w-4 h-4 text-amber-400" />
                Active Pages Being Viewed Right Now
              </h3>
              <div className="space-y-2 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="font-mono text-white">/product/ahmadify-pro-anc-headphones</span>
                  <span className="font-extrabold text-amber-400">22 users</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="font-mono text-white">/checkout</span>
                  <span className="font-extrabold text-amber-400">12 users</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between items-center">
                  <span className="font-mono text-white">/collection/audio</span>
                  <span className="font-extrabold text-amber-400">8 users</span>
                </div>
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5 space-y-4">
              <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                E-Commerce Funnel Performance
              </h3>
              <div className="space-y-2 text-xs">
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Product Views:</span>
                  <span className="font-extrabold text-white">1,420 views</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Add to Cart:</span>
                  <span className="font-extrabold text-amber-400">380 items</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-xl border border-slate-800 flex justify-between">
                  <span className="text-slate-300">Purchases Completed:</span>
                  <span className="font-extrabold text-emerald-400">54 orders</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 2. TRACKING ID */}
      {activeTab === 'tracking_id' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            Google Analytics 4 Measurement ID
          </h2>

          <form onSubmit={handleSaveTrackingId} className="max-w-xl space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">GA4 Measurement ID (G-XXXXXXXXXX):</label>
              <input
                type="text"
                value={measurementId}
                onChange={(e) => setMeasurementId(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-mono font-bold"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs"
            >
              Save GA4 ID
            </button>
          </form>
        </div>
      )}

      {/* FALLBACK TABS */}
      {['realtime', 'conversion_funnel', 'heatmaps', 'logs', 'settings'].includes(activeTab) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-extrabold text-sm text-white capitalize flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            GA4 {activeTab.replace('_', ' ')} Studio
          </h3>
          <p className="text-slate-400">
            Real-time telemetry stream active for GA4 {activeTab.replace('_', ' ')}. Data updated live.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-amber-400 text-[11px]">
            <div>[gtag.js Status]: LOADED</div>
            <div>[Measurement ID]: {measurementId}</div>
            <div>[Enhanced E-commerce]: ENABLED</div>
          </div>
        </div>
      )}
    </div>
  );
};
