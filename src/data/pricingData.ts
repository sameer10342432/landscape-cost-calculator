import { ProjectTypeOption, MaterialOption } from '../types';

export const REGIONAL_FACTORS: Record<string, { name: string; multiplier: number; laborRate: number }> = {
  national: { name: 'US National Average', multiplier: 1.0, laborRate: 55 },
  northeast: { name: 'Northeast (NY, MA, PA, NJ)', multiplier: 1.18, laborRate: 65 },
  westCoast: { name: 'West Coast (CA, WA, OR)', multiplier: 1.25, laborRate: 70 },
  midwest: { name: 'Midwest (IL, OH, MI, MN)', multiplier: 0.95, laborRate: 50 },
  south: { name: 'South / Southeast (FL, TX, NC, GA)', multiplier: 0.92, laborRate: 48 },
  mountain: { name: 'Mountain West (CO, UT, AZ, NV)', multiplier: 1.05, laborRate: 58 },
};

export const PROJECT_TYPES: ProjectTypeOption[] = [
  {
    id: 'basic-landscaping',
    name: 'Basic Landscaping',
    category: 'softscape',
    description: 'Bed edging, basic weed barrier, top dressing mulch, and light cleanup.',
    baseMaterialRatePerSqFt: 1.75,
    defaultLaborHoursPer100SqFt: 1.8,
    typicalCostPerSqFt: [4, 10],
  },
  {
    id: 'lawn-installation',
    name: 'Lawn Installation (Sod)',
    category: 'softscape',
    description: 'Ground preparation, soil grading, fresh turf sod installation, and initial rolling.',
    baseMaterialRatePerSqFt: 1.20,
    defaultLaborHoursPer100SqFt: 1.5,
    typicalCostPerSqFt: [1.5, 3.5],
  },
  {
    id: 'lawn-replacement',
    name: 'Lawn Replacement',
    category: 'softscape',
    description: 'Old turf removal, grading, topsoil replenishment, and new sod laying.',
    baseMaterialRatePerSqFt: 1.45,
    defaultLaborHoursPer100SqFt: 2.2,
    typicalCostPerSqFt: [2.5, 5.0],
  },
  {
    id: 'garden-landscaping',
    name: 'Garden Landscaping & Plantings',
    category: 'softscape',
    description: 'Rich compost soil beds, perennial flowers, flowering shrubs, and bark mulch.',
    baseMaterialRatePerSqFt: 4.50,
    defaultLaborHoursPer100SqFt: 3.5,
    typicalCostPerSqFt: [8, 20],
  },
  {
    id: 'mulching',
    name: 'Mulching Only',
    category: 'softscape',
    description: 'Premium organic shredded hardwood or bark mulch spread to 3-inch depth.',
    baseMaterialRatePerSqFt: 0.75,
    defaultLaborHoursPer100SqFt: 0.9,
    typicalCostPerSqFt: [0.85, 2.25],
  },
  {
    id: 'rock-landscaping',
    name: 'Rock / River Rock Landscaping',
    category: 'hardscape',
    description: 'Heavy weed fabric, commercial edging, and 2-3 inch river rock bedding.',
    baseMaterialRatePerSqFt: 2.50,
    defaultLaborHoursPer100SqFt: 2.0,
    typicalCostPerSqFt: [4, 9],
  },
  {
    id: 'gravel-landscaping',
    name: 'Gravel Landscaping & Walkways',
    category: 'hardscape',
    description: 'Crushed gravel, pea gravel, or decomposed granite with compacted base.',
    baseMaterialRatePerSqFt: 1.80,
    defaultLaborHoursPer100SqFt: 1.6,
    typicalCostPerSqFt: [3, 7],
  },
  {
    id: 'paver-installation',
    name: 'Paver Installation / Walkway',
    category: 'hardscape',
    description: 'Excavation, compacted road base, bedding sand, pavers, and polymeric sand.',
    baseMaterialRatePerSqFt: 7.50,
    defaultLaborHoursPer100SqFt: 5.5,
    typicalCostPerSqFt: [14, 28],
  },
  {
    id: 'patio',
    name: 'Patio Construction',
    category: 'hardscape',
    description: 'Complete stone or concrete interlocking paver patio with edge restraints.',
    baseMaterialRatePerSqFt: 9.00,
    defaultLaborHoursPer100SqFt: 6.0,
    typicalCostPerSqFt: [16, 32],
  },
  {
    id: 'retaining-wall',
    name: 'Retaining Wall Construction',
    category: 'hardscape',
    description: 'Trench footing, gravel drain backfill, drain tile pipe, and stacked wall blocks.',
    baseMaterialRatePerSqFt: 15.00,
    defaultLaborHoursPer100SqFt: 8.0,
    typicalCostPerSqFt: [25, 55],
  },
  {
    id: 'tree-planting',
    name: 'Tree Planting & Softscaping',
    category: 'softscape',
    description: 'Excavating rootball pits, soil amendments, staking, watering ring, and mulch.',
    baseMaterialRatePerSqFt: 6.00,
    defaultLaborHoursPer100SqFt: 4.0,
    typicalCostPerSqFt: [10, 30],
  },
  {
    id: 'full-backyard',
    name: 'Full Backyard Landscaping',
    category: 'full',
    description: 'Combined turf, paver patio, planting beds, irrigation zone, and low-voltage lighting.',
    baseMaterialRatePerSqFt: 12.00,
    defaultLaborHoursPer100SqFt: 7.5,
    typicalCostPerSqFt: [20, 45],
  },
  {
    id: 'custom-project',
    name: 'Custom Project',
    category: 'full',
    description: 'Tailored blend of softscape and hardscape with customized parameters.',
    baseMaterialRatePerSqFt: 5.00,
    defaultLaborHoursPer100SqFt: 4.0,
    typicalCostPerSqFt: [8, 25],
  },
];

