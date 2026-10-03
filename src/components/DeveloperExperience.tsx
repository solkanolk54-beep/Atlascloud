import React, { useState } from 'react';
import { Language, CliCommand } from '../types/cloud';
import {
  CLI_COMMANDS,
  TERRAFORM_SAMPLE_HCL,
  TERRAFORM_VARIABLES_HCL,
  TERRAFORM_OUTPUTS_HCL,
  TERRAFORM_TFVARS_EXAMPLE,
} from '../data/cloudData';
import { Terminal, Copy, Check, Code, Play, Download, ExternalLink, Sparkles, BookOpen, Layers } from 'lucide-react';

interface DeveloperExperienceProps {
  language: Language;
}

export const DeveloperExperience: React.FC<DeveloperExperienceProps> = ({ language }) => {
  const isAr = language === 'ar';
  const [activeTab, setActiveTab] = useState<'cli' | 'terraform' | 'api-docs'>('cli');

  // CLI state
  const [terminalHistory, setTerminalHistory] = useState<Array<{ cmd: string; output: string }>>([
    {
      cmd: 'curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash',
      output: `[1/4] Connecting to Sovereign CDN (dz-north-1.atlascloud.dz)...
[2/4] Downloading atlas-cli v2.4.1 (linux_amd64 / glibc-2.35)... 100% [42.8 MB / 42.8 MB]
[3/4] Verifying SHA-256 Checksum: e8b9a2cf16001d897f26792dd876... OK (Valid Sovereign Signature)
[4/4] Installing binary to /usr/local/bin/atlas with chmod +x... Done.
[+] Generating auto-completion profiles for bash, zsh, and fish... Done.

✓ AtlasCloud CLI v2.4.1 installed successfully!
Run 'atlas login' to authenticate with your sovereign organization credentials.`,
    },
    {
      cmd: 'atlas login',
      output: `=======================================================
  AtlasCloud Sovereign IAM Authentication Gateway
=======================================================

Connecting to Central Identity & Keycloak Cluster in Algiers (dz-north-1)...
✓ TLS 1.3 Handshake completed with Sovereign Root CA (ARPCE/ANPDP Keyring)
✓ Mutual TLS (mTLS) session established (Cipher: TLS_AES_256_GCM_SHA384)
✓ Bearer Token Verified: eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9...

Logged in as: developer@fintech.dz [Organization: Credit-Populaire-DZ]
Tenant Tier: Enterprise Sovereign High-Availability (Algiers & Oran Multi-Region)
Active Compliance Scope: Law 18-07 / Bank of Algeria Certs Verified.
Allocated Free Credits: 150,000 DZD Active (Valid for 6 Months)`,
    },
  ]);
  const [cliInput, setCliInput] = useState('');
  const [currentDir, setCurrentDir] = useState('~/terraform-sovereign-manifests');
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [copiedInstallCmd, setCopiedInstallCmd] = useState(false);

  // Terraform state
  const [copiedTf, setCopiedTf] = useState(false);
  const [activeTfFile, setActiveTfFile] = useState<'main.tf' | 'variables.tf' | 'outputs.tf' | 'terraform.tfvars'>('main.tf');
  const [tfPlanSimulated, setTfPlanSimulated] = useState<boolean>(false);
  const [tfRegion, setTfRegion] = useState('dz-north-1');
  const [enablePostgis, setEnablePostgis] = useState(true);
  const [workerCount, setWorkerCount] = useState(5);

  const getActiveHclContent = () => {
    switch (activeTfFile) {
      case 'variables.tf':
        return TERRAFORM_VARIABLES_HCL;
      case 'outputs.tf':
        return TERRAFORM_OUTPUTS_HCL;
      case 'terraform.tfvars':
        return TERRAFORM_TFVARS_EXAMPLE;
      case 'main.tf':
      default:
        return TERRAFORM_SAMPLE_HCL;
    }
  };

  const copyTerraform = () => {
    navigator.clipboard.writeText(getActiveHclContent());
    setCopiedTf(true);
    setTimeout(() => setCopiedTf(false), 2000);
  };

  // API docs state
  const [apiLanguage, setApiLanguage] = useState<'curl' | 'typescript' | 'go' | 'python'>('typescript');
  const [apiExecuted, setApiExecuted] = useState(false);

  const executeSingleCmd = (rawCmd: string): { cmd: string; output: string } | null => {
    const trimmed = rawCmd.trim();
    if (!trimmed) return null;

    if (trimmed === 'atlas login') {
      setIsLoggedIn(true);
    }

    if (trimmed.startsWith('cd ')) {
      const target = trimmed.substring(3).trim();
      if (target === '..' || target === '~' || target === '') {
        setCurrentDir('~');
      } else if (target.includes('terraform')) {
        setCurrentDir('~/terraform-sovereign-manifests');
      } else {
        setCurrentDir(`~/${target}`);
      }
    }

    const matched = CLI_COMMANDS.find(
      (c) =>
        c.command.toLowerCase().trim() === trimmed.toLowerCase() ||
        c.command.toLowerCase().startsWith(trimmed.toLowerCase()) ||
        trimmed.toLowerCase().startsWith(c.command.toLowerCase().split(' ')[0])
    );

    let output = '';
    if (trimmed === 'atlas help' || trimmed === 'help') {
      output = `Atlas CLI Commands:
  curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash   Install/update atlas-cli
  atlas login                                                Authenticate with Sovereign IAM Gateway
  cd terraform-sovereign-manifests/                          Navigate to IaC manifests
  terraform init                                             Initialize S3 sovereign state backend
  terraform plan -out=sovereign.tfplan                       Inspect and lock execution plan
  terraform apply sovereign.tfplan                           Apply and provision multi-region infrastructure
  atlas clusters                                             List active K8s clusters across regions
  atlas cluster create <name> [flags]                        Deploy HA Kubernetes cluster in 45s
  atlas db create <name> [flags]                             Deploy Managed PostgreSQL 16 HA
  atlas simulate-failover <db_id>                            Execute Chaos Test / BGP cutover
  atlas terraform export                                     Export infra to Terraform HCL
  atlas status                                               View mesh health & active regions
  atlas clear                                                Clear terminal output`;
    } else if (trimmed === 'atlas clear' || trimmed === 'clear') {
      return { cmd: '__CLEAR__', output: '' };
    } else if (matched) {
      output = matched.output;
    } else {
      output = `Command '${trimmed}' executed successfully against Sovereign Control Plane.
Region: ${tfRegion} | Status: ACK 200 OK | Latency: 12ms`;
    }

    return { cmd: trimmed, output };
  };

  const handleRunCommand = (commandStr: string) => {
    const lines = commandStr.split(/\r?\n|&&/).map((s) => s.trim()).filter(Boolean);
    if (!lines.length) return;

    for (const line of lines) {
      const res = executeSingleCmd(line);
      if (!res) continue;
      if (res.cmd === '__CLEAR__') {
        setTerminalHistory([]);
      } else {
        setTerminalHistory((prev) => [...prev, res]);
      }
    }
    setCliInput('');
  };


  const getDynamicTfCode = () => {
    return TERRAFORM_SAMPLE_HCL.replace(
      'region       = "dz-north-1"',
      `region       = "${tfRegion}"`
    )
      .replace('min_nodes  = 3', `min_nodes  = ${workerCount}`)
      .replace('enable_postgis   = true', `enable_postgis   = ${enablePostgis}`);
  };

  const getApiSnippet = () => {
    switch (apiLanguage) {
      case 'typescript':
        return `import { AtlasClient } from '@atlascloud/sdk';

const atlas = new AtlasClient({
  apiToken: process.env.ATLAS_API_TOKEN,
  defaultRegion: '${tfRegion}',
});

// Deploy High-Availability Managed PostgreSQL 16
const database = await atlas.databases.create({
  name: 'national-payments-db',
  engine: 'postgresql-16',
  highAvailability: {
    enabled: true,
    standbyZone: 'dz-north-1b',
  },
  extensions: ['postgis', 'pgvector'],
  storageGb: 500,
});

console.log('Database endpoint:', database.endpoint);`;
      case 'go':
        return `package main

import (
  "context"
  "fmt"
  "os"
  "github.com/atlascloud/atlas-sdk-go/atlas"
)

func main() {
  client := atlas.NewClient(os.Getenv("ATLAS_API_TOKEN"))
  
  db, err := client.Databases.Create(context.Background(), &atlas.DatabaseCreateParams{
    Name:             "national-payments-db",
    Engine:           "postgresql-16",
    Region:           "${tfRegion}",
    HighAvailability: true,
    Extensions:       []string{"postgis", "pgvector"},
    StorageGB:        500,
  })
  if err != nil {
    panic(err)
  }
  fmt.Printf("Cluster Active: %s\\n", db.Endpoint)
}`;
      case 'python':
        return `from atlascloud import AtlasClient

client = AtlasClient(api_token="sk_live_dz_...")

cluster = client.kubernetes.create_cluster(
    name="prod-k8s",
    region="${tfRegion}",
    version="v1.30.2",
    cni="cilium-ebpf",
    high_availability=True,
    node_count=${workerCount},
)

print(f"Kubeconfig generated: {cluster.kubeconfig_path}")`;
      case 'curl':
      default:
        return `curl -X POST https://api.atlascloud.dz/v1/databases \\
  -H "Authorization: Bearer $ATLAS_API_TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{
    "name": "national-payments-db",
    "engine": "postgresql-16",
    "region": "${tfRegion}",
    "high_availability": {
      "enabled": true,
      "standby_zone": "dz-north-1b"
    },
    "extensions": ["postgis", "pgvector"],
    "storage_gb": 500
  }'`;
    }
  };

  return (
    <div className="space-y-8">
      {/* Editorial Header */}
      <div className="border-b border-slate-800 pb-6">
        <h2 className="text-2xl font-bold text-white tracking-tight">
          {isAr ? 'تجربة المطور المتفوقة (Developer Experience - DX)' : 'World-Class Developer Experience (DX)'}
        </h2>
        <p className="mt-1 text-sm text-slate-400 max-w-3xl">
          {isAr
            ? 'بنية تحتية موجهة للمهندسين وفرق الـ DevOps: أداة CLI فائقة السرعة بلغة Go، ومزود Terraform معتمد، وواجهات برمجية REST/gRPC سريعة تتفوق بمراحل على تجربة تطبيقات الهواتف المحدودة.'
            : 'Engineered for DevOps professionals: Single-binary Go CLI, HashiCorp-verified Terraform provider, and fast programmatic SDKs that render legacy mobile apps obsolete for serious infrastructure tasks.'}
        </p>
      </div>

      {/* DX Mode Tabs (CLI vs Terraform vs API Playground) */}
      <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
        <button
          onClick={() => setActiveTab('cli')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'cli'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Terminal className="w-4 h-4" />
          <span>{isAr ? 'محاكي الـ CLI التفاعلي (atlas-cli)' : 'Interactive CLI Terminal (atlas-cli)'}</span>
        </button>

        <button
          onClick={() => setActiveTab('terraform')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'terraform'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <Code className="w-4 h-4" />
          <span>{isAr ? 'مزود Terraform المعتمد (IaC)' : 'Terraform Provider Studio'}</span>
        </button>

        <button
          onClick={() => setActiveTab('api-docs')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
            activeTab === 'api-docs'
              ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
              : 'text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>{isAr ? 'مستندات API وتجربة الـ SDK' : 'API Reference & SDK Playground'}</span>
        </button>
      </div>

      {/* Tab 1: Interactive CLI Terminal */}
      {activeTab === 'cli' && (
        <div className="space-y-4">
          {/* Quick Start 1-Liner Banner */}
          <div className="bg-slate-900/80 border border-cyan-800/50 rounded-xl p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800/60 font-bold uppercase">
                  {isAr ? 'التثبيت السريع' : 'One-Line Quickstart'}
                </span>
                <span className="text-xs font-semibold text-white">
                  {isAr ? 'تثبيت الأداة وتسجيل الدخول المباشر' : 'Install Atlas CLI & Login'}
                </span>
              </div>
              <div className="font-mono text-xs text-slate-300 bg-slate-950 px-3 py-1.5 rounded border border-slate-800 select-all flex items-center gap-2">
                <span className="text-cyan-400">$</span>
                <span>curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash &amp;&amp; atlas login</span>
              </div>
            </div>

            <div className="flex items-center gap-2 self-end md:self-auto">
              <button
                onClick={() => {
                  navigator.clipboard.writeText('curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash && atlas login');
                  setCopiedInstallCmd(true);
                  setTimeout(() => setCopiedInstallCmd(false), 2000);
                }}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs font-medium transition-colors flex items-center gap-1.5 cursor-pointer"
              >
                {copiedInstallCmd ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedInstallCmd ? (isAr ? 'تم النسخ!' : 'Copied!') : (isAr ? 'نسخ الأمر' : 'Copy')}</span>
              </button>

              <button
                onClick={() => handleRunCommand('curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash && atlas login')}
                className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 rounded text-xs font-bold transition-colors flex items-center gap-1.5 cursor-pointer shadow-sm shadow-cyan-900"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                <span>{isAr ? 'تشغيل في الطرفية' : 'Run in Terminal'}</span>
              </button>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
            <div>
              {isAr
                ? 'جرب تنفيذ الأوامر مباشرة في المحاكي أدناه أو انقر على الأوامر الجاهزة:'
                : 'Click preset commands or type in the interactive terminal emulator below:'}
            </div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {CLI_COMMANDS.map((c, i) => (
                <button
                  key={i}
                  onClick={() => handleRunCommand(c.command)}
                  className="px-2.5 py-1 bg-slate-900 border border-slate-800 hover:border-cyan-500/60 text-slate-300 hover:text-cyan-300 rounded text-[11px] font-mono transition-colors cursor-pointer"
                >
                  {c.command.split(' ')[0] === 'curl'
                    ? 'curl install.sh'
                    : c.command.startsWith('cd')
                    ? 'cd manifests/'
                    : c.command.startsWith('terraform')
                    ? c.command.split(' ').slice(0, 2).join(' ')
                    : c.command.split(' ').slice(1, 3).join(' ') || c.command}
                </button>
              ))}
              <button
                onClick={() => handleRunCommand('atlas clear')}
                className="px-2 py-1 bg-slate-950 border border-slate-800/80 hover:border-rose-500/50 text-slate-500 hover:text-rose-400 rounded text-[11px] font-mono transition-colors cursor-pointer"
              >
                clear
              </button>
            </div>
          </div>

          {/* Terminal Window */}
          <div className="bg-[#080d1a] border border-slate-800 rounded-xl overflow-hidden shadow-2xl font-mono text-xs">
            {/* Terminal Window Chrome */}
            <div className="bg-slate-900/90 px-4 py-2.5 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-rose-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-amber-500/80 inline-block" />
                <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
                <span className="ml-2 text-slate-400 text-[11px]">atlas-cli — bash — 80x24</span>
              </div>
              <div className="flex items-center gap-3 text-[11px]">
                {isLoggedIn && (
                  <span className="text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span>[Org: Credit-Populaire-DZ · 150k DZD Credits]</span>
                  </span>
                )}
                <span className="text-slate-500">v2.4.1-dz (linux/amd64)</span>
              </div>
            </div>

            {/* Terminal Content */}
            <div className="p-4 space-y-3 min-h-[300px] max-h-[420px] overflow-y-auto">
              {terminalHistory.map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center gap-2 text-cyan-400">
                    <span className="text-emerald-400 font-bold">{`dev@sovereign-node:${currentDir}$`}</span>
                    <span className="text-white">{item.cmd}</span>
                  </div>
                  <pre className="text-slate-300 whitespace-pre-wrap leading-relaxed pl-4 border-l border-slate-800 text-[11px]">
                    {item.output}
                  </pre>
                </div>
              ))}

              {/* Input Line */}
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleRunCommand(cliInput);
                }}
                className="flex items-center gap-2 text-cyan-400 pt-2"
              >
                <span className="text-emerald-400 font-bold shrink-0">{`dev@sovereign-node:${currentDir}$`}</span>
                <input
                  type="text"
                  value={cliInput}
                  onChange={(e) => setCliInput(e.target.value)}
                  placeholder="type 'terraform init', 'terraform plan', 'terraform apply sovereign.tfplan'..."
                  className="flex-1 bg-transparent border-none text-white text-xs outline-none focus:ring-0 placeholder:text-slate-600"
                />
                <button
                  type="submit"
                  className="px-2 py-0.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[10px] cursor-pointer"
                >
                  Enter ↵
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Terraform Provider Studio */}
      {activeTab === 'terraform' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Settings & Verification Panel */}
            <div className="lg:col-span-4 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-5">
              <div>
                <div className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-emerald-400 bg-emerald-950/60 border border-emerald-800/60 px-2 py-0.5 rounded mb-2">
                  <Check className="w-3 h-3" />
                  <span>{isAr ? 'كود معتمد: بنك الجزائر والقانون 18-07' : 'Bank-Grade Certified HCL'}</span>
                </div>
                <h3 className="text-sm font-bold text-white">
                  {isAr ? 'مواصفات التزويد البرمجي المعتمد (IaC)' : 'Sovereign Multi-Region HCL'}
                </h3>
                <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                  {isAr
                    ? 'كود إنتاجي رسمي لبنية بنكية موزعة (Multi-Region HA) تشمل كوبرنيتيس بنظام Talos وقاعدة بيانات Patroni HA وتخزين S3 مشفر بمفاتيح HSM.'
                    : 'Production-ready FinTech HCL provisioning multi-region VPC, Talos K8s, Patroni PostgreSQL HA, and HSM-encrypted S3 storage.'}
                </p>
              </div>

              {/* Compliance Verification Badges */}
              <div className="bg-slate-950/70 p-3.5 rounded-lg border border-slate-800 space-y-2 text-xs font-mono">
                <div className="text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1">
                  {isAr ? 'التحقق الآلي من معايير السيادة والأمان:' : 'Automated Policy Compliance Audit:'}
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Law 18-07 Data Residency:</span>
                  <span className="text-emerald-400 font-bold">100% PASS</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Bank of Algeria PCA (RPO=0):</span>
                  <span className="text-emerald-400 font-bold">PASS (Oran DR)</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>PCI-DSS Cardholder HSM:</span>
                  <span className="text-emerald-400 font-bold">AES-256-GCM</span>
                </div>
                <div className="flex items-center justify-between text-slate-300">
                  <span>Sensitive Outputs Masking:</span>
                  <span className="text-emerald-400 font-bold">ENFORCED</span>
                </div>
              </div>

              {/* Plan Simulator & Action Buttons */}
              <div className="space-y-2.5 pt-1">
                <button
                  onClick={() => setTfPlanSimulated(!tfPlanSimulated)}
                  className={`w-full py-2.5 px-3 rounded-lg text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer border ${
                    tfPlanSimulated
                      ? 'bg-purple-950/60 border-purple-500/80 text-purple-200 shadow-md shadow-purple-950/50'
                      : 'bg-slate-800 hover:bg-slate-750 text-cyan-300 border-slate-700'
                  }`}
                >
                  <Play className="w-3.5 h-3.5" />
                  <span>
                    {tfPlanSimulated
                      ? (isAr ? 'إخفاء محاكاة terraform plan' : 'Hide terraform plan Output')
                      : (isAr ? 'تشغيل محاكاة terraform plan وفحص المخرجات' : 'Simulate terraform plan & Outputs')}
                  </span>
                </button>

                <button
                  onClick={copyTerraform}
                  className="w-full py-2.5 px-3 bg-cyan-400 hover:bg-cyan-300 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-md shadow-cyan-950"
                >
                  {copiedTf ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedTf ? (isAr ? `تم نسخ ${activeTfFile}!` : `Copied ${activeTfFile}!`) : (isAr ? `نسخ ملف ${activeTfFile}` : `Copy ${activeTfFile}`)}</span>
                </button>

                <div className="text-[11px] text-slate-400 text-center font-mono">
                  provider: atlascloud.dz/sovereign/atlas (~&gt; 2.4.0)
                </div>
              </div>
            </div>

            {/* Right HCL Multi-File Code Window */}
            <div className="lg:col-span-8 bg-[#090d16] border border-slate-800 rounded-xl overflow-hidden flex flex-col justify-between">
              {/* File Selector Tabs Chrome */}
              <div className="bg-slate-900/90 px-3 py-2 border-b border-slate-800 flex items-center justify-between text-xs">
                <div className="flex items-center gap-1 overflow-x-auto">
                  {(['main.tf', 'variables.tf', 'outputs.tf', 'terraform.tfvars'] as const).map((file) => {
                    const isActive = activeTfFile === file;
                    return (
                      <button
                        key={file}
                        onClick={() => setActiveTfFile(file)}
                        className={`px-3 py-1 rounded text-xs font-mono font-medium transition-colors cursor-pointer whitespace-nowrap ${
                          isActive
                            ? 'bg-slate-800 text-cyan-300 border border-slate-700 font-bold shadow-sm'
                            : 'text-slate-400 hover:text-white'
                        }`}
                      >
                        {file}
                      </button>
                    );
                  })}
                </div>
                <div className="text-[11px] text-slate-400 font-mono hidden sm:block">
                  {activeTfFile === 'main.tf' ? (isAr ? 'البنية الأساسية' : 'Infrastructure Core') : activeTfFile === 'variables.tf' ? (isAr ? 'المتغيرات' : 'Inputs') : activeTfFile === 'outputs.tf' ? (isAr ? 'المخرجات المشفرة' : 'Outputs') : (isAr ? 'المفاتيح السرية' : 'Secret Credentials')}
                </div>
              </div>

              {/* Code Preformatted Text */}
              <pre className="p-4 text-[11px] font-mono text-slate-300 leading-relaxed overflow-x-auto max-h-[460px] select-all">
                {getActiveHclContent()}
              </pre>

              {/* Simulated terraform plan & Output Resolution Panel */}
              {tfPlanSimulated && (
                <div className="bg-slate-950 border-t border-purple-900/60 p-4 font-mono text-xs text-slate-300 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-800">
                    <span className="text-purple-400 font-bold">
                      terraform plan — 6 to add, 0 to change, 0 to destroy.
                    </span>
                    <span className="text-[11px] text-emerald-400">Status: PASS (No Drift)</span>
                  </div>
                  <pre className="text-[11px] text-slate-300 leading-relaxed overflow-x-auto bg-slate-900/80 p-3 rounded border border-slate-800">
{`Terraform will perform the following actions:

  # atlas_vpc.sovereign_core_vpc will be created
  + resource "atlas_vpc" "sovereign_core_vpc" {
      + cidr_block           = "10.100.0.0/16"
      + enable_bgp_anycast   = true
      + id                   = "vpc-sovereign-01"
      + regions              = ["dz-north-1", "dz-west-1"]
    }

  # atlas_kubernetes_cluster.k8s_sovereign_cluster will be created
  + resource "atlas_kubernetes_cluster" "k8s_sovereign_cluster" {
      + api_endpoint         = "https://k8s-api.dz-north-1.atlascloud.dz:6443"
      + cni_plugin           = "cilium-ebpf"
      + os_type              = "talos-linux-immutable"
    }

  # atlas_database_postgresql.pg_sovereign_db will be created
  + resource "atlas_database_postgresql" "pg_sovereign_db" {
      + connection_string    = (sensitive value)
      + ha_mode              = "patroni-sync-streaming"
      + rpo_target_seconds   = 0
      + rto_target_seconds   = 0.3
    }

Plan: 6 to add, 0 to change, 0 to destroy.

Changes to Outputs:
  + database_primary_connection = (sensitive value)
  + k8s_endpoint                = "https://k8s-api.dz-north-1.atlascloud.dz:6443"
  + vpc_id                      = "vpc-production-sovereign-01"`}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Tab 3: API Reference & SDK Playground */}
      {activeTab === 'api-docs' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left API Details */}
          <div className="lg:col-span-5 bg-slate-900/60 border border-slate-800 rounded-xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 bg-emerald-950/80 text-emerald-400 border border-emerald-800/80 rounded text-xs font-mono font-bold">
                POST
              </span>
              <span className="text-xs font-mono text-slate-300">/v1/databases</span>
            </div>

            <h3 className="text-sm font-bold text-white">
              {isAr ? 'إنشاء قاعدة بيانات PostgreSQL 16 مدارة' : 'Create Managed PostgreSQL Database'}
            </h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              {isAr
                ? 'ينشئ عنقود Patroni عالي التوفر مع عقدة Standby متزامنة في منطقة توفر أخرى، وأرشفة مستمرة لـ WAL في S3 السيادي لدعم PITR.'
                : 'Deploys a Patroni HA cluster with synchronous replica in another AZ and continuous S3 WAL streaming for Point-In-Time Recovery.'}
            </p>

            <div className="border-t border-slate-800 pt-3">
              <span className="text-xs font-bold text-slate-300 block mb-2">
                {isAr ? 'المعاملات المطلوبة (Body Parameters):' : 'Body Parameters:'}
              </span>
              <div className="space-y-1.5 text-xs font-mono">
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800/70">
                  <span className="text-cyan-400 font-bold">name</span>
                  <span className="text-slate-500 ml-1">string (required)</span>
                  <p className="text-[11px] text-slate-400 font-sans mt-0.5">
                    {isAr ? 'اسم قاعدة البيانات المعياري' : 'Database cluster identifier'}
                  </p>
                </div>
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800/70">
                  <span className="text-cyan-400 font-bold">engine</span>
                  <span className="text-slate-500 ml-1">string (postgresql-16)</span>
                </div>
                <div className="p-2 bg-slate-950/60 rounded border border-slate-800/70">
                  <span className="text-cyan-400 font-bold">extensions</span>
                  <span className="text-slate-500 ml-1">array (postgis, pgvector)</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setApiExecuted(true)}
              className="w-full py-2 px-3 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold rounded-lg text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer mt-4"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isAr ? 'تجربة إرسال الطلب (Send Request)' : 'Test API Request'}</span>
            </button>
          </div>

          {/* Right Code & Response Panel */}
          <div className="lg:col-span-7 space-y-4">
            {/* Language Selector */}
            <div className="flex items-center justify-between bg-slate-900/80 px-4 py-2 rounded-t-xl border border-slate-800 border-b-0">
              <div className="flex items-center gap-2">
                {(['typescript', 'go', 'python', 'curl'] as const).map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setApiLanguage(lang)}
                    className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                      apiLanguage === lang
                        ? 'bg-cyan-500 text-slate-950 font-bold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    {lang.toUpperCase()}
                  </button>
                ))}
              </div>
              <span className="text-[11px] text-slate-500 font-mono">OpenAPI 3.1</span>
            </div>

            <div className="bg-[#090d16] border border-slate-800 rounded-b-xl p-4 font-mono text-xs text-slate-300 overflow-x-auto min-h-[160px]">
              <pre>{getApiSnippet()}</pre>
            </div>

            {/* Live Response Box */}
            {apiExecuted && (
              <div className="bg-slate-900/80 border border-emerald-900/60 rounded-xl p-4 space-y-2 animate-in fade-in">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-400" />
                    <span className="font-bold text-emerald-400 font-mono">HTTP 201 Created</span>
                    <span className="text-slate-500 font-mono">18ms</span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">application/json</span>
                </div>
                <pre className="text-[11px] font-mono text-slate-300 bg-slate-950/70 p-3 rounded border border-slate-800 leading-relaxed overflow-x-auto">
{`{
  "id": "db_dz_7812903",
  "name": "national-payments-db",
  "status": "PROVISIONING",
  "engine": "postgresql-16",
  "region": "${tfRegion}",
  "endpoint": "national-payments-db.db.${tfRegion}.atlascloud.dz",
  "high_availability": {
    "enabled": true,
    "primary_zone": "${tfRegion}a",
    "standby_zone": "${tfRegion}b",
    "patroni_state": "sync"
  },
  "extensions_installed": ["postgis", "pgvector"],
  "created_at": "2026-10-03T06:37:44Z"
}`}
                </pre>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
