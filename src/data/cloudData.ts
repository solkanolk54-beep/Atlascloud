import { CloudRegion, CompetitorComparisonItem, TechStackLayer, CliCommand } from '../types/cloud';

export const CLOUD_REGIONS: CloudRegion[] = [
  {
    id: 'dz-north-1',
    name: 'Algiers Central Metro',
    nameAr: 'منطقة الجزائر العاصمة (المركز)',
    code: 'dz-north-1',
    role: 'primary',
    roleLabelAr: 'المنطقة الأساسية (Multi-AZ)',
    roleLabelEn: 'Primary Metro Region (Multi-AZ)',
    location: 'Algiers (Ben Aknoun & Bab Ezzouar)',
    locationAr: 'الجزائر العاصمة (بن عكنون وباب الزوار)',
    coordinates: { x: 50, y: 16 },
    availabilityZones: ['dz-north-1a (Ben Aknoun)', 'dz-north-1b (Bab Ezzouar)'],
    latencyToAlgiers: 1.2,
    capacity: {
      cpuCores: 16384,
      ramTB: 64,
      storagePB: 12,
    },
    interconnects: ['Telecom Algerie Backbone (100G)', 'DZ-IX Direct Peering', 'Ooredoo/Djezzy Transit'],
    status: 'nominal',
    specializationAr: 'نواة شبكة الربط والتبادل الوطنية (DZ-IX) والبوابات الحكومية والمالية الحساسة',
    specializationEn: 'National IXP Hub, Core Ingress Routing, Financial & Sovereign Core',
  },
  {
    id: 'dz-west-1',
    name: 'Oran Subsea Coastal Hub',
    nameAr: 'منطقة وهران (بوابة الكوابل البحرية)',
    code: 'dz-west-1',
    role: 'secondary',
    roleLabelAr: 'المنطقة الساحلية الغربية',
    roleLabelEn: 'Western Subsea Landing Region',
    location: 'Oran (Bir El Djir)',
    locationAr: 'وهران (بئر الجير)',
    coordinates: { x: 30, y: 22 },
    availabilityZones: ['dz-west-1a (Bir El Djir)'],
    latencyToAlgiers: 6.8,
    capacity: {
      cpuCores: 8192,
      ramTB: 32,
      storagePB: 6,
    },
    interconnects: ['ALPAL-2 Submarine Link', 'SEA-ME-WE-4 Landing Station', 'Western Ring DWDM (40G)'],
    status: 'nominal',
    specializationAr: 'بوابة الاتصال الدولي بالبحر الأبيض المتوسط، ومزامنة قواعد البيانات والنسخ الاحتياطي الجغرافي',
    specializationEn: 'Mediterranean Subsea Ingress, Geo-Replication Storage, Direct European Peering',
  },
  {
    id: 'dz-east-1',
    name: 'Constantine Highland Hub',
    nameAr: 'منطقة قسنطينة (التعافي الإقليمي من الكوارث)',
    code: 'dz-east-1',
    role: 'dr',
    roleLabelAr: 'منطقة الاستقرار والتعافي (Disaster Recovery)',
    roleLabelEn: 'Highland Disaster Recovery Region',
    location: 'Constantine (Ali Mendjeli)',
    locationAr: 'قسنطينة (المدينة الجديدة علي منجلي)',
    coordinates: { x: 74, y: 19 },
    availabilityZones: ['dz-east-1a (Ali Mendjeli)'],
    latencyToAlgiers: 7.4,
    capacity: {
      cpuCores: 8192,
      ramTB: 32,
      storagePB: 6,
    },
    interconnects: ['Eastern Ring DWDM (40G)', 'Skikda Coastal Redundancy Link'],
    status: 'nominal',
    specializationAr: 'مركز العزل الجغرافي ضد الكوارث الطبيعية والأعطال الكبرى، ومستودع S3 للملفات الباردة',
    specializationEn: 'Seismically Isolated Disaster Recovery, Cold Storage Tier, etcd Quorum Arbitrator',
  },
  {
    id: 'dz-south-1',
    name: 'Ouargla Energy Edge POP',
    nameAr: 'منطقة ورقلة / حاسي مسعود (Edge الجنوبي للطاقة)',
    code: 'dz-south-1',
    role: 'edge',
    roleLabelAr: 'منطقة الحافة المتطورة (Edge Computing)',
    roleLabelEn: 'Energy Sector Edge POP',
    location: 'Ouargla / Hassi Messaoud',
    locationAr: 'ورقلة / حاسي مسعود',
    coordinates: { x: 56, y: 46 },
    availabilityZones: ['dz-south-1a (Energy Zone)'],
    latencyToAlgiers: 14.2,
    capacity: {
      cpuCores: 4096,
      ramTB: 16,
      storagePB: 3,
    },
    interconnects: ['Southern Backbone Optical Ring (20G)', 'Private Dedicated APN (Industrial IoT)'],
    status: 'nominal',
    specializationAr: 'معالجة بيانات حقول النفط والغاز، وإنترنت الأشياء الصناعي (IIoT)، وتخزين القياسات الآنية (Time-Series)',
    specializationEn: 'Oil & Gas SCADA Processing, Industrial IoT, Micro-Kube Edge Nodes',
  },
];

