import React, { useState } from 'react';
import { Language } from '../types/cloud';
import { DEMO_REPO_README_MARKDOWN, ZERO_DOWNTIME_MIGRATION_STEPS, HACKDZ_CHALLENGE_DATA } from '../data/devRelData';
import { BookOpen, Copy, Check, Terminal, GitBranch, Trophy, ArrowRight, ShieldCheck, Zap, Sparkles, CheckCircle2, Server, Globe, Download } from 'lucide-react';

interface DevRelBlueprintProps {
  language: Language;
}

export const DevRelBlueprint: React.FC<DevRelBlueprintProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'readme' | 'migration' | 'hackathon'>('readme');
  const [copiedReadme, setCopiedReadme] = useState(false);
  const [copiedVoucher, setCopiedVoucher] = useState(false);
  const [activeMigrationStep, setActiveMigrationStep] = useState(1);
  const [redeemedStatus, setRedeemedStatus] = useState<string | null>(null);

  const copyReadme = () => {
    navigator.clipboard.writeText(DEMO_REPO_README_MARKDOWN);
    setCopiedReadme(true);
    setTimeout(() => setCopiedReadme(false), 2000);
  };

  const copyVoucher = () => {
    navigator.clipboard.writeText(HACKDZ_CHALLENGE_DATA.igniteVoucherCode);
    setCopiedVoucher(true);
    setTimeout(() => setCopiedVoucher(false), 2000);
  };

  const handleSimulateRedeem = () => {
    setRedeemedStatus('processing');
    setTimeout(() => {
      setRedeemedStatus('success');
    }, 800);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-xs font-mono text-emerald-300 mb-2">
          <GitBranch className="w-3.5 h-3.5" />
          <span>{isAr ? 'دليل المستودع البرمجي التجريبي والـ DevRel — GitHub Demo Blueprint' : 'DevRel Blueprint & Open-Source Quickstart'}</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'مستودع المطورين التجريبي: إطلاق كوبرنيتيس وPostGIS في 5 دقائق، الترحيل دون توقف، وهاكاثون HackDZ'
            : 'Sovereign GitHub Demo Blueprint, Zero-Downtime Migration & HackDZ Challenge'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'دليل عملي شامل موجه لمهندسي الـ DevOps والمطورين في الجزائر: مستودع GitHub موثق، خطة ترحيل احترافية من AWS إلى السحابة السيادية دون أي انقطاع، وتفاصيل هاكاثون الجزائر مع رصيد 150,000 دج مجاني.'
            : 'Comprehensive developer blueprint: production-ready GitHub repository README, 5-phase zero-downtime migration guide from AWS, and official HackDZ Cloud Challenge announcement with instant 150k DZD grant activation.'}
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('readme')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'readme'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isAr ? 'ملف README.md للمستودع التجريبي' : 'GitHub Demo README.md'}</span>
        </button>

        <button
          onClick={() => setActiveTab('migration')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'migration'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Zap className="w-4 h-4" />
          <span>{isAr ? 'دليل الترحيل دون توقف (Zero-Downtime)' : 'Zero-Downtime Migration Guide'}</span>
        </button>

        <button
          onClick={() => setActiveTab('hackathon')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'hackathon'
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Trophy className="w-4 h-4" />
          <span>{isAr ? 'هاكاثون HackDZ Cloud ورصيد 150 ألف دج' : 'HackDZ Cloud Challenge & Credits'}</span>
        </button>
      </div>

      {/* Tab 1: README.md Blueprint */}
      {activeTab === 'readme' && (
        <div className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-900/60 p-4 rounded-xl border border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-emerald-950 flex items-center justify-center border border-emerald-800/60 text-emerald-400">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <div className="text-xs font-mono font-bold text-white flex items-center gap-2">
                  <span>github.com/atlascloud-dz/sovereign-quickstart-blueprint</span>
                  <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-900/50 text-emerald-300 border border-emerald-800">
                    Public
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {isAr ? 'فرع الإنتاج الرئيسي (main) · كود Terraform جاهز ومطابق للقانون 18-07' : 'main branch · Production-ready Terraform manifests for Talos K8s & PostgreSQL 16'}
                </div>
              </div>
            </div>

            <button
              onClick={copyReadme}
              className="px-3.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              {copiedReadme ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              <span>{copiedReadme ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ ملف README.md' : 'Copy README.md')}</span>
            </button>
          </div>

          {/* GitHub Markdown Render Frame */}
          <div className="bg-[#0b101e] border border-slate-800 rounded-xl overflow-hidden shadow-2xl">
            <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
              <div className="flex items-center gap-2">
                <BookOpen className="w-3.5 h-3.5 text-slate-400" />
                <span>README.md</span>
              </div>
              <span className="text-[11px] text-slate-500">Markdown · 100% Validated</span>
            </div>

            <div className="p-6 text-slate-300 text-xs font-mono leading-relaxed space-y-4 max-h-[550px] overflow-y-auto">
              <pre className="whitespace-pre-wrap font-mono text-[11px] text-slate-300 bg-slate-950/70 p-4 rounded-lg border border-slate-800/80">
                {DEMO_REPO_README_MARKDOWN}
              </pre>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Zero-Downtime Migration Guide */}
      {activeTab === 'migration' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-emerald-950/20 to-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Zap className="w-5 h-5 text-emerald-400" />
              <span>{isAr ? 'استراتيجية الترحيل السلس دون توقف للخدمة (Zero-Downtime Migration Blueprint)' : 'Zero-Downtime Live Migration Blueprint'}</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl">
              {isAr
                ? 'كيف تقوم بترحيل منظومة إنتاجية ضخمة (قواعد بيانات PostgreSQL ومزارع Kubernetes) من AWS أو مراكز الاستضافة المحلية الفردية إلى AtlasCloud في 5 مراحل متتالية دون انقطاع ثانية واحدة للمستخدمين:'
                : 'How to migrate enterprise databases and Kubernetes clusters from AWS or legacy local hosters to AtlasCloud in 5 zero-risk phases with zero user impact:'}
            </p>
          </div>

          {/* Stepper Navigation */}
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
            {ZERO_DOWNTIME_MIGRATION_STEPS.map((s) => {
              const isActive = activeMigrationStep === s.stepNumber;
              return (
                <button
                  key={s.stepNumber}
                  onClick={() => setActiveMigrationStep(s.stepNumber)}
                  className={`p-3 rounded-lg border text-start transition-all cursor-pointer ${
                    isActive
                      ? 'bg-emerald-950/50 border-emerald-500/80 text-white shadow-md'
                      : 'bg-slate-900/50 border-slate-800 text-slate-400 hover:bg-slate-850'
                  }`}
                >
                  <div className="text-[10px] font-mono text-emerald-400 font-bold mb-1">
                    {isAr ? `المرحلة ${s.stepNumber}` : `Step ${s.stepNumber}`}
                  </div>
                  <div className="text-xs font-semibold line-clamp-1">
                    {isAr ? s.phaseAr : s.phaseEn}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Detailed Step Card */}
          {(() => {
            const current = ZERO_DOWNTIME_MIGRATION_STEPS.find((s) => s.stepNumber === activeMigrationStep) || ZERO_DOWNTIME_MIGRATION_STEPS[0];
            return (
              <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-6 space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-wider block">
                      {isAr ? current.phaseAr : current.phaseEn}
                    </span>
                    <h4 className="text-base font-bold text-white mt-0.5">
                      {isAr ? current.titleAr : current.titleEn}
                    </h4>
                  </div>
                  <span className="px-3 py-1 bg-emerald-950/80 border border-emerald-800/60 rounded text-xs font-mono text-emerald-300">
                    Step {current.stepNumber} of 5
                  </span>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Left: Technical Architecture & Mechanics */}
                  <div className="space-y-4">
                    <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-2">
                      <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                        {isAr ? 'الإجراء الهندسي والتنفيذ:' : 'Engineering Execution Details:'}
                      </span>
                      <p className="text-xs text-slate-300 leading-relaxed">
                        {isAr ? current.technicalDetailsAr : current.technicalDetailsEn}
                      </p>
                    </div>

                    <div className="bg-emerald-950/20 border border-emerald-900/50 rounded-lg p-4 space-y-2">
                      <div className="flex items-center gap-1.5 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                        <ShieldCheck className="w-4 h-4" />
                        <span>{isAr ? 'ضمان استمرارية الخدمة (Zero-Downtime Guarantee):' : 'Zero-Downtime Guarantee:'}</span>
                      </div>
                      <p className="text-xs text-emerald-200/90 leading-relaxed">
                        {isAr ? current.zeroDowntimeMechanismAr : current.zeroDowntimeMechanismEn}
                      </p>
                    </div>
                  </div>

                  {/* Right: Concrete Command Snippet */}
                  <div className="space-y-2">
                    <span className="text-xs font-mono text-slate-400 block">
                      {isAr ? 'أمر التنفيذ عبر atlas-cli / kubectl:' : 'Execution Command in Terminal:'}
                    </span>
                    <div className="bg-[#080d1a] border border-slate-800 rounded-lg p-4 font-mono text-xs text-emerald-300 relative">
                      <pre className="whitespace-pre-wrap leading-relaxed select-all">
                        {current.commandSnippet}
                      </pre>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(current.commandSnippet);
                        }}
                        className="absolute top-2 right-2 p-1.5 bg-slate-800/80 hover:bg-slate-700 text-slate-300 rounded text-[11px] cursor-pointer"
                        title="Copy command"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    <div className="pt-2 flex justify-between items-center text-xs text-slate-500">
                      <span>RPO: 0 Bytes · RTO: &lt; 300ms</span>
                      <div className="flex items-center gap-2">
                        {current.stepNumber > 1 && (
                          <button
                            onClick={() => setActiveMigrationStep((prev) => prev - 1)}
                            className="px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded cursor-pointer"
                          >
                            {isAr ? 'السابق' : 'Previous'}
                          </button>
                        )}
                        {current.stepNumber < 5 && (
                          <button
                            onClick={() => setActiveMigrationStep((prev) => prev + 1)}
                            className="px-2.5 py-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded cursor-pointer"
                          >
                            {isAr ? 'التالي' : 'Next Step'}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </div>
      )}

      {/* Tab 3: HackDZ Challenge Portal */}
      {activeTab === 'hackathon' && (
        <div className="space-y-6">
          {/* Main Hero Card for HackDZ */}
          <div className="relative rounded-xl border border-purple-800/60 bg-gradient-to-r from-purple-950/40 via-slate-900 to-slate-950 p-6 sm:p-8 overflow-hidden">
            <div className="relative z-10 space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-900/60 border border-purple-700/60 text-xs font-mono text-purple-300">
                <Trophy className="w-3.5 h-3.5 text-amber-400" />
                <span>{isAr ? 'الهاكاثون الوطني الرسمي للمطورين — HackDZ 2026' : 'Official National Hackathon'}</span>
              </div>

              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-2xl font-extrabold text-white tracking-tight">
                    {isAr ? HACKDZ_CHALLENGE_DATA.titleAr : HACKDZ_CHALLENGE_DATA.titleEn}
                  </h3>
                  <p className="text-xs text-slate-300 mt-1 max-w-2xl">
                    {isAr ? HACKDZ_CHALLENGE_DATA.taglineAr : HACKDZ_CHALLENGE_DATA.taglineEn}
                  </p>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 p-3.5 rounded-xl text-end shrink-0">
                  <span className="text-[10px] font-mono text-slate-400 block uppercase">
                    {isAr ? 'إجمالي الجوائز النقدية' : 'Total Prize Pool'}
                  </span>
                  <span className="text-xl font-bold font-mono text-amber-400">
                    {HACKDZ_CHALLENGE_DATA.totalPrizePoolDzd}
                  </span>
                  <span className="text-[11px] text-purple-400 block font-mono">
                    {isAr ? HACKDZ_CHALLENGE_DATA.datesAr : HACKDZ_CHALLENGE_DATA.datesEn}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* 3 Challenge Pillars */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {HACKDZ_CHALLENGE_DATA.pillars.map((pillar, i) => (
              <div key={i} className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 flex flex-col justify-between space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-800">
                      Track 0{i + 1}
                    </span>
                    <span className="text-xs font-mono font-bold text-amber-400">
                      {pillar.prizeDzd}
                    </span>
                  </div>
                  <h4 className="text-sm font-bold text-white">
                    {isAr ? pillar.titleAr : pillar.titleEn}
                  </h4>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    {isAr ? pillar.descriptionAr : pillar.descriptionEn}
                  </p>
                </div>

                <div className="border-t border-slate-800/80 pt-3 space-y-1">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                    {isAr ? 'المخرجات المتوقعة:' : 'Deliverables:'}
                  </span>
                  <div className="flex flex-wrap gap-1">
                    {(isAr ? pillar.deliverablesAr : pillar.deliverablesEn).map((d, di) => (
                      <span key={di} className="text-[10px] font-mono text-slate-300 bg-slate-950 px-1.5 py-0.5 rounded border border-slate-800">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Instant Voucher Activation Box */}
          <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-purple-950/30 border border-purple-800/50 rounded-xl p-6">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
              <div className="lg:col-span-8 space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold text-purple-400">
                  <Sparkles className="w-4 h-4" />
                  <span>{isAr ? 'رصيد باقة Atlas Ignite المجانية (150,000 دج) لكل متسابق' : 'Atlas Ignite 150k DZD Free Grant for Participants'}</span>
                </div>
                <h4 className="text-base font-bold text-white">
                  {isAr ? 'كيف تستلم وتفعل رصيدك السحابي فورياً في 30 ثانية؟' : 'How to Claim & Activate Your 150k DZD Grant in 30 Seconds:'}
                </h4>
                <div className="space-y-1.5 text-xs text-slate-300">
                  {(isAr ? HACKDZ_CHALLENGE_DATA.howToClaimAr : HACKDZ_CHALLENGE_DATA.howToClaimEn).map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-purple-400 font-mono font-bold">{idx + 1}.</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-4 bg-slate-950 border border-purple-900/60 rounded-xl p-5 space-y-4 text-center">
                <span className="text-[11px] font-mono text-slate-400 block uppercase">
                  {isAr ? 'كود القسيمة الرسمي المعتمد' : 'Official Voucher Promo Code'}
                </span>
                <div className="font-mono text-base font-extrabold text-cyan-300 tracking-wider bg-slate-900 p-2.5 rounded border border-cyan-800/50 select-all">
                  {HACKDZ_CHALLENGE_DATA.igniteVoucherCode}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={copyVoucher}
                    className="flex-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    {copiedVoucher ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedVoucher ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الكود' : 'Copy Code')}</span>
                  </button>

                  <button
                    onClick={handleSimulateRedeem}
                    className="flex-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white rounded text-xs font-bold transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-purple-950"
                  >
                    <Zap className="w-3.5 h-3.5 fill-current" />
                    <span>{isAr ? 'تفعيل فوري' : 'Redeem'}</span>
                  </button>
                </div>

                {redeemedStatus === 'processing' && (
                  <div className="text-[11px] text-amber-400 animate-pulse font-mono">
                    {isAr ? 'جاري التحقق مع بوابة الهوية السيادية...' : 'Verifying with Sovereign IAM...'}
                  </div>
                )}

                {redeemedStatus === 'success' && (
                  <div className="text-[11px] text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 p-2 rounded font-mono animate-in fade-in">
                    ✓ {isAr ? 'تم شحن رصيد 150,000 دج بنجاح في حسابك!' : '150,000 DZD Credits credited successfully!'}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
