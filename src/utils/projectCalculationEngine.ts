import {
  ProjectComponentItem,
  ProjectExtraCosts,
  UnitSystem,
  ComponentMaterialDetail,
} from '../types';
import {
  METERS_TO_FEET,
  SQ_METERS_TO_SQ_FT,
  CU_METERS_TO_CU_YARDS,
  LAWN_VARIETIES,
  MULCH_RATES,
  MULCH_FEES,
  PAVER_PRESETS,
  PAVER_FEES,
  PATIO_MATERIALS,
  WALL_MATERIALS,
  WALL_FEES,
  PLANT_GRADES,
  TREE_SIZES,
  TREE_FEES,
} from '../data/pricingData';

/**
 * Calculates a single project component item based on user inputs, units, and regional multiplier.
 */
export function calculateComponent(
  item: ProjectComponentItem,
  unitSystem: UnitSystem,
  regionalMultiplier: number
): ProjectComponentItem {
  const isMetric = unitSystem === 'metric';
  const wasteMultiplier = 1 + (item.wasteFactorPercent || 10) / 100;

  let calculatedSqFt = 0;
  let displayArea = 0;
  let materialCost = 0;
  let laborHours = 0;
  let laborCost = 0;
  const materials: ComponentMaterialDetail[] = [];

  switch (item.type) {
    case 'lawn': {
      const len = item.length ?? 30;
      const wid = item.width ?? 20;
      displayArea = item.area ?? Math.max(0, len * wid);
      calculatedSqFt = isMetric ? displayArea * SQ_METERS_TO_SQ_FT : displayArea;

      const effectiveSqFt = calculatedSqFt * wasteMultiplier;
      const effectiveDisplayArea = displayArea * wasteMultiplier;
      const variety = LAWN_VARIETIES[item.selectedOption] || LAWN_VARIETIES.bluegrass;

      materialCost = effectiveSqFt * variety.sqFtRate;
      laborHours = (calculatedSqFt / 100) * variety.laborHoursPer100SqFt;
      laborCost = item.includeLabor ? laborHours * (55 * regionalMultiplier) : 0;

      const pallets = Math.ceil(effectiveSqFt / 450);

      materials.push({
        name: variety.name,
        quantity: Math.round(isMetric ? effectiveDisplayArea : effectiveSqFt),
        unit: isMetric ? 'm²' : 'sq ft',
        category: 'turf',
        cost: materialCost,
        notes: `Approx. ${pallets} pallets (1 pallet ≈ 450 sq ft / 42 m²) including ${item.wasteFactorPercent}% waste`,
      });
      break;
    }

    case 'mulch': {
      const len = item.length ?? 25;
      const wid = item.width ?? 8;
      displayArea = item.area ?? Math.max(0, len * wid);
      calculatedSqFt = isMetric ? displayArea * SQ_METERS_TO_SQ_FT : displayArea;

      const variety = MULCH_RATES[item.selectedOption] || MULCH_RATES.hardwood;
      let cuYards = 0;
      let cuMeters = 0;
      let bagsCount = 0;

      if (isMetric) {
        const depthCm = item.depth ?? 7.5; // cm
        cuMeters = displayArea * (depthCm / 100);
        cuYards = cuMeters * CU_METERS_TO_CU_YARDS;
        bagsCount = Math.ceil((cuMeters * 1000) / 50); // 50L bags
      } else {
        const depthIn = item.depth ?? 3; // inches
        cuYards = calculatedSqFt > 0 ? (calculatedSqFt * depthIn) / 324 : 0;
        const cuFeet = calculatedSqFt * (depthIn / 12);
        cuMeters = cuYards * 0.764555;
        bagsCount = Math.ceil(cuFeet / 2); // 2 cu ft bags
      }

      const effectiveYards = cuYards * wasteMultiplier;
      const effectiveCuM = cuMeters * wasteMultiplier;
      materialCost = effectiveYards * variety.bulkYdPrice;
      laborHours = effectiveYards * 0.75;
      laborCost = item.includeLabor
        ? effectiveYards * MULCH_FEES.spreadingLaborPerCuYd * regionalMultiplier
        : 0;

      materials.push({
        name: `${variety.name} (Bulk Truckload)`,
        quantity: Math.round((isMetric ? effectiveCuM : effectiveYards) * 10) / 10,
        unit: isMetric ? 'm³' : 'cu yd',
        category: 'mulch',
        cost: materialCost,
        notes: `Equivalent to approx. ${bagsCount} retail bags (${isMetric ? '50-litre' : '2-cubic-foot'})`,
      });
      break;
    }

    case 'paver': {
      const len = item.length ?? 20;
      const wid = item.width ?? 15;
      displayArea = item.area ?? Math.max(0, len * wid);
      calculatedSqFt = isMetric ? displayArea * SQ_METERS_TO_SQ_FT : displayArea;

      const preset = PAVER_PRESETS[item.selectedOption] || PAVER_PRESETS['4x8'];
      const paverSqFtWithJoint = ((preset.lengthIn + 0.125) * (preset.widthIn + 0.125)) / 144;
      const rawPavers = paverSqFtWithJoint > 0 ? Math.ceil(calculatedSqFt / paverSqFtWithJoint) : 0;
      const wastePavers = Math.ceil(rawPavers * ((item.wasteFactorPercent || 10) / 100));
      const totalPavers = rawPavers + wastePavers;
      const paverCost = totalPavers * preset.defaultPrice;

      // Base gravel 4"
      const gravelCuYds = (calculatedSqFt * 4) / 324;
      const gravelTons = Math.ceil(gravelCuYds * 1.4 * 10) / 10;
      const gravelCost = gravelTons * PAVER_FEES.gravelPerTon;

      // Bedding sand 1"
      const sandCuYds = (calculatedSqFt * 1) / 324;
      const sandTons = Math.ceil(sandCuYds * 1.35 * 10) / 10;
      const sandCost = sandTons * PAVER_FEES.sandPerTon;

      // Polymeric joint sand
      const polyBags = Math.ceil(calculatedSqFt / 60);
      const polyCost = polyBags * PAVER_FEES.polymericSandPerBag;

      materialCost = paverCost + gravelCost + sandCost + polyCost;
      laborHours = (calculatedSqFt / 100) * 8.5;
      laborCost = item.includeLabor ? calculatedSqFt * 11.50 * regionalMultiplier : 0;

      materials.push(
        {
          name: `${preset.name} Paver Units`,
          quantity: totalPavers,
          unit: 'units',
          category: 'masonry',
          cost: paverCost,
          notes: `Includes ${rawPavers} base pavers + ${wastePavers} cutting/compaction waste`,
        },
        {
          name: 'Crushed Stone Road Base (4" compacted depth)',
          quantity: isMetric ? Math.ceil(gravelTons * 0.907 * 10) / 10 : gravelTons,
          unit: isMetric ? 'tonnes' : 'tons',
          category: 'aggregate',
          cost: gravelCost,
          notes: 'Standard angular crushed stone (#57 or ABC crushed run)',
        },
        {
          name: 'Coarse Bedding Sand (1" screeded layer)',
          quantity: isMetric ? Math.ceil(sandTons * 0.907 * 10) / 10 : sandTons,
          unit: isMetric ? 'tonnes' : 'tons',
          category: 'aggregate',
          cost: sandCost,
          notes: 'Concrete sand (ASTM C33) bedding layer',
        },
        {
          name: 'Polymeric Jointing Sand',
          quantity: polyBags,
          unit: 'bags (50 lb)',
          category: 'supplies',
          cost: polyCost,
          notes: 'Stabilized locking joint sand prevents weed growth and ant washouts',
        }
      );
      break;
    }

    case 'patio': {
      const len = item.length ?? 20;
      const wid = item.width ?? 15;
      displayArea = item.area ?? Math.max(0, len * wid);
      calculatedSqFt = isMetric ? displayArea * SQ_METERS_TO_SQ_FT : displayArea;

      const material = PATIO_MATERIALS[item.selectedOption] || PATIO_MATERIALS.pavers;
      materialCost = calculatedSqFt * material.matCostSqFt;
      laborHours = (calculatedSqFt / 100) * 7.5;
      laborCost = item.includeLabor ? calculatedSqFt * material.laborCostSqFt * regionalMultiplier : 0;

      materials.push({
        name: `${material.name} Surface Material`,
        quantity: Math.round(isMetric ? displayArea : calculatedSqFt),
        unit: isMetric ? 'm²' : 'sq ft',
        category: 'hardscape',
        cost: materialCost,
        notes: material.description,
      });
      break;
    }

    case 'wall': {
      const len = item.length ?? 30;
      const hgt = item.height ?? 3;
      const lengthFt = isMetric ? len * METERS_TO_FEET : len;
      const heightFt = isMetric ? hgt * METERS_TO_FEET : hgt;

      const exposedFaceSqFt = lengthFt * heightFt;
      displayArea = isMetric ? len * hgt : exposedFaceSqFt;
      calculatedSqFt = exposedFaceSqFt;

      const buriedHeightFt = heightFt > 3 ? 1.0 : 0.5;
      const constructedSqFt = lengthFt * (heightFt + buriedHeightFt);

      const wallMat = WALL_MATERIALS[item.selectedOption] || WALL_MATERIALS['concrete-blocks'];
      const blockCost = constructedSqFt * wallMat.blockRateSqFt;

      // Trench footing gravel
      const trenchCuYds = (lengthFt * 1.5 * 1.0) / 27;
      const trenchGravelCost = trenchCuYds * WALL_FEES.baseGravelCostPerCuYd;

      // Drainage backfill chimney gravel
      const backfillCuYds = (lengthFt * 1.0 * heightFt) / 27;
      const backfillGravelCost = backfillCuYds * WALL_FEES.drainageGravelPerCuYd;

      // Drain pipe
      const drainPipeCost = lengthFt * WALL_FEES.drainPipePerLinearFt;

      materialCost = blockCost + trenchGravelCost + backfillGravelCost + drainPipeCost;
      laborHours = (constructedSqFt / 100) * 9.5;
      laborCost = item.includeLabor ? constructedSqFt * wallMat.laborRateSqFt * regionalMultiplier : 0;

      materials.push(
        {
          name: `${wallMat.name} Structural Wall Blocks`,
          quantity: Math.round(constructedSqFt),
          unit: 'sq ft face',
          category: 'masonry',
          cost: blockCost,
          notes: `Includes ${Math.round(exposedFaceSqFt)} exposed face sq ft + embedded base course`,
        },
        {
          name: 'Trench Leveling Pad Gravel',
          quantity: Math.round((isMetric ? trenchCuYds * 0.7645 : trenchCuYds) * 10) / 10,
          unit: isMetric ? 'm³' : 'cu yd',
          category: 'aggregate',
          cost: trenchGravelCost,
          notes: '6" compacted gravel trench foundation beneath first course',
        },
        {
          name: 'Chimney Drainage Gravel (Backfill)',
          quantity: Math.round((isMetric ? backfillCuYds * 0.7645 : backfillCuYds) * 10) / 10,
          unit: isMetric ? 'm³' : 'cu yd',
          category: 'aggregate',
          cost: backfillGravelCost,
          notes: '12" clean crushed rock drainage layer behind wall to relieve hydrostatic pressure',
        },
        {
          name: '4" Perforated Drain Tile Pipe & Sock',
          quantity: Math.round(isMetric ? len : lengthFt),
          unit: isMetric ? 'meters' : 'linear ft',
          category: 'supplies',
          cost: drainPipeCost,
          notes: 'Collector pipe wrapped in geotextile filter fabric at wall footing',
        }
      );
      break;
    }

    case 'plants': {
      const qty = Math.max(1, item.quantity ?? 12);
      const grade = PLANT_GRADES[item.selectedOption] || PLANT_GRADES.established;
      const plantCost = qty * grade.plantPrice;
      const compostBags = Math.ceil(qty / 3);
      const compostCost = compostBags * 8.50;

      materialCost = plantCost + compostCost;
      laborHours = qty * grade.laborHours;
      laborCost = item.includeLabor ? laborHours * (55 * regionalMultiplier) : 0;
      calculatedSqFt = qty * 25; // standard spacing footprint
      displayArea = isMetric ? calculatedSqFt / SQ_METERS_TO_SQ_FT : calculatedSqFt;

      materials.push(
        {
          name: grade.name,
          quantity: qty,
          unit: 'plants',
          category: 'plant',
          cost: plantCost,
          notes: grade.description,
        },
        {
          name: 'Organic Bed Compost Soil Amendment',
          quantity: compostBags,
          unit: 'bags (1.5 cu ft)',
          category: 'supplies',
          cost: compostCost,
          notes: 'Root zone conditioner and mycorrhizal microbial activator',
        }
      );
      break;
    }

    case 'trees': {
      const qty = Math.max(1, item.quantity ?? 2);
      const size = TREE_SIZES[item.selectedOption] || TREE_SIZES['15gal'];
      const treeCost = qty * size.treePrice;
      const stakingCost = qty * TREE_FEES.stakingKitPerTree;
      const compostCost = qty * TREE_FEES.soilCompostPerTree;

      materialCost = treeCost + stakingCost + compostCost;
      laborHours = qty * size.laborHours;
      laborCost = item.includeLabor
        ? laborHours * TREE_FEES.plantingLaborHourlyRate * regionalMultiplier
        : 0;
      calculatedSqFt = qty * 250; // canopy footprint benchmark
      displayArea = isMetric ? calculatedSqFt / SQ_METERS_TO_SQ_FT : calculatedSqFt;

      materials.push(
        {
          name: `${size.name} Specimen`,
          quantity: qty,
          unit: 'trees',
          category: 'plant',
          cost: treeCost,
          notes: size.desc,
        },
        {
          name: 'Tree Staking & Mulch Collar Kits',
          quantity: qty,
          unit: 'kits',
          category: 'supplies',
          cost: stakingCost,
          notes: 'Includes lodgepole pine stakes, heavy webbing tree ties, and collar buffer',
        },
        {
          name: 'Rich Planting Compost & Root Activator',
          quantity: qty * 2,
          unit: 'bags',
          category: 'supplies',
          cost: compostCost,
          notes: 'Backfill blend for excavating nursery rootball pit',
        }
      );
      break;
    }
  }

  const subtotal = materialCost + laborCost;

  return {
    ...item,
    calculatedSqFt: Math.round(calculatedSqFt * 10) / 10,
    displayArea: Math.round(displayArea * 10) / 10,
    materialCost: Math.round(materialCost),
    laborHours: Math.round(laborHours * 10) / 10,
    laborCost: Math.round(laborCost),
    subtotal: Math.round(subtotal),
    materials,
  };
}

