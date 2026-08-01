import React, { useState } from 'react';
import {
  Search,
  ShoppingBag,
  Heart,
  Truck,
  ShieldCheck,
  User,
  LayoutDashboard,
  HelpCircle,
  PhoneCall,
  ChevronDown,
  Sparkles,
  Menu,
  X
} from 'lucide-react';
import { CurrencyCode, LanguageCode, CompanyInfo } from '../types';
import { SUPPORTED_CURRENCIES, SUPPORTED_LANGUAGES } from '../utils/currencyAndLanguage';

interface NavbarProps {
  companyInfo: CompanyInfo;
  cartCount: number;
  wishlistCount: number;
  currentCurrency?: CurrencyCode;
  currency?: CurrencyCode;
  onCurrencyChange?: (c: CurrencyCode) => void;
  onChangeCurrency?: (c: CurrencyCode) => void;
  currentLanguage?: LanguageCode;
  onLanguageChange?: (lang: LanguageCode) => void;
  onOpenCart: () => void;
  onOpenWishlist?: () => void;
  onOpenTrackOrder: () => void;
  onOpenAdmin: () => void;
  onOpenPolicy?: (policyKey: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  selectedCategory?: string;
  onSelectCategory?: (cat: string) => void;
  categories?: string[];
}

export const Navbar: React.FC<NavbarProps> = ({
  companyInfo,
  cartCount,
  wishlistCount,
  currentCurrency,
  currency,
  onCurrencyChange,
  onChangeCurrency,
  currentLanguage = 'en',
  onLanguageChange = (_lang?: LanguageCode) => {},
  onOpenCart,
  onOpenWishlist = () => {},
  onOpenTrackOrder,
  onOpenAdmin,
  onOpenPolicy = (_key?: string) => {},
  searchQuery,
  onSearchChange,
  selectedCategory = 'All',
  onSelectCategory = (_cat?: string) => {},
  categories = []
}) => {
  const activeCurrency = currentCurrency || currency || 'GBP';
  const handleCurrencyChange = onCurrencyChange || onChangeCurrency || ((_c?: CurrencyCode) => {});
  const safeCategories = categories || [];
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const [logoFailed, setLogoFailed] = useState(false);

  const handleLogoError = () => {
    if (logoSrc === '/logo.png') {
      setLogoSrc('/logo.jpg');
    } else {
      setLogoFailed(true);
    }
  };

  const activeCurrencyInfo = SUPPORTED_CURRENCIES.find(c => c.code === activeCurrency) || SUPPORTED_CURRENCIES[0];
  const activeLangInfo = SUPPORTED_LANGUAGES.find(l => l.code === currentLanguage) || SUPPORTED_LANGUAGES[0];

  return (
    <header className="sticky top-0 z-40 bg-slate-900 text-white shadow-md font-sans">
      {/* Top Banner Ribbon */}
      <div className="bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 text-slate-950 px-4 py-1.5 text-xs font-semibold flex flex-wrap items-center justify-between border-b border-amber-400/30">
        <div className="flex items-center space-x-4 mx-auto sm:mx-0">
          <span className="flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 animate-pulse text-slate-950" />
            Official Storefront: <span className="underline">{companyInfo.domain}</span>
          </span>
          <span className="hidden md:inline-block">•</span>
          <span className="hidden md:inline-block">
            Registered in England & Wales ({companyInfo.registeredOffice.city}, UK)
          </span>
        </div>
        <div className="hidden sm:flex items-center space-x-6">
          <a
            href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-slate-900 transition-colors"
          >
            <PhoneCall className="w-3.5 h-3.5" /> WhatsApp: {companyInfo.whatsapp}
          </a>
          <button
            onClick={() => onOpenPolicy('shipping')}
            className="hover:text-slate-900 transition-colors flex items-center gap-1"
          >
            <Truck className="w-3.5 h-3.5" /> Free Tracked Shipping Over £50
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between gap-4">
        {/* Brand Logo */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-slate-300 hover:text-white"

          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
          
          <div
            onClick={() => onSelectCategory('All')}
            className="cursor-pointer flex items-center gap-2.5 group"
          >
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 shadow-lg group-hover:scale-105 transition-transform overflow-hidden flex items-center justify-center shrink-0">
              {!logoFailed ? (
                <img
                  src={logoSrc}
                  alt="ahmadify.store logo"
                  className="w-full h-full object-contain"
                  onError={handleLogoError}
                />
              ) : (
                <div className="w-full h-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center font-black text-slate-950 text-sm rounded-lg shadow-inner">
                  A
                </div>
              )}
            </div>
            <div>
              <div className="font-extrabold text-xl tracking-wider text-white flex items-center gap-1.5">
                AHMADIFY <span className="text-amber-400 text-[11px] font-bold px-1.5 py-0.5 rounded bg-amber-400/10 border border-amber-400/30">ahmadify.store</span>
              </div>
              <div className="text-[10px] text-slate-400 font-medium tracking-tight">
                Official Storefront • www.ahmadify.store
              </div>
            </div>
          </div>
        </div>

        {/* Global Search Bar (Amazon-style) */}
        <div className="hidden md:flex flex-1 max-w-2xl items-center bg-slate-800 rounded-lg border border-slate-700 focus-within:border-amber-400 transition-colors overflow-hidden">
          <select
            value={selectedCategory}
            onChange={(e) => onSelectCategory(e.target.value)}
            className="bg-slate-800 text-slate-300 text-xs px-3 py-2.5 border-r border-slate-700 focus:outline-none cursor-pointer hover:text-white"
          >
            <option value="All">All Categories</option>
            {safeCategories.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Search products, brands, SKUs or CJ items..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-transparent px-3 py-2 text-sm text-white placeholder-slate-400 focus:outline-none"
          />

          <button className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 font-bold transition-colors flex items-center justify-center">
            <Search className="w-4 h-4" />
          </button>
        </div>

        {/* Right Actions Header */}
        <div className="flex items-center space-x-2 sm:space-x-4">
          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1.5 rounded-md border border-slate-700">
              <span className="text-sm">{activeLangInfo.flag}</span>
              <span className="hidden md:inline">{activeLangInfo.name}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <div className="absolute right-0 mt-1 w-36 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 p-1 space-y-0.5">
              <div className="px-2 py-1 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 border-b border-slate-800">
                Language
              </div>
              {SUPPORTED_LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => onLanguageChange(l.code)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs hover:bg-slate-800 rounded flex items-center justify-between ${
                    currentLanguage === l.code ? 'text-amber-400 font-bold bg-slate-800/80' : 'text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{l.flag}</span>
                    <span>{l.nativeName}</span>
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Currency Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1.5 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800 px-2.5 py-1.5 rounded-md border border-slate-700">
              <span className="text-sm">{activeCurrencyInfo.flag}</span>
              <span>{activeCurrency}</span>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>
            <div className="absolute right-0 mt-1 w-44 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all z-50 p-1 space-y-0.5">
              <div className="px-2 py-1 text-[10px] uppercase tracking-wider font-extrabold text-slate-400 border-b border-slate-800">
                Currency
              </div>
              {SUPPORTED_CURRENCIES.map((c) => (
                <button
                  key={c.code}
                  onClick={() => handleCurrencyChange(c.code)}
                  className={`w-full text-left px-2.5 py-1.5 text-xs hover:bg-slate-800 rounded flex items-center justify-between ${
                    activeCurrency === c.code ? 'text-amber-400 font-bold bg-slate-800/80' : 'text-slate-300'
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span>{c.flag}</span>
                    <span>{c.code} ({c.symbol.trim()})</span>
                  </span>
                  <span className="text-[10px] text-slate-400">{c.name}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Track Order */}
          <button
            onClick={onOpenTrackOrder}
            className="hidden sm:flex items-center gap-1.5 text-xs text-slate-300 hover:text-white px-2.5 py-1.5 rounded-md hover:bg-slate-800 transition-colors"
          >
            <Truck className="w-4 h-4 text-amber-400" />
            <span>Track Order</span>
          </button>

          {/* Wishlist */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 text-slate-300 hover:text-white hover:bg-slate-800 rounded-md transition-colors"
            title="Wishlist"
          >
            <Heart className="w-5 h-5 text-rose-400" />
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-rose-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Cart Drawer Toggle */}
          <button
            onClick={onOpenCart}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-3.5 py-2 rounded-lg font-bold text-xs shadow-md transition-all transform hover:scale-[1.02]"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="hidden sm:inline">Cart</span>
            <span className="bg-slate-950 text-amber-400 text-xs px-1.5 py-0.5 rounded-full font-extrabold">
              {cartCount}
            </span>
          </button>

          {/* Admin Switcher */}
          <button
            onClick={onOpenAdmin}
            className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors"
            title="Admin Dashboard"
          >
            <LayoutDashboard className="w-4 h-4 text-emerald-400" />
            <span className="hidden lg:inline">Admin Portal</span>
          </button>
        </div>
      </div>

      {/* Sub Navigation Bar */}
      <div className="bg-slate-950/80 border-t border-slate-800 px-4 py-2 text-xs flex items-center justify-between overflow-x-auto whitespace-nowrap">
        <div className="flex items-center space-x-6 text-slate-300 font-medium">
          <button
            onClick={() => onSelectCategory('All')}
            className={`hover:text-amber-400 transition-colors ${selectedCategory === 'All' ? 'text-amber-400 font-bold border-b border-amber-400 pb-0.5' : ''}`}
          >
            All Products
          </button>
          {safeCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => onSelectCategory(cat)}
              className={`hover:text-amber-400 transition-colors ${selectedCategory === cat ? 'text-amber-400 font-bold border-b border-amber-400 pb-0.5' : ''}`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="hidden md:flex items-center space-x-4 text-slate-400">
          <button onClick={() => onOpenPolicy('about')} className="hover:text-white">About Us</button>
          <button onClick={() => onOpenPolicy('contact')} className="hover:text-white">Contact</button>
          <button onClick={() => onOpenPolicy('faq')} className="hover:text-white">FAQ</button>
          <button onClick={() => onOpenPolicy('shipping')} className="hover:text-white">Shipping Policy</button>
        </div>
      </div>

      {/* Mobile Search & Menu Panel */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900 border-t border-slate-800 p-4 space-y-4">
          <div className="flex items-center bg-slate-800 rounded-lg border border-slate-700 overflow-hidden">
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent px-3 py-2 text-sm text-white focus:outline-none"
            />
            <button className="bg-amber-500 text-slate-950 px-4 py-2 font-bold">
              <Search className="w-4 h-4" />
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs text-slate-300 pt-2 border-t border-slate-800">
            <button onClick={onOpenTrackOrder} className="text-left py-2 hover:text-amber-400 flex items-center gap-2">
              <Truck className="w-4 h-4 text-amber-400" /> Track Order
            </button>
            <button onClick={onOpenAdmin} className="text-left py-2 hover:text-amber-400 flex items-center gap-2">
              <LayoutDashboard className="w-4 h-4 text-emerald-400" /> Admin Dashboard
            </button>
            <button onClick={() => onOpenPolicy('contact')} className="text-left py-2 hover:text-white">
              Contact Us
            </button>
            <button onClick={() => onOpenPolicy('terms')} className="text-left py-2 hover:text-white">
              Terms & Conditions
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
