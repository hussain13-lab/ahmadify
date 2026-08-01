import React, { useState } from 'react';
import { X, Search, Truck, CheckCircle2, Clock, Package, PhoneCall, ExternalLink } from 'lucide-react';
import { Order, CompanyInfo } from '../types';

interface OrderTrackingModalProps {
  isOpen: boolean;
  onClose: () => void;
  orders: Order[];
  companyInfo: CompanyInfo;
  onViewInvoice: (o: Order) => void;
}

export const OrderTrackingModal: React.FC<OrderTrackingModalProps> = ({
  isOpen,
  onClose,
  orders,
  companyInfo,
  onViewInvoice,
}) => {
  if (!isOpen) return null;

  const [searchRef, setSearchRef] = useState('');
  const [activeOrder, setActiveOrder] = useState<Order | null>(orders[0] || null);
  const [searchError, setSearchError] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchRef.trim()) return;

    const found = orders.find(
      (o) =>
        o.orderNumber.toLowerCase() === searchRef.trim().toLowerCase() ||
        o.customerEmail.toLowerCase() === searchRef.trim().toLowerCase()
    );

    if (found) {
      setActiveOrder(found);
      setSearchError('');
    } else {
      setSearchError(`No order found with reference or email "${searchRef}".`);
    }
  };

  const getStepStatus = (stepName: string, currentStatus: string) => {
    const statuses = ['pending', 'paid', 'processing', 'shipped', 'delivered'];
    const currentIndex = statuses.indexOf(currentStatus.toLowerCase());
    const stepIndex = statuses.indexOf(stepName);

    if (stepIndex < currentIndex) return 'completed';
    if (stepIndex === currentIndex) return 'current';
    return 'upcoming';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 border border-slate-200">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <div className="flex items-center gap-2">
            <Truck className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-base tracking-wide">Live Order Tracking</h2>
          </div>
          <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white rounded-lg">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 space-y-6">
          {/* Order Search Bar */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <div className="relative flex-1">
              <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
              <input
                type="text"
                placeholder="Enter Order Number (e.g. AHM-98241) or Email..."
                value={searchRef}
                onChange={(e) => setSearchRef(e.target.value)}
                className="w-full bg-slate-50 border border-slate-300 rounded-xl pl-9 pr-3 py-2.5 text-xs text-slate-900 focus:outline-none focus:border-amber-500 font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-5 py-2.5 rounded-xl font-bold text-xs shadow-md transition-colors"
            >
              Search
            </button>
          </form>

          {searchError && <p className="text-xs text-rose-600 font-bold">{searchError}</p>}

          {/* Active Order Details */}
          {activeOrder ? (
            <div className="space-y-6">
              {/* Order Info Card */}
              <div className="bg-slate-50 border border-slate-200 p-4 rounded-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs">
                <div>
                  <span className="text-slate-400 text-[10px] uppercase font-bold tracking-wider">Order Reference</span>
                  <h3 className="font-mono font-black text-lg text-slate-900">{activeOrder.orderNumber}</h3>
                  <p className="text-slate-500">
                    Placed on: {new Date(activeOrder.createdAt).toLocaleDateString('en-GB')}
                  </p>
                </div>

                <div className="sm:text-right space-y-1">
                  <span className="inline-block bg-amber-500/10 text-amber-700 font-extrabold text-xs px-2.5 py-1 rounded-md border border-amber-300">
                    Status: {activeOrder.orderStatus.toUpperCase()}
                  </span>
                  {activeOrder.trackingNumber && (
                    <p className="font-mono text-[11px] text-slate-600">
                      Tracking: <span className="font-bold text-slate-900">{activeOrder.trackingNumber}</span> ({activeOrder.carrier})
                    </p>
                  )}
                </div>
              </div>

              {/* Progress Stepper Bar */}
              <div className="py-4">
                <h4 className="text-xs font-bold text-slate-900 mb-4 uppercase tracking-wider">
                  Fulfillment Status Tracker
                </h4>
                <div className="relative flex justify-between items-center text-xs">
                  <div className="absolute top-4 left-0 right-0 h-1 bg-slate-200 -z-0" />
                  
                  {[
                    { key: 'paid', label: 'Payment Verified' },
                    { key: 'processing', label: 'CJ Warehouse Prep' },
                    { key: 'shipped', label: 'Shipped (In Transit)' },
                    { key: 'delivered', label: 'Delivered' }
                  ].map((step, idx) => {
                    const st = getStepStatus(step.key, activeOrder.orderStatus);
                    return (
                      <div key={idx} className="flex flex-col items-center relative z-10 text-center">
                        <div
                          className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs transition-colors ${
                            st === 'completed' || st === 'current'
                              ? 'bg-amber-500 text-slate-950 ring-4 ring-amber-100'
                              : 'bg-slate-200 text-slate-500'
                          }`}
                        >
                          {st === 'completed' ? <CheckCircle2 className="w-5 h-5 text-slate-950" /> : idx + 1}
                        </div>
                        <span className={`mt-2 font-semibold text-[11px] ${st === 'current' ? 'text-amber-600 font-bold' : 'text-slate-600'}`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Package Line Items */}
              <div className="border border-slate-200 rounded-xl overflow-hidden text-xs">
                <div className="bg-slate-100 px-4 py-2 font-bold text-slate-800">Order Package Contents</div>
                <div className="divide-y divide-slate-100 p-3">
                  {activeOrder.items.map((item, idx) => (
                    <div key={idx} className="py-2 flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img src={item.image} alt={item.title} className="w-10 h-10 rounded-lg object-cover" />
                        <div>
                          <p className="font-bold text-slate-900">{item.title}</p>
                          <p className="text-[10px] text-slate-400">Qty: {item.quantity} | SKU: {item.sku}</p>
                        </div>
                      </div>
                      <span className="font-bold text-slate-900">£{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <button
                  onClick={() => onViewInvoice(activeOrder)}
                  className="bg-slate-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-slate-800"
                >
                  View Invoice Receipt
                </button>

                <a
                  href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}?text=Hi%20AHMADIFY%20Support,%20I%20am%20enquiring%20about%20Order%20${activeOrder.orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 shadow-md"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Ask Support on WhatsApp</span>
                </a>
              </div>
            </div>
          ) : (
            <p className="text-xs text-slate-500 italic text-center py-6">
              Please enter an order reference above to view live tracking details.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
