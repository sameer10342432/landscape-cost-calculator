import React, { useState } from 'react';
import { Menu, X, ChevronDown, Calculator, BookOpen, FileSpreadsheet, Ruler } from 'lucide-react';
import { UnitSystem } from '../../types';
import { BrandLogo } from '../common/BrandLogo';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  unitSystem: UnitSystem;
  onToggleUnitSystem: (system: UnitSystem) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentPath,
  onNavigate,
  unitSystem,
  onToggleUnitSystem,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [calcDropdownOpen, setCalcDropdownOpen] = useState(false);
  const [guidesDropdownOpen, setGuidesDropdownOpen] = useState(false);

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
    setCalcDropdownOpen(false);
    setGuidesDropdownOpen(false);
  };

  const calculatorLinks = [
    { name: 'Landscaping Cost Calculator (Main)', path: '/' },
    { name: 'Mulch Calculator (Yards & Bags)', path: '/mulch-calculator/' },
    { name: 'Paver Calculator (Patio & Walkway)', path: '/paver-calculator/' },
    { name: 'Patio Cost Calculator', path: '/patio-cost-calculator/' },
    { name: 'Retaining Wall Cost Calculator', path: '/retaining-wall-cost-calculator/' },
    { name: 'Tree Planting Cost Calculator', path: '/tree-planting-cost-calculator/' },
    { name: 'Landscape Design Cost Calculator', path: '/landscape-design-cost-calculator/' },
    { name: 'Cost Per Square Foot Calculator', path: '/landscaping-cost-per-square-foot/' },
    { name: 'Landscape Cost Calculator', path: '/landscape-cost-calculator/' },
    { name: 'Landscaping Pricing Calculator', path: '/landscaping-pricing-calculator/' },
  ];

  const guideLinks = [
    { name: 'How Much Does Landscaping Cost?', path: '/guides/how-much-does-landscaping-cost/' },
    { name: 'Landscaping Cost Per Sq Ft', path: '/guides/landscaping-cost-per-square-foot/' },
    { name: 'Backyard Landscaping Cost', path: '/guides/backyard-landscaping-cost/' },
    { name: 'Front Yard Landscaping Cost', path: '/guides/front-yard-landscaping-cost/' },
    { name: 'Patio Landscaping Cost', path: '/guides/patio-landscaping-cost/' },
    { name: 'Retaining Wall Cost Guide', path: '/guides/retaining-wall-landscaping-cost/' },
    { name: 'Mulch Landscaping Cost', path: '/guides/mulch-landscaping-cost/' },
    { name: 'Rock Landscaping Cost', path: '/guides/rock-landscaping-cost/' },
    { name: 'Lawn Installation Cost (Sod vs Seed)', path: '/guides/lawn-installation-cost/' },
    { name: 'Landscape Project Cost Factors', path: '/guides/landscape-project-cost-factors/' },
  ];

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-stone-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Logo */}
          <button
            onClick={() => handleNav('/')}
            className="flex items-center text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded-xl cursor-pointer"
            aria-label="Landscape Cost Calculator Home"
          >
            <BrandLogo size="md" />
          </button>

          {/* Desktop Nav (>=1024px) */}
          <nav className="hidden lg:flex items-center space-x-1 lg:space-x-2">
            <button
              onClick={() => handleNav('/')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                currentPath === '/' || currentPath === '/landscaping-cost-calculator/'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              Home
            </button>

            {/* Calculators Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setCalcDropdownOpen(!calcDropdownOpen);
                  setGuidesDropdownOpen(false);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors cursor-pointer ${
                  currentPath.includes('calculator')
                    ? 'text-emerald-800 bg-emerald-50/70 font-semibold'
                    : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                }`}
              >
                <Calculator className="w-4 h-4 text-emerald-600 transition-transform duration-200 group-hover:scale-105" />
                <span>Calculators</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${calcDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {calcDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-72 bg-white rounded-xl shadow-lg border border-stone-200/90 py-2 z-50 animate-dropdown"
                  onMouseLeave={() => setCalcDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Core Estimation Tools
                  </div>
                  {calculatorLinks.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNav(item.path)}
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors duration-200 cursor-pointer block ${
                        currentPath === item.path
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-emerald-700'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Guides Dropdown */}
            <div className="relative">
              <button
                onClick={() => {
                  setGuidesDropdownOpen(!guidesDropdownOpen);
                  setCalcDropdownOpen(false);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1 transition-colors duration-200 cursor-pointer ${
                  currentPath.includes('/guides/')
                    ? 'text-emerald-800 bg-emerald-50/70 font-semibold'
                    : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
                }`}
              >
                <BookOpen className="w-4 h-4 text-emerald-600 transition-transform duration-200 group-hover:scale-105" />
                <span>Cost Guides</span>
                <ChevronDown className={`w-3.5 h-3.5 text-stone-400 transition-transform duration-200 ${guidesDropdownOpen ? 'rotate-180 text-emerald-600' : ''}`} />
              </button>

              {guidesDropdownOpen && (
                <div
                  className="absolute left-0 mt-2 w-80 bg-white rounded-xl shadow-lg border border-stone-200/90 py-2 z-50 animate-dropdown"
                  onMouseLeave={() => setGuidesDropdownOpen(false)}
                >
                  <div className="px-3 py-1.5 text-xs font-semibold text-stone-400 uppercase tracking-wider">
                    Pricing Research & Guides
                  </div>
                  {guideLinks.map((item) => (
                    <button
                      key={item.path}
                      onClick={() => handleNav(item.path)}
                      className={`w-full text-left px-4 py-2 text-xs sm:text-sm transition-colors duration-200 cursor-pointer block ${
                        currentPath === item.path
                          ? 'bg-emerald-50 text-emerald-800 font-semibold'
                          : 'text-stone-700 hover:bg-stone-50 hover:text-emerald-700'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Estimates Hub Link */}
            <button
              onClick={() => handleNav('/estimate/')}
              className={`px-3 py-2 text-sm font-medium rounded-lg flex items-center gap-1.5 transition-colors cursor-pointer ${
                currentPath.startsWith('/estimate')
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4 text-emerald-600" />
              <span>Estimates</span>
            </button>

            {/* About Link */}
            <button
              onClick={() => handleNav('/about/')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                currentPath === '/about/'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              About
            </button>

            {/* Contact Link */}
            <button
              onClick={() => handleNav('/contact/')}
              className={`px-3 py-2 text-sm font-medium rounded-lg transition-colors cursor-pointer ${
                currentPath === '/contact/'
                  ? 'bg-emerald-50 text-emerald-800 font-semibold'
                  : 'text-stone-700 hover:text-emerald-700 hover:bg-stone-50'
              }`}
            >
              Contact
            </button>
          </nav>

          {/* Desktop Right Action: Unit Toggle & CTA (>=1024px) */}
          <div className="hidden lg:flex items-center gap-3">
            <div className="flex items-center bg-stone-100 p-1 rounded-lg border border-stone-200 text-xs font-medium">
              <button
                onClick={() => onToggleUnitSystem('us')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  unitSystem === 'us'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                US (ft/yd)
              </button>
              <button
                onClick={() => onToggleUnitSystem('metric')}
                className={`px-2.5 py-1 rounded-md transition-all cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Metric (m/m²)
              </button>
            </div>

            <button
              onClick={() => handleNav('/estimate/landscaping-estimate-template/')}
              className="bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold px-3.5 py-2 rounded-lg shadow-xs hover:shadow-sm hover-lift-sm hover:brightness-105 active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center gap-1.5"
            >
              <FileSpreadsheet className="w-4 h-4 transition-transform duration-200 group-hover:scale-105" />
              <span>Get Estimate Template</span>
            </button>
          </div>

          {/* Mobile & Tablet controls (<1024px) */}
          <div className="flex lg:hidden items-center gap-2">
            <div className="flex items-center bg-stone-100 p-0.5 rounded-lg border border-stone-200 text-xs">
              <button
                onClick={() => onToggleUnitSystem('us')}
                className={`px-2 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  unitSystem === 'us'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                US
              </button>
              <button
                onClick={() => onToggleUnitSystem('metric')}
                className={`px-2 py-1 rounded-md text-xs transition-colors cursor-pointer ${
                  unitSystem === 'metric'
                    ? 'bg-white text-stone-900 shadow-2xs font-semibold'
                    : 'text-stone-500 hover:text-stone-800'
                }`}
              >
                Metric
              </button>
            </div>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-stone-600 hover:text-stone-900 hover:bg-stone-100 focus:outline-none transition-colors duration-200 cursor-pointer"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile & Tablet Drawer Menu (<1024px) */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-stone-200 px-4 pt-3 pb-6 space-y-3 max-h-[85vh] overflow-y-auto animate-mobile-drawer shadow-md">
          {/* Mobile/Tablet CTA Button */}
          <div className="pb-2 border-b border-stone-100">
            <button
              onClick={() => handleNav('/estimate/landscaping-estimate-template/')}
              className="w-full bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold px-4 py-2.5 rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileSpreadsheet className="w-4 h-4" />
              <span>Get Estimate Template</span>
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-stone-100">
            <button
              onClick={() => handleNav('/')}
              className="text-left py-2 px-3 text-sm font-medium rounded-lg bg-stone-50 text-stone-800"
            >
              Home Calculator
            </button>
            <button
              onClick={() => handleNav('/estimate/')}
              className="text-left py-2 px-3 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-800 font-semibold"
            >
              Estimates Hub
            </button>
          </div>

          <div>
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-3 mb-1">
              Calculators
            </div>
            <div className="space-y-1">
              {calculatorLinks.map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className={`w-full text-left py-1.5 px-3 text-sm rounded-lg block ${
                    currentPath === item.path
                      ? 'bg-emerald-50 text-emerald-800 font-semibold'
                      : 'text-stone-600 hover:bg-stone-50'
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-2 border-t border-stone-100">
            <div className="text-xs font-semibold text-stone-400 uppercase tracking-wider px-3 mb-1">
              Cost Guides
            </div>
            <div className="space-y-1">
              {guideLinks.slice(0, 6).map((item) => (
                <button
                  key={item.path}
                  onClick={() => handleNav(item.path)}
                  className="w-full text-left py-1.5 px-3 text-sm text-stone-600 hover:bg-stone-50 rounded-lg block"
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-stone-100 flex items-center justify-between text-xs text-stone-500 px-3">
            <button onClick={() => handleNav('/about/')} className="hover:text-stone-900">
              About
            </button>
            <button onClick={() => handleNav('/contact/')} className="hover:text-stone-900">
              Contact
            </button>
            <button onClick={() => handleNav('/sitemap/')} className="hover:text-stone-900">
              Sitemap
            </button>
            <button onClick={() => handleNav('/disclaimer/')} className="hover:text-stone-900">
              Disclaimer
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
