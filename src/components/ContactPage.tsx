import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, MessageSquare, Send, CheckCircle2, ShieldCheck, Globe, ExternalLink, Sparkles } from 'lucide-react';
import { CompanyInfo, BusinessHours, SocialLinks, MapLocation } from '../types';

interface ContactPageProps {
  companyInfo: CompanyInfo;
  businessHours: BusinessHours;
  socialLinks: SocialLinks;
  mapLocation: MapLocation;
}

export const ContactPage: React.FC<ContactPageProps> = ({
  companyInfo,
  businessHours,
  socialLinks,
  mapLocation,
}) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    orderNumber: '',
    category: 'General Support',
    subject: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmittedSuccess(true);
    }, 800);
  };

  const whatsappClean = companyInfo.whatsapp.replace(/[^0-9]/g, '');

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Banner Header */}
        <div className="text-center space-y-4 max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-amber-500/10 text-amber-700 rounded-full font-bold text-xs uppercase tracking-wider border border-amber-500/20">
            <ShieldCheck className="w-4 h-4 text-amber-600" />
            24/7 Global Customer Support
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-slate-900 tracking-tight">
            Contact {companyInfo.name}
          </h1>
          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Have a question about an order, shipping timelines, returns, or CJdropshipping fulfillment? Our UK-based support team and instant WhatsApp agent are here to help.
          </p>
        </div>

        {/* Top Direct Contact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Email Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-amber-50 rounded-xl flex items-center justify-center text-amber-600 border border-amber-100">
                <Mail className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Email Support</h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Send us a direct inquiry for detailed order assistance or official invoices. Guaranteed response within 12 hours.
              </p>
            </div>
            <a
              href={`mailto:${companyInfo.email}`}
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs rounded-xl transition-colors"
            >
              <span>{companyInfo.email}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* WhatsApp Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-emerald-200 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow bg-gradient-to-br from-emerald-50/40 to-white">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600 border border-emerald-200">
                <MessageSquare className="w-6 h-6" />
              </div>
              <div className="flex items-center gap-2">
                <h3 className="font-extrabold text-lg text-slate-900">Instant WhatsApp</h3>
                <span className="px-2 py-0.5 bg-emerald-500 text-white font-bold text-[10px] rounded-full animate-pulse">Live</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Connect with our team directly on WhatsApp for real-time tracking, quick questions, and photo/video order checks.
              </p>
            </div>
            <a
              href={`https://wa.me/${whatsappClean}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-emerald-600/20 transition-all"
            >
              <span>Chat via WhatsApp: {companyInfo.whatsapp}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Office & Reg Card */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4 flex flex-col justify-between hover:shadow-md transition-shadow">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center text-blue-600 border border-blue-100">
                <MapPin className="w-6 h-6" />
              </div>
              <h3 className="font-extrabold text-lg text-slate-900">Registered Office</h3>
              <p className="text-xs text-slate-700 font-mono leading-relaxed bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                {companyInfo.name}<br />
                {companyInfo.registeredOffice.line1}<br />
                {companyInfo.registeredOffice.line2}<br />
                {companyInfo.registeredOffice.city}, {companyInfo.registeredOffice.postcode}<br />
                {companyInfo.registeredOffice.country}
              </p>
            </div>
            <div className="text-[11px] font-bold text-slate-500 flex items-center justify-between pt-1">
              <span>Reg: <strong className="text-slate-800 font-mono">{companyInfo.registrationNumber}</strong></span>
              <span>VAT: <strong className="text-slate-800 font-mono">{companyInfo.vatNumber}</strong></span>
            </div>
          </div>
        </div>

        {/* Main Section: Interactive Contact Form & Business Details/Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Contact Form Container */}
          <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
            <div className="space-y-1">
              <h2 className="text-2xl font-black text-slate-900">Send Us a Direct Message</h2>
              <p className="text-xs text-slate-500">Fill out the form below and our team will get back to you promptly.</p>
            </div>

            {submittedSuccess ? (
              <div className="p-6 bg-emerald-50 border border-emerald-200 rounded-2xl text-center space-y-3">
                <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto animate-bounce" />
                <h3 className="text-xl font-extrabold text-emerald-950">Message Sent Successfully!</h3>
                <p className="text-xs text-emerald-800 leading-relaxed max-w-md mx-auto">
                  Thank you for contacting <strong>{companyInfo.name}</strong>. A support ticket has been created and dispatched to <strong>{companyInfo.email}</strong>. We will reply within 12 business hours.
                </p>
                <button
                  onClick={() => setSubmittedSuccess(false)}
                  className="px-4 py-2 bg-emerald-600 text-white font-bold text-xs rounded-xl hover:bg-emerald-500 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Robert Hughes"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. robert.hughes@example.co.uk"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Phone / WhatsApp Number</label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="e.g. +44 7700 900077"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Order Number (Optional)</label>
                    <input
                      type="text"
                      value={formData.orderNumber}
                      onChange={(e) => setFormData({ ...formData, orderNumber: e.target.value })}
                      placeholder="e.g. AHM-98241"
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-mono"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Topic Category</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white font-bold"
                    >
                      <option value="General Support">General Support & Product Query</option>
                      <option value="Order Tracking">Order Tracking & Dispatch Status</option>
                      <option value="Returns & Refunds">Return, Refund or Warranty Request</option>
                      <option value="CJdropshipping Logistics">CJdropshipping Wholesale Inquiry</option>
                      <option value="Billing & Invoice">Billing & Official Invoice Request</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
                    <input
                      type="text"
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="Brief title of your inquiry..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-700 mb-1">Message *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Provide detailed description of your question or order requirement..."
                    className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:bg-white"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3 px-6 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-xs rounded-xl shadow-lg shadow-amber-500/20 transition-all flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <Sparkles className="w-4 h-4 animate-spin" />
                      <span>Sending Message...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Submit Inquiries</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>

          {/* Right Column: Business Hours, Socials & Map Placeholder */}
          <div className="lg:col-span-5 space-y-6">
            {/* Business Hours Box */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                <Clock className="w-5 h-5 text-amber-500" />
                <span>Customer Support Hours</span>
              </div>
              <div className="space-y-2 text-xs text-slate-600 divide-y divide-slate-100">
                <div className="flex justify-between py-1.5">
                  <span>Monday – Friday:</span>
                  <span className="font-bold text-slate-900 font-mono">{businessHours.mondayToFriday}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Saturday:</span>
                  <span className="font-bold text-slate-900 font-mono">{businessHours.saturday}</span>
                </div>
                <div className="flex justify-between py-1.5">
                  <span>Sunday & Bank Holidays:</span>
                  <span className="font-bold text-slate-900 font-mono">{businessHours.sunday}</span>
                </div>
              </div>
            </div>

            {/* Social Media Links Box */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                <Globe className="w-5 h-5 text-amber-500" />
                <span>Official Channels & Socials</span>
              </div>
              <p className="text-xs text-slate-500">
                Follow {companyInfo.name} for product launches, flash sales, and tech reviews.
              </p>
              <div className="grid grid-cols-2 gap-2 text-xs font-bold">
                {socialLinks.facebook && (
                  <a href={socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 flex items-center gap-2">
                    <span className="text-blue-600">Facebook</span>
                  </a>
                )}
                {socialLinks.instagram && (
                  <a href={socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 flex items-center gap-2">
                    <span className="text-pink-600">Instagram</span>
                  </a>
                )}
                {socialLinks.twitter && (
                  <a href={socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 flex items-center gap-2">
                    <span className="text-sky-500">X / Twitter</span>
                  </a>
                )}
                {socialLinks.linkedin && (
                  <a href={socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="p-2.5 bg-slate-50 hover:bg-slate-100 rounded-xl border border-slate-200 text-slate-700 flex items-center gap-2">
                    <span className="text-blue-700">LinkedIn</span>
                  </a>
                )}
              </div>
            </div>

            {/* Interactive Google Maps Container */}
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-extrabold text-slate-900 text-base">
                  <MapPin className="w-5 h-5 text-amber-500" />
                  <span>London Office Location</span>
                </div>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(mapLocation.address)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-bold text-amber-600 hover:underline flex items-center gap-1"
                >
                  <span>Open Maps</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>

              {/* Map iFrame / Interactive Container */}
              <div className="relative w-full h-56 rounded-xl overflow-hidden border border-slate-200 bg-slate-100">
                <iframe
                  title="AHMADIFY LTD Office Location Map"
                  src={mapLocation.embedUrl}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full"
                />
                <div className="absolute bottom-2 left-2 right-2 bg-slate-950/90 backdrop-blur-sm text-white p-2 rounded-lg text-[10px] flex items-center justify-between font-mono">
                  <span>Lat: {mapLocation.latitude} | Lng: {mapLocation.longitude}</span>
                  <span className="text-amber-400 font-bold">East Ham, London</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
