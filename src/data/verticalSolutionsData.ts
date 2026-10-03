import { DetailedSolutionBrief, OutreachEmail } from '../types/cloud';

export const ATLAS_FELAHA_BRIEF: DetailedSolutionBrief = {
  id: 'atlas-felaha',
  brandName: 'Atlas Felaha',
  brandNameAr: 'أطلس فلاحة (Atlas Felaha) — سحابة الزراعة الدقيقة وإنترنت الأشياء',
  taglineAr: 'منظومة معالجة البيانات الزراعية فائقة الصمود للمزارع الكبرى بالجنوب الجزائري عبر عقدة ورقلة',
  taglineEn: 'Sovereign Precision AgriTech & IoT Telemetry Mesh Powered by Ouargla Southern Edge Node',
  targetAudienceAr: 'المزارع الكبرى، مستثمرو القمح والذرة، مزارع التمور والبيوت البلاستيكية في بسكرة، وادي سوف، المنيعة، غرداية، وورقلة',
  targetAudienceEn: 'Mega-farms, pivot irrigation cereal projects, and greenhouse operators in Biskra, El Oued, El Menia, and Ouargla',
  regionsInvolved: ['dz-south-1 (Ouargla Edge)', 'dz-north-1 (Algiers Core)', 'dz-west-1 (Oran Archive)'],
  keyPainPointsAr: [
    'انقطاع الاتصال المتكرر بالإنترنت وضعف التغطية في المزارع الصحراوية المعزولة عند الاعتماد على خوادم أجنبية.',
    'صعوبة معالجة آلاف قراءات مستشعرات الرطوبة والملوحة اللحظية (Sensor Ingestion) بزمن استجابة منخفض.',
    'الهدر الكبير في مياه السقي الجوفية وتكاليف الكهرباء والديزل لمضخات الآبار الارتوازية العميقة.',
    'مخاطر تخزين البيانات الجغرافية الحساسة للأمن الغذائي الوطني خارج التراب الجزائري.',
  ],
  keyPainPointsEn: [
    'Intermittent Sahara connectivity and high latency when sending sensor telemetry to overseas cloud regions.',
    'Inability to process high-frequency soil moisture and salinity telemetry at scale with sub-5ms latency.',
    'Excessive ground-water pumping costs, high Sonelgaz commercial tariffs, and diesel generator fuel burn.',
    'Data sovereignty risks storing national strategic food production and soil maps on foreign servers.',
  ],
  technicalArchitectureAr: `تعتمد بنية "أطلس فلاحة" على عقدة الحوسبة الطرفية في ورقلة (dz-south-1 Edge POP) لمعالجة قراءات المستشعرات محلياً دون الحاجة لنقل البيانات إلى العاصمة أو خارج البلاد:
1. بروتوكول MQTT عبر EMQX Cluster: استقبال قراءات محطات الأرصاد، وحساسات رطوبة التربة (LoRaWAN/4G)، وتدفقات أجهزة الرش المحوري (Center Pivots) بزمن وصول يقل عن 4 ميلي ثانية.
2. التخزين المؤقت المحلي (Local Edge Buffering): في حال انقطاع الألياف الصحراوية المؤقت، تخزن العقدة الجنوبية البيانات محلياً على أقراص NVMe دون فقد أي قراءة، ثم تزامنها تلقائياً مع العاصمة فور عودة الاتصال.
3. التحليل المكاني PostGIS + TimescaleDB: دمج بيانات الأقمار الصناعية (NDVI) مع الإحداثيات الجغرافية لقطع الأراضي، وتحديد الخرائط الحرارية للإجهاد المائي.
4. الأتمتة المباشرة لمضخات السقي: تشغيل وإيقاف صمامات الرش المحوري تلقائياً بالاعتماد على خوارزميات الذكاء الاصطناعي المحلية.`,
  technicalArchitectureEn: `Atlas Felaha leverages the Ouargla Edge POP (dz-south-1) for ultra-low latency local ingestion across southern farmlands:
1. High-Throughput MQTT Ingestion: EMQX brokers receive LoRaWAN/4G telemetry from weather stations, soil probes, and center pivot rigs in <4ms.
2. Sahara Offline Edge Buffering: Persistent local NVMe queues preserve all telemetry during intermittent desert backhaul cuts, auto-syncing to Algiers when backhaul recovers.
3. Geospatial PostGIS & TimescaleDB: Spatial joins between pivot circular polygons, NDVI satellite spectral indices, and real-time evapotranspiration rates.
4. Automated Closed-Loop Irrigation: Autonomous trigger signals dispatched directly to SCADA pumps based on predictive soil moisture thresholds.`,
  architectureHighlightsAr: [
    'زمن استجابة < 4ms من حقول بسكرة ووادي سوف بفضل قرب عقدة ورقلة.',
    'صمود تام أمام انقطاع الإنترنت بفضل التخزين الطرفي المستقل (Autonomous Edge).',
    'توفير مؤكد بنسبة 30% إلى 40% من مياه السقي وفاتورة طاقة المضخات.',
    'بيانات التربة والمحاصيل مشفرة 100% داخل الجزائر طبقاً للقانون 18-07.',
  ],
  architectureHighlightsEn: [
    '<4ms ping latency from Biskra, El Oued, and Ghardaia farms via Ouargla Edge.',
    'Autonomous offline survival mode during desert telecom disruptions.',
    'Proven 30-40% reduction in groundwater extraction and Sonelgaz pumping electricity.',
    '100% compliant with Law 18-07 data sovereignty for strategic food security.',
  ],
  postGisSnippet: `-- Atlas Felaha: تفعيل الري الآلي الذكي للرشاشات المحورية في وادي سوف
-- استعلام يحدد قطع الأراضي التي تعاني من إجهاد مائي يستدعي تشغيل المضخة
WITH urgent_pivots AS (
  SELECT 
    p.pivot_id,
    p.crop_type,
    p.pump_scada_topic,
    p.geom AS pivot_boundary,
    AVG(s.moisture_percentage) AS avg_moisture
  FROM farm_center_pivots p
  JOIN soil_sensors s 
    ON ST_Contains(p.geom, s.geom)
  WHERE s.recorded_at > NOW() - INTERVAL '15 minutes'
  GROUP BY p.pivot_id, p.crop_type, p.pump_scada_topic, p.geom
  HAVING AVG(s.moisture_percentage) < 18.5 -- عتبة الإجهاد المائي لمحصول القمح
)
SELECT 
  pivot_id,
  crop_type,
  avg_moisture,
  pump_scada_topic,
  'START_IRRIGATION_CYCLE' AS dispatch_command,
  ST_AsGeoJSON(pivot_boundary) AS geojson
FROM urgent_pivots;`,
  roiSummaryAr: 'توفير متوسط يقدر بـ 4.8 مليون دينار جزائري سنوياً لكل 500 هكتار من تكاليف الكهرباء وصيانة المضخات، مع رفع إنتاجية الهكتار بـ 18% وتفادي تلف المحاصيل.',
  roiSummaryEn: 'Average net savings of 4.8M DZD/year per 500-hectare cereal pivot farm in electricity and pump repairs, alongside an 18% yield improvement.',
};

