import React, { useState } from 'react';
import {
  Layout,
  Palette,
  Image as ImageIcon,
  Mail,
  Search,
  Lock,
  Download,
  Upload,
  Plus,
  Trash2,
  Copy,
  Eye,
  EyeOff,
  MoveUp,
  MoveDown,
  Sparkles,
  Settings,
  Check,
  RefreshCw,
  Sliders,
  Type,
  Code,
  Globe,
  FileText,
  Shield,
  Clock,
  Layers,
  Smartphone,
  Tablet,
  Monitor,
  CheckCircle2,
  HelpCircle,
  Megaphone,
  Percent,
  Tag,
  Zap,
  DollarSign,
  Menu,
  ChevronDown,
  X,
  RotateCcw,
  RotateCw,
  SlidersHorizontal,
  Folder,
  Sliders as SlidersIcon,
  Maximize2,
  CheckSquare,
  Wrench,
  ExternalLink,
  Languages,
  CreditCard,
  Grid,
  Send,
  SlidersVertical,
  Activity,
  History
} from 'lucide-react';
import {
  WebsitePageConfig,
  GlobalThemeConfig,
  MediaAsset,
  EmailTemplateConfig,
  SEOCenterConfig,
  SiteBackupPoint,
  PageBlock,
  BlockType,
  PageId
} from '../types';

interface WebsiteBuilderStudioProps {
  themeConfig: GlobalThemeConfig;
  onUpdateThemeConfig: (config: GlobalThemeConfig) => void;
  pages: WebsitePageConfig[];
  onUpdatePages: (pages: WebsitePageConfig[]) => void;
  mediaAssets: MediaAsset[];
  onAddMediaAsset: (asset: MediaAsset) => void;
  emailTemplates: EmailTemplateConfig[];
  onUpdateEmailTemplates: (templates: EmailTemplateConfig[]) => void;
  seoConfig: SEOCenterConfig;
  onUpdateSEOConfig: (seo: SEOCenterConfig) => void;
  backups: SiteBackupPoint[];
  onCreateBackup: (description: string) => void;
  onRestoreBackup: (backupId: string) => void;
}

