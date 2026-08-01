import React, { useState } from 'react';
import { ShieldCheck, Truck, PhoneCall, Mail, MapPin, Globe, Sparkles, CreditCard, CheckCircle2, ArrowRight } from 'lucide-react';
import { CompanyInfo, SocialLinks } from '../types';

interface FooterProps {
  companyInfo: CompanyInfo;
  socialLinks?: SocialLinks;
  onOpenPolicy: (key: string) => void;
  onOpenTrackOrder: () => void;
}

export const Footer: React.FC<FooterProps> = ({ companyInfo, socialLinks, onOpenPolicy, onOpenTrackOrder }) => {
  const [emailInput, setEmailInput] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [logoSrc, setLogoSrc] = useState('/logo.png');
  const [logoFailed, setLogoFailed] = useState(false);

  const handleLogoError = () => {
    if (logoSrc === '/logo.png') {
      setLogoSrc('/logo.jpg');
    } else {
      setLogoFailed(true);
    }
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmailInput('');
      }, 4000);
    }
  };

  return (
    <footer className="bg-slate-950 text-slate-300 font-sans border-t border-slate-800">
      {/* Top Value Banner */}
      <div className="max-w-7xl mx-auto px-6 py-8 grid grid-cols-1 md:grid-cols-4 gap-6 border-b border-slate-800 text-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center shrink-0 border border-amber-500/20">
            <Truck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-white">Free UK Express Delivery</h4>
            <p className="text-slate-400">On all orders over £{companyInfo.freeShippingThreshold.toFixed(2)}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center shrink-0 border border-emerald-500/20">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-white">100% PCI Encrypted Checkout</h4>
            <p className="text-slate-400">Stripe, Visa & PayPal certified</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/10 text-blue-400 flex items-center justify-center shrink-0 border border-blue-500/20">
            <PhoneCall className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-white">24/7 WhatsApp Support</h4>
            <p className="text-slate-400 font-mono">{companyInfo.whatsapp}</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-purple-500/10 text-purple-400 flex items-center justify-center shrink-0 border border-purple-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-extrabold text-white">CJ Auto Dropship Logistics</h4>
            <p className="text-slate-400">Factory direct quality assurance</p>
          </div>
        </div>
      </div>

      {/* Main Footer Grid */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-8 text-xs">
        {/* Company Info & Registered Office */}
        <div className="lg:col-span-4 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-800 p-0.5 shadow-lg overflow-hidden flex items-center justify-center shrink-0">
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
              <span className="font-black text-xl text-white tracking-wider block">
                AHMADIFY
              </span>
              <span className="text-xs font-bold text-amber-400 tracking-wide block">
                ahmadify.store
              </span>
            </div>
          </div>

          <p className="text-slate-400 leading-relaxed">
            Registered in <strong className="text-slate-200">England and Wales</strong> under Private Company Limited by Shares reg number <span className="text-white font-mono font-bold">{companyInfo.registrationNumber}</span>. Curating and supplying premium smart electronics, luxury timepieces & fashion globally.
          </p>

          <div className="space-y-2 text-slate-400 font-mono text-[11px] bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
            <p className="flex items-start gap-2">
              <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
              <span>
                <strong>Registered Office:</strong><br />
                {companyInfo.registeredOffice.line1}, {companyInfo.registeredOffice.line2}<br />
                {companyInfo.registeredOffice.city}, {companyInfo.registeredOffice.postcode}, {companyInfo.registeredOffice.country}
              </span>
            </p>
            <p className="flex items-center gap-2 pt-1 border-t border-slate-800">
              <Mail className="w-3.5 h-3.5 text-amber-400 shrink-0" />
              <span>{companyInfo.email}</span>
            </p>
            <p className="flex items-center gap-2">
              <PhoneCall className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>WhatsApp: {companyInfo.whatsapp}</span>
            </p>
            <p className="flex items-center gap-2 text-amber-400 font-bold">
              <Globe className="w-3.5 h-3.5 shrink-0" />
              <span>{companyInfo.domain}</span>
            </p>
          </div>
        </div>

        {/* Quick Links */}
        <div className="lg:col-span-2 space-y-3">
          <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">Quick Links</h4>
          <ul className="space-y-2 text-slate-400">
            <li><button onClick={() => onOpenPolicy('about')} className="hover:text-amber-400 transition-colors">About Us</button></li>
            <li><button onClick={() => onOpenPolicy('contact')} className="hover:text-amber-400 transition-colors">Contact Us</button></li>
            <li><button onClick={() => onOpenPolicy('faq')} className="hover:text-amber-400 transition-colors">Help & FAQ</button></li>
            <li><button onClick={onOpenTrackOrder} className="hover:text-amber-400 transition-colors">Track Your Order</button></li>
            <li><button onClick={() => onOpenPolicy('accessibility')} className="hover:text-amber-400 transition-colors">Accessibility Statement</button></li>
          </ul>
        </div>

        {/* Customer Service Policies */}
        <div className="lg:col-span-3 space-y-3">
          <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">Customer Service Policies</h4>
          <ul className="space-y-2 text-slate-400">
            <li><button onClick={() => onOpenPolicy('shipping')} className="hover:text-amber-400 transition-colors">Shipping & Delivery Policy</button></li>
            <li><button onClick={() => onOpenPolicy('refund')} className="hover:text-amber-400 transition-colors">30-Day Return & Refund Policy</button></li>
            <li><button onClick={() => onOpenPolicy('cancellation')} className="hover:text-amber-400 transition-colors">Cancellation Policy</button></li>
            <li><button onClick={() => onOpenPolicy('payment')} className="hover:text-amber-400 transition-colors">Payment Policy</button></li>
            <li><button onClick={() => onOpenPolicy('warranty')} className="hover:text-amber-400 transition-colors">12-Month Warranty Policy</button></li>
          </ul>
        </div>

        {/* Legal Policies & Newsletter */}
        <div className="lg:col-span-3 space-y-4">
          <div className="space-y-3">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">Legal & Compliance</h4>
            <ul className="space-y-2 text-slate-400">
              <li><button onClick={() => onOpenPolicy('terms')} className="hover:text-amber-400 transition-colors">Terms & Conditions</button></li>
              <li><button onClick={() => onOpenPolicy('privacy')} className="hover:text-amber-400 transition-colors">Privacy & Data Policy</button></li>
              <li><button onClick={() => onOpenPolicy('cookie')} className="hover:text-amber-400 transition-colors">Cookie Policy</button></li>
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="pt-2 border-t border-slate-900 space-y-2">
            <h4 className="font-extrabold text-white uppercase tracking-wider text-[11px]">VIP Newsletter</h4>
            <p className="text-slate-400 text-[11px]">
              Subscribe for secret voucher codes (e.g. AHMADIFY10) & flash drops.
            </p>
            {isSubscribed ? (
              <div className="p-2.5 bg-emerald-950/80 border border-emerald-800 rounded-xl text-emerald-300 text-xs font-bold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Subscribed to AHMADIFY offers!</span>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email..."
                  className="w-full bg-slate-900 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                />
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-3 py-2 rounded-xl text-xs transition-colors shrink-0"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Copyright & Payment Methods */}
      <div className="bg-slate-950 border-t border-slate-900 px-6 py-5 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-slate-500 text-[11px]">
          <div className="space-y-1 text-center md:text-left">
            <p>© {new Date().getFullYear()} <strong className="text-slate-300">{companyInfo.name}</strong>. All rights reserved. Registered in England & Wales ({companyInfo.registrationNumber}).</p>
            <p className="text-slate-600">Primary Domain: <a href={companyInfo.domain} className="text-amber-500 hover:underline">{companyInfo.domain}</a></p>
          </div>

          {/* Payment Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="font-bold text-slate-400 mr-1">Accepted Payments:</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-bold">Stripe</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-bold">Visa</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-bold">MasterCard</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-bold">Apple Pay</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-bold">Google Pay</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-bold">PayPal</span>
            <span className="px-2.5 py-1 bg-slate-900 rounded-lg border border-slate-800 text-slate-300 font-bold">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