/**
 * Calculates combined project estimates, shopping lists, cost tiers, DIY comparisons, and budget metrics.
 */
export function calculateCombinedProject(
  components: ProjectComponentItem[],
  extraCosts: ProjectExtraCosts,
  regionalMultiplier: number
) {
  let totalMaterials = 0;
  let totalLabor = 0;
  let totalLaborHours = 0;
  let totalAreaSqFt = 0;

  components.forEach((c) => {
    totalMaterials += c.materialCost;
    totalLabor += c.laborCost;
    totalLaborHours += c.laborHours;
    totalAreaSqFt += c.calculatedSqFt;
  });

  // Calculate Extra Costs
  let extrasTotal = 0;
  if (extraCosts.siteExcavation && totalAreaSqFt > 0) {
    extrasTotal += totalAreaSqFt * (extraCosts.excavationRatePerSqFt || 1.25);
  }
  extrasTotal += (extraCosts.deliveryFee || 0) * regionalMultiplier;
  extrasTotal += extraCosts.debrisDisposal || 0;
  extrasTotal += extraCosts.equipmentRental || 0;
  extrasTotal += extraCosts.permitFee || 0;

  const subtotalBeforeTax = totalMaterials + totalLabor + extrasTotal;
  const taxAmount = (subtotalBeforeTax * (extraCosts.taxPercent || 0)) / 100;
  const totalCombinedCost = subtotalBeforeTax + taxAmount;

  // Cost Ranges (Low, Typical, High)
  // Low: standard materials, ideal rectangular lot, easy flat access (-14%)
  // High: restricted access, custom cuts, curved masonry, slope excavation (+22%)
  const lowEstimate = Math.round(totalCombinedCost * 0.86);
  const typicalEstimate = Math.round(totalCombinedCost);
  const highEstimate = Math.round(totalCombinedCost * 1.22);

  // DIY vs Pro Comparison
  // In DIY: Homeowner pays retail for materials (+8% vs contractor wholesale discount),
  // pays for tool rentals ($350-$650), delivery ($150), dumpster ($300), zero labor fees ($0).
  const diyMaterials = Math.round(totalMaterials * 1.08);
  const diyToolRental = Math.max(250, Math.round(totalLaborHours * 8));
  const diyLogistics = 280; // delivery and dump run
  const diyTotal = diyMaterials + diyToolRental + diyLogistics + (diyMaterials * (extraCosts.taxPercent || 0)) / 100;
  const proTotal = totalCombinedCost;
  const potentialDiySavings = Math.max(0, proTotal - diyTotal);

  // Consolidated Shopping List Aggregator
  const shoppingListMap = new Map<string, ComponentMaterialDetail>();
  components.forEach((c) => {
    c.materials.forEach((m) => {
      const key = `${m.name}|${m.unit}`;
      if (shoppingListMap.has(key)) {
        const existing = shoppingListMap.get(key)!;
        existing.quantity += m.quantity;
        existing.cost += m.cost;
      } else {
        shoppingListMap.set(key, { ...m });
      }
    });
  });

  const consolidatedShoppingList = Array.from(shoppingListMap.values()).sort((a, b) =>
    a.category.localeCompare(b.category)
  );

  return {
    totalMaterials: Math.round(totalMaterials),
    totalLabor: Math.round(totalLabor),
    totalLaborHours: Math.round(totalLaborHours * 10) / 10,
    totalAreaSqFt: Math.round(totalAreaSqFt),
    extrasTotal: Math.round(extrasTotal),
    taxAmount: Math.round(taxAmount),
    totalCombinedCost: Math.round(totalCombinedCost),
    lowEstimate,
    typicalEstimate,
    highEstimate,
    diyComparison: {
      diyMaterials,
      diyToolRental,
      diyLogistics,
      diyTotal: Math.round(diyTotal),
      proTotal: Math.round(proTotal),
      potentialSavings: Math.round(potentialDiySavings),
      estimatedDiyHours: Math.round(totalLaborHours * 1.4), // DIY takes ~40% longer for non-pros
    },
    consolidatedShoppingList,
  };
}
