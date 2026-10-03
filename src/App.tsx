import React, { useState } from 'react';
import { Language } from './types/cloud';
import { Header } from './components/Header';
import { ArchitectureTopology } from './components/ArchitectureTopology';
import { CmoLaunchStrategy } from './components/CmoLaunchStrategy';
import { CompetitiveIntelligenceAndPreemption } from './components/CompetitiveIntelligenceAndPreemption';
import { SecurityComplianceChecklist } from './components/SecurityComplianceChecklist';
import { CompetitorRiskAndDr } from './components/CompetitorRiskAndDr';
import { GoToMarketStrategy } from './components/GoToMarketStrategy';
import { CompetitorBenchmark } from './components/CompetitorBenchmark';
import { TechStackBlueprint } from './components/TechStackBlueprint';
import { DeveloperExperience } from './components/DeveloperExperience';
import { DevRelBlueprint } from './components/DevRelBlueprint';
import { CommercialPricingCatalog } from './components/CommercialPricingCatalog';
import { VerticalSolutionBriefs } from './components/VerticalSolutionBriefs';
import { MobileVsDxAnalysis } from './components/MobileVsDxAnalysis';
import { SovereignCompliance } from './components/SovereignCompliance';
import { Server, ShieldCheck, Terminal, Layers, ArrowUpRight, Cpu } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<Language>('ar');
  const [activeSection, setActiveSection] = useState<string>('topology');

  const isAr = language === 'ar';

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleQuickSimulate = () => {
    scrollToSection('topology');
  };

  return (
    <div className={`min-h-screen bg-[#090d16] text-slate-100 flex flex-col font-sans ${isAr ? 'dir-rtl' : 'dir-ltr'}`} dir={isAr ? 'rtl' : 'ltr'}>
      {/* 3-Zone Compliant Top Navigation Bar */}
      <Header
        language={language}
        onLanguageChange={setLanguage}
        activeSection={activeSection}
        onNavigate={scrollToSection}
        onQuickSimulate={handleQuickSimulate}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        {/* Hero Architectural & Executive Presentation Banner */}
        <div className="relative rounded-2xl border border-slate-800 bg-gradient-to-b from-slate-900/90 to-[#090d16] overflow-hidden p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Left Content */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-purple-950/60 border border-purple-800/60 text-xs font-mono text-purple-300">
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{isAr ? 'الاستخبارات التنافسية، استراتيجية الـ CMO والامتثال السيادي — AtlasCloud DZ' : 'Competitive Intel, CMO Strategy & Sovereign Cloud'}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight leading-tight">
                {isAr
                  ? 'السحابة السيادية الموجهة للمطورين: رصد تحركات المنافس نحو العمالقة وإفريقيا 2028'
                  : 'Sovereign NeoCloud & Preemptive Threat Intel: Outmaneuvering 2028 Expansion'}
              </h1>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-2xl">
                {isAr
                  ? 'تحليل استباقي لخطوات المنافس القادمة في جلب العمالقة (Huawei Stack / Azure Local) والتوسع نحو الساحل الإفريقي، مع خطة دفاعية وهجومية لتحصين القطاعات الحساسة (FinTech، الطاقة، AgriTech) وعروض المطورين بالدينار الجزائري.'
                  : 'Predictive threat modeling of competitor hyperscaler alliances and African expansion through 2028, backed by defensive moats, offensive niche preemption, and developer-first pricing.'}
              </p>

              {/* Quick Key Metrics */}
              <div className="pt-2 grid grid-cols-3 gap-4 border-t border-slate-800/80">
                <div>
                  <div className="text-xs text-slate-400">{isAr ? 'رصيد المطورين الترحيبي' : 'Free Dev Credits'}</div>
                  <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums">150,000 DZD</div>
                  <div className="text-[11px] text-slate-500">{isAr ? 'مجاناً لمدة 6 أشهر' : '6 Months Zero-Egress'}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">{isAr ? 'زمن الاستجابة الهندسي' : 'Engineering SLA'}</div>
                  <div className="text-xl font-bold font-mono text-cyan-400 tabular-nums">&lt; 15 min</div>
                  <div className="text-[11px] text-slate-500">{isAr ? 'Slack Connect مع مهندسي L3' : 'Dedicated L3 Slack Room'}</div>
                </div>

                <div>
                  <div className="text-xs text-slate-400">{isAr ? 'حاجز الاستقلالية السيادية' : 'Independent IP Moat'}</div>
                  <div className="text-xl font-bold font-mono text-purple-400 tabular-nums">100% Upstream</div>
                  <div className="text-[11px] text-slate-500">{isAr ? 'خالٍ من العتاد الاحتكاري' : 'Zero Foreign Lock-in'}</div>
                </div>
              </div>
            </div>

            {/* Hero Right Visual Asset */}
            <div className="lg:col-span-5 relative">
              <div className="aspect-[16/10] rounded-xl overflow-hidden border border-slate-800 shadow-2xl relative bg-slate-950">
                <img
                  src="/src/assets/images/sovereign_cloud_datacenter_1791034694957.jpg"
                  alt="Sovereign Cloud Datacenter Facility"
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#090d16] via-transparent to-transparent opacity-80" />
                <div className="absolute bottom-3 inset-x-3 flex items-center justify-between text-[11px] font-mono text-slate-300 bg-slate-900/80 backdrop-blur-sm px-3 py-1.5 rounded border border-slate-800">
                  <span className="flex items-center gap-1.5 text-cyan-400">
                    <Server className="w-3.5 h-3.5" />
                    <span>Tier-III+ Sovereign Infrastructure</span>
                  </span>
                  <span className="text-purple-400">Zero-Lockin</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Section 1: CMO B2B Launch Strategy, Promotional Packages & Verticals */}
        <section id="cmo-launch" className="scroll-mt-20">
          <CmoLaunchStrategy language={language} />
        </section>

        {/* Section: Commercial Pricing Catalog & Interactive TCO Savings Formulation */}
        <section id="commercial-pricing" className="scroll-mt-20">
          <CommercialPricingCatalog language={language} />
        </section>

        {/* Section: Vertical Solution Architecture Briefs (Atlas Felaha & Atlas Logistiq) */}
        <section id="vertical-solutions" className="scroll-mt-20">
          <VerticalSolutionBriefs language={language} />
        </section>

        {/* Section: DevRel Blueprint, GitHub Demo Repo, Zero-Downtime Migration & HackDZ */}
        <section id="devrel-blueprint" className="scroll-mt-20">
          <DevRelBlueprint language={language} />
        </section>

        {/* Section 2: Competitive Intelligence, Threat Modeling & 2028 Expansion Scenarios */}
        <section id="competitive-intel" className="scroll-mt-20">
          <CompetitiveIntelligenceAndPreemption language={language} />
        </section>

        {/* Section 3: Security & Compliance Checklist (Bank & Critical Sector Readiness) */}
        <section id="compliance" className="scroll-mt-20">
          <SecurityComplianceChecklist language={language} />
        </section>

        {/* Section 4: Competitor Risk Teardown & Master Disaster Recovery Blueprint */}
        <section id="risk-dr" className="scroll-mt-20">
          <CompetitorRiskAndDr language={language} />
        </section>

        {/* Section 5: Go-To-Market & Commercial Strategy */}
        <section id="gtm-strategy" className="scroll-mt-20">
          <GoToMarketStrategy language={language} />
        </section>

        {/* Section 6: Distributed Architecture Topology & Failover Drill Simulator */}
        <section id="topology" className="scroll-mt-20">
          <ArchitectureTopology language={language} />
        </section>

        {/* Section 7: Competitor Architectural Benchmark (OneCloud.dz vs Sovereign NeoCloud) */}
        <section id="competitor" className="scroll-mt-20">
          <CompetitorBenchmark language={language} />
        </section>

        {/* Section 8: Technical Stack Blueprint */}
        <section id="tech-stack" className="scroll-mt-20">
          <TechStackBlueprint language={language} />
        </section>

        {/* Section 9: Developer Experience (CLI Terminal, Terraform Provider, API Docs) */}
        <section id="dx-platform" className="scroll-mt-20">
          <DeveloperExperience language={language} />
        </section>

        {/* Section 10: Mobile vs DX Paradigm Critique */}
        <section id="mobile-critique" className="scroll-mt-20">
          <MobileVsDxAnalysis language={language} />
        </section>

        {/* Section 11: Sovereign Compliance, Law 18-07 & DZD Economics */}
        <section id="sovereignty-legal" className="scroll-mt-20">
          <SovereignCompliance language={language} />
        </section>
      </main>

      {/* Footer conforming to anti-slop guidelines */}
      <footer className="border-t border-slate-800/80 bg-slate-950 py-8 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-300">
              {isAr ? 'أطلس كلاود السيادي (AtlasCloud Sovereign)' : 'AtlasCloud Sovereign NeoCloud'}
            </span>
            <span aria-hidden="true">·</span>
            <span>{isAr ? 'الاستخبارات التنافسية، استراتيجية الـ CMO، الامتثال البنكي والحلول القطاعية' : 'Competitive Intel, CMO Strategy, Bank Compliance & Niche Domination'}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={() => scrollToSection('competitive-intel')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {isAr ? 'رصد المنافس 2028' : 'Threat Intel 2028'}
            </button>
            <button
              onClick={() => scrollToSection('cmo-launch')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {isAr ? 'باقات المطورين' : 'Developer Packs'}
            </button>
            <button
              onClick={() => scrollToSection('compliance')}
              className="hover:text-slate-300 transition-colors cursor-pointer"
            >
              {isAr ? 'الامتثال البنكي' : 'Bank Compliance'}
            </button>
          </div>

          <div className="font-mono text-[11px] text-slate-600">
            Certified under Algerian Law 18-07, ANPDP, ARPCE, & Bank of Algeria Standards
          </div>
        </div>
      </footer>
    </div>
  );
}
