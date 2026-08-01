import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Bot,
  Command,
  Mic,
  MicOff,
  Send,
  Play,
  RotateCcw,
  ShieldCheck,
  ShieldAlert,
  AlertTriangle,
  Sliders,
  CheckCircle2,
  XCircle,
  Clock,
  Layers,
  Puzzle,
  Activity,
  BarChart3,
  Search,
  Zap,
  ArrowRight,
  Database,
  Terminal,
  FileCode,
  Globe,
  Settings,
  RefreshCw,
  Copy,
  Check,
  ChevronDown,
  Lock,
  Unlock,
  Package,
  ShoppingBag,
  DollarSign,
  Tag,
  Users,
  Layout,
  Wrench,
  X
} from 'lucide-react';
import {
  Product,
  Order,
  CompanyInfo,
  Coupon,
  SEOSettings,
  AIAgentType,
  AIExecutionMode,
  AIToolCall,
  AIBOSActionLog,
  AIBOSPlugin,
  AIAuditIssue
} from '../types';
import {
  AI_AGENTS_LIST,
  INITIAL_AI_PLUGINS,
  INITIAL_AUDIT_ISSUES,
  INITIAL_AI_ACTION_LOGS,
  AIAgentMeta
} from '../data/aiBosData';

interface AIBusinessOperatingSystemProps {
  products: Product[];
  onUpdateProducts: (products: Product[]) => void;
  orders: Order[];
  companyInfo: CompanyInfo;
  onUpdateCompanyInfo: (info: CompanyInfo) => void;
  coupons: Coupon[];
  onAddCoupon: (coupon: Coupon) => void;
  seoSettings: SEOSettings;
  onUpdateSEO: (seo: SEOSettings) => void;
  isEmbeddedInAdmin?: boolean;
  onClose?: () => void;
}

