import React, { useState, useRef, useEffect } from 'react';
import {
  Calculator,
  RefreshCw,
  Printer,
  Download,
  Share2,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  TrendingUp,
  Settings2,
  Building,
  Ruler,
  Layers,
  Users,
  DollarSign,
  Copy,
} from 'lucide-react';
import { UnitSystem, EstimateResult } from '../../types';
import { AnimatedPrice } from '../common/AnimatedPrice';
import {
  PROJECT_TYPES,
  MATERIALS_CATALOG,
  REGIONAL_FACTORS,
  formatCurrency,
  sqFtToSqMeters,
  sqMetersToSqFt,
  METERS_TO_FEET,
  SQ_METERS_TO_SQ_FT,
} from '../../data/pricingData';

interface MainCalculatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

export const MainLandscapingCalculator: React.FC<MainCalculatorProps> = ({
  unitSystem,
  onNavigate,
}) => {
  // Area Mode
  const [areaMode, setAreaMode] = useState<'rect' | 'direct' | 'irregular'>('rect');
  const [length, setLength] = useState<number>(unitSystem === 'metric' ? 10 : 30);
  const [width, setWidth] = useState<number>(unitSystem === 'metric' ? 6 : 20);
  const [directSqFt, setDirectSqFt] = useState<number>(unitSystem === 'metric' ? 60 : 600);

  // Irregular sub-areas
  const [irregularArea1, setIrregularArea1] = useState<number>(unitSystem === 'metric' ? 40 : 400);
  const [irregularArea2, setIrregularArea2] = useState<number>(unitSystem === 'metric' ? 20 : 250);

  // Project Type
  const [selectedProjectTypeId, setSelectedProjectTypeId] = useState<string>('full-backyard');

  // Primary Material
  const [selectedMaterialId, setSelectedMaterialId] = useState<string>('concrete-pavers');
  const [includeSecondaryMaterial, setIncludeSecondaryMaterial] = useState<boolean>(true);
  const [secondaryMaterialId, setSecondaryMaterialId] = useState<string>('shredded-mulch');

  // Region
  const [selectedRegion, setSelectedRegion] = useState<string>('national');

  // Labour Customization
  const [laborMethod, setLaborMethod] = useState<'hourly' | 'sqft'>('hourly');
  const [hourlyRate, setHourlyRate] = useState<number>(55);
  const [customLaborHours, setCustomLaborHours] = useState<number>(32);
  const [ratePerSqFt, setRatePerSqFt] = useState<number>(unitSystem === 'metric' ? 38 : 3.5);

  // Additional Costs
  const [includeExcavation, setIncludeExcavation] = useState<boolean>(true);
  const [includeDelivery, setIncludeDelivery] = useState<boolean>(true);
  const [includeDisposal, setIncludeDisposal] = useState<boolean>(true);
  const [includePermits, setIncludePermits] = useState<boolean>(false);
  const [wasteFactor, setWasteFactor] = useState<number>(10); // 10%

  // Contractor / Profit Mode
  const [showContractorMode, setShowContractorMode] = useState<boolean>(false);
  const [overheadPercent, setOverheadPercent] = useState<number>(10);
  const [profitMarginPercent, setProfitMarginPercent] = useState<number>(15);

  // Feedback states
  const [copiedLink, setCopiedLink] = useState<boolean>(false);

  // Handle unit system switching with precision preservation
  const prevUnitRef = useRef<UnitSystem>(unitSystem);

  useEffect(() => {
    if (prevUnitRef.current !== unitSystem) {
      if (unitSystem === 'metric') {
        // US -> Metric conversion
        setLength((prev) => Math.round((prev / METERS_TO_FEET) * 10) / 10);
        setWidth((prev) => Math.round((prev / METERS_TO_FEET) * 10) / 10);
        setDirectSqFt((prev) => Math.round(prev / SQ_METERS_TO_SQ_FT));
        setIrregularArea1((prev) => Math.round(prev / SQ_METERS_TO_SQ_FT));
        setIrregularArea2((prev) => Math.round(prev / SQ_METERS_TO_SQ_FT));
        setRatePerSqFt((prev) => Math.round(prev * SQ_METERS_TO_SQ_FT * 10) / 10);
      } else {
        // Metric -> US conversion
        setLength((prev) => Math.round(prev * METERS_TO_FEET));
        setWidth((prev) => Math.round(prev * METERS_TO_FEET));
        setDirectSqFt((prev) => Math.round(prev * SQ_METERS_TO_SQ_FT));
        setIrregularArea1((prev) => Math.round(prev * SQ_METERS_TO_SQ_FT));
        setIrregularArea2((prev) => Math.round(prev * SQ_METERS_TO_SQ_FT));
        setRatePerSqFt((prev) => Math.round((prev / SQ_METERS_TO_SQ_FT) * 10) / 10);
      }
      prevUnitRef.current = unitSystem;
    }
  }, [unitSystem]);

  // Calculate Square Footage & Metric Display Area
  let calculatedSqFt = 0;
  let displayArea = 0;

  if (unitSystem === 'metric') {
    // User enters Metric units (meters, m²)
    if (areaMode === 'rect') {
      displayArea = Math.max(0, length * width);
      // 1m = 3.28084 ft => (length * 3.28084) * (width * 3.28084) ≈ displayArea * 10.7639
      calculatedSqFt = (Math.max(0, length) * METERS_TO_FEET) * (Math.max(0, width) * METERS_TO_FEET);
    } else if (areaMode === 'direct') {
      displayArea = Math.max(0, directSqFt);
      calculatedSqFt = displayArea * SQ_METERS_TO_SQ_FT;
    } else {
      displayArea = Math.max(0, irregularArea1 + irregularArea2);
      calculatedSqFt = displayArea * SQ_METERS_TO_SQ_FT;
    }
  } else {
    // User enters US units (feet, sq ft)
    if (areaMode === 'rect') {
      calculatedSqFt = Math.max(0, length * width);
    } else if (areaMode === 'direct') {
      calculatedSqFt = Math.max(0, directSqFt);
    } else {
      calculatedSqFt = Math.max(0, irregularArea1 + irregularArea2);
    }
    displayArea = calculatedSqFt;
  }

  const unitLabel = unitSystem === 'metric' ? 'm²' : 'sq ft';
  const lengthUnitLabel = unitSystem === 'metric' ? 'meters' : 'feet';

  // Get active configurations
  const projectType = PROJECT_TYPES.find((p) => p.id === selectedProjectTypeId) || PROJECT_TYPES[0];
  const primaryMaterial = MATERIALS_CATALOG.find((m) => m.id === selectedMaterialId) || MATERIALS_CATALOG[0];
  const secondaryMaterial = MATERIALS_CATALOG.find((m) => m.id === secondaryMaterialId) || MATERIALS_CATALOG[0];
  const regionConfig = REGIONAL_FACTORS[selectedRegion] || REGIONAL_FACTORS.national;

  // Calculation Engine
  const wasteMultiplier = 1 + wasteFactor / 100;
  const effectiveArea = calculatedSqFt * wasteMultiplier;

  // 1. Material Cost Calculation
  let baseMatRate = projectType.baseMaterialRatePerSqFt;
  if (primaryMaterial) {
    if (primaryMaterial.unit === 'sq ft' || primaryMaterial.unit === 'sq ft face') {
      baseMatRate = primaryMaterial.defaultRate;
    } else {
      // estimated coverage
      baseMatRate = primaryMaterial.defaultRate / Math.max(1, primaryMaterial.coveragePerUnitSqFt);
    }
  }

  let secondaryMatCost = 0;
  if (includeSecondaryMaterial && secondaryMaterial) {
    const secSqFt = calculatedSqFt * 0.35; // 35% of area allocated to secondary material (e.g. mulch beds around patio)
    const secUnitRate = secondaryMaterial.defaultRate / Math.max(1, secondaryMaterial.coveragePerUnitSqFt);
    secondaryMatCost = secSqFt * secUnitRate;
  }

  const primaryMatCost = effectiveArea * baseMatRate;
  const rawMaterialCost = (primaryMatCost + secondaryMatCost) * regionConfig.multiplier;

  // 2. Labor Cost Calculation
  let rawLaborCost = 0;
  if (laborMethod === 'hourly') {
    // Hours derived from project type standard hours per 100 sq ft
    const estimatedHours = (calculatedSqFt / 100) * projectType.defaultLaborHoursPer100SqFt;
    const finalHours = customLaborHours > 0 ? customLaborHours : estimatedHours;
    rawLaborCost = finalHours * hourlyRate * regionConfig.multiplier;
  } else {
    // In metric mode, ratePerSqFt represents $/m² in UI, convert to $/sq ft for internal calculation
    const effectiveLaborPerSqFt = unitSystem === 'metric' ? ratePerSqFt / SQ_METERS_TO_SQ_FT : ratePerSqFt;
    rawLaborCost = calculatedSqFt * effectiveLaborPerSqFt * regionConfig.multiplier;
  }

  // 3. Additional Costs
  let rawAdditionalCost = 0;
  if (includeExcavation) {
    rawAdditionalCost += calculatedSqFt * 1.25; // grading and prep
  }
  if (includeDelivery) {
    rawAdditionalCost += 120 * regionConfig.multiplier; // standard heavy material delivery
  }
  if (includeDisposal) {
    rawAdditionalCost += 250; // debris container/dump run
  }
  if (includePermits) {
    rawAdditionalCost += 180; // municipal filing
  }

  // 4. Subtotal & Contractor Margins
  const subtotal = rawMaterialCost + rawLaborCost + rawAdditionalCost;
  let contractorMargin = 0;
  if (showContractorMode) {
    const overhead = subtotal * (overheadPercent / 100);
    const profit = (subtotal + overhead) * (profitMarginPercent / 100);
    contractorMargin = overhead + profit;
  }

  const totalEstimate = subtotal + contractorMargin;
  const costPerSqFt = calculatedSqFt > 0 ? totalEstimate / calculatedSqFt : 0;
  const costPerUnit = unitSystem === 'metric'
    ? (displayArea > 0 ? totalEstimate / displayArea : 0)
    : costPerSqFt;
  const lowEstimate = totalEstimate * 0.88;
  const highEstimate = totalEstimate * 1.18;

  // Reset function
  const handleReset = () => {
    if (unitSystem === 'metric') {
      setLength(10);
      setWidth(6);
      setDirectSqFt(60);
      setIrregularArea1(40);
      setIrregularArea2(20);
      setRatePerSqFt(38);
    } else {
      setLength(30);
      setWidth(20);
      setDirectSqFt(600);
      setIrregularArea1(400);
      setIrregularArea2(250);
      setRatePerSqFt(3.5);
    }
    setSelectedProjectTypeId('full-backyard');
    setSelectedMaterialId('concrete-pavers');
    setSelectedRegion('national');
    setHourlyRate(55);
    setCustomLaborHours(32);
    setIncludeExcavation(true);
    setIncludeDelivery(true);
    setIncludeDisposal(true);
    setIncludePermits(false);
    setWasteFactor(10);
    setShowContractorMode(false);
  };

  // Print function
  const handlePrint = () => {
    window.print();
  };

  // Download summary text file
  const handleDownload = () => {
    const summaryText = `=========================================
LANDSCAPE COST ESTIMATE SUMMARY
LandscapeCostCalculator.online
Date: ${new Date().toLocaleDateString()}
=========================================

PROJECT SPECIFICATIONS:
- Project Type: ${projectType.name}
- Total Area: ${
      unitSystem === 'metric'
        ? `${Math.round(displayArea)} m² (${Math.round(calculatedSqFt)} sq ft)`
        : `${Math.round(calculatedSqFt)} sq ft (${Math.round(sqFtToSqMeters(calculatedSqFt))} m²)`
    }
- Primary Material: ${primaryMaterial.name}
- Waste Factor: ${wasteFactor}%
- Regional Adjustment: ${regionConfig.name} (${regionConfig.multiplier}x)

COST BREAKDOWN:
- Estimated Materials: ${formatCurrency(rawMaterialCost)}
- Estimated Labor: ${formatCurrency(rawLaborCost)}
- Site Preparation & Additional: ${formatCurrency(rawAdditionalCost)}
${showContractorMode ? `- Contractor Overhead & Profit: ${formatCurrency(contractorMargin)}\n` : ''}
-----------------------------------------
TOTAL ESTIMATED PROJECT COST: ${formatCurrency(totalEstimate)}
Estimated Cost Per ${unitLabel}: ${formatCurrency(costPerUnit)} / ${unitLabel}
ESTIMATED RANGE: ${formatCurrency(lowEstimate)} – ${formatCurrency(highEstimate)}
-----------------------------------------

DISCLAIMER:
This calculation is for planning and preliminary budgeting purposes only.
Actual contractor bids will vary based on access, terrain, soil, and local supply.
`;

    const blob = new Blob([summaryText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download =
      unitSystem === 'metric'
        ? `landscaping-estimate-${Math.round(displayArea)}m2.txt`
        : `landscaping-estimate-${Math.round(calculatedSqFt)}sqft.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  // Share link
  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 3000);
  };

  return (
    <div className="w-full bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden">
      {/* Tool Header */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
            <Calculator className="w-3.5 h-3.5" />
            <span>Interactive Estimator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-heading font-extrabold tracking-tight text-white">
            Landscaping Cost Calculator
          </h2>
          <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
            Input project dimensions, select materials, and adjust labor rates to generate a comprehensive residential or commercial estimate.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto shrink-0">
          <button
            onClick={() => setShowContractorMode(!showContractorMode)}
            className={`px-3 py-2 text-xs font-semibold rounded-xl flex items-center gap-1.5 transition-colors cursor-pointer ${
              showContractorMode
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-stone-800 text-stone-300 hover:bg-stone-700'
            }`}
            title="Toggle Contractor Profit & Overhead mode"
          >
            <Building className="w-4 h-4" />
            <span>{showContractorMode ? 'Contractor Mode: ON' : 'Contractor Mode'}</span>
          </button>
          <button
            onClick={handleReset}
            className="p-2 text-stone-400 hover:text-white bg-stone-800 hover:bg-stone-700 rounded-xl transition-colors cursor-pointer"
            title="Reset calculator to defaults"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="p-6 sm:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs (7 Cols) */}
        <div className="lg:col-span-7 space-y-6">
          {/* STEP 1: Project Type */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-bold">1</span>
                Project Type
              </label>
              <span className="text-xs text-stone-500 font-medium">
                {projectType.category.toUpperCase()}
              </span>
            </div>

            <select
              value={selectedProjectTypeId}
              onChange={(e) => setSelectedProjectTypeId(e.target.value)}
              className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2.5 text-sm font-medium text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600 focus:border-transparent"
            >
              {PROJECT_TYPES.map((type) => (
                <option key={type.id} value={type.id}>
                  {type.name} (${type.typicalCostPerSqFt[0]} – ${type.typicalCostPerSqFt[1]} / sq ft avg)
                </option>
              ))}
            </select>
            <p className="text-xs text-stone-500 mt-2 italic">
              {projectType.description}
            </p>
          </div>

          {/* STEP 2: Project Area */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-bold">2</span>
                Project Area & Dimensions
              </label>

              {/* Mode switch */}
              <div className="flex items-center bg-stone-200/70 p-0.5 rounded-lg text-xs">
                <button
                  type="button"
                  onClick={() => setAreaMode('rect')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    areaMode === 'rect' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  L &times; W
                </button>
                <button
                  type="button"
                  onClick={() => setAreaMode('direct')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    areaMode === 'direct' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Direct {unitLabel}
                </button>
                <button
                  type="button"
                  onClick={() => setAreaMode('irregular')}
                  className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                    areaMode === 'irregular' ? 'bg-white text-stone-900 font-bold shadow-xs' : 'text-stone-600'
                  }`}
                >
                  Multi-Zone
                </button>
              </div>
            </div>

            {areaMode === 'rect' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Length ({lengthUnitLabel})
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step={unitSystem === 'metric' ? '0.1' : '1'}
                    max="1000"
                    value={length}
                    onChange={(e) => setLength(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Width ({lengthUnitLabel})
                  </label>
                  <input
                    type="number"
                    min="0.1"
                    step={unitSystem === 'metric' ? '0.1' : '1'}
                    max="1000"
                    value={width}
                    onChange={(e) => setWidth(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            {areaMode === 'direct' && (
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  Total Project Area ({unitLabel})
                </label>
                <input
                  type="number"
                  min="10"
                  max="100000"
                  value={directSqFt}
                  onChange={(e) => setDirectSqFt(Math.max(1, parseFloat(e.target.value) || 0))}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                />
              </div>
            )}

            {areaMode === 'irregular' && (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Zone A (Backyard / Patio) ({unitLabel})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={irregularArea1}
                    onChange={(e) => setIrregularArea1(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Zone B (Garden / Edging) ({unitLabel})
                  </label>
                  <input
                    type="number"
                    min="0"
                    value={irregularArea2}
                    onChange={(e) => setIrregularArea2(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>
            )}

            <div className="mt-3 flex items-center justify-between text-xs text-stone-600 bg-white px-3.5 py-2 rounded-xl border border-stone-200">
              <span className="font-medium">Total Area:</span>
              <span className="font-bold text-emerald-800">
                {unitSystem === 'metric'
                  ? `${Math.round(displayArea).toLocaleString()} m² (${Math.round(calculatedSqFt).toLocaleString()} sq ft)`
                  : `${Math.round(calculatedSqFt).toLocaleString()} sq ft (${Math.round(sqFtToSqMeters(calculatedSqFt)).toLocaleString()} m²)`}
              </span>
            </div>
          </div>

          {/* STEP 3: Materials Selection */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-bold">3</span>
                Primary & Accent Materials
              </label>
              <div className="flex items-center gap-1.5">
                <span className="text-xs text-stone-500 font-medium">Waste Factor:</span>
                <select
                  value={wasteFactor}
                  onChange={(e) => setWasteFactor(parseInt(e.target.value, 10))}
                  className="bg-white border border-stone-300 rounded-lg text-xs px-2 py-1 font-semibold text-stone-800"
                >
                  <option value={5}>5%</option>
                  <option value={10}>10% (Recommended)</option>
                  <option value={15}>15% (Cutting / Curved)</option>
                  <option value={20}>20% (Complex patterns)</option>
                </select>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <span className="text-xs font-medium text-stone-600 block mb-1">
                  Primary Ground Cover / Paving Material
                </span>
                <select
                  value={selectedMaterialId}
                  onChange={(e) => setSelectedMaterialId(e.target.value)}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3.5 py-2 text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {MATERIALS_CATALOG.map((mat) => (
                    <option key={mat.id} value={mat.id}>
                      {mat.name} – ${mat.defaultRate} per {mat.unit}
                    </option>
                  ))}
                </select>
              </div>

              {/* Accent Material Checkbox */}
              <div className="pt-2 border-t border-stone-200">
                <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer mb-2">
                  <input
                    type="checkbox"
                    checked={includeSecondaryMaterial}
                    onChange={(e) => setIncludeSecondaryMaterial(e.target.checked)}
                    className="w-4 h-4 text-emerald-600 rounded-sm focus:ring-emerald-500"
                  />
                  <span>Include Secondary / Accent Material (Mulch or Garden Bedding)</span>
                </label>

                {includeSecondaryMaterial && (
                  <select
                    value={secondaryMaterialId}
                    onChange={(e) => setSecondaryMaterialId(e.target.value)}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-1.5 text-xs text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  >
                    {MATERIALS_CATALOG.filter((m) => m.id !== selectedMaterialId).map((mat) => (
                      <option key={mat.id} value={mat.id}>
                        {mat.name} (${mat.defaultRate} / {mat.unit})
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>

          {/* STEP 4: Region & Labour */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-bold">4</span>
                Region & Contractor Labour
              </label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-stone-500 font-medium">Method:</span>
                <button
                  type="button"
                  onClick={() => setLaborMethod(laborMethod === 'hourly' ? 'sqft' : 'hourly')}
                  className="text-xs text-emerald-700 font-semibold underline hover:text-emerald-800 cursor-pointer"
                >
                  {laborMethod === 'hourly'
                    ? (unitSystem === 'metric' ? 'Switch to $/m²' : 'Switch to $/sq ft')
                    : 'Switch to Hourly'}
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-medium text-stone-600 mb-1">
                  US Region (Labor & Material Multiplier)
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => {
                    setSelectedRegion(e.target.value);
                    const r = REGIONAL_FACTORS[e.target.value];
                    if (r) setHourlyRate(r.laborRate);
                  }}
                  className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                >
                  {Object.entries(REGIONAL_FACTORS).map(([key, val]) => (
                    <option key={key} value={key}>
                      {val.name} ({val.multiplier}x)
                    </option>
                  ))}
                </select>
              </div>

              {laborMethod === 'hourly' ? (
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Labour Hourly Rate ($/hr)
                  </label>
                  <input
                    type="number"
                    min="25"
                    max="150"
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Math.max(1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-xs font-medium text-stone-600 mb-1">
                    Labor Rate ({unitSystem === 'metric' ? '$ / m²' : '$ / sq ft'})
                  </label>
                  <input
                    type="number"
                    step={unitSystem === 'metric' ? '1' : '0.25'}
                    min={unitSystem === 'metric' ? '5' : '0.5'}
                    max={unitSystem === 'metric' ? '500' : '50'}
                    value={ratePerSqFt}
                    onChange={(e) => setRatePerSqFt(Math.max(0.1, parseFloat(e.target.value) || 0))}
                    className="w-full bg-white border border-stone-300 rounded-xl px-3 py-2 text-xs sm:text-sm text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              )}
            </div>
          </div>

          {/* STEP 5: Additional Costs */}
          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200/80">
            <label className="text-xs font-bold uppercase tracking-wider text-stone-700 flex items-center gap-1.5 mb-3">
              <span className="w-5 h-5 rounded-full bg-emerald-700 text-white flex items-center justify-center text-[11px] font-bold">5</span>
              Site Prep & Additional Services
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200 cursor-pointer hover:border-emerald-300">
                <input
                  type="checkbox"
                  checked={includeExcavation}
                  onChange={(e) => setIncludeExcavation(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Excavation / Grading</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200 cursor-pointer hover:border-emerald-300">
                <input
                  type="checkbox"
                  checked={includeDelivery}
                  onChange={(e) => setIncludeDelivery(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Bulk Delivery Fee</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200 cursor-pointer hover:border-emerald-300">
                <input
                  type="checkbox"
                  checked={includeDisposal}
                  onChange={(e) => setIncludeDisposal(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Debris Haul Away</span>
              </label>

              <label className="flex items-center gap-2 p-2.5 rounded-xl bg-white border border-stone-200 cursor-pointer hover:border-emerald-300">
                <input
                  type="checkbox"
                  checked={includePermits}
                  onChange={(e) => setIncludePermits(e.target.checked)}
                  className="rounded-sm text-emerald-600"
                />
                <span>Municipal Permits</span>
              </label>
            </div>
          </div>

          {/* Optional Contractor Markup Box */}
          {showContractorMode && (
            <div className="bg-emerald-950/90 text-white rounded-2xl p-5 border border-emerald-700">
              <div className="flex items-center gap-2 mb-3">
                <Building className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
                  Contractor Profit & Overhead Mode
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4 text-xs">
                <div>
                  <label className="block text-emerald-200 mb-1">Company Overhead %</label>
                  <input
                    type="number"
                    value={overheadPercent}
                    onChange={(e) => setOverheadPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-emerald-900 border border-emerald-600 rounded-xl px-3 py-2 text-white"
                  />
                </div>
                <div>
                  <label className="block text-emerald-200 mb-1">Target Profit Margin %</label>
                  <input
                    type="number"
                    value={profitMarginPercent}
                    onChange={(e) => setProfitMarginPercent(Math.max(0, parseFloat(e.target.value) || 0))}
                    className="w-full bg-emerald-900 border border-emerald-600 rounded-xl px-3 py-2 text-white"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Output Panel (5 Cols) */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div className="bg-stone-900 text-white rounded-2xl p-6 sm:p-7 shadow-lg border border-stone-800 sticky top-24 print-sheet">
            <div className="flex items-center justify-between pb-4 border-b border-stone-800">
              <div>
                <span className="text-[11px] uppercase tracking-wider font-bold text-emerald-400">
                  Calculated Estimate
                </span>
                <h3 className="text-lg font-heading font-bold text-white">
                  Your Estimated Landscaping Cost
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-emerald-900/60 border border-emerald-500/40 text-emerald-300 text-xs font-semibold">
                USD
              </span>
            </div>

            {/* Big Headline Number */}
            <div className="my-6 text-center bg-stone-800/80 rounded-2xl p-5 border border-stone-700 transition-colors duration-300">
              <span className="text-xs font-medium text-stone-400 block mb-1">
                Estimated Project Total
              </span>
              <div className="text-4xl sm:text-5xl font-heading font-extrabold text-white tracking-tight">
                <AnimatedPrice value={totalEstimate} />
              </div>
              <div className="mt-2 text-xs font-semibold text-emerald-400">
                <AnimatedPrice value={costPerUnit} decimals={2} /> / {unitLabel}
              </div>
              <div className="mt-3 text-xs text-stone-300 font-medium">
                Estimated Range: <span className="text-white font-bold"><AnimatedPrice value={lowEstimate} /></span> – <span className="text-white font-bold"><AnimatedPrice value={highEstimate} /></span>
              </div>
            </div>

            {/* Line Item Breakdown */}
            <div className="space-y-3 text-xs sm:text-sm py-2 border-t border-b border-stone-800">
              <div className="flex justify-between items-center text-stone-300">
                <span>Material Cost ({primaryMaterial.name.split(' ')[0]} + accents):</span>
                <span className="font-semibold text-white"><AnimatedPrice value={rawMaterialCost} /></span>
              </div>
              <div className="flex justify-between items-center text-stone-300">
                <span>Contractor Installation Labour:</span>
                <span className="font-semibold text-white"><AnimatedPrice value={rawLaborCost} /></span>
              </div>
              <div className="flex justify-between items-center text-stone-300">
                <span>Site Prep, Grading & Disposal:</span>
                <span className="font-semibold text-white"><AnimatedPrice value={rawAdditionalCost} /></span>
              </div>
              {showContractorMode && (
                <div className="flex justify-between items-center text-emerald-300 font-medium">
                  <span>Contractor Overhead & Profit ({overheadPercent + profitMarginPercent}%):</span>
                  <span><AnimatedPrice value={contractorMargin} /></span>
                </div>
              )}
            </div>

            {/* Selected Assumptions */}
            <div className="mt-4 p-3 rounded-xl bg-stone-800/50 text-[11px] text-stone-400 space-y-1">
              <p className="font-semibold text-stone-300">Project Assumptions:</p>
              <p>
                &bull; Size:{' '}
                {unitSystem === 'metric'
                  ? `${Math.round(displayArea).toLocaleString()} m² (${Math.round(calculatedSqFt).toLocaleString()} sq ft)`
                  : `${Math.round(calculatedSqFt).toLocaleString()} sq ft (${Math.round(sqFtToSqMeters(calculatedSqFt)).toLocaleString()} m²)`}
              </p>
              <p>&bull; Waste contingency: +{wasteFactor}% added to material quantities</p>
              <p>&bull; Region multiplier: {regionConfig.multiplier}x ({regionConfig.name})</p>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-2 no-print">
              <button
                onClick={handlePrint}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 hover-lift-sm active:scale-[0.98] text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                title="Print estimate"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print</span>
              </button>

              <button
                onClick={handleDownload}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 hover-lift-sm active:scale-[0.98] text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer"
                title="Download estimate text file"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download</span>
              </button>

              <button
                onClick={handleShare}
                className="p-2.5 rounded-xl bg-stone-800 hover:bg-stone-700 hover-lift-sm active:scale-[0.98] text-stone-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer col-span-2 sm:col-span-1"
                title="Share link"
              >
                {copiedLink ? <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-in fade-in zoom-in-95 duration-200" /> : <Share2 className="w-3.5 h-3.5" />}
                <span>{copiedLink ? 'Copied!' : 'Share'}</span>
              </button>
            </div>

            {/* Free Template CTA */}
            {onNavigate && (
              <div className="mt-4 pt-4 border-t border-stone-800 text-center no-print">
                <button
                  onClick={() => onNavigate('/estimate/landscaping-estimate-template/')}
                  className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold underline cursor-pointer"
                >
                  Need a formal PDF estimate template for clients? Open Template &rarr;
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