export const ATLAS_LOGISTIQ_BRIEF: DetailedSolutionBrief = {
  id: 'atlas-logistiq',
  brandName: 'Atlas Logistiq',
  brandNameAr: 'أطلس لوجستيك (Atlas Logistiq) — سحابة التتبع المبرد وسلاسل الإمداد',
  taglineAr: 'منظومة التتبع اللحظي للأساطيل المبردة والخدمات اللوجستية الدوائية بزمن استجابة < 15ms',
  taglineEn: 'Sub-15ms Real-Time Cold-Chain Telemetry & Sovereign Fleet Logistics Architecture',
  targetAudienceAr: 'موزعو الأدوية والمستحضرات الصيدلانية (مجمعات صيدال، بيوفارم، وغيرهم)، شركات الأغذية الطازجة، وأساطيل الشحن السريع الوطنية',
  targetAudienceEn: 'Pharmaceutical distributors, cold-chain food freight operators, and nation-wide fast express courier fleets',
  regionsInvolved: ['dz-north-1 (Algiers Anycast)', 'dz-west-1 (Oran Ingress)', 'dz-east-1 (Constantine Hub)', 'dz-south-1 (Sahara Transit)'],
  keyPainPointsAr: [
    'تلف الشحنات الدوائية واللقاحات الحساسة بسبب غياب التنبيه اللحظي عند تعطل مبرد الشاحنة على الطرق الصحراوية.',
    'التكاليف الباهظة بالعملة الصعبة لواجهات الخرائط الأجنبية (مثل Google Maps API) التي تكلف آلاف الدولارات شهرياً.',
    'بطء استجابة أنظمة التتبع السحابية التقليدية المستضافة بأوروبا (زمن تأخير يتجاوز 120ms مع انقطاعات في الاتصال).',
    'عدم الامتثال الصارم لدفتر شروط وزارة الصناعة الصيدلانية الذي يشترط سجلاً لحظياً لا يمكن تزويره لحرارة الشحنات.',
  ],
  keyPainPointsEn: [
    'Catastrophic pharmaceutical spoilage when reefer units fail silently on trans-Sahara logistics corridors.',
    'Exorbitant USD billing from foreign proprietary map APIs (Google Maps API costing thousands of USD/month).',
    'Sluggish telemetry performance (>120ms latency) using foreign-hosted legacy fleet tracking servers.',
    'Failure to comply with Ministry of Pharmaceutical Industry regulatory standards requiring immutable temperature audit logs.',
  ],
  technicalArchitectureAr: `توفر "أطلس لوجستيك" بنية متكاملة للتتبع فائق السرعة مع بديل سيادي كامل لخرائط Google Maps يدار محلياً في الجزائر:
1. استقبال قراءات الـ GPS والحرارة بزمن استجابة < 15ms: عبر توجيه BGP Anycast الموزع عبر 4 مناطق داخل التراب الوطني وربط مباشر بنقطة DZ-IX.
2. محرك الخرائط والملاحة السيادي المستضاف محلياً: تشغيل محرك Valhalla وOSRM مع خوادم بلاطات OpenStreetMap كاملة ومحدثة على كوبرنيتيس AKE، ما يلغي فواتير الدولار تماماً بنسبة 100%.
3. رصد فوري لتجاوز درجات الحرارة (Cold-Chain Breach Alerts): عند تجاوز درجة الحرارة +4°م أو +8°م، تطلق المنظومة تنبيهاً فورياً عبر بروتوكول WebSocket ورسائل SMS في أقل من 280 ميلي ثانية.
4. سجل تدقيق مشفر غير قابل للتعديل (WORM Audit Trail): حفظ قياسات الحرارة في أرشيف S3 متوافق مع متطلبات مفتشي وزارة الصحة والصيدلة.`,
  technicalArchitectureEn: `Atlas Logistiq integrates low-latency telemetry with a fully sovereign drop-in replacement for foreign mapping APIs:
1. Sub-15ms Ingress: Ingesting GPS coordinates and multi-point temperature sensors through 4-region BGP Anycast edge routing.
2. Self-Hosted Sovereign Map & Routing Engine: Deploying Valhalla/OSRM routing engines and vector tile servers on AKE Kubernetes, completely eliminating USD Google Maps API invoices.
3. Sub-280ms Cold-Chain Breach Interceptor: Instant automated SMS/push alerts dispatched whenever refrigeration slips past +2°C to +8°C boundaries.
4. Tamper-Proof Audit Vault: Archiving temperature records to S3 WORM storage, meeting national regulatory GMP inspection standards.`,
  architectureHighlightsAr: [
    'إلغاء فواتير الخرائط الأجنبية بنسبة 100% وتوفير آلاف الدولارات شهرياً.',
    'زمن استجابة < 15ms داخل الجزائر يمنح لوحة المراقبة تحديثاً سلساً كالمرآة.',
    'تنبيه فوري لخلل التبريد في أقل من 280ms لحماية شحنات الأدوية الحساسة.',
    'سجل تدقيق رسمي مشفر يضمن اجتياز عمليات التفتيش الصيدلاني بنجاح.',
  ],
  architectureHighlightsEn: [
    '100% elimination of USD Google Maps API invoices, saving millions of DZD.',
    'Sub-15ms domestic ping ensures real-time ultra-responsive fleet command displays.',
    'Sub-280ms fail-safe alerts preventing irreversible pharmaceutical spoilage.',
    'Audit-ready tamper-proof compliance logs for Ministry of Health audits.',
  ],
  postGisSnippet: `-- Atlas Logistiq: رصد انحراف درجات حرارة الشاحنات المبردة وحساب المسافة لأقرب مستودع
SELECT 
  t.truck_plate,
  t.driver_name,
  t.current_temp_celsius,
  t.target_temp_range,
  ROUND(ST_Distance(t.current_location, w.geom)::numeric / 1000, 2) AS distance_to_depot_km,
  w.warehouse_name,
  w.emergency_contact
FROM active_cold_trucks t
CROSS JOIN LATERAL (
  SELECT id, warehouse_name, geom, emergency_contact
  FROM sovereign_cold_warehouses
  ORDER BY t.current_location <-> geom
  LIMIT 1
) w
WHERE t.current_temp_celsius > 8.0 -- تجاوز الحد المسموح للأدوية المبردة
ORDER BY t.current_temp_celsius DESC;`,
  roiSummaryAr: 'توفير فوري يتجاوز 70% من ميزانية تتبع الأساطيل (عبر إيقاف فواتير خرائط Google Maps بالدولار)، مع ضمان نسبة 0% تلف للشحنات الدوائية والغذائية.',
  roiSummaryEn: 'Over 70% reduction in fleet telemetry budget by eliminating foreign USD map API charges, with a verified 0% pharmaceutical cargo spoilage rate.',
};

