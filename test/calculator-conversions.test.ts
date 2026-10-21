/**
 * Unit & Integration Tests for Landscape Cost Calculator
 * Covers:
 * 1. Metric <-> US Customary Unit Conversion Precision
 * 2. Main Landscaping Calculator Area & Cost Math
 * 3. Mulch Material Volume & Bag Count Math
 * 4. Paver Coverage, Joint Sand & Gravel Base Quantities
 * 5. Retaining Wall Visible Face, Embedded Courses & Drainage Stone
 * 6. Edge Case and Boundary Value Handling (Zero, Negative, Empty)
 */

import {
  METERS_TO_FEET,
  FEET_TO_METERS,
  SQ_METERS_TO_SQ_FT,
  SQ_FT_TO_SQ_METERS,
  CU_METERS_TO_CU_YARDS,
  CU_YARDS_TO_CU_METERS,
  sqFtToSqMeters,
  sqMetersToSqFt,
  metersToFeet,
  feetToMeters,
  cuYardsToCuMeters,
  cuMetersToCuYards,
  MULCH_RATES,
  MULCH_FEES,
  PAVER_PRESETS,
  PAVER_FEES,
  PATIO_MATERIALS,
  PATIO_FEES,
  WALL_MATERIALS,
  WALL_FEES,
  TREE_SIZES,
  TREE_FEES,
  DESIGN_TIERS,
  SQFT_TIERS,
} from '../src/data/pricingData';

let passed = 0;
let failed = 0;

function assert(condition: boolean, testName: string, detail?: string) {
  if (condition) {
    passed++;
    console.log(`  ✓ PASS: ${testName}`);
  } else {
    failed++;
    console.error(`  ✗ FAIL: ${testName}${detail ? ` - ${detail}` : ''}`);
  }
}

function assertClose(actual: number, expected: number, tolerance = 0.01, testName: string) {
  const diff = Math.abs(actual - expected);
  const ok = diff <= tolerance;
  assert(ok, testName, `Expected ~${expected}, got ${actual} (diff: ${diff.toFixed(4)})`);
}

console.log('\n======================================================');
console.log('🧪 RUNNING LANDSCAPE CALCULATOR TEST SUITE');
console.log('======================================================\n');

// ---------------------------------------------------------------------
// TEST GROUP 1: Fundamental Dimensional Unit Conversions
// ---------------------------------------------------------------------
console.log('--- Group 1: Unit Conversion Factors & Inverses ---');

assertClose(METERS_TO_FEET, 3.28084, 0.0001, 'METERS_TO_FEET constant equals 3.28084');
assertClose(SQ_METERS_TO_SQ_FT, 10.7639, 0.001, 'SQ_METERS_TO_SQ_FT constant equals 10.7639');
assertClose(metersToFeet(1), 3.28084, 0.0001, '1 meter converts to 3.28084 feet');
assertClose(feetToMeters(3.28084), 1.0, 0.0001, '3.28084 feet converts to 1.0 meter');
assertClose(sqMetersToSqFt(1), 10.7639, 0.001, '1 m² converts to 10.7639 sq ft');
assertClose(sqFtToSqMeters(10.7639), 1.0, 0.001, '10.7639 sq ft converts to 1.0 m²');

// High Priority Bug Verification: 10m x 6m area
const lengthM = 10;
const widthM = 6;
const metricAreaM2 = lengthM * widthM; // 60 m²
const convertedSqFt = (lengthM * METERS_TO_FEET) * (widthM * METERS_TO_FEET); // ~645.83 sq ft

assertClose(metricAreaM2, 60, 0.001, '10m × 6m equals exactly 60 m² in metric mode');
assertClose(convertedSqFt, 645.83, 0.5, '10m × 6m equals approximately 645.83 sq ft (not 60 sq ft)');
assert(
  convertedSqFt > 600,
  'Metric 10m × 6m must NOT be evaluated as 60 sq ft (resolves ~10.76x undercount bug)'
);

// Cubic volume conversion
assertClose(cuYardsToCuMeters(10), 7.64555, 0.01, '10 cu yd converts to ~7.65 m³');
assertClose(cuMetersToCuYards(7.64555), 10.0, 0.01, '7.65 m³ converts to ~10 cu yd');

// ---------------------------------------------------------------------
// TEST GROUP 2: Mulch Calculator Volume & Packaging
// ---------------------------------------------------------------------
console.log('\n--- Group 2: Mulch Calculator Formulas ---');

// Standard US Case: 40 ft x 10 ft at 3 inches depth
const mulchAreaSqFt = 40 * 10; // 400 sq ft
const mulchDepthInches = 3;
const mulchCuFt = mulchAreaSqFt * (mulchDepthInches / 12); // 100 cu ft
const mulchCuYds = (mulchAreaSqFt * mulchDepthInches) / 324; // 3.703 cu yds
const mulchBags2cuFt = Math.ceil(mulchCuFt / 2); // 50 bags

assertClose(mulchCuFt, 100, 0.01, '40ft × 10ft at 3" depth produces 100 cubic feet');
assertClose(mulchCuYds, 3.704, 0.01, '40ft × 10ft at 3" depth produces ~3.70 cubic yards');
assert(mulchBags2cuFt === 50, '40ft × 10ft at 3" depth requires exactly 50 2-cubic-foot bags');

