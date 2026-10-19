import React, { useState, useEffect, useRef } from 'react';
import { PenTool, Calculator, Printer, CheckCircle2 } from 'lucide-react';
import {
  formatCurrency,
  DESIGN_TIERS,
  DESIGN_FEES,
  SQ_METERS_TO_SQ_FT,
} from '../../data/pricingData';
import { UnitSystem } from '../../types';
import { AnimatedPrice } from '../common/AnimatedPrice';

interface LandscapeDesignCalculatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

export const LandscapeDesignCalculator: React.FC<LandscapeDesignCalculatorProps> = ({
  unitSystem,
  onNavigate,
}) => {
  const isMetric = unitSystem === 'metric';
  const [areaInput, setAreaInput] = useState<number>(isMetric ? 500 : 5000);
  const [designScope, setDesignScope] = useState<'front' | 'back' | 'full'>('full');
  const [designTier, setDesignTier] = useState<string>('master2d');
  const [include3dRendering, setInclude3dRendering] = useState<boolean>(true);
  const [includeSiteConsultation, setIncludeSiteConsultation] = useState<boolean>(true);
  const [includePermitPlan, setIncludePermitPlan] = useState<boolean>(false);

  const prevUnitRef = useRef<UnitSystem>(unitSystem);

  useEffect(() => {
    if (prevUnitRef.current !== unitSystem) {
      if (unitSystem === 'metric') {
        setAreaInput((prev) => Math.max(50, Math.round(prev / SQ_METERS_TO_SQ_FT)));
      } else {
        setAreaInput((prev) => Math.max(500, Math.round(prev * SQ_METERS_TO_SQ_FT)));
      }
      prevUnitRef.current = unitSystem;
    }
  }, [unitSystem]);

  const selectedTier = DESIGN_TIERS[designTier] || DESIGN_TIERS.master2d;

  // Convert area to sq ft for calculating base rate fees
  const lotSqFt = isMetric ? areaInput * SQ_METERS_TO_SQ_FT : areaInput;

  // Scope factor
  const scopeFactor = designScope === 'front' ? 0.6 : designScope === 'back' ? 0.75 : 1.0;
  const effectiveSqFt = lotSqFt * scopeFactor;

  // Calculation
  const baseDesignFee = selectedTier.baseFee + effectiveSqFt * selectedTier.perSqFtRate;
  const consultationFee = includeSiteConsultation ? DESIGN_FEES.siteConsultationFee : 0;
  const renderings3dAddon =
    include3dRendering && designTier !== 'luxury3d' ? DESIGN_FEES.renderings3dAddon : 0;
  const permitPlansAddon = includePermitPlan ? DESIGN_FEES.permitPlansAddon : 0;

  const totalDesignFee = baseDesignFee + consultationFee + renderings3dAddon + permitPlansAddon;

  const metricPresets = [250, 500, 750, 1500];
  const usPresets = [2500, 5000, 8000, 15000];
  const activePresets = isMetric ? metricPresets : usPresets;

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
      <div className="bg-stone-900 text-white p-6 sm:p-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
          <PenTool className="w-3.5 h-3.5" />
          <span>Architectural & CAD Planning Tool</span>
        </div>
        <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-white">
          Landscape Design Cost Calculator
        </h2>
        <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
          Estimate professional landscape design fees for 2D scaled master plans, 3D architectural virtual tours, site surveys, and permit blueprints.
        </p>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          {/* Lot Area */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-2">
              1. Project Area / Yard Size ({isMetric ? 'Square Meters' : 'Square Feet'})
            </label>
            <input
              type="number"
              min={isMetric ? '50' : '500'}
              max={isMetric ? '10000' : '100000'}
              value={areaInput}
              onChange={(e) => setAreaInput(Math.max(10, parseFloat(e.target.value) || 0))}
              className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-base font-bold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 mb-3"
            />
            <div className="flex gap-2">
              {activePresets.map((preset) => (
                <button
                  key={preset}
                  type="button"
                  onClick={() => setAreaInput(preset)}
                  className={`px-3 py-1 text-xs rounded-lg border transition-all cursor-pointer ${
                    areaInput === preset
                      ? 'bg-emerald-700 text-white border-emerald-700'
                      : 'bg-white text-stone-700 border-stone-300'
                  }`}
                >
                  {preset.toLocaleString()} {isMetric ? 'm²' : 'sq ft'}
                </button>
              ))}
            </div>
            <div className="mt-3 text-xs text-stone-500">
              {isMetric
                ? `Calculated area: ${areaInput.toLocaleString()} m² (≈ ${lotSqFt.toFixed(0)} sq ft)`
                : `Calculated area: ${lotSqFt.toLocaleString()} sq ft (≈ ${(lotSqFt / SQ_METERS_TO_SQ_FT).toFixed(1)} m²)`}
            </div>
          </div>

          {/* Scope */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              2. Design Scope
            </label>
            <div className="grid grid-cols-3 gap-2 text-xs">
              <button
                type="button"
                onClick={() => setDesignScope('front')}
                className={`p-3 rounded-xl border font-medium cursor-pointer ${
                  designScope === 'front'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Front Yard Only (Curb Appeal)
              </button>
              <button
                type="button"
                onClick={() => setDesignScope('back')}
                className={`p-3 rounded-xl border font-medium cursor-pointer ${
                  designScope === 'back'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Backyard Only (Outdoor Living)
              </button>
              <button
                type="button"
                onClick={() => setDesignScope('full')}
                className={`p-3 rounded-xl border font-medium cursor-pointer ${
                  designScope === 'full'
                    ? 'bg-emerald-700 text-white border-emerald-700 font-bold'
                    : 'bg-white text-stone-700 border-stone-200'
                }`}
              >
                Full Property (Master Estate Plan)
              </button>
            </div>
          </div>

          {/* Design Tier */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
              3. Design Plan Deliverables
            </label>
            <div className="space-y-2.5">
              {Object.entries(DESIGN_TIERS).map(([key, val]) => (
                <label
                  key={key}
                  className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                    designTier === key
                      ? 'bg-emerald-50/70 border-emerald-600 shadow-xs'
                      : 'bg-white border-stone-200 hover:border-stone-300'
                  }`}
                >
                  <input
                    type="radio"
                    name="designTier"
                    value={key}
                    checked={designTier === key}
                    onChange={(e) => setDesignTier(e.target.value)}
                    className="mt-1 text-emerald-600"
                  />
                  <div>
                    <span className="font-semibold text-sm text-stone-900">{val.name}</span>
                    <p className="text-xs text-stone-500 mt-0.5">{val.desc}</p>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-4 pt-3 border-t border-stone-200 space-y-2 text-xs">
              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includeSiteConsultation}
                  onChange={(e) => setIncludeSiteConsultation(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>
                  Include In-Person On-Site Property Walkthrough & Laser Survey (
                  {formatCurrency(DESIGN_FEES.siteConsultationFee)})
                </span>
              </label>

              {designTier !== 'luxury3d' && (
                <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                  <input
                    type="checkbox"
                    checked={include3dRendering}
                    onChange={(e) => setInclude3dRendering(e.target.checked)}
                    className="rounded-sm text-emerald-600"
                  />
                  <span>
                    Add 3D Colored Perspective Renderings (Day & Night) (+
                    {formatCurrency(DESIGN_FEES.renderings3dAddon)})
                  </span>
                </label>
              )}

              <label className="flex items-center gap-2 cursor-pointer text-stone-700">
                <input
                  type="checkbox"
                  checked={includePermitPlan}
                  onChange={(e) => setIncludePermitPlan(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>
                  Include Engineering & HOA / Municipal Permitting Set (+
                  {formatCurrency(DESIGN_FEES.permitPlansAddon)})
                </span>
              </label>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-800 sticky top-24 print-sheet">
            <div className="flex items-center justify-between pb-3 border-b border-stone-800">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
                Design Fee Estimate
              </span>
              <span className="text-xs text-stone-400">
                {isMetric ? `${areaInput} m²` : `${lotSqFt.toLocaleString()} sq ft`} ({designScope})
              </span>
            </div>

            <div className="my-5 bg-stone-800/80 rounded-2xl p-5 text-center border border-stone-700 animate-result-card">
              <span className="text-xs text-stone-400 block mb-1">Estimated Design Package Fee</span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                <AnimatedPrice value={totalDesignFee} />
              </div>
              <div className="text-xs text-stone-300 mt-2 font-medium">
                Typical range: <AnimatedPrice value={totalDesignFee * 0.85} /> – <AnimatedPrice value={totalDesignFee * 1.2} />
              </div>
            </div>

            <div className="space-y-2.5 text-xs text-stone-300 border-t border-b border-stone-800 py-3 mb-4">
              <div className="flex justify-between items-center">
                <span>{selectedTier.name}:</span>
                <span className="font-semibold text-white"><AnimatedPrice value={baseDesignFee} /></span>
              </div>
              {includeSiteConsultation && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>Site Consultation & Survey:</span>
                  <span><AnimatedPrice value={consultationFee} /></span>
                </div>
              )}
              {include3dRendering && designTier !== 'luxury3d' && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>3D Colored Renderings:</span>
                  <span><AnimatedPrice value={renderings3dAddon} /></span>
                </div>
              )}
              {includePermitPlan && (
                <div className="flex justify-between items-center text-stone-400">
                  <span>HOA / Permit Documentation:</span>
                  <span>{formatCurrency(permitPlansAddon)}</span>
                </div>
              )}
            </div>

            <div className="p-3 bg-stone-800/50 rounded-xl text-[11px] text-stone-400 mb-5">
              * Many landscape design-build contractors credit 50% to 100% of the design fee toward your installation contract if they build the project.
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
                  onClick={() => onNavigate('/guides/how-much-does-landscape-design-cost/')}
                  className="p-2.5 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold flex items-center justify-center gap-1 transition-colors cursor-pointer"
                >
                  <span>Design Guide &rarr;</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
