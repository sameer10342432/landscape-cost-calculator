import React, { useState, useRef, useEffect } from 'react';
import { Shovel, Calculator, Printer, Download, Sparkles, CheckCircle2 } from 'lucide-react';
import {
  formatCurrency,
  MULCH_RATES,
  MULCH_FEES,
  METERS_TO_FEET,
  FEET_TO_METERS,
  SQ_METERS_TO_SQ_FT,
  SQ_FT_TO_SQ_METERS,
  CU_METERS_TO_CU_YARDS,
} from '../../data/pricingData';
import { UnitSystem } from '../../types';
import { AnimatedPrice } from '../common/AnimatedPrice';

interface MulchCalculatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

export const MulchCalculator: React.FC<MulchCalculatorProps> = ({ unitSystem, onNavigate }) => {
  const [calcMode, setCalcMode] = useState<'dimensions' | 'area'>('dimensions');
  const [length, setLength] = useState<number>(unitSystem === 'metric' ? 10 : 40);
  const [width, setWidth] = useState<number>(unitSystem === 'metric' ? 5 : 10);
  const [area, setArea] = useState<number>(unitSystem === 'metric' ? 50 : 400);
  const [depth, setDepth] = useState<number>(unitSystem === 'metric' ? 7.5 : 3); // 3 in or 7.5 cm standard
  const [mulchType, setMulchType] = useState<string>('hardwood');
  const [includeDelivery, setIncludeDelivery] = useState<boolean>(true);
  const [includeLabor, setIncludeLabor] = useState<boolean>(true);

  // Sync dimensions when unit system changes
  const prevUnitRef = useRef<UnitSystem>(unitSystem);
  useEffect(() => {
    if (prevUnitRef.current !== unitSystem) {
      if (unitSystem === 'metric') {
        setLength((prev) => Math.round(prev * FEET_TO_METERS * 10) / 10);
        setWidth((prev) => Math.round(prev * FEET_TO_METERS * 10) / 10);
        setArea((prev) => Math.round(prev * SQ_FT_TO_SQ_METERS));
        setDepth((prev) => Math.round(prev * 2.5 * 10) / 10);
      } else {
        setLength((prev) => Math.round(prev * METERS_TO_FEET));
        setWidth((prev) => Math.round(prev * METERS_TO_FEET));
        setArea((prev) => Math.round(prev * SQ_METERS_TO_SQ_FT));
        setDepth((prev) => Math.round(prev / 2.5));
      }
      prevUnitRef.current = unitSystem;
    }
  }, [unitSystem]);

  const selectedMulch = MULCH_RATES[mulchType] || MULCH_RATES.hardwood;

  // Calculation Engine
  const isMetric = unitSystem === 'metric';
  const displayLengthUnit = isMetric ? 'meters' : 'feet';
  const displayAreaUnit = isMetric ? 'm²' : 'sq ft';
  const displayDepthUnit = isMetric ? 'cm' : 'inches';

  let totalSqFt = 0;
  let totalAreaDisplay = 0;
  let cubicFeet = 0;
  let cubicYards = 0;
  let roundedCubicYards = 0;
  let cubicMeters = 0;
  let roundedCubicMeters = 0;
  let bags2cuFt = 0;
  let bags3cuFt = 0;
  let bags50L = 0;
  let bags60L = 0;

  if (isMetric) {
    totalAreaDisplay = calcMode === 'dimensions' ? Math.max(0, length * width) : Math.max(0, area);
    totalSqFt = totalAreaDisplay * SQ_METERS_TO_SQ_FT;
    cubicMeters = totalAreaDisplay * (depth / 100);
    roundedCubicMeters = Math.ceil(cubicMeters * 10) / 10;
    cubicFeet = cubicMeters * 35.3147;
    cubicYards = cubicMeters * CU_METERS_TO_CU_YARDS;
    roundedCubicYards = Math.ceil(cubicYards * 10) / 10;
    bags50L = Math.ceil((cubicMeters * 1000) / 50);
    bags60L = Math.ceil((cubicMeters * 1000) / 60);
  } else {
    totalAreaDisplay = calcMode === 'dimensions' ? Math.max(0, length * width) : Math.max(0, area);
    totalSqFt = totalAreaDisplay;
    cubicFeet = totalSqFt * (depth / 12);
    cubicYards = totalSqFt > 0 ? (totalSqFt * depth) / 324 : 0;
    roundedCubicYards = Math.ceil(cubicYards * 10) / 10;
    cubicMeters = cubicYards * 0.764555;
    roundedCubicMeters = Math.ceil(cubicMeters * 10) / 10;
    bags2cuFt = Math.ceil(cubicFeet / 2);
    bags3cuFt = Math.ceil(cubicFeet / 3);
  }

  // Costs
  const bulkMaterialCost = roundedCubicYards * selectedMulch.bulkYdPrice;
  const deliveryFee = includeDelivery && roundedCubicYards > 0 ? MULCH_FEES.deliveryFee : 0;
  const baggedMaterialCost = isMetric
    ? bags50L * (selectedMulch.bag2cuPrice * 0.88)
    : bags2cuFt * selectedMulch.bag2cuPrice;
  const laborCost = includeLabor ? roundedCubicYards * MULCH_FEES.spreadingLaborPerCuYd : 0;
  const totalBulkInstalled = bulkMaterialCost + deliveryFee + laborCost;
  const totalBaggedDIY = baggedMaterialCost;

  const handlePrint = () => window.print();

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
      {/* Header */}
      <div className="bg-stone-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <Calculator className="w-3.5 h-3.5" />
          <span>Material Volume & Bag Estimator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Mulch Calculator (Cubic Yards & Bags)
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          Calculate the exact cubic yards and bags of mulch needed for your flower beds, trees, and borders. Compare bulk delivery versus bagged retail costs instantly.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* Dimension Mode */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                1. Garden Bed Area
              </label>
              <div className="flex items-center bg-stone-200/70 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setCalcMode('dimensions')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    calcMode === 'dimensions' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Length &times; Width
                </button>
                <button
                  type="button"
                  onClick={() => setCalcMode('area')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    calcMode === 'area' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Total {isMetric ? 'm²' : 'Sq Ft'}
                </button>
              </div>
            </div>

            {calcMode === 'dimensions' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Bed Length ({displayLengthUnit})
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
                    Bed Width ({displayLengthUnit})
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
            ) : (
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Total Bed Area ({displayAreaUnit})
                </label>
                <input
                  type="number"
                  min="1"
                  value={area}
                  onChange={(e) => setArea(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-xs text-stone-600 bg-white px-3.5 py-2 rounded-xl border border-stone-200">
              <span>Total Area:</span>
              <span className="font-bold text-emerald-800">
                {isMetric
                  ? `${totalAreaDisplay} m² (${Math.round(totalSqFt)} sq ft)`
                  : `${totalSqFt} sq ft (${(totalSqFt * 0.0929).toFixed(1)} m²)`}
              </span>
            </div>
          </div>

          {/* Depth Selection */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700">
                2. Mulch Layer Depth
              </label>
              <span className="text-xs font-bold text-emerald-700">
                {depth} {displayDepthUnit}
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 mb-3">
              {(isMetric ? [2.5, 5, 7.5, 10] : [1, 2, 3, 4]).map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDepth(d)}
                  className={`py-2 text-xs rounded-xl font-semibold border transition-all cursor-pointer ${
                    depth === d
                      ? 'bg-emerald-700 text-white border-emerald-700 shadow-xs'
                      : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                  }`}
                >
                  {d}{displayDepthUnit === 'inches' ? '"' : 'cm'} {d === (isMetric ? 7.5 : 3) ? '(Ideal)' : ''}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-stone-500">
              * Recommended: {isMetric ? '7.5 cm (3 inches)' : '3 inches'} for weed suppression and moisture retention. Use {isMetric ? '5 cm (2 inches)' : '2 inches'} if top-dressing existing mulch.
            </p>
          </div>

          {/* Mulch Variety */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              3. Mulch Variety & Pricing
            </label>
            <select
              value={mulchType}
              onChange={(e) => setMulchType(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            >
              {Object.entries(MULCH_RATES).map(([k, val]) => (
                <option key={k} value={k}>
                  {val.name} – {isMetric ? `$${Math.round(val.bulkYdPrice * 1.30795)}/m³ bulk | $${(val.bag2cuPrice * 0.88).toFixed(2)}/50L bag` : `$${val.bulkYdPrice}/cu yd bulk | $${val.bag2cuPrice.toFixed(2)}/2 cu ft bag`}
                </option>
              ))}
            </select>

            <div className="mt-4 pt-3 border-t border-stone-200 flex flex-wrap gap-4 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeDelivery}
                  onChange={(e) => setIncludeDelivery(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Include Local Bulk Delivery (${MULCH_FEES.deliveryFee})</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeLabor}
                  onChange={(e) => setIncludeLabor(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Include Spreading Labor (${MULCH_FEES.spreadingLaborPerCuYd}/yd)</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output Panel (5 cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-800 sticky top-24 print-sheet">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Mulch Requirements
              </span>
              <span className="text-xs text-stone-400">
                {isMetric ? `${totalAreaDisplay} m² @ ${depth} cm` : `${totalSqFt} sq ft @ ${depth}" depth`}
              </span>
            </div>

            {/* Primary Volume Metric */}
            <div className="my-5 bg-stone-800/80 rounded-2xl p-5 text-center border border-stone-700 animate-result-card">
              <span className="text-xs text-stone-400 block mb-1">Total Volume Required</span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                <AnimatedPrice value={isMetric ? roundedCubicMeters : roundedCubicYards} prefix="" decimals={1} />{' '}
                <span className="text-xl font-normal text-emerald-400">
                  {isMetric ? 'Cubic Meters' : 'Cubic Yards'}
                </span>
              </div>
              <div className="text-xs text-stone-300 mt-2 font-medium">
                {isMetric ? (
                  <>
                    Equals <strong className="text-white">{roundedCubicYards} Cubic Yards</strong> ({Math.round(cubicFeet)} cu ft)
                  </>
                ) : (
                  <>
                    Equals <strong className="text-white">{Math.round(cubicFeet)} Cubic Feet</strong> ({(cubicYards * 0.764555).toFixed(1)} m³)
                  </>
                )}
              </div>
            </div>

            {/* Bags Breakdown */}
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-stone-800/60 rounded-xl p-3 text-center border border-stone-700">
                <span className="text-[11px] text-stone-400 block">
                  {isMetric ? '50-Liter Bags' : '2 Cu Ft Bags'}
                </span>
                <span className="text-2xl font-bold text-white">
                  <AnimatedPrice value={isMetric ? bags50L : bags2cuFt} prefix="" decimals={0} />
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">
                  bags (<AnimatedPrice value={baggedMaterialCost} />)
                </span>
              </div>
              <div className="bg-stone-800/60 rounded-xl p-3 text-center border border-stone-700">
                <span className="text-[11px] text-stone-400 block">
                  {isMetric ? '60-Liter Bags' : '3 Cu Ft Bags'}
                </span>
                <span className="text-2xl font-bold text-white">
                  <AnimatedPrice value={isMetric ? bags60L : bags3cuFt} prefix="" decimals={0} />
                </span>
                <span className="text-[10px] text-stone-400 block mt-0.5">large bags</span>
              </div>
            </div>

            {/* Bulk vs Bagged Comparison */}
            <div className="bg-stone-800/40 rounded-xl p-3.5 border border-stone-700/80 text-xs space-y-2 mb-5">
              <div className="flex justify-between items-center text-stone-300">
                <span>
                  Bulk Mulch ({isMetric ? `${roundedCubicMeters} m³` : `${roundedCubicYards} yds`}):
                </span>
                <span className="font-semibold text-white"><AnimatedPrice value={bulkMaterialCost} /></span>
              </div>
              {includeDelivery && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Delivery fee:</span>
                  <span><AnimatedPrice value={deliveryFee} /></span>
                </div>
              )}
              {includeLabor && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Spreading labor:</span>
                  <span><AnimatedPrice value={laborCost} /></span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-700 flex justify-between items-center font-bold text-emerald-400 text-sm">
                <span>Bulk Installed Total:</span>
                <span><AnimatedPrice value={totalBulkInstalled} /></span>
              </div>
            </div>

            <p className="text-[11px] text-stone-400 italic mb-4">
              * Rule of thumb: If you need {isMetric ? '2.5 or more cubic meters (45+ bags)' : '3 or more cubic yards (40+ bags)'}, ordering bulk delivery is almost always more economical and saves heavy hauling.
            </p>

            <div className="grid grid-cols-2 gap-2 no-print">
              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Specs</span>
              </button>
              {onNavigate && (
                <button
                  onClick={() => onNavigate('/guides/mulch-landscaping-cost/')}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Mulch Pricing Guide &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
