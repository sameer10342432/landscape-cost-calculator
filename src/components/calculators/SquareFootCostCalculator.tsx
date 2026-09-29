import React, { useState, useEffect, useRef } from 'react';
import { Ruler, Calculator, Printer, CheckCircle, ArrowRight } from 'lucide-react';
import { formatCurrency, SQFT_TIERS, SQ_METERS_TO_SQ_FT } from '../../data/pricingData';
import { UnitSystem } from '../../types';

interface SquareFootCostCalculatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

export const SquareFootCostCalculator: React.FC<SquareFootCostCalculatorProps> = ({
  unitSystem,
  onNavigate,
}) => {
  const isMetric = unitSystem === 'metric';
  const [area, setArea] = useState<number>(isMetric ? 100 : 1200);

  const prevUnitRef = useRef<UnitSystem>(unitSystem);

  useEffect(() => {
    if (prevUnitRef.current !== unitSystem) {
      if (unitSystem === 'metric') {
        setArea((prev) => Math.max(10, Math.round(prev / SQ_METERS_TO_SQ_FT)));
      } else {
        setArea((prev) => Math.max(100, Math.round(prev * SQ_METERS_TO_SQ_FT)));
      }
      prevUnitRef.current = unitSystem;
    }
  }, [unitSystem]);

  const metricPresets = [50, 100, 250, 500, 1000];
  const usPresets = [500, 1000, 2500, 5000, 10000];
  const activePresets = isMetric ? metricPresets : usPresets;

  const unitLabel = isMetric ? 'm²' : 'sq ft';
  const rateMultiplier = isMetric ? SQ_METERS_TO_SQ_FT : 1;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
      <div className="bg-stone-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <Ruler className="w-3.5 h-3.5" />
          <span>{isMetric ? 'Square Meter' : 'Square Footage'} Pricing Matrix</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Landscaping Cost Per {isMetric ? 'Square Meter' : 'Square Foot'} Calculator
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          Enter your total yard area in {isMetric ? 'square meters (m²)' : 'square feet (sq ft)'} to instantly view benchmark contractor costs across basic softscaping, intermediate mixed plantings, and hardscape-heavy luxury outdoor living.
        </p>
      </div>

      <div className="p-6 sm:p-8">
        {/* Input Bar */}
        <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 mb-8 max-w-2xl mx-auto text-center">
          <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
            Enter Total Yard Area ({unitLabel})
          </label>
          <div className="flex items-center justify-center gap-4">
            <input
              type="number"
              min={isMetric ? '5' : '50'}
              max={isMetric ? '5000' : '50000'}
              value={area}
              onChange={(e) => setArea(Math.max(1, parseFloat(e.target.value) || 0))}
              className="w-48 bg-white border border-stone-300 rounded-xl px-4 py-3 text-2xl font-bold text-center text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <span className="text-sm font-semibold text-stone-500">
              {isMetric
                ? `m² (≈ ${(area * SQ_METERS_TO_SQ_FT).toFixed(0)} sq ft)`
                : `sq ft (≈ ${(area / SQ_METERS_TO_SQ_FT).toFixed(0)} m²)`}
            </span>
          </div>

          <div className="flex justify-center gap-2 mt-3">
            {activePresets.map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setArea(preset)}
                className={`px-3 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                  area === preset
                    ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                    : 'bg-white text-stone-700 border-stone-300 hover:bg-stone-100'
                }`}
              >
                {preset.toLocaleString()} {unitLabel}
              </button>
            ))}
          </div>
        </div>

        {/* 3 Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {SQFT_TIERS.map((tier) => {
            const lowRate = tier.rangePerSqFt[0] * rateMultiplier;
            const highRate = tier.rangePerSqFt[1] * rateMultiplier;
            const avgRate = tier.typicalPerSqFt * rateMultiplier;

            const lowTotal = area * lowRate;
            const highTotal = area * highRate;
            const avgTotal = area * avgRate;

            return (
              <div
                key={tier.id}
                className="bg-white rounded-2xl border border-stone-200 p-6 flex flex-col justify-between shadow-xs hover:border-emerald-300 transition-all"
              >
                <div>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700">
                    {formatCurrency(lowRate)} – {formatCurrency(highRate)} / {unitLabel}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-stone-900 mt-1 mb-3">
                    {tier.name}
                  </h3>

                  <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 mb-4 text-center">
                    <span className="text-xs text-stone-500 block">Estimated Project Range</span>
                    <div className="text-2xl font-bold text-stone-900 mt-0.5">
                      {formatCurrency(lowTotal)} – {formatCurrency(highTotal)}
                    </div>
                    <span className="text-[11px] text-emerald-700 font-semibold block mt-1">
                      Avg Benchmark: {formatCurrency(avgTotal)}
                    </span>
                  </div>

                  <p className="text-xs text-stone-600 mb-3 italic">{tier.idealFor}</p>

                  <ul className="space-y-2 text-xs text-stone-600 mb-6">
                    {tier.features.map((f, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {onNavigate && (
                  <button
                    onClick={() => onNavigate('/')}
                    className="w-full py-2.5 px-4 rounded-xl bg-stone-100 hover:bg-emerald-50 hover:text-emerald-800 text-stone-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>Customize This Tier</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
