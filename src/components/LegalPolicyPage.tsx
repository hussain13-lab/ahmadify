import React from 'react';
import { ShieldCheck, MapPin, Mail, Phone, ExternalLink, ArrowLeft, FileText } from 'lucide-react';
import { CompanyInfo, LegalPolicyDoc } from '../types';

interface LegalPolicyPageProps {
  policyKey: string;
  policies: LegalPolicyDoc[];
  companyInfo: CompanyInfo;
  onBack: () => void;
  onSelectPolicy: (key: string) => void;
}

export const LegalPolicyPage: React.FC<LegalPolicyPageProps> = ({
  policyKey,
  policies,
  companyInfo,
  onBack,
  onSelectPolicy,
}) => {
  const currentDoc = (policies || []).find((p) => p.key === policyKey) || (policies || [])[0];

  return (
    <div className="min-h-screen bg-slate-50 font-sans py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        {/* Top Back Navigation */}
        <div className="flex items-center justify-between border-b border-slate-200 pb-4">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 font-bold text-xs text-slate-700 hover:text-amber-600 bg-white px-3.5 py-2 rounded-xl border border-slate-200 shadow-sm transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Storefront</span>
          </button>

          <div className="inline-flex items-center gap-2 text-xs font-mono font-bold text-slate-500">
            <ShieldCheck className="w-4 h-4 text-amber-500" />
            <span>{companyInfo.name} Legal Docs</span>
          </div>
        </div>

        {/* Policy Documents Navigation Tabs */}
        <div className="bg-white p-3 rounded-2xl shadow-sm border border-slate-200 flex items-center gap-2 overflow-x-auto text-xs font-bold">
          {(policies || []).map((doc) => (
            <button
              key={doc.key}
              onClick={() => onSelectPolicy(doc.key)}
              className={`px-3.5 py-2 rounded-xl transition-all whitespace-nowrap flex items-center gap-1.5 ${
                policyKey === doc.key
                  ? 'bg-amber-500 text-slate-950 shadow-md shadow-amber-500/10'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>{doc.title}</span>
            </button>
          ))}
        </div>

        {/* Main Document Content Box */}
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-200 pb-6 gap-4">
            <div>
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">{currentDoc?.title}</h1>
              <p className="text-xs text-slate-500 font-mono mt-1">Official Document | Last updated: {currentDoc?.lastUpdated}</p>
            </div>

            <div className="p-3 bg-slate-50 border border-slate-200 rounded-xl text-xs space-y-1">
              <p className="font-extrabold text-slate-900">{companyInfo.name}</p>
              <p className="text-slate-600">Company No: <span className="font-mono font-bold">{companyInfo.registrationNumber}</span></p>
            </div>
          </div>

          {/* Formatted Text Content */}
          <div className="prose prose-slate max-w-none text-xs sm:text-sm text-slate-700 leading-relaxed space-y-4">
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
              <p className="text-slate-500 italic">No policy text available.</p>
            )}
          </div>

          {/* Registered Office & Contact Box */}
          <div className="mt-8 p-6 bg-slate-900 text-white rounded-2xl space-y-4">
            <h3 className="font-extrabold text-base text-amber-400">Company Verification & Inquiries</h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              For legal service, formal complaints, or official communications regarding this policy, contact **AHMADIFY LTD** at our registered office:
            </p>
            <div className="p-3 bg-slate-800 rounded-xl font-mono text-xs text-slate-200 leading-relaxed">
              {companyInfo.name}<br />
              {companyInfo.registeredOffice.line1}, {companyInfo.registeredOffice.line2}<br />
              {companyInfo.registeredOffice.city}, {companyInfo.registeredOffice.postcode}, {companyInfo.registeredOffice.country}<br />
              Email: {companyInfo.email} | WhatsApp: {companyInfo.whatsapp}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
