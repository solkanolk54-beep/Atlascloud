import { MigrationStep, HackathonPillar } from '../types/cloud';

export const DEMO_REPO_README_MARKDOWN = `# 🇩🇿 AtlasCloud Sovereign Quickstart Blueprint
> **Production-grade Managed Kubernetes (AKE) & High-Availability PostgreSQL 16 + PostGIS in < 5 Minutes.**

[![Terraform Provider](https://img.shields.io/badge/Terraform%20Provider-v2.4.0--verified-6366f1.svg)](https://registry.terraform.io/providers/atlascloud.dz/atlas)
[![Kubernetes](https://img.shields.io/badge/Kubernetes-v1.30.2%20(Talos%20Linux)-06b6d4.svg)](https://talos.dev)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16.3%20%2B%20PostGIS%203.4-10b981.svg)](https://postgis.net)
[![Data Sovereignty](https://img.shields.io/badge/Compliance-Law%2018--07%20%2F%20ANPDP-purple.svg)](#compliance)
[![Billing](https://img.shields.io/badge/Currency-DZD%20(Edahabia%20%2F%20CIB)-f59e0b.svg)](#pricing)

This repository contains ready-to-deploy, verified Infrastructure-as-Code manifests to bootstrap a sovereign, multi-region cloud topology in Algeria. It provisions an active-active architecture spanning **Algiers (\`dz-north-1\`)** and **Oran (\`dz-west-1\`)** with automated failover and zero foreign cloud dependencies.

---

## 📐 Architecture Overview

\`\`\`
                                  [ Internet / DZ-IXP ]
                                            │
                                            ▼
                           ┌─────────────────────────────────┐
                           │    Anycast BGP Edge Router      │
                           │  (Algiers / Oran / Constantine) │
                           └────────────────┬────────────────┘
                                            │
                    ┌───────────────────────┴───────────────────────┐
                    ▼                                               ▼
     ┌─────────────────────────────┐                 ┌─────────────────────────────┐
     │ Region: dz-north-1 (Algiers)│                 │  Region: dz-west-1 (Oran)   │
     │ ├── Talos Linux Control     │◄──Cilium eBPF──►│ ├── Standby AKE Node Pool   │
     │ ├── AKE Kubernetes Pool (5) │   Mesh Transit  │ └── Standby Patroni Replica │
     │ └── Primary Patroni (PG 16) │                 │     (Synchronous WAL Stream)│
     │     └── PostGIS + pgvector  │                 │                             │
     └─────────────────────────────┘                 └─────────────────────────────┘
\`\`\`

---

## ⚡ 5-Minute Quickstart

### 1. Install & Authenticate with \`atlas-cli\`
\`\`\`bash
# 1. Install official single-binary CLI
curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash

# 2. Authenticate with Sovereign IAM Gateway
atlas login

# 3. Verify organization context & free credits (150,000 DZD)
atlas status
\`\`\`

### 2. Clone This Blueprint
\`\`\`bash
git clone https://github.com/atlascloud-dz/sovereign-quickstart-blueprint.git
cd sovereign-quickstart-blueprint/
\`\`\`

### 3. Deploy via Terraform / OpenTofu
\`\`\`bash
# Initialize S3 sovereign backend & pull provider
terraform init

# Generate & review the deterministic plan (6 resources to create)
terraform plan -out=sovereign.tfplan

# Apply to provision your VPC, K8s cluster, and database
terraform apply sovereign.tfplan
\`\`\`

### 4. Connect to Kubernetes & PostgreSQL
\`\`\`bash
# Export kubeconfig directly from your cluster
atlas k8s kubeconfig --cluster ake-prod-cluster-01 > ~/.kube/config

# Verify Talos nodes
kubectl get nodes -o wide

# Test PostgreSQL 16 + PostGIS extension connection
psql $(terraform output -raw database_primary_connection) -c "SELECT PostGIS_Full_Version();"
\`\`\`

---

## 🛠️ Repository Structure

\`\`\`
.
├── main.tf              # Multi-region VPC, AKE Kubernetes & Patroni PostgreSQL
├── variables.tf         # Configurable parameters (nodes, regions, disk)
├── outputs.tf           # K8s endpoint & PostgreSQL connection strings
├── terraform.tfvars     # Local token & environment overrides
├── manifests/
│   ├── app-deployment.yaml   # Sample microservice container spec
│   └── postgis-sample.sql    # Geospatial schema & nearest-hub query
└── README.md
\`\`\`

---

## 🧪 PostGIS & Spatial Query Example

Once deployed, run this geospatial benchmark inside your database:
\`\`\`sql
-- Enable PostGIS and pgvector in sovereign database
CREATE EXTENSION IF NOT EXISTS postgis;
CREATE EXTENSION IF NOT EXISTS vector;

-- Create national logistics hub table
CREATE TABLE logistics_hubs (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100),
  location GEOGRAPHY(Point, 4326)
);

-- Insert Algerian metropolitan data hubs
INSERT INTO logistics_hubs (name, location) VALUES
  ('Algiers Central Hub', ST_SetSRID(ST_MakePoint(3.0588, 36.7538), 4326)),
  ('Oran Port Logistics', ST_SetSRID(ST_MakePoint(-0.6417, 35.6987), 4326)),
  ('Ouargla Sahara Edge', ST_SetSRID(ST_MakePoint(5.3302, 31.9493), 4326));

-- Query nearest hub from Boumerdes coordinates
SELECT name, 
       ST_Distance(location, ST_SetSRID(ST_MakePoint(3.4772, 36.7664), 4326)) / 1000 AS distance_km
FROM logistics_hubs
ORDER BY distance_km ASC
LIMIT 1;
\`\`\`

---

## 📜 Compliance & Data Sovereignty
* **Algerian Law 18-07:** All customer payloads remain strictly on national soil.
* **Encryption:** AES-256-GCM data at rest, TLS 1.3 in transit with Sovereign Root CA.
* **Currency:** 100% billed in Algerian Dinars (DZD) via Edahabia & CIB.
`;