export const MATERIALS_CATALOG: MaterialOption[] = [
  {
    id: 'shredded-mulch',
    name: 'Hardwood Shredded Mulch',
    unit: 'cu yd',
    defaultRate: 45,
    coveragePerUnitSqFt: 108, // at 3 inches depth
    category: 'mulch',
    description: 'Standard 3-inch depth coverage, weed suppression, moisture retention.',
  },
  {
    id: 'cedar-mulch',
    name: 'Cedar / Bark Mulch',
    unit: 'cu yd',
    defaultRate: 58,
    coveragePerUnitSqFt: 108,
    category: 'mulch',
    description: 'Aromatic, long-lasting insect-repelling natural cedar bark.',
  },
  {
    id: 'screened-topsoil',
    name: 'Screened Topsoil',
    unit: 'cu yd',
    defaultRate: 40,
    coveragePerUnitSqFt: 81, // at 4 inches
    category: 'soil',
    description: 'Rich organic loam for grading, turf leveling, and planting beds.',
  },
  {
    id: 'mushroom-compost',
    name: 'Organic Garden Compost',
    unit: 'cu yd',
    defaultRate: 52,
    coveragePerUnitSqFt: 162, // at 2 inches
    category: 'soil',
    description: 'Nutrient-dense organic soil conditioning blend.',
  },
  {
    id: 'crushed-gravel',
    name: 'Crushed Base Gravel (#57 / 3/4-inch)',
    unit: 'ton',
    defaultRate: 48,
    coveragePerUnitSqFt: 100, // at 2 inches
    category: 'stone',
    description: 'Angular crushed limestone or granite for solid sub-base drainage.',
  },
  {
    id: 'river-rock',
    name: 'Decorative River Rock (1-3 inch)',
    unit: 'ton',
    defaultRate: 95,
    coveragePerUnitSqFt: 90, // at 2.5 inches
    category: 'stone',
    description: 'Smooth rounded natural river stone for zero-maintenance rock beds.',
  },
  {
    id: 'pea-gravel',
    name: 'Pea Gravel (3/8 inch)',
    unit: 'ton',
    defaultRate: 65,
    coveragePerUnitSqFt: 110,
    category: 'stone',
    description: 'Small rounded stones ideal for walkways, patios, and fire pit areas.',
  },
  {
    id: 'concrete-pavers',
    name: 'Interlocking Concrete Pavers',
    unit: 'sq ft',
    defaultRate: 4.80,
    coveragePerUnitSqFt: 1,
    category: 'masonry',
    description: 'Standard architectural pavers for patios and walkways.',
  },
  {
    id: 'natural-flagstone',
    name: 'Natural Flagstone / Slate',
    unit: 'sq ft',
    defaultRate: 11.50,
    coveragePerUnitSqFt: 1,
    category: 'masonry',
    description: 'Irregular or dimensional natural quarried stone.',
  },
  {
    id: 'retaining-blocks',
    name: 'Modular Retaining Wall Blocks',
    unit: 'sq ft face',
    defaultRate: 14.00,
    coveragePerUnitSqFt: 1,
    category: 'masonry',
    description: 'Engineered segmented lip-locking retaining wall stone.',
  },
  {
    id: 'sod-rolls',
    name: 'Cultivated Turf Sod (Kentucky Blue / Fescue / Bermuda)',
    unit: 'sq ft',
    defaultRate: 0.70,
    coveragePerUnitSqFt: 1,
    category: 'turf',
    description: 'Farm-fresh harvested rolls ready for immediate rooting.',
  },
  {
    id: 'premium-seed',
    name: 'Premium Grass Seed & Starter Fertilizer',
    unit: '1,000 sq ft',
    defaultRate: 35.00,
    coveragePerUnitSqFt: 1000,
    category: 'turf',
    description: 'Hydroseed or broadcast drought-tolerant lawn seed mix.',
  },
  {
    id: 'perennial-shrubs',
    name: 'Assorted Shrubs & Flowering Perennials (1-3 Gal)',
    unit: 'plant',
    defaultRate: 28.00,
    coveragePerUnitSqFt: 25,
    category: 'plant',
    description: 'Hardy ornamental nursery shrubs and perennial plants.',
  },
  {
    id: 'ornamental-trees',
    name: 'Specimen Trees (15-Gal / 2-inch caliper)',
    unit: 'tree',
    defaultRate: 220.00,
    coveragePerUnitSqFt: 250,
    category: 'plant',
    description: 'Healthy containerized or balled-and-burlapped landscape trees.',
  },
];