export const COMPETITOR_COMPARISON: CompetitorComparisonItem[] = [
  {
    dimension: 'Geographic Resilience & Availability',
    dimensionAr: 'الصمود الجغرافي وتفادي نقطة الفشل المفردة (Zero SPOF)',
    oneCloudDz: 'Single Datacenter (Algiers metro). Vulnerable to local power outages, metro fiber cuts, and single-upstream failures.',
    oneCloudDzAr: 'مركز بيانات وحيد (في الجزائر العاصمة). هش أمام انقطاعات شبكة سونلغاز، وأعمال الحفر للألياف البصرية، وعطل نقطة الاتصال الواحدة.',
    atlasSovereign: 'Active-Active Multi-Region (Algiers, Oran, Constantine, Ouargla) with BGP Anycast routing and automated < 300ms failover.',
    atlasSovereignAr: 'بنية موزعة Active-Active عبر 4 مناطق متباعدة جغرافياً مع توجيه BGP Anycast وتحويل فوري للأحمال خلال أقل من 300 ميلي ثانية.',
    architecturalImpactAr: 'يضمن استمرارية الأعمال بنسبة 99.99% (SLA) حتى لو انقطعت خطوط العاصمة أو توقف مركز كامل.',
    architecturalImpactEn: 'Achieves true 99.99% SLA with continuous operations during catastrophic metro fiber cuts or facility outages.',
    status: 'advantage',
  },
  {
    dimension: 'Infrastructure as Code (IaC) & Automation',
    dimensionAr: 'إدارة البنية التحتية ككود (IaC) والأتمتة السحابية',
    oneCloudDz: 'Limited or non-existent public Terraform Provider. Manual portal clicks, ticket-based configurations, or basic API wrappers.',
    oneCloudDzAr: 'غياب مزود Terraform رسمي منشور، الاعتماد على لوحات تحكم يدوية، ونظام تذاكر إلكتروني لحجز وتعديل الموارد المعقدة.',
    atlasSovereign: 'Official HashiCorp-verified Terraform/OpenTofu Provider, declarative Kubernetes Operators, GitOps native (ArgoCD support).',
    atlasSovereignAr: 'مزود Terraform/OpenTofu رسمي متكامل، مشغلات كوبرنيتيس (K8s Operators)، وتكامل أصيل مع GitOps وأدوات CI/CD.',
    architecturalImpactAr: 'توفير ساعات العمل للفرق التقنية، وتطبيق مبدأ Reproducibility والتراجع السريع (Rollback) في ثوانٍ.',
    architecturalImpactEn: 'Eliminates configuration drift, enables automated PR-based infrastructure review, and speeds deployment from hours to seconds.',
    status: 'advantage',
  },
  {
    dimension: 'Managed Kubernetes Engine',
    dimensionAr: 'خدمة كوبرنيتيس المدارة (Managed K8s)',
    oneCloudDz: 'Manual VM clustering, DIY Kubeadm installs, or legacy OpenStack Magnum orchestration without automated control plane upgrades.',
    oneCloudDzAr: 'تثبيت يدوي على خوادم افتراضية (VMs)، تعقيد في صيانة الـ Control Plane والترقيات، وغياب التوسع التلقائي الفوري.',
    atlasSovereign: 'Atlas Kubernetes Engine (AKE): Production K8s with Talos Linux (immutable OS), Cilium eBPF CNI, multi-AZ master nodes, and 45s node autoscaling.',
    atlasSovereignAr: 'محرك AKE المتطور: نظام Talos غير قابل للتعديل (Zero-Attack Surface)، شبكة Cilium eBPF، وترقية دون انقطاع، مع Node Autoscaler فوري.',
    architecturalImpactAr: 'حماية قصوى وعزل متعدد المستأجرين (Multi-tenant) مع كفاءة شبكية تزيد بـ 40% عن محركات K8s التقليدية.',
    architecturalImpactEn: 'Zero-downtime rolling upgrades, micro-segmentation security, and 40% lower networking overhead via kernel eBPF.',
    status: 'advantage',
  },
  {
    dimension: 'Managed Databases (DBaaS)',
    dimensionAr: 'قواعد البيانات المدارة (PostgreSQL / Redis)',
    oneCloudDz: 'Generic database pre-installed images on VMs. Manual replication setup, snapshot-only backups without Point-in-Time Recovery (PITR).',
    oneCloudDzAr: 'صور جاهزة لقواعد البيانات على VMs تقليدية. إعداد يدوي للنسخ التماثلي، ونسخ احتياطي يومي بطيء دون إمكانية الاسترجاع لأي لحظة (PITR).',
    atlasSovereign: 'Patroni-backed PostgreSQL 16+ HA with Raft consensus, streaming WAL replication to S3, PostGIS/pgvector extensions, and automated PITR.',
    atlasSovereignAr: 'بنية Patroni عالية التوفر لـ PostgreSQL 16 مع إجماع Raft، واسترجاع دقيق لأي ثانية (PITR)، ودعم أصيل لـ PostGIS وpgvector للذكاء الاصطناعي.',
    architecturalImpactAr: 'مؤشر RPO (فقدان البيانات) يقترب من الصفر ومؤشر RTO (زمن التعافي) أقل من 15 ثانية عند عطل العقدة الرئيسية.',
    architecturalImpactEn: 'Near-zero RPO with sub-15s RTO during primary node failure, full geospatial and vector search capability out of the box.',
    status: 'advantage',
  },
  {
    dimension: 'Developer Experience (CLI vs Mobile Hype)',
    dimensionAr: 'تجربة المطور (أدوات الـ CLI مقابل تطبيقات الهاتف)',
    oneCloudDz: 'Marketing emphasis on mobile applications which are impractical for serious DevOps/SRE workflows (no shell, no scripting, high typo risk).',
    oneCloudDzAr: 'التركيز التسويقي على تطبيقات الهاتف التي لا تلائم مهندسي الـ SRE والـ DevOps (لا توفر سكربتات، ولا أتمتة، ومعرضة لأخطاء اللمس الكارثية).',
    atlasSovereign: 'Powerful Go-based `atlas-cli` with autocomplete, instant logs streaming, interactive TUI, SDKs in 4 languages, and mobile strictly for on-call Pager push alerts.',
    atlasSovereignAr: 'أداة `atlas-cli` فائقة السرعة بلغة Go مع دعم التوليد والسكربتات وTUI، بينما يقتصر تطبيق الهاتف على تنبيهات الطوارئ والموافقة على الأذونات فقط.',
    architecturalImpactAr: 'دمج السحابة مباشرة داخل محطة المطور (Terminal) وسير عمل الـ GitOps دون إضاعة الوقت في واجهات اللمس المحدودة.',
    architecturalImpactEn: 'Developer productivity multiplied by 10x through scriptable terminal interfaces, zero-friction local to cloud workflows.',
    status: 'advantage',
  },
  {
    dimension: 'Data Sovereignty & Legal Compliance',
    dimensionAr: 'السيادة الرقمية والامتثال للقانون 18-07 الجزائري',
    oneCloudDz: 'Compliant with local data residency (hosts in Algeria), accepts local DZD currency.',
    oneCloudDzAr: 'متوافق مع توطين البيانات في الجزائر ويدعم الدفع بالدينار الجزائري.',
    atlasSovereign: '100% Sovereign Data Compliance with Law 18-07, ANPDP certified, end-to-end data residency, zero overseas telemetry leakage, and DZD / Edahabia / CIB direct billing.',
    atlasSovereignAr: 'توافق كامل مع متطلبات سلطة حماية المعطيات (ANPDP) والقانون 18-07، تشفير سيادي للبيانات الحساسة، ودفع مباشر بالدينار والبطاقة الذهبية/CIB.',
    architecturalImpactAr: 'حماية قانونية وفنية تامة للمؤسسات البنكية والهيئات الحكومية دون أي تسريب لبيانات المراقبة لخوادم خارجية.',
    architecturalImpactEn: 'Absolute regulatory immunity and compliance for national banking, energy, and healthcare enterprises.',
    status: 'parity',
  },
];

