import React from 'react';
import { Language } from '../types/cloud';
import { Smartphone, Terminal, ShieldAlert, GitBranch, CheckCircle2, XCircle, BellRing, KeyRound } from 'lucide-react';

interface MobileVsDxAnalysisProps {
  language: Language;
}

export const MobileVsDxAnalysis: React.FC<MobileVsDxAnalysisProps> = ({ language }) => {
  const isAr = language === 'ar';

  const comparisonPoints = [
    {
      titleAr: 'الأتمتة والتكامل مع الـ CI/CD وGitOps',
      titleEn: 'CI/CD Automation & GitOps Pipelines',
      cliIacAr: 'تكامل كامل وتلقائي مع GitHub Actions وGitLab CI وArgoCD. كل تغيير يمر عبر Pull Request ومراجعة الكود.',
      cliIacEn: 'Seamless native integration with GitHub Actions, GitLab CI, ArgoCD. Every change is peer-reviewed via Git PRs.',
      mobileAr: 'مستحيل: تطبيق الهاتف جزيرة معزولة لا يمكن استدعاؤها برمجياً داخل سكربتات الأتمتة أو خطوط الإنتاج.',
      mobileEn: 'Impossible: Mobile apps are isolated silos that cannot be scripted or triggered by automated build pipelines.',
    },
    {
      titleAr: 'الأمان ومنع الأخطاء البشرية الكارثية (Fat-Finger Disasters)',
      titleEn: 'Fat-Finger Protection & Safety Guardrails',
      cliIacAr: 'أمر `terraform plan` يظهر الفروقات قبل التنفيذ، مع سياسات تراجع (Rollbacks) وتأكيد إلزامي بالـ CLI.',
      cliIacEn: '`terraform plan` previews exact diffs before execution with automated policy guardrails and instant rollbacks.',
      mobileAr: 'مخاطرة كارثية: لمسة إصبع خاطئة (Fat-finger) على شاشة الهاتف قد تحذف قاعدة بيانات إنتاجية حساسة.',
      mobileEn: 'Critical risk: Accidental touch on a 6-inch phone screen can terminate a mission-critical database.',
    },
    {
      titleAr: 'إعادة الإنتاج وتفادي انحراف الإعدادات (Configuration Drift)',
      titleEn: 'Reproducibility & Drift Prevention',
      cliIacAr: 'البنية التحتية معرّفة ككود (Declarative HCL)؛ يمكن إعادة بناء بيئة الإنتاج بالكامل في دقائق معدودة.',
      cliIacEn: 'Declarative state files ensure zero configuration drift; entire staging/prod environments recreated in minutes.',
      mobileAr: 'تعديلات عشوائية يدوية تخلق بيئات غير متطابقة (Snowflakes) يستحيل توثيقها أو تتبع من قام بها.',
      mobileEn: 'Ad-hoc manual changes create undocumented snowflake servers with zero auditability or reproducibility.',
    },
    {
      titleAr: 'السرعة والإنتاجية لفرق الهندسة (Engineer Productivity)',
      titleEn: 'Engineering Velocity & Ergonomics',
      cliIacAr: 'أوامر سريعة مثل `atlas deploy` و`atlas logs -f` مباشرة من الطرفية بجانب محرر الكود (VS Code/Neovim).',
      cliIacEn: 'Rapid commands (`atlas deploy`, `atlas logs -f`) live inside the developer terminal adjacent to IDE code.',
      mobileAr: 'بطيئة ومجهدة: كتابة أسماء النطاقات والمتغيرات ومفاتيح SSH عبر لوحة مفاتيح الهاتف تضيع الوقت.',
      mobileEn: 'Painfully slow: Typing IP addresses, CIDR blocks, and SSH keys on mobile soft-keyboards is error-prone.',
    },
  ];

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr
            ? 'المقارنة المعمارية: فلسفة الـ DX الحقيقية (CLI / IaC) مقابل وهم "تطبيق الهاتف"'
            : 'Architectural Analysis: Developer-First DX vs The Mobile App Fallacy'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'لماذا يعد الترويج لتطبيقات الهاتف لإدارة السحابة خطأً استراتيجياً في الأسواق الناشئة، وما هو الدور الحقيقي الوحيد المسموح به للهاتف في منظومة الـ SRE الاحترافية.'
            : 'Why relying on mobile applications as primary cloud management tools is an anti-pattern, and how high-performing engineering teams structure their workflows.'}
        </p>
      </div>

      {/* The Two Paradigms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Modern GitOps / CLI / IaC Paradigm */}
        <div className="bg-slate-900/60 border border-cyan-800/60 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-cyan-400 mb-3">
            <Terminal className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">
              {isAr ? 'النموذج السحابي الحديث: CLI + IaC + GitOps' : 'Modern Cloud Paradigm: CLI + IaC + GitOps'}
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {isAr
              ? 'السحابة الحديثة لا تُدار بالنقرات اليدوية، بل هي كود يتم نسخه في Git، ومراجعته بين الزملاء، واختباره تلقائياً، وتطبيقه عبر Terraform وArgoCD.'
              : 'Modern cloud infrastructure is declarative code stored in Git, reviewed by peers, tested in CI, and deployed deterministically via Terraform and ArgoCD.'}
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-950/70 rounded border border-slate-800 flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Version Controlled in Git (Audit Trail)</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 rounded border border-slate-800 flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Automated CI/CD Deployment Pipelines</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 rounded border border-slate-800 flex items-center gap-2 text-slate-300">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>Zero Human Configuration Drift</span>
            </div>
          </div>
        </div>

        {/* Mobile Trap Paradigm */}
        <div className="bg-slate-900/60 border border-rose-900/60 rounded-xl p-6 relative overflow-hidden">
          <div className="flex items-center gap-2.5 text-rose-400 mb-3">
            <Smartphone className="w-5 h-5" />
            <h3 className="text-base font-bold text-white">
              {isAr ? 'الفخ التسويقي: تطبيق الهاتف لإدارة السحابة' : 'The Marketing Trap: Mobile App for Cloud Operations'}
            </h3>
          </div>
          <p className="text-xs text-slate-300 leading-relaxed mb-4">
            {isAr
              ? 'تطبيقات الهواتف تبدو جذابة في العروض الترويجية، لكنها تؤدي في الواقع إلى انعدام التوثيق، وزيادة احتمال الأعطال غير المقصودة، واستحالة أتمتة العمليات.'
              : 'While mobile apps look appealing in marketing flyers, they lead to un-audited manual tweaks, zero automation, and dangerous configuration drift.'}
          </p>

          <div className="space-y-2 text-xs font-mono">
            <div className="p-2.5 bg-slate-950/70 rounded border border-slate-800 flex items-center gap-2 text-slate-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>No Version Control (Ghost Changes)</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 rounded border border-slate-800 flex items-center gap-2 text-slate-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Fat-finger Deletion Risks</span>
            </div>
            <div className="p-2.5 bg-slate-950/70 rounded border border-slate-800 flex items-center gap-2 text-slate-300">
              <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
              <span>Zero Automation or CI/CD Integration</span>
            </div>
          </div>
        </div>
      </div>

      {/* The ONE Justified Role for Mobile in Enterprise Cloud */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2 text-amber-400 mb-2">
          <ShieldAlert className="w-4 h-4" />
          <h3 className="text-sm font-bold text-white uppercase tracking-wider">
            {isAr
              ? 'الدور الهندسي الوحيد المبرر لتطبيق الهاتف في السحابة الاحترافية:'
              : 'The Only Legitimate Role for Mobile in SRE Architecture:'}
          </h3>
        </div>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">
          {isAr
            ? 'تطبيق الهاتف يجب ألا يحتوي على أزرار لإنشاء أو تعديل خوادم الإنتاج. دوره ينحصر حصرياً في وظيفتين:'
            : 'A cloud mobile app should never attempt to replicate control plane provisioning. Its responsibility must be restricted strictly to:'}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 flex items-start gap-3">
            <BellRing className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">
                {isAr ? '1. تنبيهات الطوارئ الفورية (Incident Pager)' : '1. On-Call Incident Paging'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {isAr
                  ? 'إشعار فوري لمهندس المناوبة عند هبوط أحد مؤشرات الأداء، وتأكيد الاستلام (Acknowledge) دون تعديل البنية.'
                  : 'Delivering high-priority push notifications to on-call SREs with one-tap acknowledgment.'}
              </p>
            </div>
          </div>

          <div className="bg-slate-950/70 p-4 rounded-lg border border-slate-800 flex items-start gap-3">
            <KeyRound className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="text-xs font-bold text-slate-200">
                {isAr ? '2. الموافقة البيومترية المشفرة (Biometric 2FA)' : '2. Biometric 2FA Approvals'}
              </h4>
              <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                {isAr
                  ? 'الموافقة بالبصمة (FaceID/Fingerprint) على عمليات الـ Terraform Apply الحساسة المنفذة من الـ CI/CD.'
                  : 'FIDO2 / WebAuthn biometric approval for high-risk Terraform production runs initiated by CI/CD.'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Comparison Points Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
        <table className="w-full text-right border-collapse" dir={isAr ? 'rtl' : 'ltr'}>
          <thead>
            <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-semibold text-slate-300">
              <th className="py-3 px-4 text-start">{isAr ? 'المعيار التقني' : 'Evaluation Criteria'}</th>
              <th className="py-3 px-4 text-start text-cyan-300">
                {isAr ? 'أدوات المطورين (CLI & Terraform & GitOps)' : 'Developer Tools (CLI & IaC)'}
              </th>
              <th className="py-3 px-4 text-start text-rose-400">
                {isAr ? 'تطبيق الهاتف المحمول (Mobile App)' : 'Mobile Applications'}
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/70 text-xs">
            {comparisonPoints.map((pt, i) => (
              <tr key={i} className="hover:bg-slate-800/30 transition-colors">
                <td className="py-3.5 px-4 font-semibold text-slate-200">
                  {isAr ? pt.titleAr : pt.titleEn}
                </td>
                <td className="py-3.5 px-4 text-slate-200 bg-cyan-950/10 leading-relaxed">
                  {isAr ? pt.cliIacAr : pt.cliIacEn}
                </td>
                <td className="py-3.5 px-4 text-slate-400 bg-rose-950/10 leading-relaxed">
                  {isAr ? pt.mobileAr : pt.mobileEn}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
