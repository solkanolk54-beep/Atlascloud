import React, { useState } from 'react';
import { Language, GtmStrategyTier } from '../types/cloud';
import { GTM_STRATEGY_TIERS } from '../data/complianceData';
import { Target, TrendingUp, DollarSign, Gift, ArrowRight, ShieldCheck, Check, Sparkles, PhoneCall } from 'lucide-react';

interface GoToMarketStrategyProps {
  language: Language;
}

export const GoToMarketStrategy: React.FC<GoToMarketStrategyProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedTierId, setSelectedTierId] = useState<string>('tier-fintech-banks');

  // ROI Calculator state
  const [monthlySpendDzd, setMonthlySpendDzd] = useState<number>(450000); // 450,000 DZD/month (~$3,300)
  const [currentProvider, setCurrentProvider] = useState<'aws' | 'competitor_local'>('competitor_local');

  const selectedTier = GTM_STRATEGY_TIERS.find((t) => t.id === selectedTierId) || GTM_STRATEGY_TIERS[0];

  // Financial calculations
  const annualSpend = monthlySpendDzd * 12;
  const savingsPercent = currentProvider === 'aws' ? 0.35 : 0.22; // 35% vs AWS due to forex markup & egress, 22% vs legacy local due to efficiency
  const annualSavingsDzd = annualSpend * savingsPercent;
  const freeCreditValueDzd = 100000;

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'استراتيجية التسويق واختراق السوق (Go-To-Market & Commercial Strategy)'
            : 'Go-To-Market Commercial Strategy & Market Penetration Playbook'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'خطة هجومية متكاملة لانتزاع الحصص السوقية من المنافسين وجذب البنوك والشركات التقنية، قائمة على استغلال ثغرة الامتثال، وتقديم تسعير شفاف بالدينار الجزائري، مع برنامج تحفيز ترحيل مجاني.'
            : 'An aggressive commercial playbook designed to win enterprise accounts and tech scale-ups from legacy local cloud providers, leveraging compliance certainty, DZD pricing, and subsidized migration.'}
        </p>
      </div>

      {/* Target Segments Selector */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {GTM_STRATEGY_TIERS.map((tier) => {
          const isSelected = selectedTierId === tier.id;
          return (
            <button
              key={tier.id}
              onClick={() => setSelectedTierId(tier.id)}
              className={`p-5 rounded-xl border text-start transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/90 border-cyan-500/80 shadow-lg shadow-cyan-950/50'
                  : 'bg-slate-900/50 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono mb-2">
                <Target className="w-4 h-4" />
                <span>{tier.id === 'tier-fintech-banks' ? 'Tier 1' : tier.id === 'tier-energy-industry' ? 'Tier 2' : 'Tier 3'}</span>
              </div>
              <h3 className="text-sm font-bold text-white mb-1.5">
                {isAr ? tier.segmentNameAr : tier.segmentNameEn}
              </h3>
              <p className="text-xs text-slate-400 line-clamp-2">
                {isAr ? tier.targetClientsAr : tier.targetClientsEn}
              </p>
            </button>
          );
        })}
      </div>

      {/* Segment Deep-Dive Strategy Card */}
      <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Pain Points & Value Proposition */}
        <div className="lg:col-span-7 space-y-5">
          <div>
            <div className="text-xs font-mono text-cyan-400 mb-1">
              {tierNameHelper(selectedTier.id, isAr)}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isAr ? selectedTier.segmentNameAr : selectedTier.segmentNameEn}
            </h3>
            <p className="text-xs text-slate-400 mt-1">
              <span className="font-semibold text-slate-300">{isAr ? 'العملاء المستهدفون: ' : 'Target Accounts: '}</span>
              {isAr ? selectedTier.targetClientsAr : selectedTier.targetClientsEn}
            </p>
          </div>

          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-1.5">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
              {isAr ? 'نقطة الألم المركزية لدى العميل (The Core Pain Point):' : 'Core Customer Pain Point:'}
            </span>
            <p className="text-xs text-slate-300 leading-relaxed">
              {isAr ? selectedTier.corePainPointAr : selectedTier.corePainPointEn}
            </p>
          </div>

          <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4 space-y-1.5">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              {isAr ? 'عرض القيمة الحاسم (Winning Proposition):' : 'The Winning Value Proposition:'}
            </span>
            <p className="text-xs text-emerald-200/90 leading-relaxed">
              {isAr ? selectedTier.winningPropositionAr : selectedTier.winningPropositionEn}
            </p>
          </div>

          <div className="bg-cyan-950/20 border border-cyan-900/50 rounded-lg p-4 space-y-1.5">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-wider block">
              {isAr ? 'الزاوية التكتيكية لاقتناص العميل (The Tactical Angle):' : 'Tactical Sales Angle:'}
            </span>
            <p className="text-xs text-cyan-200/90 leading-relaxed">
              {isAr ? selectedTier.tacticalAngleAr : selectedTier.tacticalAngleEn}
            </p>
          </div>
        </div>

        {/* Right Column: Pricing & Conversion Incentive */}
        <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
          <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <DollarSign className="w-5 h-5" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isAr ? 'النموذج التسعيري التجاري (DZD Pricing)' : 'Commercial Pricing Structure'}
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-900 p-3 rounded-lg border border-slate-800">
              {isAr ? selectedTier.commercialPricingAr : selectedTier.commercialPricingEn}
            </p>
          </div>

          {/* Conversion Bait Box */}
          <div className="bg-gradient-to-br from-slate-900 via-slate-900 to-cyan-950/40 border border-cyan-800/60 rounded-xl p-5 space-y-3">
            <div className="flex items-center gap-2 text-cyan-400">
              <Gift className="w-5 h-5" />
              <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                {isAr ? 'طُعم التحويل السريع (Conversion Hook)' : 'Fast Conversion Offer'}
              </h4>
            </div>
            <p className="text-xs text-cyan-100 font-medium leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-cyan-900/50">
              {isAr ? selectedTier.conversionBaitAr : selectedTier.conversionBaitEn}
            </p>
            <div className="text-[11px] text-slate-400 flex items-center gap-1.5 pt-1">
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>{isAr ? 'ترحيل مجاني دون أي توقف للخدمة (Zero-Downtime Migration)' : 'Zero-Downtime White-Glove Migration'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive TCO & Migration Savings Calculator */}
      <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-emerald-400" />
              <span>{isAr ? 'حاسبة التكلفة الإجمالية (TCO) والتوفير المالي بالدينار الجزائري' : 'Enterprise TCO & Savings Calculator in DZD'}</span>
            </h3>
            <p className="text-xs text-slate-400 mt-0.5">
              {isAr
                ? 'قارن تكاليف تشغيلك الحالية مع سحابة أطلس السيادية واحسب التوفير في العملة الصعبة والمصاريف المخفية.'
                : 'Simulate financial savings transitioning workloads from AWS or legacy local hosts to AtlasCloud.'}
            </p>
          </div>

          {/* Current Provider Switch */}
          <div className="flex items-center gap-1 p-1 bg-slate-950 rounded-lg border border-slate-800 text-xs">
            <button
              onClick={() => setCurrentProvider('competitor_local')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                currentProvider === 'competitor_local'
                  ? 'bg-slate-800 text-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'مقابل المنافس المحلي (OneCloud.dz)' : 'vs Local Host (OneCloud.dz)'}
            </button>
            <button
              onClick={() => setCurrentProvider('aws')}
              className={`px-3 py-1.5 rounded-md font-medium transition-colors cursor-pointer ${
                currentProvider === 'aws'
                  ? 'bg-slate-800 text-cyan-400 font-semibold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAr ? 'مقابل السحابة الأجنبية (AWS / GCP / Hetzner)' : 'vs AWS / GCP / Hetzner'}
            </button>
          </div>
        </div>

        {/* Spend Slider */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-xs">
            <span className="text-slate-400">
              {isAr ? 'الإنفاق السحابي الشهري الحالي للمؤسسة:' : 'Current Monthly Cloud Spend:'}
            </span>
            <span className="font-mono font-bold text-cyan-400 tabular-nums">
              {monthlySpendDzd.toLocaleString()} {isAr ? 'دج / شهرياً' : 'DZD / Month'}
            </span>
          </div>
          <input
            type="range"
            min="100000"
            max="3000000"
            step="50000"
            value={monthlySpendDzd}
            onChange={(e) => setMonthlySpendDzd(Number(e.target.value))}
            className="w-full accent-cyan-400"
          />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 text-center">
            <div className="text-xs text-slate-400 mb-1">
              {isAr ? 'الإنفاق السنوي التقديري' : 'Annual Baseline Spend'}
            </div>
            <div className="text-xl font-bold font-mono text-white tabular-nums">
              {annualSpend.toLocaleString()} DZD
            </div>
            <div className="text-[11px] text-slate-500 mt-1">
              {currentProvider === 'aws' ? (isAr ? 'شامل فروقات الصرف والعمولات' : 'Includes bank forex spreads') : (isAr ? 'دون كفاءة الحاويات' : 'Legacy VM overhead')}
            </div>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-emerald-900/60 text-center">
            <div className="text-xs text-emerald-400 mb-1">
              {isAr ? 'صافي التوفير السنوي مع أطلس كلاود' : 'Net Annual Savings with Atlas'}
            </div>
            <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">
              +{annualSavingsDzd.toLocaleString(undefined, { maximumFractionDigits: 0 })} DZD
            </div>
            <div className="text-[11px] text-emerald-400/80 mt-1 font-medium">
              {isAr ? `توفير بنسبة ${(savingsPercent * 100).toFixed(0)}% سنوياً` : `${(savingsPercent * 100).toFixed(0)}% direct reduction`}
            </div>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-xl border border-cyan-900/60 text-center">
            <div className="text-xs text-cyan-400 mb-1">
              {isAr ? 'حزمة الترحيل والائتمان الترحيبي' : 'Welcome Migration Package'}
            </div>
            <div className="text-xl font-bold font-mono text-cyan-300 tabular-nums">
              {freeCreditValueDzd.toLocaleString()} DZD
            </div>
            <div className="text-[11px] text-cyan-400/80 mt-1">
              {isAr ? 'رصيد مجاني + مهندس ترحيل مخصص' : 'Free credits + dedicated SRE'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

function tierNameHelper(id: string, isAr: boolean): string {
  switch (id) {
    case 'tier-fintech-banks':
      return isAr ? 'القطاع الأول: البنوك والمؤسسات المالية' : 'Tier 1: Banks & FinTechs';
    case 'tier-energy-industry':
      return isAr ? 'القطاع الثاني: الطاقة والصناعة' : 'Tier 2: Energy & Industry';
    case 'tier-scaleups-agencies':
      return isAr ? 'القطاع الثالث: الشركات الناشئة والوكالات' : 'Tier 3: Tech Scale-ups';
    default:
      return '';
  }
}
