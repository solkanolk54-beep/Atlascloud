import React, { useState } from 'react';
import { Language, ComplianceChecklistItem } from '../types/cloud';
import { COMPLIANCE_CHECKLIST } from '../data/complianceData';
import { ShieldCheck, AlertTriangle, CheckCircle2, XCircle, FileText, Download, Copy, Check, Filter } from 'lucide-react';

interface SecurityComplianceChecklistProps {
  language: Language;
}

export const SecurityComplianceChecklist: React.FC<SecurityComplianceChecklistProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedDomain, setSelectedDomain] = useState<string>('all');
  const [copiedDossier, setCopiedDossier] = useState(false);

  const filteredItems = COMPLIANCE_CHECKLIST.filter((item) => {
    if (selectedDomain === 'all') return true;
    return item.domain === selectedDomain;
  });

  const generateAuditReport = () => {
    const report = `# ATLASCLOUD SOVEREIGN — RAPPORT D'AUDIT DE CONFORMITÉ RÉGLEMENTAIRE
Date: ${new Date().toISOString().split('T')[0]}
Destinataire: Comité d'Audit, des Risques et de la Sécurité des SI (Banques & Établissements Financiers)

STATUT GLOBAL DE CONFORMITÉ:
- AtlasCloud Sovereign: 100% CONFORME (Audit-Ready / Agréé Décret Exécutif)
- Statut Concurrent (OneCloud.dz / Standard Local): 25% (RISQUE CRITIQUE: Statut "En cours" non recevable réglementairement)

RÉCAPITULATIF DES EXIGENCES RÉGLEMENTAIRES:
1. ISO/IEC 27001:2022 & ISO 27701:
   - AtlasCloud: Certifié & Audité annuellement (Certificat Bureau Veritas)
   - Concurrent: "En cours" (Non certifié)
2. Agrément ARPCE (Hébergeur Cloud Public):
   - AtlasCloud: Agrément définitif publié au Registre Officiel
   - Concurrent: Dossier déposé / En cours d'instruction
3. Autorisation ANPDP (Loi 18-07 relative à la protection des données):
   - AtlasCloud: Autorisation formelle de traitement des données sensibles
   - Concurrent: Déclaration simple préliminaire
4. Circulaires Banque d'Algérie sur le Plan de Continuité d'Activité (PCA/PRA):
   - AtlasCloud: PRA Géoredondant Actif-Actif (Alger - Oran - Constantine), RPO=0, RTO < 300ms
   - Concurrent: Site unique non redondant (Risque de perte totale de données)
5. Chiffrement & Sécurité des Clés:
   - AtlasCloud: TLS 1.3 Strict + HSM Dédié Client (BYOK)
   - Concurrent: TLS 1.2 obsolète, clés gérées par le tiers

CONCLUSION POUR LES ACHATS & AUDIT:
L'externalisation de données bancaires vers un prestataire au statut "En cours" constitue une infraction aux règles de contrôle interne de la Banque d'Algérie. AtlasCloud Sovereign offre la couverture juridique et technique immédiate requise.`;

    navigator.clipboard.writeText(report);
    setCopiedDossier(true);
    setTimeout(() => setCopiedDossier(false), 2500);
  };

  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-emerald-950/60 border border-emerald-800/60 text-xs font-mono text-emerald-300 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{isAr ? 'جاهزية التدقيق البنكي الفوري — Bank-Grade Audit Ready' : 'Bank-Grade Compliance Checklist'}</span>
            </div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isAr ? 'قائمة مراجعة الأمن والامتثال التنظيمي للقطاع البنكي والحساس' : 'Regulatory Security & Compliance Checklist'}
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-3xl">
              {isAr
                ? 'مصفوفة تدقيق شاملة تُثبت تفوقنا الفوري أمام متطلبات بنك الجزائر، سلطة حماية المعطيات (ANPDP)، وسلطة الضبط (ARPCE)، وتكشف الفخ القانوني لعبارة "قيد الإنجاز (En cours)" لدى المنافسين.'
                : 'A comprehensive regulatory matrix proving instant readiness for Bank of Algeria, ANPDP, and ARPCE compliance audits, contrasting our certified posture with competitor "in progress" liability.'}
            </p>
          </div>

          <button
            onClick={generateAuditReport}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors cursor-pointer shadow-sm shadow-emerald-950"
          >
            {copiedDossier ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
            <span>{copiedDossier ? (isAr ? 'تم نسخ ملف التدقيق!' : 'Audit Dossier Copied!') : isAr ? 'تصدير ملف التدقيق البنكي' : 'Export Bank Audit Dossier'}</span>
          </button>
        </div>
      </div>

      {/* Compliance Scorecard Comparison */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {/* Our Posture */}
        <div className="bg-slate-900/60 border border-emerald-800/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
              {isAr ? 'سحابة أطلس السيادية' : 'AtlasCloud Sovereign'}
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 px-2 py-0.5 bg-emerald-950/70 border border-emerald-800 rounded">
              100% Audit-Ready
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mb-1">
            6 / 6 {isAr ? 'معايير معتمدة ونافذة' : 'Controls Certified'}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'شهادات سارية المفعول، رخص رسمية منشورة، وتغطية تعاقدية قانونية تحمي مدراء تقنية المعلومات والمخاطر من أي مساءلة.'
              : 'Active certified credentials, formal published licenses, and full contractual indemnification protecting bank CIOs.'}
          </p>
        </div>

        {/* Competitor Posture */}
        <div className="bg-slate-900/60 border border-rose-900/60 rounded-xl p-5">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-rose-400 uppercase tracking-wider">
              {isAr ? 'المنافس المحلي (مثل OneCloud.dz)' : 'Local Competitor Posture'}
            </span>
            <span className="text-xs font-mono font-bold text-rose-400 px-2 py-0.5 bg-rose-950/70 border border-rose-800 rounded">
              High Risk / Blocked
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-rose-300 mb-1">
            "En cours" {isAr ? '(غير معتمد قانونياً)' : '(Legally Uncertified)'}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'الملفات قيد الدراسة لا تمثل اعتماداً قانونياً؛ بنك الجزائر والمفتشيات تعتبر توطين البيانات لدى مزود "قيد الإنجاز" خرقاً صريحاً.'
              : '"In progress" dossiers lack statutory standing. Bank audit committees flag contracts with uncertified vendors as high-severity audit breaches.'}
          </p>
        </div>

        {/* Audit Committee Verdict */}
        <div className="bg-slate-900/60 border border-slate-800 rounded-xl p-5">
          <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider block mb-2">
            {isAr ? 'قرار لجنة الصفقات والمخاطر البنكية' : 'Bank Procurement Verdict'}
          </span>
          <div className="text-sm font-bold text-slate-200 mb-1">
            {isAr ? 'قبول تعاقدي فوري دون مخاطر رقابية' : 'Immediate Vendor Approval'}
          </div>
          <p className="text-xs text-slate-400 leading-relaxed">
            {isAr
              ? 'تقليص دورة موافقة الصفقات (Procurement Cycle) من 9 أشهر إلى 14 يوماً فقط بفضل توافر جميع وثائق المطابقة المعتمدة مسبقاً.'
              : 'Reduces procurement diligence from 9 months to 14 days by providing pre-validated compliance dossiers ready for immediate signing.'}
          </p>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 border border-slate-800 rounded-lg overflow-x-auto">
        <button
          onClick={() => setSelectedDomain('all')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            selectedDomain === 'all'
              ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isAr ? 'جميع معايير الامتثال (6)' : 'All Compliance Controls (6)'}
        </button>
        <button
          onClick={() => setSelectedDomain('bank_of_algeria')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            selectedDomain === 'bank_of_algeria'
              ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isAr ? 'تعليمات بنك الجزائر (PCA/PRA)' : 'Bank of Algeria (PCA/PRA)'}
        </button>
        <button
          onClick={() => setSelectedDomain('anpdp_1807')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            selectedDomain === 'anpdp_1807'
              ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isAr ? 'القانون 18-07 (سلطة ANPDP)' : 'Law 18-07 & ANPDP'}
        </button>
        <button
          onClick={() => setSelectedDomain('arpce')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            selectedDomain === 'arpce'
              ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          {isAr ? 'اعتماد سلطة الضبط (ARPCE)' : 'ARPCE Cloud License'}
        </button>
        <button
          onClick={() => setSelectedDomain('iso27001')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            selectedDomain === 'iso27001'
              ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          ISO 27001 / ISO 27701
        </button>
        <button
          onClick={() => setSelectedDomain('pci_dss')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors cursor-pointer whitespace-nowrap ${
            selectedDomain === 'pci_dss'
              ? 'bg-slate-800 text-cyan-400 font-semibold shadow-sm'
              : 'text-slate-400 hover:text-white'
          }`}
        >
          PCI-DSS (بطاقات SATIM)
        </button>
      </div>

      {/* Compliance Detailed Checklist Table */}
      <div className="border border-slate-800 rounded-xl overflow-hidden bg-slate-900/40">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-collapse" dir={isAr ? 'rtl' : 'ltr'}>
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/90 text-xs font-semibold text-slate-300">
                <th className="py-3 px-4 text-start">{isAr ? 'المعيار والرقابة التنظيمية' : 'Standard & Regulatory Control'}</th>
                <th className="py-3 px-4 text-start w-1/4 text-rose-300">
                  {isAr ? 'حالة المنافس ("قيد الإنجاز")' : 'Competitor Status ("In Progress")'}
                </th>
                <th className="py-3 px-4 text-start w-1/4 text-emerald-300">
                  {isAr ? 'جاهزية سحابة أطلس السيادية' : 'AtlasCloud Sovereign Posture'}
                </th>
                <th className="py-3 px-4 text-start text-slate-400">
                  {isAr ? 'الأثر القانوني على تدقيق البنك' : 'Bank Audit & Legal Impact'}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70 text-xs">
              {filteredItems.map((item) => (
                <tr key={item.id} className="hover:bg-slate-800/40 transition-colors">
                  {/* Standard & Control */}
                  <td className="py-4 px-4 align-top">
                    <div className="font-bold text-slate-200">
                      {isAr ? item.titleAr : item.titleEn}
                    </div>
                    <div className="text-[11px] font-mono text-cyan-400 mt-0.5">
                      {isAr ? item.domainLabelAr : item.domainLabelEn} · {item.controlId}
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
                      {isAr ? item.requirementAr : item.requirementEn}
                    </p>
                  </td>

                  {/* Competitor Gap */}
                  <td className="py-4 px-4 align-top bg-rose-950/10">
                    <div className="flex items-center gap-1.5 text-rose-400 font-semibold mb-1">
                      <XCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{isAr ? item.competitorStatusTextAr : item.competitorStatusTextEn}</span>
                    </div>
                    <div className="text-[10px] font-mono text-rose-300/80 px-2 py-0.5 rounded bg-rose-950/50 border border-rose-900/60 inline-block">
                      {isAr ? 'ثغرة تعاقدية مانعة (Blocker)' : 'Procurement Blocker'}
                    </div>
                  </td>

                  {/* Our Certified Proof */}
                  <td className="py-4 px-4 align-top bg-emerald-950/10">
                    <div className="flex items-center gap-1.5 text-emerald-400 font-semibold mb-1">
                      <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
                      <span>{isAr ? 'معتمد وموثق رسمياً' : 'Fully Certified & Audit Ready'}</span>
                    </div>
                    <p className="text-[11px] text-emerald-200/90 leading-relaxed">
                      {isAr ? item.ourProofAr : item.ourProofEn}
                    </p>
                  </td>

                  {/* Bank Impact */}
                  <td className="py-4 px-4 align-top text-slate-300 leading-relaxed">
                    {isAr ? item.bankAuditImpactAr : item.bankAuditImpactEn}
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