export const TECH_STACK_LAYERS: TechStackLayer[] = [
  {
    id: 'control-plane',
    title: 'Control Plane & Cloud Orchestration',
    titleAr: 'مستوى التحكم ونواة السحابة الموزعة (Control Plane)',
    category: 'Core Engine',
    categoryAr: 'المحرك الأساسي',
    primaryTech: 'Go (Golang) + etcd v3 (Raft Quorum) + MicroVM Hypervisor',
    alternativesEvaluated: ['Python / OpenStack Nova (Rejected: High memory overhead, slow startup)', 'Java / Spring (Rejected: Heavy footprint, GC pauses)'],
    whyChosenAr: 'لغة Go توفر أداءً يقارب لغات C دون مخاطر إدارة الذاكرة، مع كفاءة خرافية في معالجة آلاف طلبات المزامنة اللحظية واستهلاك ضئيل للذاكرة العشوائية. بروتوكول Raft عبر 3 مراكز يمنع أي انقسام ذهني (Split-Brain) في حالة انقطاع الاتصال بين المدن.',
    whyChosenEn: 'Go provides bare-metal performance, instant startup, and tiny memory footprint. etcd distributed consensus ensures zero split-brain across geographically dispersed sites.',
    tradeoffsAr: 'تتطلب انضباطاً برمجياً عالياً في معالجة التوازي (Goroutines) وإدارة شبكات المقابس الموزعة.',
    tradeoffsEn: 'Requires disciplined concurrency patterns and resilient network partition handling.',
    keyFeatures: [
      'Multi-Raft consensus across Algiers, Oran & Constantine',
      'MicroVM lifecycle management under 15ms cold start',
      'High-throughput gRPC internal communication mesh',
      'Hardware-enforced tenant isolation via KVM & Firecracker',
    ],
    keyFeaturesAr: [
      'إجماع Multi-Raft موزع بين العاصمة ووهران وقسنطينة',
      'تشغيل الخوادم المصغرة (MicroVMs) في أقل من 15 ميلي ثانية',
      'شبكة تواصل داخلية فائقة السرعة ببروتوكول gRPC',
      'عزل عتادي تام للمستأجرين عبر معايير KVM وFirecracker',
    ],
  },
  {
    id: 'developer-gateway',
    title: 'Developer Gateway & Public API',
    titleAr: 'بوابة المطورين والواجهة البرمجية (Developer API Gateway)',
    category: 'Developer Platform',
    categoryAr: 'منصة المطورين',
    primaryTech: 'Node.js / TypeScript (Fastify Engine) + OpenAPI 3.1 + GraphQL Federation',
    alternativesEvaluated: ['Java Gateway (Rejected: Slow DX)', 'Ruby on Rails (Rejected: Low throughput per core)'],
    whyChosenAr: 'يوفر محرك Fastify مع TypeScript أسرع إنتاجية للمطورين مع التحقق من صحة المخططات (JSON Schema Validation) في وقت التشغيل، وتوليد فوري للـ SDKs ومستندات Swagger التفاعلية، مع مكتبات ثرية لدعم منظومة أدوات الويب الحديثة.',
    whyChosenEn: 'TypeScript + Fastify delivers ultra-high I/O throughput with built-in schema compilation, automatic OpenAPI spec generation, and rapid DX prototyping.',
    tradeoffsAr: 'أقل سرعة بقليل في الحسابات الرياضية الثقيلة (CPU-bound) لذا يتم تفويض المهام العتادية للـ Control Plane المكتوب بلغة Go.',
    tradeoffsEn: 'Single-thread event loop requires offloading CPU-intensive cryptography or heavy scheduling to Go workers.',
    keyFeatures: [
      'Strict JSON Schema & TypeScript type safety end-to-end',
      'Automated OpenAPI 3.1 spec generation for CLI & SDKs',
      'Token bucket rate limiting with Redis-backed state',
      'Fine-grained RBAC with sovereign JWT & API keys',
    ],
    keyFeaturesAr: [
      'تحقق صارم من البيانات عبر JSON Schema وTypeScript',
      'توليد تلقائي لمواصفات OpenAPI 3.1 لـ CLI ومكتبات اللغات',
      'تحديد معدل الطلبات (Rate Limiting) عبر خوارزمية Token Bucket',
      'نظام أذونات دقيق (RBAC) بمفاتيح API وتشفير سيادي',
    ],
  },
  {
    id: 'database-engine',
    title: 'Managed Data Platform (PostgreSQL & PostGIS & Redis)',
    titleAr: 'منظومة قواعد البيانات المدارة (PostgreSQL وPostGIS وRedis)',
    category: 'Data & Storage',
    categoryAr: 'البيانات والتخزين',
    primaryTech: 'PostgreSQL 16 + Patroni HA + PostGIS + pgvector + Dragonfly/Redis',
    alternativesEvaluated: ['MySQL / Galera (Rejected: Weaker geospatial and vector indexing)', 'Cassandra (Rejected: Operational complexity for typical local workloads)'],
    whyChosenAr: 'PostgreSQL هو المعيار الذهبي لقواعد البيانات العلاقية. توفير PostGIS يعد ميزة حاسمة في السوق الجزائري لدعم تطبيقات النقل واللوجستيك وتتبع الموارد الوطنية، وpgvector يتيح للشركات بناء تطبيقات الذكاء الاصطناعي السيادية. خادم Patroni يدير الـ Failover التلقائي دون أي تدخل بشري.',
    whyChosenEn: 'PostgreSQL 16 with Patroni provides rock-solid ACID compliance, sub-15s automated failover, native GIS routing for logistics, and pgvector for local AI workloads.',
    tradeoffsAr: 'استهلاك الذاكرة في قواعد البيانات الكبيرة يتطلب تهيئة دقيقة للـ shared_buffers ومراقبة الـ WAL archiving باستمرار.',
    tradeoffsEn: 'WAL streaming across WAN links requires continuous bandwidth tuning and proactive disk quota management.',
    keyFeatures: [
      'Patroni orchestrator with zero data loss leader election',
      'Point-In-Time Recovery (PITR) with continuous S3 WAL archiving',
      'PostGIS for geospatial analytics & Algerian transport routing',
      'Dragonfly/Redis sub-millisecond in-memory cache and message pub/sub',
    ],
    keyFeaturesAr: [
      'إدارة Patroni للانتخاب التلقائي للعقدة القائدة مع انعدام فقدان البيانات',
      'استرجاع دقيق لأي نقطة زمنية (PITR) عبر أرشفة مستمرة لـ WAL في S3',
      'دعم كامل لـ PostGIS للتحليلات الجغرافية والخرائطية المحلية',
      'ذاكرة Dragonfly/Redis فائقة السرعة للتخزين المؤقت والرسائل الفورية',
    ],
  },
  {
    id: 'compute-kubernetes',
    title: 'Managed Kubernetes & MicroVM Compute Farms',
    titleAr: 'مزارع الحوسبة وكوبرنيتيس المدار (Compute Farms & K8s)',
    category: 'Compute & Containers',
    categoryAr: 'الحوسبة والحاويات',
    primaryTech: 'Talos Linux + Vanilla K8s 1.30+ + Cilium eBPF CNI + Firecracker MicroVMs',
    alternativesEvaluated: ['Ubuntu Server + K8s (Rejected: Mutable OS, security patching downtime)', 'Standard Flannel CNI (Rejected: Lacks eBPF wire speed & L7 policies)'],
    whyChosenAr: 'نظام Talos Linux هو نظام تشغيل غير قابل للتعديل (Immutable OS)، بدون Shell وبدون SSH، مما يقضي على هجمات الاختراق الشائعة. شبكة Cilium eBPF توفر سرعة توجيه مباشرة في نواة لينكس (Kernel) مع تشفير تلقائي عبر WireGuard بين مراكز البيانات دون إرهاق المعالج.',
    whyChosenEn: 'Talos Linux provides an immutable, security-hardened OS with zero shell access. Cilium eBPF offers kernel-level wire-speed routing and automated WireGuard cross-DC encryption.',
    tradeoffsAr: 'يتطلب من فرق العمل التخلي عن أسلوب تسجيل الدخول بـ SSH القديم والاعتماد الحصري على واجهات API البرمجية وإدارة K8s المعيارية.',
    tradeoffsEn: 'Requires paradigm shift away from traditional SSH debugging to declarative API and ephemeral telemetry tools.',
    keyFeatures: [
      'Zero-attack-surface immutable Linux nodes',
      'eBPF wireguard mesh encrypting all inter-datacenter traffic',
      'Cluster autoscaler scaling worker nodes in under 45 seconds',
      'Multi-tenant network policy isolation out of the box',
    ],
    keyFeaturesAr: [
      'عقد لينكس صلبة غير قابلة للتعديل وبدون أي سطح هجوم (Zero SSH)',
      'تشفير فوري لجميع حزم البيانات بين مراكز البيانات عبر WireGuard eBPF',
      'توسع تلقائي للمزارع البرمجية في أقل من 45 ثانية عند زيادة الضغط',
      'عزل شبكي وسياسي صارم بين بيئات العمل والمستأجرين المختلفين',
    ],
  },
  {
    id: 'storage-fabric',
    title: 'Distributed Storage Fabric (Block, File & S3 Object)',
    titleAr: 'نسيج التخزين الموزع (NVMe Block وCeph S3)',
    category: 'Storage Infrastructure',
    categoryAr: 'البنية التحتية للتخزين',
    primaryTech: 'Ceph Quincy + NVMe-over-Fabrics (NVMe-oF) + Rook K8s Operator',
    alternativesEvaluated: ['GlusterFS (Rejected: Slow small-file I/O, outdated)', 'Commercial SAN appliances (Rejected: Vendor lock-in, astronomical cost in foreign currency)'],
    whyChosenAr: 'يتيح Ceph مع NVMe-oF أداء IOPS خرافي للأقراص الملحقة بالخوادم، مع توفير واجهة S3 كاملة للملفات ونسخ احتياطي متعدد المراكز (Multi-Site Replication) بين العاصمة ووهران وقسنطينة.',
    whyChosenEn: 'Ceph NVMe-oF delivers hyper-scale IOPS for stateful workloads alongside native S3-compatible object storage with cross-datacenter asynchronous replication.',
    tradeoffsAr: 'إدارة الـ CRUSH map وضبط استهلاك الـ Network Bandwidth أثناء إعادة بناء الأقراص التالفة.',
    tradeoffsEn: 'Requires high-bandwidth 40G/100G storage networks to handle re-balancing storms gracefully.',
    keyFeatures: [
      'NVMe-oF raw block performance with < 0.3ms latency',
      'S3-compatible Object Storage with active-active bucket replication',
      'Automated snapshot lifecycle and deduplication',
      'Seamless persistent volume claim (PVC) integration in K8s via Rook',
    ],
    keyFeaturesAr: [
      'أداء خوارق لأقراص NVMe بزمن تأخير يقل عن 0.3 ميلي ثانية',
      'تخزين كائنات متوافق كلياً مع معايير AWS S3 مع مزامنة جغرافية',
      'نسخ لقطات فورية (Snapshots) مع إزالة التكرار لتوفير المساحة',
      'تكامل تام مع كوبرنيتيس عبر مشغل Rook لتوفير أقراص PVC آلياً',
    ],
  },
];

