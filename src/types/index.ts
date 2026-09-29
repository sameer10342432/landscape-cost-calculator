export type UnitSystem = 'us' | 'metric';

export interface ProjectTypeOption {
  id: string;
  name: string;
  category: 'softscape' | 'hardscape' | 'full';
  description: string;
  baseMaterialRatePerSqFt: number;
  defaultLaborHoursPer100SqFt: number;
  typicalCostPerSqFt: [number, number];
}

export interface MaterialOption {
  id: string;
  name: string;
  unit: string;
  defaultRate: number;
  coveragePerUnitSqFt: number; // at standard depth
  category: 'mulch' | 'soil' | 'stone' | 'masonry' | 'plant' | 'turf';
  description: string;
}

export interface EstimateResult {
  materialCost: number;
  laborCost: number;
  additionalCost: number;
  totalEstimate: number;
  costPerSqFt: number;
  lowEstimate: number;
  highEstimate: number;
  areaSqFt: number;
  contractorMarginAmount: number;
  items: Array<{
    name: string;
    quantity: string;
    unitPrice: string;
    total: number;
  }>;
}

export interface SEOMetadata {
  path: string;
  canonicalPath?: string;
  primaryKeyword: string;
  secondaryKeywords: string[];
  searchIntent: 'Tool/Utility' | 'Informational' | 'Commercial' | 'Transactional';
  metaTitle: string;
  metaDescription: string;
  h1: string;
  summary: string;
  relatedCalculators: string[];
  relatedGuides: string[];
  schemaType: 'WebApplication' | 'Article' | 'FAQPage' | 'WebPage';
  faqs?: Array<{ question: string; answer: string }>;
}
