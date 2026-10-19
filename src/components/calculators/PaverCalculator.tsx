import React, { useState, useRef, useEffect } from 'react';
import { Layers, Calculator, Printer, CheckCircle2 } from 'lucide-react';
import {
  formatCurrency,
  PAVER_PRESETS,
  PAVER_FEES,
  METERS_TO_FEET,
  FEET_TO_METERS,
  SQ_METERS_TO_SQ_FT,
  SQ_FT_TO_SQ_METERS,
} from '../../data/pricingData';
import { UnitSystem } from '../../types';
import { AnimatedPrice } from '../common/AnimatedPrice';

interface PaverCalculatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

export const PaverCalculator: React.FC<PaverCalculatorProps> = ({ unitSystem, onNavigate }) => {
  const isMetric = unitSystem === 'metric';
  const [length, setLength] = useState<number>(isMetric ? 6 : 20);
  const [width, setWidth] = useState<number>(isMetric ? 4.5 : 15);
  const [paverSize, setPaverSize] = useState<string>('4x8');
  const [customPaverLength, setCustomPaverLength] = useState<number>(isMetric ? 10 : 4);
  const [customPaverWidth, setCustomPaverWidth] = useState<number>(isMetric ? 20 : 8);
  const [jointWidthInches, setJointWidthInches] = useState<number>(0.125); // 1/8"
  const [wasteFactorPercent, setWasteFactorPercent] = useState<number>(10);
  const [baseDepth, setBaseDepth] = useState<number>(isMetric ? 10 : 4); // 4" or 10cm base
  const [pricePerPaver, setPricePerPaver] = useState<number>(1.85);

  // Sync dimensions when unit system changes
  const prevUnitRef = useRef<UnitSystem>(unitSystem);
  useEffect(() => {
    if (prevUnitRef.current !== unitSystem) {
      if (unitSystem === 'metric') {
        setLength((prev) => Math.round(prev * FEET_TO_METERS * 10) / 10);
        setWidth((prev) => Math.round(prev * FEET_TO_METERS * 10) / 10);
        setBaseDepth(10);
      } else {
        setLength((prev) => Math.round(prev * METERS_TO_FEET));
        setWidth((prev) => Math.round(prev * METERS_TO_FEET));
        setBaseDepth(4);
      }
      prevUnitRef.current = unitSystem;
    }
  }, [unitSystem]);

  const selectedPreset = PAVER_PRESETS[paverSize] || PAVER_PRESETS['4x8'];
  const effectiveLengthIn = paverSize === 'custom'
    ? (isMetric ? customPaverLength / 2.54 : customPaverLength)
    : selectedPreset.lengthIn;
  const effectiveWidthIn = paverSize === 'custom'
    ? (isMetric ? customPaverWidth / 2.54 : customPaverWidth)
    : selectedPreset.widthIn;

  // Project Area
  const areaDisplay = Math.max(0, length * width);
  const areaSqFt = isMetric ? areaDisplay * SQ_METERS_TO_SQ_FT : areaDisplay;

  // Paver Coverage & Count
  const paverSqFtWithJoint = ((effectiveLengthIn + jointWidthInches) * (effectiveWidthIn + jointWidthInches)) / 144;
  const rawPaversCount = paverSqFtWithJoint > 0 ? Math.ceil(areaSqFt / paverSqFtWithJoint) : 0;
  const wastePavers = Math.ceil(rawPaversCount * (wasteFactorPercent / 100));
  const totalPaversNeeded = rawPaversCount + wastePavers;

  // Base Materials
  // US: baseDepth in inches. Metric: baseDepth in cm => convert to inches for formula
  const effectiveBaseDepthInches = isMetric ? baseDepth / 2.54 : baseDepth;
  const gravelCuYds = (areaSqFt * effectiveBaseDepthInches) / 324;
  const gravelTons = Math.ceil(gravelCuYds * 1.4 * 10) / 10;
  const gravelTonnes = Math.ceil(gravelTons * 0.907 * 10) / 10;
  const gravelCost = gravelTons * PAVER_FEES.gravelPerTon;

  // Bedding Sand (1 inch uniform depth / 2.5cm)
  const sandCuYds = (areaSqFt * 1) / 324;
  const sandTons = Math.ceil(sandCuYds * 1.35 * 10) / 10;
  const sandTonnes = Math.ceil(sandTons * 0.907 * 10) / 10;
  const sandCost = sandTons * PAVER_FEES.sandPerTon;

  // Polymeric joint sand bags (approx 1 bag 50lb / 25kg covers 60 sq ft / 5.5 m²)
  const polymericSandBags = Math.ceil(areaSqFt / 60);
  const polymericSandCost = polymericSandBags * PAVER_FEES.polymericSandPerBag;

  // Costs
  const paversCost = totalPaversNeeded * pricePerPaver;
  const totalMaterialCost = paversCost + gravelCost + sandCost + polymericSandCost;
  const estimatedInstalledCost = areaSqFt * PAVER_FEES.turnkeyInstalledRatePerSqFt;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
      {/* Header */}
      <div className="bg-stone-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Masonry & Hardscape Quantity Estimator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Paver Calculator (Patio, Walkway & Driveway)
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          Calculate the exact number of pavers required, cutting waste factor, bedding sand, and gravel road base for your project.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dimensions */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              1. Area Dimensions ({isMetric ? 'Meters' : 'Feet'})
            </label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Patio / Walkway Length ({isMetric ? 'm' : 'ft'})
                </label>
                <input
                  type="number"
                  min="0.1"
                  step={isMetric ? '0.1' : '1'}
                  value={length}
                  onChange={(e) => setLength(Math.max(0.1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Patio / Walkway Width ({isMetric ? 'm' : 'ft'})
                </label>
                <input
                  type="number"
                  min="0.1"
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
                  ? `${areaDisplay} m² (${Math.round(areaSqFt)} sq ft)`
                  : `${areaSqFt} sq ft (${(areaSqFt * 0.0929).toFixed(1)} m²)`}
              </span>
            </div>
          </div>

          {/* Paver Size Preset */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              2. Paver Size & Dimensions ({isMetric ? 'cm' : 'Inches'})
            </label>
            <select
              value={paverSize}
              onChange={(e) => {
                setPaverSize(e.target.value);
                const p = PAVER_PRESETS[e.target.value];
                if (p) setPricePerPaver(p.defaultPrice);
              }}
              className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 mb-3"
            >
              {Object.entries(PAVER_PRESETS).map(([key, val]) => (
                <option key={key} value={key}>
                  {val.name} {isMetric ? `(${Math.round(val.lengthIn * 2.54)} × ${Math.round(val.widthIn * 2.54)} cm)` : ''} – ${val.defaultPrice}/paver
                </option>
              ))}
            </select>

            {paverSize === 'custom' && (
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <label className="block text-xs text-stone-600 mb-1">
                    Paver Length ({isMetric ? 'cm' : 'in'})
                  </label>
                  <input
                    type="number"
                    value={customPaverLength}
                    onChange={(e) => setCustomPaverLength(parseFloat(e.target.value) || 1)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs"
                  />
                </div>
                <div>
                  <label className="block text-xs text-stone-600 mb-1">
                    Paver Width ({isMetric ? 'cm' : 'in'})
                  </label>
                  <input
                    type="number"
                    value={customPaverWidth}
                    onChange={(e) => setCustomPaverWidth(parseFloat(e.target.value) || 1)}
                    className="w-full bg-white border border-stone-300 rounded-lg p-2 text-xs"
                  />
                </div>
              </div>
            )}

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-600 mb-1">Joint Spacing</label>
                <select
                  value={jointWidthInches}
                  onChange={(e) => setJointWidthInches(parseFloat(e.target.value))}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 font-medium"
                >
                  <option value={0.0625}>{isMetric ? '1.5 mm (Tight fit)' : '1/16" (Tight fit)'}</option>
                  <option value={0.125}>{isMetric ? '3 mm (Standard interlocking)' : '1/8" (Standard interlocking)'}</option>
                  <option value={0.25}>{isMetric ? '6 mm (Permeable / wide)' : '1/4" (Permeable / wide sand)'}</option>
                  <option value={0.375}>{isMetric ? '10 mm (Cobblestone style)' : '3/8" (Cobblestone style)'}</option>
                </select>
              </div>

              <div>
                <label className="block text-stone-600 mb-1">Waste Factor %</label>
                <select
                  value={wasteFactorPercent}
                  onChange={(e) => setWasteFactorPercent(parseInt(e.target.value, 10))}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 font-medium"
                >
                  <option value={5}>5% (Straight run)</option>
                  <option value={10}>10% (Recommended standard)</option>
                  <option value={15}>15% (Herringbone / diagonal cuts)</option>
                  <option value={20}>20% (Curved serpentine borders)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Sub-Base Specifications */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              3. Sub-base Specifications
            </label>
            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block text-stone-600 mb-1">Crushed Stone Base Depth</label>
                <select
                  value={baseDepth}
                  onChange={(e) => setBaseDepth(parseInt(e.target.value, 10))}
                  className="w-full bg-white border border-stone-300 rounded-lg p-2 font-medium"
                >
                  {isMetric ? (
                    <>
                      <option value={10}>10 cm (Pedestrian / Patio)</option>
                      <option value={15}>15 cm (Heavy patio / clay soil)</option>
                      <option value={20}>20 cm (Driveway / vehicle load)</option>
                    </>
                  ) : (
                    <>
                      <option value={4}>4 Inches (Pedestrian / Patio)</option>
                      <option value={6}>6 Inches (Heavy patio / clay soil)</option>
                      <option value={8}>8 Inches (Driveway / vehicle load)</option>
                    </>
                  )}
                </select>
              </div>
              <div>
                <label className="block text-stone-600 mb-1">Bedding Sand Layer</label>
                <div className="p-2 bg-stone-200/50 rounded-lg font-medium text-stone-700">
                  {isMetric ? '2.5 cm Uniform (Standard)' : '1 Inch Uniform (Industry Standard)'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Output Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-800 sticky top-24 print-sheet">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Material Takeoff
              </span>
              <span className="text-xs text-stone-400">
                {isMetric ? `${areaDisplay} m² project` : `${areaSqFt} sq ft project`}
              </span>
            </div>

            {/* Total Pavers Count */}
            <div className="my-5 bg-stone-800/80 rounded-2xl p-5 text-center border border-stone-700 animate-result-card">
              <span className="text-xs text-stone-400 block mb-1">Total Pavers Needed</span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                <AnimatedPrice value={totalPaversNeeded} prefix="" decimals={0} />
              </div>
              <div className="text-xs text-stone-300 mt-2 font-medium">
                Includes <strong className="text-emerald-400">+{wastePavers} pavers</strong> for {wasteFactorPercent}% cutting waste
              </div>
            </div>

            {/* Material Takeoff Breakdown */}
            <div className="space-y-2.5 text-xs text-stone-300 border-t border-b border-stone-800 py-3 mb-4">
              <div className="flex justify-between items-center">
                <span>{selectedPreset.name} ({totalPaversNeeded} pcs):</span>
                <span className="font-semibold text-white"><AnimatedPrice value={paversCost} /></span>
              </div>
              <div className="flex justify-between items-center">
                <span>
                  Compacted Base (
                  {isMetric
                    ? `${gravelTonnes} tonnes @ ${baseDepth}cm`
                    : `${gravelTons} tons @ ${baseDepth}"`}
                  ):
                </span>
                <span className="font-semibold text-white"><AnimatedPrice value={gravelCost} /></span>
              </div>
              <div className="flex justify-between items-center">
                <span>
                  Bedding Sand ({isMetric ? `${sandTonnes} tonnes @ 2.5cm` : `${sandTons} tons @ 1"`}):
                </span>
                <span className="font-semibold text-white"><AnimatedPrice value={sandCost} /></span>
              </div>
              <div className="flex justify-between items-center">
                <span>Polymeric Joint Sand ({polymericSandBags} bags):</span>
                <span className="font-semibold text-white"><AnimatedPrice value={polymericSandCost} /></span>
              </div>
              <div className="pt-2 border-t border-stone-800 flex justify-between items-center font-bold text-white text-sm">
                <span>DIY Material Subtotal:</span>
                <span className="text-emerald-400"><AnimatedPrice value={totalMaterialCost} /></span>
              </div>
            </div>

            {/* Contractor Installed Benchmarks */}
            <div className="bg-stone-800/50 rounded-xl p-3 text-xs border border-stone-700/60 mb-5">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block mb-1">
                Estimated Turnkey Installed Cost:
              </span>
              <div className="text-xl font-bold text-white">
                <AnimatedPrice value={estimatedInstalledCost * 0.85} /> – <AnimatedPrice value={estimatedInstalledCost * 1.25} />
              </div>
              <p className="text-[11px] text-stone-400 mt-1">
                Includes excavation, grading, base compaction, paver laying, edge restraints & joint sanding.
              </p>
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
                  onClick={() => onNavigate('/patio-cost-calculator/')}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Patio Cost Calculator &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
