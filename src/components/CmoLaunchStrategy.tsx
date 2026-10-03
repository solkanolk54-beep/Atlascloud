import React, { useState } from 'react';
import { Language, CmoPricingPackage, DeveloperCampaignPillar, VerticalSolution } from '../types/cloud';
import { CMO_PRICING_PACKAGES, DEVELOPER_CAMPAIGN_PILLARS, VERTICAL_SOLUTIONS } from '../data/cmoData';
import { Sparkles, Check, Gift, Terminal, Users, Sprout, Truck, ArrowRight, Zap, ShieldCheck, Copy, CheckCheck } from 'lucide-react';

interface CmoLaunchStrategyProps {
  language: Language;
}

export const CmoLaunchStrategy: React.FC<CmoLaunchStrategyProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'packages' | 'campaigns' | 'verticals'>('packages');
  const [claimedPackage, setClaimedPackage] = useState<string | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);

  const handleClaim = (pkgId: string) => {
    setClaimedPackage(pkgId);
  };

  const copyPromoCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-cyan-950/60 border border-cyan-800/60 text-xs font-mono text-cyan-300 mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{isAr ? 'رؤية مدير التسويق (CMO) — استراتيجية الإطلاق واقتناص المطورين' : 'CMO B2B Cloud Launch & Competitive Strategy'}</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'استراتيجية التنافس ضد مزود الصفقات العمومية: عروض المطورين، الباقات الترويجية، والقطاعات المتخصصة'
            : 'Outmaneuvering the Public-Tender Competitor: Developer Packages & Verticals'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'كيف نتفوق على منافس يركز على الصفقات الحكومية وعلامة Startup فقط، من خلال بناء ميزة تنافسية حقيقية للمطورين، وتقديم رصيد مجاني سخي، ودعم هندسي مباشر 24/7، وحملات متخصصة لقطاعي AgriTech واللوجستيك.'
            : 'How to out-execute a competitor sheltered by government tenders and a startup label, by unleashing a developer-first USP, generous cloud credit grants, 24/7 senior SRE Slack access, and verticalized solutions.'}
        </p>
      </div>

      {/* CMO 4-Point Strategic Battle-Card (The Unique Selling Proposition - USP) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-rose-400 block mb-1">
            {isAr ? 'حيلة المنافس' : 'Competitor Play'}
          </span>
          <h3 className="text-xs font-bold text-slate-200 mb-1">
            {isAr ? 'الاتكاء على Label Startup والصفقة العمومية' : 'Sheltered by Tenders & Startup Label'}
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {isAr
              ? 'الاعتماد على وساطات الصفقات الحكومية بدلاً من تحسين جودة المنتج وتجربة المطور، ما يجعله بطيئاً ومعقداً.'
              : 'Relying on public procurement favoritism rather than product excellence, leaving engineers with clunky, manual tooling.'}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-cyan-800/60 rounded-xl p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 block mb-1">
            {isAr ? 'ميزتنا التنافسية الفريدة (USP)' : 'Our Winning USP'}
          </span>
          <h3 className="text-xs font-bold text-white mb-1">
            {isAr ? 'السحابة السيادية الموجهة أولاً للمطور (Developer-First)' : 'The Developer-First Sovereign Cloud'}
          </h3>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {isAr
              ? 'تجربة مطور تضاهي Vercel وAWS مع سيادة جزائرية 100%: مزود Terraform، أداة `atlas-cli`، وتوسع كوبرنيتيس في 45 ثانية.'
              : 'Silicon Valley developer ergonomics with 100% domestic data residency: verified Terraform, single-binary CLI, sub-45s scaling.'}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-emerald-800/60 rounded-xl p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 block mb-1">
            {isAr ? 'عنصر المفاجأة التجاري' : 'Commercial Weapon'}
          </span>
          <h3 className="text-xs font-bold text-white mb-1">
            {isAr ? 'رصيد مجاني 150 ألف دج + دعم Slack مباشر' : '150k DZD Free Grants + Slack War Room'}
          </h3>
          <p className="text-[11px] text-slate-300 leading-relaxed">
            {isAr
              ? 'تخطي حواجز البداية برصيد سحابي ترحيبي وقناة Slack مخصصة مع مهندسي SRE حقيقيين، وليس مجرد تذاكر دعم بطيئة.'
              : 'Direct Slack Connect channel with L3 SREs (<15m SLA), eliminating the frustration of outsourced support tickets.'}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-4">
          <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 block mb-1">
            {isAr ? 'الصمود الجغرافي' : 'Resilience Superiority'}
          </span>
          <h3 className="text-xs font-bold text-slate-200 mb-1">
            {isAr ? 'توزيع جغرافي ضد نقطة الفشل الفردية' : 'Zero-SPOF Multi-Region Mesh'}
          </h3>
          <p className="text-[11px] text-slate-400 leading-relaxed">
            {isAr
              ? 'بينما يتمركز المنافس في مركز بيانات وحيد هش بالعاصمة، نوفر شبكة رباعية (العاصمة، وهران، قسنطينة، ورقلة).'
              : 'While the competitor relies on a single Algiers facility, we operate 4 active regions with instant failover.'}
          </p>
        </div>
      </div>

      {/* Navigation Tabs for CMO Strategy */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('packages')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'packages'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Gift className="w-4 h-4" />
          <span>{isAr ? 'عروض الأسعار والباقات الترويجية (Credits & Tiers)' : 'Promotional Packages & Credits'}</span>
        </button>

        <button
          onClick={() => setActiveTab('campaigns')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'campaigns'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>{isAr ? 'خطة حملات مجتمعات المطورين (DevRel Campaigns)' : 'Developer Advocacy Campaigns'}</span>
        </button>

        <button
          onClick={() => setActiveTab('verticals')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'verticals'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sprout className="w-4 h-4" />
          <span>{isAr ? 'الحلول القطاعية المتخصصة (AgriTech & Supply Chain)' : 'Verticalized Solutions'}</span>
        </button>
      </div>

      {/* Tab 1: Promotional Pricing Packages */}
      {activeTab === 'packages' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {CMO_PRICING_PACKAGES.map((pkg) => {
              const isClaimed = claimedPackage === pkg.id;
              return (
                <div
                  key={pkg.id}
                  className={`rounded-2xl p-6 flex flex-col justify-between transition-all relative ${
                    pkg.highlighted
                      ? 'bg-gradient-to-b from-slate-900 to-[#0b1222] border-2 border-cyan-500/80 shadow-2xl shadow-cyan-950/60'
                      : 'bg-slate-900/60 border border-slate-800'
                  }`}
                >
                  {pkg.highlighted && (
                    <div className="absolute -top-3 inset-x-0 flex justify-center">
                      <span className="bg-cyan-500 text-slate-950 text-[10px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                        {isAr ? 'الأكثر طلباً للشركات الناشئة' : 'Most Popular for Scale-ups'}
                      </span>
                    </div>
                  )}

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-base font-bold text-white">
                        {isAr ? pkg.nameAr : pkg.nameEn}
                      </h3>
                      <p className="text-xs text-cyan-400 mt-1 font-medium">
                        {isAr ? pkg.taglineAr : pkg.taglineEn}
                      </p>
                    </div>

                    {/* Credit Badge Box */}
                    <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                      <div className="text-[10px] text-slate-400 uppercase tracking-wider">
                        {isAr ? 'الرصيد الترويجي الممنوح:' : 'Promotional Cloud Credits:'}
                      </div>
                      <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums mt-0.5">
                        {isAr ? pkg.creditsFormattedDzd : `${pkg.creditsDzd.toLocaleString()} DZD Credits`}
                      </div>
                    </div>

                    <div className="text-xs text-slate-400">
                      <span className="font-semibold text-slate-300 block mb-0.5">
                        {isAr ? 'مستوى الدعم الفني الهندسي:' : 'Engineering Support Level:'}
                      </span>
                      <p className="text-slate-300 text-[11px] leading-relaxed">
                        {isAr ? pkg.supportLevelAr : pkg.supportLevelEn}
                      </p>
                    </div>

                    <div className="border-t border-slate-800/80 pt-3">
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-2">
                        {isAr ? 'المزايا والمواصفات السحابية:' : 'Included Sovereign Cloud Features:'}
                      </span>
                      <div className="space-y-2">
                        {(isAr ? pkg.featuresAr : pkg.featuresEn).map((feat, i) => (
                          <div key={i} className="flex items-start gap-2 text-xs text-slate-300">
                            <Check className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{feat}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-800">
                    <button
                      onClick={() => handleClaim(pkg.id)}
                      className={`w-full py-2.5 px-4 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        pkg.highlighted
                          ? 'bg-cyan-400 hover:bg-cyan-300 text-slate-950 shadow-md shadow-cyan-950'
                          : 'bg-slate-800 hover:bg-slate-700 text-white'
                      }`}
                    >
                      {isClaimed ? (
                        <>
                          <CheckCheck className="w-4 h-4 text-emerald-400" />
                          <span>{isAr ? 'تم تفعيل كود الباقة!' : 'Voucher Claimed!'}</span>
                        </>
                      ) : (
                        <span>{isAr ? pkg.ctaTextAr : pkg.ctaTextEn}</span>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Interactive Claim Modal / Banner */}
          {claimedPackage && (
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-cyan-950/40 border border-emerald-600/60 rounded-xl p-5 animate-in fade-in flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold">
                  <Gift className="w-4 h-4" />
                  <span>{isAr ? 'قسيمة الرصيد الترويجي جاهزة للتفعيل الفوري!' : 'Promotional Cloud Credit Voucher Generated!'}</span>
                </div>
                <p className="text-xs text-slate-300">
                  {isAr
                    ? 'انسخ رمز القسيمة التالي وقم بتفعيله عبر الطرفية أو لوحة التحكم لتفعيل الرصيد المجاني في حسابك:'
                    : 'Use the voucher code below in your terminal or dashboard to credit your sovereign project:'}
                </p>
                <div className="flex items-center gap-2 pt-1 font-mono text-xs">
                  <code className="px-3 py-1 bg-slate-950 text-cyan-300 rounded border border-cyan-800/80 font-bold">
                    DZ-{claimedPackage.toUpperCase()}-2026
                  </code>
                  <button
                    onClick={() => copyPromoCode(`atlas credit claim --code DZ-${claimedPackage.toUpperCase()}-2026`)}
                    className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs cursor-pointer flex items-center gap-1"
                  >
                    {copiedCode ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedCode ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ أمر التفعيل' : 'Copy CLI Command')}</span>
                  </button>
                </div>
              </div>

              <div className="text-[11px] font-mono text-slate-400">
                Command: <span className="text-slate-200">atlas credit claim --code DZ-...</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab 2: Developer Advocacy Campaigns */}
      {activeTab === 'campaigns' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-400 max-w-3xl">
            {isAr
              ? 'خطة تسويق غير تقليدية تخاطب مهندسي البرمجيات وفرق الـ DevOps بلغتهم، وتستثمر في طلبة الجامعات الكبرى لخلق ولاء تقني عميق يصعب على المنافس اختراقه.'
              : 'A grassroots developer relations playbook speaking directly to SREs and engineers, combining video viral demos, national university sponsorships, and hackathon prizes.'}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {DEVELOPER_CAMPAIGN_PILLARS.map((pillar) => (
              <div key={pillar.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4 flex flex-col justify-between">
                <div className="space-y-3">
                  <div className="flex items-center gap-2 text-cyan-400 text-xs font-mono">
                    <Terminal className="w-4 h-4" />
                    <span>{pillar.id === 'pillar-terminal-over-touch' ? 'Viral Campaign' : pillar.id === 'pillar-hackdz' ? 'National Hackathon' : 'Campus Flywheel'}</span>
                  </div>

                  <h3 className="text-sm font-bold text-white">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h3>

                  <div className="text-xs text-slate-400">
                    <span className="font-semibold text-slate-300 block mb-0.5">
                      {isAr ? 'القنوات المستهدفة:' : 'Distribution Channels:'}
                    </span>
                    <span className="text-[11px] text-cyan-300/90 font-mono">
                      {isAr ? pillar.channelAr : pillar.channelEn}
                    </span>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    {isAr ? pillar.descriptionAr : pillar.descriptionEn}
                  </p>

                  <div>
                    <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider block mb-1">
                      {isAr ? 'التنفيذ التكتيكي العملي:' : 'Tactical Execution:'}
                    </span>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {isAr ? pillar.tacticalExecutionAr : pillar.tacticalExecutionEn}
                    </p>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800">
                  <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider block mb-0.5">
                    {isAr ? 'المؤشر المستهدف (KPI):' : 'Campaign Target KPI:'}
                  </span>
                  <div className="text-xs font-bold text-emerald-300 font-mono">
                    {isAr ? pillar.kpiMetricAr : pillar.kpiMetricEn}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Specialized Verticals (AgriTech & Supply Chain) */}
      {activeTab === 'verticals' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-400 max-w-3xl">
            {isAr
              ? 'حلول سحابية سيادية مصممة خصيصاً للقطاعات الحيوية التي تحتاج إلى معالجة جغرافية (GIS) وحساسات إنترنت الأشياء (IoT) داخل الجزائر.'
              : 'Domain-specific sovereign cloud blueprints engineered for high-growth sectors requiring local geospatial processing (PostGIS) and low-latency edge computing.'}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {VERTICAL_SOLUTIONS.map((vert) => (
              <div key={vert.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-5">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="flex items-center gap-2">
                      {vert.id === 'vertical-agritech' ? (
                        <Sprout className="w-5 h-5 text-emerald-400" />
                      ) : (
                        <Truck className="w-5 h-5 text-cyan-400" />
                      )}
                      <h3 className="text-base font-bold text-white">
                        {isAr ? vert.verticalNameAr : vert.verticalNameEn}
                      </h3>
                    </div>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isAr ? vert.subtitleAr : vert.subtitleEn}
                    </p>
                  </div>
                  <span className="text-[10px] font-mono text-cyan-400 px-2 py-0.5 bg-slate-950 rounded border border-slate-800">
                    Sovereign Vertical
                  </span>
                </div>

                <div className="space-y-3 text-xs">
                  <div>
                    <span className="font-semibold text-slate-300 block mb-0.5">
                      {isAr ? 'المناطق السحابية المدمجة:' : 'Involved Cloud Regions:'}
                    </span>
                    <span className="text-cyan-300 font-mono text-[11px]">
                      {isAr ? vert.regionsInvolvedAr : vert.regionsInvolvedEn}
                    </span>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="font-semibold text-rose-400 block mb-1">
                      {isAr ? 'معضلة القطاع الحالية (Pain Point):' : 'Sector Core Pain Point:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {isAr ? vert.problemStatementAr : vert.problemStatementEn}
                    </p>
                  </div>

                  <div className="bg-slate-950/60 p-3 rounded-lg border border-slate-800">
                    <span className="font-semibold text-emerald-400 block mb-1">
                      {isAr ? 'الحل التقني السيادي (Sovereign Tech Solution):' : 'Sovereign Technical Solution:'}
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {isAr ? vert.sovereignTechStackAr : vert.sovereignTechStackEn}
                    </p>
                  </div>

                  <div className="border-t border-slate-800/80 pt-2 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">
                      {isAr ? 'العملاء المرجعيون:' : 'Target Segment:'}
                    </span>
                    <span className="text-slate-200 font-medium">
                      {isAr ? vert.referenceCustomerTypeAr : vert.referenceCustomerTypeEn}
                    </span>
                  </div>

                  <div className="bg-emerald-950/20 p-2.5 rounded border border-emerald-900/50 flex items-center gap-2 text-emerald-300 text-xs">
                    <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>{isAr ? vert.businessValueAr : vert.businessValueEn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
