import React from 'react';
import { Language } from '../types/cloud';
import { ShieldCheck, Coins, Network, FileCheck, CheckCircle } from 'lucide-react';

interface SovereignComplianceProps {
  language: Language;
}

export const SovereignCompliance: React.FC<SovereignComplianceProps> = ({ language }) => {
  const isAr = language === 'ar';

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'السيادة الرقمية، الامتثال للقانون 18-07، والاقتصاد الوطني'
            : 'Digital Sovereignty, Law 18-07 Compliance & Local Currency Economics'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'كيف تحمي السحابة السيادية الموزعة البيانات الحساسة للمؤسسات الجزائرية، وتوفر بدائل دفع بالدينار المحلي، وتلغي الاعتماد على العملة الصعبة وكوابل العبور الأجنبية.'
            : 'How the sovereign distributed architecture guarantees strict compliance with Algerian data protection laws, eliminates foreign exchange drains, and routes traffic domestically via DZ-IX.'}
        </p>
      </div>

      {/* 4 Pillars of Sovereign Cloud */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Law 18-07 */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <ShieldCheck className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-100">
              {isAr ? 'القانون 18-07 لحماية المعطيات' : 'Law 18-07 Compliance'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'توطين كامل 100% لبيانات المواطنين والمؤسسات داخل التراب الوطني وفق تصريحات السلطة الوطنية لحماية المعطيات ذات الطابع الشخصي (ANPDP).'
              : 'Strict 100% domestic data residency within Algerian borders, certified compliant with ANPDP data protection standards.'}
          </p>
          <div className="text-[11px] font-mono text-emerald-400/90 pt-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Zero Overseas Transit</span>
          </div>
        </div>

        {/* Currency & Billing */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Coins className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-100">
              {isAr ? 'الدفع بالدينار (DZD) والفواتير الرسمية' : 'Direct DZD Billing & Invoicing'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'دفع فوري عبر البطاقة الذهبية وبطاقات CIB والتحويل البنكي، مع فواتير ضريبية رسمية (Facturation en TTC) معفاة من أزمات بطاقات الدفع الدولية.'
              : 'Native payment via Edahabia, CIB, and domestic bank transfers with official fiscal tax invoices, shielding companies from foreign currency quotas.'}
          </p>
          <div className="text-[11px] font-mono text-cyan-400/90 pt-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Pay As You Go (DZD/Hour)</span>
          </div>
        </div>

        {/* DZ-IX Peering */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-cyan-400">
            <Network className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-100">
              {isAr ? 'نقطة تبادل الإنترنت (DZ-IX)' : 'Domestic DZ-IX Peering'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'ربط مباشر عبر نقطة التبادل الوطنية مع اتصالات الجزائر، أوريدو، وجازي. زمن الاستجابة بين المستخدمين والخادم أقل من 8 ميلي ثانية داخل الوطن.'
              : 'Direct peering at the national internet exchange with Algeria Telecom, Ooredoo, and Djezzy, slashing internal latency below 8ms.'}
          </p>
          <div className="text-[11px] font-mono text-cyan-400/90 pt-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>&lt; 8ms National Latency</span>
          </div>
        </div>

        {/* Critical Sector Immunity */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
          <div className="flex items-center gap-2 text-emerald-400">
            <FileCheck className="w-5 h-5" />
            <h3 className="text-sm font-bold text-slate-100">
              {isAr ? 'حصانة القطاعات الحساسة' : 'Mission-Critical Resilience'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'حماية البنوك، المستشفيات، وقطاع الطاقة (سوناطراك، سونلغاز) من انقطاعات الإنترنت الدولية في حال تضرر الكوابل البحرية في البحر الأبيض المتوسط.'
              : 'Ensures uninterrupted national services for banking, energy, and healthcare even during catastrophic Mediterranean subsea cable severance.'}
          </p>
          <div className="text-[11px] font-mono text-emerald-400/90 pt-1 flex items-center gap-1.5">
            <CheckCircle className="w-3.5 h-3.5" />
            <span>Air-Gapped Ready</span>
          </div>
        </div>
      </div>
    </div>
  );
};