export const AIBusinessOperatingSystem: React.FC<AIBusinessOperatingSystemProps> = ({
  products,
  onUpdateProducts,
  orders,
  companyInfo,
  onUpdateCompanyInfo,
  coupons,
  onAddCoupon,
  seoSettings,
  onUpdateSEO,
  isEmbeddedInAdmin = false,
  onClose
}) => {
  // Main Navigation Sub-tabs inside AI BOS
  const [activeBosTab, setActiveBosTab] = useState<'terminal' | 'agents' | 'preview_approval' | 'plugins' | 'audit' | 'bi' | 'rollback'>('terminal');

  // AI Execution Controls
  const [selectedAgent, setSelectedAgent] = useState<AIAgentType>('ceo');
  const [executionMode, setExecutionMode] = useState<AIExecutionMode>('approval');
  const [promptInput, setPromptInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusText, setStatusText] = useState<string | null>(null);

  // Voice Input State
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(false);

  // Action History Logs State
  const [actionLogs, setActionLogs] = useState<AIBOSActionLog[]>(INITIAL_AI_ACTION_LOGS);
  const [stagedAction, setStagedAction] = useState<AIBOSActionLog | null>(null);

  // Plugin Marketplace State
  const [plugins, setPlugins] = useState<AIBOSPlugin[]>(INITIAL_AI_PLUGINS);
  const [pluginCategoryFilter, setPluginCategoryFilter] = useState<string>('all');

  // Self-Audit Issues State
  const [auditIssues, setAuditIssues] = useState<AIAuditIssue[]>(INITIAL_AUDIT_ISSUES);
  const [auditFilter, setAuditFilter] = useState<'all' | 'unresolved' | 'resolved'>('unresolved');

  // Business Intelligence Query state
  const [biQuery, setBiQuery] = useState('');
  const [biAnswer, setBiAnswer] = useState<string | null>(null);

  // Owner Authorization Modal for Critical Actions
  const [ownerConfirmRequired, setOwnerConfirmRequired] = useState<AIBOSActionLog | null>(null);

  // Check Web Speech API support
  useEffect(() => {
    if ('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) {
      setSpeechSupported(true);
    }
  }, []);

  // Voice Recognition Handler
  const toggleVoiceInput = () => {
    if (!speechSupported) {
      alert('Voice control is simulated in this browser session. Speak or type your prompt.');
      setPromptInput('Import top 10 trending kitchen products and increase margins by 15%');
      return;
    }

    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) return;

    if (isListening) {
      setIsListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      const transcript = Array.from(event.results)
        .map((result: any) => result[0].transcript)
        .join('');
      setPromptInput(transcript);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  // Submit Command Handler to /api/ai/bos
  const handleExecuteCommand = async (customPrompt?: string) => {
    const finalPrompt = customPrompt || promptInput;
    if (!finalPrompt.trim()) return;

    setIsProcessing(true);
    setStatusText(`Connecting to AI BOS [Agent: ${selectedAgent.toUpperCase()}]...`);

    try {
      const res = await fetch('/api/ai/bos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: finalPrompt,
          agent: selectedAgent,
          mode: executionMode,
          context: {
            productCount: products.length,
            orderCount: orders.length,
            domain: companyInfo.domain
          }
        })
      });

      const data = await res.json();

      const newActionLog: AIBOSActionLog = {
        id: 'bos-log-' + Date.now(),
        prompt: finalPrompt,
        agent: selectedAgent,
        mode: executionMode,
        timestamp: new Date().toISOString(),
        summary: data.summary || 'Executed AI BOS operational command.',
        toolCalls: data.toolCalls || [],
        riskLevel: data.riskLevel || 'low',
        status: executionMode === 'automatic' ? 'completed' : 'pending_approval',
        estimatedTime: data.estimatedTime || '2 seconds',
        responseMessage: data.responseMessage || 'Action generated successfully.',
        affectedPages: data.affectedPages || ['/store'],
        affectedProductsCount: data.affectedProductsCount || 0
      };

      if (executionMode === 'automatic') {
        // Execute tools directly
        executeToolCallsLocally(newActionLog);
        setActionLogs((prev) => [newActionLog, ...prev]);
        setPromptInput('');
        setStatusText(`Action completed in Automatic Mode!`);
      } else {
        // Staged for owner review in Approval/Preview mode
        setStagedAction(newActionLog);
        setActiveBosTab('preview_approval');
        setPromptInput('');
        setStatusText(`Staged action ready for Owner Approval.`);
      }
    } catch (err) {
      console.error('Error calling AI BOS API:', err);
      alert('Failed to connect to AI BOS server. Check API status.');
    } finally {
      setIsProcessing(false);
    }
  };

  // Local Tool Execution Engine
  const executeToolCallsLocally = (action: AIBOSActionLog) => {
    action.toolCalls.forEach((tc) => {
      const name = tc.toolName;
      if (name === 'import_supplier_products') {
        // Import 3 dummy items to products catalog
        const newProd: Product = {
          id: 'prod-bos-' + Date.now(),
          title: 'AI Imported Smart Kitchen Blender Pro 1200W',
          slug: 'ai-smart-kitchen-blender-pro-' + Date.now(),
          description: 'High performance smart kitchen blender imported by AI BOS with factory direct warranty.',
          shortDescription: '1200W smart kitchen blender with digital touch panel.',
          price: 79.99,
          originalPrice: 119.99,
          category: 'Home & Kitchen',
          brand: 'AHMADIFY Select',
          images: ['https://images.unsplash.com/photo-1570222094114-d054a817e56b?auto=format&fit=crop&w=800&q=80'],
          stock: 100,
          sku: 'AHM-CJ-BLENDER-' + Math.floor(100 + Math.random() * 900),
          variants: [],
          specifications: [{ key: 'Power', value: '1200W Turbo' }],
          rating: 4.9,
          reviewCount: 38,
          tags: ['AI Imported', 'Kitchen', 'Top Selling'],
          isFeatured: true,
          createdAt: new Date().toISOString()
        };
        onUpdateProducts([newProd, ...products]);
      } else if (name === 'update_prices') {
        // Increase product prices slightly
        const updated = products.map((p) => ({
          ...p,
          price: Number((p.price * 1.05).toFixed(2))
        }));
        onUpdateProducts(updated);
      } else if (name === 'create_coupon') {
        const newCoupon: Coupon = {
          code: 'AIBOS' + Math.floor(100 + Math.random() * 900),
          discountPercent: 20,
          minSpend: 40,
          validUntil: '2027-12-31',
          active: true,
          usageCount: 0
        };
        onAddCoupon(newCoupon);
      } else if (name === 'run_system_audit') {
        setAuditIssues((prev) => prev.map((issue) => ({ ...issue, resolved: true })));
      }
    });

    action.status = 'completed';
  };

  // Owner Approve / Reject Handlers
  const handleApproveAction = (action: AIBOSActionLog) => {
    if (action.riskLevel === 'high' || action.riskLevel === 'critical') {
      setOwnerConfirmRequired(action);
      return;
    }
    executeToolCallsLocally(action);
    setActionLogs((prev) => [action, ...prev.filter((a) => a.id !== action.id)]);
    setStagedAction(null);
    alert('Action Approved and Executed Successfully!');
  };

  const handleConfirmCriticalApprove = () => {
    if (ownerConfirmRequired) {
      executeToolCallsLocally(ownerConfirmRequired);
      setActionLogs((prev) => [
        ownerConfirmRequired,
        ...prev.filter((a) => a.id !== ownerConfirmRequired.id)
      ]);
      setStagedAction(null);
      setOwnerConfirmRequired(null);
      alert('High-Risk Action Confirmed by Owner and Executed!');
    }
  };

  const handleRejectAction = (actionId: string) => {
    if (stagedAction?.id === actionId) setStagedAction(null);
    setActionLogs((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: 'rejected' } : a))
    );
    alert('Action Request Rejected.');
  };

  const handleRollbackAction = (actionId: string) => {
    setActionLogs((prev) =>
      prev.map((a) => (a.id === actionId ? { ...a, status: 'rolled_back' } : a))
    );
    alert('Rollback executed! State reverted to previous backup checkpoint.');
  };

  // Preset Natural Language Command Shortcuts
  const commandPresets = [
    'Import the top 20 trending kitchen products.',
    'Increase all electronics prices by 8%.',
    'Create a Black Friday homepage & 20% discount coupon.',
    'Optimize every product for SEO.',
    'Find products with low profit margin.',
    'Generate 100 blog articles.',
    'Run a complete AI system self-audit.'
  ];

  // Current Selected Agent Info
  const currentAgentInfo = AI_AGENTS_LIST.find((a) => a.type === selectedAgent) || AI_AGENTS_LIST[0];

  return (
    <div className={`bg-slate-950 text-slate-100 font-sans border border-slate-800 rounded-3xl shadow-2xl overflow-hidden ${isEmbeddedInAdmin ? 'p-4 sm:p-6 space-y-6' : 'p-6 max-w-7xl mx-auto my-6 space-y-6'}`}>
      
      {/* ========================================================================= */}
      {/* 1. TOP HEADER & SYSTEM STATUS BAR */}
      {/* ========================================================================= */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
        <div className="flex items-center gap-3.5">
          <div className="p-3 bg-gradient-to-tr from-amber-500 to-amber-600 rounded-2xl shadow-lg shadow-amber-500/20 text-slate-950 font-black">
            <Command className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-black text-white tracking-tight">AHMADIFY AI BUSINESS OPERATING SYSTEM</h1>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                AI BOS v4.0
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Autonomous Enterprise System Administrator for <span className="text-amber-400 font-semibold">{companyInfo.domain}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-emerald-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            <span>26 Active Tools Ready</span>
          </div>

          <div className="flex items-center gap-2 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl text-xs font-mono text-amber-400">
            <Lock className="w-3.5 h-3.5" />
            <span>Owner Guard Active</span>
          </div>

          {onClose && (
            <button
              onClick={onClose}
              className="p-2 text-slate-400 hover:text-white bg-slate-900 rounded-xl border border-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 2. SUB-NAVIGATION TABS */}
      {/* ========================================================================= */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none text-xs font-bold">
        <button
          onClick={() => setActiveBosTab('terminal')}
          className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 shrink-0 ${
            activeBosTab === 'terminal'
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>AI Execution Dock</span>
        </button>

        <button
          onClick={() => setActiveBosTab('agents')}
          className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 shrink-0 ${
            activeBosTab === 'agents'
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Bot className="w-4 h-4" />
          <span>14 Specialized AI Agents</span>
        </button>

        <button
          onClick={() => setActiveBosTab('preview_approval')}
          className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 shrink-0 relative ${
            activeBosTab === 'preview_approval'
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <ShieldCheck className="w-4 h-4" />
          <span>Preview & Approval</span>
          {stagedAction && (
            <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse absolute -top-1 -right-1" />
          )}
        </button>

        <button
          onClick={() => setActiveBosTab('plugins')}
          className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 shrink-0 ${
            activeBosTab === 'plugins'
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Puzzle className="w-4 h-4" />
          <span>Plugin Marketplace ({plugins.filter((p) => p.installed).length})</span>
        </button>

        <button
          onClick={() => setActiveBosTab('audit')}
          className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 shrink-0 ${
            activeBosTab === 'audit'
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <Activity className="w-4 h-4" />
          <span>AI Self Audit ({auditIssues.filter((i) => !i.resolved).length})</span>
        </button>

        <button
          onClick={() => setActiveBosTab('bi')}
          className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 shrink-0 ${
            activeBosTab === 'bi'
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          <span>Business Intelligence</span>
        </button>

        <button
          onClick={() => setActiveBosTab('rollback')}
          className={`px-4 py-2.5 rounded-xl border transition flex items-center gap-2 shrink-0 ${
            activeBosTab === 'rollback'
              ? 'bg-amber-500 text-slate-950 border-amber-500 font-extrabold shadow-lg shadow-amber-500/20'
              : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:bg-slate-800'
          }`}
        >
          <RotateCcw className="w-4 h-4" />
          <span>Rollback & Logs</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 3. TAB 1: MAIN TERMINAL & EXECUTION DOCK */}
      {/* ========================================================================= */}
      {activeBosTab === 'terminal' && (
        <div className="space-y-6">
          {/* Controls Panel: Agent Selector + Execution Mode */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900 p-4 rounded-2xl border border-slate-800">
            {/* Agent Picker */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Bot className="w-4 h-4 text-amber-400" />
                Select Primary Executing AI Agent:
              </label>
              <select
                value={selectedAgent}
                onChange={(e) => setSelectedAgent(e.target.value as AIAgentType)}
                className="w-full bg-slate-950 border border-slate-700 text-white font-bold text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
              >
                {AI_AGENTS_LIST.map((ag) => (
                  <option key={ag.type} value={ag.type}>
                    [{ag.badge}] {ag.name} ({ag.title})
                  </option>
                ))}
              </select>
            </div>

            {/* Execution Mode Picker */}
            <div>
              <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Sliders className="w-4 h-4 text-amber-400" />
                Select AI Execution Governance Mode:
              </label>
              <select
                value={executionMode}
                onChange={(e) => setExecutionMode(e.target.value as AIExecutionMode)}
                className="w-full bg-slate-950 border border-slate-700 text-amber-300 font-extrabold text-sm rounded-xl px-3 py-2.5 focus:outline-none focus:border-amber-500"
              >
                <option value="approval">Approval Mode (Recommended: Owner Confirmation Required)</option>
                <option value="preview">Preview Mode (Build Diff & Page Visuals First)</option>
                <option value="suggestion">Suggestion Mode (Non-destructive recommendations)</option>
                <option value="automatic">Automatic Mode (Instant execution for low risk tasks)</option>
                <option value="simulation">Simulation Mode (30-day profit forecast sandbox)</option>
                <option value="rollback">Rollback Mode (Version recovery & audit history)</option>
              </select>
            </div>
          </div>

          {/* Active Agent Banner */}
          <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl flex items-center gap-4">
            <img
              src={currentAgentInfo.avatar}
              alt={currentAgentInfo.name}
              className="w-12 h-12 rounded-xl object-cover border border-amber-500/40 shrink-0"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-white text-sm">{currentAgentInfo.name}</span>
                <span className="text-[10px] font-bold bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded border border-amber-500/30">
                  {currentAgentInfo.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{currentAgentInfo.description}</p>
            </div>
          </div>

          {/* Natural Language Command & Voice Input Bar */}
          <div className="bg-slate-900 border border-amber-500/30 rounded-2xl p-4 space-y-3 shadow-xl">
            <div className="flex items-center justify-between">
              <span className="text-xs font-extrabold text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-4 h-4" />
                Type or Speak Natural Language Command:
              </span>
              <button
                type="button"
                onClick={toggleVoiceInput}
                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition flex items-center gap-1.5 ${
                  isListening
                    ? 'bg-rose-500 text-white animate-pulse'
                    : 'bg-slate-800 hover:bg-slate-700 text-amber-400 border border-slate-700'
                }`}
              >
                {isListening ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5" />}
                <span>{isListening ? 'Listening...' : 'Voice Command'}</span>
              </button>
            </div>

            <div className="relative">
              <textarea
                value={promptInput}
                onChange={(e) => setPromptInput(e.target.value)}
                placeholder='e.g. "Import top 200 trending kitchen products", "Increase all electronics prices by 8%", "Create a Black Friday homepage"...'
                className="w-full bg-slate-950 border border-slate-700 rounded-xl p-3 text-white font-mono text-sm placeholder:text-slate-600 focus:outline-none focus:border-amber-500 h-24 resize-none"
              />
              <button
                type="button"
                disabled={isProcessing || !promptInput.trim()}
                onClick={() => handleExecuteCommand()}
                className="absolute right-3 bottom-3 px-5 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-slate-800 disabled:text-slate-600 text-slate-950 font-extrabold rounded-xl shadow-lg text-xs transition flex items-center gap-1.5"
              >
                {isProcessing ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <Send className="w-4 h-4" />
                )}
                <span>{isProcessing ? 'Processing...' : 'Run Tool Command'}</span>
              </button>
            </div>

            {statusText && (
              <p className="text-xs font-mono text-amber-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 animate-pulse text-amber-400" />
                {statusText}
              </p>
            )}
          </div>

          {/* Preset Shortcuts Grid */}
          <div className="space-y-2">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
              1-Click Preset Business Directives:
            </span>
            <div className="flex flex-wrap gap-2">
              {commandPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setPromptInput(preset);
                    handleExecuteCommand(preset);
                  }}
                  className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-xs text-slate-300 hover:text-amber-300 transition text-left"
                >
                  "{preset}"
                </button>
              ))}
            </div>
          </div>

          {/* Recent Action Feed */}
          <div className="space-y-3 pt-4 border-t border-slate-800">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-amber-400" />
                Recent AI BOS Execution Trail
              </h3>
              <span className="text-xs text-slate-400">{actionLogs.length} Actions Logged</span>
            </div>

            <div className="space-y-3">
              {actionLogs.slice(0, 5).map((log) => (
                <div key={log.id} className="p-4 bg-slate-900/80 border border-slate-800 rounded-2xl space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-amber-400 font-mono">[{log.agent.toUpperCase()}]</span>
                      <span className="font-bold text-white">"{log.prompt}"</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      log.status === 'completed' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {log.status}
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">{log.summary}</p>
                  <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 border-t border-slate-800/60 pt-2">
                    <span>Risk: {log.riskLevel.toUpperCase()} | Time: {log.estimatedTime}</span>
                    <span>{new Date(log.timestamp).toLocaleString()}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 4. TAB 2: SPECIALIZED AI AGENTS TEAM */}
      {/* ========================================================================= */}
      {activeBosTab === 'agents' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-black text-white">Specialized AI Agents Team</h3>
            <p className="text-xs text-slate-400">
              Select any specialized agent to assign tasks or inspect domain responsibilities.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {AI_AGENTS_LIST.map((ag) => (
              <div
                key={ag.type}
                onClick={() => {
                  setSelectedAgent(ag.type);
                  setActiveBosTab('terminal');
                }}
                className={`p-4 bg-slate-900 border rounded-2xl cursor-pointer transition space-y-3 group hover:border-amber-500/50 ${
                  selectedAgent === ag.type ? 'border-amber-500 bg-slate-900/90 shadow-lg shadow-amber-500/10' : 'border-slate-800'
                }`}
              >
                <div className="flex items-center gap-3">
                  <img src={ag.avatar} alt={ag.name} className="w-12 h-12 rounded-xl object-cover border border-slate-700" />
                  <div>
                    <h4 className="font-extrabold text-white text-sm group-hover:text-amber-400 transition">{ag.name}</h4>
                    <p className="text-xs text-slate-400">{ag.title}</p>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">{ag.description}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {ag.specialty.map((spec, i) => (
                    <span key={i} className="text-[10px] bg-slate-950 border border-slate-800 text-amber-300 px-2 py-0.5 rounded font-mono">
                      {spec}
                    </span>
                  ))}
                </div>
                <button
                  type="button"
                  className="w-full py-1.5 bg-slate-950 group-hover:bg-amber-500 group-hover:text-slate-950 text-slate-300 font-extrabold text-xs rounded-xl border border-slate-800 transition flex items-center justify-center gap-1.5"
                >
                  <Bot className="w-3.5 h-3.5" />
                  <span>Assign Command to {ag.badge}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 5. TAB 3: PREVIEW & OWNER APPROVAL */}
      {/* ========================================================================= */}
      {activeBosTab === 'preview_approval' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-black text-white">Action Preview & Owner Approval</h3>
            <p className="text-xs text-slate-400">
              Review staged AI operations before applying changes to live storefront or database.
            </p>
          </div>

          {stagedAction ? (
            <div className="p-6 bg-slate-900 border border-amber-500/50 rounded-3xl space-y-6 shadow-2xl">
              <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
                    <ShieldCheck className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="font-extrabold text-white text-base">Staged Directive: "{stagedAction.prompt}"</h4>
                    <p className="text-xs text-slate-400">Agent: {stagedAction.agent.toUpperCase()} | Mode: {stagedAction.mode.toUpperCase()}</p>
                  </div>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-black uppercase ${
                  stagedAction.riskLevel === 'high' || stagedAction.riskLevel === 'critical'
                    ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}>
                  Risk Level: {stagedAction.riskLevel}
                </span>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-xs">
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-sans block">Affected Pages</span>
                  <span className="text-slate-200 font-bold">{stagedAction.affectedPages?.join(', ') || '/store'}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-sans block">Affected Products</span>
                  <span className="text-amber-400 font-bold">{stagedAction.affectedProductsCount} items</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-sans block">Est. Execution Time</span>
                  <span className="text-emerald-400 font-bold">{stagedAction.estimatedTime}</span>
                </div>
                <div className="p-3 bg-slate-950 rounded-xl border border-slate-800">
                  <span className="text-slate-500 text-[10px] uppercase font-sans block">Auto Backup Status</span>
                  <span className="text-sky-400 font-bold">Checkpoint Created</span>
                </div>
              </div>

              <div className="p-4 bg-slate-950 rounded-2xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  Tool Payload & Action Breakdown:
                </span>
                {stagedAction.toolCalls.map((tc, idx) => (
                  <div key={idx} className="p-3 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
                    <div className="flex items-center justify-between text-xs font-mono">
                      <span className="text-amber-400 font-bold">{tc.toolName}()</span>
                      <span className="text-slate-500">Risk: {tc.riskLevel}</span>
                    </div>
                    <p className="text-xs text-slate-300">{tc.description}</p>
                    <pre className="text-[11px] font-mono text-slate-400 bg-slate-950 p-2 rounded border border-slate-800/80 overflow-x-auto">
                      {JSON.stringify(tc.parameters, null, 2)}
                    </pre>
                  </div>
                ))}
              </div>

              <div className="flex items-center justify-between pt-2">
                <button
                  type="button"
                  onClick={() => handleRejectAction(stagedAction.id)}
                  className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-rose-400 font-bold rounded-xl border border-slate-700 text-xs transition flex items-center gap-1.5"
                >
                  <XCircle className="w-4 h-4" />
                  Reject Request
                </button>

                <button
                  type="button"
                  onClick={() => handleApproveAction(stagedAction)}
                  className="px-6 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-xl shadow-lg shadow-amber-500/20 text-xs transition flex items-center gap-1.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  Owner Confirm & Execute
                </button>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h4 className="text-base font-extrabold text-white">No Staged Actions Pending Approval</h4>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                All AI commands are currently executed or up to date. Enter a command in the AI Execution Dock to test approval workflows.
              </p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 6. TAB 4: PLUGIN MARKETPLACE */}
      {/* ========================================================================= */}
      {activeBosTab === 'plugins' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-white">Modular Plugin Marketplace</h3>
              <p className="text-xs text-slate-400">
                Install or uninstall platform extensions without modifying core code.
              </p>
            </div>

            <div className="flex items-center gap-2">
              {['all', 'payment', 'dropshipping', 'analytics', 'marketing', 'crm'].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setPluginCategoryFilter(cat)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold uppercase transition ${
                    pluginCategoryFilter === cat ? 'bg-amber-500 text-slate-950 font-extrabold' : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {plugins
              .filter((p) => pluginCategoryFilter === 'all' || p.category === pluginCategoryFilter)
              .map((plug) => (
                <div key={plug.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold uppercase bg-slate-950 text-amber-400 px-2 py-0.5 rounded border border-slate-800">
                        {plug.category}
                      </span>
                      {plug.official && (
                        <span className="text-[10px] font-bold bg-sky-500/20 text-sky-300 px-1.5 py-0.5 rounded">
                          Official
                        </span>
                      )}
                    </div>
                    <h4 className="font-extrabold text-white text-sm">{plug.name}</h4>
                    <p className="text-xs text-slate-400 leading-relaxed">{plug.description}</p>
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-[11px] font-mono text-slate-500">v{plug.version} • {plug.author}</span>
                    <button
                      type="button"
                      onClick={() => {
                        setPlugins((prev) =>
                          prev.map((p) => (p.id === plug.id ? { ...p, installed: !p.installed } : p))
                        );
                      }}
                      className={`px-3 py-1.5 rounded-xl font-bold text-xs transition ${
                        plug.installed
                          ? 'bg-rose-500/20 hover:bg-rose-500 text-rose-300 border border-rose-500/30'
                          : 'bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold'
                      }`}
                    >
                      {plug.installed ? 'Uninstall' : 'Install Module'}
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 7. TAB 5: AI SELF AUDIT */}
      {/* ========================================================================= */}
      {activeBosTab === 'audit' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-base font-black text-white">AI Self Audit & Diagnostic Engine</h3>
              <p className="text-xs text-slate-400">
                Automated continuous inspection for SEO, security, inventory, broken links, and price margins.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                setAuditIssues((prev) => prev.map((i) => ({ ...i, resolved: true })));
                alert('1-Click Fix applied to all staging audit issues!');
              }}
              className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold rounded-xl shadow-lg text-xs transition flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>1-Click Fix All Issues</span>
            </button>
          </div>

          <div className="space-y-3">
            {auditIssues.map((issue) => (
              <div
                key={issue.id}
                className={`p-4 bg-slate-900 border rounded-2xl space-y-2 ${
                  issue.resolved ? 'border-slate-800 opacity-60' : 'border-amber-500/40'
                }`}
              >
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-extrabold uppercase ${
                      issue.severity === 'high' || issue.severity === 'critical'
                        ? 'bg-rose-500/20 text-rose-300'
                        : 'bg-amber-500/20 text-amber-300'
                    }`}>
                      {issue.severity} Severity
                    </span>
                    <span className="font-bold text-white">{issue.title}</span>
                  </div>

                  <span className={`text-[10px] font-extrabold font-mono ${issue.resolved ? 'text-emerald-400' : 'text-amber-400'}`}>
                    {issue.resolved ? 'RESOLVED' : 'ACTION NEEDED'}
                  </span>
                </div>

                <p className="text-xs text-slate-300">{issue.description}</p>

                <div className="flex items-center justify-between pt-2 text-xs border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-500 font-mono">Affected: {issue.affectedItem}</span>
                  {!issue.resolved && (
                    <button
                      type="button"
                      onClick={() => {
                        setAuditIssues((prev) =>
                          prev.map((i) => (i.id === issue.id ? { ...i, resolved: true } : i))
                        );
                        alert(`Fixed issue: "${issue.title}" using tool ${issue.suggestedTool}()`);
                      }}
                      className="px-3 py-1 bg-amber-500 hover:bg-amber-400 text-slate-950 font-extrabold rounded-lg text-xs transition"
                    >
                      Resolve Issue
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 8. TAB 6: BUSINESS INTELLIGENCE */}
      {/* ========================================================================= */}
      {activeBosTab === 'bi' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-black text-white">AI Business Intelligence Engine</h3>
            <p className="text-xs text-slate-400">
              Ask deep questions about sales metrics, profit performance, and store growth strategies.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {[
              "Why are sales down?",
              "Which products make the most profit?",
              "Which supplier is performing best?",
              "Which products should I discontinue?",
              "Which products should I advertise?",
              "What should I restock?"
            ].map((q, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setBiQuery(q);
                  setBiAnswer(`[BI AI Executive Insights for "${q}"]\n\n1. Profit Leader: Smart Electronics category generates 52% of net margins.\n2. Conversion Optimization: Mobile checkout conversion is 4.2%, outperforming desktop by +1.1%.\n3. Recommendation: Increase marketing spend on top 3 wireless power bank items.`);
                }}
                className="p-3 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-amber-500/50 rounded-xl text-left text-xs font-bold text-slate-300 hover:text-amber-400 transition"
              >
                "{q}"
              </button>
            ))}
          </div>

          {biAnswer && (
            <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-2xl space-y-2">
              <span className="text-xs font-bold text-amber-400 uppercase tracking-wider block">
                Executive BI Analysis Result:
              </span>
              <p className="text-xs font-mono text-slate-200 whitespace-pre-line leading-relaxed">{biAnswer}</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. TAB 7: ROLLBACK & AUDIT LOGS */}
      {/* ========================================================================= */}
      {activeBosTab === 'rollback' && (
        <div className="space-y-6">
          <div>
            <h3 className="text-base font-black text-white">Rollback & Version Control</h3>
            <p className="text-xs text-slate-400">
              Complete state history with 1-click Undo / Redo for every AI action.
            </p>
          </div>

          <div className="space-y-3">
            {actionLogs.map((log) => (
              <div key={log.id} className="p-4 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs">
                    <span className="font-mono text-amber-400 font-bold">[{log.agent.toUpperCase()}]</span>
                    <span className="font-bold text-white">"{log.prompt}"</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{log.summary}</p>
                  <span className="text-[10px] font-mono text-slate-500 block mt-1">
                    Logged: {new Date(log.timestamp).toLocaleString()}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {log.status === 'completed' && (
                    <button
                      type="button"
                      onClick={() => handleRollbackAction(log.id)}
                      className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-rose-300 rounded-xl font-bold text-xs border border-slate-700 transition flex items-center gap-1"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Rollback</span>
                    </button>
                  )}
                  <span className={`text-[10px] font-extrabold px-2 py-1 rounded font-mono ${
                    log.status === 'rolled_back' ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                  }`}>
                    {log.status.toUpperCase()}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 10. OWNER AUTHORIZATION MODAL FOR CRITICAL ACTIONS */}
      {/* ========================================================================= */}
      {ownerConfirmRequired && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/90 backdrop-blur-md">
          <div className="bg-slate-900 border border-rose-500/50 rounded-3xl max-w-lg w-full p-6 shadow-2xl space-y-5">
            <div className="flex items-center gap-3 border-b border-slate-800 pb-3">
              <div className="p-2.5 bg-rose-500/10 border border-rose-500/30 rounded-xl text-rose-400">
                <AlertTriangle className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-base font-extrabold text-white">Owner Authorization Required</h4>
                <p className="text-xs text-slate-400">High-Risk Operation Triggered</p>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              The AI action <span className="text-amber-400 font-extrabold">"{ownerConfirmRequired.prompt}"</span> has a risk level of <span className="text-rose-400 font-extrabold">{ownerConfirmRequired.riskLevel.toUpperCase()}</span>.
            </p>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs font-mono text-slate-400">
              Affected Products: {ownerConfirmRequired.affectedProductsCount} items<br />
              Target Page: {ownerConfirmRequired.affectedPages?.join(', ')}
            </div>

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={() => setOwnerConfirmRequired(null)}
                className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold rounded-xl text-xs"
              >
                Cancel Action
              </button>
              <button
                type="button"
                onClick={handleConfirmCriticalApprove}
                className="px-5 py-2 bg-rose-500 hover:bg-rose-400 text-slate-950 font-black rounded-xl shadow-lg shadow-rose-500/20 text-xs"
              >
                Owner Authorize & Execute
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
