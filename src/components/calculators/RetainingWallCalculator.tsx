import React, { useState, useEffect, useRef } from 'react';
import { Layers, Calculator, Printer, ShieldAlert } from 'lucide-react';
import {
  formatCurrency,
  WALL_MATERIALS,
  WALL_FEES,
  METERS_TO_FEET,
  SQ_METERS_TO_SQ_FT,
  CU_METERS_TO_CU_YARDS,
} from '../../data/pricingData';
import { UnitSystem } from '../../types';
import { AnimatedPrice } from '../common/AnimatedPrice';

interface RetainingWallCalculatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

export const RetainingWallCalculator: React.FC<RetainingWallCalculatorProps> = ({
  unitSystem,
  onNavigate,
}) => {
  const isMetric = unitSystem === 'metric';
  const [length, setLength] = useState<number>(isMetric ? 9 : 30);
  const [height, setHeight] = useState<number>(isMetric ? 1.0 : 3);
  const [wallMaterial, setWallMaterial] = useState<string>('concrete-blocks');
  const [includeDrainagePipe, setIncludeDrainagePipe] = useState<boolean>(true);
  const [includeBackfillGravel, setIncludeBackfillGravel] = useState<boolean>(true);

  const prevUnitRef = useRef<UnitSystem>(unitSystem);

  useEffect(() => {
    if (prevUnitRef.current !== unitSystem) {
      if (unitSystem === 'metric') {
        setLength((prev) => Math.max(0.5, Math.round((prev / METERS_TO_FEET) * 10) / 10));
        setHeight((prev) => Math.max(0.2, Math.round((prev / METERS_TO_FEET) * 10) / 10));
      } else {
        setLength((prev) => Math.max(1, Math.round(prev * METERS_TO_FEET)));
        setHeight((prev) => Math.max(0.5, Math.round(prev * METERS_TO_FEET * 2) / 2));
      }
      prevUnitRef.current = unitSystem;
    }
  }, [unitSystem]);

  // Convert to US units internally for consistent pricing
  const lengthFt = isMetric ? length * METERS_TO_FEET : length;
  const heightFt = isMetric ? height * METERS_TO_FEET : height;

  const selected = WALL_MATERIALS[wallMaterial] || WALL_MATERIALS['concrete-blocks'];

  // Total visible face area
  const exposedFaceSqFt = Math.max(0, lengthFt * heightFt);
  const exposedFaceM2 = isMetric ? length * height : exposedFaceSqFt / SQ_METERS_TO_SQ_FT;

  // Embedded base course (at least 6" / 15cm buried for walls up to 3ft/1m, 12" / 30cm for walls over 3ft/1m)
  const buriedCoursesHeightFt = heightFt > 3 ? 1.0 : 0.5;
  const totalWallHeightFt = heightFt + buriedCoursesHeightFt;
  const totalConstructedSqFt = lengthFt * totalWallHeightFt;

  // Material Costs
  const blockUnitsCost = totalConstructedSqFt * selected.blockRateSqFt;

  // Trench excavation & leveling base (crushed gravel pad 6" deep x 18" wide)
  // Volume in cu yd = (Length * 1.5ft wide * 1ft deep) / 27
  const trenchGravelCuYds = (lengthFt * 1.5 * 1.0) / 27;
  const baseTrenchCost =
    trenchGravelCuYds * WALL_FEES.baseGravelCostPerCuYd + lengthFt * WALL_FEES.trenchLaborPerLinearFt;

  // Backfill drainage gravel (12" chimney behind the wall)
  // Volume in cu yd = (Length * 1.0ft wide * Height) / 27
  const backfillCuYds = (lengthFt * 1.0 * heightFt) / 27;
  const backfillCuM = backfillCuYds / CU_METERS_TO_CU_YARDS;
  const drainageGravelCost = includeBackfillGravel
    ? backfillCuYds * WALL_FEES.drainageGravelPerCuYd
    : 0;

  // 4" perforated drain tile pipe + filter sock fabric
  const drainPipeCost = includeDrainagePipe ? lengthFt * WALL_FEES.drainPipePerLinearFt : 0;

  // Labor
  const wallLaborCost = totalConstructedSqFt * selected.laborRateSqFt;

  const totalCost =
    blockUnitsCost + baseTrenchCost + drainageGravelCost + drainPipeCost + wallLaborCost;

  const costPerFaceUnit = isMetric
    ? exposedFaceM2 > 0
      ? totalCost / exposedFaceM2
      : 0
    : exposedFaceSqFt > 0
    ? totalCost / exposedFaceSqFt
    : 0;

  const isOverHeightThreshold = heightFt >= 4;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
      {/* Header */}
      <div className="bg-stone-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Structural Hardscape Estimator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Retaining Wall Cost Calculator
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          Estimate material units, trench excavation, backfill drainage stone, and contractor labor for concrete block, timber, and stone retaining walls.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dimensions */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              1. Wall Dimensions ({isMetric ? 'Meters' : 'Feet'})
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Wall Length ({isMetric ? 'meters' : 'feet'})
                </label>
                <input
                  type="number"
                  min="0.5"
                  step={isMetric ? '0.1' : '1'}
                  value={length}
                  onChange={(e) => setLength(Math.max(0.5, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Exposed Height ({isMetric ? 'meters' : 'feet'})
                </label>
                <input
                  type="number"
                  step={isMetric ? '0.1' : '0.5'}
                  min={isMetric ? '0.2' : '0.5'}
                  max={isMetric ? '3.6' : '12'}
                  value={height}
                  onChange={(e) => setHeight(Math.max(0.2, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>

            {isOverHeightThreshold && (
              <div className="mt-3 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-start gap-2.5 text-xs text-amber-900">
                <ShieldAlert className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <p>
                  <strong>Municipal Engineering Notice:</strong> Retaining walls {isMetric ? '1.2 meters' : '4 feet'} or higher generally require signed engineering drawings and a local city permit before excavation.
                </p>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-xs text-stone-600 bg-white px-3.5 py-2 rounded-xl border border-stone-200">
              <span>Visible Face Area:</span>
              <span className="font-bold text-emerald-800">
                {isMetric
                  ? `${exposedFaceM2.toFixed(1)} m² (≈ ${exposedFaceSqFt.toFixed(0)} sq ft)`
                  : `${exposedFaceSqFt.toFixed(0)} sq ft (${totalConstructedSqFt.toFixed(0)} sq ft with buried base)`}
              </span>
            </div>
          </div>

          {/* Material Choice */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              2. Retaining Wall Material
            </label>
            <div className="space-y-2.5">
              {Object.entries(WALL_MATERIALS).map(([key, val]) => {
                const combinedRateSqFt = val.blockRateSqFt + val.laborRateSqFt;
                const displayRate = isMetric
                  ? combinedRateSqFt * SQ_METERS_TO_SQ_FT
                  : combinedRateSqFt;

                return (
                  <label
                    key={key}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      wallMaterial === key
                        ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="wallMaterial"
                      value={key}
                      checked={wallMaterial === key}
                      onChange={(e) => setWallMaterial(e.target.value)}
                      className="mt-1 text-emerald-600"
                    />
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-stone-900">{val.name}</span>
                        <span className="text-xs font-bold text-emerald-700">
                          {formatCurrency(displayRate)}/{isMetric ? 'm² face' : 'face sq ft'}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{val.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Footing & Drainage Options */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              3. Critical Drainage & Base Options
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeBackfillGravel}
                  onChange={(e) => setIncludeBackfillGravel(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>
                  Include Clean Drainage Gravel Backfill (
                  {isMetric
                    ? `${backfillCuM.toFixed(1)} m³ (${backfillCuYds.toFixed(1)} cu yds)`
                    : `${backfillCuYds.toFixed(1)} cu yds`}{' '}
                  behind wall)
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeDrainagePipe}
                  onChange={(e) => setIncludeDrainagePipe(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>
                  Include 4-inch Perforated Drain Tile Pipe with Filter Sock (
                  {isMetric ? `${length.toFixed(1)} m` : `${lengthFt.toFixed(0)} ft`})
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-800 sticky top-24 print-sheet">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Retaining Wall Estimate
              </span>
              <span className="text-xs text-stone-400">
                {isMetric
                  ? `${length.toFixed(1)}m × ${height.toFixed(1)}m`
                  : `${lengthFt.toFixed(0)} ft × ${heightFt.toFixed(1)} ft`}
              </span>
            </div>

            <div className="my-5 bg-stone-800/80 rounded-2xl p-5 text-center border border-stone-700 animate-result-card">
              <span className="text-xs text-stone-400 block mb-1">Total Estimated Installed Cost</span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                <AnimatedPrice value={totalCost} />
              </div>
              <div className="text-xs text-emerald-400 mt-2 font-semibold">
                <AnimatedPrice value={costPerFaceUnit} decimals={2} /> per visible {isMetric ? 'm² face' : 'face sq ft'}
              </div>
              <div className="mt-2 text-xs text-stone-300">
                Range: <AnimatedPrice value={totalCost * 0.88} /> – <AnimatedPrice value={totalCost * 1.2} />
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-stone-300 border-t border-b border-stone-800 py-3 mb-4">
              <div className="flex justify-between items-center">
                <span>Wall Units & Cap Stones:</span>
                <span className="font-semibold text-white"><AnimatedPrice value={blockUnitsCost} /></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Contractor Construction Labor:</span>
                <span className="font-semibold text-white"><AnimatedPrice value={wallLaborCost} /></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Trench Excavation & Leveling Base:</span>
                <span className="font-semibold text-white"><AnimatedPrice value={baseTrenchCost} /></span>
              </div>
              {includeBackfillGravel && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Backfill Drainage Gravel:</span>
                  <span><AnimatedPrice value={drainageGravelCost} /></span>
                </div>
              )}
              {includeDrainagePipe && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Drain Tile Pipe & Sock:</span>
                  <span><AnimatedPrice value={drainPipeCost} /></span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                onClick={() => window.print()}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Specs</span>
              </button>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('/guides/retaining-wall-landscaping-cost/')}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Wall Cost Guide &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
