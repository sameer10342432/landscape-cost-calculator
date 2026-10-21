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

export type ProjectComponentType =
  | 'lawn'
  | 'mulch'
  | 'paver'
  | 'patio'
  | 'wall'
  | 'plants'
  | 'trees';

export interface ComponentMaterialDetail {
  name: string;
  quantity: number;
  unit: string;
  category: 'aggregate' | 'turf' | 'mulch' | 'masonry' | 'plant' | 'hardscape' | 'supplies';
  cost: number;
  notes?: string;
}

export interface ProjectComponentItem {
  id: string;
  type: ProjectComponentType;
  title: string;
  // Dimensions & Quantities
  length?: number;
  width?: number;
  area?: number;
  depth?: number;
  height?: number;
  quantity?: number;
  // Configuration options
  selectedOption: string;
  wasteFactorPercent: number;
  includeLabor: boolean;
  customRate?: number;
  // Calculated results
  calculatedSqFt: number;
  displayArea: number;
  materialCost: number;
  laborCost: number;
  laborHours: number;
  subtotal: number;
  materials: ComponentMaterialDetail[];
}

export interface ProjectExtraCosts {
  siteExcavation: boolean;
  excavationRatePerSqFt: number;
  deliveryFee: number;
  debrisDisposal: number;
  equipmentRental: number;
  taxPercent: number;
  permitFee: number;
}

export interface SavedProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  unitSystem: UnitSystem;
  targetBudget: number;
  zipCode: string;
  selectedRegion: string;
  regionalMultiplier: number;
  components: ProjectComponentItem[];
  extraCosts: ProjectExtraCosts;
  totalCost: number;
  checklistProgress?: Record<string, boolean>;
}
