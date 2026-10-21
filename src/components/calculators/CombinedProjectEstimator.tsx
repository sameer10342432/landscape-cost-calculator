import React, { useState, useEffect, useRef } from 'react';
import {
  Calculator,
  Plus,
  Trash2,
  Save,
  FolderOpen,
  Printer,
  Download,
  Copy,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Sparkles,
  ArrowRight,
  DollarSign,
  Shovel,
  Layers,
  Ruler,
  Trees,
  Check,
  TrendingDown,
  TrendingUp,
  Percent,
  FileText,
  MapPin,
  RefreshCw,
  ExternalLink,
} from 'lucide-react';
import {
  UnitSystem,
  ProjectComponentItem,
  ProjectComponentType,
  ProjectExtraCosts,
  SavedProject,
} from '../../types';
import {
  formatCurrency,
  METERS_TO_FEET,
  FEET_TO_METERS,
  SQ_METERS_TO_SQ_FT,
  SQ_FT_TO_SQ_METERS,
  LAWN_VARIETIES,
  MULCH_RATES,
  PAVER_PRESETS,
  PATIO_MATERIALS,
  WALL_MATERIALS,
  PLANT_GRADES,
  TREE_SIZES,
  REGIONAL_FACTORS,
  getRegionFromZip,
  DEFAULT_PLANNING_CHECKLIST,
} from '../../data/pricingData';
import {
  calculateComponent,
  calculateCombinedProject,
} from '../../utils/projectCalculationEngine';
import { AnimatedPrice } from '../common/AnimatedPrice';

interface CombinedProjectEstimatorProps {
  unitSystem: UnitSystem;
  onNavigate?: (path: string) => void;
}

const STORAGE_KEY_PROJECTS = 'landscape_saved_projects_v2';
const STORAGE_KEY_CHECKLIST = 'landscape_project_checklist_v2';