export const WebsiteBuilderStudio: React.FC<WebsiteBuilderStudioProps> = ({
  themeConfig,
  onUpdateThemeConfig,
  pages,
  onUpdatePages,
  mediaAssets,
  onAddMediaAsset,
  emailTemplates,
  onUpdateEmailTemplates,
  seoConfig,
  onUpdateSEOConfig,
  backups,
  onCreateBackup,
  onRestoreBackup
}) => {
  const [studioTab, setStudioTab] = useState<
    | 'page_builder'
    | 'header_footer'
    | 'menu_builder'
    | 'global_design'
    | 'ai_editor'
    | 'media_library'
    | 'seo_code'
    | 'email_editor'
    | 'cms_content'
    | 'publishing'
  >('page_builder');

  // Device view state
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');

  // Active page selector
  const [selectedPageId, setSelectedPageId] = useState<PageId>('home');
  const activePage = pages.find((p) => p.id === selectedPageId) || pages[0] || {
    id: 'home',
    title: 'Home Page',
    slug: '/',
    isPublished: true,
    metaTitle: 'Home',
    metaDescription: 'Home page',
    blocks: [],
    updatedAt: new Date().toISOString()
  };

  // Block Inspector selection
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(
    activePage.blocks[0]?.id || null
  );

  // Undo / Redo history stacks
  const [historyStack, setHistoryStack] = useState<WebsitePageConfig[][]>([]);
  const [redoStack, setRedoStack] = useState<WebsitePageConfig[][]>([]);

  // AI Editor Assistant State
  const [aiPromptInput, setAiPromptInput] = useState('');
  const [isAiProcessing, setIsAiProcessing] = useState(false);
  const [aiProposedDiff, setAiProposedDiff] = useState<string | null>(null);

  // Media Manager state
  const [mediaFolder, setMediaFolder] = useState<string>('All');
  const [mediaSearchQuery, setMediaSearchQuery] = useState('');
  const [aiImagePrompt, setAiImagePrompt] = useState('');
  const [isGeneratingAiImage, setIsGeneratingAiImage] = useState(false);

  // Email template editor state
  const [selectedEmailId, setSelectedEmailId] = useState<string>('order_confirmation');
  const activeEmailTemplate = emailTemplates.find((t) => t.id === selectedEmailId) || emailTemplates[0];

  // Backup & publishing state
  const [backupDescInput, setBackupDescInput] = useState('');
  const [isDraftMode, setIsDraftMode] = useState(false);

  // Menu Builder state
  const [activeMenuId, setActiveMenuId] = useState<'main_nav' | 'footer_links' | 'mega_menu_1' | 'mobile_drawer'>('main_nav');
  const [menuItems, setMenuItems] = useState([
    { id: 'm1', label: 'Home', url: '/', icon: 'Home', badge: '' },
    { id: 'm2', label: 'All Products', url: '/products', icon: 'ShoppingBag', badge: 'HOT' },
    { id: 'm3', label: 'Luxury Watches', url: '/category/watches', icon: 'Clock', badge: 'NEW' },
    { id: 'm4', label: 'VIP Deals', url: '/vip-sale', icon: 'Tag', badge: '50% OFF' },
    { id: 'm5', label: 'Blog & Journal', url: '/blog', icon: 'BookOpen', badge: '' },
    { id: 'm6', label: 'Contact Us', url: '/contact', icon: 'Mail', badge: '' }
  ]);
  const [newMenuLabel, setNewMenuLabel] = useState('');
  const [newMenuUrl, setNewMenuUrl] = useState('');
  const [newMenuBadge, setNewMenuBadge] = useState('');

  // Save current pages state to history before changes
  const recordHistory = () => {
    setHistoryStack((prev) => [...prev, pages]);
    setRedoStack([]);
  };

  const handleUndo = () => {
    if (historyStack.length === 0) return;
    const previous = historyStack[historyStack.length - 1];
    setRedoStack((prev) => [pages, ...prev]);
    setHistoryStack((prev) => prev.slice(0, prev.length - 1));
    onUpdatePages(previous);
  };

  const handleRedo = () => {
    if (redoStack.length === 0) return;
    const next = redoStack[0];
    setHistoryStack((prev) => [...prev, pages]);
    setRedoStack((prev) => prev.slice(1));
    onUpdatePages(next);
  };

  // Helper: update active page blocks
  const handleUpdateActivePageBlocks = (updatedBlocks: PageBlock[]) => {
    recordHistory();
    const updatedPages = pages.map((p) => {
      if (p.id === activePage.id) {
        return { ...p, blocks: updatedBlocks, updatedAt: new Date().toISOString() };
      }
      return p;
    });
    onUpdatePages(updatedPages);
  };

  // Move block up/down
  const handleMoveBlock = (index: number, direction: 'up' | 'down') => {
    const blocks = [...activePage.blocks];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= blocks.length) return;

    const temp = blocks[index];
    blocks[index] = blocks[targetIndex];
    blocks[targetIndex] = temp;

    blocks.forEach((b, idx) => (b.order = idx + 1));
    handleUpdateActivePageBlocks(blocks);
  };

  // Add new block
  const handleAddBlock = (type: BlockType) => {
    recordHistory();
    const newBlock: PageBlock = {
      id: 'blk-' + Date.now(),
      type,
      title: `New ${type.replace(/_/g, ' ').toUpperCase()} Section`,
      content: 'Custom content block added via Ahmadify Website Owner Studio.',
      imageUrl: ['hero', 'image', 'image_gallery', 'slider'].includes(type)
        ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80'
        : undefined,
      ctaText: ['hero', 'button', 'slider', 'countdown_timer'].includes(type) ? 'Explore Collection' : undefined,
      ctaLink: '/products',
      backgroundColor: '#0F172A',
      textColor: '#FFFFFF',
      visible: true,
      order: activePage.blocks.length + 1,
      paddingY: 32
    };
    handleUpdateActivePageBlocks([...activePage.blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  // Delete block
  const handleDeleteBlock = (id: string) => {
    recordHistory();
    const updated = activePage.blocks.filter((b) => b.id !== id);
    handleUpdateActivePageBlocks(updated);
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  // Duplicate block
  const handleDuplicateBlock = (block: PageBlock) => {
    recordHistory();
    const dup: PageBlock = {
      ...block,
      id: 'blk-' + Date.now(),
      title: `${block.title} (Copy)`,
      order: activePage.blocks.length + 1
    };
    handleUpdateActivePageBlocks([...activePage.blocks, dup]);
  };

  // Toggle visibility
  const handleToggleBlockVisibility = (id: string) => {
    recordHistory();
    const updated = activePage.blocks.map((b) => {
      if (b.id === id) return { ...b, visible: !b.visible };
      return b;
    });
    handleUpdateActivePageBlocks(updated);
  };

  // Edit selected block prop
  const handleUpdateSelectedBlockProp = (prop: keyof PageBlock, value: any) => {
    const updated = activePage.blocks.map((b) => {
      if (b.id === selectedBlockId) return { ...b, [prop]: value };
      return b;
    });
    handleUpdateActivePageBlocks(updated);
  };

  // Publish changes live
  const handlePublishLive = () => {
    const desc = `Live Publish Snapshot (${new Date().toLocaleTimeString()}) - Owner Studio`;
    onCreateBackup(desc);
    setIsDraftMode(false);
    alert('🎉 Website published successfully! Automatic system backup point created.');
  };

  // AI Assistant Engine logic
  const handleRunAiAssistant = () => {
    if (!aiPromptInput.trim()) {
      alert('Please enter a command for the AI Website Editor.');
      return;
    }
    setIsAiProcessing(true);
    setAiProposedDiff(null);

    setTimeout(() => {
      setIsAiProcessing(false);
      const promptLower = aiPromptInput.toLowerCase();

      if (promptLower.includes('modern') || promptLower.includes('dark') || promptLower.includes('gold')) {
        onUpdateThemeConfig({
          ...themeConfig,
          primaryColor: '#F59E0B',
          secondaryColor: '#0F172A',
          backgroundColorDark: '#0B0F17',
          buttonStyle: 'rounded-full',
          borderRadius: 16
        });
        setAiProposedDiff('Applied dark gold luxury color palette, rounded-full pill buttons, and 16px corner radii.');
      } else if (promptLower.includes('font') || promptLower.includes('increase')) {
        onUpdateThemeConfig({
          ...themeConfig,
          fontSizeBase: 18,
          fontFamilyHeading: 'Playfair Display'
        });
        setAiProposedDiff('Increased base font size to 18px and set heading typography to Playfair Display.');
      } else if (promptLower.includes('footer')) {
        onUpdateThemeConfig({
          ...themeConfig,
          footerColumnsCount: 4,
          showPaymentIcons: true,
          showTrustBadgesFooter: true
        });
        setAiProposedDiff('Configured footer to 4 balanced columns with payment icons and trust badges.');
      } else {
        // Add a new AI-generated section
        handleAddBlock('hero');
        setAiProposedDiff(`Added a custom AI-generated section block based on prompt: "${aiPromptInput}".`);
      }

      setAiPromptInput('');
    }, 1200);
  };

  // Template Export/Import JSON
  const handleExportPageTemplate = () => {
    const jsonStr = JSON.stringify(activePage, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ahmadify_template_${activePage.id}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportPageTemplate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importedPage = JSON.parse(event.target?.result as string);
        if (importedPage && importedPage.blocks) {
          recordHistory();
          const updatedPages = pages.map((p) => (p.id === activePage.id ? { ...importedPage, id: activePage.id } : p));
          onUpdatePages(updatedPages);
          alert('Template imported successfully!');
        }
      } catch (err) {
        alert('Invalid JSON template file format.');
      }
    };
    reader.readAsText(file);
  };

  // AI Image generation simulation
  const handleGenerateAiMedia = () => {
    if (!aiImagePrompt) {
      alert('Please enter a description for the AI image generator.');
      return;
    }
    setIsGeneratingAiImage(true);
    setTimeout(() => {
      const newAsset: MediaAsset = {
        id: 'med-' + Date.now(),
        name: `AI_${aiImagePrompt.substring(0, 15).replace(/\s+/g, '_')}.jpg`,
        url: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80',
        type: 'image',
        sizeBytes: 1100000,
        folder: 'AI Assets',
        dimensions: '1200x1200',
        createdAt: new Date().toISOString().substring(0, 10)
      };
      onAddMediaAsset(newAsset);
      setIsGeneratingAiImage(false);
      setAiImagePrompt('');
      alert('AI Image created and added to Media Library!');
    }, 1200);
  };

  const selectedBlock = activePage.blocks.find((b) => b.id === selectedBlockId);

  // Filtered Media Assets
  const filteredMediaAssets = mediaAssets.filter((asset) => {
    const matchesFolder = mediaFolder === 'All' || asset.folder === mediaFolder;
    const matchesQuery = asset.name.toLowerCase().includes(mediaSearchQuery.toLowerCase());
    return matchesFolder && matchesQuery;
  });

  return (
    <div className="bg-slate-900 border border-amber-500/20 rounded-3xl p-6 text-slate-100 shadow-2xl space-y-6">
      {/* Top Header Bar */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-slate-800 pb-6">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-2xl text-amber-400 shrink-0">
            <Layout className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 text-[10px] font-black uppercase tracking-wider bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-full">
                Website Owner Studio
              </span>
              <span className={`px-2.5 py-0.5 text-[10px] font-extrabold uppercase rounded-full border ${
                isDraftMode
                  ? 'bg-amber-500/10 text-amber-400 border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30'
              }`}>
                {isDraftMode ? '● Draft Editing Mode' : '✓ Live Sync Active'}
              </span>
            </div>
            <h1 className="text-2xl font-black text-white mt-1 flex items-center gap-2">
              Ahmadify Website Control Center
            </h1>
            <p className="text-xs text-slate-400">
              Complete 100% no-code control over pages, header, footer, menus, design system, AI editor, media, SEO, and publishing.
            </p>
          </div>
        </div>

        {/* Global Action Toolbar */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Device Frame Switcher */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800 text-xs font-bold">
            <button
              onClick={() => setPreviewDevice('desktop')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                previewDevice === 'desktop' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" /> Desktop
            </button>
            <button
              onClick={() => setPreviewDevice('tablet')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                previewDevice === 'tablet' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Tablet className="w-3.5 h-3.5" /> Tablet
            </button>
            <button
              onClick={() => setPreviewDevice('mobile')}
              className={`px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition ${
                previewDevice === 'mobile' ? 'bg-amber-500 text-slate-950 shadow-md font-black' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" /> Mobile
            </button>
          </div>

          {/* Undo / Redo */}
          <div className="flex items-center gap-1">
            <button
              onClick={handleUndo}
              disabled={historyStack.length === 0}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 rounded-xl border border-slate-700 transition"
              title="Undo Last Action"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
            <button
              onClick={handleRedo}
              disabled={redoStack.length === 0}
              className="p-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-30 text-slate-200 rounded-xl border border-slate-700 transition"
              title="Redo Action"
            >
              <RotateCw className="w-4 h-4" />
            </button>
          </div>

          {/* Publish Live */}
          <button
            onClick={handlePublishLive}
            className="px-4 py-2.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs shadow-lg transition flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Publish Website Live
          </button>
        </div>
      </div>

      {/* Main Studio Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-800 scrollbar-none text-xs font-bold">
        {[
          { id: 'page_builder', label: 'Page & Section Builder', icon: Layout },
          { id: 'header_footer', label: 'Header & Footer Builder', icon: Layers },
          { id: 'menu_builder', label: 'Menu & Mega Menu', icon: Menu },
          { id: 'global_design', label: 'Global Design System', icon: Palette },
          { id: 'ai_editor', label: 'AI Website Copilot', icon: Sparkles },
          { id: 'media_library', label: 'Media Library & AI Studio', icon: ImageIcon },
          { id: 'seo_code', label: 'SEO & Tracking Code', icon: Search },
          { id: 'email_editor', label: 'Email Templates', icon: Mail },
          { id: 'cms_content', label: 'CMS Articles & Policies', icon: FileText },
          { id: 'publishing', label: 'Publishing & Snapshots', icon: Shield }
        ].map((tab) => {
          const IconComponent = tab.icon;
          const isActive = studioTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStudioTab(tab.id as any)}
              className={`px-4 py-2.5 rounded-2xl transition-all flex items-center gap-2 shrink-0 ${
                isActive
                  ? 'bg-amber-500 text-slate-950 font-black shadow-lg'
                  : 'bg-slate-950 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <IconComponent className="w-4 h-4" />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: DRAG & DROP PAGE BUILDER */}
      {/* ========================================================================= */}
      {studioTab === 'page_builder' && (
        <div className="space-y-6">
          {/* Page Selector & Toolbar Bar */}
          <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <label className="text-xs font-bold text-amber-400 whitespace-nowrap">Editing Store Page:</label>
              <select
                value={selectedPageId}
                onChange={(e) => {
                  setSelectedPageId(e.target.value as PageId);
                  const p = pages.find((pg) => pg.id === e.target.value);
                  if (p && p.blocks[0]) setSelectedBlockId(p.blocks[0].id);
                }}
                className="bg-slate-900 border border-slate-800 rounded-xl py-2 px-3 text-xs text-white focus:outline-none focus:border-amber-500 font-extrabold flex-1 md:w-72"
              >
                <optgroup label="Core Store Pages">
                  <option value="home">Homepage (/)</option>
                  <option value="product_detail">Product Details Template (/product/:id)</option>
                  <option value="category_page">Category Catalog (/category/:slug)</option>
                  <option value="collection_page">Curated Collections (/collections)</option>
                  <option value="cart_page">Shopping Cart (/cart)</option>
                  <option value="checkout">Checkout & Payment (/checkout)</option>
                  <option value="customer_dashboard">Customer Account (/account)</option>
                  <option value="wishlist_page">Customer Wishlist (/wishlist)</option>
                </optgroup>
                <optgroup label="Content & Informational Pages">
                  <option value="about_us">About Us (/about)</option>
                  <option value="contact">Contact Us (/contact)</option>
                  <option value="faq">FAQ Page (/faq)</option>
                  <option value="blogs">Blog & Journal (/blog)</option>
                  <option value="landing_page">Exclusive VIP Landing Page (/vip-sale)</option>
                </optgroup>
                <optgroup label="Store Legal & System Pages">
                  <option value="privacy_policy">Privacy Policy (/privacy-policy)</option>
                  <option value="terms_conditions">Terms & Conditions (/terms)</option>
                  <option value="return_policy">30-Day Return Policy (/return-policy)</option>
                  <option value="shipping_policy">Shipping & Delivery Policy (/shipping-policy)</option>
                  <option value="page_404">404 Error Page (/404)</option>
                  <option value="maintenance_page">Maintenance Mode (/maintenance)</option>
                </optgroup>
              </select>
            </div>

            {/* Template Import/Export */}
            <div className="flex items-center gap-2">
              <button
                onClick={handleExportPageTemplate}
                className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-amber-400 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700"
              >
                <Download className="w-3.5 h-3.5" /> Export JSON
              </button>
              <label className="px-3 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center gap-1.5 border border-slate-700 cursor-pointer">
                <Upload className="w-3.5 h-3.5 text-amber-400" /> Import JSON
                <input type="file" accept=".json" onChange={handleImportPageTemplate} className="hidden" />
              </label>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Col: Section Navigator & Add Palette (4 cols) */}
            <div className="lg:col-span-4 bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                    <Layers className="w-4 h-4" /> Sections ({activePage.blocks.length})
                  </h3>
                  <span className="text-[10px] text-slate-400 font-mono">Reorder & Edit</span>
                </div>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1 scrollbar-none">
                  {activePage.blocks.map((block, idx) => {
                    const isSelected = selectedBlockId === block.id;
                    return (
                      <div
                        key={block.id}
                        onClick={() => setSelectedBlockId(block.id)}
                        className={`p-3 rounded-xl border text-xs cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-white shadow-md ring-1 ring-amber-500'
                            : 'bg-slate-900 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-mono text-[10px] font-black shrink-0">
                            {idx + 1}
                          </span>
                          <span className="font-extrabold truncate">{block.title}</span>
                        </div>

                        <div className="flex items-center gap-1 shrink-0" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleMoveBlock(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:text-amber-400 text-slate-400 disabled:opacity-20"
                            title="Move Section Up"
                          >
                            <MoveUp className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleMoveBlock(idx, 'down')}
                            disabled={idx === activePage.blocks.length - 1}
                            className="p-1 hover:text-amber-400 text-slate-400 disabled:opacity-20"
                            title="Move Section Down"
                          >
                            <MoveDown className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleToggleBlockVisibility(block.id)}
                            className="p-1 text-slate-400"
                            title="Toggle Visibility"
                          >
                            {block.visible ? <Eye className="w-3.5 h-3.5 text-emerald-400" /> : <EyeOff className="w-3.5 h-3.5 text-rose-400" />}
                          </button>
                          <button
                            onClick={() => handleDuplicateBlock(block)}
                            className="p-1 hover:text-amber-400 text-slate-400"
                            title="Duplicate Section"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlock(block.id)}
                            className="p-1 hover:text-rose-400 text-slate-400"
                            title="Delete Section"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Add New Block Palette */}
              <div className="border-t border-slate-800 pt-4">
                <h4 className="text-xs font-black uppercase text-amber-400 mb-2 flex items-center gap-1">
                  <Plus className="w-3.5 h-3.5" /> Add Reusable Section Block
                </h4>
                <div className="grid grid-cols-2 gap-2 text-[11px] font-bold">
                  {[
                    { type: 'hero', label: 'Hero Banner' },
                    { type: 'slider', label: 'Slider / Carousel' },
                    { type: 'product_grid', label: 'Product Grid' },
                    { type: 'category_carousel', label: 'Categories' },
                    { type: 'countdown_timer', label: 'Countdown Timer' },
                    { type: 'testimonial', label: 'Testimonials' },
                    { type: 'reviews', label: 'Customer Reviews' },
                    { type: 'faq_accordion', label: 'FAQ Accordion' },
                    { type: 'trust_badges', label: 'Trust Badges' },
                    { type: 'payment_icons', label: 'Payment Icons' },
                    { type: 'newsletter_signup', label: 'Newsletter' },
                    { type: 'contact_form', label: 'Contact Form' },
                    { type: 'blog_feed', label: 'Blog Feed' },
                    { type: 'maps', label: 'Google Maps' },
                    { type: 'image_gallery', label: 'Image Gallery' },
                    { type: 'custom_html', label: 'Custom HTML/CSS' }
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => handleAddBlock(item.type as BlockType)}
                      className="p-2 bg-slate-900 hover:bg-amber-500/20 text-slate-200 border border-slate-800 hover:border-amber-500 rounded-xl transition text-left font-bold flex items-center gap-1.5"
                    >
                      <Plus className="w-3 h-3 text-amber-400 shrink-0" />
                      <span className="truncate">{item.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle Col: Live Responsive Canvas (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-2xl p-4 flex flex-col items-center min-h-[550px]">
              <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2 mb-4 text-xs font-mono text-slate-400">
                <span>Live Responsive Canvas</span>
                <span className="text-amber-400 font-extrabold">{previewDevice.toUpperCase()} VIEW</span>
              </div>

              <div
                className={`transition-all bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-4 w-full overflow-y-auto max-h-[620px] ${
                  previewDevice === 'mobile' ? 'max-w-[340px]' : previewDevice === 'tablet' ? 'max-w-[560px]' : 'w-full'
                }`}
              >
                {activePage.blocks
                  .filter((b) => b.visible)
                  .map((block) => (
                    <div
                      key={block.id}
                      onClick={() => setSelectedBlockId(block.id)}
                      className={`p-4 rounded-xl border transition cursor-pointer relative ${
                        selectedBlockId === block.id
                          ? 'border-amber-500 bg-amber-500/10 ring-2 ring-amber-500 shadow-xl'
                          : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
                      }`}
                      style={{
                        backgroundColor: block.backgroundColor,
                        color: block.textColor,
                        paddingTop: `${block.paddingY || 24}px`,
                        paddingBottom: `${block.paddingY || 24}px`
                      }}
                    >
                      <span className="absolute top-2 right-2 text-[9px] font-mono font-black uppercase px-2 py-0.5 bg-slate-950/80 text-amber-400 rounded-full border border-amber-500/30">
                        {block.type}
                      </span>
                      <h4 className="font-black text-sm mb-1">{block.title}</h4>
                      <p className="text-xs opacity-90 line-clamp-3">{block.content}</p>

                      {block.imageUrl && (
                        <img src={block.imageUrl} alt={block.title} className="w-full h-32 object-cover rounded-xl mt-3 border border-slate-700" />
                      )}

                      {block.ctaText && (
                        <button className="mt-3 px-4 py-2 bg-amber-500 text-slate-950 font-black rounded-xl text-xs shadow-md">
                          {block.ctaText}
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Right Col: Section Property Inspector (3 cols) */}
            <div className="lg:col-span-3 bg-slate-950 border border-slate-800 rounded-2xl p-4 space-y-4">
              <h3 className="text-xs font-black uppercase tracking-wider text-amber-400 flex items-center gap-1.5 border-b border-slate-800 pb-2">
                <Sliders className="w-4 h-4" /> Block Inspector
              </h3>

              {selectedBlock ? (
                <div className="space-y-3 text-xs font-bold">
                  <div>
                    <label className="block text-slate-300 mb-1">Section Title</label>
                    <input
                      type="text"
                      value={selectedBlock.title}
                      onChange={(e) => handleUpdateSelectedBlockProp('title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Content Text</label>
                    <textarea
                      rows={3}
                      value={selectedBlock.content}
                      onChange={(e) => handleUpdateSelectedBlockProp('content', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                    />
                  </div>

                  {selectedBlock.imageUrl !== undefined && (
                    <div>
                      <label className="block text-slate-300 mb-1">Image URL</label>
                      <input
                        type="text"
                        value={selectedBlock.imageUrl || ''}
                        onChange={(e) => handleUpdateSelectedBlockProp('imageUrl', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono text-[11px]"
                      />
                    </div>
                  )}

                  {selectedBlock.ctaText !== undefined && (
                    <div>
                      <label className="block text-slate-300 mb-1">Button CTA Text</label>
                      <input
                        type="text"
                        value={selectedBlock.ctaText || ''}
                        onChange={(e) => handleUpdateSelectedBlockProp('ctaText', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2 text-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-300 mb-1">Padding Y (px)</label>
                    <input
                      type="range"
                      min={10}
                      max={80}
                      value={selectedBlock.paddingY || 32}
                      onChange={(e) => handleUpdateSelectedBlockProp('paddingY', parseInt(e.target.value))}
                      className="w-full accent-amber-500 cursor-pointer"
                    />
                    <span className="text-[10px] text-amber-400">{selectedBlock.paddingY || 32}px Vertical Padding</span>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedBlock.backgroundColor || '#0F172A'}
                        onChange={(e) => handleUpdateSelectedBlockProp('backgroundColor', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={selectedBlock.backgroundColor || '#0F172A'}
                        onChange={(e) => handleUpdateSelectedBlockProp('backgroundColor', e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1">Text Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedBlock.textColor || '#FFFFFF'}
                        onChange={(e) => handleUpdateSelectedBlockProp('textColor', e.target.value)}
                        className="w-8 h-8 rounded-lg cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={selectedBlock.textColor || '#FFFFFF'}
                        onChange={(e) => handleUpdateSelectedBlockProp('textColor', e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2 text-white font-mono text-[11px]"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-12 text-slate-400 text-xs">
                  Select a section from the canvas or section list to edit properties.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: HEADER & FOOTER BUILDER */}
      {/* ========================================================================= */}
      {studioTab === 'header_footer' && (
        <div className="space-y-6 text-xs font-bold">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Header Builder */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-black uppercase text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Layers className="w-4 h-4" /> Header & Announcement Builder
              </h3>

              <div>
                <label className="block text-slate-300 mb-1">Store Logo Image URL</label>
                <input
                  type="text"
                  value={themeConfig.logoUrl}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, logoUrl: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-[11px]"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Announcement Bar Text</label>
                <input
                  type="text"
                  value={themeConfig.announcementText}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, announcementText: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  { key: 'showAnnouncement', label: 'Announcement Bar' },
                  { key: 'showSearchBar', label: 'Search Bar' },
                  { key: 'showCategoriesDropdown', label: 'Categories Menu' },
                  { key: 'showLanguageSelector', label: 'Language Selector' },
                  { key: 'showCurrencySelector', label: 'Currency Switcher' },
                  { key: 'showWishlistIcon', label: 'Wishlist Button' },
                  { key: 'showCartIcon', label: 'Cart Drawer Icon' },
                  { key: 'showTrackOrderLink', label: 'Track Order Link' },
                  { key: 'showAccountLink', label: 'Account Portal' },
                  { key: 'stickyHeader', label: 'Sticky Header Bar' }
                ].map((item) => (
                  <label key={item.key} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-slate-200">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={Boolean((themeConfig as any)[item.key])}
                      onChange={(e) => onUpdateThemeConfig({ ...themeConfig, [item.key]: e.target.checked })}
                      className="accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>

            {/* Footer Builder */}
            <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-4">
              <h3 className="text-sm font-black uppercase text-amber-400 flex items-center gap-2 border-b border-slate-800 pb-3">
                <Layers className="w-4 h-4" /> Footer Layout & Policy Links
              </h3>

              <div>
                <label className="block text-slate-300 mb-1">Copyright Statement</label>
                <input
                  type="text"
                  value={themeConfig.copyrightText || ''}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, copyrightText: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 mb-1">Support Email Address</label>
                <input
                  type="text"
                  value={themeConfig.supportEmail}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, supportEmail: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>

              <div className="grid grid-cols-2 gap-2 pt-2">
                {[
                  { key: 'showPaymentIcons', label: 'Payment Icons (Visa/PayPal)' },
                  { key: 'showTrustBadgesFooter', label: 'Footer Trust Badges' },
                  { key: 'showNewsletterFooter', label: 'Newsletter Signup' }
                ].map((item) => (
                  <label key={item.key} className="p-2.5 bg-slate-900 rounded-xl border border-slate-800 flex items-center justify-between cursor-pointer">
                    <span className="text-slate-200">{item.label}</span>
                    <input
                      type="checkbox"
                      checked={Boolean((themeConfig as any)[item.key])}
                      onChange={(e) => onUpdateThemeConfig({ ...themeConfig, [item.key]: e.target.checked })}
                      className="accent-amber-500 w-4 h-4 cursor-pointer"
                    />
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: MENU & MEGA MENU */}
      {/* ========================================================================= */}
      {studioTab === 'menu_builder' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs font-bold">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <Menu className="w-5 h-5 text-amber-400" /> Unlimited Navigation & Mega Menu Builder
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">Manage links, dropdowns, icons, and mega menu columns without writing HTML.</p>
            </div>

            <div className="flex items-center gap-2">
              {(['main_nav', 'footer_links', 'mega_menu_1', 'mobile_drawer'] as const).map((mId) => (
                <button
                  key={mId}
                  onClick={() => setActiveMenuId(mId)}
                  className={`px-3 py-1.5 rounded-xl capitalize transition ${
                    activeMenuId === mId ? 'bg-amber-500 text-slate-950 font-black' : 'bg-slate-900 text-slate-300'
                  }`}
                >
                  {mId.replace(/_/g, ' ')}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left: Add Menu Item */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3">
              <h4 className="text-xs font-black uppercase text-amber-400">Add Menu Item</h4>
              <div>
                <label className="block text-slate-300 mb-1">Item Label</label>
                <input
                  type="text"
                  value={newMenuLabel}
                  onChange={(e) => setNewMenuLabel(e.target.value)}
                  placeholder="e.g. Flash Deals"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Target Link URL</label>
                <input
                  type="text"
                  value={newMenuUrl}
                  onChange={(e) => setNewMenuUrl(e.target.value)}
                  placeholder="e.g. /products?category=Deals"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Badge Tag (Optional)</label>
                <input
                  type="text"
                  value={newMenuBadge}
                  onChange={(e) => setNewMenuBadge(e.target.value)}
                  placeholder="e.g. HOT or 50% OFF"
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                />
              </div>
              <button
                onClick={() => {
                  if (!newMenuLabel) return;
                  setMenuItems([
                    ...menuItems,
                    {
                      id: 'm-' + Date.now(),
                      label: newMenuLabel,
                      url: newMenuUrl || '/',
                      icon: 'Tag',
                      badge: newMenuBadge
                    }
                  ]);
                  setNewMenuLabel('');
                  setNewMenuUrl('');
                  setNewMenuBadge('');
                }}
                className="w-full py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs"
              >
                Add Menu Item
              </button>
            </div>

            {/* Right: Active Menu List */}
            <div className="md:col-span-2 space-y-2">
              {menuItems.map((item, idx) => (
                <div key={item.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-5 h-5 rounded-full bg-slate-800 text-amber-400 flex items-center justify-center font-mono text-[10px]">
                      {idx + 1}
                    </span>
                    <span className="font-extrabold text-white">{item.label}</span>
                    <span className="text-[11px] font-mono text-slate-400">({item.url})</span>
                    {item.badge && (
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-[9px] font-black px-2 py-0.5 rounded-full">
                        {item.badge}
                      </span>
                    )}
                  </div>

                  <button
                    onClick={() => setMenuItems(menuItems.filter((m) => m.id !== item.id))}
                    className="p-1 text-slate-400 hover:text-rose-400"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: GLOBAL DESIGN SYSTEM */}
      {/* ========================================================================= */}
      {studioTab === 'global_design' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs font-bold">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Palette className="w-5 h-5 text-amber-400" /> Global Design System & Styling Rules
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Color Palette */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="font-black text-amber-400 uppercase text-xs">Color Scheme</h4>
              <div>
                <label className="text-slate-300 block mb-1">Primary Color</label>
                <input
                  type="color"
                  value={themeConfig.primaryColor}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, primaryColor: e.target.value })}
                  className="w-full h-9 rounded-xl cursor-pointer bg-transparent"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Secondary Color</label>
                <input
                  type="color"
                  value={themeConfig.secondaryColor}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, secondaryColor: e.target.value })}
                  className="w-full h-9 rounded-xl cursor-pointer bg-transparent"
                />
              </div>
              <div>
                <label className="text-slate-300 block mb-1">Accent Color</label>
                <input
                  type="color"
                  value={themeConfig.accentColor}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, accentColor: e.target.value })}
                  className="w-full h-9 rounded-xl cursor-pointer bg-transparent"
                />
              </div>
            </div>

            {/* Typography */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="font-black text-amber-400 uppercase text-xs">Typography & Fonts</h4>
              <div>
                <label className="text-slate-300 block mb-1">Heading Font Family</label>
                <select
                  value={themeConfig.fontFamilyHeading}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, fontFamilyHeading: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                >
                  <option value="Playfair Display">Playfair Display (Serif Luxury)</option>
                  <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Clean)</option>
                  <option value="Montserrat">Montserrat (Geometric Sans)</option>
                  <option value="Cinzel">Cinzel (High Fashion)</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Base Font Size (px)</label>
                <input
                  type="range"
                  min={12}
                  max={20}
                  value={themeConfig.fontSizeBase || 16}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, fontSizeBase: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-amber-400 font-mono">{themeConfig.fontSizeBase || 16}px</span>
              </div>
            </div>

            {/* Component Shapes & Presets */}
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
              <h4 className="font-black text-amber-400 uppercase text-xs">Buttons & Shapes</h4>
              <div>
                <label className="text-slate-300 block mb-1">Button Radius Style</label>
                <select
                  value={themeConfig.buttonStyle}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, buttonStyle: e.target.value as any })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2 text-white"
                >
                  <option value="rounded-full">Pill / Rounded Full</option>
                  <option value="rounded-xl">Smooth Rounded XL</option>
                  <option value="rounded-md">Standard Rounded MD</option>
                  <option value="square">Sharp Square</option>
                </select>
              </div>

              <div>
                <label className="text-slate-300 block mb-1">Card Border Radius (px)</label>
                <input
                  type="range"
                  min={0}
                  max={24}
                  value={themeConfig.borderRadius}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, borderRadius: parseInt(e.target.value) })}
                  className="w-full accent-amber-500 cursor-pointer"
                />
                <span className="text-amber-400 font-mono">{themeConfig.borderRadius}px Radius</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 5: AI WEBSITE COPILOT */}
      {/* ========================================================================= */}
      {studioTab === 'ai_editor' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs font-bold">
          <div>
            <h3 className="text-base font-black text-white flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-400" /> Natural Language AI Website Copilot
            </h3>
            <p className="text-slate-400 text-xs mt-0.5">
              Type natural language instructions to redesign pages, adjust global styles, or insert sale sections.
            </p>
          </div>

          <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-3">
            <div className="flex gap-2">
              <input
                type="text"
                value={aiPromptInput}
                onChange={(e) => setAiPromptInput(e.target.value)}
                placeholder='e.g. "Make the homepage dark modern with gold rounded buttons and a countdown timer"'
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-3 text-white text-xs focus:outline-none focus:border-amber-500"
              />
              <button
                onClick={handleRunAiAssistant}
                disabled={isAiProcessing}
                className="px-5 py-3 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl shadow-md transition flex items-center gap-2 disabled:opacity-50"
              >
                <Sparkles className={`w-4 h-4 ${isAiProcessing ? 'animate-spin' : ''}`} />
                <span>{isAiProcessing ? 'Applying Changes...' : 'Execute AI Edits'}</span>
              </button>
            </div>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {[
                'Make homepage dark gold',
                'Add Black Friday countdown banner',
                'Change all buttons to rounded pills',
                'Set footer to 4 columns',
                'Increase font size to 18px'
              ].map((promptText) => (
                <button
                  key={promptText}
                  onClick={() => setAiPromptInput(promptText)}
                  className="px-2.5 py-1 bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800 rounded-lg text-[11px]"
                >
                  "{promptText}"
                </button>
              ))}
            </div>
          </div>

          {aiProposedDiff && (
            <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-emerald-300 space-y-1">
              <div className="font-black flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> AI Command Successfully Applied Live!
              </div>
              <p className="text-xs">{aiProposedDiff}</p>
            </div>
          )}
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 6: MEDIA LIBRARY */}
      {/* ========================================================================= */}
      {studioTab === 'media_library' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs font-bold">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <ImageIcon className="w-5 h-5 text-amber-400" /> Media Asset Manager & AI Studio
              </h3>
              <p className="text-slate-400 text-xs mt-0.5">Manage photos, banners, logos, and generate custom visuals with AI.</p>
            </div>

            <div className="flex items-center gap-2">
              <input
                type="text"
                value={mediaSearchQuery}
                onChange={(e) => setMediaSearchQuery(e.target.value)}
                placeholder="Search assets..."
                className="bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-white text-xs"
              />
            </div>
          </div>

          {/* AI Image Studio Generator Box */}
          <div className="p-4 bg-slate-900 border border-amber-500/30 rounded-2xl space-y-2">
            <h4 className="text-xs font-black uppercase text-amber-400 flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" /> Gemini AI Image Generator
            </h4>
            <div className="flex gap-2">
              <input
                type="text"
                value={aiImagePrompt}
                onChange={(e) => setAiImagePrompt(e.target.value)}
                placeholder="e.g. Minimalist luxury watch packaging on black marble with soft lighting..."
                className="flex-1 bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-xs text-white"
              />
              <button
                onClick={handleGenerateAiMedia}
                disabled={isGeneratingAiImage}
                className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>{isGeneratingAiImage ? 'Generating...' : 'Generate Visual'}</span>
              </button>
            </div>
          </div>

          {/* Media Assets Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {filteredMediaAssets.map((asset) => (
              <div key={asset.id} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl group">
                <img src={asset.url} alt={asset.name} className="w-full h-28 object-cover rounded-xl mb-2 border border-slate-800" />
                <span className="font-extrabold text-white text-xs block truncate">{asset.name}</span>
                <span className="text-[10px] text-slate-400 block">{asset.folder} • {(asset.sizeBytes / 1024 / 1024).toFixed(2)} MB</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 7: SEO & CODE INJECTIONS */}
      {/* ========================================================================= */}
      {studioTab === 'seo_code' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs font-bold">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Search className="w-5 h-5 text-amber-400" /> SEO Optimization & Code Injections
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-amber-400">SEO & Social Cards</h4>
              <div>
                <label className="block text-slate-300 mb-1">Global Site Title</label>
                <input
                  type="text"
                  value={seoConfig.siteTitle}
                  onChange={(e) => onUpdateSEOConfig({ ...seoConfig, siteTitle: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Meta Description</label>
                <textarea
                  rows={3}
                  value={seoConfig.siteDescription}
                  onChange={(e) => onUpdateSEOConfig({ ...seoConfig, siteDescription: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white"
                />
              </div>
            </div>

            <div className="space-y-3">
              <h4 className="text-xs font-black uppercase text-amber-400">Tracking Pixels & Analytics</h4>
              <div>
                <label className="block text-slate-300 mb-1">Google Analytics Measurement ID</label>
                <input
                  type="text"
                  value={themeConfig.googleAnalyticsId || ''}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, googleAnalyticsId: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-[11px]"
                />
              </div>
              <div>
                <label className="block text-slate-300 mb-1">Facebook Pixel ID</label>
                <input
                  type="text"
                  value={themeConfig.facebookPixelId || ''}
                  onChange={(e) => onUpdateThemeConfig({ ...themeConfig, facebookPixelId: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-[11px]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 8: EMAIL TEMPLATES */}
      {/* ========================================================================= */}
      {studioTab === 'email_editor' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs font-bold">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Mail className="w-5 h-5 text-amber-400" /> Automated Store Email Templates
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="space-y-2">
              {emailTemplates.map((tmpl) => (
                <button
                  key={tmpl.id}
                  onClick={() => setSelectedEmailId(tmpl.id)}
                  className={`w-full text-left p-3 rounded-xl border transition ${
                    selectedEmailId === tmpl.id
                      ? 'bg-amber-500 text-slate-950 font-black border-amber-500'
                      : 'bg-slate-900 border-slate-800 text-slate-300'
                  }`}
                >
                  {tmpl.name}
                </button>
              ))}
            </div>

            {activeEmailTemplate && (
              <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-2xl p-4 space-y-3">
                <div>
                  <label className="block text-slate-300 mb-1">Subject Line</label>
                  <input
                    type="text"
                    value={activeEmailTemplate.subject}
                    onChange={(e) => {
                      const updated = emailTemplates.map((t) => (t.id === activeEmailTemplate.id ? { ...t, subject: e.target.value } : t));
                      onUpdateEmailTemplates(updated);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 mb-1">HTML Template Body</label>
                  <textarea
                    rows={8}
                    value={activeEmailTemplate.bodyHtml}
                    onChange={(e) => {
                      const updated = emailTemplates.map((t) => (t.id === activeEmailTemplate.id ? { ...t, bodyHtml: e.target.value } : t));
                      onUpdateEmailTemplates(updated);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white font-mono text-[11px]"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 9: CMS & LEGAL POLICIES */}
      {/* ========================================================================= */}
      {studioTab === 'cms_content' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs font-bold">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <FileText className="w-5 h-5 text-amber-400" /> CMS Articles & Store Legal Policies
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="font-black text-amber-400">UK GDPR Privacy Policy Statement</h4>
              <textarea
                rows={5}
                defaultValue="Ahmadify Commerce Platform Ltd processes user data strictly for order dispatch, fraud prevention, and customer care."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
              <button className="px-3 py-1.5 bg-amber-500 text-slate-950 font-black rounded-xl">Save Document</button>
            </div>

            <div className="p-4 bg-slate-900 border border-slate-800 rounded-2xl space-y-2">
              <h4 className="font-black text-amber-400">30-Day Return Policy Statement</h4>
              <textarea
                rows={5}
                defaultValue="Returns are accepted within 30 days of UK delivery with pre-paid return shipping vouchers."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-white"
              />
              <button className="px-3 py-1.5 bg-amber-500 text-slate-950 font-black rounded-xl">Save Document</button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 10: PUBLISHING & SNAPSHOTS */}
      {/* ========================================================================= */}
      {studioTab === 'publishing' && (
        <div className="bg-slate-950 border border-slate-800 rounded-2xl p-6 space-y-6 text-xs font-bold">
          <h3 className="text-base font-black text-white flex items-center gap-2 border-b border-slate-800 pb-3">
            <Shield className="w-5 h-5 text-amber-400" /> System Snapshots & One-Click Rollback
          </h3>

          <div className="flex gap-2">
            <input
              type="text"
              value={backupDescInput}
              onChange={(e) => setBackupDescInput(e.target.value)}
              placeholder="Backup label e.g. Pre-Black Friday campaign snapshot..."
              className="flex-1 bg-slate-900 border border-slate-800 rounded-xl p-2.5 text-white text-xs"
            />
            <button
              onClick={() => {
                onCreateBackup(backupDescInput || 'Manual Owner Backup');
                setBackupDescInput('');
                alert('System snapshot backup point created!');
              }}
              className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black rounded-xl text-xs flex items-center gap-1.5"
            >
              <Download className="w-4 h-4" /> Create Snapshot
            </button>
          </div>

          <div className="space-y-3">
            {backups.map((bak) => (
              <div key={bak.id} className="p-3 bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-amber-300">{bak.description}</span>
                  <span className="text-slate-400 block text-[11px]">{bak.timestamp} • By {bak.creator} ({bak.sizeMb} MB)</span>
                </div>
                <button
                  onClick={() => {
                    onRestoreBackup(bak.id);
                    alert('System state restored to backup checkpoint!');
                  }}
                  className="px-3 py-1.5 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black rounded-xl text-xs"
                >
                  Rollback to Snapshot
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
