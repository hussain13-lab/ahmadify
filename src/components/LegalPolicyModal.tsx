import React, { useState } from 'react';
import { X, ShieldCheck, PhoneCall, Mail, MapPin, Globe, FileText, CheckCircle2 } from 'lucide-react';
import { CompanyInfo, LegalPolicyDoc } from '../types';

interface LegalPolicyModalProps {
  isOpen: boolean;
  initialPolicyKey?: string;
  onClose: () => void;
  companyInfo: CompanyInfo;
  policies: LegalPolicyDoc[];
}

export const LegalPolicyModal: React.FC<LegalPolicyModalProps> = ({
  isOpen,
  initialPolicyKey = 'about',
  onClose,
  companyInfo,
  policies,
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState(initialPolicyKey);

  const currentDoc = (policies || []).find((p) => p.key === activeTab) || (policies || [])[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm overflow-y-auto font-sans">
      <div className="relative w-full max-w-5xl bg-white rounded-2xl shadow-2xl overflow-hidden my-6 border border-slate-200 max-h-[92vh] flex flex-col text-slate-900">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white border-b border-slate-800 shrink-0">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-400" />
            <h2 className="font-extrabold text-sm sm:text-base tracking-wide">
              {companyInfo.name} — Official Legal & Company Policies
            </h2>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 13 Tab Navigation Bar */}
        <div className="bg-slate-100 border-b border-slate-200 px-4 py-2 flex items-center gap-1.5 overflow-x-auto text-xs font-bold text-slate-700 shrink-0">
          {(policies || []).map((doc) => (
            <button
              key={doc.key}
              onClick={() => setActiveTab(doc.key)}
              className={`px-3 py-1.5 rounded-lg transition-colors whitespace-nowrap flex items-center gap-1.5 ${
                activeTab === doc.key
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'hover:bg-slate-200 text-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{doc.title}</span>
            </button>
          ))}
        </div>

        {/* Policy Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto flex-1 space-y-6 text-xs sm:text-sm text-slate-700 leading-relaxed bg-white">
          <div className="border-b border-slate-200 pb-4 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h3 className="text-2xl font-black text-slate-900">{currentDoc?.title}</h3>
              <p className="text-xs text-slate-500 font-mono">Last updated: {currentDoc?.lastUpdated || '2026-07-31'}</p>
            </div>

            <div className="px-3 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-lg text-xs font-bold inline-flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-amber-600" />
              <span>{companyInfo.name} (Reg: {companyInfo.registrationNumber})</span>
            </div>
          </div>

          {/* Formatted Text Render */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm space-y-4">
            {currentDoc?.content ? (
              currentDoc.content.split('\n\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return <h1 key={index} className="text-2xl font-black text-slate-900 mt-4 mb-2">{paragraph.replace('# ', '')}</h1>;
                }
                if (paragraph.startsWith('### ')) {
                  return <h3 key={index} className="text-lg font-bold text-slate-900 mt-4 mb-2">{paragraph.replace('### ', '')}</h3>;
                }
                if (paragraph.startsWith('- ')) {
                  const items = paragraph.split('\n- ');
                  return (
                    <ul key={index} className="list-disc pl-5 space-y-1.5 text-slate-700">
                      {items.map((item, idx) => (
                        <li key={idx}>{item.replace('- ', '')}</li>
                      ))}
                    </ul>
                  );
                }
                return <p key={index} className="text-slate-700 leading-relaxed whitespace-pre-line">{paragraph}</p>;
              })
            ) : (
              <p className="text-slate-500 italic">No policy content available.</p>
            )}
          </div>

          {/* Official Registered Office Badge */}
          <div className="mt-8 p-4 bg-slate-50 border border-slate-200 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs">
            <div className="space-y-1">
              <h4 className="font-extrabold text-slate-900 flex items-center gap-2">
                <MapPin className="w-4 h-4 text-amber-500" />
                <span>{companyInfo.name} Official Registered Office</span>
              </h4>
              <p className="font-mono text-slate-600">
                {companyInfo.registeredOffice.line1}, {companyInfo.registeredOffice.line2}, {companyInfo.registeredOffice.city}, {companyInfo.registeredOffice.postcode}, {companyInfo.registeredOffice.country}
              </p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <a
                href={`mailto:${companyInfo.email}`}
                className="px-3 py-1.5 bg-slate-900 text-white font-bold rounded-lg text-xs hover:bg-slate-800"
              >
                {companyInfo.email}
              </a>
              <a
                href={`https://wa.me/${companyInfo.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 bg-emerald-600 text-white font-bold rounded-lg text-xs hover:bg-emerald-500"
              >
                WhatsApp Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