export const ZERO_DOWNTIME_MIGRATION_STEPS: MigrationStep[] = [
  {
    stepNumber: 1,
    titleAr: 'المرحلة 1: التدقيق الشبكي وربط نفق السيادة المزدوج (Dual-Ingress Transit)',
    titleEn: 'Phase 1: Dual-Network Discovery & Ingress Proxy Setup',
    phaseAr: 'التجهيز الشبكي (Day 0)',
    phaseEn: 'Pre-flight & Network Interconnect',
    commandSnippet: `atlas vpc peering-create \\
  --local-vpc vpc-sovereign-01 \\
  --remote-cidr 172.31.0.0/16 \\
  --wireguard-tunnel auto`,
    technicalDetailsAr: 'إنشاء نفق مشفر آمن بنظام WireGuard أو IPSec يربط شبكتك الحالية في AWS أو الخادم المحلي مع سحابة أطلس السيادية، مع تفعيل توجيه BGP التلقائي.',
    technicalDetailsEn: 'Establish an encrypted WireGuard/IPSec tunnel interconnecting your legacy AWS VPC or on-prem datacenter with AtlasCloud Sovereign VPC.',
    zeroDowntimeMechanismAr: 'تبقى حركة المرور الحية تتدفق 100% إلى البنية القديمة دون أي انقطاع، مع إتاحة قنوات الاتصال الداخلية الآمنة للنسخ التماثلي.',
    zeroDowntimeMechanismEn: 'All live production traffic remains 100% on the legacy cluster while private transport pipelines are primed for replication.',
  },
  {
    stepNumber: 2,
    titleAr: 'المرحلة 2: النسخ التماثلي المباشر لقواعد البيانات (Live CDC Replication)',
    titleEn: 'Phase 2: Continuous Data Capture (CDC) & WAL Streaming',
    phaseAr: 'تزامن البيانات المتواصل (Data Sync)',
    phaseEn: 'Streaming Replication',
    commandSnippet: `atlas db replicate-start \\
  --source "postgres://app:***@legacy-db.aws.com:5432/core" \\
  --target "pg-db-sovereign-prod" \\
  --mode logical-cdc`,
    technicalDetailsAr: 'تفعيل النسخ المتغير المنطقي (Logical Replication) أو أدوات CDC المفتوحة (Debezium / pglogical) لنسخ كل معاملة كتابة من قاعدة بياناتك الحالية فوراً إلى عنقود Patroni HA في الجزائر.',
    technicalDetailsEn: 'Activate native PostgreSQL Logical Replication or pglogical to stream every database write to the AtlasCloud Patroni HA cluster in real time.',
    zeroDowntimeMechanismAr: 'قاعدة البيانات القديمة تستمر في استقبال معاملات المستخدمين، وتتزامن البيانات محلياً مع مؤشر تأخير (Replication Lag < 10ms).',
    zeroDowntimeMechanismEn: 'Legacy database stays in read-write mode; replication lag drops to <10ms across the sovereign transit gateway.',
  },
  {
    stepNumber: 3,
    titleAr: 'المرحلة 3: نشر مزارع الحاويات وتشغيل الحاويات في وضع المرآة (Workload Mirroring)',
    titleEn: 'Phase 3: Mirror Pod Deployments on Talos AKE Cluster',
    phaseAr: 'توازي التطبيقات (Compute Parity)',
    phaseEn: 'Workload Deployment',
    commandSnippet: `kubectl apply -k ./k8s/overlays/sovereign-dz/
atlas k8s verify-readiness --cluster ake-prod-cluster-01`,
    technicalDetailsAr: 'نشر ملفات Helm/Kustomize الخاصة بتطبيقك على عنقود Talos Linux. يتم التحقق من صحة الفحوصات (Liveness/Readiness probes) وتشغيل الخدمات في وضع متوازٍ.',
    technicalDetailsEn: 'Deploy your production Helm charts or Kustomize manifests onto the Talos AKE cluster, verifying pod readiness probes in standby mode.',
    zeroDowntimeMechanismAr: 'التطبيقات تعمل بكامل طاقتها على كوبرنيتيس أطلس دون استقبال زوار خارجيين بعد، للتأكد من اتصالها بقاعدة البيانات المحلية.',
    zeroDowntimeMechanismEn: 'Application pods run hot in standby, fully validated against local read replicas before user traffic is routed.',
  },
  {
    stepNumber: 4,
    titleAr: 'المرحلة 4: تحويل حركة المرور بنظام Canary التدرجي (Weighted BGP/DNS Shift)',
    titleEn: 'Phase 4: Weighted Canary Ingress Cutover (BGP Anycast)',
    phaseAr: 'التحويل الحرج (The Switchover)',
    phaseEn: 'Weighted Cutover',
    commandSnippet: `atlas traffic set-split \\
  --domain api.fintech.dz \\
  --weights "legacy=10,atlascloud=90"
# Once validated, commit 100%
atlas traffic promote --domain api.fintech.dz --target atlascloud`,
    technicalDetailsAr: 'تحويل 10% من الزوار إلى سحابة أطلس، ومراقبة مقاييس الأداء والأخطاء (HTTP 5xx). عند التأكد من استقرار الأداء، يتم تحويل 100% من المسارات عبر BGP Anycast.',
    technicalDetailsEn: 'Shift 10% then 100% of ingress via weighted DNS or BGP Anycast routes. Patroni is promoted to primary write leader with zero split-brain.',
    zeroDowntimeMechanismAr: 'عملية الترقية لقاعدة البيانات أسرع من 300ms، دون فقدان أي معاملة مالية (RPO=0) ودون ظهور صفحة صيانة للمستخدمين.',
    zeroDowntimeMechanismEn: 'Database promotion executes in <300ms. Zero dropped sessions, zero 502 Bad Gateway responses for end consumers.',
  },
  {
    stepNumber: 5,
    titleAr: 'المرحلة 5: إيقاف الخوادم الأجنبية وتوفير تكاليف العملة الصعبة (TCO Optimization)',
    titleEn: 'Phase 5: Legacy Decommissioning & Foreign Currency Savings',
    phaseAr: 'الاستقلالية الكاملة (Full Sovereignty)',
    phaseEn: 'Cost Reclamation',
    commandSnippet: `atlas billing verify-savings --compare-to aws
atlas certs generate-compliance-dossier --law 18-07`,
    technicalDetailsAr: 'إلغاء اشتراكات AWS/Hetzner أو إيقاف الخوادم المحلية الفردية، وتنزيل تقرير التوفير المالي وشهادة الامتثال السيادي للقانون 18-07.',
    technicalDetailsEn: 'Decommission legacy AWS/Hetzner compute instances, eliminate USD/EUR invoices, and export the official ANPDP compliance audit dossier.',
    zeroDowntimeMechanismAr: 'الانتقال اكتمل بنسبة 100%، وتوفير ما بين 40% إلى 60% من الفاتورة الإجمالية مع الدفع بالدينار الجزائري.',
    zeroDowntimeMechanismEn: '100% migration complete with zero operational downtime, slashing infrastructure TCO by 45-60% billed entirely in DZD.',
  },
];

