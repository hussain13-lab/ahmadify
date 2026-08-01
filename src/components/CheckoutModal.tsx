import React, { useState } from 'react';
import {
  X,
  ShieldCheck,
  CreditCard,
  Truck,
  CheckCircle2,
  Lock,
  Printer,
  ShoppingBag,
  ArrowLeft,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { CartItem, CurrencyCode, CompanyInfo, Order, PaymentMethod } from '../types';
import { formatCurrencyPrice } from '../utils/currencyAndLanguage';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  subtotal: number;
  discountAmount: number;
  currency: CurrencyCode;
  companyInfo: CompanyInfo;
  onCompleteOrder: (order: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'updatedAt'>) => Promise<Order>;
  onViewInvoice: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  subtotal,
  discountAmount,
  currency,
  companyInfo,
  onCompleteOrder,
  onViewInvoice,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);

  // Form State
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [postcode, setPostcode] = useState('');
  const [country, setCountry] = useState('United Kingdom');

  // Shipping & Payment selection
  const [shippingMethod, setShippingMethod] = useState<'standard' | 'express'>('standard');
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('stripe');

  // Stripe Simulated Card Inputs
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [cardExpiry, setCardExpiry] = useState('12/28');
  const [cardCvc, setCardCvc] = useState('123');

  const [isProcessing, setIsProcessing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  const formatPrice = (amount: number) => formatCurrencyPrice(amount, currency);

  const shippingCost =
    subtotal >= companyInfo.freeShippingThreshold
      ? 0
      : shippingMethod === 'express'
      ? 8.99
      : companyInfo.defaultShippingFee || 4.99;

  const taxAmount = Number(((subtotal - discountAmount) * (companyInfo.defaultTaxRatePercent / 100)).toFixed(2));
  const totalAmount = Number((subtotal - discountAmount + shippingCost).toFixed(2));

  const handleNextToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !street || !city || !postcode) {
      alert('Please fill in all required shipping address fields.');
      return;
    }
    setStep(2);
  };

  const handleSubmitOrder = async () => {
    setIsProcessing(true);

    // Call API / complete order handler
    try {
      const orderPayload = {
        customerName,
        customerEmail,
        customerPhone: customerPhone || '+44 7700 900000',
        shippingAddress: {
          fullName: customerName,
          street,
          city,
          postcode,
          country,
          phone: customerPhone || '+44 7700 900000',
        },
        items,
        subtotal,
        taxAmount,
        shippingCost,
        discountAmount,
        totalAmount,
        currency,
        paymentMethod,
        paymentStatus: paymentMethod === 'cod' ? ('unpaid' as const) : ('paid' as const),
        orderStatus: 'paid' as const,
        cjSyncStatus: 'pending' as const,
      };

      const created = await onCompleteOrder(orderPayload);
      setCompletedOrder(created);
      setIsProcessing(false);
      setStep(4);
    } catch (err) {
      console.error('Order creation error:', err);
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden my-8 max-h-[90vh] flex flex-col">
        {/* Header bar */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4 text-emerald-400" />
            <span className="font-extrabold text-sm tracking-wide">
              {companyInfo.name} Secure Checkout
            </span>
          </div>
          {step !== 4 && (
            <button onClick={onClose} className="p-1 text-slate-400 hover:text-white rounded-lg">
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Stepper Progress */}
        {step !== 4 && (
          <div className="bg-slate-100 px-6 py-2.5 border-b border-slate-200 flex items-center justify-between text-xs font-bold text-slate-600">
            <span className={step >= 1 ? 'text-amber-600 font-black' : ''}>1. Shipping Info</span>
            <span>→</span>
            <span className={step >= 2 ? 'text-amber-600 font-black' : ''}>2. Delivery Method</span>
            <span>→</span>
            <span className={step >= 3 ? 'text-amber-600 font-black' : ''}>3. Payment</span>
          </div>
        )}

        {/* Modal Scrollable Body */}
        <div className="p-6 overflow-y-auto flex-1">
          {/* STEP 1: Shipping Address Form */}
          {step === 1 && (
            <form onSubmit={handleNextToPayment} className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Customer & Shipping Address</h3>
              <p className="text-xs text-slate-500">
                Please enter your shipping address for UK or International delivery.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Robert Hughes"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Email Address *</label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. robert@example.co.uk"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Phone Number (WhatsApp Ready)</label>
                  <input
                    type="tel"
                    placeholder="e.g. +44 7700 900077"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Country *</label>
                  <select
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  >
                    <option value="United Kingdom">United Kingdom (UK)</option>
                    <option value="United States">United States (US)</option>
                    <option value="Germany">Germany (EU)</option>
                    <option value="France">France (EU)</option>
                    <option value="Pakistan">Pakistan (PK)</option>
                    <option value="United Arab Emirates">United Arab Emirates (UAE)</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-bold text-slate-700 block mb-1">Street Address *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 12 Baker Street, Apartment 4B"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">City / Town *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. London"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-700 block mb-1">Postcode / ZIP *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. NW1 6XE"
                    value={postcode}
                    onChange={(e) => setPostcode(e.target.value)}
                    className="w-full bg-slate-50 border border-slate-300 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div className="pt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Continue to Delivery Method</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Shipping Method Selection */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Select Delivery Carrier & Speed</h3>

              <div className="space-y-3">
                <label
                  onClick={() => setShippingMethod('standard')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'standard'
                      ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-bold text-xs text-slate-900">Royal Mail 24 Tracked / CJ Express Line</p>
                      <p className="text-[11px] text-slate-500">Estimated Delivery: 2-4 Business Days</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs text-slate-950">
                    {subtotal >= companyInfo.freeShippingThreshold ? 'FREE' : formatPrice(companyInfo.defaultShippingFee)}
                  </span>
                </label>

                <label
                  onClick={() => setShippingMethod('express')}
                  className={`p-4 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    shippingMethod === 'express'
                      ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Sparkles className="w-5 h-5 text-amber-600" />
                    <div>
                      <p className="font-bold text-xs text-slate-900">DHL / FedEx Air Express Courier</p>
                      <p className="text-[11px] text-slate-500">Guaranteed Next Day Delivery across UK / EU</p>
                    </div>
                  </div>
                  <span className="font-extrabold text-xs text-slate-950">{formatPrice(8.99)}</span>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded-xl font-extrabold text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>Continue to Payment</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Payment Options & Order Review */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-extrabold text-slate-900 text-base">Payment Method & Final Review</h3>

              {/* Order Summary Box */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-600">Subtotal ({items.length} items):</span>
                  <span className="font-bold text-slate-900">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-600 font-bold">
                    <span>Discount Applied:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-600">
                  <span>Shipping Cost:</span>
                  <span className="font-bold text-slate-900">{shippingCost === 0 ? 'FREE' : formatPrice(shippingCost)}</span>
                </div>
                <div className="flex justify-between text-slate-600">
                  <span>UK VAT (20% Incl.):</span>
                  <span className="font-bold text-slate-900">{formatPrice(taxAmount)}</span>
                </div>
                <div className="flex justify-between text-sm font-black text-slate-950 border-t border-slate-200 pt-2">
                  <span>Total Payable:</span>
                  <span className="text-amber-600">{formatPrice(totalAmount)}</span>
                </div>
              </div>

              {/* Payment Option Selector */}
              <div className="space-y-3 pt-2">
                <label
                  onClick={() => setPaymentMethod('stripe')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'stripe'
                      ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <CreditCard className="w-4 h-4 text-slate-800" />
                    <div>
                      <p className="font-bold text-xs text-slate-900">Stripe Credit / Debit Card (PCI Secure)</p>
                      <p className="text-[10px] text-slate-500">Supports Visa, Mastercard, American Express</p>
                    </div>
                  </div>
                </label>

                {paymentMethod === 'stripe' && (
                  <div className="p-4 bg-slate-900 text-white rounded-xl space-y-3 text-xs border border-slate-800">
                    <div>
                      <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">
                        Card Number (Simulated Stripe Elements)
                      </label>
                      <input
                        type="text"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                        className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 font-mono text-white focus:outline-none"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">Expiry</label>
                        <input
                          type="text"
                          value={cardExpiry}
                          onChange={(e) => setCardExpiry(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 font-mono text-white focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] uppercase tracking-wider text-slate-400 block mb-1">CVC</label>
                        <input
                          type="text"
                          value={cardCvc}
                          onChange={(e) => setCardCvc(e.target.value)}
                          className="w-full bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 font-mono text-white focus:outline-none"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <label
                  onClick={() => setPaymentMethod('paypal')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'paypal'
                      ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-extrabold text-blue-600 text-xs">PayPal</span>
                    <span className="text-xs text-slate-600">Instant PayPal express checkout</span>
                  </div>
                </label>

                <label
                  onClick={() => setPaymentMethod('cod')}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    paymentMethod === 'cod'
                      ? 'border-amber-500 bg-amber-50/50 ring-2 ring-amber-500/20'
                      : 'border-slate-200 bg-white hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <Truck className="w-4 h-4 text-emerald-600" />
                    <span className="text-xs font-bold text-slate-900">Cash on Delivery (COD)</span>
                  </div>
                </label>
              </div>

              <div className="pt-4 flex justify-between">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={handleSubmitOrder}
                  disabled={isProcessing}
                  className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 px-8 py-3 rounded-xl font-black text-xs shadow-lg transition-all flex items-center gap-2 transform hover:scale-[1.02] disabled:opacity-50"
                >
                  {isProcessing ? (
                    <span>Processing Payment...</span>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay {formatPrice(totalAmount)} Now</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Order Confirmation & Invoice */}
          {step === 4 && completedOrder && (
            <div className="text-center py-6 space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center animate-bounce">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div>
                <h3 className="text-2xl font-black text-slate-900">Order Placed Successfully!</h3>
                <p className="text-xs text-slate-500 mt-1">
                  Thank you for shopping with <span className="font-bold">{companyInfo.name}</span>.
                </p>
                <div className="inline-block bg-slate-100 border border-slate-200 rounded-xl px-4 py-2 mt-3 text-xs font-mono font-bold text-slate-900">
                  Order Ref: <span className="text-amber-600">{completedOrder.orderNumber}</span>
                </div>
              </div>

              <p className="text-xs text-slate-600 max-w-md mx-auto leading-relaxed">
                A pre-formatted, branded order confirmation email has been generated and dispatched to <span className="font-bold text-slate-900">{completedOrder.customerEmail}</span>. Your order is queued for instant UK express fulfillment.
              </p>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={() => onViewInvoice(completedOrder)}
                  className="bg-slate-900 hover:bg-slate-800 text-white px-5 py-2.5 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md"
                >
                  <Printer className="w-4 h-4 text-amber-400" />
                  <span>View / Print Invoice PDF</span>
                </button>

                <button
                  onClick={onClose}
                  className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-6 py-2.5 rounded-xl font-bold text-xs"
                >
                  Back to Store
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
