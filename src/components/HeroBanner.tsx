import React from 'react';
import { ShieldCheck, Truck, Clock, Sparkles, ArrowRight, Zap, RefreshCw } from 'lucide-react';
import { CompanyInfo } from '../types';

interface HeroBannerProps {
  companyInfo: CompanyInfo;
  onExploreClick: () => void;
  onFlashSaleClick: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  companyInfo,
  onExploreClick,
  onFlashSaleClick,
}) => {
  return (
    <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-950 text-white overflow-hidden rounded-2xl mx-4 my-6 shadow-2xl border border-slate-800">
      {/* Background Subtle Accent Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(245,158,11,0.08),transparent_70%)] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-6 py-10 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
        {/* Left Column Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-semibold px-3 py-1.5 rounded-full">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Direct Supplier & CJdropshipping Logistics Verified</span>
          </div>

          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight leading-tight text-white">
            Premium International Commerce by{' '}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-400 via-amber-300 to-amber-500">
              {companyInfo.name}
            </span>
          </h1>

          <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-xl">
            Factory-direct smart electronics, luxury timepieces, and modern living accessories. Built on official UK standards ({companyInfo.registeredOffice.city}, UK) with instant CJdropshipping sync and fast express delivery worldwide.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-2">
            <button
              onClick={onExploreClick}
              className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-6 py-3 rounded-xl font-bold text-sm shadow-lg shadow-amber-500/20 transition-all flex items-center gap-2 transform hover:-translate-y-0.5"
            >
              <span>Explore Collection</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={onFlashSaleClick}
              className="bg-slate-800/80 hover:bg-slate-800 text-amber-400 border border-amber-500/30 px-6 py-3 rounded-xl font-semibold text-sm transition-all flex items-center gap-2"
            >
              <Zap className="w-4 h-4 text-amber-400 fill-amber-400 animate-bounce" />
              <span>Flash Deals - Up to 40% Off</span>
            </button>
          </div>

          {/* Trust Highlights Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 border-t border-slate-800 text-xs">
            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center text-amber-400 shrink-0">
                <Truck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">Free UK Shipping</p>
                <p className="text-[10px] text-slate-400">On orders over £50</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400 shrink-0">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">100% Secure PCI</p>
                <p className="text-[10px] text-slate-400">Stripe & Encrypted</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-400 shrink-0">
                <RefreshCw className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">CJ Auto Sync</p>
                <p className="text-[10px] text-slate-400">Live Inventory</p>
              </div>
            </div>

            <div className="flex items-center gap-2.5 text-slate-300">
              <div className="w-8 h-8 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-400 shrink-0">
                <Clock className="w-4 h-4" />
              </div>
              <div>
                <p className="font-bold text-white">30-Day Guarantee</p>
                <p className="text-[10px] text-slate-400">Easy Returns Policy</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column Featured Spotlight Card */}
        <div className="lg:col-span-5 relative">
          <div className="relative rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 border border-slate-700/80 p-5 shadow-2xl">
            {/* Flash Sale Ribbon Badge */}
            <div className="absolute -top-3 right-4 bg-rose-600 text-white font-black text-xs px-3 py-1 rounded-full shadow-md uppercase tracking-wider flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 fill-white" /> Flash Deal 24H
            </div>

            <div className="aspect-[4/3] rounded-xl overflow-hidden mb-4 relative group">
              <img
                src="https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=800&q=80"
                alt="Ahmadify Pro ANC Headphone"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80" />
              
              <div className="absolute bottom-3 left-3 right-3 text-white">
                <span className="text-[10px] uppercase tracking-widest text-amber-400 font-bold bg-slate-950/80 px-2 py-0.5 rounded">
                  AHMADIFY Audio
                </span>
                <h3 className="font-bold text-lg leading-snug mt-1">
                  Ahmadify Pro ANC Wireless Headphones
                </h3>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-slate-800">
              <div>
                <span className="text-slate-400 line-through mr-2">£139.99</span>
                <span className="text-amber-400 font-extrabold text-lg">£89.99</span>
              </div>
              <div className="text-emerald-400 text-[11px] font-semibold flex items-center gap-1 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                In Stock (25 Units Left)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
