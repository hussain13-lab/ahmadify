import React, { useState, useEffect } from 'react';
import { Order, CompanyInfo } from '../types';
import {
  generateOrderConfirmationEmail,
  generateShippingUpdateEmail,
  generateReturnAuthorizationEmail,
  generateAbandonedCartEmail,
  EmailTemplateResult
} from '../utils/emailTemplates';
import { Mail, CheckCircle2, Send, Eye, FileText, Smartphone, Monitor, X, RefreshCw, Copy, Check } from 'lucide-react';

interface EmailTemplatePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  companyInfo: CompanyInfo;
  orders: Order[];
  initialTemplateType?: 'order_confirmation' | 'shipping_update' | 'return_authorization' | 'abandoned_cart';
  initialOrder?: Order | null;
}

export const EmailTemplatePreviewModal: React.FC<EmailTemplatePreviewModalProps> = ({
  isOpen,
  onClose,
  companyInfo,
  orders,
  initialTemplateType = 'order_confirmation',
  initialOrder
}) => {
  if (!isOpen) return null;

  const [templateType, setTemplateType] = useState<'order_confirmation' | 'shipping_update' | 'return_authorization' | 'abandoned_cart'>(initialTemplateType);
  const selectedOrder = initialOrder || (orders && orders.length > 0 ? orders[0] : null);
  const [activeOrder, setActiveOrder] = useState<Order | null>(selectedOrder);
  const [returnReason, setReturnReason] = useState('Item size did not fit / Exchanges requested');
  const [viewMode, setViewMode] = useState<'html' | 'text'>('html');
  const [deviceFrame, setDeviceFrame] = useState<'desktop' | 'mobile'>('desktop');

  // Test send state
  const [recipientEmail, setRecipientEmail] = useState(activeOrder?.customerEmail || 'sh.ahmad1987@gmail.com');
  const [isSending, setIsSending] = useState(false);
  const [sendSuccessMessage, setSendSuccessMessage] = useState<string | null>(null);
  const [copiedText, setCopiedText] = useState(false);

  useEffect(() => {
    if (activeOrder?.customerEmail) {
      setRecipientEmail(activeOrder.customerEmail);
    }
  }, [activeOrder]);

  if (!activeOrder) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-6 max-w-md w-full text-center">
          <Mail className="w-12 h-12 text-slate-400 mx-auto mb-3" />
          <h3 className="text-lg font-bold text-slate-900">No Orders Available</h3>
          <p className="text-xs text-slate-500 mb-4">Place an order first to preview live order email notifications.</p>
          <button onClick={onClose} className="px-4 py-2 bg-slate-900 text-amber-400 rounded-xl font-bold text-xs">Close</button>
        </div>
      </div>
    );
  }

  let emailContent: EmailTemplateResult;
  if (templateType === 'shipping_update') {
    emailContent = generateShippingUpdateEmail(activeOrder, companyInfo);
  } else if (templateType === 'return_authorization') {
    emailContent = generateReturnAuthorizationEmail(activeOrder, companyInfo, returnReason);
  } else if (templateType === 'abandoned_cart') {
    emailContent = generateAbandonedCartEmail(activeOrder.customerName || 'Valued Customer', activeOrder.items || [], companyInfo);
  } else {
    emailContent = generateOrderConfirmationEmail(activeOrder, companyInfo);
  }

  const handleSendTestEmail = async () => {
    setIsSending(true);
    setSendSuccessMessage(null);
    try {
      const res = await fetch('/api/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          recipientEmail,
          templateType,
          orderId: activeOrder.id,
          returnReason
        })
      });
      const data = await res.json();
      if (data.success) {
        setSendSuccessMessage(`Email dispatched to ${recipientEmail}`);
        setTimeout(() => setSendSuccessMessage(null), 5000);
      }
    } catch (err) {
      setSendSuccessMessage(`Simulated email sent to ${recipientEmail}`);
      setTimeout(() => setSendSuccessMessage(null), 5000);
    } finally {
      setIsSending(false);
    }
  };

  const handleCopyText = () => {
    navigator.clipboard.writeText(emailContent.text);
    setCopiedText(true);
    setTimeout(() => setCopiedText(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-slate-950/80 backdrop-blur-md font-sans overflow-hidden">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-5xl h-[90vh] flex flex-col shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="px-6 py-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 border border-slate-700/80 p-0.5 shadow-lg overflow-hidden flex items-center justify-center shrink-0">
              <img src="/logo.png" alt="ahmadify.store logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-base font-extrabold text-white flex items-center gap-2">
                ahmadify.store Email Notification Center
                <span className="text-[10px] uppercase tracking-wider font-bold px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Official Branding</span>
              </h2>
              <p className="text-xs text-slate-400">Pre-formatted responsive email templates for order updates, shipping, and returns.</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Toolbar Controls */}
        <div className="px-6 py-3 bg-slate-900 border-b border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0 text-xs">
          {/* Template Type Selector */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0 scrollbar-none font-bold">
            <button
              onClick={() => setTemplateType('order_confirmation')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                templateType === 'order_confirmation'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Order Confirmation
            </button>
            <button
              onClick={() => setTemplateType('shipping_update')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                templateType === 'shipping_update'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Shipping Dispatch
            </button>
            <button
              onClick={() => setTemplateType('return_authorization')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                templateType === 'return_authorization'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Return Authorization (RMA)
            </button>
            <button
              onClick={() => setTemplateType('abandoned_cart')}
              className={`px-3 py-1.5 rounded-xl transition-all whitespace-nowrap ${
                templateType === 'abandoned_cart'
                  ? 'bg-amber-500 text-slate-950 font-black shadow-md'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Abandoned Cart VIP
            </button>
          </div>

          {/* View Modes & Frames */}
          <div className="flex items-center gap-3">
            <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
              <button
                onClick={() => setViewMode('html')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'html' ? 'bg-slate-900 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <Eye className="w-3.5 h-3.5" /> HTML Render
              </button>
              <button
                onClick={() => setViewMode('text')}
                className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-bold transition-colors ${
                  viewMode === 'text' ? 'bg-slate-900 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <FileText className="w-3.5 h-3.5" /> Plain Text
              </button>
            </div>

            {viewMode === 'html' && (
              <div className="flex items-center bg-slate-800 rounded-xl p-1 border border-slate-700">
                <button
                  onClick={() => setDeviceFrame('desktop')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    deviceFrame === 'desktop' ? 'bg-slate-900 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Desktop View"
                >
                  <Monitor className="w-4 h-4" />
                </button>
                <button
                  onClick={() => setDeviceFrame('mobile')}
                  className={`p-1.5 rounded-lg transition-colors ${
                    deviceFrame === 'mobile' ? 'bg-slate-900 text-amber-400' : 'text-slate-400 hover:text-slate-200'
                  }`}
                  title="Mobile View"
                >
                  <Smartphone className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Dynamic Context Settings Bar */}
        <div className="px-6 py-2.5 bg-slate-950/60 border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs shrink-0">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <span className="font-bold text-slate-300">Target Order:</span>
              <select
                value={activeOrder.id}
                onChange={(e) => {
                  const o = orders.find(ord => ord.id === e.target.value);
                  if (o) setActiveOrder(o);
                }}
                className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs font-bold focus:outline-none"
              >
                {orders.map(o => (
                  <option key={o.id} value={o.id}>
                    {o.orderNumber} ({o.customerName} - £{o.totalAmount})
                  </option>
                ))}
              </select>
            </div>

            {templateType === 'return_authorization' && (
              <div className="flex items-center gap-2 text-slate-400">
                <span className="font-bold text-slate-300">RMA Reason:</span>
                <input
                  type="text"
                  value={returnReason}
                  onChange={(e) => setReturnReason(e.target.value)}
                  className="bg-slate-800 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1 text-xs font-semibold focus:outline-none w-64"
                />
              </div>
            )}
          </div>

          <div className="text-slate-400 text-xs">
            Subject: <strong className="text-slate-200">{emailContent.subject}</strong>
          </div>
        </div>

        {/* Preview Frame Area */}
        <div className="flex-1 bg-slate-950 p-4 overflow-y-auto flex justify-center items-start">
          {viewMode === 'html' ? (
            <div
              className={`transition-all duration-300 bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-800 ${
                deviceFrame === 'mobile' ? 'w-[380px] my-2' : 'w-full max-w-3xl my-2'
              }`}
            >
              <iframe
                title="Email Preview"
                srcDoc={emailContent.html}
                className="w-full h-[580px] bg-white rounded-b-2xl border-none"
              />
            </div>
          ) : (
            <div className="w-full max-w-3xl bg-slate-900 border border-slate-800 rounded-2xl p-6 font-mono text-xs text-slate-300 whitespace-pre-wrap leading-relaxed relative">
              <button
                onClick={handleCopyText}
                className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-bold transition-colors"
              >
                {copiedText ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedText ? 'Copied!' : 'Copy Plain Text'}</span>
              </button>
              {emailContent.text}
            </div>
          )}
        </div>

        {/* Footer Dispatch Bar */}
        <div className="px-6 py-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs">
            {sendSuccessMessage ? (
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/20">
                <CheckCircle2 className="w-4 h-4" />
                <span>{sendSuccessMessage}</span>
              </div>
            ) : (
              <span className="text-slate-400 font-medium">
                Recipient: <strong className="text-slate-200">{activeOrder.customerName}</strong> ({activeOrder.customerEmail})
              </span>
            )}
          </div>

          <div className="flex items-center gap-3">
            <input
              type="email"
              value={recipientEmail}
              onChange={(e) => setRecipientEmail(e.target.value)}
              placeholder="Test email address..."
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-xl px-3 py-2 text-xs font-semibold focus:outline-none w-56 focus:border-amber-500"
            />
            <button
              onClick={handleSendTestEmail}
              disabled={isSending}
              className="flex items-center gap-2 px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl transition-all shadow-lg hover:shadow-amber-500/20 disabled:opacity-50"
            >
              {isSending ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Sending...</span>
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  <span>Send Test Email</span>
                </>
              )}
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