export const HACKDZ_CHALLENGE_DATA = {
  titleAr: 'هاكاثون الجزائر للسحابة السيادية — HackDZ Cloud Challenge 2026',
  titleEn: 'HackDZ Sovereign Cloud Challenge 2026',
  taglineAr: 'تحدي بناء الجيل القادم من التطبيقات السحابية فائقة الصمود على البنية السيادية الجزائرية',
  taglineEn: 'Architect the Next Generation of Resilient Pan-African Applications on Sovereign Cloud',
  datesAr: '15 - 17 نوفمبر 2026 (الجزائر العاصمة + مشاركة عن بعد)',
  datesEn: 'November 15 - 17, 2026 (Algiers Metro Hub & Virtual)',
  totalPrizePoolDzd: '2,500,000 دج كاش + اشتراكات سحابية',
  igniteVoucherCode: 'HACKDZ-IGNITE-2026',
  creditsPerParticipant: '150,000 دج رصيد سحابي مجاني',
  pillars: [
    {
      titleAr: '1. مسار التكنولوجيا المالية والدفع الوطني (FinTech & SATIM)',
      titleEn: 'FinTech & Sovereign Payment Rails',
      prizeDzd: '1,000,000 DZD',
      descriptionAr: 'بناء بوابات دفع وأنظمة تسوية مالية فورية تستغل النسخ المتزامن بين العاصمة ووهران لمقاومة انقطاع الكوابل بنسبة 100%.',
      descriptionEn: 'Build instant payment settlements resilient to metro fiber cuts utilizing Algiers-Oran Patroni replication.',
      deliverablesAr: ['كود Terraform كامل', 'تطبيق موزع على كوبرنيتيس AKE', 'زمن استجابة < 30ms'],
      deliverablesEn: ['Deterministic Terraform HCL', 'AKE Kubernetes deployment', '<30ms P99 latency'],
    },
    {
      titleAr: '2. مسار الفلاحة الدقيقة وسلاسل التبريد (AgriTech & Cold-Chain PostGIS)',
      titleEn: 'AgriTech & Cold Chain Geospatial Mesh',
      prizeDzd: '800,000 DZD',
      descriptionAr: 'تطوير منصة تتبع لحظي لشاحنات التبريد والمزارع الصحراوية الكبرى بالجنوب باستغلال محرك PostGIS وعقدة ورقلة.',
      descriptionEn: 'Develop IoT real-time cold-chain fleet and mega-farm telemetry utilizing PostGIS and Ouargla edge POP.',
      deliverablesAr: ['فهارس مكانية PostGIS', 'استهلاك بيانات الحساسات محلياً', 'لوحة تحكم للمزارعين'],
      deliverablesEn: ['PostGIS spatial queries', 'Local sensor telemetry ingestion', 'Farmer operational dashboard'],
    },
    {
      titleAr: '3. مسار أدوات المطورين والأنظمة الذاتية (DevOps Tooling & MicroVMs)',
      titleEn: 'DevOps Tooling & Zero-SPOF GitOps',
      prizeDzd: '700,000 DZD',
      descriptionAr: 'بناء أدوات CI/CD ومكتبات مفتوحة المصدر تتكامل مع مزود `terraform-provider-atlas` وتسريع نشر التطبيقات.',
      descriptionEn: 'Create open-source GitOps pipelines and CLI extensions on top of terraform-provider-atlas.',
      deliverablesAr: ['إضافة CLI مفتوحة المصدر', 'GitOps ArgoCD blueprint', 'توثيق تقني بالعربية والإنجليزية'],
      deliverablesEn: ['Open-source CLI plugin', 'ArgoCD GitOps pipeline', 'Bilingual technical documentation'],
    },
  ] as HackathonPillar[],
  howToClaimAr: [
    'سجل فريقك في منصة الهاكاثون الرسمية واحصل على مفتاح IAM API.',
    'قم بتثبيت الأداة: `curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash`.',
    'أدخل كود القسيمة: `atlas credits redeem --code HACKDZ-IGNITE-2026`.',
    'استمتع فورياً برصيد 150,000 دج مجاني صالح لمدة 6 أشهر مع دعم فني هندسي L3.',
  ],
  howToClaimEn: [
    'Register your team on the official hackathon portal to receive your IAM API Key.',
    'Install atlas-cli: `curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash`.',
    'Redeem code: `atlas credits redeem --code HACKDZ-IGNITE-2026`.',
    'Instantly unlock 150,000 DZD free cloud credits valid for 6 months with L3 Slack support.',
  ],
};
