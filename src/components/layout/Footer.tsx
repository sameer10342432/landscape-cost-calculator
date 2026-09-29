import React from 'react';
import { Shovel, ShieldCheck, Mail, MapPin, ExternalLink, ArrowRight } from 'lucide-react';
import { SITE_DOMAIN } from '../../data/seoDatabase';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-stone-900 text-stone-300 pt-16 pb-12 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Disclaimer Banner */}
        <div className="bg-stone-800/80 rounded-2xl p-4 sm:p-5 border border-stone-700/60 mb-12 flex flex-col sm:flex-row items-start sm:items-center gap-3 text-xs sm:text-sm text-stone-300">
          <ShieldCheck className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5 sm:mt-0" />
          <p className="leading-relaxed">
            <strong className="text-white">Planning Disclaimer:</strong> This calculator provides planning estimates only. Actual landscaping costs vary by regional labor availability, site accessibility, elevation changes, materials selected, and individual contractor overhead. Always obtain 2 to 3 licensed on-site contractor bids before commencing work.
          </p>
        </div>

        {/* 6 Grid Columns */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 mb-12">
          {/* Column 1: Core Calculators */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Calculators</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('/')} className="hover:text-emerald-400 transition-colors text-left">
                  Landscaping Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/mulch-calculator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Mulch Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/paver-calculator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Paver Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/patio-cost-calculator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Patio Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/retaining-wall-cost-calculator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Retaining Wall Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/tree-planting-cost-calculator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Tree Planting Calculator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 2: Material & Design */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Material Tools</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('/landscaping-cost-per-square-foot/')} className="hover:text-emerald-400 transition-colors text-left">
                  Cost Per Square Foot
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/landscape-design-cost-calculator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Design Cost Calculator
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/landscape-cost-calculator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Landscape Project Cost
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/landscaping-pricing-calculator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Pricing & Margins
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/landscape-project-estimator/')} className="hover:text-emerald-400 transition-colors text-left">
                  Project Estimator
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Cost Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Cost Guides</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('/guides/how-much-does-landscaping-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  How Much Does Landscaping Cost?
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/landscaping-cost-per-square-foot/')} className="hover:text-emerald-400 transition-colors text-left">
                  Cost Per Square Foot Guide
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/backyard-landscaping-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  Backyard Landscaping Cost
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/front-yard-landscaping-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  Front Yard Curb Appeal Cost
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/patio-landscaping-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  Patio Installation Pricing
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: Material Guides */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Material Guides</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('/guides/mulch-landscaping-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  Mulch Spreading Cost
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/rock-landscaping-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  Rock & River Stone Cost
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/gravel-landscaping-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  Gravel Walkway Cost
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/lawn-installation-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  Lawn Sod vs Seed Cost
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/guides/landscape-project-cost-factors/')} className="hover:text-emerald-400 transition-colors text-left">
                  Top 7 Cost Factors
                </button>
              </li>
            </ul>
          </div>

          {/* Column 5: Estimates */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Estimate Hub</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('/estimate/')} className="hover:text-emerald-400 transition-colors text-left">
                  Landscaping Estimates
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estimate/free-landscaping-estimate/')} className="hover:text-emerald-400 transition-colors text-left">
                  Free Online Estimate
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estimate/landscaping-estimate-cost/')} className="hover:text-emerald-400 transition-colors text-left">
                  Estimate Fees & Consultations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estimate/landscaping-estimate-template/')} className="hover:text-emerald-400 transition-colors text-left font-semibold text-emerald-400">
                  Interactive Estimate Template
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/estimate/landscaping-estimate-example/')} className="hover:text-emerald-400 transition-colors text-left">
                  Sample Estimate Examples
                </button>
              </li>
            </ul>
          </div>

          {/* Column 6: Company & Legal */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-3">Company & Legal</h4>
            <ul className="space-y-2 text-xs sm:text-sm">
              <li>
                <button onClick={() => onNavigate('/about/')} className="hover:text-emerald-400 transition-colors text-left">
                  About Our Calculations
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact/')} className="hover:text-emerald-400 transition-colors text-left">
                  Contact Us
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/sitemap/')} className="hover:text-emerald-400 transition-colors text-left">
                  HTML Sitemap & Directory
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/privacy-policy/')} className="hover:text-emerald-400 transition-colors text-left">
                  Privacy Policy
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/terms/')} className="hover:text-emerald-400 transition-colors text-left">
                  Terms of Service
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/disclaimer/')} className="hover:text-emerald-400 transition-colors text-left">
                  Disclaimer
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500">
          <div className="flex items-center gap-2">
            <Shovel className="w-4 h-4 text-emerald-500" />
            <span>
              &copy; {new Date().getFullYear()} {SITE_DOMAIN}. All rights reserved.
            </span>
          </div>
          <p className="text-center sm:text-right text-stone-400">
            Dedicated to transparent landscaping estimates, accurate formulas, and contractor budgeting.
          </p>
        </div>
      </div>
    </footer>
  );
};