export const CombinedProjectEstimator: React.FC<CombinedProjectEstimatorProps> = ({
  unitSystem,
  onNavigate,
}) => {
  const isMetric = unitSystem === 'metric';

  // 1. Project Info & Regional Benchmarks
  const [projectName, setProjectName] = useState<string>('My Comprehensive Backyard Project');
  const [zipCode, setZipCode] = useState<string>('90210');
  const [selectedRegionKey, setSelectedRegionKey] = useState<string>('national');
  const [regionalMultiplier, setRegionalMultiplier] = useState<number>(1.0);
  const [targetBudget, setTargetBudget] = useState<number>(15000);

  // 2. Navigation Tabs
  const [activeTab, setActiveTab] = useState<
    'components' | 'shopping' | 'ranges' | 'budget' | 'extras' | 'checklist'
  >('components');

  // 3. Components State (default with a realistic multi-component setup)
  const [components, setComponents] = useState<ProjectComponentItem[]>(() => {
    const defaultPatio: ProjectComponentItem = {
      id: 'comp-1',
      type: 'paver',
      title: 'Backyard Paver Patio',
      length: isMetric ? 6 : 20,
      width: isMetric ? 4.5 : 15,
      selectedOption: '4x8',
      wasteFactorPercent: 10,
      includeLabor: true,
      calculatedSqFt: 0,
      displayArea: 0,
      materialCost: 0,
      laborCost: 0,
      laborHours: 0,
      subtotal: 0,
      materials: [],
    };

    const defaultLawn: ProjectComponentItem = {
      id: 'comp-2',
      type: 'lawn',
      title: 'Turf Lawn Area',
      length: isMetric ? 12 : 40,
      width: isMetric ? 6 : 20,
      selectedOption: 'bluegrass',
      wasteFactorPercent: 5,
      includeLabor: true,
      calculatedSqFt: 0,
      displayArea: 0,
      materialCost: 0,
      laborCost: 0,
      laborHours: 0,
      subtotal: 0,
      materials: [],
    };

    const defaultMulch: ProjectComponentItem = {
      id: 'comp-3',
      type: 'mulch',
      title: 'Perimeter Flower & Tree Beds',
      length: isMetric ? 15 : 50,
      width: isMetric ? 1.5 : 5,
      depth: isMetric ? 7.5 : 3,
      selectedOption: 'hardwood',
      wasteFactorPercent: 10,
      includeLabor: true,
      calculatedSqFt: 0,
      displayArea: 0,
      materialCost: 0,
      laborCost: 0,
      laborHours: 0,
      subtotal: 0,
      materials: [],
    };

    return [
      calculateComponent(defaultPatio, unitSystem, 1.0),
      calculateComponent(defaultLawn, unitSystem, 1.0),
      calculateComponent(defaultMulch, unitSystem, 1.0),
    ];
  });

  // 4. Extra Costs State
  const [extraCosts, setExtraCosts] = useState<ProjectExtraCosts>({
    siteExcavation: true,
    excavationRatePerSqFt: 1.25,
    deliveryFee: 120,
    debrisDisposal: 250,
    equipmentRental: 0,
    taxPercent: 6.5,
    permitFee: 0,
  });

  // 5. Checklist State
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_CHECKLIST);
      return saved ? JSON.parse(saved) : {};
    } catch {
      return {};
    }
  });

  // 6. Saved Projects & UI Modals
  const [savedProjects, setSavedProjects] = useState<SavedProject[]>([]);
  const [showLoadModal, setShowLoadModal] = useState<boolean>(false);
  const [showSaveSuccess, setShowSaveSuccess] = useState<boolean>(false);
  const [copyFeedback, setCopyFeedback] = useState<string>('');

  // Handle ZIP code mapping
  useEffect(() => {
    if (zipCode.length >= 5) {
      const res = getRegionFromZip(zipCode);
      if (res.matched) {
        setSelectedRegionKey(res.key);
        setRegionalMultiplier(res.multiplier);
      }
    }
  }, [zipCode]);

  // Recalculate components when units or multiplier changes
  useEffect(() => {
    setComponents((prev) =>
      prev.map((c) => calculateComponent(c, unitSystem, regionalMultiplier))
    );
  }, [unitSystem, regionalMultiplier]);

  // Sync checklist changes to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY_CHECKLIST, JSON.stringify(checklist));
    } catch (e) {
      console.warn('Could not persist checklist to localStorage', e);
    }
  }, [checklist]);

  // Load saved projects on initial render
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY_PROJECTS);
      if (stored) {
        setSavedProjects(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Could not load saved projects from localStorage', e);
    }
  }, []);

  // Combined Results calculation
  const projectSummary = calculateCombinedProject(components, extraCosts, regionalMultiplier);

  // Component Management Handlers
  const addComponent = (type: ProjectComponentType) => {
    const id = `comp-${Date.now()}`;
    let newComp: ProjectComponentItem;

    switch (type) {
      case 'lawn':
        newComp = {
          id,
          type: 'lawn',
          title: `Lawn Area #${components.filter((c) => c.type === 'lawn').length + 1}`,
          length: isMetric ? 10 : 30,
          width: isMetric ? 5 : 15,
          selectedOption: 'bluegrass',
          wasteFactorPercent: 5,
          includeLabor: true,
          calculatedSqFt: 0,
          displayArea: 0,
          materialCost: 0,
          laborCost: 0,
          laborHours: 0,
          subtotal: 0,
          materials: [],
        };
        break;
      case 'mulch':
        newComp = {
          id,
          type: 'mulch',
          title: `Mulch Beds #${components.filter((c) => c.type === 'mulch').length + 1}`,
          length: isMetric ? 12 : 40,
          width: isMetric ? 1.5 : 5,
          depth: isMetric ? 7.5 : 3,
          selectedOption: 'hardwood',
          wasteFactorPercent: 10,
          includeLabor: true,
          calculatedSqFt: 0,
          displayArea: 0,
          materialCost: 0,
          laborCost: 0,
          laborHours: 0,
          subtotal: 0,
          materials: [],
        };
        break;
      case 'paver':
        newComp = {
          id,
          type: 'paver',
          title: `Paver Patio / Walkway #${components.filter((c) => c.type === 'paver').length + 1}`,
          length: isMetric ? 6 : 20,
          width: isMetric ? 3.5 : 12,
          selectedOption: '4x8',
          wasteFactorPercent: 10,
          includeLabor: true,
          calculatedSqFt: 0,
          displayArea: 0,
          materialCost: 0,
          laborCost: 0,
          laborHours: 0,
          subtotal: 0,
          materials: [],
        };
        break;
      case 'patio':
        newComp = {
          id,
          type: 'patio',
          title: `Concrete / Stone Patio #${components.filter((c) => c.type === 'patio').length + 1}`,
          length: isMetric ? 6 : 20,
          width: isMetric ? 4.5 : 15,
          selectedOption: 'pavers',
          wasteFactorPercent: 8,
          includeLabor: true,
          calculatedSqFt: 0,
          displayArea: 0,
          materialCost: 0,
          laborCost: 0,
          laborHours: 0,
          subtotal: 0,
          materials: [],
        };
        break;
      case 'wall':
        newComp = {
          id,
          type: 'wall',
          title: `Retaining Wall #${components.filter((c) => c.type === 'wall').length + 1}`,
          length: isMetric ? 8 : 25,
          height: isMetric ? 0.9 : 3,
          selectedOption: 'concrete-blocks',
          wasteFactorPercent: 8,
          includeLabor: true,
          calculatedSqFt: 0,
          displayArea: 0,
          materialCost: 0,
          laborCost: 0,
          laborHours: 0,
          subtotal: 0,
          materials: [],
        };
        break;
      case 'plants':
        newComp = {
          id,
          type: 'plants',
          title: `Garden Nursery Shrubs #${components.filter((c) => c.type === 'plants').length + 1}`,
          quantity: 12,
          selectedOption: 'established',
          wasteFactorPercent: 0,
          includeLabor: true,
          calculatedSqFt: 0,
          displayArea: 0,
          materialCost: 0,
          laborCost: 0,
          laborHours: 0,
          subtotal: 0,
          materials: [],
        };
        break;
      case 'trees':
        newComp = {
          id,
          type: 'trees',
          title: `Specimen Trees #${components.filter((c) => c.type === 'trees').length + 1}`,
          quantity: 2,
          selectedOption: '15gal',
          wasteFactorPercent: 0,
          includeLabor: true,
          calculatedSqFt: 0,
          displayArea: 0,
          materialCost: 0,
          laborCost: 0,
          laborHours: 0,
          subtotal: 0,
          materials: [],
        };
        break;
    }

    const calculated = calculateComponent(newComp, unitSystem, regionalMultiplier);
    setComponents((prev) => [...prev, calculated]);
  };

  const updateComponent = (id: string, updates: Partial<ProjectComponentItem>) => {
    setComponents((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          const merged = { ...c, ...updates };
          return calculateComponent(merged, unitSystem, regionalMultiplier);
        }
        return c;
      })
    );
  };

  const removeComponent = (id: string) => {
    if (components.length <= 1) {
      alert('Your project must have at least one component. You can edit this component instead.');
      return;
    }
    setComponents((prev) => prev.filter((c) => c.id !== id));
  };

  // Local Storage Save & Load Handlers
  const handleSaveProject = () => {
    const projectToSave: SavedProject = {
      id: `proj-${Date.now()}`,
      name: projectName.trim() || 'Untitled Landscaping Project',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      unitSystem,
      targetBudget,
      zipCode,
      selectedRegion: selectedRegionKey,
      regionalMultiplier,
      components,
      extraCosts,
      totalCost: projectSummary.totalCombinedCost,
      checklistProgress: checklist,
    };

    const updated = [projectToSave, ...savedProjects.filter((p) => p.name !== projectToSave.name)];
    setSavedProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
      setShowSaveSuccess(true);
      setTimeout(() => setShowSaveSuccess(false), 3000);
    } catch (e) {
      alert('Could not save to browser storage. Ensure storage permissions are enabled.');
    }
  };

  const handleLoadProject = (proj: SavedProject) => {
    setProjectName(proj.name);
    setTargetBudget(proj.targetBudget || 15000);
    setZipCode(proj.zipCode || '90210');
    setSelectedRegionKey(proj.selectedRegion || 'national');
    setRegionalMultiplier(proj.regionalMultiplier || 1.0);
    setComponents(
      proj.components.map((c) => calculateComponent(c, unitSystem, proj.regionalMultiplier || 1.0))
    );
    if (proj.extraCosts) setExtraCosts(proj.extraCosts);
    if (proj.checklistProgress) setChecklist(proj.checklistProgress);
    setShowLoadModal(false);
  };

  const handleDeleteSavedProject = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm('Are you sure you want to delete this saved project from your local browser?'))
      return;
    const updated = savedProjects.filter((p) => p.id !== id);
    setSavedProjects(updated);
    try {
      localStorage.setItem(STORAGE_KEY_PROJECTS, JSON.stringify(updated));
    } catch (err) {
      console.warn('Failed to update localStorage after deletion', err);
    }
  };

  // Export Summary to Text file
  const handleDownloadTextSummary = () => {
    let report = `LANDSCAPECOSTCALCULATOR.ONLINE — COMPREHENSIVE PROJECT ESTIMATE\n`;
    report += `Project Name: ${projectName}\n`;
    report += `Date Generated: ${new Date().toLocaleDateString()} ${new Date().toLocaleTimeString()}\n`;
    report += `Unit System: ${unitSystem.toUpperCase()}\n`;
    report += `Regional Wage Benchmark: ${REGIONAL_FACTORS[selectedRegionKey]?.name || 'National'} (${regionalMultiplier}x)\n`;
    report += `Target Budget: ${formatCurrency(targetBudget)}\n`;
    report += `------------------------------------------------------------\n\n`;

    report += `ITEMIZED PROJECT COMPONENTS:\n`;
    components.forEach((c, idx) => {
      report += `${idx + 1}. ${c.title.toUpperCase()} (${c.type})\n`;
      report += `   Dimensions / Quantity: ${
        c.type === 'plants' || c.type === 'trees'
          ? `${c.quantity} count`
          : c.type === 'wall'
          ? `${c.length} ${isMetric ? 'm' : 'ft'} long × ${c.height} ${isMetric ? 'm' : 'ft'} high`
          : `${c.length} × ${c.width} ${isMetric ? 'm' : 'ft'} (${c.displayArea} ${isMetric ? 'm²' : 'sq ft'})`
      }\n`;
      report += `   Material Choice: ${c.selectedOption}\n`;
      report += `   Materials Cost: ${formatCurrency(c.materialCost)}\n`;
      report += `   Labor Cost (${c.laborHours} hrs): ${formatCurrency(c.laborCost)}\n`;
      report += `   Subtotal: ${formatCurrency(c.subtotal)}\n\n`;
    });

    report += `------------------------------------------------------------\n`;
    report += `OPTIONAL EXTRA CHARGES:\n`;
    if (extraCosts.siteExcavation)
      report += `- Site Excavation & Grading: ${formatCurrency(
        projectSummary.totalAreaSqFt * extraCosts.excavationRatePerSqFt
      )}\n`;
    report += `- Material Delivery: ${formatCurrency(extraCosts.deliveryFee * regionalMultiplier)}\n`;
    report += `- Debris Dumpster & Disposal: ${formatCurrency(extraCosts.debrisDisposal)}\n`;
    if (extraCosts.equipmentRental)
      report += `- Heavy Equipment Rental: ${formatCurrency(extraCosts.equipmentRental)}\n`;
    if (extraCosts.permitFee)
      report += `- Municipal Permits: ${formatCurrency(extraCosts.permitFee)}\n`;
    report += `- Estimated Sales Tax (${extraCosts.taxPercent}%): ${formatCurrency(
      projectSummary.taxAmount
    )}\n\n`;

    report += `------------------------------------------------------------\n`;
    report += `FINAL ESTIMATED TOTAL: ${formatCurrency(projectSummary.totalCombinedCost)}\n`;
    report += `Typical Range: ${formatCurrency(projectSummary.lowEstimate)} (Low) – ${formatCurrency(
      projectSummary.highEstimate
    )} (High)\n`;
    report += `DIY Scenario Total: ${formatCurrency(projectSummary.diyComparison.diyTotal)}\n`;
    report += `Potential DIY Savings: ${formatCurrency(
      projectSummary.diyComparison.potentialSavings
    )} (requires approx. ${projectSummary.diyComparison.estimatedDiyHours} hours DIY work)\n\n`;

    report += `CONSOLIDATED SHOPPING LIST:\n`;
    projectSummary.consolidatedShoppingList.forEach((item) => {
      report += `- ${item.name}: ${item.quantity} ${item.unit} (${formatCurrency(item.cost)})${
        item.notes ? ` — ${item.notes}` : ''
      }\n`;
    });

    report += `\nDisclaimer: This document is an automated planning benchmark generated on LandscapeCostCalculator.online. Actual contractor bids depend on soil conditions, accessibility, and local supplier stock.`;

    const blob = new Blob([report], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectName.toLowerCase().replace(/[^a-z0-9]/g, '-')}-estimate.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleCopyShoppingList = () => {
    let text = `SHOPPING LIST — ${projectName}\n\n`;
    projectSummary.consolidatedShoppingList.forEach((m) => {
      text += `[ ] ${m.name}: ${m.quantity} ${m.unit} — Est. ${formatCurrency(m.cost)}\n`;
      if (m.notes) text += `    Note: ${m.notes}\n`;
    });
    navigator.clipboard.writeText(text);
    setCopyFeedback('Copied to clipboard!');
    setTimeout(() => setCopyFeedback(''), 2500);
  };

  const handlePrint = () => {
    window.print();
  };

  const budgetDelta = targetBudget - projectSummary.totalCombinedCost;
  const isOverBudget = budgetDelta < 0;
  const budgetUsagePercent = targetBudget > 0 ? (projectSummary.totalCombinedCost / targetBudget) * 100 : 0;

  // Completed checklist count
  const completedChecklistCount = Object.values(checklist).filter(Boolean).length;
  const checklistPercent = Math.round((completedChecklistCount / DEFAULT_PLANNING_CHECKLIST.length) * 100);

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-stone-200/80 overflow-hidden mb-12 animate-page-enter">
      {/* 1. Header Banner */}
      <div className="bg-stone-900 text-white p-6 sm:p-8 relative">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-semibold mb-2">
              <Calculator className="w-3.5 h-3.5" />
              <span>Multi-Feature Combined Landscaping Suite</span>
            </div>
            <div className="flex items-center gap-3">
              <input
                type="text"
                value={projectName}
                onChange={(e) => setProjectName(e.target.value)}
                className="text-2xl sm:text-3xl font-heading font-extrabold text-white bg-transparent border-b border-dashed border-stone-600 focus:border-emerald-400 focus:outline-none transition-colors max-w-xl"
                title="Click to rename this project"
              />
            </div>
            <p className="text-xs sm:text-sm text-stone-300 mt-2 max-w-2xl leading-relaxed">
              Combine lawn sod, flower beds, paver patios, retaining walls, shrubs, and trees into a single itemized estimate. Compare DIY vs pro pricing, generate material shopping lists, and track budgets.
            </p>
          </div>

          {/* Quick Action Toolbar */}
          <div className="flex flex-wrap items-center gap-2 self-start md:self-auto shrink-0 no-print">
            <button
              onClick={handleSaveProject}
              className="bg-emerald-700 hover:bg-emerald-600 text-white text-xs font-semibold px-3.5 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Save project to local browser storage"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save</span>
            </button>

            <button
              onClick={() => setShowLoadModal(true)}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold px-3.5 py-2 rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Open previously saved projects"
            >
              <FolderOpen className="w-3.5 h-3.5 text-stone-400" />
              <span>Saved ({savedProjects.length})</span>
            </button>

            <button
              onClick={handlePrint}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold px-3 py-2 rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Print formal project estimate"
            >
              <Printer className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Print</span>
            </button>

            <button
              onClick={handleDownloadTextSummary}
              className="bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-semibold px-3 py-2 rounded-xl border border-stone-700 transition-colors flex items-center gap-1.5 cursor-pointer"
              title="Download full project text breakdown"
            >
              <Download className="w-3.5 h-3.5 text-stone-400" />
              <span className="hidden sm:inline">Export</span>
            </button>
          </div>
        </div>

        {/* Save confirmation toast */}
        {showSaveSuccess && (
          <div className="absolute bottom-2 right-4 bg-emerald-600 text-white text-xs px-3 py-1.5 rounded-lg shadow-md flex items-center gap-1.5 animate-fadeIn">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Project saved successfully in browser!</span>
          </div>
        )}
      </div>

      {/* 2. Project Control Bar (ZIP Code, Budget, Regional Benchmarks) */}
      <div className="bg-stone-100/90 border-b border-stone-200 p-4 sm:p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 no-print">
        {/* ZIP Code Input */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-2xs">
          <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5 mb-1.5">
            <MapPin className="w-3.5 h-3.5 text-emerald-700" />
            <span>US ZIP Code (Regional Labor)</span>
          </label>
          <div className="flex items-center gap-2">
            <input
              type="text"
              maxLength={5}
              value={zipCode}
              onChange={(e) => setZipCode(e.target.value.replace(/\D/g, ''))}
              placeholder="e.g. 90210"
              className="w-24 bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
            <span className="text-xs text-stone-500 font-medium">
              {regionalMultiplier !== 1.0
                ? `${regionalMultiplier > 1 ? '+' : ''}${Math.round(
                    (regionalMultiplier - 1) * 100
                  )}% Labor`
                : 'National Rate'}
            </span>
          </div>
          <span className="text-[10px] text-stone-400 block mt-1 truncate">
            {REGIONAL_FACTORS[selectedRegionKey]?.name || 'US National Benchmark'}
          </span>
        </div>

        {/* Target Budget Input */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-2xs">
          <label className="text-[11px] font-bold uppercase tracking-wider text-stone-600 flex items-center gap-1.5 mb-1.5">
            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
            <span>Target Project Budget</span>
          </label>
          <div className="flex items-center gap-1.5">
            <span className="text-stone-400 text-sm font-bold">$</span>
            <input
              type="number"
              step="500"
              min="0"
              value={targetBudget}
              onChange={(e) => setTargetBudget(Math.max(0, parseInt(e.target.value, 10) || 0))}
              className="w-full bg-stone-50 border border-stone-300 rounded-lg px-2.5 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
            />
          </div>
          <div className="flex items-center justify-between text-[10px] mt-1">
            <span className={isOverBudget ? 'text-rose-600 font-bold' : 'text-emerald-700 font-bold'}>
              {isOverBudget ? `Over by ${formatCurrency(Math.abs(budgetDelta))}` : `Under by ${formatCurrency(budgetDelta)}`}
            </span>
            <span className="text-stone-400">{budgetUsagePercent.toFixed(0)}% allocated</span>
          </div>
        </div>

        {/* Total Cost Display Card */}
        <div className="bg-emerald-50 rounded-xl p-3.5 border border-emerald-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1">
            Total Estimated Project Cost
          </span>
          <div className="text-2xl font-extrabold text-emerald-950">
            <AnimatedPrice value={projectSummary.totalCombinedCost} />
          </div>
          <span className="text-[11px] text-emerald-700 font-medium block mt-0.5">
            Range: {formatCurrency(projectSummary.lowEstimate)} – {formatCurrency(projectSummary.highEstimate)}
          </span>
        </div>

        {/* DIY Savings Quick Glance */}
        <div className="bg-white rounded-xl p-3.5 border border-stone-200 shadow-2xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-stone-600 block mb-1">
            DIY vs Contractor Potential
          </span>
          <div className="text-lg font-bold text-stone-900">
            Save up to {formatCurrency(projectSummary.diyComparison.potentialSavings)}
          </div>
          <span className="text-[11px] text-stone-500 block mt-0.5">
            DIY est: {formatCurrency(projectSummary.diyComparison.diyTotal)} (~{projectSummary.diyComparison.estimatedDiyHours} hrs labor)
          </span>
        </div>
      </div>

      {/* 3. Navigation Tabs Header */}
      <div className="flex overflow-x-auto border-b border-stone-200 bg-white px-4 sm:px-6 no-print scrollbar-none">
        {[
          { id: 'components', label: `1. Project Components (${components.length})`, icon: Layers },
          { id: 'shopping', label: `2. Material Shopping List (${projectSummary.consolidatedShoppingList.length})`, icon: FileText },
          { id: 'ranges', label: '3. Low / High & DIY Comparison', icon: TrendingDown },
          { id: 'budget', label: '4. Budget Planner & Breakdown', icon: DollarSign },
          { id: 'extras', label: '5. Extras & Taxes', icon: Percent },
          { id: 'checklist', label: `6. Planning Checklist (${checklistPercent}%)`, icon: CheckCircle2 },
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as typeof activeTab)}
              className={`py-3.5 px-4 text-xs sm:text-sm font-semibold flex items-center gap-2 border-b-2 whitespace-nowrap transition-colors cursor-pointer ${
                isActive
                  ? 'border-emerald-700 text-emerald-800 bg-emerald-50/40'
                  : 'border-transparent text-stone-600 hover:text-stone-900 hover:border-stone-300'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-emerald-700' : 'text-stone-400'}`} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* 4. Tab Content Body */}
      <div className="p-6 sm:p-8">
        {/* TAB 1: PROJECT COMPONENTS BUILDER */}
        {activeTab === 'components' && (
          <div className="space-y-6">
            {/* Component Quick Add Buttons */}
            <div className="bg-stone-50 rounded-2xl p-4 sm:p-5 border border-stone-200">
              <span className="text-xs font-bold uppercase tracking-wider text-stone-700 block mb-3">
                Add Landscaping Components to Your Project
              </span>
              <div className="flex flex-wrap gap-2">
                {[
                  { type: 'lawn', label: '+ Lawn / Sod', icon: Shovel },
                  { type: 'mulch', label: '+ Mulch Beds', icon: Layers },
                  { type: 'paver', label: '+ Paver Patio / Walkway', icon: Layers },
                  { type: 'patio', label: '+ Concrete / Stone Patio', icon: Ruler },
                  { type: 'wall', label: '+ Retaining Wall', icon: Layers },
                  { type: 'plants', label: '+ Plants & Shrubs', icon: Trees },
                  { type: 'trees', label: '+ Specimen Trees', icon: Trees },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.type}
                      type="button"
                      onClick={() => addComponent(item.type as ProjectComponentType)}
                      className="bg-white hover:bg-emerald-50 text-stone-800 hover:text-emerald-800 font-semibold text-xs px-3.5 py-2 rounded-xl border border-stone-300 hover:border-emerald-600 shadow-2xs transition-all flex items-center gap-1.5 cursor-pointer"
                    >
                      <Icon className="w-3.5 h-3.5 text-emerald-700" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* List of Component Cards */}
            <div className="space-y-4">
              {components.map((comp, idx) => (
                <div
                  key={comp.id}
                  className="bg-white rounded-2xl border border-stone-200 shadow-xs p-5 hover:border-stone-300 transition-all relative"
                >
                  {/* Card Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 mb-4 border-b border-stone-100">
                    <div className="flex items-center gap-2">
                      <span className="w-6 h-6 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center justify-center shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={comp.title}
                        onChange={(e) => updateComponent(comp.id, { title: e.target.value })}
                        className="font-heading font-bold text-base text-stone-900 bg-transparent border-b border-transparent hover:border-stone-300 focus:border-emerald-600 focus:outline-none"
                      />
                      <span className="text-[11px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-md bg-stone-100 text-stone-600">
                        {comp.type}
                      </span>
                    </div>

                    <div className="flex items-center gap-4 self-end sm:self-auto">
                      <div className="text-right">
                        <span className="text-xs text-stone-500 block">Subtotal</span>
                        <span className="text-base font-extrabold text-stone-900">
                          {formatCurrency(comp.subtotal)}
                        </span>
                      </div>
                      <button
                        onClick={() => removeComponent(comp.id)}
                        className="text-stone-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition-colors cursor-pointer"
                        title="Remove this component"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  {/* Component Inputs Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                    {/* Dimensions / Quantities (5 cols) */}
                    <div className="md:col-span-5 space-y-3">
                      {comp.type === 'plants' || comp.type === 'trees' ? (
                        <div>
                          <label className="block text-xs font-medium text-stone-600 mb-1">
                            Quantity to Plant
                          </label>
                          <input
                            type="number"
                            min="1"
                            max="500"
                            value={comp.quantity || 1}
                            onChange={(e) =>
                              updateComponent(comp.id, {
                                quantity: Math.max(1, parseInt(e.target.value, 10) || 1),
                              })
                            }
                            className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                          />
                        </div>
                      ) : comp.type === 'wall' ? (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">
                              Wall Length ({isMetric ? 'm' : 'feet'})
                            </label>
                            <input
                              type="number"
                              min="0.5"
                              step="0.5"
                              value={comp.length || 1}
                              onChange={(e) =>
                                updateComponent(comp.id, {
                                  length: Math.max(0.1, parseFloat(e.target.value) || 0),
                                })
                              }
                              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">
                              Wall Height ({isMetric ? 'm' : 'feet'})
                            </label>
                            <input
                              type="number"
                              min="0.2"
                              step="0.1"
                              value={comp.height || 1}
                              onChange={(e) =>
                                updateComponent(comp.id, {
                                  height: Math.max(0.1, parseFloat(e.target.value) || 0),
                                })
                              }
                              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                          </div>
                        </div>
                      ) : (
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">
                              Length ({isMetric ? 'm' : 'feet'})
                            </label>
                            <input
                              type="number"
                              min="0.5"
                              step="0.5"
                              value={comp.length || 1}
                              onChange={(e) =>
                                updateComponent(comp.id, {
                                  length: Math.max(0.1, parseFloat(e.target.value) || 0),
                                })
                              }
                              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-medium text-stone-600 mb-1">
                              Width ({isMetric ? 'm' : 'feet'})
                            </label>
                            <input
                              type="number"
                              min="0.5"
                              step="0.5"
                              value={comp.width || 1}
                              onChange={(e) =>
                                updateComponent(comp.id, {
                                  width: Math.max(0.1, parseFloat(e.target.value) || 0),
                                })
                              }
                              className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-1.5 text-sm font-bold text-stone-900 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                            />
                          </div>
                        </div>
                      )}

                      {/* Area indicator */}
                      {comp.type !== 'plants' && comp.type !== 'trees' && (
                        <div className="text-[11px] text-stone-500 flex items-center justify-between">
                          <span>
                            Area: {comp.displayArea} {isMetric ? 'm²' : 'sq ft'}
                          </span>
                          {comp.type === 'mulch' && (
                            <span>Depth: {comp.depth} {isMetric ? 'cm' : 'inches'}</span>
                          )}
                        </div>
                      )}

                      {/* Safety warning if retaining wall height is >= 4ft (1.2m) */}
                      {comp.type === 'wall' && (comp.height || 0) >= (isMetric ? 1.2 : 4) && (
                        <div className="bg-amber-50 border border-amber-200 rounded-xl p-2.5 flex items-start gap-2 text-xs text-amber-800">
                          <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                          <span>
                            <strong>Structural Building Notice:</strong> Walls &ge; 4 ft (1.2m) typically require geotechnical soil anchors (geogrid) and a municipal engineering permit.
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Material Presets & Options (4 cols) */}
                    <div className="md:col-span-4 space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-stone-600 mb-1">
                          Material Variety / Spec
                        </label>
                        <select
                          value={comp.selectedOption}
                          onChange={(e) => updateComponent(comp.id, { selectedOption: e.target.value })}
                          className="w-full bg-stone-50 border border-stone-300 rounded-xl px-3 py-2 text-xs font-semibold text-stone-800 focus:outline-none focus:ring-2 focus:ring-emerald-600"
                        >
                          {comp.type === 'lawn' &&
                            Object.entries(LAWN_VARIETIES).map(([k, v]) => (
                              <option key={k} value={k}>
                                {v.name} (${v.sqFtRate}/sq ft)
                              </option>
                            ))}
                          {comp.type === 'mulch' &&
                            Object.entries(MULCH_RATES).map(([k, v]) => (
                              <option key={k} value={k}>
                                {v.name} (${v.bulkYdPrice}/yd)
                              </option>
                            ))}
                          {comp.type === 'paver' &&
                            Object.entries(PAVER_PRESETS).map(([k, v]) => (
                              <option key={k} value={k}>
                                {v.name} (${v.defaultPrice}/unit)
                              </option>
                            ))}
                          {comp.type === 'patio' &&
                            Object.entries(PATIO_MATERIALS).map(([k, v]) => (
                              <option key={k} value={k}>
                                {v.name} (${v.matCostSqFt + v.laborCostSqFt}/sq ft)
                              </option>
                            ))}
                          {comp.type === 'wall' &&
                            Object.entries(WALL_MATERIALS).map(([k, v]) => (
                              <option key={k} value={k}>
                                {v.name} (${v.blockRateSqFt}/face sq ft)
                              </option>
                            ))}
                          {comp.type === 'plants' &&
                            Object.entries(PLANT_GRADES).map(([k, v]) => (
                              <option key={k} value={k}>
                                {v.name} (${v.plantPrice}/plant)
                              </option>
                            ))}
                          {comp.type === 'trees' &&
                            Object.entries(TREE_SIZES).map(([k, v]) => (
                              <option key={k} value={k}>
                                {v.name} (${v.treePrice}/tree)
                              </option>
                            ))}
                        </select>
                      </div>

                      {/* Waste factor slider */}
                      <div>
                        <div className="flex justify-between text-xs text-stone-600 mb-1">
                          <span>Cutting & Material Waste Allowance:</span>
                          <span className="font-bold text-stone-900">{comp.wasteFactorPercent}%</span>
                        </div>
                        <input
                          type="range"
                          min="0"
                          max="25"
                          step="1"
                          value={comp.wasteFactorPercent}
                          onChange={(e) =>
                            updateComponent(comp.id, {
                              wasteFactorPercent: parseInt(e.target.value, 10),
                            })
                          }
                          className="w-full accent-emerald-700"
                        />
                      </div>
                    </div>

                    {/* Labor & Breakdown Summary (3 cols) */}
                    <div className="md:col-span-3 bg-stone-50 rounded-xl p-3 border border-stone-200 text-xs space-y-2">
                      <div className="flex justify-between items-center text-stone-600">
                        <span>Materials:</span>
                        <span className="font-semibold text-stone-900">
                          {formatCurrency(comp.materialCost)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-stone-600">
                        <span>Labor ({comp.laborHours}h):</span>
                        <span className="font-semibold text-stone-900">
                          {formatCurrency(comp.laborCost)}
                        </span>
                      </div>
                      <div className="pt-2 border-t border-stone-200">
                        <label className="flex items-center gap-2 cursor-pointer select-none">
                          <input
                            type="checkbox"
                            checked={comp.includeLabor}
                            onChange={(e) => updateComponent(comp.id, { includeLabor: e.target.checked })}
                            className="rounded text-emerald-700 focus:ring-emerald-600 w-3.5 h-3.5"
                          />
                          <span className="text-[11px] font-medium text-stone-700">
                            Include Contractor Labor
                          </span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: MATERIAL QUANTITIES & CONSOLIDATED SHOPPING LIST */}
        {activeTab === 'shopping' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
              <div>
                <h3 className="font-heading font-bold text-lg text-emerald-950">
                  Consolidated Project Material Takeoff
                </h3>
                <p className="text-xs text-emerald-800 mt-1 max-w-xl">
                  Combined quantities for all components including configurable cutting, settlement, and compaction allowances. Use this consolidated bill of materials to request supplier quotes or purchase aggregates.
                </p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handleCopyShoppingList}
                  className="bg-white hover:bg-emerald-100 text-emerald-900 font-bold text-xs px-3.5 py-2 rounded-xl border border-emerald-300 shadow-2xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5 text-emerald-700" />
                  <span>{copyFeedback || 'Copy List'}</span>
                </button>
                <button
                  onClick={handlePrint}
                  className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs px-3.5 py-2 rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Print Takeoff</span>
                </button>
              </div>
            </div>

            {/* Shopping List Table */}
            <div className="overflow-x-auto border border-stone-200 rounded-2xl">
              <table className="w-full text-left text-xs sm:text-sm bg-white">
                <thead className="bg-stone-100 text-stone-700 uppercase font-semibold text-[11px] tracking-wider border-b border-stone-200">
                  <tr>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">Material Description</th>
                    <th className="p-3.5">Purchasing Quantity</th>
                    <th className="p-3.5 text-right">Est. Material Cost</th>
                    <th className="p-3.5">Specification & Packaging Notes</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100 text-stone-800">
                  {projectSummary.consolidatedShoppingList.map((item, idx) => (
                    <tr key={idx} className="hover:bg-stone-50/80 transition-colors">
                      <td className="p-3.5 font-semibold text-stone-500 uppercase text-[10px]">
                        {item.category}
                      </td>
                      <td className="p-3.5 font-bold text-stone-900">{item.name}</td>
                      <td className="p-3.5 font-extrabold text-emerald-800 text-sm">
                        {item.quantity.toLocaleString()} {item.unit}
                      </td>
                      <td className="p-3.5 text-right font-semibold text-stone-900">
                        {formatCurrency(item.cost)}
                      </td>
                      <td className="p-3.5 text-stone-500 text-xs">{item.notes || '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="bg-stone-50 rounded-xl p-4 border border-stone-200 text-xs text-stone-600 flex items-start gap-2.5">
              <HelpCircle className="w-4 h-4 text-emerald-700 shrink-0 mt-0.5" />
              <span>
                <strong>Supplier Ordering Advice:</strong> Bulk aggregates (gravel, sand, mulch, topsoil) are priced significantly lower when delivered in 10-wheel tandem dump truckloads (10–18 tons or 15–20 yards) compared to retail bags. Ensure driveway access is clear for heavy vehicle maneuvering.
              </span>
            </div>
          </div>
        )}

        {/* TAB 3: LOW / HIGH RANGES & DIY VS PRO COMPARISON */}
        {activeTab === 'ranges' && (
          <div className="space-y-8">
            {/* Low, Typical, High Cost Ranges */}
            <div>
              <h3 className="font-heading font-bold text-xl text-stone-900 mb-2">
                Transparent Cost Estimate Ranges
              </h3>
              <p className="text-xs text-stone-600 mb-6 max-w-2xl">
                Landscaping contractor quotes vary based on site accessibility, soil hardness, grade slopes, and custom masonry cuts. Below is an honest low, typical, and high cost distribution for this specific project.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    Low Estimate (-14%)
                  </span>
                  <div className="text-2xl font-extrabold text-stone-900">
                    {formatCurrency(projectSummary.lowEstimate)}
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Applies when your property has wide machine access (gates &ge; 48"), flat terrain, soft sandy-loam soil, simple straight cuts, and standard builder-grade pavers.
                  </p>
                </div>

                <div className="bg-emerald-50 rounded-2xl p-5 border-2 border-emerald-600 shadow-sm relative">
                  <span className="absolute -top-3 left-4 bg-emerald-700 text-white text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full">
                    Realistic Median Benchmark
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 block mb-1 mt-1">
                    Typical Turnkey Quote
                  </span>
                  <div className="text-3xl font-extrabold text-emerald-950">
                    {formatCurrency(projectSummary.typicalEstimate)}
                  </div>
                  <p className="text-xs text-emerald-900 mt-2 leading-relaxed">
                    Based on verified 2026 regional supplier pricing, standard 4-man licensed contractor crew wages, a 10% cutting contingency, and turnkey site preparation.
                  </p>
                </div>

                <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-stone-500 block mb-1">
                    High Estimate (+22%)
                  </span>
                  <div className="text-2xl font-extrabold text-stone-900">
                    {formatCurrency(projectSummary.highEstimate)}
                  </div>
                  <p className="text-xs text-stone-600 mt-2 leading-relaxed">
                    Expected if heavy equipment cannot enter the backyard (wheelbarrow manual haul), heavy clay or rock excavation, intricate radius cuts, and high-demand summer contractor schedules.
                  </p>
                </div>
              </div>
            </div>

            {/* DIY vs Pro Detailed Comparison */}
            <div className="pt-8 border-t border-stone-200">
              <h3 className="font-heading font-bold text-xl text-stone-900 mb-2">
                DIY vs Professional Contractor Comparison
              </h3>
              <p className="text-xs text-stone-600 mb-6 max-w-2xl">
                Compare purchasing materials yourself versus hiring a licensed landscaping company with machinery, insurance, and warranty protection.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* DIY Card */}
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-bold mb-3">
                      <Shovel className="w-3.5 h-3.5" />
                      <span>Do-It-Yourself (DIY) Route</span>
                    </div>
                    <div className="text-3xl font-extrabold text-stone-900">
                      {formatCurrency(projectSummary.diyComparison.diyTotal)}
                    </div>
                    <span className="text-xs text-stone-500 block mt-1">
                      Estimated homeowner labor: ~{projectSummary.diyComparison.estimatedDiyHours} hours across 3–5 weekends
                    </span>

                    <ul className="mt-5 space-y-2.5 text-xs text-stone-700">
                      <li className="flex justify-between py-1 border-b border-stone-100">
                        <span>Retail Materials (+8% non-wholesale):</span>
                        <span className="font-semibold">{formatCurrency(projectSummary.diyComparison.diyMaterials)}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-stone-100">
                        <span>Equipment Rental (Plate compactor, sod cutter):</span>
                        <span className="font-semibold">{formatCurrency(projectSummary.diyComparison.diyToolRental)}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-stone-100">
                        <span>Dumpster & Bulk Delivery Logistics:</span>
                        <span className="font-semibold">{formatCurrency(projectSummary.diyComparison.diyLogistics)}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-stone-100">
                        <span>Labor Cost:</span>
                        <span className="font-semibold text-emerald-700">$0 (Sweat Equity)</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 bg-stone-50 rounded-xl p-3 text-xs text-stone-600">
                    <strong>DIY Consideration:</strong> Hardscaping requires heavy manual lifting (25–35 tons of aggregate & pavers). Improper base compaction can cause sunken pavers within 1–2 years.
                  </div>
                </div>

                {/* Professional Contractor Card */}
                <div className="bg-emerald-950 text-white rounded-2xl p-6 border border-emerald-900 shadow-md flex flex-col justify-between">
                  <div>
                    <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold mb-3">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>Licensed Landscaping Contractor</span>
                    </div>
                    <div className="text-3xl font-extrabold text-white">
                      {formatCurrency(projectSummary.diyComparison.proTotal)}
                    </div>
                    <span className="text-xs text-emerald-200 block mt-1">
                      Professional 4-man crew timeline: 3 to 6 working days
                    </span>

                    <ul className="mt-5 space-y-2.5 text-xs text-emerald-100">
                      <li className="flex justify-between py-1 border-b border-emerald-800/80">
                        <span>Wholesale Materials:</span>
                        <span className="font-semibold text-white">{formatCurrency(projectSummary.totalMaterials)}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-emerald-800/80">
                        <span>Trade Crew Labor ({projectSummary.totalLaborHours} crew hrs):</span>
                        <span className="font-semibold text-white">{formatCurrency(projectSummary.totalLabor)}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-emerald-800/80">
                        <span>Excavation, Delivery & Prep:</span>
                        <span className="font-semibold text-white">{formatCurrency(projectSummary.extrasTotal)}</span>
                      </li>
                      <li className="flex justify-between py-1 border-b border-emerald-800/80">
                        <span>Estimated Taxes & Municipal Permits:</span>
                        <span className="font-semibold text-white">{formatCurrency(projectSummary.taxAmount)}</span>
                      </li>
                    </ul>
                  </div>

                  <div className="mt-6 bg-emerald-900/70 rounded-xl p-3 text-xs text-emerald-200 border border-emerald-800">
                    <strong>Contractor Value:</strong> Includes heavy Bobcat machinery, laser grade leveling, commercial compaction warranties, and complete debris removal.
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: BUDGET PLANNER & BREAKDOWN */}
        {activeTab === 'budget' && (
          <div className="space-y-6">
            <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200">
              <h3 className="font-heading font-bold text-lg text-stone-900 mb-2">
                Project Budget Variance Analysis
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-4">
                <div className="bg-white p-4 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block">Your Budget Ceiling</span>
                  <div className="text-2xl font-bold text-stone-900 mt-1">{formatCurrency(targetBudget)}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block">Current Project Estimate</span>
                  <div className="text-2xl font-bold text-stone-900 mt-1">{formatCurrency(projectSummary.totalCombinedCost)}</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-stone-200">
                  <span className="text-xs text-stone-500 block">Remaining Budget Delta</span>
                  <div className={`text-2xl font-bold mt-1 ${isOverBudget ? 'text-rose-600' : 'text-emerald-700'}`}>
                    {isOverBudget ? `-${formatCurrency(Math.abs(budgetDelta))}` : `+${formatCurrency(budgetDelta)}`}
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-4">
                <div className="flex justify-between text-xs text-stone-600 mb-1.5 font-medium">
                  <span>Budget Utilization</span>
                  <span>{budgetUsagePercent.toFixed(1)}%</span>
                </div>
                <div className="w-full h-3 bg-stone-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all duration-300 rounded-full ${
                      budgetUsagePercent > 100
                        ? 'bg-rose-600'
                        : budgetUsagePercent > 80
                        ? 'bg-amber-500'
                        : 'bg-emerald-600'
                    }`}
                    style={{ width: `${Math.min(100, budgetUsagePercent)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Component Cost Share Breakdown */}
            <div>
              <h3 className="font-heading font-bold text-lg text-stone-900 mb-3">
                Cost Contribution by Project Feature
              </h3>
              <div className="space-y-3">
                {components
                  .slice()
                  .sort((a, b) => b.subtotal - a.subtotal)
                  .map((comp) => {
                    const share =
                      projectSummary.totalCombinedCost > 0
                        ? (comp.subtotal / projectSummary.totalCombinedCost) * 100
                        : 0;
                    return (
                      <div key={comp.id} className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
                        <div className="flex justify-between items-center mb-1 text-sm font-bold text-stone-900">
                          <span>{comp.title}</span>
                          <span>
                            {formatCurrency(comp.subtotal)}{' '}
                            <span className="text-xs font-normal text-stone-500">
                              ({share.toFixed(1)}%)
                            </span>
                          </span>
                        </div>
                        <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-emerald-700 rounded-full"
                            style={{ width: `${share}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>

            {/* Practical Scenario Optimizations */}
            <div className="bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
              <h4 className="font-heading font-bold text-base text-emerald-950 mb-2">
                Smart Budget Optimization Suggestions
              </h4>
              <ul className="space-y-2 text-xs text-emerald-900 leading-relaxed">
                <li>
                  &bull; <strong>Phase into Two Construction Seasons:</strong> Complete high-impact excavation, grading, and paver patios in Year 1; plant trees, shrubs, and accent lighting in Year 2 to defer 30%–40% of upfront capital.
                </li>
                <li>
                  &bull; <strong>Optimize Hardscape Footprint:</strong> Hardscape costs average $18–$35/sq ft, whereas sod lawn costs $1.50–$3.50/sq ft. Trimming 100 sq ft from a patio and expanding turf saves approx. $1,500.
                </li>
                <li>
                  &bull; <strong>Perform Pre-Construction Demolition Yourself:</strong> Tearing out old bushes, rotted timber edging, and debris before the crew mobilizes saves $450 to $1,200 on labor invoices.
                </li>
              </ul>
            </div>
          </div>
        )}

        {/* TAB 5: OPTIONAL EXTRAS & TAXES */}
        {activeTab === 'extras' && (
          <div className="space-y-6 max-w-3xl">
            <div>
              <h3 className="font-heading font-bold text-lg text-stone-900 mb-1">
                Optional Logistics, Site Prep & Taxes
              </h3>
              <p className="text-xs text-stone-600">
                Configure additional project overheads. These line items are calculated transparently and prevent duplicate double-charging.
              </p>
            </div>

            <div className="space-y-4">
              {/* Site Prep Checkbox */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-start justify-between gap-4">
                <div>
                  <label className="font-bold text-sm text-stone-900 flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={extraCosts.siteExcavation}
                      onChange={(e) =>
                        setExtraCosts((prev) => ({ ...prev, siteExcavation: e.target.checked }))
                      }
                      className="rounded text-emerald-700 focus:ring-emerald-600 w-4 h-4"
                    />
                    <span>Mechanical Site Excavation & Ground Prep</span>
                  </label>
                  <p className="text-xs text-stone-500 mt-1 pl-6">
                    Rough grading, removing 2–4 inches of top organic turf, and leveling grade slopes prior to gravel or sod installation.
                  </p>
                </div>
                <span className="text-sm font-bold text-stone-900 shrink-0">
                  {extraCosts.siteExcavation
                    ? formatCurrency(projectSummary.totalAreaSqFt * extraCosts.excavationRatePerSqFt)
                    : '$0'}
                </span>
              </div>

              {/* Delivery Fee */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
                <div>
                  <label className="font-bold text-sm text-stone-900 block">
                    Heavy Tandem Delivery Logistics
                  </label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Covers flatbed forklift and dump truck transport from regional wholesale landscape yards.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 w-32">
                  <span className="text-xs text-stone-500 font-bold">$</span>
                  <input
                    type="number"
                    min="0"
                    step="10"
                    value={extraCosts.deliveryFee}
                    onChange={(e) =>
                      setExtraCosts((prev) => ({
                        ...prev,
                        deliveryFee: Math.max(0, parseInt(e.target.value, 10) || 0),
                      }))
                    }
                    className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-sm font-bold text-stone-900 text-right"
                  />
                </div>
              </div>

              {/* Debris Dumpster Disposal */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
                <div>
                  <label className="font-bold text-sm text-stone-900 block">
                    Debris Haul-Away & 10-Yard Dumpster Fee
                  </label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    Disposal of excavated soil, rocks, old grass clods, and construction palette waste at municipal transfer stations.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 w-32">
                  <span className="text-xs text-stone-500 font-bold">$</span>
                  <input
                    type="number"
                    min="0"
                    step="25"
                    value={extraCosts.debrisDisposal}
                    onChange={(e) =>
                      setExtraCosts((prev) => ({
                        ...prev,
                        debrisDisposal: Math.max(0, parseInt(e.target.value, 10) || 0),
                      }))
                    }
                    className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-sm font-bold text-stone-900 text-right"
                  />
                </div>
              </div>

              {/* Configurable Sales Tax Rate */}
              <div className="bg-stone-50 p-4 rounded-xl border border-stone-200 flex items-center justify-between gap-4">
                <div>
                  <label className="font-bold text-sm text-stone-900 block">
                    Estimated State / Municipal Sales Tax (%)
                  </label>
                  <p className="text-xs text-stone-500 mt-0.5">
                    User-configurable tax percentage applied to project materials and supplies.
                  </p>
                </div>
                <div className="flex items-center gap-1.5 w-24">
                  <input
                    type="number"
                    min="0"
                    max="20"
                    step="0.1"
                    value={extraCosts.taxPercent}
                    onChange={(e) =>
                      setExtraCosts((prev) => ({
                        ...prev,
                        taxPercent: Math.max(0, parseFloat(e.target.value) || 0),
                      }))
                    }
                    className="w-full bg-white border border-stone-300 rounded-lg px-2 py-1 text-sm font-bold text-stone-900 text-right"
                  />
                  <span className="text-xs text-stone-500 font-bold">%</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PLANNING CHECKLIST */}
        {activeTab === 'checklist' && (
          <div className="space-y-6 max-w-4xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-emerald-50 rounded-2xl p-5 border border-emerald-200">
              <div>
                <h3 className="font-heading font-bold text-lg text-emerald-950">
                  Landscaping Project Execution Checklist
                </h3>
                <p className="text-xs text-emerald-800 mt-1">
                  Track key milestones from 811 utility markings and HOA approvals to aggregate compaction and daily sod watering.
                </p>
              </div>
              <div className="bg-white rounded-xl px-4 py-2 border border-emerald-300 text-center shrink-0">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 block">
                  Checklist Progress
                </span>
                <span className="text-lg font-extrabold text-stone-900">
                  {completedChecklistCount} of {DEFAULT_PLANNING_CHECKLIST.length} ({checklistPercent}%)
                </span>
              </div>
            </div>

            <div className="space-y-3">
              {DEFAULT_PLANNING_CHECKLIST.map((item) => {
                const isChecked = !!checklist[item.id];
                return (
                  <div
                    key={item.id}
                    onClick={() => setChecklist((prev) => ({ ...prev, [item.id]: !isChecked }))}
                    className={`p-4 rounded-xl border transition-all cursor-pointer flex items-start gap-3.5 select-none ${
                      isChecked
                        ? 'bg-emerald-50/50 border-emerald-300'
                        : 'bg-white hover:bg-stone-50 border-stone-200'
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="mt-0.5 rounded text-emerald-700 focus:ring-emerald-600 w-4 h-4 cursor-pointer"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block">
                        {item.phase}
                      </span>
                      <h4
                        className={`text-sm font-bold mt-0.5 ${
                          isChecked ? 'line-through text-stone-500' : 'text-stone-900'
                        }`}
                      >
                        {item.title}
                      </h4>
                      <p className="text-xs text-stone-600 mt-1">{item.description}</p>
                      <span className="text-[11px] text-emerald-800 font-medium block mt-1">
                        &bull; Pro Tip: {item.tip}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 5. Load Project Modal */}
      {showLoadModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 shadow-2xl border border-stone-200 max-h-[85vh] flex flex-col animate-modalEnter">
            <div className="flex items-center justify-between pb-3 border-b border-stone-200 mb-4">
              <h3 className="font-heading font-bold text-lg text-stone-900 flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-emerald-700" />
                <span>Saved Projects in Local Browser</span>
              </h3>
              <button
                onClick={() => setShowLoadModal(false)}
                className="text-stone-400 hover:text-stone-700 p-1 rounded-lg text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-stone-600 mb-4">
              Saved projects are stored in your device's browser local storage. Select a project to restore its dimensions, materials, and configurations.
            </p>

            <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
              {savedProjects.length === 0 ? (
                <div className="text-center py-10 bg-stone-50 rounded-2xl border border-dashed border-stone-200">
                  <FolderOpen className="w-8 h-8 text-stone-300 mx-auto mb-2" />
                  <p className="text-xs font-semibold text-stone-500">No saved projects found in this browser.</p>
                  <p className="text-[11px] text-stone-400 mt-0.5">Click the "Save" button in the header toolbar to store a project.</p>
                </div>
              ) : (
                savedProjects.map((proj) => (
                  <div
                    key={proj.id}
                    onClick={() => handleLoadProject(proj)}
                    className="p-4 rounded-xl border border-stone-200 hover:border-emerald-600 hover:bg-emerald-50/40 transition-all cursor-pointer flex items-center justify-between group"
                  >
                    <div>
                      <h4 className="font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">
                        {proj.name}
                      </h4>
                      <div className="text-[11px] text-stone-500 mt-1 flex items-center gap-3">
                        <span>{proj.components.length} components</span>
                        <span>&bull;</span>
                        <span>{new Date(proj.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="font-extrabold text-sm text-stone-900">
                        {formatCurrency(proj.totalCost)}
                      </span>
                      <button
                        onClick={(e) => handleDeleteSavedProject(proj.id, e)}
                        className="text-stone-300 hover:text-rose-600 p-1 transition-colors"
                        title="Delete saved project"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            <div className="pt-4 mt-4 border-t border-stone-200 text-right">
              <button
                onClick={() => setShowLoadModal(false)}
                className="bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 rounded-xl transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
