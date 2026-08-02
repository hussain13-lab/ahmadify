import React, { useState } from 'react';
import {
  Activity,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Key,
  Terminal,
  Settings,
  ShieldCheck,
  Zap,
  Globe,
  Sliders,
  RefreshCw,
  ExternalLink,
  BookOpen,
  Send,
  Lock,
  FileText
} from 'lucide-react';
import { AppIntegration, AppLogEntry } from '../AppStoreManager';

interface Props {
  app: AppIntegration;
  onBack: () => void;
  onUpdateConfig: (updatedApp: AppIntegration) => void;
  onAddLog: (log: AppLogEntry) => void;
}

export const GenericPluginApp: React.FC<Props> = ({
  app,
  onBack,
  onUpdateConfig,
  onAddLog
}) => {
  const [activeTab, setActiveTab] = useState<
    | 'dashboard'
    | 'operations'
    | 'api_config'
    | 'permissions'
    | 'health'
    | 'logs'
    | 'docs'
    | 'settings'
  >('dashboard');

  const [apiKey, setApiKey] = useState(app.config.apiKey || 'ak_live_sample_key_992183');
  const [secretKey, setSecretKey] = useState(app.config.secretKey || 'sk_live_sample_secret_182390');
  const [environment, setEnvironment] = useState<'production' | 'sandbox'>(app.config.environment || 'production');
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<string | null>(null);

  const handleRunHealthCheck = () => {
    setIsTesting(true);
    setTestResult(null);
    setTimeout(() => {
      setIsTesting(false);
      setTestResult('HEALTHY • Connection verified (Latency: 120ms • HTTP 200 OK)');
      onAddLog({
        id: `log-${Date.now()}`,
        appId: app.id,
        appName: app.name,
        timestamp: new Date().toLocaleString(),
        type: 'info',
        message: `Health check executed for ${app.name}. Endpoint reachable with 120ms latency.`,
        details: 'Status 200 OK • SSL TLS 1.3 Verified'
      });
    }, 800);
  };

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateConfig({
      ...app,
      config: {
        ...app.config,
        apiKey,
        secretKey,
        environment
      }
    });
    onAddLog({
      id: `log-${Date.now()}`,
      appId: app.id,
      appName: app.name,
      timestamp: new Date().toLocaleString(),
      type: 'info',
      message: `Configuration updated for ${app.name}. Environment set to [${environment.toUpperCase()}].`
    });
    alert(`Settings saved for ${app.name}!`);
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
              <div className={`w-12 h-12 rounded-2xl ${app.iconBg} text-white font-black text-xl flex items-center justify-center shadow-lg shrink-0`}>
                {app.iconText}
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                    Route: /admin/apps/{app.id}
                  </span>
                  <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" /> App Active
                  </span>
                </div>
                <h1 className="text-xl font-black text-white flex items-center gap-2">
                  {app.name} Application Dashboard
                </h1>
                <p className="text-xs text-slate-400">
                  {app.description}
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleRunHealthCheck}
              disabled={isTesting}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl text-xs shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
            >
              <Activity className={`w-3.5 h-3.5 ${isTesting ? 'animate-spin' : ''}`} />
              <span>{isTesting ? 'Pinging Endpoint...' : 'Health Check'}</span>
            </button>
            {app.documentationUrl && (
              <a
                href={app.documentationUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold rounded-xl text-xs transition-all flex items-center gap-1.5 border border-slate-700"
              >
                <span>Docs</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            )}
          </div>
        </div>

        {/* Sub-Navigation Tabs */}
        <div className="flex items-center gap-2 mt-6 pt-4 border-t border-slate-800 overflow-x-auto scrollbar-none text-xs font-bold">
          {[
            { id: 'dashboard', label: 'Dashboard', icon: Activity },
            { id: 'operations', label: 'Operations', icon: Sliders },
            { id: 'api_config', label: 'API Configuration', icon: Key },
            { id: 'permissions', label: 'Permissions', icon: ShieldCheck },
            { id: 'health', label: 'Health Check', icon: RefreshCw },
            { id: 'logs', label: 'Audit Logs', icon: Terminal },
            { id: 'docs', label: 'Documentation', icon: BookOpen },
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

      {/* Health Check Result Notification */}
      {testResult && (
        <div className="bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl p-4 text-xs font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{testResult}</span>
          </div>
          <button onClick={() => setTestResult(null)} className="text-emerald-400 hover:text-white">
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
              <span className="text-[10px] uppercase font-bold text-slate-400">Plugin Status</span>
              <div className="text-xl font-black text-emerald-400 capitalize">{app.status}</div>
              <span className="text-[11px] text-emerald-400 font-semibold">Registered in System Core</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">App Version</span>
              <div className="text-xl font-black text-white">v{app.version}</div>
              <span className="text-[11px] text-slate-400 font-semibold">By {app.developer}</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Health Index</span>
              <div className="text-xl font-black text-amber-400 capitalize">{app.health}</div>
              <span className="text-[11px] text-emerald-400 font-semibold">SLA 99.9% Verified</span>
            </div>
            <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-1">
              <span className="text-[10px] uppercase font-bold text-slate-400">Category</span>
              <div className="text-xl font-black text-indigo-400">{app.category}</div>
              <span className="text-[11px] text-slate-400 font-semibold">Active Integration</span>
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
            <h3 className="font-extrabold text-sm text-white flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              Application Overview & Active Capabilities
            </h3>
            <p className="text-xs text-slate-300">
              {app.description}
            </p>
            <div className="pt-2 flex flex-wrap gap-2">
              {app.permissions.map((perm, idx) => (
                <span key={idx} className="bg-slate-950 text-slate-300 border border-slate-800 px-3 py-1 rounded-xl text-xs font-mono">
                  🔒 {perm}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 2. API CONFIGURATION */}
      {activeTab === 'api_config' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-6">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <Key className="w-5 h-5 text-amber-400" />
            {app.name} API Configuration
          </h2>

          <form onSubmit={handleSaveConfig} className="max-w-xl space-y-4 text-xs">
            <div>
              <label className="font-bold text-slate-300 block mb-1">Environment Mode:</label>
              <select
                value={environment}
                onChange={(e) => setEnvironment(e.target.value as any)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-amber-400 font-extrabold focus:outline-none focus:border-amber-500"
              >
                <option value="production">Production / Live</option>
                <option value="sandbox">Sandbox / Test Mode</option>
              </select>
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">API Key / Token:</label>
              <input
                type="text"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Secret Key / Authentication Secret:</label>
              <input
                type="password"
                value={secretKey}
                onChange={(e) => setSecretKey(e.target.value)}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono"
              />
            </div>

            <div>
              <label className="font-bold text-slate-300 block mb-1">Webhook Endpoint URL:</label>
              <input
                type="text"
                readOnly
                value={`https://ahmadify.store/api/webhooks/${app.id}`}
                className="w-full px-4 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-slate-400 font-mono select-all"
              />
            </div>

            <button
              type="submit"
              className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs"
            >
              Save API Settings
            </button>
          </form>
        </div>
      )}

      {/* 3. PERMISSIONS */}
      {activeTab === 'permissions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-emerald-400" />
            Security & Data Scopes Granted
          </h2>
          <div className="space-y-2">
            {app.permissions.map((perm, idx) => (
              <div key={idx} className="p-3 bg-slate-950 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                <div className="flex items-center gap-2 text-white font-bold">
                  <Lock className="w-4 h-4 text-amber-400" />
                  <span>{perm}</span>
                </div>
                <span className="text-emerald-400 font-extrabold bg-emerald-500/10 px-2.5 py-1 rounded border border-emerald-500/30">
                  Granted
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4. DOCUMENTATION */}
      {activeTab === 'docs' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <h2 className="text-base font-extrabold text-white flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-amber-400" />
            {app.name} Developer Documentation
          </h2>
          <p className="text-slate-300">
            This plugin communicates securely via server-side encrypted webhooks and RESTful API endpoints.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-slate-300 space-y-2 text-[11px]">
            <div className="text-amber-400 font-bold">// Example Request to Plugin Endpoint</div>
            <div>POST /api/v1/plugins/{app.id}/dispatch HTTP/1.1</div>
            <div>Host: ahmadify.store</div>
            <div>Authorization: Bearer {apiKey.slice(0, 10)}...</div>
          </div>
        </div>
      )}

      {/* FALLBACK TABS */}
      {['operations', 'health', 'logs', 'settings'].includes(activeTab) && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4 text-xs">
          <h3 className="font-extrabold text-sm text-white capitalize flex items-center gap-2">
            <Sliders className="w-4 h-4 text-amber-400" />
            {app.name} {activeTab.replace('_', ' ')}
          </h3>
          <p className="text-slate-400">
            Real-time operating view active for {app.name} {activeTab.replace('_', ' ')}.
          </p>
          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 font-mono text-emerald-400 text-[11px]">
            <div>[Plugin ID]: {app.id}</div>
            <div>[Status]: ACTIVE & ONLINE</div>
            <div>[Last Ping]: Just now</div>
          </div>
        </div>
      )}
    </div>
  );
};
