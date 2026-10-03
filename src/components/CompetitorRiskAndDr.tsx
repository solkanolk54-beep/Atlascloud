import React, { useState } from 'react';
import { Language, CompetitorRiskItem } from '../types/cloud';
import { COMPETITOR_RISKS } from '../data/complianceData';
import { AlertOctagon, ShieldAlert, Zap, Server, CheckCircle2, Calculator, MessageSquareQuote } from 'lucide-react';

interface CompetitorRiskAndDrProps {
  language: Language;
}

export const CompetitorRiskAndDr: React.FC<CompetitorRiskAndDrProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedRiskId, setSelectedRiskId] = useState<string>('risk-en-cours');
  const [dailyVolumeMillionDzd, setDailyVolumeMillionDzd] = useState<number>(80);

  const selectedRisk = COMPETITOR_RISKS.find((r) => r.id === selectedRiskId) || COMPETITOR_RISKS[0];

  // Calculations for simulated 4-hour blackout
  const hourlyVolume = dailyVolumeMillionDzd / 24;
  const competitorLossDzd = hourlyVolume * 4; // 4 hours outage
  const competitorLostTxCount = Math.round((dailyVolumeMillionDzd * 1000000 / 3500) * (4 / 24)); // avg 3500 dzd per tx

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'تشريح ثغرات المخاطر لدى المنافس وخطة الاستمرارية الشاملة (Disaster Recovery)'
            : 'Competitor Risk Vulnerabilities & Master Disaster Recovery Blueprint'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'تحليل دقيق لنقاط الضعف الجوهرية (شهادات قيد الإنجاز، مركز فردي هش، بروتوكولات قديمة) وكيف نسوق لحلولنا كبديل موثوق يفي باشتراطات خطة استمرارية الأعمال (PCA/PRA).'
            : 'A deep-dive teardown of competitor structural liabilities (in-progress licenses, single-facility outage risk, legacy ciphers) paired with our certified multi-region Disaster Recovery plan.'}
        </p>
      </div>

      {/* 4 Risk Categories Navigation Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {COMPETITOR_RISKS.map((risk) => {
          const isSelected = selectedRiskId === risk.id;
          return (
            <button
              key={risk.id}
              onClick={() => setSelectedRiskId(risk.id)}
              className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-500/80 shadow-md shadow-cyan-950/40'
                  : 'bg-slate-900/50 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400">
                  {isAr ? risk.categoryAr : risk.category}
                </span>
                {isSelected && <Zap className="w-3.5 h-3.5 text-cyan-400" />}
              </div>
              <h3 className="text-xs font-bold text-slate-200 line-clamp-2">
                {isAr ? risk.vulnerabilityTitleAr : risk.vulnerabilityTitleEn}
              </h3>
            </button>
          );
        })}
      </div>

      {/* Selected Risk Deep Teardown Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Technical Gap & Business Danger */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-1">
              {isAr ? selectedRisk.categoryAr : selectedRisk.category}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isAr ? selectedRisk.vulnerabilityTitleAr : selectedRisk.vulnerabilityTitleEn}
            </h3>
          </div>

          <div className="bg-rose-950/20 border border-rose-900/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-rose-400 text-xs font-bold uppercase tracking-wider">
              <AlertOctagon className="w-4 h-4" />
              <span>{isAr ? 'الثغرة الفعلية لدى المنافس (Competitor Defect):' : 'The Competitor Flaw:'}</span>
            </div>
            <p className="text-xs text-rose-200/90 leading-relaxed">
              {isAr ? selectedRisk.competitorGapAr : selectedRisk.competitorGapEn}
            </p>
          </div>

          <div className="bg-slate-950/60 border border-slate-800 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <ShieldAlert className="w-4 h-4" />
              <span>{isAr ? 'الخطر القانوني والمالي على المؤسسة المتعاقدة:' : 'Danger to Enterprise & CIO:'}</span>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr ? selectedRisk.dangerToEnterpriseAr : selectedRisk.dangerToEnterpriseEn}
            </p>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-wider">
              <CheckCircle2 className="w-4 h-4" />
              <span>{isAr ? 'الحل البديل من سحابة أطلس السيادية:' : 'Our Sovereign Architecture Solution:'}</span>
            </div>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {isAr ? selectedRisk.ourSovereignSolutionAr : selectedRisk.ourSovereignSolutionEn}
            </p>
          </div>
        </div>

        {/* Right Column: Commercial Sales Kill-Pitch */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="bg-gradient-to-br from-slate-900 to-[#0b101d] border border-cyan-900/60 rounded-xl p-5 shadow-xl">
            <div className="flex items-center gap-2 text-cyan-400 mb-3">
              <MessageSquareQuote className="w-5 h-5" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isAr ? 'خطاب الحسم التجاري لفريق المبيعات (Kill-Pitch)' : 'Commercial Sales Kill-Pitch'}
              </h4>
            </div>
            <p className="text-xs font-medium text-cyan-100 italic leading-relaxed bg-slate-950/70 p-4 rounded-lg border border-cyan-800/40">
              {isAr ? selectedRisk.salesKillPitchAr : selectedRisk.salesKillPitchEn}
            </p>
            <div className="mt-3 text-[11px] text-slate-400">
              {isAr
                ? 'استخدم هذه الحجة مباشرة مع لجان المشتريات (Comité des Achats) ومدراء المخاطر في البنوك وسوناطراك.'
                : 'Direct sales enablement talking track tailored for bank procurement and IT risk officers.'}
            </div>
          </div>

          {/* Quick SLA Commitment Box */}
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4 space-y-2">
            <div className="text-xs font-bold text-slate-300">
              {isAr ? 'ضمانات مستوى الخدمة الرسمية (Contractual SLA):' : 'Binding Enterprise SLA:'}
            </div>
            <div className="grid grid-cols-2 gap-2 text-center text-xs font-mono">
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">RPO (Data Loss)</div>
                <div className="text-cyan-400 font-bold">0 Seconds</div>
              </div>
              <div className="p-2 bg-slate-900 rounded border border-slate-800">
                <div className="text-[10px] text-slate-500">RTO (Recovery)</div>
                <div className="text-cyan-400 font-bold">&lt; 300 ms</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Disaster Recovery Blackout Impact Simulator */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-[#0c121e] border border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-cyan-400" />
            <h3 className="text-base font-bold text-white">
              {isAr
                ? 'حاسبة أثر انقطاع الخدمة (Financial Impact of Blackout: Single-DC vs Multi-Region DR)'
                : 'Outage Financial Impact Simulator: Single-DC vs Sovereign Geo-DR'}
            </h3>
          </div>
          <div className="text-xs font-mono text-slate-400">
            {isAr ? 'محاكاة انقطاع طاقة لمدة 4 ساعات في الجزائر العاصمة' : 'Simulating a 4-Hour Facility Blackout in Algiers'}
          </div>
        </div>

        {/* Volume Slider */}
        <div className="mb-6 space-y-2">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">
              {isAr ? 'حجم المعاملات المالية اليومية للمؤسسة:' : 'Daily Transaction Volume (Enterprise):'}
            </span>
            <span className="font-mono font-bold text-cyan-400 tabular-nums">
              {dailyVolumeMillionDzd.toLocaleString()} {isAr ? 'مليون دج / يومياً' : 'Million DZD / Day'}
            </span>
          </div>
          <input
            type="range"
            min="10"
            max="500"
            step="10"
            value={dailyVolumeMillionDzd}
            onChange={(e) => setDailyVolumeMillionDzd(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
        </div>

        {/* Side-by-Side Impact Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Competitor Single DC Disaster */}
          <div className="bg-rose-950/20 border border-rose-900/60 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-rose-400">
                {isAr ? 'المنافس المحلي (مركز بيانات وحيد بالعاصمة)' : 'Competitor (Single Algiers Facility)'}
              </span>
              <span className="text-[10px] font-mono text-rose-400 px-2 py-0.5 bg-rose-950/80 rounded border border-rose-900">
                Catastrophic Outage
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{isAr ? 'مدة توقف الخدمة الكامل:' : 'Unplanned Outage Duration:'}</span>
                <span className="text-rose-400 font-bold">4 Hours</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{isAr ? 'الخسارة المالية المباشرة:' : 'Direct Lost Volume:'}</span>
                <span className="text-rose-400 font-bold tabular-nums">
                  {competitorLossDzd.toLocaleString(undefined, { maximumFractionDigits: 1 })} {isAr ? 'مليون دج' : 'M DZD'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{isAr ? 'المعاملات البنكية العالقة/الملغاة:' : 'Dropped Transactions:'}</span>
                <span className="text-rose-400 font-bold tabular-nums">
                  ~{competitorLostTxCount.toLocaleString()} {isAr ? 'عملية' : 'transactions'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300 pt-1 border-t border-rose-900/50">
                <span>{isAr ? 'العقوبات الرقابية (بنك الجزائر):' : 'Regulatory Penalties:'}</span>
                <span className="text-rose-400 font-bold">Audit Sanction + Fines</span>
              </div>
            </div>
          </div>

          {/* AtlasCloud Sovereign Multi-Region Active-Active */}
          <div className="bg-emerald-950/20 border border-emerald-900/60 rounded-xl p-5 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-emerald-400">
                {isAr ? 'سحابة أطلس السيادية (خطة استمرارية الأعمال PRA)' : 'AtlasCloud Sovereign (Geo-Redundant PRA)'}
              </span>
              <span className="text-[10px] font-mono text-emerald-400 px-2 py-0.5 bg-emerald-950/80 rounded border border-emerald-900">
                Zero Downtime
              </span>
            </div>
            <div className="space-y-1.5 font-mono text-xs">
              <div className="flex justify-between text-slate-300">
                <span>{isAr ? 'زمن تحويل الحركة التلقائي لوهران:' : 'Failover to Oran & Constantine:'}</span>
                <span className="text-emerald-400 font-bold">&lt; 300 Milliseconds</span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{isAr ? 'الخسارة المالية المباشرة:' : 'Direct Lost Volume:'}</span>
                <span className="text-emerald-400 font-bold tabular-nums">
                  0.00 {isAr ? 'دج (صفر خسائر)' : 'DZD (Zero Loss)'}
                </span>
              </div>
              <div className="flex justify-between text-slate-300">
                <span>{isAr ? 'المعاملات البنكية الملغاة:' : 'Dropped Transactions:'}</span>
                <span className="text-emerald-400 font-bold tabular-nums">0 transactions</span>
              </div>
              <div className="flex justify-between text-slate-300 pt-1 border-t border-emerald-900/50">
                <span>{isAr ? 'موقف الرقابة والتدقيق:' : 'Regulatory Standing:'}</span>
                <span className="text-emerald-400 font-bold">100% Compliant (PCA Approved)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