export const OUTREACH_EMAIL_TEMPLATES: OutreachEmail[] = [
  {
    id: 'outreach-agritech',
    targetVerticalAr: 'الشركات الزراعية الكبرى ومشاريع الحبوب والجنوب (بسكرة / وادي سوف / المنيعة)',
    targetVerticalEn: 'Agricultural Mega-farms & Desert Cereal Projects (Biskra / El Oued / El Menia)',
    recipientPersonaAr: 'المدير العام / مدير العمليات الفلاحية والري الذكي',
    recipientPersonaEn: 'General Manager / Head of Agricultural Operations & Smart Irrigation',
    subjectAr: 'خفض تكاليف مياه السقي ومراقبة مستشعرات مزارعكم عبر سحابة أطلس السيادية (عقدة ورقلة)',
    subjectEn: 'Reducing Irrigation Pumping Costs & Farm IoT Telemetry via AtlasCloud Sovereign Edge',
    bodyAr: `السلام عليكم ورحمة الله،
السيد [اسم المدير / المسؤول المحترم]،
مدير العمليات الفلاحية في [اسم الشركة / المستثمرة الفلاحية]،

نتابع باهتمام كبير ريادتكم في تطوير الإنتاج الفلاحي ومشاريع الرش المحوري الكبرى في ولاية [بسكرة / وادي سوف / المنيعة].

نعلم جيداً أن إدارة مزارع بهذا الحجم تواجه تحديات حقيقية:
1. انقطاع الاتصال المتكرر وضعف شبكة الإنترنت عند محاولة ربط المستشعرات بمواقع أو خوادم بعيدة.
2. الفواتير المرتفعة لاستهلاك الكهرباء والمازوت لمضخات الآبار العميقة نتيجة عدم دقة توقيت دورات الري.
3. التخوف من وضع خرائط وبيانات الإنتاج الحساسة على خوادم أجنبية غير مطابقة للقانون الجزائري 18-07.

يسرنا في AtlasCloud Sovereign (السحابة السيادية الوطنية) أن نضع بين أيديكم حل "Atlas Felaha" المخصص للجنوب الجزائري:
• معالجة محلية عبر عقدة ورقلة (Southern Edge POP): زمن استجابة أقل من 4ms ومقاومة كاملة لانقطاعات الإنترنت بفضل التخزين الطرفي الذكي.
• توفير ما بين 30% إلى 40% من مياه السقي وفاتورة الطاقة: عبر ربط مستشعرات الرطوبة بخوارزميات التحليل المكاني PostGIS لتشغيل المضخات فقط عند الحاجة الفعلية للمحصول.
• رصيد تجريبي مجاني بقيمة 150,000 دج: متاح لفريقكم التقني لاختبار النظام على قطاع تجريبي دون أي التزام مالي مسبق.

يسعدنا عقد لقاء عمل قصير (15 دقيقة عبر Zoom أو في مقركم) لاستعراض النموذج العملي وعرض عائد الاستثمار المالي المحقق على مزارع مماثلة.

مع خالص التحيات والتقدير،
[اسم المهندس / ممثل حلول أطلس كلاود]
مهندس الحلول القطاعية — AtlasCloud Sovereign
الهاتف: +213 23 XX XX XX
البريد: contact@atlascloud.dz | https://atlascloud.dz`,
    bodyEn: `Dear [Recipient Name],
Head of Agricultural Operations at [Farm / Agribusiness Name],

We have been closely following your leadership in expanding modern cereal pivot farming across [Biskra / El Oued / El Menia].

Managing mega-farm operations in the Sahara presents unique technical and operational friction:
1. Remote connectivity drops when streaming sensor metrics to distant European cloud servers.
2. High Sonelgaz electricity and diesel bills driven by unoptimized deep-well pivot pumping cycles.
3. Regulatory compliance concerns under Algerian Law 18-07 regarding strategic soil and crop data residency.

We engineered "Atlas Felaha" specifically to solve this for Algerian agribusinesses:
• Local Edge Ingestion via Ouargla POP (dz-south-1): Sub-4ms telemetry and autonomous offline buffering that survives desert backhaul disruptions.
• 30-40% Pumping Energy & Water Savings: Automated closed-loop pivot SCADA triggers driven by local PostGIS geospatial moisture thresholds.
• 150,000 DZD Complimentary Sandbox Credit: Pre-loaded for your engineering team to pilot telemetry across a trial pivot circle with zero upfront commitment.

We would welcome a 15-minute briefing this week to walk through our technical architecture and demonstrate verified ROI benchmarks.

Best regards,
[Your Name]
Principal Vertical Solutions Architect — AtlasCloud Sovereign
Direct: +213 23 XX XX XX | contact@atlascloud.dz | https://atlascloud.dz`,
  },
  {
    id: 'outreach-logistics',
    targetVerticalAr: 'شركات النقل والتوصيل المبرد وتوزيع الأدوية والأغذية (الأساطيل الوطنية)',
    targetVerticalEn: 'Pharmaceutical Distributors, Cold-Chain Freight & National Courier Fleets',
    recipientPersonaAr: 'مدير سلاسل الإمداد / مدير الأسطول واللوجستيك (Fleet & Supply Chain Director)',
    recipientPersonaEn: 'Director of Supply Chain, Logistics & National Fleet Management',
    subjectAr: 'حماية الشحنات المبردة وتخفيض 70% من تكاليف واجهات الخرائط عبر سحابة أطلس السيادية',
    subjectEn: 'Zero-Spoilage Cold Chain Telemetry & 70% Mapping API Cost Reduction via AtlasCloud',
    bodyAr: `السلام عليكم ورحمة الله،
السيد [اسم المسؤول المحترم]،
مدير اللوجستيك وسلاسل الإمداد في شركة [اسم شركة توزيع الأدوية / التبريد]،

تحية طيبة وبعد،

في قطاع حساس مثل توزيع الأدوية والمواد سريعة التلف، نعلم أن كل دقيقة تحسب، وأن ارتفاع درجة حرارة شاحنة واحدة في طريق صحراوي يعني خسارة شحنة بملايين الدنانير وفقدان ثقة الزبائن ومفتشي وزارة الصناعة الصيدلانية.

إضافة إلى ذلك، تعاني معظم شركات النقل والتتبع في الجزائر من:
1. الفواتير الشهرية الباهظة بالدولار لواجهات الخرائط الأجنبية (مثل Google Maps API) التي تستنزف ميزانية النقد الأجنبي.
2. زمن التأخير المرتفع للخوادم الأجنبية، ما يجعل حركة الشاحنات على الشاشة تتأخر بدقائق عن الواقع.
3. التنبيهات المتأخرة عند تعطل مبردات الشاحنات، والتي تصل غالباً بعد فوات الأوان.

نقدم لكم حل "Atlas Logistiq" المصمم والمستضاف بنسبة 100% داخل مراكز البيانات الموزعة للجزائر:
• بديل سيادي كامل لخرائط Google Maps: محرك ملاحة ورسم خرائط مستضاف محلياً على كوبرنيتيس AKE، يوفر أكثر من 70% من تكلفة الخرائط ويفوتر بالدينار الجزائري.
• تتبع لحظي بزمن استجابة أقل من 15ms: استعراض سلس ودقيق لحركة الشاحنات عبر ربط BGP Anycast المباشر بنقطة DZ-IX.
• نظام إنقاذ الشحنات المبردة (<280ms): تنبيهات فورية عبر الـ SMS والويب عند انحراف الحرارة عن النطاق القانوني (+2°م إلى +8°م) مع توجيه الشاحنة تلقائياً لأقرب مستودع تبريد.
• تقارير تدقيق رسمية جاهزة: لاستيفاء اشتراطات التفتيش الصيدلاني بضغطة زر واحدة.

نوفر لكم رصيداً تجريبياً فورياً بقيمة 150,000 دج لربط 10 شاحنات من أسطولكم مجاناً والتأكد من فاعلية النظام.

هل يناسبكم اتصال هاتفي أو اجتماع قصير هذا الأسبوع لمناقشة تفعيل التجربة لأسطولكم؟

دمتم بود،
[اسم المهندس / ممثل حلول أطلس كلاود]
مهندس الحلول اللوجستية — AtlasCloud Sovereign
الهاتف: +213 23 XX XX XX | contact@atlascloud.dz`,
    bodyEn: `Dear [Recipient Name],
Fleet & Supply Chain Director at [Pharma / Cold-Chain Logistics Company],

In pharmaceutical logistics, a silent refrigeration failure on an inter-wilaya freight corridor can result in millions of Dinars in ruined medicine and regulatory penalties.

Beyond spoilage risks, Algerian fleet managers routinely encounter two major operational bottlenecks:
1. High USD monthly invoices from foreign mapping APIs (Google Maps API) creating foreign currency friction.
2. High latency (>120ms) from foreign tracking servers, meaning fleet dispatchers are always seeing lagging positions.

We built "Atlas Logistiq" to deliver high-performance, cost-effective sovereign fleet telemetry:
• Self-Hosted Sovereign Map & Routing Engine: Fully hosted on Atlas Kubernetes Engine (AKE), cutting your external mapping costs by 70% billed 100% in local DZD.
• Ultra-Low Latency (<15ms): Direct DZ-IX domestic peering gives dispatchers real-time vehicle positioning with zero lag.
• Sub-280ms Cold-Chain Breach Intervention: Automated SMS/webhook dispatch the millisecond reefer temperatures breach regulatory bounds (+2°C to +8°C).
• Regulatory Audit Vault: Instant tamper-proof historical temperature compliance export for Ministry of Pharmaceutical Industry audits.

We have provisioned a 150,000 DZD free sandbox grant for your engineering team to pilot 10 test vehicles with zero upfront cost.

Could we schedule a brief 15-minute introductory call this week to review the architecture?

Best regards,
[Your Name]
Logistics Solutions Architect — AtlasCloud Sovereign
Direct: +213 23 XX XX XX | contact@atlascloud.dz | https://atlascloud.dz`,
  },
];