// ==========================================
// UNIT CONVERSION CONSTANTS & UTILITIES
// ==========================================
export const METERS_TO_FEET = 3.28084;
export const FEET_TO_METERS = 1 / 3.28084;
export const SQ_METERS_TO_SQ_FT = 10.7639;
export const SQ_FT_TO_SQ_METERS = 1 / 10.7639;
export const CU_METERS_TO_CU_FEET = 35.3147;
export const CU_FEET_TO_CU_METERS = 1 / 35.3147;
export const CU_YARDS_TO_CU_METERS = 0.764555;
export const CU_METERS_TO_CU_YARDS = 1.30795; // 1 / 0.764555

export function sqFtToSqMeters(sqFt: number): number {
  return sqFt * SQ_FT_TO_SQ_METERS;
}

export function sqMetersToSqFt(sqM: number): number {
  return sqM * SQ_METERS_TO_SQ_FT;
}

export function metersToFeet(meters: number): number {
  return meters * METERS_TO_FEET;
}

export function feetToMeters(feet: number): number {
  return feet * FEET_TO_METERS;
}

export function cuYardsToCuMeters(cuYds: number): number {
  return cuYds * CU_YARDS_TO_CU_METERS;
}

export function cuMetersToCuYards(cuM: number): number {
  return cuM * CU_METERS_TO_CU_YARDS;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.round(amount));
}

// ==========================================
// CENTRALIZED SUPPORTING CALCULATOR PRICING
// ==========================================

// 1. MULCH PRICING & SPECIFICATIONS
export interface MulchRate {
  name: string;
  bulkYdPrice: number;
  bag2cuPrice: number;
}

export const MULCH_RATES: Record<string, MulchRate> = {
  hardwood: { name: 'Shredded Hardwood Bark', bulkYdPrice: 42, bag2cuPrice: 4.25 },
  black: { name: 'Black Dyed Hardwood', bulkYdPrice: 46, bag2cuPrice: 4.75 },
  cedar: { name: 'Natural Western Red Cedar', bulkYdPrice: 58, bag2cuPrice: 5.95 },
  pine: { name: 'Pine Bark Nuggets', bulkYdPrice: 48, bag2cuPrice: 4.80 },
  cypress: { name: 'Cypress Blend', bulkYdPrice: 52, bag2cuPrice: 5.10 },
};

export const MULCH_FEES = {
  deliveryFee: 85,
  spreadingLaborPerCuYd: 45,
};

// 2. PAVER PRICING & SPECIFICATIONS
export interface PaverPreset {
  name: string;
  lengthIn: number;
  widthIn: number;
  defaultPrice: number;
}

