import React from 'react';
import { Shovel, ShieldCheck, Ruler, Award, CheckCircle2 } from 'lucide-react';
import { BRAND_NAME, SITE_DOMAIN, SEO_PAGES } from '../../data/seoDatabase';
import { Breadcrumbs } from '../layout/Breadcrumbs';
import { SEOHead } from '../seo/SEOHead';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  const metadata = SEO_PAGES['/about/'];

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 space-y-8 animate-page-enter">
      <SEOHead metadata={metadata} breadcrumbs={[{ name: 'About Us', path: '/about/' }]} />
      <Breadcrumbs
        items={[{ name: 'About Us', path: '/about/' }]}
        onNavigate={onNavigate}
      />

      <header>
        <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
          About Our Project & Mission
        </span>
        <h1 className="text-3xl sm:text-4xl font-heading font-extrabold text-stone-900 mt-2">
          About {BRAND_NAME}
        </h1>
        <p className="text-base text-stone-600 mt-3 leading-relaxed">
          {BRAND_NAME} was founded to eliminate the mystery, sticker shock, and guesswork from residential and commercial outdoor project budgeting.
        </p>
      </header>

      <div className="prose prose-stone text-stone-700 space-y-6 text-sm sm:text-base leading-relaxed">
        <p>
          Whether you are a homeowner embarking on your first paver patio renovation, a property manager comparing commercial turf bids, or an independent landscaping contractor verifying material takeoff numbers, our calculation engine provides transparent, mathematical estimation tools based on verified wholesale supplier data and regional trade labor benchmarks.
        </p>

        <h2 className="text-xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
          Our Core Calculation Philosophy
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <Ruler className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-1">Geometric Accuracy</h3>
            <p className="text-xs text-stone-600">
              We apply proven landscape engineering formulas: length &times; width area calculations, depth-to-volume conversions, and industry-standard 10%–15% waste margins for cutting and compaction.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-stone-50 border border-stone-200">
            <div className="w-9 h-9 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h3 className="font-bold text-base text-stone-900 mb-1">No Fake Claims</h3>
            <p className="text-xs text-stone-600">
              We never promise &quot;guaranteed 100% exact prices&quot; because real-world landscape costs depend on site access, soil composition, underground utilities, and contractor schedules.
            </p>
          </div>
        </div>

        <h2 className="text-xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
          Data Sources & Assumptions
        </h2>
        <p>
          Our baseline materials catalog is updated regularly using wholesale supplier averages across North America for items like shredded hardwood mulch, interlocking concrete pavers, cultivated turf rolls, screened loam topsoil, and decorative river rocks. Regional labor rates reflect prevailing wage trends from the US Bureau of Labor Statistics and industry contractor surveys.
        </p>

        <h2 className="text-xl font-heading font-bold text-stone-900 pt-4 border-t border-stone-200">
          Commitment to Free Access
        </h2>
        <p>
          All calculators and estimation templates on {SITE_DOMAIN} are 100% free to use. We do not require accounts, logins, or credit cards to generate estimates or download quote spreadsheets.
        </p>
      </div>

      <div className="pt-6 border-t border-stone-200 flex justify-center">
        <button
          onClick={() => onNavigate('/')}
          className="bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-xs transition-colors cursor-pointer"
        >
          Explore Our Landscaping Calculators &rarr;
        </button>
      </div>
    </div>
  );
};
