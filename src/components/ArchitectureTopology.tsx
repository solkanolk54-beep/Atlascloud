import React, { useState, useEffect } from 'react';
import { Language, CloudRegion, FailoverEvent } from '../types/cloud';
import { CLOUD_REGIONS } from '../data/cloudData';
import { Activity, AlertTriangle, CheckCircle2, RefreshCw, Zap, Server, Shield, Radio } from 'lucide-react';

interface ArchitectureTopologyProps {
  language: Language;
}

export const ArchitectureTopology: React.FC<ArchitectureTopologyProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [regions, setRegions] = useState<CloudRegion[]>(CLOUD_REGIONS);
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const [selectedRegionId, setSelectedRegionId] = useState<string>('dz-north-1');
  const [logs, setLogs] = useState<FailoverEvent[]>([
    {
      timestamp: '14:22:01.042',
      messageAr: 'نظام BGP Anycast مستقر: جميع المسارات تعمل بتوازن حمولة مثالي (4 مناطق نشطة).',
      messageEn: 'BGP Anycast stable: traffic load balanced across all 4 operational regions.',
      type: 'info',
    },
    {
      timestamp: '14:22:04.118',
      messageAr: 'مزامنة Patroni لـ PostgreSQL 16 عبر منطقتي العاصمة ووهران نشطة (RPO=0).',
      messageEn: 'PostgreSQL 16 synchronous streaming replication active between Algiers and Oran (RPO=0).',
      type: 'success',
    },
  ]);

  const selectedRegion = regions.find((r) => r.id === selectedRegionId) || regions[0];

  const runSimulation = (scenarioId: string) => {
    setActiveSimulation(scenarioId);

    const now = new Date();
    const timeStr = now.toTimeString().split(' ')[0] + '.' + String(now.getMilliseconds()).padStart(3, '0');

    if (scenarioId === 'algiers-fiber-cut') {
      setRegions((prev) =>
        prev.map((r) =>
          r.id === 'dz-north-1'
            ? { ...r, status: 'degraded' }
            : r.id === 'dz-west-1'
            ? { ...r, status: 'nominal', latencyToAlgiers: 2.1 }
            : r
        )
      );
      setLogs((prev) => [
        {
          timestamp: timeStr,
          messageAr: '⚡ تنبيه: اكتشاف انقطاع خط الألياف المركزي بالجزائر العاصمة (Ben Aknoun).',
          messageEn: '⚡ Alert: Core fiber cut detected in Algiers metro backbone (Ben Aknoun).',
          type: 'alert',
        },
        {
          timestamp: timeStr,
          messageAr: '🔄 بدأ توجيه BGP Anycast بسحب المسارات تلقائياً وإعادة توجيه 65% من الحركة نحو منطقة وهران (dz-west-1).',
          messageEn: '🔄 BGP Anycast withdrawn prefix 197.x.x.x/24; rerouted 65% ingress to Oran (dz-west-1).',
          type: 'warning',
        },
        {
          timestamp: timeStr,
          messageAr: '✔ انتخبت منظومة Patroni عقدة وهران كقائد مؤقت لقاعدة البيانات. معدل RTO استغرق 180ms دون أي فقد للبيانات.',
          messageEn: '✔ Patroni promoted Oran replica to master. RTO completed in 180ms with 0 data loss.',
          type: 'success',
        },
        ...prev.slice(0, 5),
      ]);
    } else if (scenarioId === 'subsea-cut') {
      setRegions((prev) =>
        prev.map((r) =>
          r.id === 'dz-west-1'
            ? { ...r, status: 'degraded' }
            : r
        )
      );
      setLogs((prev) => [
        {
          timestamp: timeStr,
          messageAr: '🌊 انقطاع جزئي في كابل SEA-ME-WE-4 البحري الدولي بمحطة وهران.',
          messageEn: '🌊 Submarine cable anomaly detected on international SEA-ME-WE-4 station at Oran.',
          type: 'alert',
        },
        {
          timestamp: timeStr,
          messageAr: '🔄 تحويل حركة العبور الدولي فورياً إلى كابل ALPAL-2 وكابل Medusa عبر الجزائر العاصمة.',
          messageEn: '🔄 Auto-switched international transit to ALPAL-2 & Medusa landing in Algiers.',
          type: 'warning',
        },
        {
          timestamp: timeStr,
          messageAr: '✔ استمرارية الخدمة الوطنية 100% دون أي تأثر للحركة المحلية داخل الجزائر (DZ-IXP).',
          messageEn: '✔ 100% domestic availability maintained via DZ-IXP national peering mesh.',
          type: 'success',
        },
        ...prev.slice(0, 5),
      ]);
    } else if (scenarioId === 'total-power-loss') {
      setRegions((prev) =>
        prev.map((r) =>
          r.id === 'dz-north-1'
            ? { ...r, status: 'offline' }
            : r.id === 'dz-west-1'
            ? { ...r, status: 'nominal' }
            : r.id === 'dz-east-1'
            ? { ...r, status: 'nominal' }
            : r
        )
      );
      setLogs((prev) => [
        {
          timestamp: timeStr,
          messageAr: '🛑 عطل كهربائي كلي في مركز بيانات العاصمة: إطلاق بروتوكول التعافي الشامل (Disaster Recovery).',
          messageEn: '🛑 Complete facility outage in Algiers DC: Invoking automated DR protocol.',
          type: 'alert',
        },
        {
          timestamp: timeStr,
          messageAr: '⚡ تولت منطقة قسنطينة (dz-east-1) التحكيم في الـ etcd Quorum لمنع حدوث Split-Brain.',
          messageEn: '⚡ Constantine highland hub (dz-east-1) cast arbitrator vote in etcd Quorum, avoiding split-brain.',
          type: 'warning',
        },
        {
          timestamp: timeStr,
          messageAr: '✔ محرك AKE نقل جميع أعباء العمل وKubernetes Pods إلى منطقتي وهران وقسنطينة في 4.2 ثانية.',
          messageEn: '✔ AKE scheduler rescheduled all container workloads to Oran & Constantine in 4.2s.',
          type: 'success',
        },
        ...prev.slice(0, 5),
      ]);
    } else {
      setRegions(CLOUD_REGIONS);
      setLogs((prev) => [
        {
          timestamp: timeStr,
          messageAr: '✔ تمت استعادة الحالة الطبيعية لجميع المناطق الأربع (Nominal Active-Active Multi-Region).',
          messageEn: '✔ All 4 regions restored to pristine Nominal Active-Active mesh topology.',
          type: 'success',
        },
        ...prev.slice(0, 5),
      ]);
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header Section */}
      <div className="border-b border-slate-800 pb-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-white tracking-tight">
              {isAr ? 'البنية التحتية الموزعة المقاومة للأعطال (Zero-SPOF Architecture)' : 'Zero-SPOF Distributed Cloud Architecture'}
            </h2>
            <p className="mt-1 text-sm text-slate-400 max-w-3xl">
              {isAr
                ? 'تصميم معماري سحابي وطني يحل معضلة تمركز مراكز البيانات في نقطة جغرافية واحدة (Single Point of Failure)، موزع عبر 4 أقطاب إستراتيجية في الجزائر، مع شبكة BGP Anycast وإجماع Raft موزع.'
                : 'A sovereign multi-region topology eliminating single points of failure across Algeria, leveraging BGP Anycast routing, multi-AZ Patroni replication, and distributed etcd Raft quorum.'}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>{isAr ? 'حالة الشبكة: نشطة ومتزامنة' : 'Mesh State: Active-Active Synchronous'}</span>
            <span aria-hidden="true">·</span>
            <span>RPO: 0 sec</span>
            <span aria-hidden="true">·</span>
            <span>RTO &lt; 300ms</span>
          </div>
        </div>
      </div>

      {/* Main Grid: Interactive Map & Region Details */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left/Main Column: Visual Architecture Topology Canvas */}
        <div className="lg:col-span-8 bg-slate-900/60 border border-slate-800 rounded-xl p-5 backdrop-blur-sm relative overflow-hidden flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4 border-b border-slate-800/80 pb-3">
            <div className="flex items-center gap-2">
              <Radio className="w-4 h-4 text-cyan-400" />
              <span className="text-sm font-semibold text-slate-200">
                {isAr ? 'الخريطة الطوبولوجية للمناطق السحابية الوطنية' : 'Sovereign Multi-Region Network Canvas'}
              </span>
            </div>
            <div className="flex items-center gap-3 text-xs text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
                <span>{isAr ? 'طبيعي' : 'Nominal'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
                <span>{isAr ? 'ضغط/تحويل' : 'Degraded/Rerouted'}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500" />
                <span>{isAr ? 'معطل' : 'Offline'}</span>
              </span>
            </div>
          </div>

          {/* SVG Map Canvas */}
          <div className="relative w-full aspect-[16/10] bg-[#0c121e] rounded-lg border border-slate-800/70 overflow-hidden flex items-center justify-center p-4">
            {/* Visual Grid Lines */}
            <div
              className="absolute inset-0 opacity-15"
              style={{
                backgroundImage:
                  'radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)',
                backgroundSize: '24px 24px',
              }}
            />

            {/* Stylized Coastal Line and Algeria Boundary Contour (SVG) */}
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none opacity-40"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              {/* Mediterranean Coast Arc */}
              <path
                d="M 15,24 Q 30,22 50,15 T 85,18"
                fill="none"
                stroke="#0284c7"
                strokeWidth="1.2"
                strokeDasharray="2,2"
              />
              {/* Regional Interconnect Links */}
              {/* Algiers to Oran */}
              <line
                x1="50"
                y1="16"
                x2="30"
                y2="22"
                stroke={regions.find((r) => r.id === 'dz-north-1')?.status === 'offline' ? '#e11d48' : '#06b6d4'}
                strokeWidth="1.5"
                strokeDasharray={regions.find((r) => r.id === 'dz-north-1')?.status === 'degraded' ? '3,3' : 'none'}
              />
              {/* Algiers to Constantine */}
              <line
                x1="50"
                y1="16"
                x2="74"
                y2="19"
                stroke="#06b6d4"
                strokeWidth="1.5"
              />
              {/* Algiers to Ouargla */}
              <line
                x1="50"
                y1="16"
                x2="56"
                y2="46"
                stroke="#0284c7"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              {/* Oran to Constantine via South route */}
              <line
                x1="30"
                y1="22"
                x2="56"
                y2="46"
                stroke="#0ea5e9"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              <line
                x1="74"
                y1="19"
                x2="56"
                y2="46"
                stroke="#0ea5e9"
                strokeWidth="1"
                strokeDasharray="2,2"
              />
              {/* Subsea Cable Link from Oran to Europe */}
              <line
                x1="30"
                y1="22"
                x2="22"
                y2="5"
                stroke="#38bdf8"
                strokeWidth="1.5"
                strokeDasharray="3,3"
              />
            </svg>

            {/* Subsea Cable Tag */}
            <div className="absolute top-2 left-6 text-[10px] font-mono text-cyan-400/80 bg-slate-950/80 px-2 py-0.5 rounded border border-cyan-900/50">
              SMW-4 & ALPAL-2 & Medusa (Subsea DWDM)
            </div>

            {/* Region Interactive Pins */}
            {regions.map((reg) => {
              const isSelected = selectedRegionId === reg.id;
              const statusColor =
                reg.status === 'nominal'
                  ? 'bg-emerald-500 border-emerald-300 shadow-emerald-500/50'
                  : reg.status === 'degraded'
                  ? 'bg-amber-500 border-amber-300 shadow-amber-500/50'
                  : 'bg-rose-500 border-rose-300 shadow-rose-500/50';

              return (
                <button
                  key={reg.id}
                  onClick={() => setSelectedRegionId(reg.id)}
                  style={{
                    left: `${reg.coordinates.x}%`,
                    top: `${reg.coordinates.y}%`,
                    transform: 'translate(-50%, -50%)',
                  }}
                  className={`absolute group flex flex-col items-center cursor-pointer transition-all z-10 ${
                    isSelected ? 'scale-110' : 'hover:scale-105'
                  }`}
                >
                  <div className="relative">
                    <span
                      className={`block w-4 h-4 rounded-full border-2 ${statusColor} shadow-md transition-transform`}
                    />
                    {reg.status === 'nominal' && (
                      <span className="absolute -inset-1 rounded-full bg-emerald-400/30 animate-ping -z-10" />
                    )}
                  </div>
                  <div
                    className={`mt-1.5 px-2 py-0.5 rounded text-[11px] font-medium whitespace-nowrap transition-colors ${
                      isSelected
                        ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                        : 'bg-slate-900/90 text-slate-200 border border-slate-700/80'
                    }`}
                  >
                    {isAr ? reg.nameAr.split(' ')[1] || reg.nameAr : reg.name.split(' ')[0]}
                    <span className="ml-1 opacity-75 font-mono text-[10px] tabular-nums">
                      {reg.latencyToAlgiers}ms
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Drill Controls Bar */}
          <div className="mt-4 pt-3 border-t border-slate-800">
            <div className="text-xs font-semibold text-slate-400 mb-2">
              {isAr ? 'محاكاة اختبارات الأعطال والكوارث (Chaos Engineering Drills):' : 'Chaos Engineering & Disaster Drills:'}
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                onClick={() => runSimulation('algiers-fiber-cut')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-slate-200 border transition-all text-center cursor-pointer ${
                  activeSimulation === 'algiers-fiber-cut'
                    ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
                    : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isAr ? '⚡ قطع ألياف العاصمة' : '⚡ Algiers Fiber Cut'}
              </button>

              <button
                onClick={() => runSimulation('subsea-cut')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-slate-200 border transition-all text-center cursor-pointer ${
                  activeSimulation === 'subsea-cut'
                    ? 'bg-amber-950/60 border-amber-500/80 text-amber-200'
                    : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isAr ? '🌊 عطل الكابل البحري' : '🌊 Subsea Cable Cut'}
              </button>

              <button
                onClick={() => runSimulation('total-power-loss')}
                className={`px-2.5 py-2 rounded-lg text-xs font-medium text-slate-200 border transition-all text-center cursor-pointer ${
                  activeSimulation === 'total-power-loss'
                    ? 'bg-rose-950/60 border-rose-500/80 text-rose-200'
                    : 'bg-slate-800/60 border-slate-700/70 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {isAr ? '🛑 توقف كهرباء المركز' : '🛑 Full DC Blackout'}
              </button>

              <button
                onClick={() => runSimulation('nominal')}
                className="px-2.5 py-2 rounded-lg text-xs font-semibold text-emerald-400 bg-emerald-950/40 border border-emerald-800/60 hover:bg-emerald-900/60 transition-all text-center cursor-pointer flex items-center justify-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>{isAr ? 'إعادة الاستقرار' : 'Reset Mesh'}</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Selected Region Deep Dive & Live Telemetry */}
        <div className="lg:col-span-4 space-y-5">
          {/* Region Inspection Box */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <h3 className="text-base font-bold text-white">
                  {isAr ? selectedRegion.nameAr : selectedRegion.name}
                </h3>
                <div className="text-xs text-slate-400 font-mono">
                  {selectedRegion.code} · {isAr ? selectedRegion.roleLabelAr : selectedRegion.roleLabelEn}
                </div>
              </div>
              <span
                className={`px-2.5 py-1 rounded text-xs font-medium ${
                  selectedRegion.status === 'nominal'
                    ? 'text-emerald-400 bg-emerald-950/50 border border-emerald-800/60'
                    : selectedRegion.status === 'degraded'
                    ? 'text-amber-400 bg-amber-950/50 border border-amber-800/60'
                    : 'text-rose-400 bg-rose-950/50 border border-rose-800/60'
                }`}
              >
                {selectedRegion.status === 'nominal'
                  ? isAr
                    ? 'جاهزية تامة'
                    : 'Nominal'
                  : selectedRegion.status === 'degraded'
                  ? isAr
                    ? 'تحويل الأحمال'
                    : 'Degraded'
                  : isAr
                  ? 'معطل مؤقتاً'
                  : 'Offline'}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div className="text-xs text-slate-300">
                <span className="font-semibold text-slate-400 block mb-0.5">
                  {isAr ? 'الموقع الفعلي ومناطق التوفر (AZs):' : 'Physical Location & Availability Zones:'}
                </span>
                <span className="text-slate-200">
                  {isAr ? selectedRegion.locationAr : selectedRegion.location}
                </span>
                <div className="mt-1 space-y-0.5">
                  {selectedRegion.availabilityZones.map((az) => (
                    <div key={az} className="text-slate-400 font-mono text-[11px] flex items-center gap-1.5">
                      <Server className="w-3 h-3 text-cyan-400" />
                      <span>{az}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="border-t border-slate-800/80 pt-2.5">
                <span className="font-semibold text-slate-400 text-xs block mb-1">
                  {isAr ? 'التخصص الاستراتيجي:' : 'Architectural Role:'}
                </span>
                <p className="text-xs text-slate-300 leading-relaxed">
                  {isAr ? selectedRegion.specializationAr : selectedRegion.specializationEn}
                </p>
              </div>

              {/* Resource Capacity Metrics */}
              <div className="border-t border-slate-800/80 pt-3 grid grid-cols-3 gap-2 text-center">
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">{isAr ? 'الأنوية' : 'vCPUs'}</div>
                  <div className="text-sm font-bold font-mono text-cyan-400 tabular-nums">
                    {selectedRegion.capacity.cpuCores.toLocaleString()}
                  </div>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">{isAr ? 'الذاكرة' : 'RAM'}</div>
                  <div className="text-sm font-bold font-mono text-cyan-400 tabular-nums">
                    {selectedRegion.capacity.ramTB} TB
                  </div>
                </div>
                <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800/60">
                  <div className="text-[10px] text-slate-400">{isAr ? 'التخزين' : 'NVMe'}</div>
                  <div className="text-sm font-bold font-mono text-cyan-400 tabular-nums">
                    {selectedRegion.capacity.storagePB} PB
                  </div>
                </div>
              </div>

              {/* Interconnect Links */}
              <div className="border-t border-slate-800/80 pt-2.5">
                <span className="font-semibold text-slate-400 text-xs block mb-1">
                  {isAr ? 'خطوط الاتصال والتبادل (Interconnects):' : 'Optical Transit Links:'}
                </span>
                <div className="space-y-1">
                  {selectedRegion.interconnects.map((link) => (
                    <div key={link} className="text-[11px] text-slate-300 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                      <span>{link}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Live Failover Telemetry Stream */}
          <div className="bg-slate-900/70 border border-slate-800 rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
                <Activity className="w-3.5 h-3.5 text-cyan-400" />
                <span>{isAr ? 'سجل أحداث الـ BGP وRaft اللحظي' : 'Live BGP & Raft Convergence Stream'}</span>
              </span>
              <span className="text-[10px] font-mono text-slate-400">{logs.length} events</span>
            </div>
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1">
              {logs.map((log, idx) => (
                <div
                  key={idx}
                  className={`text-[11px] p-2 rounded border font-mono leading-relaxed ${
                    log.type === 'alert'
                      ? 'bg-rose-950/30 border-rose-900/60 text-rose-300'
                      : log.type === 'warning'
                      ? 'bg-amber-950/30 border-amber-900/60 text-amber-300'
                      : log.type === 'success'
                      ? 'bg-emerald-950/30 border-emerald-900/60 text-emerald-300'
                      : 'bg-slate-950/40 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="text-[10px] text-slate-500 font-mono mb-0.5">
                    [{log.timestamp}]
                  </div>
                  <div>{isAr ? log.messageAr : log.messageEn}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