export const PAVER_PRESETS: Record<string, PaverPreset> = {
  '4x8': { name: 'Standard Brick (4" × 8")', lengthIn: 4, widthIn: 8, defaultPrice: 1.85 },
  '6x6': { name: 'Square Cobble (6" × 6")', lengthIn: 6, widthIn: 6, defaultPrice: 2.10 },
  '6x9': { name: 'Holland Stone (6" × 9")', lengthIn: 6, widthIn: 9, defaultPrice: 2.75 },
  '12x12': { name: 'Large Format (12" × 12")', lengthIn: 12, widthIn: 12, defaultPrice: 4.80 },
  '16x16': { name: 'Stepping Slab (16" × 16")', lengthIn: 16, widthIn: 16, defaultPrice: 7.50 },
  custom: { name: 'Custom Dimensions', lengthIn: 4, widthIn: 8, defaultPrice: 2.50 },
};

export const PAVER_FEES = {
  gravelPerTon: 45,
  sandPerTon: 42,
  polymericSandPerBag: 28,
  turnkeyInstalledRatePerSqFt: 18.5,
};

// 3. PATIO PRICING & SPECIFICATIONS
export interface PatioMaterialRate {
  name: string;
  matCostSqFt: number;
  laborCostSqFt: number;
  description: string;
}

export const PATIO_MATERIALS: Record<string, PatioMaterialRate> = {
  concrete: {
    name: 'Basic Poured Concrete (Broom Finish)',
    matCostSqFt: 3.5,
    laborCostSqFt: 6.0,
    description: 'Durable, clean, economical slab suitable for casual seating.',
  },
  stamped: {
    name: 'Stamped & Colored Decorative Concrete',
    matCostSqFt: 5.5,
    laborCostSqFt: 10.5,
    description: 'Patterned concrete textured to mimic natural slate or stone.',
  },
  pavers: {
    name: 'Interlocking Concrete Pavers',
    matCostSqFt: 6.8,
    laborCostSqFt: 12.5,
    description: 'Industry favorite with lifetime warranty, flexible joints, and no cracking.',
  },
  flagstone: {
    name: 'Natural Quarried Flagstone / Bluestone',
    matCostSqFt: 12.0,
    laborCostSqFt: 18.0,
    description: 'Luxurious natural stone slabs with unique organic textures and colors.',
  },
  peaGravel: {
    name: 'Pea Gravel / Decomposed Granite with Edging',
    matCostSqFt: 2.2,
    laborCostSqFt: 4.8,
    description: 'Rustic European permeable gravel terrace with metal border edging.',
  },
};

export const PATIO_FEES = {
  excavationPrepRatePerSqFt: 2.5,
  oldRemovalRatePerSqFt: 3.5,
  sealantRatePerSqFt: 0.95,
};

// 4. RETAINING WALL PRICING & SPECIFICATIONS
export interface RetainingWallMaterialRate {
  name: string;
  blockRateSqFt: number;
  laborRateSqFt: number;
  desc: string;
}

export const WALL_MATERIALS: Record<string, RetainingWallMaterialRate> = {
  'concrete-blocks': {
    name: 'Interlocking Segmental Concrete Blocks (Allan Block / Versa-Lok)',
    blockRateSqFt: 14.5,
    laborRateSqFt: 18.0,
    desc: 'Engineered rear lip locking system. Maximum durability for terraces and driveways.',
  },
  timber: {
    name: 'Pressure-Treated 6x6 Timber Sleepers',
    blockRateSqFt: 9.5,
    laborRateSqFt: 14.0,
    desc: 'Rustic wood wall with deadman tie-backs. 15-20 year lifespan.',
  },
  'natural-stone': {
    name: 'Dry-Stacked Natural Fieldstone / Granite Boulders',
    blockRateSqFt: 24.0,
    laborRateSqFt: 28.0,
    desc: 'High-end artisanal stonework. Timeless aesthetic and permanent strength.',
  },
  'cinder-stucco': {
    name: 'Poured Concrete Cinder Block with Stucco Finish',
    blockRateSqFt: 16.0,
    laborRateSqFt: 22.0,
    desc: 'Modern architectural smooth finish with rebar and core fill concrete.',
  },
};

export const WALL_FEES = {
  baseGravelCostPerCuYd: 55,
  trenchLaborPerLinearFt: 8,
  drainageGravelPerCuYd: 50,
  drainPipePerLinearFt: 4.5,
};