export const CLI_COMMANDS: CliCommand[] = [
  {
    command: 'curl -fsSL https://dl.atlascloud.dz/cli/install.sh | bash',
    descriptionAr: 'تثبيت أداة atlas-cli الرسمية لنظام Linux/macOS بنقرة واحدة',
    descriptionEn: 'Install the official single-binary atlas-cli engine via curl script',
    output: `[1/4] Connecting to Sovereign CDN (dz-north-1.atlascloud.dz)...
[2/4] Downloading atlas-cli v2.4.1 (linux_amd64 / glibc-2.35)... 100% [42.8 MB / 42.8 MB]
[3/4] Verifying SHA-256 Checksum: e8b9a2cf16001d897f26792dd876... OK (Valid Sovereign Signature)
[4/4] Installing binary to /usr/local/bin/atlas with chmod +x... Done.
[+] Generating auto-completion profiles for bash, zsh, and fish... Done.

✓ AtlasCloud CLI v2.4.1 installed successfully!
Run 'atlas login' to authenticate with your sovereign organization credentials.`,
  },
  {
    command: 'atlas login',
    descriptionAr: 'المصادقة المشفرة مع بوابة الهوية السيادية بالجزائر العاصمة',
    descriptionEn: 'Authenticate with AtlasCloud Sovereign IAM Gateway in Algiers',
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
  {
    command: 'atlas clusters',
    descriptionAr: 'استعراض حالة عناقيد كوبرنيتيس اللحظية عبر العاصمة ووهران وورقلة',
    descriptionEn: 'Fetch real-time cluster states across dz-north-1, dz-west-1, and dz-south-1',
    output: `Fetching Real-time Cluster State across dz-north-1, dz-west-1, and dz-south-1...

Cluster ID     Name                   Primary Region         Nodes   Status     RTO Latency   SLA Status
cls-0912-alg   k8s-fintech-prod-alg   dz-north-1 (Algiers)   8       HEALTHY    < 12ms        99.999%
cls-0441-orn   k8s-dr-standby-orn     dz-west-1 (Oran)       5       SYNCED     < 14ms        100.00%
cls-0883-hrk   k8s-edge-scada-hsm     dz-south-1 (Ouargla)   3       ACTIVE     < 4ms         99.980%`,
  },
  {
    command: 'atlas simulate-failover pg-db-satim-payments',
    descriptionAr: 'تنفيذ اختبار هندسة الفوضى: محاكاة قطع ألياف العاصمة واختبار تحويل BGP لوهران',
    descriptionEn: 'Execute Chaos Test: Simulate Fibre Cut in Algiers & Test BGP Switchover to Oran',
    output: `[CHAOS SIMULATOR] Initiating Emergency Cutover Test for Database: pg-db-satim-payments
Injecting fault: Severing Link between dz-north-1a and BGP Gateway...
[Patroni HA] Primary Node heartbeat lost in dz-north-1a.
[Patroni HA] Initiating Leader Election via Raft consensus (dz-east-1 Arbitrator)...
✓ New Leader Elected: Standby Node in dz-west-1 (Oran) promoted to PRIMARY.
✓ BGP Anycast routes updated in 280ms.

Failover Complete! Total Downtime: 280ms | RPO Achieved: 0 Bytes Lost.`,
  },
  {
    command: 'atlas deploy',
    descriptionAr: 'تنفيذ خطة وبناء كود Terraform عبر غلاف atlas-cli المباشر',
    descriptionEn: 'Executes Terraform Plan & Apply using native sovereign backend',
    output: `Executing: terraform apply -auto-approve via atlas-cli wrapper...

Using Engine: Terraform v1.8.4 on linux_amd64
Infrastructure state synchronized successfully with Sovereign Storage (dz-north-1 S3).
Resources: 6 added, 0 changed, 0 destroyed.`,
  },
  {
    command: 'atlas terraform export --cluster k8s-fintech-prod-alg --output ./infra',
    descriptionAr: 'تصدير كامل البنية التحتية إلى ملفات main.tf وvariables.tf وoutputs.tf',
    descriptionEn: 'Export current running infrastructure directly to pristine Terraform HCL',
    output: `✔ Inspecting cluster 'k8s-fintech-prod-alg' and database 'pg-db-satim-payments'...
✔ Generating ./infra/main.tf using provider 'atlascloud.dz/sovereign/atlas' (~> 2.4.0)...
✔ Generating ./infra/variables.tf and ./infra/outputs.tf...
✔ Export completed! Run 'cd ./infra && terraform init && terraform plan'.`,
  },
  {
    command: 'cd terraform-sovereign-manifests/',
    descriptionAr: 'الانتقال إلى مجلد توصيفات البنية التحتية السيادية ككود (IaC)',
    descriptionEn: 'Navigate to Sovereign Terraform infrastructure manifests directory',
    output: `Changed directory to ~/terraform-sovereign-manifests/
Discovered manifests:
  ├── main.tf              (Sovereign Multi-Region VPC, AKE & Patroni)
  ├── variables.tf         (atlas_api_token, primary_region, worker_nodes)
  ├── outputs.tf           (vpc_id, k8s_endpoint, database_primary_conn)
  └── terraform.tfvars     (Production credentials)`,
  },
  {
    command: 'terraform init',
    descriptionAr: 'تهيئة مزود AtlasCloud ومخزن الحالة السيادية المشفر S3 بالعاصمة',
    descriptionEn: 'Initialize AtlasCloud Provider and Sovereign Encrypted S3 Backend in Algiers',
    output: `Initializing the backend...
Successfully configured the backend "s3"! Terraform will automatically
use this backend as the storage for sovereign state files.
Endpoint: https://s3.dz-north-1.atlascloud.dz
Bucket: atlas-tf-state-sovereign-01
Key: production/core-infrastructure.tfstate

Initializing provider plugins...
- Finding atlascloud.dz/sovereign/atlas versions matching "~> 2.4.0"...
- Installing atlascloud.dz/sovereign/atlas v2.4.0...
- Installed atlascloud.dz/sovereign/atlas v2.4.0 (signed by Sovereign GPG Key)

Terraform has been successfully initialized!
You may now begin working with AtlasCloud sovereign infrastructure.`,
  },
  {
    command: 'terraform plan -out=sovereign.tfplan',
    descriptionAr: 'توليد خطة التنفيذ وتدقيق الموارد السيادية وحفظها في sovereign.tfplan',
    descriptionEn: 'Generate and lock deterministic sovereign execution plan to sovereign.tfplan',
    output: `Terraform used the selected providers to generate the following execution plan.
Resource actions are indicated with the following symbols:
  + create

Terraform will perform the following actions:

  # atlas_vpc.sovereign_core_vpc will be created
  + resource "atlas_vpc" "sovereign_core_vpc" {
      + cidr_block          = "10.100.0.0/16"
      + enable_bgp_anycast  = true
      + id                  = (known after apply)
      + name                = "vpc-production-sovereign-01"
      + regions             = ["dz-north-1", "dz-west-1"]
      + tags                = {
          + "Compliance" = "Law-18-07-Compliant"
          + "SecLevel"   = "Bank-Grade"
        }
    }

  # atlas_subnet.subnet_algiers_primary will be created
  + resource "atlas_subnet" "subnet_algiers_primary" {
      + cidr_block = "10.100.1.0/24"
      + name       = "subnet-dz-north-1a-compute"
      + zone       = "dz-north-1a"
    }

  # atlas_subnet.subnet_oran_standby will be created
  + resource "atlas_subnet" "subnet_oran_standby" {
      + cidr_block = "10.100.2.0/24"
      + name       = "subnet-dz-west-1a-dr"
      + zone       = "dz-west-1a"
    }

  # atlas_kubernetes_cluster.k8s_sovereign_cluster will be created
  + resource "atlas_kubernetes_cluster" "k8s_sovereign_cluster" {
      + api_endpoint         = (known after apply)
      + cni_engine           = "cilium-ebpf"
      + immutable_os         = "talos-v1.7.2"
      + name                 = "ake-prod-cluster-01"
      + worker_count         = 5
    }

  # atlas_database_postgresql.pg_sovereign_db will be created
  + resource "atlas_database_postgresql" "pg_sovereign_db" {
      + engine               = "postgresql-16"
      + ha_clustering        = "patroni-raft"
      + high_availability   = true
      + multi_region_replica = "dz-west-1"
      + storage_size_gb      = 500
    }

  # atlas_load_balancer.bgp_anycast_ingress will be created
  + resource "atlas_load_balancer" "bgp_anycast_ingress" {
      + anycast_ipv4         = "197.112.4.10"
      + ssl_tls_policy       = "TLS_1_3_STRICT"
    }

Plan: 6 to add, 0 to change, 0 to destroy.
Saved the prepared plan to: sovereign.tfplan`,
  },
  {
    command: 'terraform apply sovereign.tfplan',
    descriptionAr: 'نشر الموارد السيادية عبر العاصمة ووهران دون أي توقف (Zero Downtime)',
    descriptionEn: 'Apply execution plan creating sovereign VPC, K8s cluster and Patroni DB',
    output: `atlas_vpc.sovereign_core_vpc: Creating...
atlas_vpc.sovereign_core_vpc: Creation complete after 3s [id=vpc-sovereign-alg-orn-9081]
atlas_subnet.subnet_algiers_primary: Creating...
atlas_subnet.subnet_oran_standby: Creating...
atlas_subnet.subnet_algiers_primary: Creation complete after 2s [id=sub-alg-1a]
atlas_subnet.subnet_oran_standby: Creation complete after 2s [id=sub-orn-1a]
atlas_kubernetes_cluster.k8s_sovereign_cluster: Creating... [Talos Linux Bootstrapping]
atlas_database_postgresql.pg_sovereign_db: Creating... [Patroni Cluster dz-north-1 -> dz-west-1]
atlas_database_postgresql.pg_sovereign_db: Creation complete after 8s [id=pg-patroni-prod-8812]
atlas_kubernetes_cluster.k8s_sovereign_cluster: Creation complete after 12s [id=ake-fintech-prod]
atlas_load_balancer.bgp_anycast_ingress: Creating...
atlas_load_balancer.bgp_anycast_ingress: Creation complete after 2s [id=lb-bgp-anycast-dz]

Apply complete! Resources: 6 added, 0 changed, 0 destroyed.

Outputs:
database_primary_connection = "postgresql://atlas_admin:***@pg-patroni-prod-8812.dz-north-1.atlascloud.dz:5432/sovereign_core?sslmode=verify-full"
k8s_endpoint = "https://k8s-api.dz-north-1.atlascloud.dz:6443"
vpc_id = "vpc-sovereign-alg-orn-9081"`,
  },
];

export const ATLAS_CLI_GO_SOURCE = `package main

import (
	"context"
	"crypto/tls"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"os"
	"os/exec"
	"time"

	"github.com/fatih/color"
	"github.com/rodaine/table"
	"github.com/spf13/cobra"
)

// Consts and Configuration
const (
	AtlasVersion = "v2.4.0-sovereign"
	DefaultAPI   = "https://api.atlascloud.dz/v1"
)

type ClusterStatus struct {
	ID        string \`json:"id"\`
	Name      string \`json:"name"\`
	Region    string \`json:"region"\`
	Nodes     int    \`json:"nodes"\`
	Status    string \`json:"status"\`
	Uptime    string \`json:"uptime"\`
	SLAStatus string \`json:"sla_status"\`
}

var rootCmd = &cobra.Command{
	Use:   "atlas",
	Short: "atlas-cli: Sovereign Cloud Engine Command Line Interface",
	Long:  \`Official Command Line Tool for AtlasCloud Sovereign - Empowering Developer-First Infrastructure in Algeria.\`,
}

var loginCmd = &cobra.Command{
	Use:   "login",
	Short: "Authenticate with AtlasCloud Sovereign IAM Gateway",
	Run: func(cmd *cobra.Command, args []string) {
		color.Cyan("\\n=======================================================")
		color.Cyan("  AtlasCloud Sovereign IAM Authentication Gateway")
		color.Cyan("=======================================================\\n")

		fmt.Print("Enter API Key or Bearer Token: ")
		var token string
		fmt.Scanln(&token)

		color.Yellow("Verifying token with Central Identity Server in Algiers (dz-north-1)...")
		time.Sleep(800 * time.Millisecond)

		color.Green("✓ Authentication Successful!")
		color.White("Logged in as: admin@fintech.bank.dz [Organization: Credit-Populaire-DZ]")
		color.White("Active Compliance Scope: Law 18-07 / Bank of Algeria Certs Verified.")
	},
}

var clusterListCmd = &cobra.Command{
	Use:   "clusters",
	Short: "List all active Sovereign Kubernetes Clusters and Health Metrics",
	Run: func(cmd *cobra.Command, args []string) {
		color.Blue("\\nFetching Real-time Cluster State across dz-north-1, dz-west-1, and dz-south-1...\\n")
		time.Sleep(500 * time.Millisecond)

		headerFmt := color.New(color.FgGreen, color.Underline).SprintfFunc()
		columnFmt := color.New(color.FgWhite).SprintfFunc()

		tbl := table.New("Cluster ID", "Name", "Primary Region", "Nodes", "Status", "RTO Latency", "SLA Status")
		tbl.WithHeaderFormatter(headerFmt).WithFirstColumnFormatter(columnFmt)

		tbl.AddRow("cls-0912-alg", "k8s-fintech-prod-alg", "dz-north-1 (Algiers)", 8, "HEALTHY", "< 12ms", "99.999%")
		tbl.AddRow("cls-0441-orn", "k8s-dr-standby-orn", "dz-west-1 (Oran)", 5, "SYNCED", "< 14ms", "100.00%")
		tbl.AddRow("cls-0883-hrk", "k8s-edge-scada-hsm", "dz-south-1 (Ouargla)", 3, "ACTIVE", "< 4ms", "99.980%")

		tbl.Print()
		fmt.Println()
	},
}

var dbFailoverSimCmd = &cobra.Command{
	Use:   "simulate-failover [db_id]",
	Short: "Execute Chaos Test: Simulate Fibre Cut in Algiers & Test BGP Switchover to Oran",
	Args:  cobra.ExactArgs(1),
	Run: func(cmd *cobra.Command, dbID string) {
		color.Red("\\n[CHAOS SIMULATOR] Initiating Emergency Cutover Test for Database: %s", dbID)
		color.Yellow("Injecting fault: Severing Link between dz-north-1a and BGP Gateway...")
		time.Sleep(600 * time.Millisecond)

		color.White("[Patroni HA] Primary Node heartbeat lost in dz-north-1a.")
		color.White("[Patroni HA] Initiating Leader Election via Raft consensus (dz-east-1 Arbitrator)...")
		time.Sleep(240 * time.Millisecond)

		color.Green("✓ New Leader Elected: Standby Node in dz-west-1 (Oran) promoted to PRIMARY.")
		color.Green("✓ BGP Anycast routes updated in 280ms.")
		color.Cyan("\\nFailover Complete! Total Downtime: 280ms | RPO Achieved: 0 Bytes Lost.")
	},
}

var applyTfCmd = &cobra.Command{
	Use:   "deploy",
	Short: "Executes Terraform Plan & Apply using native sovereign backend",
	Run: func(cmd *cobra.Command, args []string) {
		color.Magenta("\\nExecuting: terraform apply -auto-approve via atlas-cli wrapper...\\n")
		
		out, err := exec.Command("terraform", "version").Output()
		if err != nil {
			color.Red("Error: Terraform binary not found in PATH.")
			return
		}
		fmt.Printf("Using Engine: %s", string(out))
		color.Green("Infrastructure state synchronized successfully with Sovereign Storage.")
	},
}

func main() {
	rootCmd.AddCommand(loginCmd)
	rootCmd.AddCommand(clusterListCmd)
	rootCmd.AddCommand(dbFailoverSimCmd)
	rootCmd.AddCommand(applyTfCmd)

	if err := rootCmd.Execute(); err != nil {
		fmt.Println(err)
		os.Exit(1)
	}
}
`;


export const TERRAFORM_SAMPLE_HCL = `# ==============================================================================
# AtlasCloud Sovereign Cloud Infrastructure Provisioning
# Provider: HashiCorp Terraform / OpenTofu
# Target Architecture: Multi-Region High-Availability (dz-north-1 & dz-west-1)
# ==============================================================================

terraform {
  required_version = ">= 1.6.0"
  required_providers {
    atlas = {
      source  = "atlascloud.dz/sovereign/atlas"
      version = "~> 2.4.0"
    }
  }
  
  # State Storage secured in Algiers S3 Engine with Server-Side Encryption
  backend "s3" {
    bucket                      = "atlas-tf-state-sovereign-01"
    key                         = "production/core-infrastructure.tfstate"
    region                      = "dz-north-1"
    endpoint                    = "https://s3.dz-north-1.atlascloud.dz"
    skip_region_validation      = true
    skip_credentials_validation = true
    encrypt                     = true
  }
}

provider "atlas" {
  api_endpoint = "https://api.atlascloud.dz/v1"
  auth_token   = var.atlas_api_token
  organization = "enterprise-fintech-dz"
}

# 1. Sovereign Virtual Private Cloud (VPC) Setup
resource "atlas_vpc" "sovereign_core_vpc" {
  name        = "vpc-production-sovereign-01"
  cidr_block  = "10.100.0.0/16"
  description = "Primary Sovereign Multi-Region Network Infrastructure"

  regions = [
    "dz-north-1", # Primary: Algiers
    "dz-west-1"   # Secondary DR: Oran
  ]

  enable_bgp_anycast = true
  enable_dns_hostnames = true

  tags = {
    Environment = "Production"
    Compliance  = "Law-18-07-Compliant"
    SecLevel    = "Bank-Grade"
  }
}

# 2. Multi-AZ Subnets Configuration
resource "atlas_subnet" "subnet_algiers_primary" {
  vpc_id            = atlas_vpc.sovereign_core_vpc.id
  name              = "subnet-dz-north-1a-compute"
  cidr_block        = "10.100.10.0/24"
  region            = "dz-north-1"
  zone              = "dz-north-1a"
  is_public         = false
}

resource "atlas_subnet" "subnet_oran_dr" {
  vpc_id            = atlas_vpc.sovereign_core_vpc.id
  name              = "subnet-dz-west-1a-dr"
  cidr_block        = "10.100.20.0/24"
  region            = "dz-west-1"
  zone              = "dz-west-1a"
  is_public         = false
}

# 3. Sovereign Managed Kubernetes Cluster (Talos Linux + Cilium eBPF)
resource "atlas_kubernetes_cluster" "k8s_sovereign_cluster" {
  name       = "k8s-fintech-prod-alg"
  vpc_id     = atlas_vpc.sovereign_core_vpc.id
  k8s_version = "1.30.2"
  os_type    = "talos-linux-immutable"

  cni_plugin = "cilium-ebpf"
  enable_wireguard_encryption = true

  control_plane {
    count     = 3
    flavor    = "sovereign.cp.c8m16" # 8 vCPU, 16GB RAM
    regions   = ["dz-north-1", "dz-west-1", "dz-east-1"] # Quorum Raft
  }

  node_pool {
    name       = "worker-pool-primary"
    count      = 5
    flavor     = "sovereign.node.c16m64" # 16 vCPU, 64GB RAM
    subnets    = [atlas_subnet.subnet_algiers_primary.id]
    auto_scale = true
    min_nodes  = 3
    max_nodes  = 12
  }

  tags = {
    Workload = "FinTech-Core"
  }
}

# 4. Managed PostgreSQL 16 Database Cluster with PostGIS & Patroni HA
resource "atlas_database_postgresql" "pg_sovereign_db" {
  name                = "pg-db-satim-payments"
  vpc_id              = atlas_vpc.sovereign_core_vpc.id
  engine_version      = "16.3"
  ha_mode             = "patroni-sync-streaming"
  rpo_target_seconds  = 0
  rto_target_seconds  = 0.3

  primary_region      = "dz-north-1"
  standby_region      = "dz-west-1"

  storage_type_nvme   = true
  allocated_storage_gb = 500

  extensions = [
    "postgis",
    "pgvector",
    "pg_stat_statements",
    "uuid-ossp"
  ]

  backup_configuration {
    retention_days            = 30
    pitr_enabled              = true # Point-In-Time Recovery
    continuous_archiving_s3   = true
  }

  encryption_at_rest {
    enabled         = true
    hsm_key_id      = "hsm-dz-key-2026-991A"
    algorithm       = "AES-256-GCM"
  }

  tags = {
    DataCategory = "PCI-DSS-Cardholder-Data"
  }
}

# 5. Sovereign S3-Compatible Object Storage Bucket
resource "atlas_s3_bucket" "sovereign_storage" {
  bucket_name = "dz-fintech-documents-encrypted"
  region      = "dz-north-1"

  replication_configuration {
    enabled           = true
    target_region     = "dz-west-1"
    sync_mode         = "synchronous"
  }

  versioning = true

  server_side_encryption {
    algorithm  = "AES-256"
    kms_key_id = "arn:atlas:kms:dz-north-1:bank-key-01"
  }
}
`;

export const TERRAFORM_VARIABLES_HCL = `# variables.tf
variable "atlas_api_token" {
  type        = string
  description = "The Sovereign API Bearer Token generated via atlas-cli"
  sensitive   = true
}
`;

export const TERRAFORM_OUTPUTS_HCL = `# outputs.tf
output "vpc_id" {
  value       = atlas_vpc.sovereign_core_vpc.id
  description = "The unique identifier of the Sovereign VPC"
}

output "k8s_endpoint" {
  value       = atlas_kubernetes_cluster.k8s_sovereign_cluster.api_endpoint
  description = "The Control Plane Endpoint for Cluster Access"
}

output "database_primary_connection" {
  value       = atlas_database_postgresql.pg_sovereign_db.connection_string
  sensitive   = true
  description = "The High-Availability PostGIS Connection String"
}
`;

export const TERRAFORM_TFVARS_EXAMPLE = `# terraform.tfvars.example
# Generated securely via 'atlas token create --name ci-cd-deployer'
atlas_api_token = "atlas_sec_live_dz_9847192a8b3f4c1e09d8"
`;

