import React, { useState } from 'react';
import { Language, CompetitorComparisonItem } from '../types/cloud';
import { COMPETITOR_COMPARISON } from '../data/cloudData';
import { ShieldCheck, AlertOctagon, CheckCircle2, XCircle, ArrowUpRight, Award, Zap } from 'lucide-react';

interface CompetitorBenchmarkProps {
  language: Language;
}

export const CompetitorBenchmark: React.FC<CompetitorBenchmarkProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [filter, setFilter] = useState<'all' | 'advantage' | 'parity'>('all');

  const filteredItems = COMPETITOR_COMPARISON.filter((item) => {
    if (filter === 'all') return true;
    return item.status === filter;
  });

  return (
    <div className="space-y-8">
      {/* Executive Breakdown Header */}
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr ? 'التحليل المعماري المقارن: OneCloud.dz مقابل السحابة الموزعة السيادية' : 'Competitor Teardown: OneCloud.dz vs Sovereign NeoCloud'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'دراسة نقدية معمارية معمقة تبين الفجوات التقنية لمزودي الاستضافة السحابية المحليين في الجزائر، وكيف تحول السحابة الموزعة نقاط الضعف إلى ميزة تنافسية كاسحة عبر الأتمتة والموثوقية.'
            : 'A deep architectural teardown of local Algerian cloud providers (e.g. OneCloud.dz), detailing failure vulnerabilities, lack of native IaC, and the architectural superiority of a distributed Sovereign NeoCloud.'}
        </p>
      </div>

      {/* 3 Executive Architecture Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-rose-400 mb-2">
            <AlertOctagon className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-100">
              {isAr ? 'معضلة مركز البيانات الفردي (SPOF)' : 'The Single Datacenter Trap'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'الاعتماد على مركز بيانات وحيد بالعاصمة (OneCloud.dz) يعرض الشركات لمخاطر قاتلة: انقطاع كوابل الألياف البصرية أثناء أشغال الطرق، أو تذبذب شبكة سونلغاز، مما يؤدي لشلل المنصات البنكية دون وجود بديل آلي.'
              : 'Relying on a single facility in Algiers creates an existential risk. Metro roadwork fiber cuts or electrical substation trips freeze critical banking and governmental APIs without automated multi-site failover.'}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-amber-400 mb-2">
            <Zap className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-100">
              {isAr ? 'وهم تطبيق الهاتف مقابل الـ DX الحقيقي' : 'The Mobile App DX Fallacy'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'الترويج لتطبيق الهاتف الذكي لإدارة الخوادم هو تسويق سطحي؛ مهندسو الـ SRE والـ DevOps لا يديرون الإنتاج بالأصابع على شاشات صغيرة، بل يحتاجون إلى مزود Terraform رسمي، وCLI سريع، وتكامل GitOps مع CI/CD.'
              : 'Marketing mobile apps for infrastructure management is a misconception. Real SREs and DevOps teams do not tap phone screens to deploy clusters; they demand Terraform Providers, headless CLIs, and declarative GitOps pipelines.'}
          </p>
        </div>

        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center gap-2 text-emerald-400 mb-2">
            <ShieldCheck className="w-4 h-4" />
            <h3 className="text-sm font-bold text-slate-100">
              {isAr ? 'السيادة الحقيقية (القانون 18-07)' : 'Authentic Data Sovereignty (Law 18-07)'}
            </h3>
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'توطين البيانات بالجزائر ضرورة قانونية وفق القانون 18-07، ولكن السيادة لا تعني التنازل عن معايير AWS وGCP؛ بل تعني تقديم أحدث تقنيات K8s وPatroni HA والدفع بالدينار (CIB/Edahabia).'
              : 'Algerian Law 18-07 mandates local data residency. True sovereignty must not mean settling for legacy VPS hosting; it demands AWS/GCP-grade developer ergonomics with 100% domestic legal immunity and local DZD billing.'}
          </p>
        </div>
      </div>

      {/* Segmented Filter Control */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-2">
        <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'جميع المقارنات المعمارية' : 'All Dimensions'}
          </button>
          <button
            onClick={() => setFilter('advantage')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'advantage'
                ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'مزايا السحابة الموزعة الحاسمة' : 'NeoCloud Advantages'}
          </button>
          <button
            onClick={() => setFilter('parity')}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer ${
              filter === 'parity'
                ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {isAr ? 'الامتثال السيادي والمحلي' : 'Sovereignty Parity'}
          </button>
        </div>

        <div className="text-xs text-slate-400 font-mono">
          {filteredItems.length} {isAr ? 'محاور معمارية مفصلة' : 'architectural dimensions evaluated'}
        </div>
      </div>

      {/* Comparative Matrix Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse" dir={isAr ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-semibold text-slate-300">
                <th className="py-3 px-4 text-start">{isAr ? 'المحور المعماري' : 'Architectural Dimension'}</th>
                <th className="py-3 px-4 text-start w-1/4 text-rose-300/90">
                  {isAr ? 'المنافس المحلي (مثل OneCloud.dz)' : 'Local Competitor (e.g. OneCloud.dz)'}
                </th>
                <th className="py-3 px-4 text-start w-1/3 text-cyan-300 font-bold">
                  {isAr ? 'السحابة الموزعة المقترحة (Atlas Sovereign)' : 'Proposed Sovereign Distributed NeoCloud'}
                </th>
                <th className="py-3 px-4 text-start text-slate-400">
                  {isAr ? 'الأثر التشغيلي والتقني' : 'Operational & SRE Impact'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {filteredItems.map((item, idx) => (
                <tr
                  key={idx}
                  className="hover:bg-slate-800/40 transition-colors"
                >
                  {/* Dimension */}
                  <td className="py-3.5 px-4 font-semibold text-slate-200">
                    <div>{isAr ? item.dimensionAr : item.dimension}</div>
                    <div className="mt-1 flex items-center gap-1.5 text-[11px] text-slate-500">
                      {item.status === 'advantage' ? (
                        <span className="text-emerald-400 font-medium">
                          {isAr ? 'تطور معماري جذري' : 'Structural Superiority'}
                        </span>
                      ) : (
                        <span className="text-cyan-400 font-medium">
                          {isAr ? 'توافق سيادي كامل' : 'Full Regulatory Parity'}
                        </span>
                      )}
                    </div>
                  </td>

                  {/* Competitor */}
                  <td className="py-3.5 px-4 text-slate-300/90 leading-relaxed bg-rose-950/5">
                    <div className="flex items-start gap-1.5">
                      <XCircle className="w-3.5 h-3.5 text-rose-400 shrink-0 mt-0.5" />
                      <span>{isAr ? item.oneCloudDzAr : item.oneCloudDz}</span>
                    </div>
                  </td>

                  {/* Atlas Sovereign */}
                  <td className="py-3.5 px-4 text-slate-100 font-medium leading-relaxed bg-cyan-950/10">
                    <div className="flex items-start gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400 shrink-0 mt-0.5" />
                      <span>{isAr ? item.atlasSovereignAr : item.atlasSovereign}</span>
                    </div>
                  </td>

                  {/* Operational Impact */}
                  <td className="py-3.5 px-4 text-slate-400 leading-relaxed">
                    {isAr ? item.architecturalImpactAr : item.architecturalImpactEn}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
