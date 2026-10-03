import React, { useState } from 'react';
import { Language } from '../types/cloud';
import {
  COMPUTE_PRICING_TIERS,
  DBAAS_PRICING_TIERS,
  STORAGE_PRICING_ITEMS,
  NETWORK_PRICING_OVERVIEW,
} from '../data/pricingCatalogData';
import {
  Calculator,
  Cpu,
  Database,
  HardDrive,
  Network,
  DollarSign,
  TrendingDown,
  CheckCircle2,
  FileSpreadsheet,
  Download,
  ShieldCheck,
  Zap,
  Clock,
  Sparkles,
  ArrowRight,
} from 'lucide-react';

interface CommercialPricingCatalogProps {
  language: Language;
}

export const CommercialPricingCatalog: React.FC<CommercialPricingCatalogProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeCatalogTab, setActiveCatalogTab] = useState<'compute' | 'dbaas' | 'storage' | 'network' | 'calculator'>('calculator');
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'second'>('monthly');

  // Interactive TCO Calculator state
  const [calcVcpu, setCalcVcpu] = useState<number>(8);
  const [calcRamGb, setCalcRamGb] = useState<number>(32);
  const [calcNvmeGb, setCalcNvmeGb] = useState<number>(500);
  const [calcS3Tb, setCalcS3Tb] = useState<number>(2);
  const [comparisonBaseline, setComparisonBaseline] = useState<'aws-foreign' | 'onprem-datacenter'>('aws-foreign');
  const [exportedQuote, setExportedQuote] = useState(false);

  // Cost calculation formulation
  // AtlasCloud monthly cost
  // Compute: ~2,400 DZD per vCPU + ~650 DZD per GB RAM
  const atlasComputeCost = calcVcpu * 2400 + calcRamGb * 650;
  const atlasNvmeCost = calcNvmeGb * 16.0;
  const atlasS3Cost = calcS3Tb * 1024 * 5.5;
  const atlasTotalMonthly = Math.round(atlasComputeCost + atlasNvmeCost + atlasS3Cost);

  // Alternative cost
  // If AWS / Foreign Cloud: USD billed converted at DZD exchange rate + 30% overseas remittance withholding tax + cross-border egress + foreign currency card surcharge
  // AWS baseline is typically ~1.75x higher in effective local purchasing power
  // If On-Prem: Hardware amortization, UPS, generator diesel fuel, Sonelgaz commercial kilowatt-hour rates, cooling HVAC maintenance, physical guards
  const alternativeMonthly =
    comparisonBaseline === 'aws-foreign'
      ? Math.round(atlasTotalMonthly * 1.82)
      : Math.round(atlasTotalMonthly * 1.95);

  const monthlySavingsDzd = alternativeMonthly - atlasTotalMonthly;
  const savingsPercent = Math.round((monthlySavingsDzd / alternativeMonthly) * 100);
  const annualSavingsDzd = monthlySavingsDzd * 12;

  const handleExportQuote = () => {
    setExportedQuote(true);
    setTimeout(() => setExportedQuote(false), 3000);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-amber-950/60 border border-amber-800/60 text-xs font-mono text-amber-300 mb-2">
          <DollarSign className="w-3.5 h-3.5" />
          <span>{isAr ? 'كتالوج الأسعار الشفاف وحاسبة التكلفة الإجمالية (DZD Pricing & TCO)' : 'Official DZD Pricing Catalog & TCO Formulation'}</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'كتالوج الأسعار الرسمي بالدينار الجزائري (DZD): شفافية مطلقة وتوفير يصل إلى 50%'
            : 'Official Transparent Pricing in Algerian Dinars (DZD) & TCO Savings'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'أسعار حوسبة وقواعد بيانات وتخزين بالثانية وبالشهر بالعملة الوطنية، مع انعدام تام لرسوم نقل البيانات (Zero Egress عبر DZ-IX)، وحاسبة مالية تثبت تفوقنا على فواتير العملة الصعبة وتكاليف المولدات والصيانة التقليدية.'
            : 'Granular pay-as-you-go pricing billed in DZD (per-second & monthly), zero domestic data transfer fees, and an authoritative TCO calculator demonstrating up to 50% bottom-line savings over foreign cloud and legacy on-prem.'}
        </p>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveCatalogTab('calculator')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            activeCatalogTab === 'calculator'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Calculator className="w-4 h-4" />
          <span>{isAr ? 'حاسبة التكلفة الإجمالية للملكية (TCO Calculator)' : 'Interactive TCO Calculator'}</span>
        </button>

        <button
          onClick={() => setActiveCatalogTab('compute')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            activeCatalogTab === 'compute'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>{isAr ? 'الحوسبة (Compute vCPU & RAM)' : 'Compute Instances'}</span>
        </button>

        <button
          onClick={() => setActiveCatalogTab('dbaas')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            activeCatalogTab === 'dbaas'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Database className="w-4 h-4" />
          <span>{isAr ? 'قواعد البيانات المدارة (PostgreSQL / Redis)' : 'Managed DBaaS'}</span>
        </button>

        <button
          onClick={() => setActiveCatalogTab('storage')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            activeCatalogTab === 'storage'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <HardDrive className="w-4 h-4" />
          <span>{isAr ? 'التخزين الكتلي والشيئي (S3 & NVMe)' : 'S3 & Block Storage'}</span>
        </button>

        <button
          onClick={() => setActiveCatalogTab('network')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            activeCatalogTab === 'network'
              ? 'bg-amber-500/10 text-amber-400 border border-amber-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Network className="w-4 h-4" />
          <span>{isAr ? 'الشبكة الوطنية وحركة البيانات (Zero Egress)' : 'Zero-Egress Network'}</span>
        </button>
      </div>

      {/* Tab 1: TCO Savings Calculator */}
      {activeCatalogTab === 'calculator' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <TrendingDown className="w-5 h-5 text-amber-400" />
              <span>{isAr ? 'نموذج مقارنة التكلفة الإجمالية للملكية (TCO Savings Formulation)' : 'Total Cost of Ownership (TCO) Formulation Model'}</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl">
              {isAr
                ? 'قارن تكلفة تشغيل منظومتك السحابية على AtlasCloud بالدينار الجزائري مقابل الدفع بالدولار/اليورو في السحب الأجنبية أو تحمل تكاليف شراء وصيانة الخوادم والمولدات المحلية:'
                : 'Formulate your infrastructure operational expenditure in DZD versus foreign currency loss and datacenter capex:'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Input Configuration Sliders */}
            <div className="lg:col-span-7 bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-6">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  {isAr ? '1. حدد متطلبات بنيتك التحتية:' : '1. Define Workload Capacity:'}
                </span>
                <span className="text-xs font-mono text-amber-400">
                  {calcVcpu} vCPUs · {calcRamGb} GB RAM · {calcNvmeGb} GB NVMe
                </span>
              </div>

              {/* Slider 1: vCPUs */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{isAr ? 'أنوية المعالجة الحسابية (vCPU Cores):' : 'Compute vCPUs:'}</span>
                  <span className="font-mono text-cyan-400 font-bold">{calcVcpu} Cores (AMD EPYC)</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="64"
                  step="2"
                  value={calcVcpu}
                  onChange={(e) => setCalcVcpu(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>2 vCPUs</span>
                  <span>16 vCPUs</span>
                  <span>32 vCPUs</span>
                  <span>64 vCPUs</span>
                </div>
              </div>

              {/* Slider 2: RAM */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{isAr ? 'الذاكرة العشوائية (RAM Memory):' : 'RAM Capacity:'}</span>
                  <span className="font-mono text-cyan-400 font-bold">{calcRamGb} GB (DDR5 ECC)</span>
                </div>
                <input
                  type="range"
                  min="4"
                  max="256"
                  step="4"
                  value={calcRamGb}
                  onChange={(e) => setCalcRamGb(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>4 GB</span>
                  <span>32 GB</span>
                  <span>128 GB</span>
                  <span>256 GB</span>
                </div>
              </div>

              {/* Slider 3: NVMe Storage */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{isAr ? 'التخزين الكتلي فائق السرعة (NVMe Storage):' : 'NVMe Block Volume:'}</span>
                  <span className="font-mono text-cyan-400 font-bold">{calcNvmeGb} GB (100G RDMA)</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="4000"
                  step="50"
                  value={calcNvmeGb}
                  onChange={(e) => setCalcNvmeGb(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>50 GB</span>
                  <span>500 GB</span>
                  <span>2,000 GB</span>
                  <span>4,000 GB</span>
                </div>
              </div>

              {/* Slider 4: S3 Object Storage */}
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-medium">
                  <span className="text-slate-300">{isAr ? 'مخزن الكائنات السيادي (S3 Object Storage):' : 'S3 Replicated Storage:'}</span>
                  <span className="font-mono text-cyan-400 font-bold">{calcS3Tb} TB (Multi-Region S3)</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="50"
                  step="0.5"
                  value={calcS3Tb}
                  onChange={(e) => setCalcS3Tb(Number(e.target.value))}
                  className="w-full h-2 bg-slate-950 rounded-lg appearance-none cursor-pointer accent-cyan-400"
                />
                <div className="flex justify-between text-[10px] text-slate-500 font-mono">
                  <span>500 GB</span>
                  <span>5 TB</span>
                  <span>20 TB</span>
                  <span>50 TB</span>
                </div>
              </div>

              {/* Comparison Baseline Selector */}
              <div className="border-t border-slate-800 pt-4 space-y-2">
                <span className="text-xs font-bold text-slate-300 block">
                  {isAr ? '2. اختر معيار المقارنة للمؤسسة (Comparison Baseline):' : '2. Select Comparison Baseline:'}
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    onClick={() => setComparisonBaseline('aws-foreign')}
                    className={`p-3 rounded-lg border text-start transition-all cursor-pointer ${
                      comparisonBaseline === 'aws-foreign'
                        ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">
                      {isAr ? 'السحب الأجنبية (AWS / Azure / Hetzner)' : 'Foreign Cloud (AWS / Azure)'}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {isAr ? 'الدفع بالدولار + فارق الصرف + ضريبة الاقتطاع من المصدر 30% + رسوم نقل البيانات الدولية' : 'USD invoices + 30% foreign remittance tax + bandwidth egress'}
                    </div>
                  </button>

                  <button
                    onClick={() => setComparisonBaseline('onprem-datacenter')}
                    className={`p-3 rounded-lg border text-start transition-all cursor-pointer ${
                      comparisonBaseline === 'onprem-datacenter'
                        ? 'bg-amber-950/50 border-amber-500 text-amber-200'
                        : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                    }`}
                  >
                    <div className="text-xs font-bold mb-0.5">
                      {isAr ? 'مركز بيانات محلي تقليدي (On-Premises)' : 'Legacy On-Premise Facility'}
                    </div>
                    <div className="text-[11px] text-slate-400 leading-tight">
                      {isAr ? 'شراء عتاد + ديزل المولدات + كهرباء سونلغاز + صيانة التكييف + بطاريات UPS' : 'Hardware Capex + diesel generator fuel + cooling + UPS batteries'}
                    </div>
                  </button>
                </div>
              </div>
            </div>

            {/* Right: Real-time Bottom-Line Savings Summary Card */}
            <div className="lg:col-span-5 bg-gradient-to-b from-slate-900 to-slate-950 border border-amber-900/60 rounded-xl p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">
                    [TCO FINANCIAL IMPACT]
                  </span>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded">
                    {savingsPercent}% {isAr ? 'توفير مالي صافٍ' : 'Net Savings'}
                  </span>
                </div>

                {/* Comparative Price Display */}
                <div className="space-y-3">
                  <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-1">
                    <span className="text-[11px] text-slate-400 block">
                      {isAr ? 'تكلفة المنظومة الحالية المتوقعة (Alternative Cost):' : 'Estimated Alternative Monthly Cost:'}
                    </span>
                    <div className="text-xl font-bold font-mono text-rose-400 line-through">
                      {alternativeMonthly.toLocaleString()} DZD
                    </div>
                    <span className="text-[10px] text-slate-500">
                      {comparisonBaseline === 'aws-foreign'
                        ? (isAr ? 'تشمل الضرائب وفارق صرف العملة الصعبة' : 'Includes foreign currency tax & cross-border egress')
                        : (isAr ? 'تشمل استهلاك الكهرباء ووقود المولدات والصيانة' : 'Includes Capex amortization, cooling & diesel')}
                    </span>
                  </div>

                  <div className="bg-amber-950/20 p-4 rounded-lg border border-amber-500/60 space-y-1">
                    <span className="text-[11px] text-amber-300 font-bold block">
                      {isAr ? 'تكلفة المنظومة على AtlasCloud السيادية:' : 'AtlasCloud Sovereign Monthly Cost:'}
                    </span>
                    <div className="text-3xl font-extrabold font-mono text-white text-emerald-400">
                      {atlasTotalMonthly.toLocaleString()}{' '}
                      <span className="text-sm font-normal text-slate-300">DZD / {isAr ? 'شهر' : 'mo'}</span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-400 flex items-center gap-1.5 pt-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                      <span>{isAr ? 'فاتورة رسمية بالدينار · معفاة من ضريبة التحويل الأجنبي' : '100% Tax-deductible local DZD invoice'}</span>
                    </div>
                  </div>
                </div>

                {/* Annual Savings Highlight */}
                <div className="p-4 rounded-lg bg-emerald-950/40 border border-emerald-800/60 text-center space-y-1">
                  <span className="text-[11px] text-emerald-300 font-mono uppercase block">
                    {isAr ? 'إجمالي الوفر المالي السنوي المحقق' : 'Total Net Annual Savings'}
                  </span>
                  <div className="text-2xl font-black font-mono text-emerald-300">
                    +{annualSavingsDzd.toLocaleString()} DZD
                  </div>
                  <span className="text-[10px] text-slate-400">
                    {isAr ? 'مبلغ يتم تحويله مباشرة إلى ميزانية التطوير والنمو' : 'Capital preserved directly into core business growth'}
                  </span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleExportQuote}
                  className="w-full py-2.5 px-4 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-amber-950"
                >
                  {exportedQuote ? <CheckCircle2 className="w-4 h-4" /> : <FileSpreadsheet className="w-4 h-4" />}
                  <span>{exportedQuote ? (isAr ? 'تم استخراج عرض الأسعار (Devis Proforma)!' : 'Proforma Quotation Generated!') : (isAr ? 'استخراج عرض أسعار رسمي (Devis Proforma)' : 'Export Official Proforma Quotation')}</span>
                </button>
                <div className="text-[10px] text-center text-slate-500 font-mono">
                  Guaranteed pricing valid for 12 months · No hidden setup fees
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Compute Instances */}
      {activeCatalogTab === 'compute' && (
        <div className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-800 pb-3 text-xs">
            <span className="text-slate-400">
              {isAr
                ? 'خوادم معالجة مخصصة مدعومة بأحدث معالجات AMD EPYC 9654 (Genoa) مع نظام تشغيل Talos Linux فائق الأمان:'
                : 'Bare-metal & MicroVM compute powered by AMD EPYC 9654 processors and immutable Talos Linux OS:'}
            </span>

            {/* Toggle Billing Unit */}
            <div className="flex items-center gap-1 bg-slate-900 p-1 rounded-lg border border-slate-800 font-mono text-[11px]">
              <button
                onClick={() => setBillingPeriod('monthly')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  billingPeriod === 'monthly'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'فوترة شهرية' : 'Monthly'}
              </button>
              <button
                onClick={() => setBillingPeriod('second')}
                className={`px-3 py-1 rounded transition-colors cursor-pointer ${
                  billingPeriod === 'second'
                    ? 'bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {isAr ? 'فوترة بالثانية (Pay-as-you-go)' : 'Per-Second'}
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {COMPUTE_PRICING_TIERS.map((tier) => (
              <div
                key={tier.planId}
                className="bg-slate-900/60 border border-slate-800 hover:border-slate-700 rounded-xl p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold text-white font-mono">{tier.planId}</span>
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
                      {tier.burstFrequencyGhz}
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-slate-200">
                      {isAr ? tier.nameAr : tier.name}
                    </h4>
                    <p className="text-[11px] text-slate-400 mt-1">
                      {isAr ? tier.recommendedForAr : tier.recommendedForEn}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 bg-slate-950/70 p-3 rounded-lg border border-slate-800/80 font-mono text-xs">
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">vCPU Cores</span>
                      <span className="text-slate-200 font-bold">{tier.vcpu} Cores</span>
                    </div>
                    <div>
                      <span className="text-[10px] text-slate-500 block uppercase">RAM Memory</span>
                      <span className="text-slate-200 font-bold">{tier.ramGb} GB DDR5</span>
                    </div>
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-3 flex items-baseline justify-between">
                  <div>
                    {billingPeriod === 'monthly' ? (
                      <div className="text-lg font-bold font-mono text-amber-400">
                        {tier.perMonthDzd.toLocaleString()} <span className="text-xs font-normal text-slate-400">DZD / mo</span>
                      </div>
                    ) : (
                      <div className="text-lg font-bold font-mono text-amber-400">
                        {tier.perSecondDzd.toFixed(5)} <span className="text-xs font-normal text-slate-400">DZD / sec</span>
                      </div>
                    )}
                    <span className="text-[10px] text-slate-500 block font-mono">Zero commitment · Cancel anytime</span>
                  </div>

                  <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2 py-1 rounded">
                    Sub-45s Boot
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Managed Databases (DBaaS) */}
      {activeCatalogTab === 'dbaas' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-400">
            {isAr
              ? 'قواعد بيانات سحابية مدارة بالكامل مع ترقيات فورية، نسخ تماثلي لحظي بين العاصمة ووهران، واسترجاع دقيق لأي ثانية (PITR):'
              : 'Production-ready database clusters with synchronous replication, automated point-in-time recovery, and zero ops overhead:'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {DBAAS_PRICING_TIERS.map((db, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2">
                    <span className="text-xs font-mono font-bold text-emerald-400">
                      {isAr ? db.engineAr : db.engine}
                    </span>
                    <span className="text-xs font-mono text-amber-400 font-bold">
                      {db.perMonthDzd.toLocaleString()} DZD / mo
                    </span>
                  </div>

                  <div className="text-xs text-slate-400 font-mono">
                    <span className="text-white font-bold">{db.spec}</span> · {db.ramGb} GB RAM · {db.storageGb} GB NVMe
                  </div>

                  <div className="text-[11px] text-cyan-300 bg-cyan-950/40 p-2 rounded border border-cyan-900/40 font-mono">
                    HA Topology: {isAr ? db.haModeAr : db.haModeEn}
                  </div>

                  <div className="space-y-1.5 pt-1">
                    {(isAr ? db.featuresAr : db.featuresEn).map((f, fi) => (
                      <div key={fi} className="flex items-center gap-2 text-xs text-slate-300">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                        <span>{f}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>RPO: 0 Bytes</span>
                  <span>RTO: &lt; 15s</span>
                  <span className="text-emerald-400">Auto Backup</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 4: Storage */}
      {activeCatalogTab === 'storage' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-400">
            {isAr
              ? 'تخزين مشفر سيادياً مطابق للقانون 18-07 مع أقراص NVMe فائقة السرعة ومخازن S3 موزعة جغرافياً:'
              : 'End-to-end encrypted storage tiers compliant with Law 18-07, offering low latency NVMe and resilient multi-region S3:'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {STORAGE_PRICING_ITEMS.map((item, idx) => (
              <div
                key={idx}
                className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="text-xs font-mono font-bold text-slate-400 uppercase">
                    Tier 0{idx + 1}
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {isAr ? item.storageTypeAr : item.storageType}
                  </h4>
                  <div className="text-xs text-cyan-400 font-mono">
                    {item.performanceClass}
                  </div>

                  <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 font-mono text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Durability:</span>
                      <span className="text-emerald-400">{item.durability}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Throughput:</span>
                      <span className="text-slate-300">{item.iopsLimit}</span>
                    </div>
                  </div>

                  <div className="space-y-1 pt-2">
                    {(isAr ? item.featuresAr : item.featuresEn).map((feat, fi) => (
                      <div key={fi} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="border-t border-slate-800/80 pt-3">
                  <div className="text-xl font-extrabold font-mono text-amber-400">
                    {item.pricePerGbMonthDzd} <span className="text-xs font-normal text-slate-400">DZD / GB / mo</span>
                  </div>
                  <span className="text-[10px] text-slate-500 block font-mono">
                    Zero ingress &amp; zero egress inside Algeria
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 5: Zero-Egress Network */}
      {activeCatalogTab === 'network' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-950 border border-cyan-800/60 rounded-xl p-6 sm:p-8">
            <div className="max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-900/60 border border-cyan-700/60 text-xs font-mono text-cyan-300">
                <Network className="w-3.5 h-3.5" />
                <span>{isAr ? 'ميزة تنافسية حصرية لسحابة أطلس' : 'Exclusive Sovereign Network Moat'}</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                {isAr
                  ? 'حركة نقل البيانات الوطنية مجانية 100% (Zero Egress Fees)'
                  : 'Zero National Data Egress Fees Across Algeria'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                {isAr
                  ? 'بينما تقوم السحب الأجنبية بفرض رسوم باهظة تصل إلى 0.09 دولار لكل غيغابايت عند خروج البيانات من خوادمها، تتيح AtlasCloud تبادل ونقل البيانات بين مراكز البيانات الأربعة ومستخدمي الإنترنت في الجزائر مجاناً بنسبة 100% دون أي تكلفة خفية.'
                  : 'While foreign cloud providers penalize growth with punishing bandwidth egress taxes (up to $0.09/GB), AtlasCloud guarantees zero network egress fees for all domestic traffic across the country.'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono text-cyan-400 font-bold block uppercase">DZ-IX Direct Peering</span>
              <h4 className="text-sm font-bold text-white">
                {isAr ? 'ربط مباشر بنقطة تبادل الإنترنت الوطنية' : 'Direct Domestic Peering'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr ? NETWORK_PRICING_OVERVIEW.dzixPeeringAr : NETWORK_PRICING_OVERVIEW.dzixPeeringEn}
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono text-amber-400 font-bold block uppercase">Subsea Transit</span>
              <h4 className="text-sm font-bold text-white">
                {isAr ? 'حركة العبور الدولي السريعة' : 'Subsea International Transit'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr ? NETWORK_PRICING_OVERVIEW.internationalBandwidthAr : NETWORK_PRICING_OVERVIEW.internationalBandwidthEn}
              </p>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-2">
              <span className="text-xs font-mono text-emerald-400 font-bold block uppercase">DDoS Protection</span>
              <h4 className="text-sm font-bold text-white">
                {isAr ? 'حماية هجمات حجب الخدمة مجاناً' : 'Enterprise DDoS Scrubbing'}
              </h4>
              <p className="text-xs text-slate-400 leading-relaxed">
                {isAr ? NETWORK_PRICING_OVERVIEW.ddosMitigationAr : NETWORK_PRICING_OVERVIEW.ddosMitigationEn}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
