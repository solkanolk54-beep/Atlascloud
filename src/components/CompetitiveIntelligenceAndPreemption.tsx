import React, { useState } from 'react';
import { Language, CompetitorScenario, NichePreemptionPlay } from '../types/cloud';
import { COMPETITOR_SCENARIOS, NICHE_PREEMPTION_PLAYS } from '../data/competitiveIntelligenceData';
import { Eye, Shield, Sword, AlertTriangle, Globe, Compass, ArrowRight, CheckCircle2, XCircle, Zap, Crosshair } from 'lucide-react';

interface CompetitiveIntelligenceProps {
  language: Language;
}

export const CompetitiveIntelligenceAndPreemption: React.FC<CompetitiveIntelligenceProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'scenarios' | 'niches' | 'wargame'>('scenarios');
  const [selectedScenarioId, setSelectedScenarioId] = useState<string>('scenario-huawei-proxy');
  const [wargameSimulation, setWargameSimulation] = useState<string | null>(null);

  const selectedScenario =
    COMPETITOR_SCENARIOS.find((s) => s.id === selectedScenarioId) || COMPETITOR_SCENARIOS[0];

  const runWargame = (moveId: string) => {
    setWargameSimulation(moveId);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/60 text-xs font-mono text-purple-300 mb-2">
          <Eye className="w-3.5 h-3.5" />
          <span>{isAr ? 'الاستخبارات التنافسية وأفق 2028 — Competitive Intelligence & Threat Modeling' : 'Competitive Intelligence & 2028 Expansion Scenarios'}</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'رصد تحركات المنافس نحو العمالقة (Hyperscalers) وإفريقيا: استراتيجية الدفاع والهجوم الاستباقي'
            : 'Anticipating Competitor Hyperscaler Alliances & Preemptive Niche Domination'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'تحليل سيناريوهات تحالفات المنافس القادمة مع عمالقة السحابة (Huawei, Azure) وطموحه الإقليمي نحو الساحل الإفريقي بحلول 2028، مع صياغة خطة هجومية ودفاعية لاحتلال القطاعات المتخصصة (FinTech، الطاقة، AgriTech) قبل أن يبدأ توسعه.'
            : 'Threat modeling competitor maneuvers toward hyperscaler white-labeling and Pan-African expansion by 2028, paired with a defensive and offensive preemption playbook across high-margin sovereign niches.'}
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('scenarios')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'scenarios'
              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Compass className="w-4 h-4" />
          <span>{isAr ? 'سيناريوهات المنافس والعمالقة (2026 - 2028)' : 'Competitor Hyperscaler Scenarios'}</span>
        </button>

        <button
          onClick={() => setActiveTab('niches')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'niches'
              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Crosshair className="w-4 h-4" />
          <span>{isAr ? 'احتلال القطاعات المتخصصة (Niche Domination)' : 'Niche Markets Domination'}</span>
        </button>

        <button
          onClick={() => setActiveTab('wargame')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'wargame'
              ? 'bg-purple-500/10 text-purple-300 border border-purple-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sword className="w-4 h-4" />
          <span>{isAr ? 'محاكي المناورات والرد التكتيكي (Wargame Simulator)' : 'Wargame Counter-Strike Simulator'}</span>
        </button>
      </div>

      {/* Tab 1: Competitor Scenarios & Hyperscaler Moves */}
      {activeTab === 'scenarios' && (
        <div className="space-y-6">
          {/* Scenario Selector Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {COMPETITOR_SCENARIOS.map((scen) => {
              const isSelected = selectedScenarioId === scen.id;
              return (
                <button
                  key={scen.id}
                  onClick={() => setSelectedScenarioId(scen.id)}
                  className={`p-4 rounded-xl border text-start transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-slate-800/90 border-purple-500/80 shadow-lg shadow-purple-950/40'
                      : 'bg-slate-900/50 border-slate-800 hover:bg-slate-850 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-mono text-purple-400 font-bold">
                      {scen.timeHorizon}
                    </span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded border ${
                        scen.probability === 'High'
                          ? 'bg-rose-950/60 text-rose-300 border-rose-900/60'
                          : 'bg-amber-950/60 text-amber-300 border-amber-900/60'
                      }`}
                    >
                      {isAr ? scen.probabilityLabelAr : `${scen.probability} Probability`}
                    </span>
                  </div>
                  <h3 className="text-xs font-bold text-white mb-2 line-clamp-2">
                    {isAr ? scen.nameAr : scen.nameEn}
                  </h3>
                  <div className="flex flex-wrap gap-1">
                    {scen.hyperscalerTargets.map((hs, i) => (
                      <span key={i} className="text-[10px] font-mono text-slate-400 bg-slate-950 px-1.5 py-0.5 rounded">
                        {hs}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Deep Scenario Dissection */}
          <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
            <div className="lg:col-span-7 space-y-5">
              <div>
                <div className="flex items-center gap-2 text-xs font-mono text-purple-400 mb-1">
                  <span>{selectedScenario.timeHorizon}</span>
                  <span aria-hidden="true">·</span>
                  <span>{isAr ? selectedScenario.probabilityLabelAr : selectedScenario.probability}</span>
                </div>
                <h3 className="text-lg font-bold text-white">
                  {isAr ? selectedScenario.nameAr : selectedScenario.nameEn}
                </h3>
              </div>

              <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-4 space-y-1.5">
                <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
                  {isAr ? 'النية والخطوة الاستراتيجية المتوقعة للمنافس:' : 'Competitor Anticipated Strategic Intent:'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr ? selectedScenario.strategicIntentAr : selectedScenario.strategicIntentEn}
                </p>
              </div>

              <div className="bg-rose-950/20 border border-rose-900/50 rounded-lg p-4 space-y-1.5">
                <div className="flex items-center gap-1.5 text-rose-400 text-xs font-bold uppercase tracking-wider">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{isAr ? 'نقطة الضعف القاتلة في خطوة المنافس (Achilles\' Heel):' : 'The Fatal Achilles\' Heel:'}</span>
                </div>
                <p className="text-xs text-rose-200/90 leading-relaxed">
                  {isAr ? selectedScenario.competitorWeaknessAr : selectedScenario.competitorWeaknessEn}
                </p>
              </div>
            </div>

            <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
              <div className="bg-gradient-to-br from-purple-950/30 via-slate-900 to-slate-950 border border-purple-800/50 rounded-xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-purple-400">
                  <Sword className="w-5 h-5" />
                  <h4 className="text-xs font-bold text-white uppercase tracking-wider">
                    {isAr ? 'الضربة الاستباقية لسحابة أطلس السيادية:' : 'Our Preemptive Counter-Strike:'}
                  </h4>
                </div>
                <p className="text-xs text-purple-100 font-medium leading-relaxed bg-slate-950/70 p-4 rounded-lg border border-purple-900/40">
                  {isAr ? selectedScenario.preemptiveNeutralizationAr : selectedScenario.preemptiveNeutralizationEn}
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 rounded-xl p-4">
                <div className="text-[11px] font-bold text-slate-300 mb-2">
                  {isAr ? 'العمالقة والشركاء المستهدفون للمناورة:' : 'Hyperscaler Target Alliances:'}
                </div>
                <div className="space-y-1.5">
                  {selectedScenario.hyperscalerTargets.map((hs, i) => (
                    <div key={i} className="text-xs font-mono text-slate-300 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-purple-400" />
                      <span>{hs}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Niche Domination Strategy */}
      {activeTab === 'niches' && (
        <div className="space-y-6">
          <div className="text-xs text-slate-400 max-w-3xl">
            {isAr
              ? 'الاستراتيجية الدفاعية والهجومية: بدلاً من التنافس في معركة استضافة الخوادم العامة (Commodity VPS)، نقوم ببناء حواجز صد عميقة (Moats) والاستحواذ الكامل على القطاعات الحساسة الأعلى ربحية قبل حلول 2028.'
              : 'Our Preemptive Moat Strategy: Rather than fighting a commodity price race, we lock in high-margin, sticky sovereign verticals before the competitor can expand regionally.'}
          </div>

          <div className="space-y-6">
            {NICHE_PREEMPTION_PLAYS.map((play) => (
              <div key={play.id} className="bg-slate-900/60 border border-slate-800 rounded-xl p-6 space-y-4">
                <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800 pb-3">
                  <div>
                    <h3 className="text-base font-bold text-white">
                      {isAr ? play.nicheNameAr : play.nicheNameEn}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {isAr ? play.strategicImportanceAr : play.strategicImportanceEn}
                    </p>
                  </div>
                  <div className="flex flex-wrap items-center gap-1.5">
                    {play.targetAccounts.map((acc, i) => (
                      <span key={i} className="text-[10px] font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-800/60 px-2 py-0.5 rounded">
                        {acc}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Defensive Moat */}
                  <div className="bg-slate-950/70 border border-cyan-900/50 rounded-lg p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-cyan-400 text-xs font-bold uppercase tracking-wider">
                      <Shield className="w-4 h-4" />
                      <span>{isAr ? 'حاجز التحصين والدفاع (Defensive Moat):' : 'The Defensive Moat:'}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isAr ? play.defensiveMoatAr : play.defensiveMoatEn}
                    </p>
                  </div>

                  {/* Offensive Strike */}
                  <div className="bg-slate-950/70 border border-purple-900/50 rounded-lg p-4 space-y-1.5">
                    <div className="flex items-center gap-1.5 text-purple-400 text-xs font-bold uppercase tracking-wider">
                      <Sword className="w-4 h-4" />
                      <span>{isAr ? 'الهجوم الاستباقي للاقتناص (Offensive Strike):' : 'Preemptive Offensive Strike:'}</span>
                    </div>
                    <p className="text-xs text-slate-300 leading-relaxed">
                      {isAr ? play.offensiveStrikeAr : play.offensiveStrikeEn}
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/40 p-3 rounded-lg border border-slate-800/80 flex items-center justify-between text-xs">
                  <span className="text-slate-400">
                    {isAr ? 'حاجز الدخول الصعب أمام المنافس:' : 'Competitor Entry Barrier:'}
                  </span>
                  <span className="text-rose-300 font-medium max-w-2xl text-end">
                    {isAr ? play.competitorBarrierAr : play.competitorBarrierEn}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Wargame Simulator */}
      {activeTab === 'wargame' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-purple-950/20 to-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-2 flex items-center gap-2">
              <Sword className="w-5 h-5 text-purple-400" />
              <span>{isAr ? 'محاكي المناورات التكتيكية الاستباقية (Strategic Wargame)' : 'Strategic Wargame Simulator'}</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-2xl mb-4">
              {isAr
                ? 'اختر تحركاً تكتيكياً محتملاً للمنافس وشاهد كيف تقوم سحابة أطلس بإبطال مفعوله فورياً واقتناص العملاء:'
                : 'Select an anticipated competitor move to simulate our instantaneous counter-response:'}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
              <button
                onClick={() => runWargame('wargame-huawei')}
                className={`p-3.5 rounded-lg border text-xs font-medium text-start transition-all cursor-pointer ${
                  wargameSimulation === 'wargame-huawei'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {isAr ? '1. إعلان المنافس شراكة مع Huawei Cloud Stack' : '1. Competitor announces Huawei Cloud partnership'}
              </button>

              <button
                onClick={() => runWargame('wargame-tender-monopoly')}
                className={`p-3.5 rounded-lg border text-xs font-medium text-start transition-all cursor-pointer ${
                  wargameSimulation === 'wargame-tender-monopoly'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {isAr ? '2. استغلال تفضيل الصفقات العمومية لاحتكار الوزارات' : '2. Monopolizing ministerial tenders via startup decree'}
              </button>

              <button
                onClick={() => runWargame('wargame-sahel-expansion')}
                className={`p-3.5 rounded-lg border text-xs font-medium text-start transition-all cursor-pointer ${
                  wargameSimulation === 'wargame-sahel-expansion'
                    ? 'bg-purple-950/60 border-purple-500 text-purple-200 shadow-md'
                    : 'bg-slate-950/70 border-slate-800 text-slate-300 hover:bg-slate-900'
                }`}
              >
                {isAr ? '3. إطلاق حملة توسع إقليمي نحو تونس ودول الساحل' : '3. Launching Sahel regional expansion via telco proxy'}
              </button>
            </div>

            {/* Wargame Response Output */}
            {wargameSimulation && (
              <div className="bg-slate-950 border border-purple-800/60 rounded-xl p-5 space-y-4 animate-in fade-in">
                <div className="flex items-center justify-between text-xs border-b border-slate-800 pb-2">
                  <span className="font-mono text-purple-400 font-bold uppercase">
                    [WARGAME COUNTER-PLAY EXECUTION]
                  </span>
                  <span className="font-mono text-emerald-400">Response Speed: Immediate</span>
                </div>

                {wargameSimulation === 'wargame-huawei' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-slate-300 leading-relaxed">
                      <span className="font-bold text-amber-400">تحليل خطوة المنافس: </span>
                      {isAr
                        ? 'المنافس أصبح مجرد بائع وسيط (Reseller) لعتاد أجنبي معقد يتطلب عمولات وتراخيص سنوية باهظة بالعملة الصعبة.'
                        : 'Competitor effectively demoted to an appliance broker dependent on foreign software royalties.'}
                    </div>
                    <div className="p-3 bg-slate-900/90 rounded border border-purple-900/50 space-y-1.5 text-slate-200">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isAr ? 'الرد المضاد الفوري لسحابة أطلس:' : 'Our Counter-Attack:'}</span>
                      </div>
                      <p className="leading-relaxed">
                        {isAr
                          ? 'إطلاق حملة "السحابة المفتوحة المستقلة 100%": نكشف للبنوك والمؤسسات الوطنية أن حلول Huawei Stack تخلق احتكاراً أجنبياً ولا تمنحهم كود المصدر، بينما أطلس كلاود توفر كوبرنيتيس قياسياً مع توفير 45% في التكلفة الإجمالية ودون أي أبواب خلفية مشفرة.'
                          : 'Launch "True Sovereign Independence" campaign: Educate bank CIOs that Huawei Stack locks them into proprietary Chinese runtimes, whereas AtlasCloud runs pure upstream Kubernetes at 45% lower TCO with zero supply-chain risk.'}
                      </p>
                    </div>
                  </div>
                )}

                {wargameSimulation === 'wargame-tender-monopoly' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-slate-300 leading-relaxed">
                      <span className="font-bold text-amber-400">تحليل خطوة المنافس: </span>
                      {isAr
                        ? 'محاولة إغلاق المناقصات العمومية بشهادة Label Startup لحجب المنصات الأخرى.'
                        : 'Attempting to capture public tenders via startup decree advantages.'}
                    </div>
                    <div className="p-3 bg-slate-900/90 rounded border border-purple-900/50 space-y-1.5 text-slate-200">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isAr ? 'الرد المضاد الفوري لسحابة أطلس:' : 'Our Counter-Attack:'}</span>
                      </div>
                      <p className="leading-relaxed">
                        {isAr
                          ? 'تفعيل سلاح الامتثال الصارم (Compliance Weaponization): تقديم طعن قانوني وفني مستند إلى القانون 18-07 وتعليمات بنك الجزائر؛ المنافس يملك شهادات "قيد الإنجاز (En cours)" ومركزاً وحيداً دون خطة تعافي (PRA). دفتر شروط المناقصات الكبرى يستوجب قانونياً RPO=0 وموقع تعافي بديل متباعد جغرافياً، وهو ما يقصي المنافس فورياً من الصفقات الحساسة.'
                          : 'Leverage statutory compliance barriers: File formal technical challenges proving that tender specs for critical infrastructure mandate certified ISMS (ISO 27001) and active multi-site PRA. The competitor\'s single-DC setup is legally disqualified from tier-1 public infrastructure.'}
                      </p>
                    </div>
                  </div>
                )}

                {wargameSimulation === 'wargame-sahel-expansion' && (
                  <div className="space-y-3 text-xs">
                    <div className="text-slate-300 leading-relaxed">
                      <span className="font-bold text-amber-400">تحليل خطوة المنافس: </span>
                      {isAr
                        ? 'محاولة التوسع نحو تونس ودول الساحل دون امتلاك شبكة كوابل بحرية أو بنية موزعة حقيقية.'
                        : 'Attempting regional African expansion while burdened with high WAN latency from a single Algiers site.'}
                    </div>
                    <div className="p-3 bg-slate-900/90 rounded border border-purple-900/50 space-y-1.5 text-slate-200">
                      <div className="font-bold text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>{isAr ? 'الرد المضاد الفوري لسحابة أطلس:' : 'Our Counter-Attack:'}</span>
                      </div>
                      <p className="leading-relaxed">
                        {isAr
                          ? 'تفعيل ممر الألياف العابر للصحراء (Trans-Saharan Fiber Backbone): ربط عقدة ورقلة الجنوبية ومحطة الكوابل البحرية بوهران لتقديم ممر حوسبة إفريقي-أوروبي بزمن استجابة أقل من 25ms إلى مرسيليا وفالنسيا، ما يجعل أطلس كلاود الممر الإجباري لأي حركة بيانات إفريقية متجهة لأوروبا.'
                          : 'Activate the Trans-Saharan Fiber Highway: Interconnect Ouargla southern edge and Oran subsea landing station (Medusa / ALPAL-2), offering Pan-African enterprises sub-25ms transit to European internet exchanges, cutting the competitor out of cross-border data routing.'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
