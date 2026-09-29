import React, { useState } from 'react';
import { Trees, Calculator, Printer, ArrowRight } from 'lucide-react';
import { formatCurrency, TREE_SIZES, TREE_FEES } from '../../data/pricingData';
import { UnitSystem } from '../../types';

interface TreePlantingCalculatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

export const TreePlantingCalculator: React.FC<TreePlantingCalculatorProps> = ({
  unitSystem,
  onNavigate,
}) => {
  const [treeQuantity, setTreeQuantity] = useState<number>(3);
  const [treeSize, setTreeSize] = useState<string>('15gal');
  const [treeType, setTreeType] = useState<string>('shade');
  const [includeStaking, setIncludeStaking] = useState<boolean>(true);
  const [includeSoilCompost, setIncludeSoilCompost] = useState<boolean>(true);
  const [includeDelivery, setIncludeDelivery] = useState<boolean>(true);

  const selectedSize = TREE_SIZES[treeSize] || TREE_SIZES['15gal'];

  // Tree specimen cost
  const treeBaseCost = treeQuantity * selectedSize.treePrice;

  // Planting labor ($55/hour standard)
  const plantingLaborCost = treeQuantity * selectedSize.laborHours * TREE_FEES.plantingLaborHourlyRate;

  // Soil amendments (compost & root activator)
  const compostCost = includeSoilCompost ? treeQuantity * TREE_FEES.soilCompostPerTree : 0;

  // Staking & mulch collar kit
  const stakingCost = includeStaking ? treeQuantity * TREE_FEES.stakingKitPerTree : 0;

  // Heavy nursery delivery
  const deliveryCost = includeDelivery
    ? treeQuantity > 2 || treeSize === '24box' || treeSize === '36box'
      ? TREE_FEES.deliveryHeavy
      : TREE_FEES.deliveryStandard
    : 0;

  const totalCost = treeBaseCost + plantingLaborCost + compostCost + stakingCost + deliveryCost;
  const costPerTree = treeQuantity > 0 ? totalCost / treeQuantity : 0;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
      <div className="bg-stone-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <Trees className="w-3.5 h-3.5" />
          <span>Softscape & Arborist Estimator</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Tree Planting Cost Calculator
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          Estimate full nursery specimen costs, machine excavation, rich compost amendments, tree staking kits, and professional landscaper planting labor.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {/* Quantity */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
              1. Number of Trees to Plant
            </label>
            <div className="flex items-center gap-4">
              <input
                type="number"
                min="1"
                max="100"
                value={treeQuantity}
                onChange={(e) => setTreeQuantity(Math.max(1, parseInt(e.target.value, 10) || 1))}
                className="w-32 bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-base font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
              />
              <span className="text-xs text-stone-600">
                (Bulk discounts often apply for 5+ trees from nurseries)
              </span>
            </div>
          </div>

          {/* Tree Size */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              2. Tree Size & Container Class
            </label>
            <div className="space-y-2.5">
              {Object.entries(TREE_SIZES).map(([key, val]) => (
                <label
                  key={key}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    treeSize === key
                      ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="treeSize"
                    value={key}
                    checked={treeSize === key}
                    onChange={(e) => setTreeSize(e.target.value)}
                    className="mt-1 text-emerald-600"
                  />
                  <div className="w-full">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-sm text-stone-900">{val.name}</span>
                      <span className="text-xs font-bold text-emerald-700">
                        ${val.treePrice} / tree
                      </span>
                    </div>
                    <p className="text-xs text-stone-500 mt-0.5">{val.desc}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              3. Soil Amendments, Staking & Delivery
            </label>
            <div className="space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeSoilCompost}
                  onChange={(e) => setIncludeSoilCompost(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Organic planting compost & root mycorrhizae fertilizer ($22/tree)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeStaking}
                  onChange={(e) => setIncludeStaking(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Lodgepole tree staking kit, canvas ties & 3" mulch watering ring ($18/tree)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeDelivery}
                  onChange={(e) => setIncludeDelivery(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Local nursery flatbed delivery with lift-gate service</span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-800 sticky top-24 print-sheet">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Tree Planting Estimate
              </span>
              <span className="text-xs text-stone-400">{treeQuantity} trees ({selectedSize.name.split(' ')[0]})</span>
            </div>

            <div className="my-5 bg-stone-800/80 rounded-2xl p-5 text-center border border-stone-700">
              <span className="text-xs text-stone-400 block mb-1">Total Installed Investment</span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                {formatCurrency(totalCost)}
              </div>
              <div className="text-xs text-emerald-400 mt-2 font-semibold">
                Average {formatCurrency(costPerTree)} per tree fully installed
              </div>
              <div className="mt-2 text-xs text-stone-300">
                Range: {formatCurrency(totalCost * 0.9)} – {formatCurrency(totalCost * 1.15)}
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-stone-300 border-t border-b border-stone-800 py-3 mb-4">
              <div className="flex justify-between items-center">
                <span>Nursery Trees ({treeQuantity}x):</span>
                <span className="font-semibold text-white">{formatCurrency(treeBaseCost)}</span>
              </div>
              <div className="flex justify-between items-center">
                <span>Excavation & Planting Labor:</span>
                <span className="font-semibold text-white">{formatCurrency(plantingLaborCost)}</span>
              </div>
              {includeSoilCompost && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Soil Amendments & Starter:</span>
                  <span>{formatCurrency(compostCost)}</span>
                </div>
              )}
              {includeStaking && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Stakes, Ties & Mulch Rings:</span>
                  <span>{formatCurrency(stakingCost)}</span>
                </div>
              )}
              {includeDelivery && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Flatbed Nursery Delivery:</span>
                  <span>{formatCurrency(deliveryCost)}</span>
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
                  onClick={() => onNavigate('/mulch-calculator/')}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Mulch Calculator &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
