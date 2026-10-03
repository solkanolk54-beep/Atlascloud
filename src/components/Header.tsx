import React from 'react';
import { Language } from '../types/cloud';
import { Globe, Terminal } from 'lucide-react';

interface HeaderProps {
  language: Language;
  onLanguageChange: (lang: Language) => void;
  activeSection: string;
  onNavigate: (section: string) => void;
  onQuickSimulate: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  language,
  onLanguageChange,
  activeSection,
  onNavigate,
  onQuickSimulate,
}) => {
  const isAr = language === 'ar';

  const navLinks = [
    { id: 'topology', labelAr: 'الشبكة الموزعة', labelEn: 'Distributed Topology' },
    { id: 'cmo-launch', labelAr: 'استراتيجية الـ CMO والباقات', labelEn: 'CMO Strategy & Tiers' },
    { id: 'competitive-intel', labelAr: 'رصد المنافس وأفق 2028', labelEn: 'Threat Intel 2028' },
    { id: 'compliance', labelAr: 'الأمن والامتثال البنكي', labelEn: 'Security & Compliance' },
    { id: 'risk-dr', labelAr: 'ثغرات المنافس والتعافي', labelEn: 'Risks & Geo-DR' },
    { id: 'dx-platform', labelAr: 'أدوات المطورين والـ CLI', labelEn: 'Developer DX' },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-slate-800/80 bg-[#090d16]/95 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Zone 1: Single Brand Wordmark Element (No badges or attached subtitles) */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault();
            onNavigate('topology');
          }}
          className="text-lg font-bold tracking-tight text-white hover:text-cyan-400 transition-colors shrink-0"
        >
          {isAr ? 'أطلس كلاود السيادي' : 'AtlasCloud Sovereign'}
        </a>

        {/* Zone 2: 4-6 Clean Nav Text Links */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-300">
          {navLinks.map((link) => {
            const isActive = activeSection === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`relative transition-colors whitespace-nowrap cursor-pointer py-1 ${
                  isActive
                    ? 'text-cyan-400 font-semibold'
                    : 'text-slate-300 hover:text-white'
                }`}
              >
                {isAr ? link.labelAr : link.labelEn}
                {isActive && (
                  <span className="absolute -bottom-4.5 inset-x-0 h-0.5 bg-cyan-400" />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Primary Actions (Language Toggle & Failover Trigger) */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => onLanguageChange(isAr ? 'en' : 'ar')}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-200 bg-slate-900 border border-slate-800 rounded-md hover:bg-slate-800 transition-colors whitespace-nowrap cursor-pointer"
            title="تبديل اللغة / Switch Language"
          >
            <Globe className="w-3.5 h-3.5 text-cyan-400" />
            <span>{isAr ? 'English' : 'العربية'}</span>
          </button>

          <button
            onClick={onQuickSimulate}
            className="flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-slate-950 bg-cyan-400 hover:bg-cyan-300 rounded-md transition-colors whitespace-nowrap shadow-sm shadow-cyan-950 cursor-pointer"
          >
            <Terminal className="w-3.5 h-3.5" />
            <span>{isAr ? 'محاكاة اختبار الصمود' : 'Simulate Failover'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};