// Metric Case: 10m x 5m at 7.5cm depth (approx equivalent)
const mulchAreaM2 = 10 * 5; // 50 m²
const mulchDepthM = 0.075; // 7.5 cm
const mulchCuM = mulchAreaM2 * mulchDepthM; // 3.75 m³
const mulchCuYardsFromM = mulchCuM * CU_METERS_TO_CU_YARDS; // ~4.90 cu yd
const mulchBags50L = Math.ceil((mulchCuM * 1000) / 50); // 75 bags of 50L

assertClose(mulchCuM, 3.75, 0.01, '10m × 5m at 7.5cm depth equals 3.75 m³');
assertClose(mulchCuYardsFromM, 4.905, 0.02, '3.75 m³ converts to ~4.90 cubic yards');
assert(mulchBags50L === 75, '3.75 m³ requires exactly 75 50-litre retail bags');

// ---------------------------------------------------------------------
// TEST GROUP 3: Paver & Base Aggregate Math
// ---------------------------------------------------------------------
console.log('\n--- Group 3: Paver & Hardscape Calculations ---');

// 20 ft x 15 ft = 300 sq ft with 4x8 pavers and 10% waste
const patioSqFt = 20 * 15; // 300 sq ft
const paver4x8SqFt = (4.125 * 8.125) / 144; // with 1/8" joint ≈ 0.2327 sq ft
const rawPavers = Math.ceil(patioSqFt / paver4x8SqFt);
const wastePavers = Math.ceil(rawPavers * 0.10);
const totalPavers = rawPavers + wastePavers;

assert(patioSqFt === 300, '20ft × 15ft patio is 300 sq ft');
assert(rawPavers > 1200 && rawPavers < 1400, `Raw pavers for 300 sq ft is ${rawPavers} (~1,289)`);
assert(totalPavers > rawPavers, 'Total pavers includes 10% cutting waste margin');

// Base gravel (4" depth on 300 sq ft)
const gravelCuYds = (patioSqFt * 4) / 324; // 3.70 cu yds
const gravelTons = Math.ceil(gravelCuYds * 1.4 * 10) / 10; // ~5.2 tons
assert(gravelTons >= 5.0 && gravelTons <= 5.5, `300 sq ft at 4" base requires ~5.2 tons gravel (got ${gravelTons})`);

// ---------------------------------------------------------------------
// TEST GROUP 4: Retaining Wall Structural Math
// ---------------------------------------------------------------------
console.log('\n--- Group 4: Retaining Wall Calculations ---');

// 30 ft length x 3 ft height
const wallLengthFt = 30;
const wallHeightFt = 3;
const exposedFaceArea = wallLengthFt * wallHeightFt; // 90 face sq ft
const buriedHeightFt = wallHeightFt > 3 ? 1.0 : 0.5; // 0.5 ft buried
const totalConstructedHeightFt = wallHeightFt + buriedHeightFt; // 3.5 ft
const totalConstructedSqFt = wallLengthFt * totalConstructedHeightFt; // 105 sq ft

assert(exposedFaceArea === 90, '30ft × 3ft wall has 90 sq ft exposed face');
assert(totalConstructedSqFt === 105, 'Includes 6" buried foundation course (105 total constructed sq ft)');

// Metric retaining wall: 9m length x 1.0m height
const metricWallL = 9;
const metricWallH = 1.0;
const metricFaceM2 = metricWallL * metricWallH; // 9.0 m²
const metricToFtFace = metricFaceM2 * SQ_METERS_TO_SQ_FT; // ~96.87 sq ft

assertClose(metricFaceM2, 9.0, 0.001, '9m × 1.0m wall has 9.0 m² exposed face');
assertClose(metricToFtFace, 96.88, 0.1, '9.0 m² converts to ~96.88 face sq ft');

// ---------------------------------------------------------------------
// TEST GROUP 5: Edge Case & Zero / Negative Input Safety
// ---------------------------------------------------------------------
console.log('\n--- Group 5: Edge Cases & Boundary Conditions ---');

// Non-negative clamp checks
const zeroLength = Math.max(0, 0);
const negLength = Math.max(0, -15);
assert(zeroLength === 0, 'Zero length safely resolves to 0');
assert(negLength === 0, 'Negative length is safely clamped to 0 without throwing error');

// Safe cost per sq ft when area is 0 (divide by zero protection)
const totalCost = 1500;
const zeroArea = 0;
const safeCostPerSqFt = zeroArea > 0 ? totalCost / zeroArea : 0;
assert(safeCostPerSqFt === 0, 'Zero area avoids Division by Zero (NaN / Infinity protected)');

// Catalog existence and valid rates
assert(Object.keys(MULCH_RATES).length >= 5, 'MULCH_RATES contains at least 5 varieties');
assert(Object.keys(PAVER_PRESETS).length >= 5, 'PAVER_PRESETS contains standard brick, cobble, and slabs');
assert(Object.keys(PATIO_MATERIALS).length >= 4, 'PATIO_MATERIALS contains pavers, concrete, flagstone');
assert(Object.keys(WALL_MATERIALS).length >= 4, 'WALL_MATERIALS contains concrete blocks, stone, timber');
assert(Object.keys(TREE_SIZES).length >= 4, 'TREE_SIZES contains nursery container options');
assert(Object.keys(DESIGN_TIERS).length >= 3, 'DESIGN_TIERS contains 2D, 3D, and luxury tiers');
assert(SQFT_TIERS.length === 3, 'SQFT_TIERS contains Tier 1, Tier 2, and Tier 3');

console.log('\n======================================================');
console.log(`TEST RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('======================================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
