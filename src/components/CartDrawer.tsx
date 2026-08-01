import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, Tag, Truck, ShieldCheck, Check } from 'lucide-react';
import { CartItem, CurrencyCode, CompanyInfo } from '../types';
import { formatCurrencyPrice } from '../utils/currencyAndLanguage';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  currency: CurrencyCode;
  companyInfo: CompanyInfo;
  onUpdateQuantity: (productId: string, variantId: string | undefined, newQty: number) => void;
  onRemoveItem: (productId: string, variantId: string | undefined) => void;
  appliedCoupon: string | null;
  discountAmount: number;
  onApplyCoupon: (code: string) => Promise<boolean>;
  onProceedToCheckout: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  currency,
  companyInfo,
  onUpdateQuantity,
  onRemoveItem,
  appliedCoupon,
  discountAmount,
  onApplyCoupon,
  onProceedToCheckout,
}) => {
  if (!isOpen) return null;

  const [couponCode, setCouponCode] = useState('');
  const [couponError, setCouponError] = useState('');
  const [couponSuccess, setCouponSuccess] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const formatPrice = (amount: number) => formatCurrencyPrice(amount, currency);

  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const freeShippingThreshold = companyInfo.freeShippingThreshold || 50;
  const amountNeededForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / freeShippingThreshold) * 100);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponCode.trim()) return;
    setIsApplying(true);
    setCouponError('');
    setCouponSuccess('');

    const success = await onApplyCoupon(couponCode.trim());
    setIsApplying(false);
    if (success) {
      setCouponSuccess(`Coupon "${couponCode.toUpperCase()}" applied!`);
      setCouponCode('');
    } else {
      setCouponError('Invalid coupon code or minimum spend not met.');
    }
  };

  const finalTotal = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-950/70 backdrop-blur-sm">
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col font-sans">
          {/* Drawer Header */}
          <div className="p-4 bg-slate-900 text-white flex items-center justify-between border-b border-slate-800">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-amber-400" />
              <h2 className="font-extrabold text-base tracking-wide">Your Shopping Cart</h2>
              <span className="bg-amber-400 text-slate-950 text-xs px-2 py-0.5 rounded-full font-black">
                {items.reduce((acc, item) => acc + item.quantity, 0)}
              </span>
            </div>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="bg-amber-50 border-b border-amber-200 px-4 py-3 text-xs">
            {amountNeededForFreeShipping > 0 ? (
              <p className="text-slate-800 mb-1.5 flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-amber-600 shrink-0" />
                Add <span className="font-bold text-slate-900">{formatPrice(amountNeededForFreeShipping)}</span> more for <span className="font-bold text-emerald-700">Free Express UK Shipping</span>!
              </p>
            ) : (
              <p className="text-emerald-700 font-bold mb-1.5 flex items-center gap-1.5">
                <Check className="w-4 h-4 text-emerald-600 shrink-0" />
                🎉 You have qualified for FREE Express Shipping!
              </p>
            )}
            <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
              <div
                className="bg-gradient-to-r from-amber-500 to-emerald-500 h-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 divide-y divide-slate-100">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 text-slate-400 space-y-3">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center text-slate-300">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="font-bold text-slate-700 text-sm">Your cart is empty</h3>
                <p className="text-xs">Browse our store and discover factory-direct quality products.</p>
                <button
                  onClick={onClose}
                  className="mt-2 bg-slate-900 text-amber-400 px-4 py-2 rounded-xl font-bold text-xs hover:bg-slate-800"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              items.map((item, idx) => (
                <div key={`${item.productId}-${item.variantId || idx}`} className="py-3 flex gap-3 items-center">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-16 h-16 rounded-xl object-cover border border-slate-200 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-slate-900 truncate">{item.title}</h4>
                    {item.selectedColor && (
                      <p className="text-[11px] text-slate-500">Color: {item.selectedColor}</p>
                    )}
                    <p className="text-xs font-black text-slate-900 mt-1">{formatPrice(item.price)}</p>

                    <div className="flex items-center gap-2 mt-1.5">
                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.variantId, item.quantity - 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 font-bold hover:bg-slate-200"
                        >
                          -
                        </button>
                        <span className="px-2 text-xs font-bold text-slate-900">{item.quantity}</span>
                        <button
                          onClick={() => onUpdateQuantity(item.productId, item.variantId, item.quantity + 1)}
                          className="px-2 py-0.5 text-xs text-slate-600 font-bold hover:bg-slate-200"
                        >
                          +
                        </button>
                      </div>

                      <button
                        onClick={() => onRemoveItem(item.productId, item.variantId)}
                        className="text-slate-400 hover:text-rose-500 p-1"
                        title="Remove"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer & Checkout Action */}
          {items.length > 0 && (
            <div className="p-4 bg-slate-50 border-t border-slate-200 space-y-3">
              {/* Coupon Form */}
              <form onSubmit={handleApplyCoupon} className="flex gap-2">
                <div className="relative flex-1">
                  <Tag className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
                  <input
                    type="text"
                    placeholder="Coupon (e.g. AHMADIFY10)"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="w-full bg-white text-slate-900 pl-8 pr-3 py-2 text-xs rounded-xl border border-slate-300 focus:outline-none focus:border-amber-400 uppercase"
                  />
                </div>
                <button
                  type="submit"
                  disabled={isApplying}
                  className="bg-slate-900 text-white px-3 py-2 rounded-xl font-bold text-xs hover:bg-slate-800 disabled:opacity-50"
                >
                  {isApplying ? 'Checking...' : 'Apply'}
                </button>
              </form>

              {couponError && <p className="text-[11px] text-rose-600 font-medium">{couponError}</p>}
              {couponSuccess && <p className="text-[11px] text-emerald-600 font-bold">{couponSuccess}</p>}
              {appliedCoupon && (
                <div className="flex items-center justify-between bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs text-emerald-800 font-semibold">
                  <span>Code "{appliedCoupon}" active</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              {/* Subtotal & Breakdown */}
              <div className="space-y-1.5 text-xs text-slate-600 pt-1">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-medium">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>UK VAT (20% Incl.)</span>
                  <span>{formatPrice(finalTotal * 0.2)}</span>
                </div>
                <div className="flex justify-between text-base font-black text-slate-950 border-t border-slate-200 pt-2">
                  <span>Estimated Total</span>
                  <span>{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Proceed to Checkout Button */}
              <button
                onClick={() => {
                  onClose();
                  onProceedToCheckout();
                }}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 py-3 rounded-xl font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 transform hover:scale-[1.01]"
              >
                <span>Proceed to Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="flex items-center justify-center gap-2 text-[10px] text-slate-400 text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
                <span>PCI-Compliant 256-Bit SSL Encrypted Checkout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
