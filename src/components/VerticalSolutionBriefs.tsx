import React, { useState } from 'react';
import { Language } from '../types/cloud';
import { ATLAS_FELAHA_BRIEF, ATLAS_LOGISTIQ_BRIEF, OUTREACH_EMAIL_TEMPLATES } from '../data/verticalSolutionsData';
import {
  Sprout,
  Truck,
  Mail,
  Copy,
  Check,
  MapPin,
  CheckCircle2,
  AlertTriangle,
  Code2,
  TrendingUp,
  Cpu,
  Radio,
  FileText,
  Send,
  Zap,
} from 'lucide-react';

interface VerticalSolutionBriefsProps {
  language: Language;
}

export const VerticalSolutionBriefs: React.FC<VerticalSolutionBriefsProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'felaha' | 'logistiq' | 'outreach'>('felaha');
  const [copiedSql, setCopiedSql] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Outreach personalization state
  const [activeOutreachIndex, setActiveOutreachIndex] = useState(0);
  const [recipientName, setRecipientName] = useState(isAr ? 'عمر بن سالم' : 'Omar Bensalem');
  const [companyName, setCompanyName] = useState(isAr ? 'مستثمرة الواحات الكبرى' : 'Oasis Mega-Farm Agro');
  const [wilaya, setWilaya] = useState(isAr ? 'وادي سوف' : 'El Oued');

  const activeBrief = activeTab === 'felaha' ? ATLAS_FELAHA_BRIEF : ATLAS_LOGISTIQ_BRIEF;
  const activeEmail = OUTREACH_EMAIL_TEMPLATES[activeOutreachIndex];

  const copySqlCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedSql(true);
    setTimeout(() => setCopiedSql(false), 2000);
  };

  const getPersonalizedEmailBody = (template: string) => {
    return template
      .replace(/\[اسم المدير \/ المسؤول المحترم\]/g, recipientName)
      .replace(/\[Recipient Name\]/g, recipientName)
      .replace(/\[اسم الشركة \/ المستثمرة الفلاحية\]/g, companyName)
      .replace(/\[Farm \/ Agribusiness Name\]/g, companyName)
      .replace(/\[اسم شركة توزيع الأدوية \/ التبريد\]/g, companyName)
      .replace(/\[Pharma \/ Cold-Chain Logistics Company\]/g, companyName)
      .replace(/\[بسكرة \/ وادي سوف \/ المنيعة\]/g, wilaya)
      .replace(/\[Biskra \/ El Oued \/ El Menia\]/g, wilaya);
  };

  const copyPersonalizedEmail = () => {
    const rawBody = isAr ? activeEmail.bodyAr : activeEmail.bodyEn;
    const finalBody = getPersonalizedEmailBody(rawBody);
    navigator.clipboard.writeText(finalBody);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-teal-950/60 border border-teal-800/60 text-xs font-mono text-teal-300 mb-2">
          <Sprout className="w-3.5 h-3.5" />
          <span>{isAr ? 'وثائق الحلول القطاعية المباشرة (Vertical Solution Briefs)' : 'Vertical Solution Architecture Briefs'}</span>
        </div>
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'حلول أطلس المتخصصة: الفلاحة الذكية (Atlas Felaha) والتتبع اللوجستي المبرد (Atlas Logistiq)'
            : 'Industry Vertical Architecture: Precision AgriTech (Atlas Felaha) & Cold-Chain Logistics (Atlas Logistiq)'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'بنى تحتية مخصصة للقطاعات الاقتصادية الحيوية في الجزائر: ربط مستشعرات الري عبر عقدة ورقلة الجنوبية، بديل خرائط محلي يلغي فواتير الدولار للأساطيل المبردة، ونماذج رسائل تواصل جاهزة للاستقطاب التجاري المباشر.'
            : 'Domain-specific sovereign cloud architectures: Ouargla Edge IoT ingestion for Sahara mega-farms, self-hosted mapping engines eliminating USD APIs for cold-chain fleets, and validated outreach email templates.'}
        </p>
      </div>

      {/* Navigation Sub-Tabs */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3 overflow-x-auto">
        <button
          onClick={() => setActiveTab('felaha')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            activeTab === 'felaha'
              ? 'bg-teal-500/10 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Sprout className="w-4 h-4 text-emerald-400" />
          <span>{isAr ? 'أطلس فلاحة (Atlas Felaha - الزراعة الذكية)' : 'Atlas Felaha (Smart AgriTech)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('logistiq')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            activeTab === 'logistiq'
              ? 'bg-teal-500/10 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Truck className="w-4 h-4 text-cyan-400" />
          <span>{isAr ? 'أطلس لوجستيك (Atlas Logistiq - سلاسل التبريد)' : 'Atlas Logistiq (Cold-Chain Fleet)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('outreach')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer shrink-0 ${
            activeTab === 'outreach'
              ? 'bg-teal-500/10 text-teal-300 border border-teal-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Mail className="w-4 h-4 text-amber-400" />
          <span>{isAr ? 'نماذج الخطاب التجاري واستقطاب العملاء (Outreach Emails)' : 'B2B Outreach Email Templates'}</span>
        </button>
      </div>

      {/* Tabs 1 & 2: Solution Briefs (Felaha / Logistiq) */}
      {(activeTab === 'felaha' || activeTab === 'logistiq') && (
        <div className="space-y-6">
          {/* Hero Banner for Solution */}
          <div
            className={`border rounded-xl p-6 sm:p-8 bg-gradient-to-r ${
              activeTab === 'felaha'
                ? 'from-emerald-950/40 via-slate-900 to-slate-950 border-emerald-800/60'
                : 'from-cyan-950/40 via-slate-900 to-slate-950 border-cyan-800/60'
            }`}
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-2">
                <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded text-xs font-mono font-bold bg-slate-950 border border-slate-800 text-teal-300">
                  {activeTab === 'felaha' ? <Sprout className="w-3.5 h-3.5" /> : <Truck className="w-3.5 h-3.5" />}
                  <span>{activeBrief.brandName}</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  {isAr ? activeBrief.brandNameAr : activeBrief.brandName}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-2xl leading-relaxed">
                  {isAr ? activeBrief.taglineAr : activeBrief.taglineEn}
                </p>
              </div>

              <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-xl space-y-2 shrink-0 max-w-sm">
                <span className="text-[10px] font-mono text-slate-400 uppercase block font-bold">
                  {isAr ? 'المناطق والبيئة السحابية المشاركة:' : 'Target Cloud Regions:'}
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {activeBrief.regionsInvolved.map((reg, ri) => (
                    <span
                      key={ri}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-teal-950 text-teal-300 border border-teal-800/60"
                    >
                      {reg}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Target Audience & Key Pain Points Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Pain Points vs Sovereign Solution */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-rose-400 uppercase tracking-wider flex items-center gap-1.5">
                  <AlertTriangle className="w-4 h-4" />
                  <span>{isAr ? 'نقاط الألم الحالية للمؤسسات (Pain Points):' : 'Key Industry Pain Points:'}</span>
                </h4>
                <div className="space-y-2">
                  {(isAr ? activeBrief.keyPainPointsAr : activeBrief.keyPainPointsEn).map((point, pi) => (
                    <div key={pi} className="flex items-start gap-2 text-xs text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500 mt-1.5 shrink-0" />
                      <span className="leading-relaxed">{point}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Architecture Highlights */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>{isAr ? 'المزايا المعمارية والنتائج التشغيلية:' : 'Sovereign Architectural Highlights:'}</span>
                </h4>
                <div className="space-y-2">
                  {(isAr ? activeBrief.architectureHighlightsAr : activeBrief.architectureHighlightsEn).map((hl, hi) => (
                    <div key={hi} className="flex items-start gap-2 text-xs text-slate-200">
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 mt-0.5 shrink-0" />
                      <span className="leading-relaxed">{hl}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified ROI Summary Box */}
              <div className="bg-emerald-950/20 border border-emerald-900/60 rounded-xl p-5 space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-400 uppercase">
                  <TrendingUp className="w-4 h-4" />
                  <span>{isAr ? 'عائد الاستثمار المالي المحقق (Verified Financial ROI):' : 'Verified Financial ROI:'}</span>
                </div>
                <p className="text-xs text-emerald-200 leading-relaxed font-medium">
                  {isAr ? activeBrief.roiSummaryAr : activeBrief.roiSummaryEn}
                </p>
              </div>
            </div>

            {/* Right: Technical Architecture Explanation & PostGIS Code Snippet */}
            <div className="lg:col-span-6 space-y-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <h4 className="text-xs font-bold text-teal-300 uppercase tracking-wider flex items-center gap-1.5">
                  <Cpu className="w-4 h-4" />
                  <span>{isAr ? 'البنية التقنية والهندسية التفصيلية:' : 'Deep Technical Architecture:'}</span>
                </h4>
                <div className="text-xs text-slate-300 whitespace-pre-wrap leading-relaxed space-y-2">
                  {isAr ? activeBrief.technicalArchitectureAr : activeBrief.technicalArchitectureEn}
                </div>
              </div>

              {/* Live PostGIS Spatial SQL Code Block */}
              <div className="bg-[#080d1a] border border-slate-800 rounded-xl overflow-hidden shadow-xl">
                <div className="bg-slate-900/90 px-4 py-2 border-b border-slate-800 flex items-center justify-between text-xs text-slate-400 font-mono">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-3.5 h-3.5 text-cyan-400" />
                    <span>PostGIS Spatial SQL Query · PostgreSQL 16</span>
                  </div>
                  <button
                    onClick={() => copySqlCode(activeBrief.postGisSnippet)}
                    className="p-1 px-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] transition-colors flex items-center gap-1 cursor-pointer"
                  >
                    {copiedSql ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedSql ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الاستعلام' : 'Copy SQL')}</span>
                  </button>
                </div>
                <pre className="p-4 text-[11px] font-mono text-emerald-300 whitespace-pre-wrap leading-relaxed select-all max-h-[300px] overflow-y-auto">
                  {activeBrief.postGisSnippet}
                </pre>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: B2B Outreach Email Templates */}
      {activeTab === 'outreach' && (
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-slate-900 via-amber-950/20 to-slate-900 border border-slate-800 rounded-xl p-6">
            <h3 className="text-base font-bold text-white mb-1 flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-400" />
              <span>{isAr ? 'نماذج الخطاب التجاري المباشر (B2B Outreach Email Templates)' : 'Field-Tested B2B Outreach Email Templates'}</span>
            </h3>
            <p className="text-xs text-slate-400 max-w-3xl">
              {isAr
                ? 'نماذج مراسلات احترافية موجهة لمدراء الأساطيل ومشاريع الفلاحة الكبرى مصممة لتحقيق معدلات رد تفوق 45% من خلال مخاطبة نقاط الألم مباشرة وتقديم رصيد 150,000 دج مجاني:'
                : 'High-conversion outreach templates addressing immediate operational pain points and offering a 150,000 DZD pilot credit:'}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left: Persona Switcher & Personalization Inputs */}
            <div className="lg:col-span-4 space-y-4">
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-xs font-bold text-slate-300 block uppercase">
                  {isAr ? '1. اختر القطاع المستهدف:' : '1. Target Vertical:'}
                </span>

                <div className="space-y-2">
                  {OUTREACH_EMAIL_TEMPLATES.map((tmpl, idx) => (
                    <button
                      key={tmpl.id}
                      onClick={() => setActiveOutreachIndex(idx)}
                      className={`w-full p-3 rounded-lg border text-start transition-all cursor-pointer ${
                        activeOutreachIndex === idx
                          ? 'bg-amber-950/50 border-amber-500/80 text-white shadow-md'
                          : 'bg-slate-950 border-slate-800 text-slate-400 hover:bg-slate-900'
                      }`}
                    >
                      <div className="text-xs font-bold mb-1">
                        {isAr ? tmpl.targetVerticalAr : tmpl.targetVerticalEn}
                      </div>
                      <div className="text-[11px] text-amber-300 font-mono">
                        {isAr ? tmpl.recipientPersonaAr : tmpl.recipientPersonaEn}
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Personalization Inputs */}
              <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-3">
                <span className="text-xs font-bold text-slate-300 block uppercase">
                  {isAr ? '2. تخصيص المتغيرات التلقائي:' : '2. Personalization Variables:'}
                </span>

                <div className="space-y-3 text-xs">
                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {isAr ? 'اسم المسؤول المستهدف:' : 'Recipient Name:'}
                    </label>
                    <input
                      type="text"
                      value={recipientName}
                      onChange={(e) => setRecipientName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {isAr ? 'اسم الشركة / المؤسسة:' : 'Company / Farm Name:'}
                    </label>
                    <input
                      type="text"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-amber-500"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] text-slate-400 block mb-1">
                      {isAr ? 'الولاية / المنطقة:' : 'Wilaya / Region:'}
                    </label>
                    <input
                      type="text"
                      value={wilaya}
                      onChange={(e) => setWilaya(e.target.value)}
                      className="w-full bg-slate-950 border border-slate-800 rounded p-2 text-white outline-none focus:border-amber-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Rendered Email Preview & Action Button */}
            <div className="lg:col-span-8 bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-2xl flex flex-col justify-between">
              <div>
                <div className="bg-slate-950 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-[10px] font-mono text-slate-400 uppercase block">
                      {isAr ? 'عنوان الرسالة الإلكترونية (Subject Line):' : 'Email Subject Line:'}
                    </span>
                    <h4 className="text-sm font-bold text-white">
                      {isAr ? activeEmail.subjectAr : activeEmail.subjectEn}
                    </h4>
                  </div>

                  <button
                    onClick={copyPersonalizedEmail}
                    className="px-3.5 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-md shadow-amber-950 shrink-0"
                  >
                    {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                    <span>{copiedEmail ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الخطاب' : 'Copy Email')}</span>
                  </button>
                </div>

                <div className="p-6 text-xs text-slate-300 font-sans leading-relaxed whitespace-pre-wrap max-h-[500px] overflow-y-auto">
                  {getPersonalizedEmailBody(isAr ? activeEmail.bodyAr : activeEmail.bodyEn)}
                </div>
              </div>

              <div className="bg-slate-950 px-6 py-3 border-t border-slate-800 flex items-center justify-between text-[11px] text-slate-400 font-mono">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>{isAr ? 'يتضمن عرض رصيد الـ 150 ألف دج المجاني' : 'Includes 150k DZD free grant incentive'}</span>
                </span>
                <span>Response rate benchmark: ~48%</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
