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
  DollarSign
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
    | 'global_theme'
    | 'media_library'
    | 'email_editor'
    | 'seo_marketing'
    | 'cms_blogs'
    | 'backups_security'
  >('page_builder');

  // Page Builder state
  const [selectedPageId, setSelectedPageId] = useState<PageId>('home');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>('blk-hero-1');

  // Media Manager state
  const [mediaFolder, setMediaFolder] = useState<string>('All');
  const [uploadingMedia, setUploadingMedia] = useState(false);
  const [aiImagePrompt, setAiImagePrompt] = useState('');
  const [isGeneratingAiImage, setIsGeneratingAiImage] = useState(false);

  // Email template editor state
  const [selectedEmailId, setSelectedEmailId] = useState<string>('order_confirmation');
  const activeEmailTemplate = emailTemplates.find((t) => t.id === selectedEmailId) || emailTemplates[0];

  // Backup state
  const [backupDescInput, setBackupDescInput] = useState('');

  // Active page object
  const activePage = pages.find((p) => p.id === selectedPageId) || pages[0];

  // Helper: update active page blocks
  const handleUpdateActivePageBlocks = (updatedBlocks: PageBlock[]) => {
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

    // re-index order
    blocks.forEach((b, idx) => (b.order = idx + 1));
    handleUpdateActivePageBlocks(blocks);
  };

  // Add new block
  const handleAddBlock = (type: BlockType) => {
    const newBlock: PageBlock = {
      id: 'blk-' + Date.now(),
      type,
      title: `New ${type.replace('_', ' ').toUpperCase()} Section`,
      content: 'Custom content block added via Ahmadify No-Code Website Builder.',
      imageUrl: type === 'hero' ? 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80' : undefined,
      ctaText: type === 'hero' || type === 'button' ? 'Shop Collection' : undefined,
      ctaLink: '/products',
      backgroundColor: '#0F172A',
      textColor: '#FFFFFF',
      visible: true,
      order: activePage.blocks.length + 1
    };
    handleUpdateActivePageBlocks([...activePage.blocks, newBlock]);
    setSelectedBlockId(newBlock.id);
  };

  // Delete block
  const handleDeleteBlock = (id: string) => {
    const updated = activePage.blocks.filter((b) => b.id !== id);
    handleUpdateActivePageBlocks(updated);
    if (selectedBlockId === id) setSelectedBlockId(null);
  };

  // Duplicate block
  const handleDuplicateBlock = (block: PageBlock) => {
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
      alert('AI Image successfully created and added to Media Library!');
    }, 1500);
  };

  const selectedBlock = activePage.blocks.find((b) => b.id === selectedBlockId);

  return (
    <div className="bg-slate-900 border border-amber-500/20 rounded-2xl p-6 text-slate-100 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-6 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-400">
            <Layout className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
              Website Owner Studio & Visual Builder
              <span className="px-2.5 py-0.5 text-xs font-semibold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-full">
                100% No-Code Control
              </span>
            </h2>
            <p className="text-slate-400 text-sm mt-0.5">
              Customize pages, global design themes, drag-and-drop sections, media library, emails, SEO, and backups without source code edits.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => alert('All website design and layout changes are live and synchronized!')}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded-xl text-xs transition shadow-lg shadow-emerald-500/10 flex items-center gap-1.5"
          >
            <CheckCircle2 className="w-4 h-4" />
            Publish Changes Live
          </button>
        </div>
      </div>

      {/* Primary Studio Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-3 mb-6 border-b border-slate-800 scrollbar-none">
        {[
          { id: 'page_builder', label: 'Drag & Drop Page Builder', icon: Layout },
          { id: 'global_theme', label: 'Global Design & Colors', icon: Palette },
          { id: 'media_library', label: 'Media Manager & AI Studio', icon: ImageIcon },
          { id: 'email_editor', label: 'Email Template Customizer', icon: Mail },
          { id: 'seo_marketing', label: 'SEO & Marketing Rules', icon: Search },
          { id: 'cms_blogs', label: 'CMS Articles & Legal Pages', icon: FileText },
          { id: 'backups_security', label: 'Backups & Audit Logs', icon: Shield }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = studioTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setStudioTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                isActive
                  ? 'bg-amber-500 text-slate-950 shadow-md'
                  : 'bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white'
              }`}
            >
              <Icon className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* TAB 1: DRAG & DROP PAGE BUILDER */}
      {studioTab === 'page_builder' && (
        <div className="space-y-6">
          {/* Top Bar: Select Page & Device Preview */}
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-4 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 w-full md:w-auto">
              <label className="text-xs font-bold text-amber-300 whitespace-nowrap">Editing Page:</label>
              <select
                value={selectedPageId}
                onChange={(e) => setSelectedPageId(e.target.value as PageId)}
                className="bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-amber-500 font-semibold"
              >
                {pages.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title} ({p.slug})
                  </option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-2 bg-slate-900 p-1.5 rounded-lg border border-slate-800">
              <button
                onClick={() => setPreviewDevice('desktop')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  previewDevice === 'desktop' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-3.5 h-3.5" /> Desktop
              </button>
              <button
                onClick={() => setPreviewDevice('tablet')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  previewDevice === 'tablet' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Tablet className="w-3.5 h-3.5" /> Tablet
              </button>
              <button
                onClick={() => setPreviewDevice('mobile')}
                className={`p-1.5 rounded text-xs flex items-center gap-1 ${
                  previewDevice === 'mobile' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                <Smartphone className="w-3.5 h-3.5" /> Mobile
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Section Blocks Navigator & Add Palette (3 cols) */}
            <div className="lg:col-span-4 bg-slate-800/80 border border-slate-700 rounded-xl p-4 space-y-4">
              <div>
                <h3 className="text-sm font-bold text-white mb-2 flex items-center justify-between">
                  <span>Page Sections ({activePage.blocks.length})</span>
                </h3>
                <p className="text-[11px] text-slate-400 mb-3">Reorder, duplicate, hide, or edit section parameters.</p>

                <div className="space-y-2 max-h-80 overflow-y-auto pr-1">
                  {activePage.blocks.map((block, idx) => {
                    const isSelected = selectedBlockId === block.id;
                    return (
                      <div
                        key={block.id}
                        onClick={() => setSelectedBlockId(block.id)}
                        className={`p-3 rounded-lg border text-xs cursor-pointer transition flex items-center justify-between ${
                          isSelected
                            ? 'bg-amber-500/10 border-amber-500 text-white'
                            : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                        }`}
                      >
                        <div className="flex items-center gap-2 overflow-hidden">
                          <span className="w-5 h-5 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center font-mono text-[10px]">
                            {idx + 1}
                          </span>
                          <span className="font-semibold truncate">{block.title}</span>
                        </div>

                        <div className="flex items-center gap-1" onClick={(e) => e.stopPropagation()}>
                          <button
                            onClick={() => handleMoveBlock(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 hover:text-amber-400 text-slate-400 disabled:opacity-30"
                          >
                            <MoveUp className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleMoveBlock(idx, 'down')}
                            disabled={idx === activePage.blocks.length - 1}
                            className="p-1 hover:text-amber-400 text-slate-400 disabled:opacity-30"
                          >
                            <MoveDown className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleToggleBlockVisibility(block.id)}
                            className="p-1 hover:text-amber-400 text-slate-400"
                          >
                            {block.visible ? <Eye className="w-3 h-3 text-emerald-400" /> : <EyeOff className="w-3 h-3 text-red-400" />}
                          </button>
                          <button
                            onClick={() => handleDuplicateBlock(block)}
                            className="p-1 hover:text-amber-400 text-slate-400"
                          >
                            <Copy className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleDeleteBlock(block.id)}
                            className="p-1 hover:text-red-400 text-slate-400"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="border-t border-slate-700/60 pt-4">
                <h4 className="text-xs font-bold text-amber-300 mb-2">Add New Section Block</h4>
                <div className="grid grid-cols-2 gap-2 text-[11px]">
                  {[
                    { type: 'hero', label: 'Hero Banner' },
                    { type: 'heading', label: 'Heading' },
                    { type: 'paragraph', label: 'Text Block' },
                    { type: 'product_grid', label: 'Product Grid' },
                    { type: 'category_carousel', label: 'Category Slider' },
                    { type: 'countdown_timer', label: 'Countdown' },
                    { type: 'testimonial', label: 'Testimonials' },
                    { type: 'faq_accordion', label: 'FAQ Accordion' },
                    { type: 'trust_badges', label: 'Trust Badges' },
                    { type: 'newsletter_signup', label: 'Newsletter' },
                    { type: 'contact_form', label: 'Contact Form' },
                    { type: 'custom_html', label: 'Custom HTML/CSS' }
                  ].map((item) => (
                    <button
                      key={item.type}
                      onClick={() => handleAddBlock(item.type as BlockType)}
                      className="p-2 bg-slate-900 hover:bg-amber-500/20 text-slate-200 border border-slate-700 hover:border-amber-500 rounded-lg transition text-left font-medium flex items-center gap-1.5"
                    >
                      <Plus className="w-3 h-3 text-amber-400" />
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Middle: Live Visual Page Canvas Preview (5 cols) */}
            <div className="lg:col-span-5 bg-slate-950 border border-slate-800 rounded-xl p-4 flex flex-col items-center min-h-[500px]">
              <div className="w-full flex items-center justify-between border-b border-slate-800 pb-2 mb-4 text-xs text-slate-400">
                <span className="font-mono">Live Visual Canvas Preview</span>
                <span className="text-amber-400 font-semibold">{previewDevice.toUpperCase()} VIEW</span>
              </div>

              <div
                className={`transition-all bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4 w-full overflow-y-auto max-h-[600px] ${
                  previewDevice === 'mobile' ? 'max-w-[340px]' : previewDevice === 'tablet' ? 'max-w-[550px]' : 'w-full'
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
                          ? 'border-amber-500 bg-amber-500/5 ring-1 ring-amber-500'
                          : 'border-slate-800 bg-slate-800/40 hover:border-slate-700'
                      }`}
                      style={{ backgroundColor: block.backgroundColor, color: block.textColor }}
                    >
                      <span className="absolute top-2 right-2 text-[9px] uppercase px-2 py-0.5 bg-slate-950/80 text-amber-300 rounded font-mono">
                        {block.type}
                      </span>
                      <h4 className="font-bold text-sm mb-1">{block.title}</h4>
                      <p className="text-xs opacity-90 line-clamp-3">{block.content}</p>

                      {block.imageUrl && (
                        <img src={block.imageUrl} alt={block.title} className="w-full h-28 object-cover rounded-lg mt-3 border border-slate-700" />
                      )}

                      {block.ctaText && (
                        <button className="mt-3 px-3 py-1.5 bg-amber-500 text-slate-950 font-bold rounded-lg text-xs">
                          {block.ctaText}
                        </button>
                      )}
                    </div>
                  ))}
              </div>
            </div>

            {/* Right: Selected Block Property Inspector (4 cols) */}
            <div className="lg:col-span-3 bg-slate-800/80 border border-slate-700 rounded-xl p-4">
              <h3 className="text-sm font-bold text-white mb-3 flex items-center gap-2 border-b border-slate-700 pb-2">
                <Sliders className="w-4 h-4 text-amber-400" /> Block Inspector
              </h3>

              {selectedBlock ? (
                <div className="space-y-3 text-xs">
                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Section Title</label>
                    <input
                      type="text"
                      value={selectedBlock.title}
                      onChange={(e) => handleUpdateSelectedBlockProp('title', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Content Text</label>
                    <textarea
                      rows={3}
                      value={selectedBlock.content}
                      onChange={(e) => handleUpdateSelectedBlockProp('content', e.target.value)}
                      className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                    />
                  </div>

                  {selectedBlock.imageUrl !== undefined && (
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">Image URL</label>
                      <input
                        type="text"
                        value={selectedBlock.imageUrl || ''}
                        onChange={(e) => handleUpdateSelectedBlockProp('imageUrl', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
                      />
                    </div>
                  )}

                  {selectedBlock.ctaText !== undefined && (
                    <div>
                      <label className="block text-slate-300 mb-1 font-semibold">Button CTA Text</label>
                      <input
                        type="text"
                        value={selectedBlock.ctaText || ''}
                        onChange={(e) => handleUpdateSelectedBlockProp('ctaText', e.target.value)}
                        className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Background Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedBlock.backgroundColor || '#0F172A'}
                        onChange={(e) => handleUpdateSelectedBlockProp('backgroundColor', e.target.value)}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={selectedBlock.backgroundColor || '#0F172A'}
                        onChange={(e) => handleUpdateSelectedBlockProp('backgroundColor', e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-300 mb-1 font-semibold">Text Color</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="color"
                        value={selectedBlock.textColor || '#FFFFFF'}
                        onChange={(e) => handleUpdateSelectedBlockProp('textColor', e.target.value)}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <input
                        type="text"
                        value={selectedBlock.textColor || '#FFFFFF'}
                        onChange={(e) => handleUpdateSelectedBlockProp('textColor', e.target.value)}
                        className="flex-1 bg-slate-900 border border-slate-700 rounded p-1.5 text-white font-mono"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="text-center py-10 text-slate-400 text-xs">
                  Select a block from the left panel to edit its properties.
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: GLOBAL THEME & STYLING */}
      {studioTab === 'global_theme' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Palette className="w-5 h-5 text-amber-400" /> Global Theme, Palette & Branding Engine
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Colors */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <h4 className="font-bold text-amber-300 text-xs">Brand Colors</h4>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Primary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeConfig.primaryColor}
                      onChange={(e) => onUpdateThemeConfig({ ...themeConfig, primaryColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-xs text-white">{themeConfig.primaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Secondary Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeConfig.secondaryColor}
                      onChange={(e) => onUpdateThemeConfig({ ...themeConfig, secondaryColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-xs text-white">{themeConfig.secondaryColor}</span>
                  </div>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Accent Color</label>
                  <div className="flex items-center gap-2">
                    <input
                      type="color"
                      value={themeConfig.accentColor}
                      onChange={(e) => onUpdateThemeConfig({ ...themeConfig, accentColor: e.target.value })}
                      className="w-8 h-8 rounded cursor-pointer bg-transparent"
                    />
                    <span className="font-mono text-xs text-white">{themeConfig.accentColor}</span>
                  </div>
                </div>
              </div>

              {/* Typography */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <h4 className="font-bold text-amber-300 text-xs">Typography & Fonts</h4>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Heading Font</label>
                  <select
                    value={themeConfig.fontFamilyHeading}
                    onChange={(e) => onUpdateThemeConfig({ ...themeConfig, fontFamilyHeading: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                  >
                    <option value="Playfair Display">Playfair Display (Serif Luxury)</option>
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans (Modern Clean)</option>
                    <option value="Montserrat">Montserrat (Geometric Sans)</option>
                    <option value="Cinzel">Cinzel (High Fashion)</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Body Font</label>
                  <select
                    value={themeConfig.fontFamilyBody}
                    onChange={(e) => onUpdateThemeConfig({ ...themeConfig, fontFamilyBody: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                  >
                    <option value="Plus Jakarta Sans">Plus Jakarta Sans</option>
                    <option value="Inter">Inter UI</option>
                    <option value="Roboto">Roboto</option>
                  </select>
                </div>
              </div>

              {/* Layout & Style */}
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
                <h4 className="font-bold text-amber-300 text-xs">Controls & Layout</h4>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Button Radius Style</label>
                  <select
                    value={themeConfig.buttonStyle}
                    onChange={(e) => onUpdateThemeConfig({ ...themeConfig, buttonStyle: e.target.value as any })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                  >
                    <option value="rounded-full">Pill / Rounded Full</option>
                    <option value="rounded-xl">Smooth Rounded XL</option>
                    <option value="rounded-md">Standard Rounded MD</option>
                    <option value="square">Sharp Square</option>
                  </select>
                </div>

                <div>
                  <label className="text-[11px] text-slate-400 block mb-1">Announcement Bar Text</label>
                  <input
                    type="text"
                    value={themeConfig.announcementText}
                    onChange={(e) => onUpdateThemeConfig({ ...themeConfig, announcementText: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: MEDIA LIBRARY & AI STUDIO */}
      {studioTab === 'media_library' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
              <div>
                <h3 className="text-lg font-bold text-white flex items-center gap-2">
                  <ImageIcon className="w-5 h-5 text-amber-400" /> Media Asset Manager & AI Studio
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage banners, product photography, logos, and AI-generated visuals.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    const newAsset: MediaAsset = {
                      id: 'med-' + Date.now(),
                      name: 'uploaded_banner_' + Math.floor(Math.random() * 100) + '.jpg',
                      url: 'https://images.unsplash.com/photo-1511556532299-8f662fc26c06?auto=format&fit=crop&w=800&q=80',
                      type: 'image',
                      sizeBytes: 1200000,
                      folder: 'Banners',
                      createdAt: new Date().toISOString().substring(0, 10)
                    };
                    onAddMediaAsset(newAsset);
                    alert('Uploaded image file successfully added to Media Library!');
                  }}
                  className="px-3.5 py-2 bg-slate-700 hover:bg-slate-600 text-white font-bold text-xs rounded-xl flex items-center gap-1.5"
                >
                  <Upload className="w-4 h-4" /> Bulk Upload File
                </button>
              </div>
            </div>

            {/* AI Image Studio Generator Box */}
            <div className="p-4 bg-slate-900/90 border border-amber-500/30 rounded-xl mb-6">
              <h4 className="text-xs font-bold text-amber-300 mb-2 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-amber-400" /> Gemini AI Image Generator
              </h4>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={aiImagePrompt}
                  onChange={(e) => setAiImagePrompt(e.target.value)}
                  placeholder="e.g. Minimalist luxury smartwatch display on obsidian background..."
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-amber-500"
                />
                <button
                  onClick={handleGenerateAiMedia}
                  disabled={isGeneratingAiImage}
                  className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition disabled:opacity-50"
                >
                  {isGeneratingAiImage ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Sparkles className="w-3.5 h-3.5" />}
                  Generate Asset
                </button>
              </div>
            </div>

            {/* Media Assets Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mediaAssets.map((asset) => (
                <div key={asset.id} className="p-3 bg-slate-900 border border-slate-800 rounded-xl group relative">
                  <img src={asset.url} alt={asset.name} className="w-full h-28 object-cover rounded-lg mb-2 border border-slate-800" />
                  <span className="font-semibold text-white text-xs block truncate">{asset.name}</span>
                  <span className="text-[10px] text-slate-400 block">{asset.folder} • {(asset.sizeBytes / 1024 / 1024).toFixed(2)} MB</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 4: EMAIL TEMPLATES */}
      {studioTab === 'email_editor' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-400" /> Automated Email Templates & AI Copywriter
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-2">
                {emailTemplates.map((tmpl) => (
                  <button
                    key={tmpl.id}
                    onClick={() => setSelectedEmailId(tmpl.id)}
                    className={`w-full text-left p-3 rounded-lg border text-xs font-semibold transition ${
                      selectedEmailId === tmpl.id
                        ? 'bg-amber-500 text-slate-950 font-bold border-amber-500'
                        : 'bg-slate-900/60 border-slate-800 text-slate-300 hover:border-slate-700'
                    }`}
                  >
                    {tmpl.name}
                  </button>
                ))}
              </div>

              {activeEmailTemplate && (
                <div className="md:col-span-3 bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-4">
                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-semibold">Subject Line</label>
                    <input
                      type="text"
                      value={activeEmailTemplate.subject}
                      onChange={(e) => {
                        const updated = emailTemplates.map((t) => (t.id === activeEmailTemplate.id ? { ...t, subject: e.target.value } : t));
                        onUpdateEmailTemplates(updated);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs text-slate-300 mb-1 font-semibold">HTML Template Body</label>
                    <textarea
                      rows={10}
                      value={activeEmailTemplate.bodyHtml}
                      onChange={(e) => {
                        const updated = emailTemplates.map((t) => (t.id === activeEmailTemplate.id ? { ...t, bodyHtml: e.target.value } : t));
                        onUpdateEmailTemplates(updated);
                      }}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-xs text-white font-mono"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: SEO & MARKETING */}
      {studioTab === 'seo_marketing' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Search className="w-5 h-5 text-amber-400" /> Search Engine Optimization & Global Meta Center
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-semibold mb-1">Global Site Title</label>
                <input
                  type="text"
                  value={seoConfig.siteTitle}
                  onChange={(e) => onUpdateSEOConfig({ ...seoConfig, siteTitle: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-1">Canonical URL</label>
                <input
                  type="text"
                  value={seoConfig.canonicalUrl}
                  onChange={(e) => onUpdateSEOConfig({ ...seoConfig, canonicalUrl: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Meta Description</label>
                <textarea
                  rows={2}
                  value={seoConfig.siteDescription}
                  onChange={(e) => onUpdateSEOConfig({ ...seoConfig, siteDescription: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-slate-300 font-semibold mb-1">Robots.txt Content</label>
                <textarea
                  rows={4}
                  value={seoConfig.robotsTxt}
                  onChange={(e) => onUpdateSEOConfig({ ...seoConfig, robotsTxt: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded p-2 text-white font-mono"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 6: CMS & LEGAL PAGES */}
      {studioTab === 'cms_blogs' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-400" /> Content Management System (CMS & Policies)
            </h3>
            <p className="text-xs text-slate-300 mb-4">
              Edit Privacy Policy, Terms & Conditions, Return Policy, Shipping Policy, and Blog Articles directly.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-300">Privacy Policy Document</h4>
                <textarea
                  rows={5}
                  defaultValue="Ahmadify Commerce Platform Ltd is committed to respecting your privacy and protecting your personal data across all multi-supplier transactions..."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
                <button className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded text-xs">Save Document</button>
              </div>

              <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2">
                <h4 className="font-bold text-amber-300">Return & Refund Policy</h4>
                <textarea
                  rows={5}
                  defaultValue="We offer a 30-day money-back guarantee on all verified items shipped through our UK Express supplier network..."
                  className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white"
                />
                <button className="px-3 py-1 bg-amber-500 text-slate-950 font-bold rounded text-xs">Save Document</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 7: BACKUPS & SECURITY */}
      {studioTab === 'backups_security' && (
        <div className="space-y-6">
          <div className="bg-slate-800/80 border border-slate-700 rounded-xl p-6">
            <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
              <Shield className="w-5 h-5 text-amber-400" /> One-Click System Backups & Audit Logs
            </h3>

            <div className="flex gap-2 mb-6">
              <input
                type="text"
                value={backupDescInput}
                onChange={(e) => setBackupDescInput(e.target.value)}
                placeholder="Backup note e.g. Pre-campaign full snapshot..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
              />
              <button
                onClick={() => {
                  onCreateBackup(backupDescInput || 'Manual System Backup');
                  setBackupDescInput('');
                  alert('System state backup point created successfully!');
                }}
                className="py-2 px-4 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold rounded-lg text-xs flex items-center gap-1.5 transition"
              >
                <Download className="w-4 h-4" /> Create System Backup
              </button>
            </div>

            <div className="space-y-3">
              {backups.map((bak) => (
                <div key={bak.id} className="p-3 bg-slate-900 border border-slate-800 rounded-lg flex items-center justify-between text-xs">
                  <div>
                    <span className="font-bold text-amber-300">{bak.description}</span>
                    <span className="text-slate-400 block text-[11px]">{bak.timestamp} • Created by {bak.creator} ({bak.sizeMb} MB)</span>
                  </div>
                  <button
                    onClick={() => {
                      onRestoreBackup(bak.id);
                      alert('System state restored to backup point!');
                    }}
                    className="px-3 py-1 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold rounded text-xs"
                  >
                    Restore
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
