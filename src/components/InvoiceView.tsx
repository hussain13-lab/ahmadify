import React from 'react';
import { LogoImage } from './LogoImage';
import { Printer, X, ShieldCheck, Download, ArrowLeft } from 'lucide-react';
import { Order, CompanyInfo } from '../types';

interface InvoiceViewProps {
  order: Order | null;
  companyInfo: CompanyInfo;
  onClose: () => void;
}

export const InvoiceView: React.FC<InvoiceViewProps> = ({ order, companyInfo, onClose }) => {
  const [logoSrc, setLogoSrc] = React.useState('/logo.png');
  const [logoFailed, setLogoFailed] = React.useState(false);

  if (!order) return null;

  const handleLogoError = () => {
    if (logoSrc === '/logo.png') {
      setLogoSrc('/logo.jpg');
    } else {
      setLogoFailed(true);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden my-8 max-h-[95vh] flex flex-col">
        {/* Print / Action Bar Header (hidden during print) */}
        <div className="print:hidden flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800">
          <button
            onClick={onClose}
            className="flex items-center gap-1.5 text-xs text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </button>
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="bg-amber-500 hover:bg-amber-400 text-slate-950 px-4 py-2 rounded-xl text-xs font-black flex items-center gap-1.5 shadow-md"
            >
              <Printer className="w-4 h-4" /> Print / Save PDF
            </button>
            <button onClick={onClose} className="p-1.5 text-slate-400 hover:text-white">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Official Invoice Sheet */}
        <div className="p-8 overflow-y-auto flex-1 bg-white text-slate-900 space-y-8 print:p-0 print:overflow-visible">
          {/* Company & Invoice Title Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start gap-6 border-b border-slate-200 pb-6">
            <div>
              <div className="flex items-center gap-2.5 mb-1">
                <div className="h-10 px-1 rounded-xl bg-white border border-slate-200 shadow-sm overflow-hidden flex items-center justify-center shrink-0">
                  <LogoImage customSrc={companyInfo.logo} alt={`${companyInfo.name} logo`} className="h-9 w-auto max-w-[120px] object-contain" />
                </div>
                <div>
                  <span className="font-extrabold text-2xl tracking-wider text-slate-950 block leading-none">
                    AHMADIFY
                  </span>
                  <span className="text-xs font-bold text-amber-600 tracking-wide block">
                    ahmadify.store
                  </span>
                </div>
              </div>
              <p className="text-xs text-slate-500">{companyInfo.type}</p>
              <p className="text-xs text-slate-500">
                {companyInfo.registeredOffice.line1}, {companyInfo.registeredOffice.line2}
              </p>
              <p className="text-xs text-slate-500">
                {companyInfo.registeredOffice.city}, {companyInfo.registeredOffice.postcode},{' '}
                {companyInfo.registeredOffice.country}
              </p>
              <p className="text-xs text-slate-500 mt-1 font-mono">
                Reg: {companyInfo.registrationNumber} | VAT: {companyInfo.vatNumber}
              </p>
              <p className="text-xs text-slate-500">
                Email: {companyInfo.email} | WhatsApp: {companyInfo.whatsapp}
              </p>
              <p className="text-xs text-amber-600 font-semibold">{companyInfo.domain}</p>
            </div>

            <div className="sm:text-right">
              <span className="inline-block bg-slate-900 text-amber-400 text-xs font-black uppercase px-3 py-1 rounded-md mb-2">
                OFFICIAL TAX INVOICE
              </span>
              <h2 className="text-xl font-mono font-black text-slate-900">{order.orderNumber}</h2>
              <p className="text-xs text-slate-500">
                Date: {new Date(order.createdAt).toLocaleDateString('en-GB')}
              </p>
              <p className="text-xs text-slate-500">
                Payment Status:{' '}
                <span className="font-bold text-emerald-600 uppercase">{order.paymentStatus}</span>
              </p>
              <p className="text-xs text-slate-500">
                Payment Method: <span className="font-semibold">{order.paymentMethod.toUpperCase()}</span>
              </p>
            </div>
          </div>

          {/* Customer & Shipping Details */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs">
            <div>
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                Billed / Shipped To:
              </h4>
              <p className="font-bold text-slate-900 text-sm">{order.shippingAddress.fullName}</p>
              <p className="text-slate-600">{order.shippingAddress.street}</p>
              <p className="text-slate-600">
                {order.shippingAddress.city}, {order.shippingAddress.postcode}
              </p>
              <p className="text-slate-600">{order.shippingAddress.country}</p>
              <p className="text-slate-500 mt-1">Contact: {order.customerEmail}</p>
              <p className="text-slate-500">Phone: {order.customerPhone}</p>
            </div>

            <div>
              <h4 className="font-extrabold text-slate-900 uppercase tracking-wider text-[11px] mb-1">
                Fulfillment & Tracking:
              </h4>
              <p className="text-slate-700">
                Fulfillment Status: <span className="font-bold uppercase text-slate-900">{order.orderStatus}</span>
              </p>
              <p className="text-slate-700">
                Carrier: <span className="font-bold text-slate-900">{order.carrier || 'Royal Mail 24 Tracked'}</span>
              </p>
              <p className="text-slate-700 font-mono">
                Tracking Number: <span className="font-bold text-amber-600">{order.trackingNumber || 'Pending CJ Sync'}</span>
              </p>
            </div>
          </div>

          {/* Line Items Table */}
          <div>
            <table className="w-full text-left text-xs text-slate-700">
              <thead>
                <tr className="border-b-2 border-slate-900 text-slate-900 font-black uppercase tracking-wider text-[11px]">
                  <th className="py-2.5">Item & SKU</th>
                  <th className="py-2.5 text-center">Qty</th>
                  <th className="py-2.5 text-right">Unit Price</th>
                  <th className="py-2.5 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {order.items.map((item, idx) => (
                  <tr key={idx}>
                    <td className="py-3">
                      <p className="font-bold text-slate-900">{item.title}</p>
                      <p className="text-[10px] text-slate-400 font-mono">SKU: {item.sku}</p>
                      {item.selectedColor && (
                        <p className="text-[10px] text-slate-500">Variant: {item.selectedColor}</p>
                      )}
                    </td>
                    <td className="py-3 text-center font-bold text-slate-900">{item.quantity}</td>
                    <td className="py-3 text-right">£{item.price.toFixed(2)}</td>
                    <td className="py-3 text-right font-bold text-slate-900">
                      £{(item.price * item.quantity).toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Financial Breakdown */}
          <div className="flex justify-end pt-2 border-t border-slate-200 text-xs">
            <div className="w-full max-w-xs space-y-1.5">
              <div className="flex justify-between text-slate-600">
                <span>Subtotal:</span>
                <span className="font-bold text-slate-900">£{order.subtotal.toFixed(2)}</span>
              </div>
              {order.discountAmount > 0 && (
                <div className="flex justify-between text-emerald-600 font-semibold">
                  <span>Discount:</span>
                  <span>-£{order.discountAmount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-slate-600">
                <span>Shipping:</span>
                <span className="font-bold text-slate-900">
                  {order.shippingCost === 0 ? 'FREE' : `£${order.shippingCost.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-slate-600">
                <span>UK VAT (20% Included):</span>
                <span>£{order.taxAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-base font-black text-slate-950 border-t-2 border-slate-900 pt-2">
                <span>Total Amount Paid:</span>
                <span className="text-amber-600">£{order.totalAmount.toFixed(2)}</span>
              </div>
            </div>
          </div>

          {/* Footer Notice */}
          <div className="border-t border-slate-200 pt-6 text-[10px] text-slate-500 text-center space-y-1">
            <p className="font-bold text-slate-700">Thank you for ordering from {companyInfo.name}!</p>
            <p>
              For return inquiries, please refer to our Return Policy at {companyInfo.domain} or email{' '}
              {companyInfo.email}.
            </p>
            <p>
              {companyInfo.name} is a company registered in England and Wales under company number{' '}
              {companyInfo.registrationNumber}.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
