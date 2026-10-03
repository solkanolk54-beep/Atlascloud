export type Language = 'ar' | 'en';

export interface CloudRegion {
  id: string;
  name: string;
  nameAr: string;
  code: string;
  role: 'primary' | 'secondary' | 'dr' | 'edge';
  roleLabelAr: string;
  roleLabelEn: string;
  location: string;
  locationAr: string;
  coordinates: { x: number; y: number }; // percentage on map
  availabilityZones: string[];
  latencyToAlgiers: number; // in ms
  capacity: {
    cpuCores: number;
    ramTB: number;
    storagePB: number;
  };
  interconnects: string[];
  status: 'nominal' | 'degraded' | 'offline';
  specializationAr: string;
  specializationEn: string;
}

export interface FailoverEvent {
  timestamp: string;
  messageAr: string;
  messageEn: string;
  type: 'info' | 'warning' | 'alert' | 'success';
}

export interface CompetitorComparisonItem {
  dimension: string;
  dimensionAr: string;
  oneCloudDz: string;
  oneCloudDzAr: string;
  atlasSovereign: string;
  atlasSovereignAr: string;
  architecturalImpactAr: string;
  architecturalImpactEn: string;
  status: 'critical_gap' | 'moderate' | 'parity' | 'advantage';
}

export interface TechStackLayer {
  id: string;
  title: string;
  titleAr: string;
  category: string;
  categoryAr: string;
  primaryTech: string;
  alternativesEvaluated: string[];
  whyChosenAr: string;
  whyChosenEn: string;
  tradeoffsAr: string;
  tradeoffsEn: string;
  keyFeatures: string[];
  keyFeaturesAr: string[];
}

export interface CliCommand {
  command: string;
  descriptionAr: string;
  descriptionEn: string;
  output: string;
}

export interface ComplianceChecklistItem {
  id: string;
  domain: 'iso27001' | 'arpce' | 'anpdp_1807' | 'bank_of_algeria' | 'pci_dss';
  domainLabelAr: string;
  domainLabelEn: string;
  controlId: string;
  titleAr: string;
  titleEn: string;
  requirementAr: string;
  requirementEn: string;
  competitorStatus: 'en_cours' | 'partial' | 'absent' | 'compliant';
  competitorStatusTextAr: string;
  competitorStatusTextEn: string;
  ourStatus: 'fully_certified' | 'automated_continuous';
  ourProofAr: string;
  ourProofEn: string;
  bankAuditImpactAr: string;
  bankAuditImpactEn: string;
  criticality: 'critical_blocker' | 'high' | 'medium';
}

export interface CompetitorRiskItem {
  id: string;
  category: string;
  categoryAr: string;
  vulnerabilityTitleAr: string;
  vulnerabilityTitleEn: string;
  competitorGapAr: string;
  competitorGapEn: string;
  dangerToEnterpriseAr: string;
  dangerToEnterpriseEn: string;
  ourSovereignSolutionAr: string;
  ourSovereignSolutionEn: string;
  salesKillPitchAr: string;
  salesKillPitchEn: string;
}

export interface GtmStrategyTier {
  id: string;
  segmentNameAr: string;
  segmentNameEn: string;
  targetClientsAr: string;
  targetClientsEn: string;
  corePainPointAr: string;
  corePainPointEn: string;
  winningPropositionAr: string;
  winningPropositionEn: string;
  commercialPricingAr: string;
  commercialPricingEn: string;
  conversionBaitAr: string;
  conversionBaitEn: string;
  tacticalAngleAr: string;
  tacticalAngleEn: string;
}

export interface CmoPricingPackage {
  id: string;
  nameAr: string;
  nameEn: string;
  taglineAr: string;
  taglineEn: string;
  targetAudienceAr: string;
  targetAudienceEn: string;
  creditsDzd: number;
  creditsFormattedDzd: string;
  supportLevelAr: string;
  supportLevelEn: string;
  featuresAr: string[];
  featuresEn: string[];
  highlighted: boolean;
  ctaTextAr: string;
  ctaTextEn: string;
}

export interface DeveloperCampaignPillar {
  id: string;
  titleAr: string;
  titleEn: string;
  channelAr: string;
  channelEn: string;
  descriptionAr: string;
  descriptionEn: string;
  tacticalExecutionAr: string;
  tacticalExecutionEn: string;
  kpiMetricAr: string;
  kpiMetricEn: string;
}

export interface VerticalSolution {
  id: string;
  verticalNameAr: string;
  verticalNameEn: string;
  subtitleAr: string;
  subtitleEn: string;
  regionsInvolvedAr: string;
  regionsInvolvedEn: string;
  problemStatementAr: string;
  problemStatementEn: string;
  sovereignTechStackAr: string;
  sovereignTechStackEn: string;
  referenceCustomerTypeAr: string;
  referenceCustomerTypeEn: string;
  businessValueAr: string;
  businessValueEn: string;
}

export interface CompetitorScenario {
  id: string;
  nameAr: string;
  nameEn: string;
  timeHorizon: string;
  probability: 'High' | 'Medium' | 'Low';
  probabilityLabelAr: string;
  strategicIntentAr: string;
  strategicIntentEn: string;
  hyperscalerTargets: string[];
  competitorWeaknessAr: string;
  competitorWeaknessEn: string;
  preemptiveNeutralizationAr: string;
  preemptiveNeutralizationEn: string;
}

export interface NichePreemptionPlay {
  id: string;
  nicheNameAr: string;
  nicheNameEn: string;
  strategicImportanceAr: string;
  strategicImportanceEn: string;
  targetAccounts: string[];
  defensiveMoatAr: string;
  defensiveMoatEn: string;
  offensiveStrikeAr: string;
  offensiveStrikeEn: string;
  competitorBarrierAr: string;
  competitorBarrierEn: string;
}