// 5. TREE PLANTING PRICING & SPECIFICATIONS
export interface TreeSizeRate {
  name: string;
  treePrice: number;
  laborHours: number;
  desc: string;
}

export const TREE_SIZES: Record<string, TreeSizeRate> = {
  '5gal': { name: '5-Gallon Container (4-6 ft tall)', treePrice: 55, laborHours: 0.8, desc: 'Small starter tree, easy to handle, rapid root establishment.' },
  '15gal': { name: '15-Gallon Container (7-10 ft tall)', treePrice: 145, laborHours: 1.5, desc: 'Most popular residential size. Immediate curb presence.' },
  '24box': { name: '24-Inch Box / 2" Caliper B&B (10-14 ft tall)', treePrice: 320, laborHours: 3.0, desc: 'Substantial shade tree requiring 2-man crew or machinery.' },
  '36box': { name: '36-Inch Box / 3.5" Caliper Specimen (14-18 ft)', treePrice: 850, laborHours: 6.0, desc: 'Mature specimen shade tree requiring crane or skid-steer.' },
};

export const TREE_FEES = {
  plantingLaborHourlyRate: 55,
  soilCompostPerTree: 22,
  stakingKitPerTree: 18,
  deliveryStandard: 65,
  deliveryHeavy: 120,
};

// 6. LANDSCAPE DESIGN PRICING & DELIVERABLES
export interface DesignTierRate {
  name: string;
  baseFee: number;
  perSqFtRate: number;
  desc: string;
}

export const DESIGN_TIERS: Record<string, DesignTierRate> = {
  concept: {
    name: 'Conceptual Sketch & Mood Board',
    baseFee: 450,
    perSqFtRate: 0.08,
    desc: 'High-level spatial layout, zoning ideas, and photographic plant palette ideas.',
  },
  master2d: {
    name: 'Full 2D Master CAD Landscape Plan',
    baseFee: 1200,
    perSqFtRate: 0.18,
    desc: 'Scaled blueprint with exact plant species, hardscape dimensions, lighting zones & callouts.',
  },
  luxury3d: {
    name: 'Architectural 3D Virtual Walkthrough',
    baseFee: 2400,
    perSqFtRate: 0.30,
    desc: 'Photorealistic daylight & nighttime rendering, video fly-through, and precise grading.',
  },
};

export const DESIGN_FEES = {
  siteConsultationFee: 195,
  renderings3dAddon: 650,
  permitPlansAddon: 750,
};

// 7. SQUARE FOOT TIER MATRIX
export interface SqFtTier {
  id: string;
  name: string;
  rangePerSqFt: [number, number];
  typicalPerSqFt: number;
  features: string[];
  idealFor: string;
}

export const SQFT_TIERS: SqFtTier[] = [
  {
    id: 'basic',
    name: 'Tier 1: Basic Softscaping & Lawn',
    rangePerSqFt: [2.5, 6.0],
    typicalPerSqFt: 4.25,
    features: [
      'Grading and fresh sod installation or hydroseed',
      '2-3" premium hardwood bark mulching',
      'Spade edging along planting perimeters',
      'Basic starter perennial shrubs and groundcover',
    ],
    idealFor: 'New construction lawn starts, property freshening, rental cleanups.',
  },
  {
    id: 'mid',
    name: 'Tier 2: Mixed Landscaping & Plantings',
    rangePerSqFt: [8.0, 18.0],
    typicalPerSqFt: 13.5,
    features: [
      'Rich compost bed preparation and weed fabric',
      'Decorative river rock or cedar mulch beds',
      '15-gallon specimen shade and ornamental trees',
      'Drip irrigation zones and low-voltage accent lighting',
      'Gravel or stepping stone pathways',
    ],
    idealFor: 'Front yard curb appeal upgrades and charming backyard retreats.',
  },
  {
    id: 'luxury',
    name: 'Tier 3: Hardscaping & Outdoor Living',
    rangePerSqFt: [22.0, 50.0],
    typicalPerSqFt: 34.0,
    features: [
      'Interlocking concrete paver patio or natural flagstone',
      'Engineered retaining walls or seat walls',
      'Built-in fire pit with gas or wood burning kit',
      'Perimeter privacy hedges and commercial border edging',
      'Full multi-zone automated smart irrigation',
    ],
    idealFor: 'Comprehensive entertainer backyards and luxury outdoor living rooms.',
  },
];
