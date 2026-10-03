import React, { useState } from 'react';
import { Language, TechStackLayer } from '../types/cloud';
import { TECH_STACK_LAYERS } from '../data/cloudData';
import { Layers, Database, Cpu, HardDrive, Terminal, Shield, ArrowRight, Check } from 'lucide-react';

interface TechStackBlueprintProps {
  language: Language;
}

export const TechStackBlueprint: React.FC<TechStackBlueprintProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [selectedLayerId, setSelectedLayerId] = useState<string>('control-plane');

  const selectedLayer =
    TECH_STACK_LAYERS.find((l) => l.id === selectedLayerId) || TECH_STACK_LAYERS[0];

  const getLayerIcon = (id: string) => {
    switch (id) {
      case 'control-plane':
        return <Cpu className="w-4 h-4 text-cyan-400" />;
      case 'developer-gateway':
        return <Terminal className="w-4 h-4 text-cyan-400" />;
      case 'database-engine':
        return <Database className="w-4 h-4 text-cyan-400" />;
      case 'compute-kubernetes':
        return <Layers className="w-4 h-4 text-cyan-400" />;
      case 'storage-fabric':
        return <HardDrive className="w-4 h-4 text-cyan-400" />;
      default:
        return <Cpu className="w-4 h-4 text-cyan-400" />;
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr ? 'المكدس التقني المقترح للمنصة السحابية الموزعة' : 'Sovereign NeoCloud Production Tech Stack'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'اختيارات معمارية صلبة تعتمد على Go وNode.js/TypeScript وPostgreSQL مع PostGIS/Patroni وCilium eBPF وKubernetes على نظام Talos المقاوم للاختراق.'
            : 'A battle-tested cloud-native technology stack combining Go microservices, TypeScript API gateways, Patroni-backed PostgreSQL with PostGIS, and Talos-hardened Kubernetes with Cilium eBPF.'}
        </p>
      </div>

      {/* Layer Selector Segmented Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2">
        {TECH_STACK_LAYERS.map((layer) => {
          const isSelected = selectedLayerId === layer.id;
          return (
            <button
              key={layer.id}
              onClick={() => setSelectedLayerId(layer.id)}
              className={`flex items-center gap-2 px-3.5 py-2.5 rounded-lg border text-xs font-medium whitespace-nowrap transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800 border-cyan-500/80 text-cyan-300 shadow-sm shadow-cyan-950/50'
                  : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-850 hover:text-slate-200'
              }`}
            >
              {getLayerIcon(layer.id)}
              <span>{isAr ? layer.categoryAr : layer.category}</span>
            </button>
          );
        })}
      </div>

      {/* Detail Inspection Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 bg-slate-900/50 border border-slate-800 rounded-xl p-6">
        {/* Left: Deep Architectural Rationale & Why Chosen */}
        <div className="lg:col-span-7 space-y-6">
          <div>
            <div className="text-xs font-mono text-cyan-400 uppercase tracking-wider mb-1">
              {isAr ? selectedLayer.categoryAr : selectedLayer.category}
            </div>
            <h3 className="text-xl font-bold text-white">
              {isAr ? selectedLayer.titleAr : selectedLayer.title}
            </h3>
            <div className="mt-2 inline-block px-3 py-1 bg-cyan-950/40 border border-cyan-800/60 rounded-md text-xs font-mono text-cyan-200">
              {selectedLayer.primaryTech}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {isAr ? 'لماذا تم اختيار هذه التقنية تحديداً؟ (Architectural Rationale)' : 'Why This Tech Was Selected:'}
            </h4>
            <p className="text-xs text-slate-300 leading-relaxed bg-slate-950/60 p-4 rounded-lg border border-slate-800/80">
              {isAr ? selectedLayer.whyChosenAr : selectedLayer.whyChosenEn}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {isAr ? 'الخيارات البديلة التي تم استبعادها ولماذا (Rejected Alternatives):' : 'Evaluated & Rejected Alternatives:'}
            </h4>
            <div className="space-y-1.5">
              {selectedLayer.alternativesEvaluated.map((alt, i) => (
                <div key={i} className="text-xs text-slate-400 flex items-start gap-2 bg-slate-950/40 p-2.5 rounded border border-slate-800/60 font-mono">
                  <span className="text-rose-400 font-bold shrink-0">✕</span>
                  <span>{alt}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              {isAr ? 'المقايضات والتحديات الهندسية (Engineering Trade-offs):' : 'Engineering Trade-offs & Mitigations:'}
            </h4>
            <p className="text-xs text-amber-300/90 leading-relaxed bg-amber-950/20 p-3 rounded-lg border border-amber-900/40">
              {isAr ? selectedLayer.tradeoffsAr : selectedLayer.tradeoffsEn}
            </p>
          </div>
        </div>

        {/* Right: Key Enterprise Features & Production Blueprint */}
        <div className="lg:col-span-5 space-y-4">
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              {isAr ? 'المواصفات التقنية والإنتاجية' : 'Core Capabilities'}
            </h4>
            <div className="space-y-2.5">
              {(isAr ? selectedLayer.keyFeaturesAr : selectedLayer.keyFeatures).map((feat, i) => (
                <div key={i} className="flex items-start gap-2.5 text-xs text-slate-300">
                  <span className="w-4 h-4 rounded-full bg-cyan-950 text-cyan-400 flex items-center justify-center shrink-0 mt-0.5 border border-cyan-800/50">
                    <Check className="w-2.5 h-2.5" />
                  </span>
                  <span className="leading-relaxed">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Real Architecture Schema Flow */}
          <div className="bg-slate-950/70 border border-slate-800 rounded-lg p-5">
            <h4 className="text-xs font-bold text-slate-200 uppercase tracking-wider mb-3">
              {isAr ? 'مخطط تدفق البيانات (Data & Request Flow)' : 'Architectural Request Flow'}
            </h4>
            <div className="space-y-2 text-[11px] font-mono text-slate-400">
              <div className="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200">1. Client / Developer CLI</span>
                <span className="text-cyan-400">BGP Anycast Ingress</span>
              </div>
              <div className="text-center text-slate-600">↓ TLS 1.3 / mTLS</div>
              <div className="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200">2. Fastify TypeScript Gateway</span>
                <span className="text-cyan-400">Auth, RBAC & Rate Limit</span>
              </div>
              <div className="text-center text-slate-600">↓ gRPC / Protobuf</div>
              <div className="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200">3. Go Control Plane & Raft</span>
                <span className="text-cyan-400">Multi-DC Consensus</span>
              </div>
              <div className="text-center text-slate-600">↓ Cilium eBPF WireGuard</div>
              <div className="p-2 bg-slate-900/90 rounded border border-slate-800 flex items-center justify-between">
                <span className="text-slate-200">4. Talos K8s + PostgreSQL 16</span>
                <span className="text-emerald-400">Patroni HA & Ceph NVMe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
