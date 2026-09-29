import React, { useState, useEffect, useRef } from 'react';
import { Layers, Calculator, Printer, ArrowRight } from 'lucide-react';
import {
  formatCurrency,
  PATIO_MATERIALS,
  PATIO_FEES,
  METERS_TO_FEET,
  SQ_METERS_TO_SQ_FT,
} from '../../data/pricingData';
import { UnitSystem } from '../../types';

interface PatioCostCalculatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

export const PatioCostCalculator: React.FC<PatioCostCalculatorProps> = ({
  unitSystem,
  onNavigate,
}) => {
  const isMetric = unitSystem === 'metric';
  const [length, setLength] = useState<number>(isMetric ? 6 : 20);
  const [width, setWidth] = useState<number>(isMetric ? 4.5 : 15);
  const [surfaceMaterial, setSurfaceMaterial] = useState<string>('pavers');
  const [siteCondition, setSiteCondition] = useState<'flat' | 'sloped' | 'difficult'>('flat');
  const [includeOldRemoval, setIncludeOldRemoval] = useState<boolean>(false);
  const [includeSealant, setIncludeSealant] = useState<boolean>(true);

  const prevUnitRef = useRef<UnitSystem>(unitSystem);

  useEffect(() => {
    if (prevUnitRef.current !== unitSystem) {
      if (unitSystem === 'metric') {
        setLength((prev) => Math.max(1, Math.round((prev / METERS_TO_FEET) * 10) / 10));
        setWidth((prev) => Math.max(1, Math.round((prev / METERS_TO_FEET) * 10) / 10));
      } else {
        setLength((prev) => Math.max(1, Math.round(prev * METERS_TO_FEET)));
        setWidth((prev) => Math.max(1, Math.round(prev * METERS_TO_FEET)));
      }
      prevUnitRef.current = unitSystem;
    }
  }, [unitSystem]);

  const selected = PATIO_MATERIALS[surfaceMaterial] || PATIO_MATERIALS.pavers;

  // Area calculation
  const displayArea = Math.max(0, length * width);
  const areaSqFt = isMetric ? displayArea * SQ_METERS_TO_SQ_FT : displayArea;

  // Site slope multiplier
  const slopeMultiplier = siteCondition === 'flat' ? 1.0 : siteCondition === 'sloped' ? 1.2 : 1.35;

  // Base materials & prep
  const excavationPrepCost = areaSqFt * PATIO_FEES.excavationPrepRatePerSqFt * slopeMultiplier;
  const oldRemovalCost = includeOldRemoval ? areaSqFt * PATIO_FEES.oldRemovalRatePerSqFt : 0;
  const materialCost = areaSqFt * selected.matCostSqFt;
  const laborCost = areaSqFt * selected.laborCostSqFt * slopeMultiplier;
  const sealantCost = includeSealant ? areaSqFt * PATIO_FEES.sealantRatePerSqFt : 0;

  const totalPatioCost = excavationPrepCost + oldRemovalCost + materialCost + laborCost + sealantCost;
  const costPerUnit = displayArea > 0 ? totalPatioCost / displayArea : 0;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
      {/* Header */}
      <div className="bg-stone-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Outdoor Living Estimator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Patio Cost Calculator
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          Estimate full installation costs for paver, stamped concrete, and natural flagstone patios with sub-base prep and labor rates.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dimensions */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              1. Patio Dimensions ({isMetric ? 'Meters' : 'Feet'})
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Length ({isMetric ? 'm' : 'feet'})
                </label>
                <input
                  type="number"
                  min="0.5"
                  step={isMetric ? '0.1' : '1'}
                  value={length}
                  onChange={(e) => setLength(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Width ({isMetric ? 'm' : 'feet'})
                </label>
                <input
                  type="number"
                  min="0.5"
                  step={isMetric ? '0.1' : '1'}
                  value={width}
                  onChange={(e) => setWidth(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            </div>
            <div className="mt-3 flex items-center justify-between text-xs text-stone-600 bg-white px-3.5 py-2 rounded-xl border border-stone-200">
              <span>Total Area:</span>
              <span className="font-bold text-emerald-800">
                {isMetric
                  ? `${displayArea.toFixed(1)} m² (≈ ${areaSqFt.toFixed(0)} sq ft)`
                  : `${areaSqFt.toFixed(0)} sq ft (≈ ${(areaSqFt / SQ_METERS_TO_SQ_FT).toFixed(1)} m²)`}
              </span>
            </div>
          </div>

          {/* Material Choice */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              2. Patio Surface Material
            </label>
            <div className="space-y-2.5">
              {Object.entries(PATIO_MATERIALS).map(([key, val]) => {
                const combinedRateSqFt = val.matCostSqFt + val.laborCostSqFt;
                const displayRate = isMetric
                  ? combinedRateSqFt * SQ_METERS_TO_SQ_FT
                  : combinedRateSqFt;

                return (
                  <label
                    key={key}
                    className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                      surfaceMaterial === key
                        ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                        : 'bg-white border-stone-200 hover:border-stone-300'
                    }`}
                  >
                    <input
                      type="radio"
                      name="surfaceMaterial"
                      value={key}
                      checked={surfaceMaterial === key}
                      onChange={(e) => setSurfaceMaterial(e.target.value)}
                      className="mt-1 text-emerald-600"
                    />
                    <div className="w-full">
                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-sm text-stone-900">{val.name}</span>
                        <span className="text-xs font-bold text-emerald-700">
                          {formatCurrency(displayRate)}/{isMetric ? 'm²' : 'sq ft'} installed
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">{val.description}</p>
                    </div>
                  </label>
                );
              })}
            </div>
          </div>

          {/* Site Terrain & Addons */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              3. Site Conditions & Optional Work
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 mb-4 text-xs">
              <button
                type="button"
                onClick={() => setSiteCondition('flat')}
                className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                  siteCondition === 'flat'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Flat Lawn (Standard)
              </button>
              <button
                type="button"
                onClick={() => setSiteCondition('sloped')}
                className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                  siteCondition === 'sloped'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Moderate Slope (+20% prep)
              </button>
              <button
                type="button"
                onClick={() => setSiteCondition('difficult')}
                className={`p-2.5 rounded-xl border text-center font-medium cursor-pointer ${
                  siteCondition === 'difficult'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-semibold'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Steep / Tight Access (+35%)
              </button>
            </div>

            <div className="space-y-2 text-xs pt-2 border-t border-stone-200">
              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeOldRemoval}
                  onChange={(e) => setIncludeOldRemoval(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>
                  Demolish & haul away existing old concrete/wood deck (
                  {formatCurrency(
                    isMetric
                      ? PATIO_FEES.oldRemovalRatePerSqFt * SQ_METERS_TO_SQ_FT
                      : PATIO_FEES.oldRemovalRatePerSqFt
                  )}
                  /{isMetric ? 'm²' : 'sq ft'})
                </span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeSealant}
                  onChange={(e) => setIncludeSealant(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>
                  Apply protective commercial acrylic sealant (
                  {formatCurrency(
                    isMetric
                      ? PATIO_FEES.sealantRatePerSqFt * SQ_METERS_TO_SQ_FT
                      : PATIO_FEES.sealantRatePerSqFt
                  )}
                  /{isMetric ? 'm²' : 'sq ft'})
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
                Patio Cost Estimate
              </span>
              <span className="text-xs text-stone-400">
                {isMetric ? `${displayArea.toFixed(1)} m²` : `${areaSqFt.toFixed(0)} sq ft`}
              </span>
            </div>

            <div className="my-5 bg-stone-800/80 rounded-2xl p-5 text-center border border-stone-700">
              <span className="text-xs text-stone-400 block mb-1">Total Estimated Project Cost</span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                {formatCurrency(totalPatioCost)}
              </div>
              <div className="text-xs text-emerald-400 mt-2 font-semibold">
                {formatCurrency(costPerUnit)} per {isMetric ? 'm²' : 'sq ft'} installed
              </div>
              <div className="mt-2 text-xs text-stone-300">
                Range: {formatCurrency(totalPatioCost * 0.88)} – {formatCurrency(totalPatioCost * 1.18)}
              </div>
            </div>

            {/* Breakdown */}
            <div className="space-y-2.5 text-xs text-stone-300 border-t border-b border-stone-800 py-3 mb-4">
              <div className="flex justify-between items-center">
                <span>Surface Material:</span>
                <span className="font-semibold text-white">{formatCurrency(materialCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Installation Labor:</span>
                <span className="font-semibold text-white">{formatCurrency(laborCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Excavation, Grading & Sub-base:</span>
                <span className="font-semibold text-white">{formatCurrency(excavationPrepCost)}</span>
              </div>
              {includeOldRemoval && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Demolition & Haul Away:</span>
                  <span>{formatCurrency(oldRemovalCost)}</span>
                </div>
              )}
              {includeSealant && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Finishing Sealant:</span>
                  <span>{formatCurrency(sealantCost)}</span>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                onClick={() => window.print()}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Estimate</span>
              </button>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('/paver-calculator/')}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Paver Calculator &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
