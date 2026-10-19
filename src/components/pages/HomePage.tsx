import React from 'react';
import { MainLandscapingCalculator } from '../calculators/MainLandscapingCalculator';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../seo/SEOHead';
import { SEO_PAGES } from '../../data/seoDatabase';
import { UnitSystem } from '../../types';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { LeadGenCard } from '../common/LeadGenCard';
import { OptimizedImage } from '../common/OptimizedImage';
import { ScrollReveal } from '../common/ScrollReveal';
import { FaqAccordion } from '../common/FaqAccordion';
import {
  Calculator,
  ArrowRight,
  CheckCircle,
  HelpCircle,
  Sparkles,
  Layers,
  Ruler,
  DollarSign,
  ShieldCheck,
  Trees,
  Shovel,
  FileSpreadsheet,
  BookOpen,
} from 'lucide-react';

interface HomePageProps {
  unitSystem: UnitSystem;
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ unitSystem, onNavigate }) => {
  const metadata = SEO_PAGES['/'];

  const popularCalculators = [
    { name: 'Mulch Calculator', desc: 'Calculate cubic yards and bags for flower beds & trees.', path: '/mulch-calculator/', icon: <Shovel className="w-5 h-5 text-emerald-600" /> },
    { name: 'Paver Calculator', desc: 'Calculate pavers, bedding sand & road base for patios.', path: '/paver-calculator/', icon: <Layers className="w-5 h-5 text-emerald-600" /> },
    { name: 'Patio Cost Calculator', desc: 'Estimate concrete, stamped & paver patio installations.', path: '/patio-cost-calculator/', icon: <Ruler className="w-5 h-5 text-emerald-600" /> },
    { name: 'Retaining Wall Calculator', desc: 'Calculate blocks, drainage pipe & backfill gravel.', path: '/retaining-wall-cost-calculator/', icon: <Layers className="w-5 h-5 text-emerald-600" /> },
    { name: 'Tree Planting Calculator', desc: 'Estimate nursery specimens, digging & arborist labor.', path: '/tree-planting-cost-calculator/', icon: <Trees className="w-5 h-5 text-emerald-600" /> },
    { name: 'Cost Per Square Foot', desc: 'Explore benchmark tiers from $4 to $45+ per sq ft.', path: '/landscaping-cost-per-square-foot/', icon: <DollarSign className="w-5 h-5 text-emerald-600" /> },
  ];

  const guideHighlights = [
    { title: 'How Much Does Landscaping Cost?', desc: 'Complete breakdown of US averages, project tiers, and contractor rates.', path: '/guides/how-much-does-landscaping-cost/' },
    { title: 'Backyard Landscaping Cost Guide', desc: 'Price out patios, fire pits, turf, privacy plantings, and outdoor kitchens.', path: '/guides/backyard-landscaping-cost/' },
    { title: 'Front Yard Curb Appeal Pricing', desc: 'Budget for entry walkways, foundation plants, and modern sod lawns.', path: '/guides/front-yard-landscaping-cost/' },
    { title: 'Top 7 Landscape Cost Factors', desc: 'Why two similar yards can receive vastly different contractor quotes.', path: '/guides/landscape-project-cost-factors/' },
    { title: 'Mulch Installation Cost Guide', desc: 'Compare bulk truckload delivery vs retail bags and spreading labor.', path: '/guides/mulch-landscaping-cost/' },
    { title: 'Lawn Installation: Sod vs Seed', desc: 'Detailed cost comparison of hydroseeding, grass seed, and sod.', path: '/guides/lawn-installation-cost/' },
  ];

  return (
    <div className="w-full">
      <SEOHead metadata={metadata} />

      {/* 1. Hero Section */}
      <section className="bg-linear-to-b from-stone-100 via-stone-50 to-white pt-12 pb-10 px-4 sm:px-6 lg:px-8 border-b border-stone-200/60 overflow-hidden">
        <div className="max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100/90 text-emerald-800 text-xs font-bold mb-4 shadow-2xs animate-hero-badge">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Updated 2026 Material & Regional Labor Rates</span>
          </div>

          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-heading font-extrabold text-stone-900 tracking-tight leading-tight animate-hero-h1">
            Landscaping Cost Calculator
          </h1>

          <p className="mt-4 text-base sm:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed animate-hero-desc">
            Estimate landscaping project costs, materials and labour in minutes. Transparent calculations for backyards, patios, lawns, and gardens.
          </p>

          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 animate-hero-cta">
            <a
              href="#main-calculator"
              className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-xs hover:shadow-md hover-lift-sm active:scale-[0.98] transition-all duration-200 cursor-pointer inline-flex items-center gap-2 group"
            >
              <span>Calculate My Landscaping Cost</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>
            <a
              href="#popular-calculators"
              className="bg-white hover:bg-stone-50 text-stone-800 font-semibold text-sm px-5 py-3 rounded-xl border border-stone-300 hover:border-stone-400 hover-lift-sm active:scale-[0.98] transition-all duration-200 inline-flex items-center gap-2"
            >
              <span>Explore Calculators</span>
            </a>
          </div>

          <div className="mt-8 max-w-4xl mx-auto rounded-2xl sm:rounded-3xl overflow-hidden shadow-md border border-stone-200/80 bg-stone-100 aspect-[16/9] sm:aspect-[21/9] animate-hero-image">
            <OptimizedImage
              src="/images/landscaping/landscaping-cost-calculator.webp"
              alt="Beautiful landscaped backyard with patio, lawn and garden"
              width={1536}
              height={1024}
              priority={true}
              className="w-full h-full object-cover hover-image-zoom"
            />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-6 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              100% Free to Use
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              US Regional Multipliers
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              Print & PDF Ready
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              No Contact Info Required
            </span>
          </div>
        </div>
      </section>

      {/* 2. Main Landscaping Cost Calculator */}
      <section id="main-calculator" className="max-w-7xl mx-auto py-8 sm:py-12 px-4 sm:px-6 lg:px-8">
        <MainLandscapingCalculator unitSystem={unitSystem} onNavigate={onNavigate} />
      </section>

      {/* Monetization Slot */}
      <div className="max-w-4xl mx-auto px-4">
        <AdPlaceholder format="leaderboard" />
      </div>

      {/* 3. How It Works Section */}
      <section className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Calculation Methodology
            </span>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900 mt-1">
              How the Landscaping Cost Calculator Works
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 mt-2">
              Our estimation model simulates a commercial contractor bid sheet by separating materials, equipment, site prep, and craft labor.
            </p>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: '1',
              title: 'Enter Area & Shape',
              desc: 'Input length & width or direct square footage. The engine applies an industry standard 10%–15% waste factor for cutting and compaction.',
            },
            {
              step: '2',
              title: 'Select Materials',
              desc: 'Choose from verified nursery sod, shredded mulch, decorative river stone, natural flagstone, or pavers at current wholesale benchmark rates.',
            },
            {
              step: '3',
              title: 'Adjust Local Labor',
              desc: 'Select your US region to adjust for prevailing wage differences ($48/hr in the South to $70+/hr on the West Coast).',
            },
            {
              step: '4',
              title: 'Generate Range',
              desc: 'Review your itemized estimate, low-to-high budget range, and print or export a clean quote sheet with zero sign-ups.',
            },
          ].map((item, idx) => (
            <ScrollReveal key={item.step} delayMs={idx * 60}>
              <div className="bg-stone-50 rounded-2xl p-6 border border-stone-200 hover:border-emerald-300 hover-lift-sm transition-all h-full">
                <div className="w-8 h-8 rounded-full bg-emerald-700 text-white flex items-center justify-center text-sm font-bold mb-4 shadow-2xs">
                  {item.step}
                </div>
                <h3 className="font-bold text-base text-stone-900 mb-1">{item.title}</h3>
                <p className="text-xs text-stone-600 leading-relaxed">{item.desc}</p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 4. What Landscaping Costs Include */}
      <section className="bg-stone-100/70 py-14 px-4 sm:px-6 lg:px-8 border-t border-b border-stone-200">
        <div className="max-w-6xl mx-auto">
          <ScrollReveal>
            <div className="text-center max-w-2xl mx-auto mb-10">
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900">
                What Landscaping Costs Include
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-2">
                Understanding where your investment goes prevents unexpected change orders during construction.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              {
                share: '35% – 45% of Budget',
                title: 'Materials & Supplies',
                desc: 'Raw materials including farm-harvested sod rolls, bulk crushed stone base, bedding sand, commercial weed barrier fabrics, pavers, trees, topsoil, and decorative rocks.',
              },
              {
                share: '45% – 55% of Budget',
                title: 'Labor & Site Excavation',
                desc: 'Skilled crew hours for heavy machine excavation, grading for water drainage, base compaction, custom paver cutting, tree planting, and polymeric joint sanding.',
              },
              {
                share: '10% – 15% of Budget',
                title: 'Logistics, Haul-Away & Fees',
                desc: 'Heavy truck delivery fees, dump trailer debris disposal fees, skid-steer equipment rentals, fuel surcharges, and local municipal building permits.',
              },
            ].map((col, idx) => (
              <ScrollReveal key={col.title} delayMs={idx * 80}>
                <div className="bg-white rounded-2xl p-6 border border-stone-200 shadow-xs hover-lift transition-all h-full">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">{col.share}</span>
                  <h3 className="text-lg font-bold text-stone-900 mt-1 mb-2">{col.title}</h3>
                  <p className="text-xs text-stone-600 leading-relaxed">{col.desc}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* 5. Popular Calculators Grid */}
      <section id="popular-calculators" className="max-w-7xl mx-auto py-14 px-4 sm:px-6 lg:px-8">
        <ScrollReveal>
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                Specialized Tools
              </span>
              <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900 mt-1">
                Popular Supporting Calculators
              </h2>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                Calculate exact cubic yardage, square footage, and piece counts for specific materials.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/sitemap/')}
              className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer shrink-0 transition-colors duration-200"
            >
              <span>View All Calculators</span>
              <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
            </button>
          </div>
        </ScrollReveal>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {popularCalculators.map((calc, idx) => (
            <ScrollReveal key={calc.path} delayMs={idx * 60}>
              <button
                onClick={() => onNavigate(calc.path)}
                className="w-full bg-white rounded-2xl p-5 border border-stone-200 hover:border-emerald-400 hover:shadow-md hover-lift transition-all text-left group cursor-pointer flex flex-col justify-between h-full"
              >
                <div>
                  <div className="p-2.5 rounded-xl bg-emerald-50 text-emerald-800 w-fit mb-3 group-hover:bg-emerald-100 transition-colors duration-200">
                    <div className="transition-transform duration-200 group-hover:scale-105 group-hover:-translate-y-0.5">
                      {calc.icon}
                    </div>
                  </div>
                  <h3 className="font-heading font-bold text-base text-stone-900 group-hover:text-emerald-800 transition-colors duration-200">
                    {calc.name}
                  </h3>
                  <p className="text-xs text-stone-600 mt-1 leading-relaxed">
                    {calc.desc}
                  </p>
                </div>
                <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-xs font-semibold text-emerald-700">
                  <span>Launch Tool</span>
                  <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
                </div>
              </button>
            </ScrollReveal>
          ))}
        </div>
      </section>

      {/* 6. Informational Cost Guides Section */}
      <section className="bg-stone-50 py-14 px-4 sm:px-6 lg:px-8 border-t border-stone-200">
        <div className="max-w-7xl mx-auto">
          <ScrollReveal>
            <div className="flex flex-col md:flex-row md:items-end justify-between mb-8 gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
                  Pricing Intelligence
                </span>
                <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900 mt-1">
                  Landscaping Cost Guides & Research
                </h2>
                <p className="text-xs sm:text-sm text-stone-600 mt-1">
                  Expert analysis of pricing, material comparisons, and money-saving strategies.
                </p>
              </div>
              <button
                onClick={() => onNavigate('/guides/how-much-does-landscaping-cost/')}
                className="text-xs sm:text-sm font-semibold text-emerald-700 hover:text-emerald-800 flex items-center gap-1 cursor-pointer shrink-0 transition-colors duration-200"
              >
                <span>Explore All Guides</span>
                <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </button>
            </div>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {guideHighlights.map((guide, idx) => (
              <ScrollReveal key={guide.path} delayMs={idx * 60}>
                <button
                  onClick={() => onNavigate(guide.path)}
                  className="w-full bg-white rounded-2xl p-5 border border-stone-200 hover:border-emerald-400 hover:shadow-xs hover-lift-sm transition-all text-left group cursor-pointer flex flex-col justify-between h-full"
                >
                  <div>
                    <h3 className="font-heading font-bold text-sm sm:text-base text-stone-900 group-hover:text-emerald-800 transition-colors duration-200">
                      {guide.title}
                    </h3>
                    <p className="text-xs text-stone-600 mt-1.5 leading-relaxed line-clamp-2">
                      {guide.desc}
                    </p>
                  </div>
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1 text-xs font-semibold text-stone-500 group-hover:text-emerald-700 transition-colors duration-200">
                    <span>Read Guide</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-200 group-hover:translate-x-1" />
                  </div>
                </button>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Gen Network */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6">
        <ScrollReveal>
          <LeadGenCard />
        </ScrollReveal>
      </section>

      {/* 7. Homepage FAQs */}
      <section className="max-w-4xl mx-auto py-12 px-4 sm:px-6">
        <ScrollReveal>
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-1.5 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-1">
              <HelpCircle className="w-4 h-4" />
              <span>Answers to Search Questions</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-heading font-extrabold text-stone-900">
              Frequently Asked Questions
            </h2>
          </div>
        </ScrollReveal>

        {metadata.faqs && metadata.faqs.length > 0 && (
          <ScrollReveal delayMs={100}>
            <FaqAccordion faqs={metadata.faqs} />
          </ScrollReveal>
        )}
      </section>
    </div>
  );
};
