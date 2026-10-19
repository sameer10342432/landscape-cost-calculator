import React from 'react';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../seo/SEOHead';
import { RelatedContent } from '../common/RelatedContent';
import { LeadGenCard } from '../common/LeadGenCard';
import { AdPlaceholder } from '../common/AdPlaceholder';
import { OptimizedImage } from '../common/OptimizedImage';
import { FaqAccordion } from '../common/FaqAccordion';
import { PAGE_IMAGES } from '../../data/imageDatabase';
import { SEOMetadata } from '../../types';
import { FileSpreadsheet, CheckCircle2, Calculator, ArrowRight, ShieldCheck, HelpCircle, DollarSign, Info } from 'lucide-react';
import { formatCurrency } from '../../data/pricingData';

interface EstimateHubPageProps {
  metadata: SEOMetadata;
  onNavigate: (path: string) => void;
}

export const EstimateHubPage: React.FC<EstimateHubPageProps> = ({ metadata, onNavigate }) => {
  const breadcrumbs = [
    { name: 'Estimates Hub', path: '/estimate/' },
    { name: metadata.h1, path: metadata.path },
  ];

  const pageImage = PAGE_IMAGES[metadata.path] || PAGE_IMAGES['/estimate/landscaping-estimate/'];
  const path = metadata.path;

  // Detect specific sub-intent
  const isHub = path === '/estimate/';
  const isCostBreakdown = path.includes('landscaping-estimate-cost');
  const isFreeEstimate = path.includes('free-landscaping-estimate');
  const isExample = path.includes('landscaping-estimate-example');
  const isOverview = !isHub && !isCostBreakdown && !isFreeEstimate && !isExample;

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-page-enter">
      <SEOHead metadata={metadata} breadcrumbs={breadcrumbs} />

      <div className={pageImage ? 'grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center' : ''}>
        <header className={pageImage ? 'lg:col-span-7' : ''}>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold mb-3">
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Professional Landscaping Estimates Hub</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-stone-900 tracking-tight">
            {metadata.h1}
          </h1>
          <p className="text-base text-stone-600 mt-3 leading-relaxed font-medium">
            {metadata.summary}
          </p>
        </header>

        {pageImage && (
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden border border-stone-200/80 shadow-md aspect-[16/10] bg-stone-100">
              <OptimizedImage
                src={pageImage.src}
                alt={pageImage.alt}
                width={pageImage.width}
                height={pageImage.height}
                priority={pageImage.priority}
                className="w-full h-full object-cover hover-image-zoom"
              />
            </div>
          </div>
        )}
      </div>

      {/* Quick Launch Action Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="bg-emerald-900 text-white rounded-2xl p-6 border border-emerald-800 flex flex-col justify-between hover-lift-sm transition-all">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-300">
              Interactive Tool
            </span>
            <h3 className="text-xl font-heading font-bold mt-1 text-white">
              Landscaping Estimate Template
            </h3>
            <p className="text-xs text-emerald-100 mt-2">
              Generate custom, printable bids with line-item scopes, material quantities, and contractor terms.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/estimate/landscaping-estimate-template/')}
            className="mt-6 bg-white hover:bg-stone-100 text-emerald-950 font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl hover-lift-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Open Interactive Template</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>

        <div className="bg-stone-900 text-white rounded-2xl p-6 border border-stone-800 flex flex-col justify-between hover-lift-sm transition-all">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Instant Online Estimator
            </span>
            <h3 className="text-xl font-heading font-bold mt-1 text-white">
              Instant Landscaping Cost Calculator
            </h3>
            <p className="text-xs text-stone-300 mt-2">
              Calculate projected labor and materials for your specific yard square footage without phone calls or forms.
            </p>
          </div>
          <button
            onClick={() => onNavigate('/')}
            className="mt-6 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm py-2.5 px-4 rounded-xl hover-lift-sm active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer group"
          >
            <span>Run Calculator Estimate</span>
            <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
          </button>
        </div>
      </div>

      <AdPlaceholder format="leaderboard" />

      {isHub && (
        <div className="space-y-6">
          <div className="pt-4 border-t border-stone-200">
            <h2 className="text-2xl font-heading font-bold text-stone-900 mb-3">All Estimate Resources</h2>
            <p className="text-stone-600 text-sm leading-relaxed mb-6">
              Whether you are preparing a bid, reviewing a contractor's proposal, or researching costs, find the right resource below.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { path: '/estimate/landscaping-estimate/', label: 'Landscaping Estimate Guide', desc: 'How to read, compare, and audit contractor bids line-by-line.', icon: '📋' },
                { path: '/estimate/landscaping-estimate-cost/', label: 'Estimate Cost Breakdown', desc: "Understand what's inside a contractor's quote: materials, labor, overhead, and profit.", icon: '💰' },
                { path: '/estimate/free-landscaping-estimate/', label: 'Free Online Estimate', desc: 'Instant ballpark without phone calls or emails using our live calculator.', icon: '⚡' },
                { path: '/estimate/landscaping-estimate-template/', label: 'Estimate Template', desc: 'Interactive, printable bid template for contractors and homeowners.', icon: '📄' },
                { path: '/estimate/landscaping-estimate-example/', label: 'Sample Estimate Examples', desc: 'Real-world bid examples for patios ($8,750), backyards ($28,500), and more.', icon: '🔍' },
              ].map((item) => (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className="text-left p-4 rounded-2xl bg-stone-50 border border-stone-200 hover:border-emerald-300 hover:bg-emerald-50/50 transition-all group cursor-pointer"
                >
                  <div className="flex items-start gap-3">
                    <span className="text-xl mt-0.5">{item.icon}</span>
                    <div>
                      <h3 className="font-heading font-bold text-sm text-stone-900 group-hover:text-emerald-800 transition-colors">{item.label}</h3>
                      <p className="text-xs text-stone-600 mt-1 leading-relaxed">{item.desc}</p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200">
            <h2 className="text-lg font-heading font-bold text-stone-900 mb-2">Quick Reference: Estimate Benchmarks</h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-3">
              {[
                { label: 'Small Front Yard Refresh', value: '$2,500 – $6,000' },
                { label: 'Paver Patio (300 sq ft)', value: '$5,500 – $9,500' },
                { label: 'Full Backyard Makeover', value: '$12,000 – $35,000' },
                { label: 'Estate Landscaping', value: '$40,000+' },
              ].map((item) => (
                <div key={item.label} className="bg-white rounded-xl p-3 border border-stone-200 text-center">
                  <div className="text-xs font-bold text-emerald-700">{item.value}</div>
                  <div className="text-[11px] text-stone-500 mt-1">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* 1. OVERVIEW & MAIN ESTIMATE INTENT */}
      {isOverview && (
        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base space-y-6 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            What is a Landscaping Estimate?
          </h2>
          <p>
            A landscaping estimate is a formal, itemized projection of the costs required to complete an exterior property improvement project. Unlike a vague &quot;ballpark guess,&quot; a comprehensive estimate breaks down expenses across site preparation, wholesale materials, equipment mobilization, trade contractor labor, and municipal disposal fees.
          </p>

          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            Estimate vs. Quote vs. Contract: Understanding the Differences
          </h2>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="w-full text-xs sm:text-sm border border-stone-200 rounded-xl overflow-hidden text-left">
              <thead className="bg-stone-100 text-stone-800 font-semibold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Document Type</th>
                  <th className="p-3">Legal Status</th>
                  <th className="p-3">Purpose</th>
                  <th className="p-3">Price Flexibility</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 bg-white">
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Estimate</td>
                  <td className="p-3 text-stone-600">Non-Binding Projection</td>
                  <td className="p-3 text-stone-600">Preliminary budget planning and scope alignment</td>
                  <td className="p-3 text-emerald-800 font-medium">&plusmn;10% to 15% allowance</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Formal Bid / Quote</td>
                  <td className="p-3 text-stone-600">Binding for 30–60 Days</td>
                  <td className="p-3 text-stone-600">Firm commitment from contractor based on scaled plan</td>
                  <td className="p-3 text-stone-900 font-medium">Fixed price unless scope changes</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Executed Contract</td>
                  <td className="p-3 text-stone-600">Legally Enforceable Agreement</td>
                  <td className="p-3 text-stone-600">Payment schedule, warranties, start/end dates, change orders</td>
                  <td className="p-3 text-stone-900 font-medium">Locked; requires signed change order</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            What Every Professional Landscaping Estimate Must Include
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 mb-1">1. Scope of Site Prep & Excavation</h3>
              <p className="text-xs text-stone-600">
                Exact depth of excavation, sub-base gravel compaction specifications, weed barrier fabric type, and old debris haul-away terms.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 mb-1">2. Itemized Materials & Quantities</h3>
              <p className="text-xs text-stone-600">
                Cubic yards of mulch or topsoil, paver model/manufacturer and square footage, plant container sizes (e.g. 5-gal vs 15-gal), and nursery guarantees.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 mb-1">3. Payment Milestones</h3>
              <p className="text-xs text-stone-600">
                Industry standard terms: 10%–30% deposit upon signing, 30%–40% upon material delivery, and final payment upon full completion and client sign-off.
              </p>
            </div>
            <div className="p-4 rounded-xl bg-stone-50 border border-stone-200">
              <h3 className="font-bold text-sm text-stone-900 mb-1">4. Warranties & Change Orders</h3>
              <p className="text-xs text-stone-600">
                One-year warranty on plant survivability (with working irrigation) and 2 to 5 years on structural hardscape settling and paver joint stability.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* 2. ESTIMATE COST BREAKDOWN INTENT */}
      {isCostBreakdown && (
        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base space-y-6 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            How Landscaping Estimates Are Priced: The Contractor Anatomy
          </h2>
          <p>
            When a landscaping contractor prepares a formal bid, they do not invent a random number. Professional estimators use established cost-accounting formulas combining six distinct cost buckets: direct wholesale materials, cutting waste factors, field labor hours, equipment mobilization, company overhead, and target profit margins.
          </p>

          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            The 6 Core Components of a Contractor's Estimate
          </h2>
          <div className="overflow-x-auto my-4 not-prose">
            <table className="w-full text-xs sm:text-sm border border-stone-200 rounded-xl overflow-hidden text-left">
              <thead className="bg-stone-100 text-stone-800 font-semibold uppercase text-[11px]">
                <tr>
                  <th className="p-3">Cost Component</th>
                  <th className="p-3">Typical Budget Share</th>
                  <th className="p-3">What It Covers</th>
                  <th className="p-3">Industry Benchmark</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 bg-white">
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Direct Materials</td>
                  <td className="p-3 text-emerald-800 font-semibold">30% – 40%</td>
                  <td className="p-3 text-stone-600">Pavers, sod pallets, mulch, topsoil, river rock, nursery shrubs</td>
                  <td className="p-3 text-stone-700">Wholesale cost + 10%–20% markup</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Cutting & Compaction Waste</td>
                  <td className="p-3 text-emerald-800 font-semibold">5% – 10%</td>
                  <td className="p-3 text-stone-600">Material lost to diamond saw cuts, settling, and compaction</td>
                  <td className="p-3 text-stone-700">10% for straight; 15%–20% for curves</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Trade Crew Labor</td>
                  <td className="p-3 text-emerald-800 font-semibold">35% – 45%</td>
                  <td className="p-3 text-stone-600">Excavation, grading, masonry laying, planting, cleanup</td>
                  <td className="p-3 text-stone-700">$45 – $75 / billable man-hour</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Machinery & Logistics</td>
                  <td className="p-3 text-emerald-800 font-semibold">5% – 8%</td>
                  <td className="p-3 text-stone-600">Mini-excavator, Bobcat skid-steer, plate compactor, fuel</td>
                  <td className="p-3 text-stone-700">$350 – $650 / machine day</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Company Overhead</td>
                  <td className="p-3 text-emerald-800 font-semibold">8% – 12%</td>
                  <td className="p-3 text-stone-600">General liability insurance, licenses, office staff, estimating</td>
                  <td className="p-3 text-stone-700">Calculated on subtotal</td>
                </tr>
                <tr>
                  <td className="p-3 font-semibold text-stone-900">Net Profit Margin</td>
                  <td className="p-3 text-emerald-800 font-semibold">10% – 20%</td>
                  <td className="p-3 text-stone-600">Reinvestment in tools, business growth, risk reserve</td>
                  <td className="p-3 text-stone-700">15% national residential average</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            Worked Example: How a $10,000 Project is Distributed
          </h2>
          <p>
            Consider a benchmark $10,000 backyard installation consisting of a 300 sq ft paver patio and fresh sod lawn:
          </p>
          <ul className="space-y-2 text-stone-600">
            <li>&bull; <strong>Materials ($3,500):</strong> $1,600 pavers, $650 gravel road base, $250 sand, $600 sod, $400 mulch.</li>
            <li>&bull; <strong>Direct Labor ($4,000):</strong> 4-man crew working 20 hours (80 man-hours total) at $50/hr loaded wage.</li>
            <li>&bull; <strong>Equipment & Dumpster ($700):</strong> Skid-steer rental and 10-yard soil dumpster haul-away.</li>
            <li>&bull; <strong>Overhead Allocation ($600):</strong> Commercial insurance, truck maintenance, sales/estimating cost.</li>
            <li>&bull; <strong>Contractor Net Profit ($1,200):</strong> 12% net profit margin on successful completion.</li>
          </ul>
        </div>
      )}

      {/* 3. FREE LANDSCAPING ESTIMATE INTENT */}
      {isFreeEstimate && (
        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base space-y-6 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            What Does a "Free Landscaping Estimate" Really Mean?
          </h2>
          <p>
            Across the landscaping trade, the phrase &quot;free estimate&quot; is common marketing copy. However, there are significant differences between what is free and what requires payment. Understanding these distinctions saves time and avoids awkward surprises.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 not-prose my-6">
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">Level 1 &bull; Instant</span>
              <h3 className="font-bold text-base text-stone-900 mb-2">Online Cost Calculators</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                100% free with no sales calls or emails required. You enter square footage and material choices to generate an instant mathematical benchmark range based on current trade prices.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 block mb-1">Level 2 &bull; On-Site</span>
              <h3 className="font-bold text-base text-stone-900 mb-2">Contractor Walkthrough</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Most contractors provide a free 30-to-45-minute on-site visit to inspect yard access, grade slopes, measure dimensions, and provide a written lump-sum or line-item quote.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 block mb-1">Level 3 &bull; Paid Plan</span>
              <h3 className="font-bold text-base text-stone-900 mb-2">Full CAD Design Blueprints</h3>
              <p className="text-xs text-stone-600 leading-relaxed">
                Detailed 2D/3D master plans are intellectual property requiring 10 to 30 hours of drafting. Designers charge $500–$2,500, but many credit this back if you hire them for construction.
              </p>
            </div>
          </div>

          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            Limitations of Online Free Estimates
          </h2>
          <p>
            While our online calculators use verified regional wholesale pricing and labor metrics, they are planning benchmarks, not binding contracts. Digital tools cannot see underground ledge rock, root heave, or municipal drainage easements. Always verify preliminary figures with licensed local contractors.
          </p>

          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            How to Prepare for a Free Contractor Consultation
          </h2>
          <ul className="space-y-2 text-stone-600">
            <li>&bull; <strong>Have your property survey plat ready:</strong> Shows exact boundary lines and utility easements.</li>
            <li>&bull; <strong>Know your rough budget ceiling:</strong> Stating &quot;we want to stay around $12,000&quot; helps the contractor specify materials you can actually afford.</li>
            <li>&bull; <strong>Collect inspiration photos:</strong> Visual examples of paver textures and planting styles align expectations immediately.</li>
          </ul>
        </div>
      )}

      {/* 4. REAL-WORLD ESTIMATE EXAMPLE INTENT */}
      {isExample && (
        <div className="prose prose-stone max-w-none text-stone-700 text-sm sm:text-base space-y-6 leading-relaxed">
          <h2 className="text-2xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
            Real-World Landscaping Estimate Examples & Analysis
          </h2>
          <p>
            Reviewing real-world sample bids helps homeowners recognize a professional, trustworthy quote. Below are two verified estimate breakdowns for common residential project scopes.
          </p>

          <h2 className="text-xl font-heading font-bold text-stone-900 pt-2">
            Example 1: 350 Sq Ft Paver Patio & Garden Makeover ($8,750 Turnkey)
          </h2>
          <p className="text-xs text-stone-600">
            Scope: Excavate 6" base, install 350 sq ft interlocking pavers with polymeric sand, sod 600 sq ft lawn, install mulch beds with 12 flowering perennial shrubs.
          </p>

          <div className="overflow-x-auto my-4 not-prose">
            <table className="w-full text-xs text-left border border-stone-200 rounded-lg overflow-hidden bg-white">
              <thead className="bg-stone-100 uppercase text-stone-600 font-semibold">
                <tr>
                  <th className="p-2.5">Scope Description</th>
                  <th className="p-2.5">Qty / Unit</th>
                  <th className="p-2.5">Unit Rate</th>
                  <th className="p-2.5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="p-2.5 font-medium">Excavation & 5" Crushed Gravel Road Base Compaction</td>
                  <td className="p-2.5">350 sq ft</td>
                  <td className="p-2.5">$3.25</td>
                  <td className="p-2.5 text-right font-semibold">$1,137.50</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Interlocking Concrete Pavers with Polymeric Sand Jointing</td>
                  <td className="p-2.5">350 sq ft</td>
                  <td className="p-2.5">$14.50</td>
                  <td className="p-2.5 text-right font-semibold">$5,075.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Kentucky Bluegrass Turf Sod Installation</td>
                  <td className="p-2.5">600 sq ft</td>
                  <td className="p-2.5">$1.85</td>
                  <td className="p-2.5 text-right font-semibold">$1,110.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Hardwood Mulch Beds & 12 Perennial Nursery Shrubs</td>
                  <td className="p-2.5">1 Package</td>
                  <td className="p-2.5">$1,150.00</td>
                  <td className="p-2.5 text-right font-semibold">$1,150.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Debris Haul Away & Final Site Cleanup</td>
                  <td className="p-2.5">1 Lump sum</td>
                  <td className="p-2.5">$277.50</td>
                  <td className="p-2.5 text-right font-semibold">$277.50</td>
                </tr>
                <tr className="bg-stone-100 font-bold text-stone-900">
                  <td colSpan={3} className="p-2.5 text-right">Total Turnkey Project Price:</td>
                  <td className="p-2.5 text-right text-emerald-800 text-sm">$8,750.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 className="text-xl font-heading font-bold text-stone-900 pt-4">
            Example 2: 1,200 Sq Ft Comprehensive Backyard Living Space ($28,500 Turnkey)
          </h2>
          <p className="text-xs text-stone-600">
            Scope: 500 sq ft bluestone paver patio, 40 linear ft segmental retaining seat wall, natural gas fire pit kit, automated drip irrigation, and 3 specimen shade trees.
          </p>

          <div className="overflow-x-auto my-4 not-prose">
            <table className="w-full text-xs text-left border border-stone-200 rounded-lg overflow-hidden bg-white">
              <thead className="bg-stone-100 uppercase text-stone-600 font-semibold">
                <tr>
                  <th className="p-2.5">Scope Description</th>
                  <th className="p-2.5">Qty / Unit</th>
                  <th className="p-2.5">Unit Rate</th>
                  <th className="p-2.5 text-right">Subtotal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100">
                <tr>
                  <td className="p-2.5 font-medium">Deep Excavation, Geotextile & 6" Road Base</td>
                  <td className="p-2.5">500 sq ft</td>
                  <td className="p-2.5">$4.50</td>
                  <td className="p-2.5 text-right font-semibold">$2,250.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Architectural Bluestone Pavers & Polymeric Joints</td>
                  <td className="p-2.5">500 sq ft</td>
                  <td className="p-2.5">$22.00</td>
                  <td className="p-2.5 text-right font-semibold">$11,000.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Segmental Block Retaining Seat Wall with Coping Caps</td>
                  <td className="p-2.5">120 face sq ft</td>
                  <td className="p-2.5">$38.00</td>
                  <td className="p-2.5 text-right font-semibold">$4,560.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Round Masonry Fire Pit with Gas Burner Kit</td>
                  <td className="p-2.5">1 Complete</td>
                  <td className="p-2.5">$3,200.00</td>
                  <td className="p-2.5 text-right font-semibold">$3,200.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Specimen Shade Trees (15-gal) with Staking & Compost</td>
                  <td className="p-2.5">3 Trees</td>
                  <td className="p-2.5">$350.00</td>
                  <td className="p-2.5 text-right font-semibold">$1,050.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Perimeter Drip Irrigation & Low-Voltage Accent Lighting</td>
                  <td className="p-2.5">1 System</td>
                  <td className="p-2.5">$3,840.00</td>
                  <td className="p-2.5 text-right font-semibold">$3,840.00</td>
                </tr>
                <tr>
                  <td className="p-2.5 font-medium">Permits, Inspections & Rubbish Disposal</td>
                  <td className="p-2.5">1 Lump sum</td>
                  <td className="p-2.5">$2,600.00</td>
                  <td className="p-2.5 text-right font-semibold">$2,600.00</td>
                </tr>
                <tr className="bg-stone-100 font-bold text-stone-900">
                  <td colSpan={3} className="p-2.5 text-right">Total Turnkey Project Price:</td>
                  <td className="p-2.5 text-right text-emerald-800 text-sm">$28,500.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      <LeadGenCard />

      {/* FAQ Section */}
      {metadata.faqs && metadata.faqs.length > 0 && (
        <section className="my-10 pt-8 border-t border-stone-200">
          <div className="flex items-center gap-2 mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-700" />
            <h2 className="text-2xl font-heading font-bold text-stone-900">
              Frequently Asked Questions About Landscaping Estimates
            </h2>
          </div>
          <FaqAccordion faqs={metadata.faqs} />
        </section>
      )}

      {/* Related Content */}
      <RelatedContent
        currentPath={metadata.path}
        relatedCalculators={metadata.relatedCalculators}
        relatedGuides={metadata.relatedGuides}
        onNavigate={onNavigate}
      />
    </div>
  );
};
